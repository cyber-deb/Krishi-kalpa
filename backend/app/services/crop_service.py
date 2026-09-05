from app.simulation.farm_state import farm_state_manager
from app.schemas.schemas import CropStressAnalysis

class CropService:
    @staticmethod
    def get_crop_analysis() -> CropStressAnalysis:
        state = farm_state_manager.get_state()

        crop = state.config.crop_type
        variety = state.config.crop_variety
        stage = state.config.growth_stage

        moisture = state.soil_moisture
        n = state.nitrogen
        p = state.phosphorus
        k = state.potassium
        air_temp = state.air_temperature
        humidity = state.humidity

        # Moisture stress
        if moisture < 28:
            m_stress = "Severe Water Deficit"
            m_penalty = 25
        elif moisture < 45:
            m_stress = "Moderate Moisture Stress"
            m_penalty = 12
        elif moisture > 90:
            m_stress = "Waterlogging Anoxia"
            m_penalty = 18
        else:
            m_stress = "None (Optimal)"
            m_penalty = 0

        # Nutrient stress
        nutrient_issues = []
        n_penalty = 0
        if n < 35:
            nutrient_issues.append("Nitrogen")
            n_penalty += 15
        elif n > 110:
            nutrient_issues.append("Excess Nitrogen")
            n_penalty += 8

        if p < 30:
            nutrient_issues.append("Phosphorus")
            n_penalty += 10
        if k < 35:
            nutrient_issues.append("Potassium")
            n_penalty += 8

        nutr_stress = " + ".join(nutrient_issues) if nutrient_issues else "None (Balanced NPK)"

        # Heat stress
        if air_temp > 38.0:
            heat_stress = "Severe Heatwave Stress"
            h_penalty = 15
        elif air_temp > 33.0:
            heat_stress = "Mild Temperature Stress"
            h_penalty = 6
        else:
            heat_stress = "None (Normal)"
            h_penalty = 0

        # Disease / humidity risk
        if humidity > 90.0 and air_temp > 25.0:
            disease_risk = "High (Fungal Blast/Blight Risk)"
            d_penalty = 12
        elif humidity > 80.0:
            disease_risk = "Moderate (Mildew Alert)"
            d_penalty = 5
        else:
            disease_risk = "Low (Safe Microclimate)"
            d_penalty = 0

        # Calculate dynamic crop health score
        base_score = 96
        total_penalty = m_penalty + n_penalty + h_penalty + d_penalty
        crop_health = max(20, min(99, base_score - total_penalty))

        # Yield calculations
        baseline_yield = 24.5 # Quintals per acre for IR-64 paddy
        potential_loss = round(min(60.0, total_penalty * 0.8), 1)
        expected_yield = round(baseline_yield * (1.0 - (potential_loss / 100.0)), 1)

        # Stage specific advice
        if stage == "Vegetative":
            stage_advice = "Focus on healthy tillering and root spread. Avoid excessive water standing in early vegetative stage."
        elif stage == "Flowering":
            stage_advice = "Critical moisture phase. Water stress during anthesis can cause spikelet sterility. Keep soil moist."
        elif stage == "Grain Filling":
            stage_advice = "Maintain potassium nutrition for grain weight and prevent premature lodging."
        else:
            stage_advice = "Standard crop surveillance and weed control recommended."

        return CropStressAnalysis(
            crop_name=crop,
            variety=variety,
            growth_stage=stage,
            crop_health_score=crop_health,
            moisture_stress=m_stress,
            nutrient_stress=nutr_stress,
            heat_stress=heat_stress,
            disease_humidity_risk=disease_risk,
            estimated_days_to_harvest=68,
            expected_yield_quintals_per_acre=expected_yield,
            potential_yield_loss_percent=potential_loss,
            stage_specific_advice=stage_advice
        )
