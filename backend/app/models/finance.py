from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.database.database import Base

class FarmExpense(Base):
    __tablename__ = "farm_expenses"
    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, default=1)
    category = Column(String(80), nullable=False) # Seeds, Fertilizer, Water/Electricity, Pesticides, Labour
    current_practice_cost = Column(Float, nullable=False)
    ai_optimized_cost = Column(Float, nullable=False)
    unit = Column(String(50), default="₹ per acre")
    notes = Column(String(255), default="Estimated input optimization")

class FarmDebt(Base):
    __tablename__ = "farm_debts"
    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, default=1)
    lender_name = Column(String(100), default="Kisan Credit Card (SBI)")
    principal_amount = Column(Float, default=120000.0)
    interest_rate_percent = Column(Float, default=7.0)
    due_date = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), default="ACTIVE")
