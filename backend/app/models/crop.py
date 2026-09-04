from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.database.database import Base

class Crop(Base):
    __tablename__ = "crops"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False) # Paddy, Wheat, Cotton, Mustard, Maize
    variety = Column(String(100), default="Basmati PB-1121")
    ideal_ph_min = Column(Float, default=6.0)
    ideal_ph_max = Column(Float, default=7.5)
    ideal_moisture_min = Column(Float, default=50.0)
    ideal_moisture_max = Column(Float, default=80.0)
    water_requirement_mm = Column(Float, default=1200.0)
    standard_duration_days = Column(Integer, default=120)

class CropCycle(Base):
    __tablename__ = "crop_cycles"
    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, default=1)
    crop_name = Column(String(100), default="Paddy (Rice)")
    sowing_date = Column(DateTime, default=datetime.utcnow)
    current_stage = Column(String(80), default="Vegetative Tillering")
    stage_progress_pct = Column(Float, default=42.0)
    expected_yield_quintal_acre = Column(Float, default=22.5)
    health_index = Column(Float, default=81.0)
