from typing import List
from app.simulation.farm_state import farm_state_manager
from app.services.crop_service import CropService
from app.schemas.schemas import MandiMarketItem, MarketIntelligenceReport

class MarketService:
    @staticmethod
    def get_market_intelligence() -> MarketIntelligenceReport:
        state = farm_state_manager.get_state()
        crop_analysis = CropService.get_crop_analysis()

        crop_name = state.config.crop_type
        variety = state.config.crop_variety
        acres = state.config.area_acres
        total_quintals = crop_analysis.expected_yield_quintals_per_acre * acres

        # Dynamic APMC Mandi data around Wardha/Vidarbha region
        mandis_raw = [
            {
                "mandi_name": "Wardha APMC Mandi",
                "district": "Wardha",
                "distance_km": 12.0,
                "base_price": 2320.0,
                "transport_rate_per_km": 3.2,
                "mandi_cess": 28.0,
                "price_trend": "Stable"
            },
            {
                "mandi_name": "Hinganghat Commercial APMC",
                "district": "Wardha",
                "distance_km": 34.0,
                "base_price": 2480.0,
                "transport_rate_per_km": 2.8,
                "mandi_cess": 32.0,
                "price_trend": "Rising"
            },
            {
                "mandi_name": "Nagpur Kalamna Grain Terminal",
                "district": "Nagpur",
                "distance_km": 76.0,
                "base_price": 2590.0,
                "transport_rate_per_km": 2.4,
                "mandi_cess": 35.0,
                "price_trend": "Rising"
            },
            {
                "mandi_name": "Amravati Cotton & Grain Mandi",
                "district": "Amravati",
                "distance_km": 95.0,
                "base_price": 2440.0,
                "transport_rate_per_km": 2.2,
                "mandi_cess": 30.0,
                "price_trend": "Stable"
            },
            {
                "mandi_name": "Yavatmal APMC Yard",
                "district": "Yavatmal",
                "distance_km": 68.0,
                "base_price": 2360.0,
                "transport_rate_per_km": 2.6,
                "mandi_cess": 25.0,
                "price_trend": "Falling"
            }
        ]

        markets: List[MandiMarketItem] = []
        best_market_name = ""
        max_net_realization = -1.0

        for m in mandis_raw:
            transport_cost = round(m["distance_km"] * m["transport_rate_per_km"], 1)
            fees = m["mandi_cess"]
            net_realization = round(m["base_price"] - transport_cost - fees, 1)

            if net_realization > max_net_realization:
                max_net_realization = net_realization
                best_market_name = m["mandi_name"]

            markets.append(
                MandiMarketItem(
                    mandi_name=m["mandi_name"],
                    district=m["district"],
                    distance_km=m["distance_km"],
                    crop_name=crop_name,
                    variety=variety,
                    modal_price_per_quintal=m["base_price"],
                    transport_cost_per_quintal=transport_cost,
                    mandi_cess_and_fees_per_quintal=fees,
                    net_realization_per_quintal=net_realization,
                    price_trend=m["price_trend"],
                    is_recommended=False
                )
            )

        # Mark recommended market
        for m in markets:
            if m.mandi_name == best_market_name:
                m.is_recommended = True

        total_revenue = round(total_quintals * max_net_realization, 0)
        forecast_advice = f"{best_market_name} yields the highest net realization (₹{max_net_realization:.0f}/Q) after accounting for transportation and APMC cess."

        return MarketIntelligenceReport(
            crop_name=crop_name,
            estimated_harvest_quintals=round(total_quintals, 1),
            best_market_name=best_market_name,
            maximum_net_realization=max_net_realization,
            total_estimated_revenue=total_revenue,
            markets=markets,
            price_forecast_advice=forecast_advice
        )
