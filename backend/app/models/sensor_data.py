from datetime import datetime
from sqlalchemy import Column, Integer, Float, String, DateTime, Boolean, Text
from app.database.database import Base

class SensorReadingModel(Base):
    __tablename__ = "sensor_readings"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    device_id = Column(String(50), index=True, default="ESP32-FARM-001")
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

    # Soil Sensors
    soil_moisture = Column(Float, nullable=False) # %
    soil_temperature = Column(Float, nullable=False) # °C
    ph = Column(Float, nullable=False) # pH units
    ec = Column(Float, nullable=False) # dS/m (salinity)
    nitrogen = Column(Float, nullable=False) # mg/kg or kg/ha
    phosphorus = Column(Float, nullable=False) # mg/kg or kg/ha
    potassium = Column(Float, nullable=False) # mg/kg or kg/ha

    # Environment Sensors
    air_temperature = Column(Float, nullable=False) # °C
    humidity = Column(Float, nullable=False) # %
    rainfall = Column(Float, default=0.0) # mm
    light_intensity = Column(Float, default=1200.0) # Lux

    # Diagnostics
    battery = Column(Float, default=95.0) # %
    signal_strength = Column(Integer, default=-65) # dBm
    is_simulated = Column(Boolean, default=False)

class ScenarioHistoryModel(Base):
    __tablename__ = "scenario_history"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    scenario_id = Column(String(100), nullable=False)
    title = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    soil_health_score = Column(Integer, nullable=False)
    primary_action = Column(String(250), nullable=False)
    changes_summary = Column(Text, nullable=False)

class AlertModel(Base):
    __tablename__ = "farm_alerts"

    id = Column(String(50), primary_key=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    title = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    severity = Column(String(20), nullable=False) # info, warning, danger, success
    category = Column(String(50), nullable=False) # soil, water, crop, weather, device
    action_label = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True)
