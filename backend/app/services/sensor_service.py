from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.models.sensor import SensorReading, Alert
from app.schemas.sensor import SensorReadingCreate
from app.utils.demo_data import DEFAULT_DEMO_STATE

# In-memory store for fallback if DB is in read-only / demo mode
_LATEST_IN_MEMORY_READING = DEFAULT_DEMO_STATE.copy()

class SensorService:
    @staticmethod
    def save_reading(db: Session, reading_in: SensorReadingCreate):
        global _LATEST_IN_MEMORY_READING
        _LATEST_IN_MEMORY_READING = reading_in.model_dump()
        _LATEST_IN_MEMORY_READING["timestamp"] = datetime.utcnow().isoformat()

        try:
            db_reading = SensorReading(
                device_id=reading_in.device_id,
                soil_moisture=reading_in.soil_moisture,
                soil_temperature=reading_in.soil_temperature,
                ph=reading_in.ph,
                ec=reading_in.ec,
                nitrogen=reading_in.nitrogen,
                phosphorus=reading_in.phosphorus,
                potassium=reading_in.potassium,
                air_temperature=reading_in.air_temperature,
                humidity=reading_in.humidity,
                rainfall=reading_in.rainfall
            )
            db.add(db_reading)

            # Auto trigger alerts on anomalous conditions
            if reading_in.soil_moisture < 30.0:
                alert = Alert(
                    severity="CRITICAL",
                    title="Critical Soil Moisture Depletion",
                    message=f"Field sensor {reading_in.device_id} reported soil moisture at {reading_in.soil_moisture}%.",
                    recommended_action="Initiate emergency micro-irrigation immediately.",
                    category="IRRIGATION"
                )
                db.add(alert)
            elif reading_in.ec > 1.5:
                alert = Alert(
                    severity="WARNING",
                    title="High Soil Salinity Stress (EC > 1.5 dS/m)",
                    message=f"Elevated soluble salts ({reading_in.ec} dS/m) detected.",
                    recommended_action="Flush soil with clean canal water and suspend saline tube-well usage.",
                    category="SOIL"
                )
                db.add(alert)

            db.commit()
            db.refresh(db_reading)
            return db_reading
        except Exception:
            db.rollback()
            return _LATEST_IN_MEMORY_READING

    @staticmethod
    def get_latest_reading(db: Session):
        global _LATEST_IN_MEMORY_READING
        try:
            latest = db.query(SensorReading).order_by(SensorReading.timestamp.desc()).first()
            if latest:
                return latest
        except Exception:
            pass
        return _LATEST_IN_MEMORY_READING

    @staticmethod
    def get_history(db: Session, limit: int = 50):
        try:
            readings = db.query(SensorReading).order_by(SensorReading.timestamp.desc()).limit(limit).all()
            if readings:
                return readings
        except Exception:
            pass
        return []
