from sqlalchemy.orm import Session
from app.models.market import MarketPrice
from app.utils.calculations import calculate_net_realization

class MarketService:
    @staticmethod
    def get_market_analysis(db: Session, total_harvest_quintals: float = 54.0):
        # Default APMC mandis around Karnal agtech cluster
        mandi_configs = [
            {"name": "Karnal Main APMC", "dist": 6.5, "price": 3850.0, "mandi_fee": 40.0},
            {"name": "Taraori Mandi (Hub)", "dist": 21.0, "price": 4050.0, "mandi_fee": 45.0},
            {"name": "Panipat APMC", "dist": 34.0, "price": 3920.0, "mandi_fee": 45.0},
            {"name": "Gharaunda Sub-Yard", "dist": 14.0, "price": 3810.0, "mandi_fee": 38.0}
        ]

        mandi_options = []
        best_net = -1.0
        best_index = 0

        for idx, m in enumerate(mandi_configs):
            transport_cost_per_q = round(m["dist"] * 3.5, 2)
            net_realization_per_q = round(m["price"] - transport_cost_per_q - m["mandi_fee"], 2)
            total_net = round(net_realization_per_q * total_harvest_quintals, 2)

            if net_realization_per_q > best_net:
                best_net = net_realization_per_q
                best_index = idx

            mandi_options.append({
                "market_name": m["name"],
                "commodity": "Paddy (Basmati)",
                "distance_km": m["dist"],
                "modal_price_per_quintal": m["price"],
                "transport_cost_per_quintal": transport_cost_per_q,
                "mandi_fee_per_quintal": m["mandi_fee"],
                "net_realization_per_quintal": net_realization_per_q,
                "estimated_total_net_inr": total_net,
                "is_recommended": False,
                "advantage_vs_local_inr": 0.0
            })

        # Mark recommendation and compute advantage vs closest local mandi
        local_net = mandi_options[0]["estimated_total_net_inr"]
        for idx, opt in enumerate(mandi_options):
            if idx == best_index:
                opt["is_recommended"] = True
            opt["advantage_vs_local_inr"] = round(opt["estimated_total_net_inr"] - local_net, 2)

        opportunity_gain = mandi_options[best_index]["advantage_vs_local_inr"]

        return {
            "commodity": "Paddy (Basmati PB-1121)",
            "total_harvest_quintals": total_harvest_quintals,
            "best_market": mandi_options[best_index],
            "all_markets": mandi_options,
            "market_opportunity_gain_inr": max(0.0, opportunity_gain)
        }
