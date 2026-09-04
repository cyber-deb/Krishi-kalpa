from pydantic import BaseModel
from typing import List

class CropIntelligenceReport(BaseModel):
    crop_name: str
    variety: str
    current_stage: str
    stage_progress_pct: float
    crop_health_index: float
    days_to_harvest: int
    predicted_yield_quintal_acre: float
    risk_factors: List[str]
    optimal_interventions: List[str]
