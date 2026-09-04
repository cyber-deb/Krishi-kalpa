from pydantic import BaseModel

class IrrigationDecision(BaseModel):
    irrigation_required: bool
    status_label: str # "IRRIGATION REQUIRED" or "DO NOT IRRIGATE TODAY"
    reason: str
    confidence_pct: float
    soil_moisture_pct: float
    rain_probability_pct: float
    growth_stage: str
    estimated_water_requirement_liters: float
    estimated_water_saved_liters: float
    estimated_cost_saving_inr: float
    pump_status: str # "OFF", "ON", "STANDBY"
