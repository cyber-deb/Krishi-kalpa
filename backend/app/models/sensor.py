from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean
from datetime import datetime
from app.database.database import Base

class SensorDevice(Base):
    __tablename__ = "sensor_devices"
    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String(100), unique=True, index=True, nullable=False)
    farm_id = Column(Integer, default=1)
    field_id = Column(Integer, default=1)
    status = Column(String(50), default="ACTIVE")
    battery_level = Column(Float, default=94.5)
    last_ping = Column(DateTime, default=datetime.utcnow)

class SensorReading(Base):
    __tablename__ = "sensor_readings"
    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String(100), index=True, nullable=False)
    soil_moisture = Column(Float, nullable=False)
    soil_temperature = Column(Float, nullable=False)
    ph = Column(Float, nullable=False)
    ec = Column(Float, nullable=False)
    nitrogen = Column(Float, nullable=False)
    phosphorus = Column(Float, nullable=False)
    potassium = Column(Float, nullable=False)
    air_temperature = Column(Float, default=28.0)
    humidity = Column(Float, default=65.0)
    rainfall = Column(Float, default=0.0)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    severity = Column(String(20), nullable=False) # CRITICAL, WARNING, INFO
    title = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    recommended_action = Column(Text, nullable=False)
    category = Column(String(50), default="SOIL") # SOIL, IRRIGATION, WEATHER, MARKET
    is_resolved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(50), nullable=False) # IRRIGATION, FERTILIZER, HARVEST, MARKET
    recommendation = Column(String(255), nullable=False)
    reason = Column(Text, nullable=False)
    confidence = Column(Float, default=0.88)
    expected_impact = Column(String(255), nullable=False)
    action_type = Column(String(50), default="ADVISORY")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
