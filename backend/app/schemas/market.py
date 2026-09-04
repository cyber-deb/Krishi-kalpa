from pydantic import BaseModel
from typing import List

class MandiOption(BaseModel):
    market_name: str
    commodity: str
    distance_km: float
    modal_price_per_quintal: float
    transport_cost_per_quintal: float
    mandi_fee_per_quintal: float
    net_realization_per_quintal: float
    estimated_total_net_inr: float
    is_recommended: bool
    advantage_vs_local_inr: float

class MarketIntelligenceReport(BaseModel):
    commodity: str
    total_harvest_quintals: float
    best_market: MandiOption
    all_markets: List[MandiOption]
    market_opportunity_gain_inr: float
