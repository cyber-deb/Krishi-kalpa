from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.irrigation_service import IrrigationService

router = APIRouter(prefix="/irrigation", tags=["Smart Irrigation"])

@router.get("/recommendation", summary="Get real-time smart irrigation advisory")
def get_irrigation_recommendation(rain_prob: float = Query(20.0, ge=0.0, le=100.0), db: Session = Depends(get_db)):
    """
    Evaluates soil moisture against root-zone deficit and rainfall probability
    to issue 'IRRIGATION REQUIRED' or 'DO NOT IRRIGATE TODAY'.
    """
    return IrrigationService.get_recommendation(db, rain_prob)
