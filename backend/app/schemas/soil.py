from pydantic import BaseModel
from datetime import datetime
from typing import Dict, Any

class SoilHealthReport(BaseModel):
    health_score: float
    degradation_risk: str
    organic_matter_percent: float
    ph: float
    ec: float
    nitrogen: float
    phosphorus: float
    potassium: float
    soil_moisture: float
    soil_temperature: float
    nutrient_status: Dict[str, str]
    recommendations: list[str]
    scientific_disclaimer: str = "Indicative field model estimate. Periodic lab calibration recommended."
    timestamp: datetime
