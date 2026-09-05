from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# ============================================================
# SENSOR SCHEMAS
# ============================================================

class SensorDataInput(BaseModel):
    device_id: str = Field(default="ESP32-FARM-001", description="Unique hardware identifier")
    soil_moisture: float = Field(..., ge=0, le=100, description="Volumetric Soil Moisture in %")
    soil_temperature: float = Field(..., ge=-10, le=60, description="Soil Temperature in °C")
    ph: float = Field(..., ge=0, le=14, description="Soil pH level (0-14)")
    ec: float = Field(..., ge=0, le=10, description="Electrical Conductivity in dS/m (Salinity)")
    nitrogen: float = Field(..., ge=0, le=500, description="Available Nitrogen in mg/kg")
    phosphorus: float = Field(..., ge=0, le=300, description="Available Phosphorus in mg/kg")
    potassium: float = Field(..., ge=0, le=500, description="Available Potassium in mg/kg")
    air_temperature: float = Field(..., ge=-10, le=60, description="Ambient Air Temperature in °C")
    humidity: float = Field(..., ge=0, le=100, description="Relative Humidity in %")
    rainfall: float = Field(default=0.0, ge=0, le=500, description="Rainfall in mm")
    light_intensity: Optional[float] = Field(default=1200.0, description="Ambient light in Lux")
    battery: Optional[float] = Field(default=96.0, description="Device battery percentage")
    signal_strength: Optional[int] = Field(default=-65, description="WiFi RSSI signal in dBm")

class SensorReadingResponse(SensorDataInput):
    id: Optional[int] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    is_simulated: bool = False

    class Config:
        from_attributes = True

# ============================================================
# CENTRAL FARM STATE SCHEMA
# ============================================================

class FarmConfig(BaseModel):
    farm_id: str = "farm-alpha-01"
    farm_name: str = "Farm Alpha"
    farmer_name: str = "Ramesh Patel"
    area_acres: float = 2.4
    location: str = "Wardha, Maharashtra, India"
    latitude: float = 20.7453
    longitude: float = 78.6022
    crop_type: str = "Rice (Paddy)" # Rice, Wheat, Cotton, Maize, Soybean, Sugarcane, Tomato
    crop_variety: str = "IR-64"
    growth_stage: str = "Vegetative" # Germination, Vegetative, Flowering, Grain Filling, Maturity
    soil_type: str = "Clay Loam" # Clay Loam, Black Cotton, Sandy Loam, Red Loam, Alluvial
    sowing_date: str = "2026-07-15"
    irrigation_system: str = "Drip & Micro-Sprinkler"

class FarmState(BaseModel):
    # Mode & Metadata
    mode: str = "demo" # "demo" | "live"
    last_updated: datetime = Field(default_factory=datetime.utcnow)
    config: FarmConfig = Field(default_factory=FarmConfig)

    # Core Sensor Measurements (The Single Source of Truth)
    soil_moisture: float = 62.0 # %
    soil_temperature: float = 27.4 # °C
    ph: float = 6.4 # pH units
    ec: float = 0.82 # dS/m
    nitrogen: float = 58.0 # mg/kg
    phosphorus: float = 72.0 # mg/kg
    potassium: float = 64.0 # mg/kg
    organic_matter: float = 1.45 # % Organic Carbon

    # Weather & Atmosphere
    air_temperature: float = 29.1 # °C
    humidity: float = 71.0 # %
    rain_probability: float = 78.0 # %
    expected_rainfall: float = 4.2 # mm
    weather_condition: str = "Scattered Clouds / Humid"
    wind_speed: float = 12.0 # km/h

    # Hardware Status
    device_id: str = "ESP32-FARM-001"
    device_status: str = "Online" # Online, Offline, Calibrating
    battery: float = 95.0
    signal_strength: int = -64
    last_sensor_reading: datetime = Field(default_factory=datetime.utcnow)

    # Active Scenario (if in demo mode)
    active_scenario_title: str = "Balanced Healthy Farm"
    active_scenario_category: str = "Optimal"

# ============================================================
# SOIL HEALTH & DEGRADATION SCHEMAS
# ============================================================

class NutrientStatus(BaseModel):
    name: str # Nitrogen, Phosphorus, Potassium, etc.
    symbol: str # N, P, K, pH, EC, OM
    current_value: float
    optimal_min: float
    optimal_max: float
    unit: str
    status: str # "Deficient", "Low", "Optimal", "High", "Excessive"
    status_color: str # emerald, yellow, amber, red
    recommendation: str

class SoilHealthReport(BaseModel):
    overall_score: int # 0 - 100
    status: str # "Excellent", "Good", "Moderate", "Critical", "Degraded"
    status_color: str
    summary: str
    degradation_risk: str # "Low", "Moderate", "High", "Critical"
    degradation_factors: List[str]
    nutrients: List[NutrientStatus]
    soil_amendment_plan: List[str]
    historical_trend: List[Dict[str, Any]]
    confidence: str = "88% (Model-based)"

# ============================================================
# SMART IRRIGATION SCHEMAS
# ============================================================

class IrrigationRecommendation(BaseModel):
    action: str # "IRRIGATE", "DO NOT IRRIGATE", "MONITOR"
    action_color: str
    pump_status: str # "ON", "OFF", "STANDBY"
    urgency: str # "Immediate", "Recommended", "Optional", "Delay"
    primary_reason: str
    soil_moisture_current: float
    soil_moisture_target: float
    rain_probability: float
    expected_rainfall: float
    water_required_liters: float
    water_saved_liters: float
    estimated_cost_saving_inr: float
    next_check_hours: int
    smart_advice: str

# ============================================================
# CROP INTELLIGENCE SCHEMAS
# ============================================================

class CropStressAnalysis(BaseModel):
    crop_name: str
    variety: str
    growth_stage: str
    crop_health_score: int # 0 - 100
    moisture_stress: str # None, Mild, Moderate, Severe
    nutrient_stress: str # None, Nitrogen, Phosphorus, Potassium, Combined
    heat_stress: str # None, Mild, High
    disease_humidity_risk: str # Low, Moderate, High
    estimated_days_to_harvest: int
    expected_yield_quintals_per_acre: float
    potential_yield_loss_percent: float
    stage_specific_advice: str

# ============================================================
# AI FARM ADVISOR SCHEMAS
# ============================================================

class FarmAdvisorAction(BaseModel):
    id: str
    priority: int # 1 = highest, 5 = lowest
    category: str # "Irrigation", "Nutrient", "Soil Amendment", "Pest & Disease", "Weather Prep"
    title: str
    action: str
    why: str
    expected_impact: str
    confidence: str # e.g. "94% Confidence"
    urgency: str # "High Priority", "Medium Priority", "Standard"
    button_label: str
    button_action_type: str # "irrigate", "fertilize", "amend_ph", "review", "dismiss"

class AIAdvisorResponse(BaseModel):
    headline: str
    summary: str
    overall_farm_condition: str
    recommendations: List[FarmAdvisorAction]
    last_evaluated: datetime = Field(default_factory=datetime.utcnow)

# ============================================================
# FARM ECONOMICS & FINANCIAL HEALTH SCHEMAS
# ============================================================

class EconomicsComparison(BaseModel):
    fertilizer_cost: float
    water_pumping_cost: float
    labor_and_operations: float
    total_input_cost: float
    expected_yield_quintals: float
    estimated_gross_revenue: float
    estimated_net_profit: float

class FarmEconomicsReport(BaseModel):
    currency: str = "₹"
    area_acres: float
    crop_type: str
    current_practice: EconomicsComparison
    recommended_practice: EconomicsComparison
    net_profit_gain_inr: float
    potential_savings_inr: float
    input_cost_reduction_percent: float

    # Indebtedness & Financial Stress
    outstanding_debt_inr: float
    repayment_pressure: str # "Low", "Manageable", "Elevated", "High"
    debt_service_ratio: float
    financial_guidance: str
    disclaimer: str = "Model-based agronomic estimates. Indicative figures based on APMC market prices and typical farm inputs."

# ============================================================
# MARKET INTELLIGENCE SCHEMAS
# ============================================================

class MandiMarketItem(BaseModel):
    mandi_name: str
    district: str
    distance_km: float
    crop_name: str
    variety: str
    modal_price_per_quintal: float # INR / Quintal
    transport_cost_per_quintal: float
    mandi_cess_and_fees_per_quintal: float
    net_realization_per_quintal: float # Selling price - transport - fees
    price_trend: str # "Rising", "Stable", "Falling"
    is_recommended: bool

class MarketIntelligenceReport(BaseModel):
    crop_name: str
    estimated_harvest_quintals: float
    best_market_name: str
    maximum_net_realization: float
    total_estimated_revenue: float
    markets: List[MandiMarketItem]
    price_forecast_advice: str

# ============================================================
# SUSTAINABILITY & ENVIRONMENTAL IMPACT SCHEMAS
# ============================================================

class SustainabilityReport(BaseModel):
    water_saved_liters: float
    chemical_fertilizer_reduction_kg: float
    estimated_co2_reduction_kg: float
    soil_organic_carbon_index: float # %
    groundwater_conservation_score: int # 0 - 100
    eco_friendly_practices_active: List[str]
    sustainability_rating: str # "A+", "A", "B", "C"

# ============================================================
# FARM MAP ZONE SCHEMAS
# ============================================================

class FarmZone(BaseModel):
    zone_id: str
    zone_name: str
    area_acres: float
    crop: str
    status: str # "Healthy", "Water Stress", "Nutrient Stress", "Acidic Soil", "High Risk"
    status_color: str
    soil_moisture: float
    ph: float
    nitrogen: float
    degradation_risk: str
    primary_issue: str
    recommended_action: str
    coordinates: List[List[float]] # polygon vertices for Leaflet

# ============================================================
# SIMULATION SCENARIO SCHEMAS
# ============================================================

class SimulationScenario(BaseModel):
    scenario_id: str
    title: str
    category: str
    description: str
    tags: List[str]
    changes_summary: List[str]
    what_should_i_do: List[str]
    expected_impact: Dict[str, Any]
    target_state: Dict[str, Any]

class ScenarioHistoryItem(BaseModel):
    id: int
    timestamp: datetime
    scenario_id: str
    title: str
    category: str
    description: str
    soil_health_score: int
    primary_action: str
    changes_summary: str

class SimulationGenerateResponse(BaseModel):
    scenario: SimulationScenario
    current_state: FarmState
    soil_health: SoilHealthReport
    irrigation: IrrigationRecommendation
    advisor: AIAdvisorResponse
    economics: FarmEconomicsReport
