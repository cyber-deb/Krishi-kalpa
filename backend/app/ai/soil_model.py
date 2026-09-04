import numpy as np
from app.utils.calculations import calculate_soil_health_score, calculate_degradation_risk

class SoilIntelligenceModel:
    def __init__(self):
        self.version = "v1.4-physics-guided"

    def evaluate(self, ph: float, ec: float, n: float, p: float, k: float, moisture: float, temp: float) -> dict:
        health_score = calculate_soil_health_score(ph, ec, n, p, k)
        risk = calculate_degradation_risk(health_score, ec, ph)

        nutrient_status = {}
        nutrient_status["Nitrogen"] = "Optimal" if 45 <= n <= 75 else ("Deficient" if n < 45 else "Excessive")
        nutrient_status["Phosphorus"] = "Optimal" if 35 <= p <= 65 else ("Deficient" if p < 35 else "Elevated")
        nutrient_status["Potassium"] = "Optimal" if 50 <= k <= 80 else ("Deficient" if k < 50 else "High")
        nutrient_status["pH Balance"] = "Neutral / Ideal" if 6.2 <= ph <= 7.5 else ("Acidic Stress" if ph < 6.2 else "Alkaline / Calcareous")
        nutrient_status["Salinity (EC)"] = "Safe (< 1.0 dS/m)" if ec < 1.0 else ("Moderate Salinity" if ec <= 1.8 else "Critical Salinity Stress")

        action_advisories = []
        if n > 80:
            action_advisories.append("Reduce synthetic nitrogen (Urea) top-dressing by 25% to prevent nitrate runoff and soil acidification.")
        elif n < 40:
            action_advisories.append("Apply neem-coated urea or organic compost to support tillering stage.")

        if p > 70:
            action_advisories.append("Hold DAP application; utilize Phosphate Solubilizing Bacteria (PSB) to mobilize fixed phosphorus.")

        if ec > 1.2:
            action_advisories.append("High electrical conductivity detected. Apply gypsum and ensure adequate drainage leaching.")

        if not action_advisories:
            action_advisories.append("Soil physicochemical balance is within target range. Maintain current organic mulching practices.")

        return {
            "health_score": health_score,
            "degradation_risk": risk,
            "organic_matter_percent": 0.74,
            "ph": ph,
            "ec": ec,
            "nitrogen": n,
            "phosphorus": p,
            "potassium": k,
            "soil_moisture": moisture,
            "soil_temperature": temp,
            "nutrient_status": nutrient_status,
            "recommendations": action_advisories
        }
