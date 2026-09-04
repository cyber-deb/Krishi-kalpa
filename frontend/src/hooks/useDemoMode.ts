import { useState } from 'react';
import { SensorReading } from '../types/sensor';
import { INITIAL_DEMO_SENSOR } from '../data/demoSensors';
import { MasterDailyAction } from '../types/farm';

export function useDemoMode() {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [simState, setSimState] = useState<SensorReading>(INITIAL_DEMO_SENSOR);
  const [rainProb, setRainProb] = useState<number>(20);
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(0);

  // Dynamic calculation for "What Should I Do Today?"
  const getDynamicAction = (): MasterDailyAction => {
    if (simState.soil_moisture < 35) {
      if (rainProb > 70) {
        return {
          headline: "DO NOT IRRIGATE TODAY — RAIN EXPECTED",
          badge: "WEATHER MITIGATION",
          badge_color: "blue",
          reason: `Soil moisture is low (${simState.soil_moisture}%), but rain probability is ${rainProb}%. Natural precipitation will hydrate root zone.`,
          confidence: 91,
          impact: "Saves ~4,800 L groundwater and ₹180 electricity."
        };
      }
      return {
        headline: "IRRIGATION REQUIRED — CRITICAL MOISTURE DEFICIT",
        badge: "WATER STRESS",
        badge_color: "amber",
        reason: `Soil moisture has fallen to ${simState.soil_moisture}%. Panicle tillering stage requires immediate irrigation.`,
        confidence: 96,
        impact: "Prevents 8-12% grain yield loss. Run pump for 45 minutes."
      };
    }

    if (simState.phosphorus > 75) {
      return {
        headline: "REDUCE NITROGEN & PHOSPHORUS APPLICATION",
        badge: "NUTRIENT OPTIMIZATION",
        badge_color: "emerald",
        reason: `Phosphorus is elevated at ${simState.phosphorus} kg/ha. Adding more DAP causes salt accumulation.`,
        confidence: 89,
        impact: "Saves ₹1,420 in fertilizer cost and preserves soil microbiome."
      };
    }

    return {
      headline: "DO NOT IRRIGATE TODAY — MOISTURE OPTIMAL",
      badge: "OPTIMAL CONDITIONS",
      badge_color: "emerald",
      reason: `Root-zone soil moisture is in the optimal range at ${simState.soil_moisture}%.`,
      confidence: 94,
      impact: "Preserves ~3,600 L groundwater and protects root structure."
    };
  };

  const updateSimParam = (param: keyof SensorReading, value: number) => {
    setSimState(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const run2MinuteDemo = async () => {
    setIsDemoRunning(true);
    setDemoStep(1);

    // Step 1: Normal state
    setSimState({ ...INITIAL_DEMO_SENSOR, soil_moisture: 62 });
    setRainProb(20);
    await new Promise(r => setTimeout(r, 2000));

    // Step 2: Simulate Drought / Dry Soil
    setDemoStep(2);
    setSimState(prev => ({ ...prev, soil_moisture: 24 }));
    await new Promise(r => setTimeout(r, 2500));

    // Step 3: Rain Forecast increases
    setDemoStep(3);
    setRainProb(85);
    await new Promise(r => setTimeout(r, 2500));

    // Step 4: Nutrient Balancing
    setDemoStep(4);
    setSimState(prev => ({ ...prev, soil_moisture: 60, phosphorus: 78 }));
    await new Promise(r => setTimeout(r, 2500));

    // Step 5: Finished
    setDemoStep(5);
    setIsDemoRunning(false);
  };

  return {
    isDemoMode,
    setIsDemoMode,
    simState,
    setSimState,
    rainProb,
    setRainProb,
    updateSimParam,
    getDynamicAction,
    run2MinuteDemo,
    isDemoRunning,
    demoStep
  };
}
