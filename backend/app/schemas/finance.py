from pydantic import BaseModel
from typing import List, Dict

class ExpenseItem(BaseModel):
    category: str
    current_practice_inr: float
    ai_optimized_inr: float
    savings_inr: float

class FarmProfitReport(BaseModel):
    farm_area_acres: float
    total_current_cost_inr: float
    total_ai_optimized_cost_inr: float
    total_input_savings_inr: float
    projected_revenue_inr: float
    current_practice_profit_inr: float
    ai_optimized_profit_inr: float
    net_profit_gain_inr: float
    profit_increase_pct: float
    expense_breakdown: List[ExpenseItem]
    label_disclaimer: str = "ALL VALUES ARE MODEL-BASED PROJECTED ESTIMATES"
