from typing import List, Dict, Any

SCENARIO_TEMPLATES: List[Dict[str, Any]] = [
    {
        "scenario_id": "sc_low_nitrogen",
        "title": "Nitrogen Deficiency Detected",
        "category": "Nutrient Deficiency",
        "description": "Available soil nitrogen has fallen to 28 mg/kg, indicating severe nitrogen hunger during peak vegetative growth.",
        "tags": ["Nutrient", "Nitrogen", "Soil Health"],
        "changes_summary": [
            "Soil Nitrogen decreased from 58 mg/kg to 28 mg/kg (Deficient)",
            "Soil Health score dropped due to nutrient imbalance",
            "Chlorophyll synthesis risk flagged for vegetative rice"
        ],
        "what_should_i_do": [
            "Apply neem-coated urea or organic compost based on soil test target",
            "Split nitrogen application to prevent leaching losses",
            "Re-check soil NPK levels in 5 days after application"
        ],
        "expected_impact": {
            "water_requirement_l": 0,
            "estimated_cost_inr": 480,
            "soil_health_score": 54,
            "yield_impact": "-12% potential yield loss if untreated"
        },
        "target_state": {
            "nitrogen": 28.0,
            "phosphorus": 68.0,
            "potassium": 62.0,
            "ph": 6.3,
            "ec": 0.65,
            "soil_moisture": 58.0,
            "soil_temperature": 27.8,
            "air_temperature": 29.5,
            "humidity": 68.0,
            "rain_probability": 15.0,
            "expected_rainfall": 0.0,
            "organic_matter": 1.2
        }
    },
    {
        "scenario_id": "sc_excess_nitrogen",
        "title": "Excess Nitrogen & Leaching Hazard",
        "category": "Over-fertilization",
        "description": "Excessive nitrogen (135 mg/kg) detected. Excessive vegetative growth increases lodging risk, pest susceptibility, and runoff pollution.",
        "tags": ["Over-application", "Environmental Risk", "Economics"],
        "changes_summary": [
            "Soil Nitrogen surged to 135 mg/kg (Excessive)",
            "Environmental runoff risk shifted to HIGH",
            "Farm economics detects ₹1,200 in wasted fertilizer expenditure"
        ],
        "what_should_i_do": [
            "Halt all nitrogenous fertilizer additions immediately",
            "Ensure controlled irrigation to prevent groundwater nitrate leaching",
            "Monitor crop for sucking pests attracted to lush vegetative tissue"
        ],
        "expected_impact": {
            "water_requirement_l": 0,
            "estimated_cost_inr": 0,
            "soil_health_score": 61,
            "environmental_hazard": "Nitrate leaching risk elevated"
        },
        "target_state": {
            "nitrogen": 135.0,
            "phosphorus": 70.0,
            "potassium": 65.0,
            "ph": 6.8,
            "ec": 1.45,
            "soil_moisture": 62.0,
            "soil_temperature": 27.0,
            "air_temperature": 29.0,
            "humidity": 70.0,
            "rain_probability": 30.0,
            "expected_rainfall": 0.0,
            "organic_matter": 1.4
        }
    },
    {
        "scenario_id": "sc_low_moisture_water_stress",
        "title": "Soil Moisture Deficit & Water Stress",
        "category": "Water Stress",
        "description": "Root zone soil moisture dropped to 23%, falling below the critical threshold (45%) for rice paddy cultivation.",
        "tags": ["Irrigation Required", "Pump ON", "Crop Stress"],
        "changes_summary": [
            "Soil moisture dropped to 23% (Critical Deficit)",
            "Smart Irrigation engine recommends IMMEDIATE PUMP ACTIVATION",
            "Virtual pump switched to ON in simulation",
            "Crop water stress index flagged as HIGH"
        ],
        "what_should_i_do": [
            "Activate irrigation pump for approximately 2.5 hours",
            "Deliver 18,500 Litres of water across 2.4 acres",
            "Apply light mulching to conserve topsoil moisture"
        ],
        "expected_impact": {
            "water_requirement_l": 18500,
            "estimated_cost_inr": 280,
            "soil_health_score": 52,
            "pump_status": "ON"
        },
        "target_state": {
            "soil_moisture": 23.0,
            "soil_temperature": 32.5,
            "nitrogen": 54.0,
            "phosphorus": 66.0,
            "potassium": 60.0,
            "ph": 6.5,
            "ec": 0.95,
            "air_temperature": 34.0,
            "humidity": 45.0,
            "rain_probability": 10.0,
            "expected_rainfall": 0.0,
            "organic_matter": 1.3
        }
    },
    {
        "scenario_id": "sc_high_moisture_high_rain",
        "title": "High Moisture + Impending Monsoon Downpour",
        "category": "Water Conservation",
        "description": "Soil moisture is 79% and satellite weather forecasts an 88% probability of 28mm precipitation in the next 12 hours.",
        "tags": ["Delay Irrigation", "Water Saving", "Cost Saving"],
        "changes_summary": [
            "Soil moisture is high (79%)",
            "Rain probability surged to 88% (Expected rainfall: 28 mm)",
            "Smart Irrigation cancels scheduled watering — saves 22,000 Litres of groundwater",
            "Farm Economics logs ₹420 electricity/fuel savings"
        ],
        "what_should_i_do": [
            "DO NOT IRRIGATE — allow natural rainfall to replenish soil",
            "Inspect field bunds and drainage outlets to avoid waterlogging",
            "Postpone foliar pesticide or urea spraying until after the rain"
        ],
        "expected_impact": {
            "water_saved_l": 22000,
            "estimated_cost_saving_inr": 420,
            "soil_health_score": 82,
            "pump_status": "OFF"
        },
        "target_state": {
            "soil_moisture": 79.0,
            "soil_temperature": 25.0,
            "nitrogen": 56.0,
            "phosphorus": 70.0,
            "potassium": 64.0,
            "ph": 6.6,
            "ec": 0.72,
            "air_temperature": 26.5,
            "humidity": 89.0,
            "rain_probability": 88.0,
            "expected_rainfall": 28.0,
            "organic_matter": 1.55
        }
    },
    {
        "scenario_id": "sc_acidic_soil",
        "title": "Acidic Soil Condition (Low pH)",
        "category": "Soil Degradation",
        "description": "Soil pH has dropped to 5.1 (Strongly Acidic), impairing phosphorus availability and increasing aluminum/iron toxicity risk.",
        "tags": ["Low pH", "Soil Amendment", "Agricultural Lime"],
        "changes_summary": [
            "Soil pH dropped to 5.1 (Sub-optimal for crop)",
            "Phosphorus fixation risk increased",
            "Soil Health score penalized for chemical degradation"
        ],
        "what_should_i_do": [
            "Apply agricultural lime (calcium carbonate) or dolomite at 200 kg/acre",
            "Incorporate well-decomposed Farmyard Manure (FYM) to buffer pH",
            "Avoid acidifying fertilizers like ammonium sulfate until pH normalizes"
        ],
        "expected_impact": {
            "water_requirement_l": 0,
            "estimated_cost_inr": 850,
            "soil_health_score": 48,
            "nutrient_availability": "Restores P and K uptake"
        },
        "target_state": {
            "ph": 5.1,
            "nitrogen": 48.0,
            "phosphorus": 35.0,
            "potassium": 52.0,
            "ec": 0.60,
            "soil_moisture": 60.0,
            "soil_temperature": 26.8,
            "air_temperature": 28.5,
            "humidity": 65.0,
            "rain_probability": 25.0,
            "expected_rainfall": 0.0,
            "organic_matter": 1.1
        }
    },
    {
        "scenario_id": "sc_alkaline_soil",
        "title": "Alkaline Soil & Micronutrient Lockup",
        "category": "Soil Degradation",
        "description": "Soil pH reached 8.4 (Alkaline/Calcareous), reducing micronutrient solubility (Zinc, Iron, Manganese) and crop vigor.",
        "tags": ["High pH", "Gypsum", "Micronutrients"],
        "changes_summary": [
            "Soil pH elevated to 8.4 (Alkaline)",
            "Zinc and Iron availability severely restricted",
            "Soil Degradation risk elevated to MODERATE"
        ],
        "what_should_i_do": [
            "Apply agricultural gypsum (calcium sulfate) or elemental sulfur",
            "Foliar spray with chelated Zinc (Zn-EDTA 0.5%) and Iron",
            "Increase green manuring with Dhaincha/Sesbania"
        ],
        "expected_impact": {
            "water_requirement_l": 0,
            "estimated_cost_inr": 920,
            "soil_health_score": 53,
            "remediation_timeline": "2-3 weeks with organic incorporation"
        },
        "target_state": {
            "ph": 8.4,
            "nitrogen": 52.0,
            "phosphorus": 45.0,
            "potassium": 75.0,
            "ec": 1.20,
            "soil_moisture": 55.0,
            "soil_temperature": 28.2,
            "air_temperature": 30.0,
            "humidity": 62.0,
            "rain_probability": 15.0,
            "expected_rainfall": 0.0,
            "organic_matter": 0.95
        }
    },
    {
        "scenario_id": "sc_high_salinity_ec",
        "title": "High Soil Salinity & EC Warning",
        "category": "Salinity Hazard",
        "description": "Electrical Conductivity measured at 2.45 dS/m, indicating root osmotic stress and poor drainage or brackish borewell water.",
        "tags": ["Salinity", "High EC", "Root Stress"],
        "changes_summary": [
            "Soil EC surged to 2.45 dS/m (Saline Risk Threshold > 2.0)",
            "Crop water extraction impeded due to osmotic pressure",
            "AI Advisor flags irrigation water quality test requirement"
        ],
        "what_should_i_do": [
            "Provide deep leaching irrigation with low-saline fresh water",
            "Avoid potassium chloride (MOP) and sodium-bearing inputs",
            "Construct deep cross-field sub-surface drainage trenches"
        ],
        "expected_impact": {
            "water_requirement_l": 12000,
            "estimated_cost_inr": 350,
            "soil_health_score": 46,
            "hazard_level": "Osmotic root restriction"
        },
        "target_state": {
            "ec": 2.45,
            "soil_moisture": 52.0,
            "soil_temperature": 29.0,
            "nitrogen": 65.0,
            "phosphorus": 58.0,
            "potassium": 88.0,
            "ph": 7.9,
            "air_temperature": 32.0,
            "humidity": 58.0,
            "rain_probability": 20.0,
            "expected_rainfall": 0.0,
            "organic_matter": 1.05
        }
    },
    {
        "scenario_id": "sc_heat_stress_dry",
        "title": "Extreme Heat Stress & Evaporative Deficit",
        "category": "Microclimate Stress",
        "description": "Ambient temperature spiked to 39.2°C with low humidity (36%) and soil moisture declining rapidly to 28%.",
        "tags": ["Heatwave", "Vapor Pressure Deficit", "Cooling Irrigation"],
        "changes_summary": [
            "Air temperature spiked to 39.2°C (Heatwave alert)",
            "Evaporative demand increased 40%",
            "Crop health score declined from 84% to 58%"
        ],
        "what_should_i_do": [
            "Perform light evening micro-sprinkler irrigation to cool microclimate",
            "Apply anti-transpirant spray (KNO3 1% or kaolin clay spray)",
            "Avoid midday intercultural farm operations"
        ],
        "expected_impact": {
            "water_requirement_l": 14000,
            "estimated_cost_inr": 240,
            "soil_health_score": 58,
            "heat_mitigation": "Lowers canopy temperature by 3-4°C"
        },
        "target_state": {
            "air_temperature": 39.2,
            "humidity": 36.0,
            "soil_moisture": 28.0,
            "soil_temperature": 34.5,
            "nitrogen": 52.0,
            "phosphorus": 64.0,
            "potassium": 58.0,
            "ph": 6.6,
            "ec": 1.10,
            "rain_probability": 5.0,
            "expected_rainfall": 0.0,
            "organic_matter": 1.3
        }
    },
    {
        "scenario_id": "sc_healthy_optimal_farm",
        "title": "Healthy Balanced Farm (Optimal Baseline)",
        "category": "Optimal",
        "description": "All soil chemical, physical, and atmospheric parameters are balanced in peak agronomic ranges for rice cultivation.",
        "tags": ["Balanced", "High Soil Score", "Steady State"],
        "changes_summary": [
            "Soil Health score: 86/100 (Optimal)",
            "NPK ratio (62:74:66) well balanced",
            "Soil moisture (64%) within ideal field capacity range",
            "No active degradation hazards"
        ],
        "what_should_i_do": [
            "Maintain current sustainable irrigation and nutrient schedule",
            "Conduct routine scout for early stem borer or weed presence",
            "Record growth stage transition (Active Tillering)"
        ],
        "expected_impact": {
            "water_requirement_l": 0,
            "estimated_cost_inr": 0,
            "soil_health_score": 86,
            "profit_projection": "Peak potential revenue track"
        },
        "target_state": {
            "soil_moisture": 64.0,
            "soil_temperature": 26.8,
            "ph": 6.5,
            "ec": 0.78,
            "nitrogen": 62.0,
            "phosphorus": 74.0,
            "potassium": 66.0,
            "organic_matter": 1.65,
            "air_temperature": 28.4,
            "humidity": 68.0,
            "rain_probability": 25.0,
            "expected_rainfall": 0.0,
            "wind_speed": 11.0
        }
    },
    {
        "scenario_id": "sc_phosphorus_deficiency",
        "title": "Phosphorus Hunger & Stunted Root Growth",
        "category": "Nutrient Deficiency",
        "description": "Available phosphorus dropped to 22 mg/kg. Crop shows purple-tinted lower leaves and impaired root establishment.",
        "tags": ["Phosphorus", "Root Development", "Single Super Phosphate"],
        "changes_summary": [
            "Soil Phosphorus plummeted to 22 mg/kg (Deficient)",
            "Root establishment index reduced",
            "AI Advisor recommends localized SSP or rock phosphate"
        ],
        "what_should_i_do": [
            "Apply Single Super Phosphate (SSP) or DAP banded near root zone",
            "Inoculate with Phosphate Solubilizing Bacteria (PSB) biofertilizer",
            "Verify soil moisture is adequate to allow phosphate dissolution"
        ],
        "expected_impact": {
            "water_requirement_l": 0,
            "estimated_cost_inr": 620,
            "soil_health_score": 56,
            "root_recovery": "Improves tillering within 7 days"
        },
        "target_state": {
            "phosphorus": 22.0,
            "nitrogen": 58.0,
            "potassium": 65.0,
            "ph": 6.1,
            "ec": 0.70,
            "soil_moisture": 59.0,
            "soil_temperature": 27.0,
            "air_temperature": 29.0,
            "humidity": 66.0,
            "rain_probability": 20.0,
            "expected_rainfall": 0.0,
            "organic_matter": 1.25
        }
    },
    {
        "scenario_id": "sc_potassium_deficiency",
        "title": "Potassium Deficiency & Lodging Vulnerability",
        "category": "Nutrient Deficiency",
        "description": "Potassium is low (26 mg/kg). Plants display marginal leaf scorching and increased vulnerability to lodging and fungal blight.",
        "tags": ["Potassium", "MOP", "Disease Resistance"],
        "changes_summary": [
            "Soil Potassium fell to 26 mg/kg (Deficient)",
            "Pest and disease resistance threshold compromised",
            "Stem strength index lowered"
        ],
        "what_should_i_do": [
            "Apply Muriate of Potash (MOP) or organic wood ash amendment",
            "Foliar spray with 1% potassium sulfate for immediate absorption",
            "Maintain balanced irrigation to assist ionic potassium mobility"
        ],
        "expected_impact": {
            "water_requirement_l": 0,
            "estimated_cost_inr": 540,
            "soil_health_score": 58,
            "lodging_protection": "Reinforces cell wall lignification"
        },
        "target_state": {
            "potassium": 26.0,
            "nitrogen": 60.0,
            "phosphorus": 68.0,
            "ph": 6.4,
            "ec": 0.68,
            "soil_moisture": 61.0,
            "soil_temperature": 27.2,
            "air_temperature": 28.8,
            "humidity": 70.0,
            "rain_probability": 30.0,
            "expected_rainfall": 0.0,
            "organic_matter": 1.35
        }
    },
    {
        "scenario_id": "sc_disease_humidity_risk",
        "title": "High Humidity & Fungal Blast Epidemic Risk",
        "category": "Crop Disease Risk",
        "description": "Continuous relative humidity above 92% combined with warm canopy temperatures (27°C) triggers High Fungal Blast risk.",
        "tags": ["Disease Alert", "High Humidity", "Preventive Bio-agent"],
        "changes_summary": [
            "Relative Humidity spiked to 94%",
            "Fungal spore germination microclimate conditions ACTIVE",
            "Crop health alert: Preventive biological spray recommended"
        ],
        "what_should_i_do": [
            "Spray bio-fungicide (Trichoderma viride or Pseudomonas fluorescens)",
            "Ensure field aeration by maintaining water flow in paddies",
            "Refrain from high nitrogen top-dressing which exacerbates blast"
        ],
        "expected_impact": {
            "water_requirement_l": 0,
            "estimated_cost_inr": 380,
            "soil_health_score": 70,
            "disease_suppression": "Prevents up to 25% foliar blast damage"
        },
        "target_state": {
            "humidity": 94.0,
            "air_temperature": 27.5,
            "soil_moisture": 76.0,
            "soil_temperature": 26.0,
            "nitrogen": 64.0,
            "phosphorus": 69.0,
            "potassium": 62.0,
            "ph": 6.5,
            "ec": 0.80,
            "rain_probability": 75.0,
            "expected_rainfall": 6.5,
            "organic_matter": 1.5
        }
    },
    {
        "scenario_id": "sc_multi_stress_water_nitrogen",
        "title": "Combined Water Stress + Nitrogen Deficiency",
        "category": "Compound Stress",
        "description": "Critical compound stress: both soil moisture (24%) and available nitrogen (22 mg/kg) have plunged during vegetative tillering.",
        "tags": ["Dual Hazard", "Urgent Intervention", "Pump ON"],
        "changes_summary": [
            "Soil moisture dropped to 24% (Severely Dry)",
            "Soil Nitrogen dropped to 22 mg/kg (Severely Low)",
            "Soil Health score dropped to 41/100 (Critical)",
            "AI Advisor issues combined fertigation advisory"
        ],
        "what_should_i_do": [
            "Initiate 3-hour irrigation immediately to restore root hydration",
            "Follow up with split-dose soluble nitrogen fertigation once moist",
            "Do NOT apply dry granular urea on dry soil to avoid root burn"
        ],
        "expected_impact": {
            "water_requirement_l": 21000,
            "estimated_cost_inr": 720,
            "soil_health_score": 41,
            "yield_risk": "High - immediate action needed"
        },
        "target_state": {
            "soil_moisture": 24.0,
            "nitrogen": 22.0,
            "phosphorus": 60.0,
            "potassium": 56.0,
            "soil_temperature": 33.0,
            "ph": 6.3,
            "ec": 0.75,
            "air_temperature": 35.5,
            "humidity": 42.0,
            "rain_probability": 10.0,
            "expected_rainfall": 0.0,
            "organic_matter": 1.15
        }
    },
    {
        "scenario_id": "sc_regenerative_sustainable_farm",
        "title": "Regenerative Organic & High Carbon Soil",
        "category": "Sustainability High",
        "description": "High soil organic carbon (2.2%), thriving biological activity, and optimal moisture conservation under cover crop mulching.",
        "tags": ["Carbon Sequestration", "Eco-Friendly", "High Profit Margin"],
        "changes_summary": [
            "Soil Organic Matter increased to 2.2% (Excellent structure)",
            "Natural water retention increased by 35%",
            "Environmental sustainability rating: A+",
            "Chemical input savings: ₹3,200 per acre"
        ],
        "what_should_i_do": [
            "Continue organic mulching and microbial Jeevamrut application",
            "Prepare for premium organic market certification pricing",
            "Maintain soil cover to preserve biological microbial network"
        ],
        "expected_impact": {
            "water_saved_l": 32000,
            "estimated_cost_saving_inr": 3200,
            "soil_health_score": 93,
            "carbon_credit": "1.2 tons CO2 equivalent captured"
        },
        "target_state": {
            "organic_matter": 2.2,
            "soil_moisture": 68.0,
            "nitrogen": 68.0,
            "phosphorus": 76.0,
            "potassium": 72.0,
            "ph": 6.7,
            "ec": 0.65,
            "soil_temperature": 25.5,
            "air_temperature": 27.8,
            "humidity": 65.0,
            "rain_probability": 30.0,
            "expected_rainfall": 0.0
        }
    },
    {
        "scenario_id": "sc_waterlogging_excess_rain",
        "title": "Soil Waterlogging & Anoxia Hazard",
        "category": "Excess Moisture",
        "description": "Continuous heavy rainfall saturated soil to 96% moisture, creating root anoxia and nutrient denitrification conditions.",
        "tags": ["Waterlogging", "Drainage Required", "Root Rot Risk"],
        "changes_summary": [
            "Soil moisture reached 96% (Saturation / Standing water)",
            "Soil oxygen diffusion rate severely reduced",
            "Degradation risk flags root asphyxiation"
        ],
        "what_should_i_do": [
            "Open drainage channels immediately to discharge excess surface water",
            "Suspend all fertilizer applications until soil reaches field capacity",
            "Monitor for root rot symptoms and apply bio-drainage techniques"
        ],
        "expected_impact": {
            "water_requirement_l": 0,
            "estimated_cost_inr": 150,
            "soil_health_score": 49,
            "drainage_urgency": "High - prevent standing water > 48 hrs"
        },
        "target_state": {
            "soil_moisture": 96.0,
            "soil_temperature": 24.0,
            "nitrogen": 42.0,
            "phosphorus": 62.0,
            "potassium": 58.0,
            "ph": 6.8,
            "ec": 0.50,
            "air_temperature": 25.0,
            "humidity": 96.0,
            "rain_probability": 90.0,
            "expected_rainfall": 45.0,
            "organic_matter": 1.4
        }
    }
]
