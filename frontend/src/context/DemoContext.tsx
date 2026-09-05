import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SensorReading } from '../types/sensor';
import { INITIAL_DEMO_SENSOR } from '../data/demoSensors';
import { MasterDailyAction } from '../types/farm';
import { SoilHealthData } from '../types/soil';
import { computeClientSoilScore } from '../utils/calculations';

export type DemoScenario = 'baseline' | 'drought' | 'rain' | 'fertilizer' | 'custom';

interface DemoContextType {
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  simState: SensorReading;
  setSimState: React.Dispatch<React.SetStateAction<SensorReading>>;
  rainProb: number;
  setRainProb: (val: number) => void;
  isDemoRunning: boolean;
  demoStep: number;
  activeScenario: DemoScenario;
  setScenario: (scenario: DemoScenario) => void;
  updateSimParam: (param: keyof SensorReading, val: number) => void;
  getDynamicAction: () => MasterDailyAction;
  run2MinuteDemo: () => Promise<void>;
  resetToDefaults: () => void;
  dynamicSoilHealth: SoilHealthData;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [simState, setSimState] = useState<SensorReading>(INITIAL_DEMO_SENSOR);
  const [rainProb, setRainProb] = useState<number>(20);
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(0);
  const [activeScenario, setActiveScenario] = useState<DemoScenario>('baseline');

  const setScenario = (scenario: DemoScenario) => {
    setActiveScenario(scenario);
    switch (scenario) {
      case 'baseline':
        setSimState({
          ...INITIAL_DEMO_SENSOR,
          soil_moisture: 62.0,
          soil_temperature: 27.4,
          ph: 6.4,
          ec: 0.82,
          nitrogen: 58.0,
          phosphorus: 72.0,
          potassium: 64.0,
          air_temperature: 29.1,
          humidity: 71.0,
          rainfall: 4.2
        });
        setRainProb(20);
        break;
      case 'drought':
        setSimState(prev => ({
          ...prev,
          soil_moisture: 22.0,
          soil_temperature: 32.8,
          ph: 6.5,
          air_temperature: 36.5,
          humidity: 42.0
        }));
        setRainProb(10);
        break;
      case 'rain':
        setSimState(prev => ({
          ...prev,
          soil_moisture: 28.0,
          soil_temperature: 26.0,
          humidity: 88.0
        }));
        setRainProb(85);
        break;
      case 'fertilizer':
        setSimState(prev => ({
          ...prev,
          soil_moisture: 58.0,
          phosphorus: 88.0,
          nitrogen: 92.0,
          ec: 1.45,
          ph: 7.6
        }));
        setRainProb(15);
        break;
      default:
        break;
    }
  };

  const resetToDefaults = () => {
    setScenario('baseline');
  };

  const updateSimParam = (param: keyof SensorReading, val: number) => {
    setActiveScenario('custom');
    setSimState(prev => ({
      ...prev,
      [param]: val
    }));
  };

  // Dynamically compute recommendation based on current moisture, rain probability, and nutrients
  const getDynamicAction = (): MasterDailyAction => {
    if (simState.soil_moisture < 35) {
      if (rainProb > 70) {
        return {
          headline: "DO NOT IRRIGATE TODAY — HEAVY RAIN EXPECTED",
          badge: "RAIN MITIGATION",
          badge_color: "blue",
          reason: `Soil moisture is low (${simState.soil_moisture}%), but rain probability is ${rainProb}%. Natural precipitation will fully hydrate root zone within 12-24 hours.`,
          confidence: 94,
          impact: "Saves ~4,800 L groundwater and ₹180 electricity."
        };
      }
      return {
        headline: "🚨 IRRIGATION REQUIRED — CRITICAL MOISTURE DEFICIT",
        badge: "WATER STRESS",
        badge_color: "amber",
        reason: `Soil moisture has fallen to ${simState.soil_moisture}% (below 35% critical threshold). Crop is experiencing drought stress. Immediate tube-well operation recommended.`,
        confidence: 97,
        impact: "Prevents 8-12% grain yield loss. Run pump for 45 minutes."
      };
    }

    if (simState.phosphorus > 75 || simState.nitrogen > 85) {
      return {
        headline: "⚠️ REDUCE SYNTHETIC FERTILIZER APPLICATION",
        badge: "NUTRIENT SURPLUS",
        badge_color: "rose",
        reason: `Nutrient levels are elevated (P: ${simState.phosphorus} kg/ha, N: ${simState.nitrogen} kg/ha). Adding more DAP or Urea risks salinity buildup and root burn.`,
        confidence: 91,
        impact: "Saves ₹1,420 in fertilizer cost and preserves soil microbiome."
      };
    }

    return {
      headline: "✅ ALL CONDITIONS OPTIMAL — NO ACTION REQUIRED TODAY",
      badge: "OPTIMAL STATUS",
      badge_color: "emerald",
      reason: `Root-zone soil moisture is in the optimal range at ${simState.soil_moisture}%, pH is ${simState.ph}, and micro-climate is stable.`,
      confidence: 95,
      impact: "Preserves ~3,600 L groundwater and sustains peak crop vigor."
    };
  };

  // Dynamically compute soil health score & degradation risk
  const score = computeClientSoilScore(simState.ph, simState.ec, simState.nitrogen, simState.phosphorus, simState.potassium);
  const degradationRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' =
    score > 75 ? 'LOW' : score > 55 ? 'MODERATE' : score > 35 ? 'HIGH' : 'CRITICAL';

  const dynamicSoilHealth: SoilHealthData = {
    health_score: score,
    degradation_risk: degradationRisk,
    organic_matter_percent: 0.74,
    ph: simState.ph,
    ec: simState.ec,
    nitrogen: simState.nitrogen,
    phosphorus: simState.phosphorus,
    potassium: simState.potassium,
    soil_moisture: simState.soil_moisture,
    soil_temperature: simState.soil_temperature,
    nutrient_status: {
      "Nitrogen": simState.nitrogen > 80 ? `Surplus (${simState.nitrogen} kg/ha)` : `Optimal (${simState.nitrogen} kg/ha)`,
      "Phosphorus": simState.phosphorus > 75 ? `Elevated (${simState.phosphorus} kg/ha)` : `Balanced (${simState.phosphorus} kg/ha)`,
      "Potassium": `Optimal (${simState.potassium} kg/ha)`,
      "pH Balance": simState.ph < 6.0 ? `Acidic (${simState.ph})` : simState.ph > 7.5 ? `Alkaline (${simState.ph})` : `Neutral (${simState.ph})`,
      "Salinity (EC)": simState.ec > 1.2 ? `High (${simState.ec} dS/m)` : `Safe (${simState.ec} dS/m)`
    },
    recommendations: simState.phosphorus > 75
      ? [
          "Reduce synthetic DAP application by 30% due to existing phosphorus carryover.",
          "Apply biochar / compost post-harvest to increase soil organic carbon from 0.74% to >1.0%."
        ]
      : [
          "Maintain current balanced fertigation cycle.",
          "Apply compost post-harvest to increase soil organic carbon."
        ]
  };

  // 2-minute automated guided simulation
  const run2MinuteDemo = async () => {
    setIsDemoRunning(true);
    setIsDemoMode(true);

    // Step 1: Normal Baseline
    setDemoStep(1);
    setScenario('baseline');
    await new Promise(r => setTimeout(r, 2500));

    // Step 2: Drought stress
    setDemoStep(2);
    setScenario('drought');
    await new Promise(r => setTimeout(r, 3000));

    // Step 3: Rain incoming
    setDemoStep(3);
    setScenario('rain');
    await new Promise(r => setTimeout(r, 3000));

    // Step 4: Fertilizer excess
    setDemoStep(4);
    setScenario('fertilizer');
    await new Promise(r => setTimeout(r, 3000));

    // Step 5: Wrap up to baseline
    setDemoStep(5);
    setScenario('baseline');
    await new Promise(r => setTimeout(r, 2000));

    setDemoStep(0);
    setIsDemoRunning(false);
  };

  return (
    <DemoContext.Provider
      value={{
        isDemoMode,
        setIsDemoMode,
        simState,
        setSimState,
        rainProb,
        setRainProb,
        isDemoRunning,
        demoStep,
        activeScenario,
        setScenario,
        updateSimParam,
        getDynamicAction,
        run2MinuteDemo,
        resetToDefaults,
        dynamicSoilHealth
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemoMode = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemoMode must be used within a DemoProvider');
  }
  return context;
};
