from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.database.database import Base

class MarketPrice(Base):
    __tablename__ = "market_prices"
    id = Column(Integer, primary_key=True, index=True)
    market_name = Column(String(120), nullable=False) # Mandi Karnal, Mandi Panipat, Mandi Kurukshetra
    commodity = Column(String(100), default="Paddy (Basmati)")
    distance_km = Column(Float, nullable=False)
    modal_price_per_quintal = Column(Float, nullable=False)
    transport_cost_per_quintal = Column(Float, nullable=False)
    mandi_fee_per_quintal = Column(Float, default=45.0)
    net_realization_per_quintal = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
