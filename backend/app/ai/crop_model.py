class CropIntelligenceModel:
    def evaluate(self, crop_name: str, health_score: float, soil_moisture: float) -> dict:
        # Base phenology model
        stage = "Vegetative Tillering"
        progress = 46.0
        days_to_harvest = 68

        # Calculate health index
        crop_health = round((health_score * 0.6) + (min(100.0, soil_moisture * 1.4) * 0.4), 1)
        predicted_yield = round(21.5 + (crop_health - 70.0) * 0.08, 1) # quintals/acre

        risks = []
        interventions = []

        if soil_moisture < 35.0:
            risks.append("Water stress risk during active panicle initiation.")
            interventions.append("Prioritize micro-irrigation or furrow wetting.")
        if health_score < 60.0:
            risks.append("Nutrient assimilation lag due to soil pH or salinity imbalance.")
            interventions.append("Foliar zinc sulfate (0.5%) + urea spray to bypass root lockout.")

        if not risks:
            risks.append("No critical biological or abiotic stress detected.")
            interventions.append("Maintain standard field scouting for brown plant hopper (BPH).")

        return {
            "crop_name": crop_name,
            "variety": "Basmati PB-1121",
            "current_stage": stage,
            "stage_progress_pct": progress,
            "crop_health_index": min(98.0, max(30.0, crop_health)),
            "days_to_harvest": days_to_harvest,
            "predicted_yield_quintal_acre": max(12.0, min(28.0, predicted_yield)),
            "risk_factors": risks,
            "optimal_interventions": interventions
        }
