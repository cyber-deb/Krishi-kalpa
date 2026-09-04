from fastapi import APIRouter, Query
from app.services.profit_service import ProfitService

router = APIRouter(prefix="/profit", tags=["Farm Economics"])

@router.get("/analysis", summary="Get current vs AI-optimized input costs and profit analysis")
def get_profit_analysis(acres: float = Query(2.4, ge=0.5), harvest_quintals: float = Query(54.0, ge=1.0)):
    """Quantifies savings in seeds, chemical fertilizers, electricity, and pesticides."""
    return ProfitService.get_profit_comparison(acres, harvest_quintals)
