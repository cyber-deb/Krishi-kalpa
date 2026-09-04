class ProfitService:
    @staticmethod
    def get_profit_comparison(farm_acres: float = 2.4, total_harvest_quintals: float = 54.0):
        # Category breakdown for typical smallholder paddy farm (INR per acre)
        expenses_raw = [
            {"category": "Chemical Fertilizer (Urea/DAP)", "current": 6800.0, "ai_optimized": 4200.0},
            {"category": "Water & Tube-well Electricity", "current": 4500.0, "ai_optimized": 2800.0},
            {"category": "Pesticides & Crop Protection", "current": 3900.0, "ai_optimized": 2500.0},
            {"category": "Seeds & Nursery Preparation", "current": 3200.0, "ai_optimized": 2900.0},
            {"category": "Labour & Mechanical Harvesting", "current": 7600.0, "ai_optimized": 7100.0}
        ]

        expense_items = []
        tot_curr_cost = 0.0
        tot_ai_cost = 0.0

        for exp in expenses_raw:
            c = round(exp["current"] * farm_acres, 2)
            a = round(exp["ai_optimized"] * farm_acres, 2)
            s = round(c - a, 2)
            tot_curr_cost += c
            tot_ai_cost += a
            expense_items.append({
                "category": exp["category"],
                "current_practice_inr": c,
                "ai_optimized_inr": a,
                "savings_inr": s
            })

        # Expected revenue at optimized mandi net realization (₹3,931.50/quintal)
        projected_revenue = round(total_harvest_quintals * 3931.50, 2)
        curr_profit = round(projected_revenue - tot_curr_cost, 2)
        ai_profit = round(projected_revenue - tot_ai_cost, 2)
        net_gain = round(ai_profit - curr_profit, 2)
        pct_increase = round((net_gain / max(1.0, curr_profit)) * 100, 1)

        return {
            "farm_area_acres": farm_acres,
            "total_current_cost_inr": tot_curr_cost,
            "total_ai_optimized_cost_inr": tot_ai_cost,
            "total_input_savings_inr": round(tot_curr_cost - tot_ai_cost, 2),
            "projected_revenue_inr": projected_revenue,
            "current_practice_profit_inr": curr_profit,
            "ai_optimized_profit_inr": ai_profit,
            "net_profit_gain_inr": net_gain,
            "profit_increase_pct": pct_increase,
            "expense_breakdown": expense_items,
            "label_disclaimer": "ALL VALUES ARE MODEL-BASED PROJECTED ESTIMATES"
        }
