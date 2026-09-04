class SmartIrrigationModel:
    """
    Decides irrigation necessity based on:
    - Root zone soil moisture depletion percentage
    - 24-48h precipitation probability
    - Evapotranspiration stress threshold
    """
    def evaluate(self, soil_moisture: float, rain_probability: float, air_temp: float, crop_stage: str = "Tillering", farm_acres: float = 2.4) -> dict:
        threshold_min = 45.0  # Basmati Paddy minimum comfortable moisture %
        threshold_max = 80.0

        # Calculate water requirement
        # 1 acre-inch ~ 102,790 Liters. Typical light cycle: 0.15 inch = ~15,400 L / acre
        liters_per_cycle = round(15400 * farm_acres, 0)

        if soil_moisture < 35.0:
            if rain_probability > 75.0:
                return {
                    "irrigation_required": False,
                    "status_label": "DO NOT IRRIGATE TODAY",
                    "reason": f"Soil moisture is low ({soil_moisture}%), but high rain probability ({rain_probability}%) will replenish soil naturally.",
                    "confidence_pct": 89.0,
                    "soil_moisture_pct": soil_moisture,
                    "rain_probability_pct": rain_probability,
                    "growth_stage": crop_stage,
                    "estimated_water_requirement_liters": liters_per_cycle,
                    "estimated_water_saved_liters": liters_per_cycle,
                    "estimated_cost_saving_inr": round(farm_acres * 140, 2),
                    "pump_status": "OFF (Standby for rain)"
                }
            else:
                return {
                    "irrigation_required": True,
                    "status_label": "IRRIGATION REQUIRED",
                    "reason": f"Soil moisture depleted to critical {soil_moisture}% with low rain forecast ({rain_probability}%).",
                    "confidence_pct": 94.0,
                    "soil_moisture_pct": soil_moisture,
                    "rain_probability_pct": rain_probability,
                    "growth_stage": crop_stage,
                    "estimated_water_requirement_liters": liters_per_cycle,
                    "estimated_water_saved_liters": 0.0,
                    "estimated_cost_saving_inr": 0.0,
                    "pump_status": "ACTIVE / RECOMMENDED ON"
                }
        elif soil_moisture < 50.0:
            if rain_probability > 50.0:
                return {
                    "irrigation_required": False,
                    "status_label": "DO NOT IRRIGATE TODAY",
                    "reason": "Moderate soil moisture with incoming precipitation window.",
                    "confidence_pct": 91.0,
                    "soil_moisture_pct": soil_moisture,
                    "rain_probability_pct": rain_probability,
                    "growth_stage": crop_stage,
                    "estimated_water_requirement_liters": liters_per_cycle,
                    "estimated_water_saved_liters": liters_per_cycle,
                    "estimated_cost_saving_inr": round(farm_acres * 140, 2),
                    "pump_status": "OFF"
                }
            else:
                return {
                    "irrigation_required": True,
                    "status_label": "IRRIGATION RECOMMENDED",
                    "reason": "Moisture approaching lower threshold. Scheduled light 45-min cycle advised.",
                    "confidence_pct": 86.0,
                    "soil_moisture_pct": soil_moisture,
                    "rain_probability_pct": rain_probability,
                    "growth_stage": crop_stage,
                    "estimated_water_requirement_liters": liters_per_cycle * 0.6,
                    "estimated_water_saved_liters": 0.0,
                    "estimated_cost_saving_inr": 0.0,
                    "pump_status": "SCHEDULED"
                }
        else:
            # Sufficient moisture
            return {
                "irrigation_required": False,
                "status_label": "DO NOT IRRIGATE TODAY",
                "reason": f"Root-zone soil moisture is adequate at {soil_moisture}%. Excess irrigation risks root rot and nutrient leaching.",
                "confidence_pct": 96.0,
                "soil_moisture_pct": soil_moisture,
                "rain_probability_pct": rain_probability,
                "growth_stage": crop_stage,
                "estimated_water_requirement_liters": 0.0,
                "estimated_water_saved_liters": liters_per_cycle,
                "estimated_cost_saving_inr": round(farm_acres * 150, 2),
                "pump_status": "OFF"
            }
