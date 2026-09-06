import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  FarmState,
  SoilHealthReport,
  IrrigationRecommendation,
  CropStressAnalysis,
  FarmEconomicsReport,
  MarketIntelligenceReport,
  SustainabilityReport,
  AIAdvisorResponse,
  FarmZone,
  AlertItem,
  SimulationScenario,
  ScenarioHistoryItem
} from '../types';
import { api } from '../services/api';
import {
  INITIAL_FARM_STATE,
  calculateSoilHealthReport,
  calculateIrrigationRecommendation,
  calculateAIAdvisor,
  calculateFarmEconomics,
  calculateMarketIntelligence,
  calculateSustainabilityReport,
  calculateCropAnalysis,
  calculateFarmZones,
  calculateAlerts
} from '../data/fallbackData';

// 15+ rich agricultural scenario templates for instant zero-latency client-side transitions
const CLIENT_SCENARIO_TEMPLATES: SimulationScenario[] = [
  {
    scenario_id: 'sc_low_nitrogen',
    title: 'Nitrogen Deficiency Detected',
    category: 'Nutrient Deficiency',
    description: 'Available soil nitrogen has fallen to 28 mg/kg, indicating severe nitrogen hunger during peak vegetative growth.',
    tags: ['Nutrient', 'Nitrogen', 'Soil Health'],
    changes_summary: [
      'Soil Nitrogen decreased from 58 mg/kg to 28 mg/kg (Deficient)',
      'Soil Health score dropped due to nutrient imbalance',
      'Chlorophyll synthesis risk flagged for vegetative rice'
    ],
    what_should_i_do: [
      'Apply neem-coated urea or organic compost based on soil test target',
      'Split nitrogen application to prevent leaching losses',
      'Re-check soil NPK levels in 5 days after application'
    ],
    expected_impact: {
      water_requirement_l: 0,
      estimated_cost_inr: 480,
      soil_health_score: 54,
      yield_impact: '-12% potential yield loss if untreated'
    },
    target_state: {
      nitrogen: 28.0,
      phosphorus: 68.0,
      potassium: 62.0,
      ph: 6.3,
      ec: 0.65,
      soil_moisture: 58.0,
      soil_temperature: 27.8,
      air_temperature: 29.5,
      humidity: 68.0,
      rain_probability: 15.0,
      expected_rainfall: 0.0,
      organic_matter: 1.2
    }
  },
  {
    scenario_id: 'sc_low_moisture_water_stress',
    title: 'Soil Moisture Deficit & Water Stress',
    category: 'Water Stress',
    description: 'Root zone soil moisture dropped to 23%, falling below the critical threshold (45%) for rice paddy cultivation.',
    tags: ['Irrigation Required', 'Pump ON', 'Crop Stress'],
    changes_summary: [
      'Soil moisture dropped to 23% (Critical Deficit)',
      'Smart Irrigation engine recommends IMMEDIATE PUMP ACTIVATION',
      'Virtual pump switched to ON in simulation',
      'Crop water stress index flagged as HIGH'
    ],
    what_should_i_do: [
      'Activate irrigation pump for approximately 2.5 hours',
      'Deliver 18,500 Litres of water across 2.4 acres',
      'Apply light mulching to conserve topsoil moisture'
    ],
    expected_impact: {
      water_requirement_l: 18500,
      estimated_cost_inr: 280,
      soil_health_score: 52,
      pump_status: 'ON'
    },
    target_state: {
      soil_moisture: 23.0,
      soil_temperature: 32.5,
      nitrogen: 54.0,
      phosphorus: 66.0,
      potassium: 60.0,
      ph: 6.5,
      ec: 0.95,
      air_temperature: 34.0,
      humidity: 45.0,
      rain_probability: 10.0,
      expected_rainfall: 0.0,
      organic_matter: 1.3
    }
  },
  {
    scenario_id: 'sc_high_moisture_high_rain',
    title: 'High Moisture + Impending Monsoon Downpour',
    category: 'Water Conservation',
    description: 'Soil moisture is 79% and satellite weather forecasts an 88% probability of 28mm precipitation in the next 12 hours.',
    tags: ['Delay Irrigation', 'Water Saving', 'Cost Saving'],
    changes_summary: [
      'Soil moisture is high (79%)',
      'Rain probability surged to 88% (Expected rainfall: 28 mm)',
      'Smart Irrigation cancels scheduled watering — saves 22,000 Litres of groundwater',
      'Farm Economics logs ₹420 electricity/fuel savings'
    ],
    what_should_i_do: [
      'DO NOT IRRIGATE — allow natural rainfall to replenish soil',
      'Inspect field bunds and drainage outlets to avoid waterlogging',
      'Postpone foliar pesticide or urea spraying until after the rain'
    ],
    expected_impact: {
      water_saved_l: 22000,
      estimated_cost_saving_inr: 420,
      soil_health_score: 82,
      pump_status: 'OFF'
    },
    target_state: {
      soil_moisture: 79.0,
      soil_temperature: 25.0,
      nitrogen: 56.0,
      phosphorus: 70.0,
      potassium: 64.0,
      ph: 6.6,
      ec: 0.72,
      air_temperature: 26.5,
      humidity: 89.0,
      rain_probability: 88.0,
      expected_rainfall: 28.0,
      organic_matter: 1.55
    }
  },
  {
    scenario_id: 'sc_multi_stress_water_nitrogen',
    title: 'Combined Water Stress + Nitrogen Deficiency',
    category: 'Compound Stress',
    description: 'Critical compound stress: both soil moisture (24%) and available nitrogen (22 mg/kg) have plunged during vegetative tillering.',
    tags: ['Dual Hazard', 'Urgent Intervention', 'Pump ON'],
    changes_summary: [
      'Soil moisture dropped to 24% (Severely Dry)',
      'Soil Nitrogen dropped to 22 mg/kg (Severely Low)',
      'Soil Health score dropped to 41/100 (Critical)',
      'AI Advisor issues combined fertigation advisory'
    ],
    what_should_i_do: [
      'Initiate 3-hour irrigation immediately to restore root hydration',
      'Follow up with split-dose soluble nitrogen fertigation once moist',
      'Do NOT apply dry granular urea on dry soil to avoid root burn'
    ],
    expected_impact: {
      water_requirement_l: 21000,
      estimated_cost_inr: 720,
      soil_health_score: 41,
      yield_risk: 'High - immediate action needed'
    },
    target_state: {
      soil_moisture: 24.0,
      nitrogen: 22.0,
      phosphorus: 60.0,
      potassium: 56.0,
      soil_temperature: 33.0,
      ph: 6.3,
      ec: 0.75,
      air_temperature: 35.5,
      humidity: 42.0,
      rain_probability: 10.0,
      expected_rainfall: 0.0,
      organic_matter: 1.15
    }
  },
  {
    scenario_id: 'sc_acidic_soil',
    title: 'Acidic Soil Condition (Low pH)',
    category: 'Soil Degradation',
    description: 'Soil pH has dropped to 5.1 (Strongly Acidic), impairing phosphorus availability and increasing aluminum/iron toxicity risk.',
    tags: ['Low pH', 'Soil Amendment', 'Agricultural Lime'],
    changes_summary: [
      'Soil pH dropped to 5.1 (Sub-optimal for crop)',
      'Phosphorus fixation risk increased',
      'Soil Health score penalized for chemical degradation'
    ],
    what_should_i_do: [
      'Apply agricultural lime (calcium carbonate) or dolomite at 200 kg/acre',
      'Incorporate well-decomposed Farmyard Manure (FYM) to buffer pH',
      'Avoid acidifying fertilizers like ammonium sulfate until pH normalizes'
    ],
    expected_impact: {
      water_requirement_l: 0,
      estimated_cost_inr: 850,
      soil_health_score: 48,
      nutrient_availability: 'Restores P and K uptake'
    },
    target_state: {
      ph: 5.1,
      nitrogen: 48.0,
      phosphorus: 35.0,
      potassium: 52.0,
      ec: 0.60,
      soil_moisture: 60.0,
      soil_temperature: 26.8,
      air_temperature: 28.5,
      humidity: 65.0,
      rain_probability: 25.0,
      expected_rainfall: 0.0,
      organic_matter: 1.1
    }
  },
  {
    scenario_id: 'sc_high_salinity_ec',
    title: 'High Soil Salinity & EC Warning',
    category: 'Salinity Hazard',
    description: 'Electrical Conductivity measured at 2.45 dS/m, indicating root osmotic stress and poor drainage or brackish borewell water.',
    tags: ['Salinity', 'High EC', 'Root Stress'],
    changes_summary: [
      'Soil EC surged to 2.45 dS/m (Saline Risk Threshold > 2.0)',
      'Crop water extraction impeded due to osmotic pressure',
      'AI Advisor flags irrigation water quality test requirement'
    ],
    what_should_i_do: [
      'Provide deep leaching irrigation with low-saline fresh water',
      'Avoid potassium chloride (MOP) and sodium-bearing inputs',
      'Construct deep cross-field sub-surface drainage trenches'
    ],
    expected_impact: {
      water_requirement_l: 12000,
      estimated_cost_inr: 350,
      soil_health_score: 46,
      hazard_level: 'Osmotic root restriction'
    },
    target_state: {
      ec: 2.45,
      soil_moisture: 52.0,
      soil_temperature: 29.0,
      nitrogen: 65.0,
      phosphorus: 58.0,
      potassium: 88.0,
      ph: 7.9,
      air_temperature: 32.0,
      humidity: 58.0,
      rain_probability: 20.0,
      expected_rainfall: 0.0,
      organic_matter: 1.05
    }
  },
  {
    scenario_id: 'sc_excess_nitrogen',
    title: 'Excess Nitrogen & Leaching Hazard',
    category: 'Over-fertilization',
    description: 'Excessive nitrogen (135 mg/kg) detected. Excessive vegetative growth increases lodging risk, pest susceptibility, and runoff pollution.',
    tags: ['Over-application', 'Environmental Risk', 'Economics'],
    changes_summary: [
      'Soil Nitrogen surged to 135 mg/kg (Excessive)',
      'Environmental runoff risk shifted to HIGH',
      'Farm economics detects ₹1,200 in wasted fertilizer expenditure'
    ],
    what_should_i_do: [
      'Halt all nitrogenous fertilizer additions immediately',
      'Ensure controlled irrigation to prevent groundwater nitrate leaching',
      'Monitor crop for sucking pests attracted to lush vegetative tissue'
    ],
    expected_impact: {
      water_requirement_l: 0,
      estimated_cost_inr: 0,
      soil_health_score: 61,
      environmental_hazard: 'Nitrate leaching risk elevated'
    },
    target_state: {
      nitrogen: 135.0,
      phosphorus: 70.0,
      potassium: 65.0,
      ph: 6.8,
      ec: 1.45,
      soil_moisture: 62.0,
      soil_temperature: 27.0,
      air_temperature: 29.0,
      humidity: 70.0,
      rain_probability: 30.0,
      expected_rainfall: 0.0,
      organic_matter: 1.4
    }
  },
  {
    scenario_id: 'sc_heat_stress_dry',
    title: 'Extreme Heat Stress & Evaporative Deficit',
    category: 'Microclimate Stress',
    description: 'Ambient temperature spiked to 39.2°C with low humidity (36%) and soil moisture declining rapidly to 28%.',
    tags: ['Heatwave', 'Vapor Pressure Deficit', 'Cooling Irrigation'],
    changes_summary: [
      'Air temperature spiked to 39.2°C (Heatwave alert)',
      'Evaporative demand increased 40%',
      'Crop health score declined from 84% to 58%'
    ],
    what_should_i_do: [
      'Perform light evening micro-sprinkler irrigation to cool microclimate',
      'Apply anti-transpirant spray (KNO3 1% or kaolin clay spray)',
      'Avoid midday intercultural farm operations'
    ],
    expected_impact: {
      water_requirement_l: 14000,
      estimated_cost_inr: 240,
      soil_health_score: 58,
      heat_mitigation: 'Lowers canopy temperature by 3-4°C'
    },
    target_state: {
      air_temperature: 39.2,
      humidity: 36.0,
      soil_moisture: 28.0,
      soil_temperature: 34.5,
      nitrogen: 52.0,
      phosphorus: 64.0,
      potassium: 58.0,
      ph: 6.6,
      ec: 1.10,
      rain_probability: 5.0,
      expected_rainfall: 0.0,
      organic_matter: 1.3
    }
  },
  {
    scenario_id: 'sc_healthy_optimal_farm',
    title: 'Healthy Balanced Farm (Optimal Baseline)',
    category: 'Optimal',
    description: 'All soil chemical, physical, and atmospheric parameters are balanced in peak agronomic ranges for rice cultivation.',
    tags: ['Balanced', 'High Soil Score', 'Steady State'],
    changes_summary: [
      'Soil Health score: 86/100 (Optimal)',
      'NPK ratio (62:74:66) well balanced',
      'Soil moisture (64%) within ideal field capacity range',
      'No active degradation hazards'
    ],
    what_should_i_do: [
      'Maintain current sustainable irrigation and nutrient schedule',
      'Conduct routine scout for early stem borer or weed presence',
      'Record growth stage transition (Active Tillering)'
    ],
    expected_impact: {
      water_requirement_l: 0,
      estimated_cost_inr: 0,
      soil_health_score: 86,
      profit_projection: 'Peak potential revenue track'
    },
    target_state: {
      soil_moisture: 64.0,
      soil_temperature: 26.8,
      ph: 6.5,
      ec: 0.78,
      nitrogen: 62.0,
      phosphorus: 74.0,
      potassium: 66.0,
      organic_matter: 1.65,
      air_temperature: 28.4,
      humidity: 68.0,
      rain_probability: 25.0,
      expected_rainfall: 0.0,
      wind_speed: 11.0
    }
  }
];

interface FarmStateContextType {
  farmState: FarmState;
  soilHealth: SoilHealthReport;
  irrigation: IrrigationRecommendation;
  cropAnalysis: CropStressAnalysis;
  economics: FarmEconomicsReport;
  marketIntelligence: MarketIntelligenceReport;
  sustainability: SustainabilityReport;
  aiAdvisor: AIAdvisorResponse;
  farmZones: FarmZone[];
  alerts: AlertItem[];
  activeScenario: SimulationScenario | null;
  scenarioHistory: ScenarioHistoryItem[];
  isAnalyzing: boolean;
  isBackendConnected: boolean;
  actionToast: string | null;
  dismissActionToast: () => void;
  generateScenario: (templateId?: string) => Promise<void>;
  resetToHealthyFarm: () => Promise<void>;
  toggleFarmMode: (mode: 'demo' | 'live') => Promise<void>;
  updateCustomSensor: (key: keyof FarmState, value: any) => void;
  executeAdvisorAction: (actionId: string, actionType: string) => void;
}

const FarmStateContext = createContext<FarmStateContextType | undefined>(undefined);

export const FarmStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [farmState, setFarmState] = useState<FarmState>(INITIAL_FARM_STATE);
  const [activeScenario, setActiveScenario] = useState<SimulationScenario | null>(CLIENT_SCENARIO_TEMPLATES[0]);
  const [scenarioHistory, setScenarioHistory] = useState<ScenarioHistoryItem[]>([
    {
      id: 1,
      timestamp: new Date().toLocaleTimeString(),
      scenario_id: 'sc_healthy_optimal_farm',
      title: 'Healthy Farm Baseline',
      category: 'Optimal',
      description: 'Balanced initial agronomic status',
      soil_health_score: 86,
      primary_action: 'Maintain regular surveillance',
      changes_summary: 'Baseline healthy farm'
    }
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [actionToast, setActionToast] = useState<string | null>(null);
  const [templateIndex, setTemplateIndex] = useState<number>(0);
  const [resolvedActionIds, setResolvedActionIds] = useState<string[]>([]);

  const dismissActionToast = () => setActionToast(null);

  // Sync with backend on startup
  useEffect(() => {
    let mounted = true;
    api.getHealth()
      .then(() => {
        if (mounted) setIsBackendConnected(true);
        return api.getFarmState();
      })
      .then((state) => {
        if (mounted && state) {
          setFarmState(state);
        }
      })
      .catch(() => {
        if (mounted) setIsBackendConnected(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Compute derived domain models from the Single Source of Truth
  const soilHealth = calculateSoilHealthReport(farmState);
  const irrigation = calculateIrrigationRecommendation(farmState);
  const cropAnalysis = calculateCropAnalysis(farmState);
  const economics = calculateFarmEconomics(farmState);
  const marketIntelligence = calculateMarketIntelligence(farmState);
  const sustainability = calculateSustainabilityReport(farmState);

  const rawAIAdvisor = calculateAIAdvisor(farmState);
  const filteredRecs = rawAIAdvisor.recommendations.filter(
    (r) => !resolvedActionIds.includes(r.id) && !resolvedActionIds.includes(r.button_action_type)
  );

  const aiAdvisor: AIAdvisorResponse = {
    ...rawAIAdvisor,
    recommendations: filteredRecs.length > 0 ? filteredRecs : [
      {
        id: 'rec_optimal_baseline',
        title: 'Farm Operating in Optimal Health Range',
        category: 'Optimal',
        urgency: 'Routine',
        action: 'Maintain current irrigation and biological nutrient schedule.',
        why: 'All critical soil, moisture, and microclimate parameters are balanced.',
        expected_impact: 'Preserves peak vegetative growth trajectory and maximizes net margin.',
        button_label: 'Record Routine Check',
        button_action_type: 'routine_check',
        confidence: '98% Confidence'
      }
    ],
    summary: filteredRecs.length > 0
      ? rawAIAdvisor.summary
      : 'Farm Operating in Optimal Health Range. All critical soil, moisture, and microclimate parameters are balanced.'
  };

  const farmZones = calculateFarmZones(farmState);
  const rawAlerts = calculateAlerts(farmState);
  const alerts = rawAlerts.filter(
    (a) => !resolvedActionIds.includes(a.id) && !resolvedActionIds.includes(a.category)
  );

  // Generate realistic scenario with seamless transition
  const generateScenario = useCallback(async (templateId?: string) => {
    setIsAnalyzing(true);
    setResolvedActionIds([]);

    try {
      if (isBackendConnected) {
        const res = await api.generateSimulationScenario(templateId);
        setFarmState(res.current_state);
        setActiveScenario(res.scenario);
      } else {
        // Deterministic client-side simulation
        let chosenTemplate: SimulationScenario;
        if (templateId) {
          chosenTemplate = CLIENT_SCENARIO_TEMPLATES.find((t) => t.scenario_id === templateId) || CLIENT_SCENARIO_TEMPLATES[0];
        } else {
          const nextIdx = (templateIndex + 1) % CLIENT_SCENARIO_TEMPLATES.length;
          setTemplateIndex(nextIdx);
          chosenTemplate = CLIENT_SCENARIO_TEMPLATES[nextIdx];
        }

        // Apply perturbed state
        const perturbed: Record<string, any> = {};
        for (const [key, val] of Object.entries(chosenTemplate.target_state)) {
          if (typeof val === 'number') {
            const delta = (Math.random() - 0.5) * 0.04 * val;
            perturbed[key] = Math.round((val + delta) * 10) / 10;
          } else {
            perturbed[key] = val;
          }
        }

        const newState: FarmState = {
          ...farmState,
          ...perturbed,
          last_updated: new Date().toISOString(),
          active_scenario_title: chosenTemplate.title,
          active_scenario_category: chosenTemplate.category,
          mode: 'demo',
          device_status: 'Simulated Hardware Active'
        };

        setFarmState(newState);
        setActiveScenario(chosenTemplate);

        const newHistoryItem: ScenarioHistoryItem = {
          id: scenarioHistory.length + 1,
          timestamp: new Date().toLocaleTimeString(),
          scenario_id: chosenTemplate.scenario_id,
          title: chosenTemplate.title,
          category: chosenTemplate.category,
          description: chosenTemplate.description,
          soil_health_score: chosenTemplate.expected_impact?.soil_health_score || 70,
          primary_action: chosenTemplate.what_should_i_do[0] || 'Monitor farm conditions',
          changes_summary: chosenTemplate.changes_summary.join(' | ')
        };

        setScenarioHistory((prev) => [newHistoryItem, ...prev.slice(0, 19)]);
      }
    } catch {
      // Graceful fallback
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 600);
    }
  }, [farmState, isBackendConnected, templateIndex, scenarioHistory]);

  const resetToHealthyFarm = useCallback(async () => {
    setIsAnalyzing(true);
    setResolvedActionIds([]);
    try {
      if (isBackendConnected) {
        const res = await api.resetSimulation();
        setFarmState(res.state);
      } else {
        setFarmState({
          ...INITIAL_FARM_STATE,
          last_updated: new Date().toISOString()
        });
        const healthyTemplate = CLIENT_SCENARIO_TEMPLATES.find((t) => t.scenario_id === 'sc_healthy_optimal_farm') || CLIENT_SCENARIO_TEMPLATES[CLIENT_SCENARIO_TEMPLATES.length - 1];
        setActiveScenario(healthyTemplate);
      }
    } catch {
      setFarmState(INITIAL_FARM_STATE);
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 500);
    }
  }, [isBackendConnected]);

  const toggleFarmMode = useCallback(async (mode: 'demo' | 'live') => {
    try {
      if (isBackendConnected) {
        await api.setFarmMode(mode);
      }
      setFarmState((prev) => ({
        ...prev,
        mode,
        device_status: mode === 'live' ? 'Listening for ESP32...' : 'Simulated Hardware Active'
      }));
    } catch {
      setFarmState((prev) => ({ ...prev, mode }));
    }
  }, [isBackendConnected]);

  const updateCustomSensor = (key: keyof FarmState, value: any) => {
    setFarmState((prev) => ({
      ...prev,
      [key]: value,
      last_updated: new Date().toISOString()
    }));
  };

  const executeAdvisorAction = (actionId: string, actionType: string) => {
    setIsAnalyzing(true);
    setResolvedActionIds((prev) => [...prev, actionId, actionType]);
    let message = 'Action Completed & Farm State Updated!';
    setTimeout(() => {
      setFarmState((prev) => {
        const updated = { ...prev, last_updated: new Date().toISOString() };

        if (actionId === 'rec_soil_ec_salinity' || actionType === 'drainage' || actionId.includes('salinity') || actionId === 'alt_ec_salinity') {
          updated.ec = 0.75;
          updated.active_scenario_title = 'Salinity Leached & Drainage Restored';
          updated.active_scenario_category = 'Remediated';
          message = 'Drainage ditches cleared & excess salts leached successfully!';
        } else if (actionId === 'rec_nutrient_nitrogen_excess' || actionId === 'alt_nitrogen_high') {
          updated.nitrogen = 60.0;
          updated.active_scenario_title = 'Nitrogen Application Halted';
          updated.active_scenario_category = 'Remediated';
          message = 'Nitrogen top-dressing halted. Runoff risk eliminated.';
        } else if (actionId === 'rec_nutrient_nitrogen_low' || actionType === 'fertilize' || actionId === 'alt_nitrogen_low') {
          updated.nitrogen = 65.0;
          updated.active_scenario_title = 'Neem-Coated Urea Applied';
          updated.active_scenario_category = 'Remediated';
          message = 'Targeted nitrogen top-dressing applied successfully!';
        } else if (actionId === 'rec_nutrient_p_low') {
          updated.phosphorus = 72.0;
          updated.active_scenario_title = 'Single Super Phosphate (SSP) Applied';
          updated.active_scenario_category = 'Remediated';
          message = 'Single Super Phosphate incorporated near root zone.';
        } else if (actionId === 'rec_nutrient_k_low') {
          updated.potassium = 66.0;
          updated.active_scenario_title = 'Potassium Foliar Applied';
          updated.active_scenario_category = 'Remediated';
          message = 'Foliar potassium sulfate spray applied for stalk strength.';
        } else if (actionId === 'rec_soil_ph_acidic' || actionId === 'rec_soil_ph_alkaline' || actionType === 'amend_ph' || actionId === 'alt_ph_acidic') {
          updated.ph = 6.5;
          updated.active_scenario_title = 'Soil Lime/Gypsum pH Balanced';
          updated.active_scenario_category = 'Remediated';
          message = 'Agricultural soil amendment broadcasted. pH normalized to 6.5.';
        } else if (actionId === 'rec_weather_disease_blast') {
          updated.humidity = 68.0;
          updated.active_scenario_title = 'Bio-Fungicide Trichoderma Applied';
          updated.active_scenario_category = 'Remediated';
          message = 'Bio-fungicide preventive spray completed!';
        } else if (actionId === 'rec_weather_heatwave') {
          updated.air_temperature = 28.5;
          updated.soil_moisture = Math.max(prev.soil_moisture, 58.0);
          updated.active_scenario_title = 'Microclimate Sprinkler Cooling Executed';
          updated.active_scenario_category = 'Remediated';
          message = 'Evening sprinkler cooling cycle lowered canopy temperature.';
        } else if (actionId === 'rec_water_rain_hold' || actionId === 'hold_irrigation' || actionId === 'alt_rain_imminent') {
          updated.rain_probability = 20.0;
          updated.expected_rainfall = 0.0;
          updated.soil_moisture = 68.0;
          updated.active_scenario_title = 'Precipitation Harvest Active';
          updated.active_scenario_category = 'Water Conserved';
          message = 'Rainfall hold confirmed: 22,000L groundwater conserved!';
        } else if (actionId === 'rec_water_irrigate_urgent' || actionId === 'rec_water_irrigate_moderate' || actionType === 'irrigate' || actionId === 'alt_moisture_crit') {
          updated.soil_moisture = 65.0;
          updated.soil_temperature = 26.5;
          updated.active_scenario_title = 'Irrigation Cycle Completed';
          updated.active_scenario_category = 'Remediated';
          message = 'Drip irrigation cycle delivered root hydration!';
        } else if (actionType === 'zone_remediate') {
          updated.soil_moisture = 65.0;
          updated.nitrogen = 65.0;
          updated.ph = 6.5;
          updated.ec = 0.75;
          updated.active_scenario_title = 'Field Zone Remediated';
          updated.active_scenario_category = 'Remediated';
          message = 'Field zone treated & returned to healthy status!';
        } else {
          updated.active_scenario_title = 'Routine Check Recorded';
          updated.active_scenario_category = 'Optimal';
          message = 'Farm surveillance task marked as completed!';
        }

        return updated;
      });

      setActionToast(message);
      setIsAnalyzing(false);
      setTimeout(() => {
        setActionToast(null);
      }, 4000);
    }, 400);
  };

  return (
    <FarmStateContext.Provider
      value={{
        farmState,
        soilHealth,
        irrigation,
        cropAnalysis,
        economics,
        marketIntelligence,
        sustainability,
        aiAdvisor,
        farmZones,
        alerts,
        activeScenario,
        scenarioHistory,
        isAnalyzing,
        isBackendConnected,
        actionToast,
        dismissActionToast,
        generateScenario,
        resetToHealthyFarm,
        toggleFarmMode,
        updateCustomSensor,
        executeAdvisorAction
      }}
    >
      {children}
    </FarmStateContext.Provider>
  );
};

export const useFarmState = (): FarmStateContextType => {
  const context = useContext(FarmStateContext);
  if (!context) {
    throw new Error('useFarmState must be used within a FarmStateProvider');
  }
  return context;
};
