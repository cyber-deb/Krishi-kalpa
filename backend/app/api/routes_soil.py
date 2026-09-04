from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.soil_service import SoilService

router = APIRouter(prefix="/soil", tags=["Soil Intelligence"])

@router.get("/health", summary="Get comprehensive Soil Health & Degradation index")
def get_soil_health(db: Session = Depends(get_db)):
    """Computes real-time Soil Health Score (0-100), NPK balance, and degradation risk."""
    return SoilService.get_soil_report(db)

@router.get("/history", summary="Get 30-day soil degradation and nutrient trend")
def get_soil_history():
    """Returns historical 30-day telemetry trends for charting."""
    return SoilService.get_30day_trend()
