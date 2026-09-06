from app.simulation.farm_state import farm_state_manager
from app.schemas.schemas import IrrigationRecommendation

class IrrigationService:
    @staticmethod
    def get_recommendation() -> IrrigationRecommendation:
        state = farm_state_manager.get_state()

        moisture = state.soil_moisture
        rain_prob = state.rain_probability
        expected_rain = state.expected_rainfall
        air_temp = state.air_temperature
        acres = state.config.area_acres

        target_moisture = 65.0
        # Typical water requirement calculation: 1 mm depth across 1 acre = ~4046 Litres
        # 1% moisture deficit ~ 0.5 mm equivalent
        moisture_deficit = max(0.0, target_moisture - moisture)

        # Decision Tree for Smart Irrigation
        if rain_prob >= 70.0 and expected_rain >= 5.0:
            action = "DO NOT IRRIGATE"
            action_color = "emerald"
            pump_status = "OFF"
            urgency = "Delay"
            primary_reason = f"Rain probability is {rain_prob:.0f}% with {expected_rain:.1f} mm expected rainfall. Natural precipitation is adequate."
            water_required = 0.0
            water_saved = round(moisture_deficit * 0.5 * 4046 * acres, 0)
            cost_saving = round((water_saved / 1000.0) * 18.5, 0) # ~₹18.5 per 1000L pumping energy
            next_check = 12
            smart_advice = "Delay irrigation to save electricity and prevent nitrate leaching from rainwater runoff."

        elif moisture < 35.0:
            action = "IRRIGATE"
            action_color = "red"
            pump_status = "ON"
            urgency = "Immediate"
            if air_temp > 35.0:
                primary_reason = f"Critical soil moisture deficit ({moisture:.1f}%) combined with heat stress ({air_temp:.1f}°C). Rapid hydration needed."
            else:
                primary_reason = f"Soil moisture is critically low at {moisture:.1f}% (below 35% wilting margin for {state.config.crop_type})."
            water_required = round(moisture_deficit * 0.5 * 4046 * acres, 0)
            water_saved = 0.0
            cost_saving = 0.0
            next_check = 4
            smart_advice = f"Operate drip/sprinkler pump for ~{round(water_required / 7000.0, 1)} hours during early morning or late evening."

        elif moisture < 50.0:
            if rain_prob < 40.0:
                action = "IRRIGATE"
                action_color = "amber"
                pump_status = "ON"
                urgency = "Recommended"
                primary_reason = f"Soil moisture ({moisture:.1f}%) is below optimal target (65%) with low rain likelihood ({rain_prob:.0f}%)."
                water_required = round(moisture_deficit * 0.4 * 4046 * acres, 0)
                water_saved = 0.0
                cost_saving = 0.0
                next_check = 8
                smart_advice = "Light irrigation cycle recommended to maintain consistent root hydration."
            else:
                action = "MONITOR"
                action_color = "yellow"
                pump_status = "STANDBY"
                urgency = "Optional"
                primary_reason = f"Moisture is moderate ({moisture:.1f}%) and there is a {rain_prob:.0f}% chance of rain. Hold pumping for 6 hours."
                water_required = 0.0
                water_saved = round(moisture_deficit * 0.3 * 4046 * acres, 0)
                cost_saving = round((water_saved / 1000.0) * 18.5, 0)
                next_check = 6
                smart_advice = "Monitor weather radar. If rain does not arrive by evening, initiate light irrigation."

        elif moisture > 85.0:
            action = "DO NOT IRRIGATE"
            action_color = "blue"
            pump_status = "OFF"
            urgency = "Delay"
            primary_reason = f"Soil moisture is high at {moisture:.1f}% (near saturation). Additional water may cause root anoxia."
            water_required = 0.0
            water_saved = 15000.0 * acres
            cost_saving = round((water_saved / 1000.0) * 18.5, 0)
            next_check = 24
            smart_advice = "Inspect field bunds to facilitate drainage and prevent water accumulation."

        else:
            action = "DO NOT IRRIGATE"
            action_color = "emerald"
            pump_status = "OFF"
            urgency = "Delay"
            primary_reason = f"Current soil moisture ({moisture:.1f}%) is within optimal range ({target_moisture-10:.0f}% - {target_moisture+10:.0f}%)."
            water_required = 0.0
            water_saved = 8000.0 * acres
            cost_saving = round((water_saved / 1000.0) * 18.5, 0)
            next_check = 12
            smart_advice = "Soil moisture balance is optimal. No pumping needed today."

        return IrrigationRecommendation(
            action=action,
            action_color=action_color,
            pump_status=pump_status,
            urgency=urgency,
            primary_reason=primary_reason,
            soil_moisture_current=moisture,
            soil_moisture_target=target_moisture,
            rain_probability=rain_prob,
            expected_rainfall=expected_rain,
            water_required_liters=water_required,
            water_saved_liters=water_saved,
            estimated_cost_saving_inr=cost_saving,
            next_check_hours=next_check,
            smart_advice=smart_advice
        )
