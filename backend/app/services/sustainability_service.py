from typing import List
from app.simulation.farm_state import farm_state_manager
from app.services.irrigation_service import IrrigationService
from app.schemas.schemas import SustainabilityReport

class SustainabilityService:
    @staticmethod
    def get_sustainability_impact() -> SustainabilityReport:
        state = farm_state_manager.get_state()
        irrigation = IrrigationService.get_recommendation()
        acres = state.config.area_acres

        # Water conserved calculations
        water_saved = irrigation.water_saved_liters
        if water_saved == 0 and irrigation.action == "DO NOT IRRIGATE":
            water_saved = 14500.0 * acres

        # Chemical fertilizer reduction (kg)
        if state.nitrogen > 100:
            fert_reduction_kg = 45.0 * acres
            co2_reduction_kg = round(fert_reduction_kg * 3.1, 1) # ~3.1 kg CO2e per kg synthetic N fertilizer
        elif state.nitrogen < 35:
            fert_reduction_kg = 12.0 * acres
            co2_reduction_kg = round(fert_reduction_kg * 2.8, 1)
        else:
            fert_reduction_kg = 28.0 * acres
            co2_reduction_kg = round(fert_reduction_kg * 3.0, 1)

        # Soil organic carbon & groundwater scores
        soc_index = round(state.organic_matter, 2)
        gw_score = min(98, max(45, int(70 + (water_saved / 1000.0))))

        eco_practices: List[str] = [
            "Precision Micro-irrigation with Rain Interlock",
            "Soil-Test Targeted Nutrient Management",
            "Continuous Root Zone Moisture Telemetry"
        ]

        if state.organic_matter >= 1.5:
            eco_practices.append("High Organic Residue Retention & Mulching")
        if state.rain_probability > 60:
            eco_practices.append("Precipitation Harvesting & Aquifer Recharging")

        if soc_index >= 1.6 and water_saved > 15000:
            rating = "A+"
        elif soc_index >= 1.2 and water_saved > 8000:
            rating = "A"
        elif soc_index >= 1.0:
            rating = "B"
        else:
            rating = "C"

        return SustainabilityReport(
            water_saved_liters=round(water_saved, 0),
            chemical_fertilizer_reduction_kg=round(fert_reduction_kg, 1),
            estimated_co2_reduction_kg=round(co2_reduction_kg, 1),
            soil_organic_carbon_index=soc_index,
            groundwater_conservation_score=gw_score,
            eco_friendly_practices_active=eco_practices,
            sustainability_rating=rating
        )
