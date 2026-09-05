from typing import List
from datetime import datetime
from app.simulation.farm_state import farm_state_manager
from app.schemas.schemas import FarmAdvisorAction, AIAdvisorResponse

class AIFarmAdvisor:
    @staticmethod
    def generate_daily_advice() -> AIAdvisorResponse:
        state = farm_state_manager.get_state()
        recs: List[FarmAdvisorAction] = []

        moisture = state.soil_moisture
        n = state.nitrogen
        p = state.phosphorus
        k = state.potassium
        ph = state.ph
        ec = state.ec
        rain_prob = state.rain_probability
        expected_rain = state.expected_rainfall
        air_temp = state.air_temperature
        humidity = state.humidity
        crop = state.config.crop_type

        # 1. Irrigation & Water Advisories
        if rain_prob >= 70.0 and expected_rain >= 5.0:
            recs.append(
                FarmAdvisorAction(
                    id="rec_water_rain_hold",
                    priority=1,
                    category="Smart Irrigation",
                    title="Hold Irrigation — Rain Imminent",
                    action="Do not turn on irrigation pumps today.",
                    why=f"Satellite radar detects a {rain_prob:.0f}% chance of {expected_rain:.1f} mm rain within 12 hours.",
                    expected_impact=f"Saves ~20,000 Litres of groundwater and prevents nutrient wash-off.",
                    confidence="95% Confidence",
                    urgency="High Priority",
                    button_label="Confirm Rain Hold",
                    button_action_type="dismiss"
                )
            )
        elif moisture < 35.0:
            recs.append(
                FarmAdvisorAction(
                    id="rec_water_irrigate_urgent",
                    priority=1,
                    category="Smart Irrigation",
                    title="Irrigate Root Zone Immediately",
                    action="Turn ON drip/sprinkler system for 2.5 hours.",
                    why=f"Soil moisture has dropped to {moisture:.1f}%, below the critical 35% wilting margin for {crop}.",
                    expected_impact="Restores root hydration and prevents permanent grain yield penalty.",
                    confidence="96% Confidence",
                    urgency="High Priority",
                    button_label="Start Irrigation Pump",
                    button_action_type="irrigate"
                )
            )
        elif moisture < 50.0 and rain_prob < 40.0:
            recs.append(
                FarmAdvisorAction(
                    id="rec_water_irrigate_moderate",
                    priority=2,
                    category="Smart Irrigation",
                    title="Schedule Light Irrigation",
                    action="Schedule 1.5 hours of precision irrigation this evening.",
                    why=f"Moisture is {moisture:.1f}% with low rain probability ({rain_prob:.0f}%).",
                    expected_impact="Maintains uniform tillering and nutrient uptake in root zone.",
                    confidence="91% Confidence",
                    urgency="Medium Priority",
                    button_label="Schedule Pump",
                    button_action_type="irrigate"
                )
            )

        # 2. Nutrient Advisories
        if n < 35.0:
            recs.append(
                FarmAdvisorAction(
                    id="rec_nutrient_nitrogen_low",
                    priority=1,
                    category="Nutrient Management",
                    title="Apply Targeted Nitrogen Top-Dressing",
                    action="Apply 25 kg/acre neem-coated urea or enriched vermicompost.",
                    why=f"Available soil nitrogen is low at {n:.1f} mg/kg during active vegetative tillering.",
                    expected_impact="Boosts leaf chlorophyll synthesis and restores healthy green canopy.",
                    confidence="93% Confidence",
                    urgency="High Priority",
                    button_label="Mark as Reviewed",
                    button_action_type="fertilize"
                )
            )
        elif n > 110.0:
            recs.append(
                FarmAdvisorAction(
                    id="rec_nutrient_nitrogen_excess",
                    priority=2,
                    category="Nutrient Management",
                    title="Halt Nitrogen Application (Excess Detected)",
                    action="Do not apply any urea or nitrogenous fertilizers.",
                    why=f"Soil nitrogen is {n:.1f} mg/kg (excessive). High N causes crop lodging and attracts sucking pests.",
                    expected_impact="Saves ₹1,200/acre in wasted fertilizer and avoids groundwater nitrate pollution.",
                    confidence="94% Confidence",
                    urgency="Medium Priority",
                    button_label="Acknowledge N Halt",
                    button_action_type="review"
                )
            )

        if p < 30.0:
            recs.append(
                FarmAdvisorAction(
                    id="rec_nutrient_p_low",
                    priority=3,
                    category="Nutrient Management",
                    title="Supplement Phosphorus for Root Development",
                    action="Apply 40 kg/acre Single Super Phosphate (SSP) near root zones.",
                    why=f"Phosphorus is deficient ({p:.1f} mg/kg), restricting early root spread and tillering.",
                    expected_impact="Strengthens root architecture and boosts fertilizer uptake efficiency.",
                    confidence="89% Confidence",
                    urgency="Medium Priority",
                    button_label="View P Recommendations",
                    button_action_type="review"
                )
            )

        if k < 35.0:
            recs.append(
                FarmAdvisorAction(
                    id="rec_nutrient_k_low",
                    priority=3,
                    category="Nutrient Management",
                    title="Apply Potassium for Stalk Strength",
                    action="Foliar spray with 1% potassium sulfate or apply 20 kg/acre MOP.",
                    why=f"Potassium level is {k:.1f} mg/kg, increasing vulnerability to lodging and fungal infection.",
                    expected_impact="Reinforces cell wall thickness and improves drought/pest tolerance.",
                    confidence="90% Confidence",
                    urgency="Medium Priority",
                    button_label="Mark as Reviewed",
                    button_action_type="review"
                )
            )

        # 3. Soil Condition & pH Advisories
        if ph < 5.8:
            recs.append(
                FarmAdvisorAction(
                    id="rec_soil_ph_acidic",
                    priority=2,
                    category="Soil Amendment",
                    title="Treat Soil Acidity with Agricultural Lime",
                    action="Broadcast 150 kg/acre agricultural lime (CaCO3) before next rain.",
                    why=f"Soil pH is acidic ({ph:.1f}), which chemically locks phosphorus and micronutrients.",
                    expected_impact="Brings pH to optimal 6.5 range, unlocking up to 30% bound phosphorus.",
                    confidence="92% Confidence",
                    urgency="Medium Priority",
                    button_label="View Lime Dosage",
                    button_action_type="amend_ph"
                )
            )
        elif ph > 8.2:
            recs.append(
                FarmAdvisorAction(
                    id="rec_soil_ph_alkaline",
                    priority=2,
                    category="Soil Amendment",
                    title="Apply Gypsum to Correct Soil Alkalinity",
                    action="Apply 100 kg/acre agricultural gypsum along with organic compost.",
                    why=f"Soil pH is alkaline ({ph:.1f}), reducing zinc, iron, and manganese availability.",
                    expected_impact="Neutralizes alkaline salts and restores micronutrient mobility.",
                    confidence="88% Confidence",
                    urgency="Medium Priority",
                    button_label="View Gypsum Plan",
                    button_action_type="amend_ph"
                )
            )

        if ec > 1.8:
            recs.append(
                FarmAdvisorAction(
                    id="rec_soil_ec_salinity",
                    priority=2,
                    category="Salinity Management",
                    title="Flush Excess Salinity & Improve Drainage",
                    action="Conduct deep leaching with sweet canal water and clear field drainage ditches.",
                    why=f"Electrical conductivity is high at {ec:.2f} dS/m, causing root osmotic stress.",
                    expected_impact="Prevents root tip burning and improves water absorption efficiency.",
                    confidence="87% Confidence",
                    urgency="High Priority",
                    button_label="View Drainage Guide",
                    button_action_type="review"
                )
            )

        # 4. Weather & Disease Risk Advisories
        if humidity > 90.0 and air_temp > 25.0:
            recs.append(
                FarmAdvisorAction(
                    id="rec_weather_disease_blast",
                    priority=2,
                    category="Disease Prevention",
                    title="Preventive Bio-Fungicide Spray",
                    action="Apply preventive Trichoderma viride or Pseudomonas fluorescens spray.",
                    why=f"Continuous high humidity ({humidity:.0f}%) and warm weather create high fungal blast risk.",
                    expected_impact="Protects vegetative canopy from blast lesions with zero toxic residue.",
                    confidence="91% Confidence",
                    urgency="Medium Priority",
                    button_label="Mark as Sprayed",
                    button_action_type="review"
                )
            )

        if air_temp > 37.0:
            recs.append(
                FarmAdvisorAction(
                    id="rec_weather_heatwave",
                    priority=2,
                    category="Weather Protection",
                    title="Heatwave Protection & Microclimate Cooling",
                    action="Provide short 20-minute evening sprinkler bursts to cool crop canopy.",
                    why=f"Ambient temperature reaches {air_temp:.1f}°C, increasing plant transpiration stress.",
                    expected_impact="Lowers canopy temperature by 3-4°C and protects photosynthetic enzymes.",
                    confidence="93% Confidence",
                    urgency="Medium Priority",
                    button_label="Acknowledge Heatwave",
                    button_action_type="dismiss"
                )
            )

        # Default Healthy Farm Advisory if all parameters are stable
        if not recs:
            recs.append(
                FarmAdvisorAction(
                    id="rec_healthy_stable",
                    priority=5,
                    category="Routine Maintenance",
                    title="Farm Conditions are Stable & Balanced",
                    action="Maintain current irrigation and biological nutrient schedule.",
                    why="Soil moisture, NPK balance, and weather parameters are within optimal agronomic thresholds.",
                    expected_impact="Preserves peak vegetative growth trajectory and maximizes net margin.",
                    confidence="97% Confidence",
                    urgency="Standard",
                    button_label="Record Routine Check",
                    button_action_type="review"
                )
            )

        # Sort recommendations by priority (1 is highest)
        recs.sort(key=lambda x: x.priority)

        # Headline and summary
        if any(r.urgency == "High Priority" for r in recs):
            headline = "Action Required: Attention Needed on Water & Nutrient Balance"
            summary = "Your farm conditions require 1-2 timely agronomic interventions to protect crop yield."
            condition = "Active Interventions Needed"
        else:
            headline = "Farm Operating in Optimal Health Range"
            summary = "All critical soil, moisture, and microclimate parameters are balanced."
            condition = "Stable & Optimal"

        return AIAdvisorResponse(
            headline=headline,
            summary=summary,
            overall_farm_condition=condition,
            recommendations=recs,
            last_evaluated=datetime.utcnow()
        )
