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
  SimulationScenario
} from '../types';

export const INITIAL_FARM_STATE: FarmState = {
  mode: 'demo',
  last_updated: new Date().toISOString(),
  config: {
    farm_id: 'farm-alpha-01',
    farm_name: 'Farm Alpha',
    farmer_name: 'Ramesh Patel',
    area_acres: 2.4,
    location: 'Wardha, Maharashtra, India',
    latitude: 20.7453,
    longitude: 78.6022,
    crop_type: 'Rice (Paddy)',
    crop_variety: 'IR-64',
    growth_stage: 'Vegetative',
    soil_type: 'Clay Loam',
    sowing_date: '2026-07-15',
    irrigation_system: 'Drip & Micro-Sprinkler'
  },
  soil_moisture: 62.0,
  soil_temperature: 27.4,
  ph: 6.4,
  ec: 0.82,
  nitrogen: 58.0,
  phosphorus: 72.0,
  potassium: 64.0,
  organic_matter: 1.45,
  air_temperature: 29.1,
  humidity: 71.0,
  rain_probability: 78.0,
  expected_rainfall: 4.2,
  weather_condition: 'Scattered Clouds / Humid',
  wind_speed: 12.0,
  device_id: 'ESP32-FARM-001',
  device_status: 'Online (Simulation Active)',
  battery: 95.0,
  signal_strength: -64,
  last_sensor_reading: new Date().toISOString(),
  active_scenario_title: 'Balanced Healthy Farm',
  active_scenario_category: 'Optimal'
};

export function calculateSoilHealthReport(state: FarmState): SoilHealthReport {
  const { ph, nitrogen: n, phosphorus: p, potassium: k, ec, organic_matter: om, soil_moisture: moisture } = state;

  // Evaluate Nitrogen
  let n_status = 'Optimal';
  let n_color: 'emerald' | 'yellow' | 'amber' | 'red' = 'emerald';
  let n_rec = 'Nitrogen balance is ideal for current vegetative growth.';
  let n_score = 95;
  if (n < 35) {
    n_status = 'Deficient';
    n_color = 'red';
    n_rec = 'Urgent: Apply 25-30 kg/acre urea or organic compost.';
    n_score = Math.max(10, Math.round((n / 35.0) * 50));
  } else if (n < 50) {
    n_status = 'Low';
    n_color = 'amber';
    n_rec = 'Mild deficiency: Plan supplemental nitrogen application.';
    n_score = 65;
  } else if (n > 110) {
    n_status = 'Excessive';
    n_color = 'red';
    n_rec = 'Excessive nitrogen hazard: risk of lodging & nitrate leaching.';
    n_score = 40;
  } else if (n > 85) {
    n_status = 'High';
    n_color = 'yellow';
    n_rec = 'Elevated nitrogen: hold off on top-dressing.';
    n_score = 75;
  }

  // Evaluate Phosphorus
  let p_status = 'Optimal';
  let p_color: 'emerald' | 'yellow' | 'amber' | 'red' = 'emerald';
  let p_rec = 'Phosphorus availability is optimal for root vigor.';
  let p_score = 96;
  if (p < 30) {
    p_status = 'Deficient';
    p_color = 'red';
    p_rec = 'Apply Single Super Phosphate (SSP) or rock phosphate.';
    p_score = Math.max(10, Math.round((p / 30.0) * 50));
  } else if (p < 55) {
    p_status = 'Low';
    p_color = 'amber';
    p_rec = 'Phosphorus slightly low: supplement with DAP/SSP.';
    p_score = 68;
  } else if (p > 90) {
    p_status = 'Excessive';
    p_color = 'amber';
    p_rec = 'High phosphorus: withhold additional P fertilizers.';
    p_score = 70;
  }

  // Evaluate Potassium
  let k_status = 'Optimal';
  let k_color: 'emerald' | 'yellow' | 'amber' | 'red' = 'emerald';
  let k_rec = 'Potassium levels provide strong disease resistance.';
  let k_score = 95;
  if (k < 35) {
    k_status = 'Deficient';
    k_color = 'red';
    k_rec = 'Apply Muriate of Potash (MOP) to improve stalk strength.';
    k_score = Math.max(10, Math.round((k / 35.0) * 50));
  } else if (k < 50) {
    k_status = 'Low';
    k_color = 'amber';
    k_rec = 'Potassium is low: spray potassium sulfate 1%.';
    k_score = 66;
  } else if (k > 85) {
    k_status = 'High';
    k_color = 'yellow';
    k_rec = 'High potassium: maintain balanced irrigation.';
    k_score = 78;
  }

  // Evaluate pH
  let ph_status = 'Optimal';
  let ph_color = 'emerald';
  let ph_rec = 'Soil pH is ideal for nutrient absorption.';
  let ph_score = 98;
  if (ph < 5.5) {
    ph_status = 'Acidic (Low)';
    ph_color = 'red';
    ph_rec = 'Apply agricultural lime (CaCO3) to neutralize acidity.';
    ph_score = Math.max(20, Math.round((ph / 5.5) * 60));
  } else if (ph < 6.0) {
    ph_status = 'Slightly Acidic';
    ph_color = 'amber';
    ph_rec = 'Add organic compost or dolomite lime.';
    ph_score = 75;
  } else if (ph > 8.2) {
    ph_status = 'Strongly Alkaline';
    ph_color = 'red';
    ph_rec = 'Apply agricultural gypsum and elemental sulfur.';
    ph_score = 35;
  } else if (ph > 7.5) {
    ph_status = 'Moderately Alkaline';
    ph_color = 'amber';
    ph_rec = 'Incorporate organic matter & gypsum.';
    ph_score = 70;
  }

  // Evaluate EC
  let ec_status = 'Optimal (Non-saline)';
  let ec_color: 'emerald' | 'yellow' | 'amber' | 'red' = 'emerald';
  let ec_rec = 'Low salinity: excellent root osmosis.';
  let ec_score = 95;
  if (ec > 1.8) {
    ec_status = 'Saline Hazard';
    ec_color = 'red';
    ec_rec = 'High EC: leach soil with fresh water and enhance drainage.';
    ec_score = 30;
  } else if (ec > 1.0) {
    ec_status = 'Slightly Saline';
    ec_color = 'amber';
    ec_rec = 'Monitor water quality and reduce salt inputs.';
    ec_score = 70;
  }

  // Organic Matter
  let om_status = 'Moderate';
  let om_color: 'emerald' | 'yellow' | 'amber' | 'red' = 'emerald';
  let om_rec = 'Increase compost/FYM to boost microbial health.';
  let om_score = 75;
  if (om >= 1.5) {
    om_status = 'High (Rich Loam)';
    om_color = 'emerald';
    om_rec = 'High biological activity and moisture retention.';
    om_score = 95;
  } else if (om < 1.0) {
    om_status = 'Low (Depleted)';
    om_color = 'red';
    om_rec = 'Incorporate green manure (Dhaincha) and FYM.';
    om_score = 45;
  }

  const overall_score = Math.max(10, Math.min(99, Math.round(
    0.20 * n_score + 0.15 * p_score + 0.15 * k_score + 0.20 * ph_score + 0.15 * ec_score + 0.15 * om_score
  )));

  const degradation_factors: string[] = [];
  if (n < 35) degradation_factors.push('Nitrogen depletion in active root zone');
  if (n > 110) degradation_factors.push('Chemical nitrogen over-application & leaching hazard');
  if (p < 30) degradation_factors.push('Phosphorus deficiency & root limitation');
  if (k < 35) degradation_factors.push('Potassium depletion & lodging vulnerability');
  if (ph < 5.8) degradation_factors.push(`Soil acidity (pH ${ph.toFixed(1)}) causing nutrient fixation`);
  if (ph > 8.0) degradation_factors.push(`Soil alkalinity (pH ${ph.toFixed(1)}) locking micronutrients`);
  if (ec > 1.8) degradation_factors.push(`Elevated salinity / EC (${ec.toFixed(2)} dS/m) impeding water uptake`);
  if (om < 1.0) degradation_factors.push('Severe organic carbon depletion (< 1.0%)');
  if (moisture < 25) degradation_factors.push('Desiccation & microbiological dormancy');
  if (moisture > 90) degradation_factors.push('Anaerobic waterlogging & root asphyxiation');

  let degradation_risk: 'Low' | 'Moderate' | 'High' | 'Critical' = 'Low';
  let status = 'Excellent';
  let status_color = 'emerald';
  let summary = 'Soil condition is thriving with balanced chemical, physical, and biological properties.';

  if (degradation_factors.length === 0) {
    degradation_risk = 'Low';
    status = 'Excellent';
    status_color = 'emerald';
    summary = 'Soil condition is thriving with balanced chemical, physical, and biological properties.';
  } else if (degradation_factors.length === 1) {
    degradation_risk = 'Moderate';
    status = 'Good';
    status_color = 'yellow';
    summary = 'Soil is generally healthy, with one localized factor requiring agronomic attention.';
  } else if (degradation_factors.length <= 3) {
    degradation_risk = 'High';
    status = 'Moderate Stress';
    status_color = 'amber';
    summary = 'Multiple compounding stress factors detected. Timely soil amendment recommended.';
  } else {
    degradation_risk = 'Critical';
    status = 'Critical Degradation';
    status_color = 'red';
    summary = 'Severe chemical and biological imbalances present. Immediate corrective action required.';
  }

  const amendments: string[] = [];
  if (ph < 6.0) amendments.push('Broadcast 150-200 kg/acre agricultural lime or dolomite.');
  if (ph > 8.0) amendments.push('Apply 100 kg/acre gypsum mixed with decomposed farmyard manure.');
  if (n < 40) amendments.push('Provide split nitrogen top-dressing using neem-coated urea.');
  if (p < 40) amendments.push('Band-apply 50 kg/acre Single Super Phosphate (SSP).');
  if (k < 40) amendments.push('Apply 25 kg/acre Muriate of Potash (MOP) or foliar potassium.');
  if (om < 1.2) amendments.push('Incorporate 2-3 tons/acre well-rotted FYM or vermicompost.');
  if (amendments.length === 0) amendments.push('Maintain baseline bio-fertilizer schedule (Azospirillum + PSB).');

  return {
    overall_score,
    status,
    status_color,
    summary,
    degradation_risk,
    degradation_factors,
    nutrients: [
      { name: 'Available Nitrogen', symbol: 'N', current_value: n, optimal_min: 50, optimal_max: 85, unit: 'mg/kg', status: n_status, status_color: n_color, recommendation: n_rec },
      { name: 'Available Phosphorus', symbol: 'P', current_value: p, optimal_min: 55, optimal_max: 90, unit: 'mg/kg', status: p_status, status_color: p_color, recommendation: p_rec },
      { name: 'Available Potassium', symbol: 'K', current_value: k, optimal_min: 50, optimal_max: 85, unit: 'mg/kg', status: k_status, status_color: k_color, recommendation: k_rec },
      { name: 'Soil Reaction', symbol: 'pH', current_value: ph, optimal_min: 6.0, optimal_max: 7.5, unit: 'pH', status: ph_status, status_color: ph_color as any, recommendation: ph_rec },
      { name: 'Salinity (EC)', symbol: 'EC', current_value: ec, optimal_min: 0.2, optimal_max: 1.0, unit: 'dS/m', status: ec_status, status_color: ec_color, recommendation: ec_rec },
      { name: 'Organic Matter', symbol: 'OM', current_value: om, optimal_min: 1.2, optimal_max: 2.5, unit: '%', status: om_status, status_color: om_color, recommendation: om_rec },
    ],
    soil_amendment_plan: amendments,
    historical_trend: [
      { day: 'Day -14', score: Math.max(30, overall_score - 8), moisture: Math.min(100, moisture + 5), nitrogen: n + 4 },
      { day: 'Day -10', score: Math.max(30, overall_score - 4), moisture: moisture, nitrogen: n + 2 },
      { day: 'Day -7', score: Math.max(30, overall_score - 2), moisture: Math.max(10, moisture - 3), nitrogen: n - 1 },
      { day: 'Day -3', score: overall_score, moisture: moisture, nitrogen: n },
      { day: 'Today', score: overall_score, moisture: moisture, nitrogen: n },
    ],
    confidence: '92% (Agronomic Model)'
  };
}

export function calculateIrrigationRecommendation(state: FarmState): IrrigationRecommendation {
  const { soil_moisture: moisture, rain_probability: rain_prob, expected_rainfall: expected_rain, air_temperature: air_temp } = state;
  const acres = state.config.area_acres;
  const target_moisture = 65.0;
  const moisture_deficit = Math.max(0, target_moisture - moisture);

  if (rain_prob >= 70.0 && expected_rain >= 5.0) {
    const water_saved = Math.round(moisture_deficit * 0.5 * 4046 * acres);
    return {
      action: 'DO NOT IRRIGATE',
      action_color: 'emerald',
      pump_status: 'OFF',
      urgency: 'Delay',
      primary_reason: `Rain probability is ${rain_prob.toFixed(0)}% with ${expected_rain.toFixed(1)} mm expected rainfall. Natural precipitation is adequate.`,
      soil_moisture_current: moisture,
      soil_moisture_target: target_moisture,
      rain_probability: rain_prob,
      expected_rainfall: expected_rain,
      water_required_liters: 0,
      water_saved_liters: water_saved,
      estimated_cost_saving_inr: Math.round((water_saved / 1000.0) * 18.5),
      next_check_hours: 12,
      smart_advice: 'Delay irrigation to save electricity and prevent nitrate leaching from rainwater runoff.'
    };
  }

  if (moisture < 35.0) {
    const water_req = Math.round(moisture_deficit * 0.5 * 4046 * acres);
    return {
      action: 'IRRIGATE',
      action_color: 'red',
      pump_status: 'ON',
      urgency: 'Immediate',
      primary_reason: air_temp > 35.0
        ? `Critical soil moisture deficit (${moisture.toFixed(1)}%) combined with heat stress (${air_temp.toFixed(1)}°C). Rapid hydration needed.`
        : `Soil moisture is critically low at ${moisture.toFixed(1)}% (below 35% wilting margin for ${state.config.crop_type}).`,
      soil_moisture_current: moisture,
      soil_moisture_target: target_moisture,
      rain_probability: rain_prob,
      expected_rainfall: expected_rain,
      water_required_liters: water_req,
      water_saved_liters: 0,
      estimated_cost_saving_inr: 0,
      next_check_hours: 4,
      smart_advice: `Operate drip/sprinkler pump for ~${(water_req / 7000.0).toFixed(1)} hours during early morning or late evening.`
    };
  }

  if (moisture < 50.0) {
    if (rain_prob < 40.0) {
      const water_req = Math.round(moisture_deficit * 0.4 * 4046 * acres);
      return {
        action: 'IRRIGATE',
        action_color: 'amber',
        pump_status: 'ON',
        urgency: 'Recommended',
        primary_reason: `Soil moisture (${moisture.toFixed(1)}%) is below optimal target (65%) with low rain likelihood (${rain_prob.toFixed(0)}%).`,
        soil_moisture_current: moisture,
        soil_moisture_target: target_moisture,
        rain_probability: rain_prob,
        expected_rainfall: expected_rain,
        water_required_liters: water_req,
        water_saved_liters: 0,
        estimated_cost_saving_inr: 0,
        next_check_hours: 8,
        smart_advice: 'Light irrigation cycle recommended to maintain consistent root hydration.'
      };
    } else {
      const water_saved = Math.round(moisture_deficit * 0.3 * 4046 * acres);
      return {
        action: 'MONITOR',
        action_color: 'yellow',
        pump_status: 'STANDBY',
        urgency: 'Optional',
        primary_reason: `Moisture is moderate (${moisture.toFixed(1)}%) and there is a ${rain_prob.toFixed(0)}% chance of rain. Hold pumping for 6 hours.`,
        soil_moisture_current: moisture,
        soil_moisture_target: target_moisture,
        rain_probability: rain_prob,
        expected_rainfall: expected_rain,
        water_required_liters: 0,
        water_saved_liters: water_saved,
        estimated_cost_saving_inr: Math.round((water_saved / 1000.0) * 18.5),
        next_check_hours: 6,
        smart_advice: 'Monitor weather radar. If rain does not arrive by evening, initiate light irrigation.'
      };
    }
  }

  const water_saved = Math.round(8000.0 * acres);
  return {
    action: 'DO NOT IRRIGATE',
    action_color: 'emerald',
    pump_status: 'OFF',
    urgency: 'Delay',
    primary_reason: `Current soil moisture (${moisture.toFixed(1)}%) is within optimal range (${target_moisture - 10}% - ${target_moisture + 10}%).`,
    soil_moisture_current: moisture,
    soil_moisture_target: target_moisture,
    rain_probability: rain_prob,
    expected_rainfall: expected_rain,
    water_required_liters: 0,
    water_saved_liters: water_saved,
    estimated_cost_saving_inr: Math.round((water_saved / 1000.0) * 18.5),
    next_check_hours: 12,
    smart_advice: 'Soil moisture balance is optimal. No pumping needed today.'
  };
}

export function calculateAIAdvisor(state: FarmState): AIAdvisorResponse {
  const { soil_moisture: moisture, nitrogen: n, phosphorus: p, potassium: k, ph, ec, rain_probability: rain_prob, expected_rainfall: expected_rain, air_temperature: air_temp, humidity, config } = state;
  const recs: any[] = [];

  if (rain_prob >= 70.0 && expected_rain >= 5.0) {
    recs.push({
      id: 'rec_water_rain_hold',
      priority: 1,
      category: 'Smart Irrigation',
      title: 'Hold Irrigation — Rain Imminent',
      action: 'Do not turn on irrigation pumps today.',
      why: `Satellite radar detects a ${rain_prob.toFixed(0)}% chance of ${expected_rain.toFixed(1)} mm rain within 12 hours.`,
      expected_impact: 'Saves ~20,000 Litres of groundwater and prevents nutrient wash-off.',
      confidence: '95% Confidence',
      urgency: 'High Priority',
      button_label: 'Confirm Rain Hold',
      button_action_type: 'dismiss'
    });
  } else if (moisture < 35.0) {
    recs.push({
      id: 'rec_water_irrigate_urgent',
      priority: 1,
      category: 'Smart Irrigation',
      title: 'Irrigate Root Zone Immediately',
      action: 'Turn ON drip/sprinkler system for 2.5 hours.',
      why: `Soil moisture has dropped to ${moisture.toFixed(1)}%, below the critical 35% wilting margin for ${config.crop_type}.`,
      expected_impact: 'Restores root hydration and prevents permanent grain yield penalty.',
      confidence: '96% Confidence',
      urgency: 'High Priority',
      button_label: 'Start Irrigation Pump',
      button_action_type: 'irrigate'
    });
  }

  if (n < 35.0) {
    recs.push({
      id: 'rec_nutrient_nitrogen_low',
      priority: 1,
      category: 'Nutrient Management',
      title: 'Apply Targeted Nitrogen Top-Dressing',
      action: 'Apply 25 kg/acre neem-coated urea or enriched vermicompost.',
      why: `Available soil nitrogen is low at ${n.toFixed(1)} mg/kg during active vegetative tillering.`,
      expected_impact: 'Boosts leaf chlorophyll synthesis and restores healthy green canopy.',
      confidence: '93% Confidence',
      urgency: 'High Priority',
      button_label: 'Mark as Reviewed',
      button_action_type: 'fertilize'
    });
  } else if (n > 110.0) {
    recs.push({
      id: 'rec_nutrient_nitrogen_excess',
      priority: 2,
      category: 'Nutrient Management',
      title: 'Halt Nitrogen Application (Excess Detected)',
      action: 'Do not apply any urea or nitrogenous fertilizers.',
      why: `Soil nitrogen is ${n.toFixed(1)} mg/kg (excessive). High N causes crop lodging and attracts sucking pests.`,
      expected_impact: 'Saves ₹1,200/acre in wasted fertilizer and avoids groundwater nitrate pollution.',
      confidence: '94% Confidence',
      urgency: 'Medium Priority',
      button_label: 'Acknowledge N Halt',
      button_action_type: 'review'
    });
  }

  if (p < 30.0) {
    recs.push({
      id: 'rec_nutrient_p_low',
      priority: 3,
      category: 'Nutrient Management',
      title: 'Supplement Phosphorus for Root Development',
      action: 'Apply 40 kg/acre Single Super Phosphate (SSP) near root zones.',
      why: `Phosphorus is deficient (${p.toFixed(1)} mg/kg), restricting early root spread and tillering.`,
      expected_impact: 'Strengthens root architecture and boosts fertilizer uptake efficiency.',
      confidence: '89% Confidence',
      urgency: 'Medium Priority',
      button_label: 'View P Plan',
      button_action_type: 'review'
    });
  }

  if (k < 35.0) {
    recs.push({
      id: 'rec_nutrient_k_low',
      priority: 3,
      category: 'Nutrient Management',
      title: 'Apply Potassium for Stalk Strength',
      action: 'Foliar spray with 1% potassium sulfate or apply 20 kg/acre MOP.',
      why: `Potassium level is ${k.toFixed(1)} mg/kg, increasing vulnerability to lodging and fungal infection.`,
      expected_impact: 'Reinforces cell wall thickness and improves drought/pest tolerance.',
      confidence: '90% Confidence',
      urgency: 'Medium Priority',
      button_label: 'Mark as Reviewed',
      button_action_type: 'review'
    });
  }

  if (ph < 5.8) {
    recs.push({
      id: 'rec_soil_ph_acidic',
      priority: 2,
      category: 'Soil Amendment',
      title: 'Treat Soil Acidity with Agricultural Lime',
      action: 'Broadcast 150 kg/acre agricultural lime (CaCO3) before next rain.',
      why: `Soil pH is acidic (${ph.toFixed(1)}), which chemically locks phosphorus and micronutrients.`,
      expected_impact: 'Brings pH to optimal 6.5 range, unlocking up to 30% bound phosphorus.',
      confidence: '92% Confidence',
      urgency: 'Medium Priority',
      button_label: 'View Lime Dosage',
      button_action_type: 'amend_ph'
    });
  } else if (ph > 8.2) {
    recs.push({
      id: 'rec_soil_ph_alkaline',
      priority: 2,
      category: 'Soil Amendment',
      title: 'Apply Gypsum to Correct Soil Alkalinity',
      action: 'Apply 100 kg/acre agricultural gypsum along with organic compost.',
      why: `Soil pH is alkaline (${ph.toFixed(1)}), reducing zinc, iron, and manganese availability.`,
      expected_impact: 'Neutralizes alkaline salts and restores micronutrient mobility.',
      confidence: '88% Confidence',
      urgency: 'Medium Priority',
      button_label: 'View Gypsum Plan',
      button_action_type: 'amend_ph'
    });
  }

  if (ec > 1.8) {
    recs.push({
      id: 'rec_soil_ec_salinity',
      priority: 2,
      category: 'Salinity Management',
      title: 'Flush Excess Salinity & Improve Drainage',
      action: 'Conduct deep leaching with sweet canal water and clear field drainage ditches.',
      why: `Electrical conductivity is high at ${ec.toFixed(2)} dS/m, causing root osmotic stress.`,
      expected_impact: 'Prevents root tip burning and improves water absorption efficiency.',
      confidence: '87% Confidence',
      urgency: 'High Priority',
      button_label: 'View Drainage Guide',
      button_action_type: 'review'
    });
  }

  if (humidity > 90.0 && air_temp > 25.0) {
    recs.push({
      id: 'rec_weather_disease_blast',
      priority: 2,
      category: 'Disease Prevention',
      title: 'Preventive Bio-Fungicide Spray',
      action: 'Apply preventive Trichoderma viride or Pseudomonas fluorescens spray.',
      why: `Continuous high humidity (${humidity.toFixed(0)}%) and warm weather create high fungal blast risk.`,
      expected_impact: 'Protects vegetative canopy from blast lesions with zero toxic residue.',
      confidence: '91% Confidence',
      urgency: 'Medium Priority',
      button_label: 'Mark as Sprayed',
      button_action_type: 'review'
    });
  }

  if (recs.length === 0) {
    recs.push({
      id: 'rec_healthy_stable',
      priority: 5,
      category: 'Routine Maintenance',
      title: 'Farm Conditions are Stable & Balanced',
      action: 'Maintain current irrigation and biological nutrient schedule.',
      why: 'Soil moisture, NPK balance, and weather parameters are within optimal agronomic thresholds.',
      expected_impact: 'Preserves peak vegetative growth trajectory and maximizes net margin.',
      confidence: '97% Confidence',
      urgency: 'Standard',
      button_label: 'Record Routine Check',
      button_action_type: 'review'
    });
  }

  recs.sort((a, b) => a.priority - b.priority);

  const hasHigh = recs.some((r) => r.urgency === 'High Priority');
  return {
    headline: hasHigh ? 'Action Required: Attention Needed on Water & Nutrient Balance' : 'Farm Operating in Optimal Health Range',
    summary: hasHigh ? 'Your farm conditions require 1-2 timely agronomic interventions to protect crop yield.' : 'All critical soil, moisture, and microclimate parameters are balanced.',
    overall_farm_condition: hasHigh ? 'Active Interventions Needed' : 'Stable & Optimal',
    recommendations: recs,
    last_evaluated: new Date().toISOString()
  };
}

export function calculateFarmEconomics(state: FarmState): FarmEconomicsReport {
  const acres = state.config.area_acres;
  const base_fert = 6200.0 * acres;
  const base_water = 4500.0 * acres;
  const base_labor = 7800.0 * acres;
  const current_input = base_fert + base_water + base_labor;

  const current_yield = 24.5 * acres;
  const mandi_rate = 2350.0;
  const current_rev = current_yield * mandi_rate;
  const current_prof = current_rev - current_input;

  let rec_fert = base_fert * 0.78;
  if (state.nitrogen > 100) rec_fert = base_fert * 0.65;
  else if (state.nitrogen < 35) rec_fert = base_fert * 0.90;

  let rec_water = base_water * 0.70;
  if (state.rain_probability >= 70) rec_water = base_water * 0.55;

  const rec_labor = base_labor * 0.92;
  const rec_input = rec_fert + rec_water + rec_labor;

  const rec_yield = current_yield * 1.12;
  const rec_rev = rec_yield * mandi_rate;
  const rec_prof = rec_rev - rec_input;

  const potential_savings = Math.max(0, current_input - rec_input);
  const profit_gain = Math.max(0, rec_prof - current_prof);
  const cost_red_pct = Math.round(((current_input - rec_input) / current_input) * 1000) / 10;

  return {
    currency: '₹',
    area_acres: acres,
    crop_type: state.config.crop_type,
    current_practice: {
      fertilizer_cost: Math.round(base_fert),
      water_pumping_cost: Math.round(base_water),
      labor_and_operations: Math.round(base_labor),
      total_input_cost: Math.round(current_input),
      expected_yield_quintals: Math.round(current_yield * 10) / 10,
      estimated_gross_revenue: Math.round(current_rev),
      estimated_net_profit: Math.round(current_prof)
    },
    recommended_practice: {
      fertilizer_cost: Math.round(rec_fert),
      water_pumping_cost: Math.round(rec_water),
      labor_and_operations: Math.round(rec_labor),
      total_input_cost: Math.round(rec_input),
      expected_yield_quintals: Math.round(rec_yield * 10) / 10,
      estimated_gross_revenue: Math.round(rec_rev),
      estimated_net_profit: Math.round(rec_prof)
    },
    net_profit_gain_inr: Math.round(profit_gain),
    potential_savings_inr: Math.round(potential_savings),
    input_cost_reduction_percent: cost_red_pct,
    outstanding_debt_inr: 48000,
    repayment_pressure: profit_gain > 5000 ? 'Manageable' : 'Elevated',
    debt_service_ratio: 0.85,
    financial_guidance: 'Favorable financial health. Reinvest projected input savings to build farm contingency funds.',
    disclaimer: 'Model-based agronomic estimates. Indicative figures based on regional APMC market prices and typical agricultural inputs.'
  };
}

export function calculateMarketIntelligence(state: FarmState): MarketIntelligenceReport {
  const total_quintals = Math.round(24.5 * state.config.area_acres * 10) / 10;
  const rawMandis = [
    { name: 'Wardha APMC Mandi', district: 'Wardha', dist: 12.0, price: 2320.0, rate: 3.2, cess: 28.0, trend: 'Stable' as const },
    { name: 'Hinganghat Commercial APMC', district: 'Wardha', dist: 34.0, price: 2480.0, rate: 2.8, cess: 32.0, trend: 'Rising' as const },
    { name: 'Nagpur Kalamna Grain Terminal', district: 'Nagpur', dist: 76.0, price: 2590.0, rate: 2.4, cess: 35.0, trend: 'Rising' as const },
    { name: 'Amravati Cotton & Grain Mandi', district: 'Amravati', dist: 95.0, price: 2440.0, rate: 2.2, cess: 30.0, trend: 'Stable' as const },
    { name: 'Yavatmal APMC Yard', district: 'Yavatmal', dist: 68.0, price: 2360.0, rate: 2.6, cess: 25.0, trend: 'Falling' as const }
  ];

  let best_market = '';
  let max_net = -1;

  const markets = rawMandis.map((m) => {
    const transport = Math.round(m.dist * m.rate * 10) / 10;
    const net = Math.round((m.price - transport - m.cess) * 10) / 10;
    if (net > max_net) {
      max_net = net;
      best_market = m.name;
    }
    return {
      mandi_name: m.name,
      district: m.district,
      distance_km: m.dist,
      crop_name: state.config.crop_type,
      variety: state.config.crop_variety,
      modal_price_per_quintal: m.price,
      transport_cost_per_quintal: transport,
      mandi_cess_and_fees_per_quintal: m.cess,
      net_realization_per_quintal: net,
      price_trend: m.trend,
      is_recommended: false
    };
  });

  markets.forEach((m) => {
    if (m.mandi_name === best_market) m.is_recommended = true;
  });

  return {
    crop_name: state.config.crop_type,
    estimated_harvest_quintals: total_quintals,
    best_market_name: best_market,
    maximum_net_realization: max_net,
    total_estimated_revenue: Math.round(total_quintals * max_net),
    markets,
    price_forecast_advice: `${best_market} yields the highest net realization (₹${max_net.toFixed(0)}/Q) after accounting for transport and APMC fees.`
  };
}

export function calculateSustainabilityReport(state: FarmState): SustainabilityReport {
  const acres = state.config.area_acres;
  const isRain = state.rain_probability >= 70;
  const water_saved = isRain ? 22000 * acres : (state.soil_moisture > 60 ? 12000 * acres : 4000);
  const fert_red = state.nitrogen > 100 ? 45 * acres : 28 * acres;
  const co2_red = Math.round(fert_red * 3.0 * 10) / 10;

  return {
    water_saved_liters: Math.round(water_saved),
    chemical_fertilizer_reduction_kg: Math.round(fert_red * 10) / 10,
    estimated_co2_reduction_kg: co2_red,
    soil_organic_carbon_index: state.organic_matter,
    groundwater_conservation_score: Math.min(98, Math.max(50, Math.round(70 + water_saved / 1000))),
    eco_friendly_practices_active: [
      'Precision Micro-irrigation with Rain Interlock',
      'Soil-Test Targeted Nutrient Management',
      'Continuous Root Zone Moisture Telemetry'
    ],
    sustainability_rating: state.organic_matter >= 1.5 ? 'A+' : 'A'
  };
}

export function calculateCropAnalysis(state: FarmState): CropStressAnalysis {
  const { soil_moisture: m, nitrogen: n, air_temperature: air_temp, humidity } = state;
  let m_stress = 'None (Optimal)';
  let penalty = 0;
  if (m < 28) {
    m_stress = 'Severe Water Deficit';
    penalty += 25;
  } else if (m < 45) {
    m_stress = 'Moderate Moisture Stress';
    penalty += 12;
  } else if (m > 90) {
    m_stress = 'Waterlogging Anoxia';
    penalty += 18;
  }

  let n_stress = 'None (Balanced NPK)';
  if (n < 35) {
    n_stress = 'Nitrogen Deficiency';
    penalty += 15;
  } else if (n > 110) {
    n_stress = 'Excess Nitrogen (Lodging Risk)';
    penalty += 8;
  }

  let h_stress = 'None (Normal)';
  if (air_temp > 38) {
    h_stress = 'Severe Heatwave Stress';
    penalty += 15;
  } else if (air_temp > 33) {
    h_stress = 'Mild Temperature Stress';
    penalty += 6;
  }

  let d_risk = 'Low (Safe Microclimate)';
  if (humidity > 90 && air_temp > 25) {
    d_risk = 'High (Fungal Blast Risk)';
    penalty += 12;
  }

  const crop_health = Math.max(20, Math.min(99, 96 - penalty));
  const yield_loss = Math.min(60, Math.round(penalty * 0.8 * 10) / 10);
  const exp_yield = Math.round(24.5 * (1 - yield_loss / 100) * 10) / 10;

  return {
    crop_name: state.config.crop_type,
    variety: state.config.crop_variety,
    growth_stage: state.config.growth_stage,
    crop_health_score: crop_health,
    moisture_stress: m_stress,
    nutrient_stress: n_stress,
    heat_stress: h_stress,
    disease_humidity_risk: d_risk,
    estimated_days_to_harvest: 68,
    expected_yield_quintals_per_acre: exp_yield,
    potential_yield_loss_percent: yield_loss,
    stage_specific_advice: 'Focus on healthy tillering and root spread. Avoid standing water in early vegetative stage.'
  };
}

export function calculateFarmZones(state: FarmState): FarmZone[] {
  const { soil_moisture: m, nitrogen: n, ph } = state;

  let za_status = 'Healthy';
  let za_color = 'emerald';
  let za_issue = 'Optimal moisture and balanced NPK';
  let za_action = 'Maintain regular surveillance';

  if (m < 35) {
    za_status = 'Water Stress';
    za_color = 'red';
    za_issue = `Soil moisture at ${m.toFixed(1)}% (Low)`;
    za_action = 'Initiate drip line irrigation';
  } else if (n < 40) {
    za_status = 'Nutrient Stress';
    za_color = 'amber';
    za_issue = `Available nitrogen at ${n.toFixed(1)} mg/kg (Low)`;
    za_action = 'Targeted neem-coated urea application';
  }

  const zb_m = Math.max(15, Math.min(95, m + 3.5));
  const zb_n = Math.max(15, Math.min(140, n - 4));
  let zb_status = 'Healthy';
  let zb_color = 'emerald';
  let zb_issue = 'Good soil structure and moisture';
  let zb_action = 'Routine check';

  if (zb_m < 35) {
    zb_status = 'Water Stress';
    zb_color = 'red';
    zb_issue = `Soil moisture at ${zb_m.toFixed(1)}%`;
    zb_action = 'Schedule irrigation run';
  } else if (zb_n < 35) {
    zb_status = 'Nutrient Stress';
    zb_color = 'amber';
    zb_issue = `Nitrogen deficient (${zb_n.toFixed(1)} mg/kg)`;
    zb_action = 'Apply compost top dressing';
  }

  const zc_m = Math.max(15, Math.min(98, m + 8));
  let zc_status = 'Healthy';
  let zc_color = 'emerald';
  let zc_issue = 'Balanced soil hydration';
  let zc_action = 'No action needed';

  if (zc_m > 88) {
    zc_status = 'Waterlogging Hazard';
    zc_color = 'blue';
    zc_issue = `High moisture (${zc_m.toFixed(1)}%)`;
    zc_action = 'Clear drainage ditch';
  } else if (zc_m < 35) {
    zc_status = 'Water Stress';
    zc_color = 'red';
    zc_issue = `Moisture deficit (${zc_m.toFixed(1)}%)`;
    zc_action = 'Activate micro-sprinkler';
  }

  return [
    {
      zone_id: 'zone-a-north',
      zone_name: 'Zone A (North Block - 1.0 Acre)',
      area_acres: 1.0,
      crop: state.config.crop_type,
      status: za_status,
      status_color: za_color,
      soil_moisture: Math.round(m * 10) / 10,
      ph: Math.round(ph * 10) / 10,
      nitrogen: Math.round(n * 10) / 10,
      degradation_risk: za_status === 'Healthy' ? 'Low' : 'Moderate',
      primary_issue: za_issue,
      recommended_action: za_action,
      coordinates: [
        [20.7460, 78.6015],
        [20.7468, 78.6025],
        [20.7462, 78.6035],
        [20.7454, 78.6025]
      ]
    },
    {
      zone_id: 'zone-b-central',
      zone_name: 'Zone B (Central Block - 0.8 Acre)',
      area_acres: 0.8,
      crop: state.config.crop_type,
      status: zb_status,
      status_color: zb_color,
      soil_moisture: Math.round(zb_m * 10) / 10,
      ph: Math.round(ph * 10) / 10,
      nitrogen: Math.round(zb_n * 10) / 10,
      degradation_risk: zb_status === 'Healthy' ? 'Low' : 'Moderate',
      primary_issue: zb_issue,
      recommended_action: zb_action,
      coordinates: [
        [20.7454, 78.6025],
        [20.7462, 78.6035],
        [20.7456, 78.6045],
        [20.7448, 78.6035]
      ]
    },
    {
      zone_id: 'zone-c-south',
      zone_name: 'Zone C (South Drainage Block - 0.6 Acre)',
      area_acres: 0.6,
      crop: state.config.crop_type,
      status: zc_status,
      status_color: zc_color,
      soil_moisture: Math.round(zc_m * 10) / 10,
      ph: Math.round(ph * 10) / 10,
      nitrogen: Math.round(n * 10) / 10,
      degradation_risk: zc_status === 'Healthy' ? 'Low' : 'Moderate',
      primary_issue: zc_issue,
      recommended_action: zc_action,
      coordinates: [
        [20.7448, 78.6035],
        [20.7456, 78.6045],
        [20.7450, 78.6055],
        [20.7442, 78.6045]
      ]
    }
  ];
}

export function calculateAlerts(state: FarmState): AlertItem[] {
  const alerts: AlertItem[] = [];

  if (state.soil_moisture < 30) {
    alerts.push({
      id: 'alt_moisture_crit',
      title: 'Severe Soil Moisture Deficit',
      message: `Moisture is ${state.soil_moisture.toFixed(1)}%. Immediate irrigation is recommended to prevent wilting.`,
      severity: 'danger',
      category: 'water',
      action_label: 'Start Irrigation'
    });
  } else if (state.rain_probability >= 75) {
    alerts.push({
      id: 'alt_rain_imminent',
      title: 'Impending Rainfall Detected',
      message: `${state.rain_probability.toFixed(0)}% chance of precipitation. Irrigation should be delayed to save water.`,
      severity: 'info',
      category: 'weather',
      action_label: 'Acknowledge'
    });
  }

  if (state.nitrogen < 35) {
    alerts.push({
      id: 'alt_nitrogen_low',
      title: 'Nitrogen Hunger in Root Zone',
      message: `Available nitrogen is low (${state.nitrogen.toFixed(1)} mg/kg). Top-dressing recommended.`,
      severity: 'warning',
      category: 'soil',
      action_label: 'Review Fertilizer Plan'
    });
  } else if (state.nitrogen > 110) {
    alerts.push({
      id: 'alt_nitrogen_high',
      title: 'Excess Nitrogen & Leaching Hazard',
      message: `Nitrogen is elevated (${state.nitrogen.toFixed(1)} mg/kg). Suspend additional urea application.`,
      severity: 'warning',
      category: 'soil',
      action_label: 'Halt Application'
    });
  }

  if (state.ph < 5.8) {
    alerts.push({
      id: 'alt_ph_acidic',
      title: 'Soil Acidity Warning',
      message: `Soil pH is ${state.ph.toFixed(1)}. Phosphorus uptake may be restricted.`,
      severity: 'warning',
      category: 'soil',
      action_label: 'View Lime Dosage'
    });
  }

  if (state.ec > 1.8) {
    alerts.push({
      id: 'alt_ec_salinity',
      title: 'High Soil Salinity / EC Warning',
      message: `Salinity is elevated (${state.ec.toFixed(2)} dS/m). Root osmosis may be impeded.`,
      severity: 'danger',
      category: 'soil',
      action_label: 'Flush Drainage'
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      id: 'alt_optimal',
      title: 'Farm Conditions Optimal',
      message: 'All monitored soil, moisture, and crop indicators are currently within balanced ranges.',
      severity: 'success',
      category: 'general',
      action_label: 'All Clear'
    });
  }

  return alerts;
}
