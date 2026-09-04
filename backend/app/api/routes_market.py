from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.market_service import MarketService

router = APIRouter(prefix="/market", tags=["Market Intelligence"])

@router.get("/prices", summary="Get APMC Mandi prices and Net Realization rankings")
def get_market_prices(harvest_quintals: float = Query(54.0, ge=1.0), db: Session = Depends(get_db)):
    """
    Ranks nearby Mandis based on real net realization taking into account
    transportation cost (₹/km/q) and APMC mandi cess.
    """
    return MarketService.get_market_analysis(db, harvest_quintals)
