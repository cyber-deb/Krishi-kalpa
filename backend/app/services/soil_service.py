from sqlalchemy.orm import Session
from app.ai.soil_model import SoilIntelligenceModel
from app.services.sensor_service import SensorService
from app.utils.demo_data import generate_30day_soil_history

soil_ai = SoilIntelligenceModel()

class SoilService:
    @staticmethod
    def get_soil_report(db: Session):
        reading = SensorService.get_latest_reading(db)
        if isinstance(reading, dict):
            ph = reading.get("ph", 6.4)
            ec = reading.get("ec", 0.82)
            n = reading.get("nitrogen", 58.0)
            p = reading.get("phosphorus", 72.0)
            k = reading.get("potassium", 64.0)
            moist = reading.get("soil_moisture", 62.0)
            temp = reading.get("soil_temperature", 27.4)
        else:
            ph = reading.ph
            ec = reading.ec
            n = reading.nitrogen
            p = reading.phosphorus
            k = reading.potassium
            moist = reading.soil_moisture
            temp = reading.soil_temperature

        report = soil_ai.evaluate(ph, ec, n, p, k, moist, temp)
        return report

    @staticmethod
    def get_30day_trend():
        return generate_30day_soil_history()
