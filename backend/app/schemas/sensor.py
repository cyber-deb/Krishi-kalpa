from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class SensorReadingCreate(BaseModel):
    device_id: str = Field(..., example="ESP32-FARM-001")
    soil_moisture: float = Field(..., ge=0.0, le=100.0, example=62.0)
    soil_temperature: float = Field(..., example=27.4)
    ph: float = Field(..., ge=0.0, le=14.0, example=6.4)
    ec: float = Field(..., ge=0.0, example=0.82)
    nitrogen: float = Field(..., ge=0.0, example=58.0)
    phosphorus: float = Field(..., ge=0.0, example=72.0)
    potassium: float = Field(..., ge=0.0, example=64.0)
    air_temperature: Optional[float] = 28.5
    humidity: Optional[float] = 68.0
    rainfall: Optional[float] = 0.0

class SensorReadingResponse(SensorReadingCreate):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class AlertResponse(BaseModel):
    id: int
    severity: str
    title: str
    message: str
    recommended_action: str
    category: str
    is_resolved: bool
    created_at: datetime

    class Config:
        from_attributes = True

class RecommendationResponse(BaseModel):
    id: int
    category: str
    recommendation: str
    reason: str
    confidence: float
    expected_impact: str
    action_type: str
    created_at: datetime

    class Config:
        from_attributes = True
