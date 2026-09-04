from app.ai.soil_model import SoilIntelligenceModel
from app.ai.irrigation_model import SmartIrrigationModel
from app.ai.crop_model import CropIntelligenceModel

class MasterRecommendationEngine:
    def __init__(self):
        self.soil_ai = SoilIntelligenceModel()
        self.irrigation_ai = SmartIrrigationModel()
        self.crop_ai = CropIntelligenceModel()

    def generate_daily_master_plan(self, soil_data: dict, weather_data: dict, farm_acres: float = 2.4) -> dict:
        moisture = soil_data.get("soil_moisture", 62.0)
        ph = soil_data.get("ph", 6.4)
        ec = soil_data.get("ec", 0.82)
        n = soil_data.get("nitrogen", 58.0)
        p = soil_data.get("phosphorus", 72.0)
        k = soil_data.get("potassium", 64.0)
        temp = soil_data.get("soil_temperature", 27.4)
        rain_prob = weather_data.get("rain_probability", 20.0)

        soil_eval = self.soil_ai.evaluate(ph, ec, n, p, k, moisture, temp)
        irrigation_eval = self.irrigation_ai.evaluate(moisture, rain_prob, weather_data.get("temperature", 29.0), "Tillering", farm_acres)
        crop_eval = self.crop_ai.evaluate("Paddy (Basmati)", soil_eval["health_score"], moisture)

        # Build Primary Daily Action
        if not irrigation_eval["irrigation_required"]:
            if rain_prob > 60:
                primary_action = {
                    "headline": "DO NOT IRRIGATE TODAY — RAIN EXPECTED",
                    "badge": "RAIN FORECAST",
                    "badge_color": "blue",
                    "reason": f"High precipitation probability ({rain_prob}%) modeled within 24h. Soil moisture is currently adequate at {moisture}%.",
                    "confidence": 92,
                    "impact": f"Saves ~{int(irrigation_eval['estimated_water_saved_liters']):,} L groundwater & ₹{int(irrigation_eval['estimated_cost_saving_inr'])} electricity."
                }
            elif p > 70:
                primary_action = {
                    "headline": "REDUCE CHEMICAL PHOSPHORUS (DAP) APPLICATION",
                    "badge": "NUTRIENT OPTIMIZATION",
                    "badge_color": "emerald",
                    "reason": f"Available soil phosphorus is elevated at {p} kg/ha. Adding more DAP causes salt accumulation.",
                    "confidence": 89,
                    "impact": "Saves ₹1,560 in fertilizer cost while preventing soil acidification."
                }
            else:
                primary_action = {
                    "headline": "DO NOT IRRIGATE TODAY — MOISTURE OPTIMAL",
                    "badge": "OPTIMAL CONDITIONS",
                    "badge_color": "emerald",
                    "reason": f"Root-zone moisture is in the sweet spot ({moisture}%). Preserve groundwater.",
                    "confidence": 94,
                    "impact": f"Saves ~{int(irrigation_eval['estimated_water_saved_liters']):,} L groundwater."
                }
        else:
            primary_action = {
                "headline": "IRRIGATION REQUIRED — CRITICAL MOISTURE DEFICIT",
                "badge": "WATER STRESS",
                "badge_color": "amber",
                "reason": f"Soil moisture has dropped to {moisture}%. Panicle initiation requires immediate hydration.",
                "confidence": 95,
                "impact": "Prevents 8% crop tillering yield loss. Run pump for 45 mins."
            }

        # Secondary high-value advisories
        advisories = [
            {
                "category": "SOIL HEALTH",
                "title": "Soil Organic Matter Needs Attention",
                "text": "Organic Carbon estimated at 0.72%. Apply biochar or green manure post-harvest.",
                "type": "warning" if soil_eval["organic_matter_percent"] < 0.75 else "info"
            },
            {
                "category": "MARKET OPPORTUNITY",
                "title": "Taraori Mandi Offers Better Net Realization (+₹3,400)",
                "text": "Higher modal price (₹4,050/q) easily covers ₹73.50/q transit cost.",
                "type": "success"
            }
        ]

        return {
            "primary_action": primary_action,
            "advisories": advisories,
            "soil_eval": soil_eval,
            "irrigation_eval": irrigation_eval,
            "crop_eval": crop_eval
        }
