from sqlalchemy import Column, Integer, Float, DateTime, String, ForeignKey
from datetime import datetime
from app.database.database import Base

class SoilAnalysis(Base):
    __tablename__ = "soil_analyses"
    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, default=1)
    health_score = Column(Float, default=68.0)
    organic_matter_percent = Column(Float, default=0.72)
    degradation_risk = Column(String(50), default="MODERATE") # LOW, MODERATE, HIGH, CRITICAL
    nitrogen_level = Column(Float, default=58.0)
    phosphorus_level = Column(Float, default=72.0)
    potassium_level = Column(Float, default=64.0)
    ph = Column(Float, default=6.5)
    ec = Column(Float, default=0.82)
    moisture = Column(Float, default=55.0)
    carbon_sequestration_est = Column(Float, default=145.0) # kg CO2 eq/acre
    timestamp = Column(DateTime, default=datetime.utcnow)
