from sqlalchemy.orm import Session
from app.ai.crop_model import CropIntelligenceModel
from app.services.soil_service import SoilService

crop_ai = CropIntelligenceModel()

class CropService:
    @staticmethod
    def get_crop_intelligence(db: Session):
        soil_rep = SoilService.get_soil_report(db)
        return crop_ai.evaluate("Paddy (Basmati PB-1121)", soil_rep["health_score"], soil_rep["soil_moisture"])
