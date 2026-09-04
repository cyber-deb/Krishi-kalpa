from sqlalchemy.orm import Session
from app.ai.irrigation_model import SmartIrrigationModel
from app.services.sensor_service import SensorService

irrigation_ai = SmartIrrigationModel()

class IrrigationService:
    @staticmethod
    def get_recommendation(db: Session, rain_prob: float = 20.0):
        reading = SensorService.get_latest_reading(db)
        moisture = reading.get("soil_moisture", 62.0) if isinstance(reading, dict) else reading.soil_moisture
        air_temp = reading.get("air_temperature", 29.0) if isinstance(reading, dict) else getattr(reading, "air_temperature", 29.0)

        return irrigation_ai.evaluate(moisture, rain_prob, air_temp, "Vegetative Tillering", 2.4)
