from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.sensor import SensorReadingCreate, SensorReadingResponse
from app.services.sensor_service import SensorService

router = APIRouter(prefix="/sensors", tags=["Live IoT Telemetry"])

@router.post("/data", status_code=status.HTTP_201_CREATED, summary="Ingest live ESP32 field telemetry")
def ingest_sensor_data(reading_in: SensorReadingCreate, db: Session = Depends(get_db)):
    """
    Ingests live telemetry from in-field ESP32 microcontrollers.
    Persists reading, runs real-time threshold monitoring, and generates alerts if needed.
    """
    try:
        saved = SensorService.save_reading(db, reading_in)
        return {"status": "SUCCESS", "message": "Telemetry received and ingested successfully", "device_id": reading_in.device_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to ingest telemetry: {str(e)}")

@router.get("/latest", summary="Retrieve most recent sensor telemetry")
def get_latest_sensor_reading(db: Session = Depends(get_db)):
    """Returns the latest captured telemetry from field sensors."""
    reading = SensorService.get_latest_reading(db)
    if hasattr(reading, "id"):
        return {
            "device_id": reading.device_id,
            "soil_moisture": reading.soil_moisture,
            "soil_temperature": reading.soil_temperature,
            "ph": reading.ph,
            "ec": reading.ec,
            "nitrogen": reading.nitrogen,
            "phosphorus": reading.phosphorus,
            "potassium": reading.potassium,
            "air_temperature": reading.air_temperature,
            "humidity": reading.humidity,
            "rainfall": reading.rainfall,
            "timestamp": reading.timestamp.isoformat()
        }
    return reading

@router.get("/history", summary="Retrieve historical sensor readings")
def get_sensor_history(limit: int = 30, db: Session = Depends(get_db)):
    """Returns a list of historical sensor data points for charting and trend evaluation."""
    readings = SensorService.get_history(db, limit)
    return readings
