export type LanguageCode =
  | 'en'
  | 'hi'
  | 'bn'
  | 'mr'
  | 'te'
  | 'ta'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'or'
  | 'as'
  | 'ur';

export interface LanguageOption {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
}

export interface FarmConfig {
  farm_id: string;
  farm_name: string;
  farmer_name: string;
  area_acres: number;
  location: string;
  latitude: number;
  longitude: number;
  crop_type: string;
  crop_variety: string;
  growth_stage: string;
  soil_type: string;
  sowing_date: string;
  irrigation_system: string;
}

export interface FarmState {
  mode: 'demo' | 'live';
  last_updated: string;
  config: FarmConfig;

  // Sensor Measurements (Single Source of Truth)
  soil_moisture: number; // %
  soil_temperature: number; // °C
  ph: number; // pH units
  ec: number; // dS/m
  nitrogen: number; // mg/kg
  phosphorus: number; // mg/kg
  potassium: number; // mg/kg
  organic_matter: number; // %

  // Weather & Atmosphere
  air_temperature: number; // °C
  humidity: number; // %
  rain_probability: number; // %
  expected_rainfall: number; // mm
  weather_condition: string;
  wind_speed: number;

  // Diagnostics
  device_id: string;
  device_status: string;
  battery: number;
  signal_strength: number;
  last_sensor_reading: string;

  // Active Scenario
  active_scenario_title: string;
  active_scenario_category: string;
}

export interface NutrientStatus {
  name: string;
  symbol: string;
  current_value: number;
  optimal_min: number;
  optimal_max: number;
  unit: string;
  status: string;
  status_color: 'emerald' | 'yellow' | 'amber' | 'red';
  recommendation: string;
}

export interface SoilHealthReport {
  overall_score: number;
  status: string;
  status_color: string;
  summary: string;
  degradation_risk: 'Low' | 'Moderate' | 'High' | 'Critical';
  degradation_factors: string[];
  nutrients: NutrientStatus[];
  soil_amendment_plan: string[];
  historical_trend: Array<{ day: string; score: number; moisture: number; nitrogen: number }>;
  confidence: string;
}

export interface IrrigationRecommendation {
  action: 'IRRIGATE' | 'DO NOT IRRIGATE' | 'MONITOR';
  action_color: string;
  pump_status: 'ON' | 'OFF' | 'STANDBY';
  urgency: string;
  primary_reason: string;
  soil_moisture_current: number;
  soil_moisture_target: number;
  rain_probability: number;
  expected_rainfall: number;
  water_required_liters: number;
  water_saved_liters: number;
  estimated_cost_saving_inr: number;
  next_check_hours: number;
  smart_advice: string;
}

export interface CropStressAnalysis {
  crop_name: string;
  variety: string;
  growth_stage: string;
  crop_health_score: number;
  moisture_stress: string;
  nutrient_stress: string;
  heat_stress: string;
  disease_humidity_risk: string;
  estimated_days_to_harvest: number;
  expected_yield_quintals_per_acre: number;
  potential_yield_loss_percent: number;
  stage_specific_advice: string;
}

export interface FarmAdvisorAction {
  id: string;
  priority: number;
  category: string;
  title: string;
  action: string;
  why: string;
  expected_impact: string;
  confidence: string;
  urgency: string;
  button_label: string;
  button_action_type: string;
}

export interface AIAdvisorResponse {
  headline: string;
  summary: string;
  overall_farm_condition: string;
  recommendations: FarmAdvisorAction[];
  last_evaluated: string;
}

export interface EconomicsComparison {
  fertilizer_cost: number;
  water_pumping_cost: number;
  labor_and_operations: number;
  total_input_cost: number;
  expected_yield_quintals: number;
  estimated_gross_revenue: number;
  estimated_net_profit: number;
}

export interface FarmEconomicsReport {
  currency: string;
  area_acres: number;
  crop_type: string;
  current_practice: EconomicsComparison;
  recommended_practice: EconomicsComparison;
  net_profit_gain_inr: number;
  potential_savings_inr: number;
  input_cost_reduction_percent: number;
  outstanding_debt_inr: number;
  repayment_pressure: string;
  debt_service_ratio: number;
  financial_guidance: string;
  disclaimer: string;
}

export interface MandiMarketItem {
  mandi_name: string;
  district: string;
  distance_km: number;
  crop_name: string;
  variety: string;
  modal_price_per_quintal: number;
  transport_cost_per_quintal: number;
  mandi_cess_and_fees_per_quintal: number;
  net_realization_per_quintal: number;
  price_trend: 'Rising' | 'Stable' | 'Falling';
  is_recommended: boolean;
}

export interface MarketIntelligenceReport {
  crop_name: string;
  estimated_harvest_quintals: number;
  best_market_name: string;
  maximum_net_realization: number;
  total_estimated_revenue: number;
  markets: MandiMarketItem[];
  price_forecast_advice: string;
}

export interface SustainabilityReport {
  water_saved_liters: number;
  chemical_fertilizer_reduction_kg: number;
  estimated_co2_reduction_kg: number;
  soil_organic_carbon_index: number;
  groundwater_conservation_score: number;
  eco_friendly_practices_active: string[];
  sustainability_rating: string;
}

export interface FarmZone {
  zone_id: string;
  zone_name: string;
  area_acres: number;
  crop: string;
  status: string;
  status_color: string;
  soil_moisture: number;
  ph: number;
  nitrogen: number;
  degradation_risk: string;
  primary_issue: string;
  recommended_action: string;
  coordinates: number[][];
}

export interface AlertItem {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'danger' | 'success';
  category: 'water' | 'soil' | 'crop' | 'weather' | 'general' | 'device';
  action_label?: string;
}

export interface SimulationScenario {
  scenario_id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  changes_summary: string[];
  what_should_i_do: string[];
  expected_impact: Record<string, any>;
  target_state: Record<string, any>;
}

export interface ScenarioHistoryItem {
  id: number;
  timestamp: string;
  scenario_id: string;
  title: string;
  category: string;
  description: string;
  soil_health_score: number;
  primary_action: string;
  changes_summary: string;
}
