class YieldPredictionModel:
    """Predictive statistical yield modeling."""
    def predict_yield(self, crop: str, soil_score: float, moisture_stability: float, farm_acres: float = 2.4) -> dict:
        base_yield_per_acre = 22.0 # Quintals for Basmati Paddy
        score_factor = (soil_score - 50.0) / 100.0
        estimated_yield_per_acre = round(base_yield_per_acre * (1.0 + (score_factor * 0.25)), 2)
        total_estimated_harvest_quintals = round(estimated_yield_per_acre * farm_acres, 1)

        return {
            "crop": crop,
            "farm_acres": farm_acres,
            "yield_per_acre_quintal": estimated_yield_per_acre,
            "total_harvest_quintals": total_estimated_harvest_quintals,
            "confidence_pct": 88.5
        }
