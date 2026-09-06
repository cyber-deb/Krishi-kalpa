from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List, Dict, Any, Optional
from datetime import datetime
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.sensor_data import SensorReadingModel
from app.schemas.schemas import (
    SensorDataInput,
    SensorReadingResponse,
    FarmState,
    FarmConfig,
    SoilHealthReport,
    IrrigationRecommendation,
    CropStressAnalysis,
    FarmEconomicsReport,
    MarketIntelligenceReport,
    SustainabilityReport,
    AIAdvisorResponse,
    SimulationScenario,
    SimulationGenerateResponse,
    FarmZone
)
from app.simulation.farm_state import farm_state_manager
from app.simulation.scenario_engine import scenario_engine
from app.services.soil_service import SoilService
from app.services.irrigation_service import IrrigationService
from app.services.crop_service import CropService
from app.services.economics_service import EconomicsService
from app.services.market_service import MarketService
from app.services.sustainability_service import SustainabilityService
from app.ai.farm_advisor import AIFarmAdvisor

router = APIRouter(prefix="/api", tags=["Krishi-Kalpa Intelligence API"])

# ============================================================
# HEALTH CHECK
# ============================================================
@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Krishi-Kalpa Farm Intelligence Backend",
        "motto": "Cultivating Intelligence, Growing Prosperity",
        "mode": farm_state_manager.get_state().mode,
        "timestamp": datetime.utcnow().isoformat()
    }

# ============================================================
# FARM STATE & CONFIG
# ============================================================
@router.get("/farm", response_model=FarmConfig)
def get_farm_config():
    state = farm_state_manager.get_state()
    return state.config

@router.get("/farm/state", response_model=FarmState)
def get_farm_state():
    return farm_state_manager.get_state()

@router.post("/farm/mode")
def set_farm_mode(mode: str = Body(..., embed=True)):
    if mode not in ["demo", "live"]:
        raise HTTPException(status_code=400, detail="Mode must be 'demo' or 'live'")
    farm_state_manager.set_mode(mode)
    return {"message": f"Switched to {mode} mode", "mode": mode}

# ============================================================
# SENSOR TELEMETRY (LIVE IoT & SIMULATED)
# ============================================================
@router.post("/sensors/data", response_model=SensorReadingResponse)
def receive_sensor_data(data: SensorDataInput, db: Session = Depends(get_db)):
    # 1. Update central state (switches to live mode)
    payload = data.model_dump()
    farm_state_manager.update_from_sensors(payload, is_live=True)

    # 2. Persist to database if available
    try:
        db_reading = SensorReadingModel(
            device_id=data.device_id,
            soil_moisture=data.soil_moisture,
            soil_temperature=data.soil_temperature,
            ph=data.ph,
            ec=data.ec,
            nitrogen=data.nitrogen,
            phosphorus=data.phosphorus,
            potassium=data.potassium,
            air_temperature=data.air_temperature,
            humidity=data.humidity,
            rainfall=data.rainfall,
            light_intensity=data.light_intensity or 1200.0,
            battery=data.battery or 95.0,
            signal_strength=data.signal_strength or -65,
            is_simulated=False
        )
        db.add(db_reading)
        db.commit()
        db.refresh(db_reading)
        return db_reading
    except Exception:
        # Graceful fallback without failing the response
        return SensorReadingResponse(
            id=1,
            timestamp=datetime.utcnow(),
            is_simulated=False,
            **payload
        )

@router.get("/sensors/latest", response_model=Dict[str, Any])
def get_latest_sensors():
    state = farm_state_manager.get_state()
    return {
        "device_id": state.device_id,
        "device_status": state.device_status,
        "mode": state.mode,
        "last_updated": state.last_updated.isoformat(),
        "battery": state.battery,
        "signal_strength": state.signal_strength,
        "sensors": {
            "soil_moisture": {"value": state.soil_moisture, "unit": "%", "label": "Soil Moisture", "status": "Optimal" if 50 <= state.soil_moisture <= 75 else ("Low" if state.soil_moisture < 50 else "High")},
            "soil_temperature": {"value": state.soil_temperature, "unit": "°C", "label": "Soil Temperature", "status": "Optimal" if 20 <= state.soil_temperature <= 30 else "Elevated"},
            "ph": {"value": state.ph, "unit": "pH", "label": "Soil pH", "status": "Optimal" if 6.0 <= state.ph <= 7.5 else ("Acidic" if state.ph < 6.0 else "Alkaline")},
            "ec": {"value": state.ec, "unit": "dS/m", "label": "Electrical Conductivity", "status": "Optimal" if state.ec <= 1.0 else ("Moderate" if state.ec <= 1.8 else "Saline Hazard")},
            "nitrogen": {"value": state.nitrogen, "unit": "mg/kg", "label": "Nitrogen (N)", "status": "Optimal" if 50 <= state.nitrogen <= 85 else ("Deficient" if state.nitrogen < 50 else "Excessive")},
            "phosphorus": {"value": state.phosphorus, "unit": "mg/kg", "label": "Phosphorus (P)", "status": "Optimal" if 55 <= state.phosphorus <= 90 else ("Deficient" if state.phosphorus < 55 else "Excessive")},
            "potassium": {"value": state.potassium, "unit": "mg/kg", "label": "Potassium (K)", "status": "Optimal" if 50 <= state.potassium <= 85 else ("Deficient" if state.potassium < 50 else "High")},
            "air_temperature": {"value": state.air_temperature, "unit": "°C", "label": "Air Temperature", "status": "Optimal" if state.air_temperature <= 34 else "Heat Stress"},
            "humidity": {"value": state.humidity, "unit": "%", "label": "Relative Humidity", "status": "Optimal" if state.humidity <= 80 else "High Disease Risk"},
            "rainfall": {"value": state.expected_rainfall, "unit": "mm", "label": "Rainfall", "status": "Dry" if state.expected_rainfall == 0 else f"{state.expected_rainfall} mm Expected"}
        }
    }

@router.get("/sensors/history")
def get_sensor_history(db: Session = Depends(get_db)):
    state = farm_state_manager.get_state()
    # Generate 12 hourly timeline points derived from current state
    history_points = []
    base_m = state.soil_moisture
    base_n = state.nitrogen
    base_temp = state.air_temperature

    for i in range(12, 0, -1):
        hour_label = f"-{i}h"
        history_points.append({
            "time": hour_label,
            "soil_moisture": round(max(10, base_m + (i % 3 - 1) * 1.5), 1),
            "nitrogen": round(max(10, base_n + (i % 2 - 0.5) * 2.0), 1),
            "temperature": round(base_temp - (i * 0.4) if i > 6 else base_temp + (i * 0.2), 1),
            "humidity": round(max(30, state.humidity + (i % 4 - 2) * 2), 1),
            "ph": state.ph,
            "ec": state.ec
        })

    history_points.append({
        "time": "Now",
        "soil_moisture": state.soil_moisture,
        "nitrogen": state.nitrogen,
        "temperature": state.air_temperature,
        "humidity": state.humidity,
        "ph": state.ph,
        "ec": state.ec
    })

    return history_points

# ============================================================
# DOMAIN INTELLIGENCE SERVICES (ALL DERIVED FROM FARM STATE)
# ============================================================
@router.get("/soil-health", response_model=SoilHealthReport)
def get_soil_health():
    return SoilService.evaluate_soil()

@router.get("/soil-analysis", response_model=SoilHealthReport)
def get_soil_analysis():
    return SoilService.evaluate_soil()

@router.get("/irrigation/recommendation", response_model=IrrigationRecommendation)
def get_irrigation_recommendation():
    return IrrigationService.get_recommendation()

@router.get("/crop/recommendation", response_model=CropStressAnalysis)
def get_crop_recommendation():
    return CropService.get_crop_analysis()

@router.get("/farm/profit", response_model=FarmEconomicsReport)
def get_farm_economics():
    return EconomicsService.get_economics()

@router.get("/market/prices", response_model=MarketIntelligenceReport)
def get_market_prices():
    return MarketService.get_market_intelligence()

@router.get("/environmental-impact", response_model=SustainabilityReport)
def get_environmental_impact():
    return SustainabilityService.get_sustainability_impact()

@router.get("/advisor/today", response_model=AIAdvisorResponse)
def get_ai_advisor():
    return AIFarmAdvisor.generate_daily_advice()

# ============================================================
# ALERTS API
# ============================================================
@router.get("/alerts")
def get_farm_alerts():
    state = farm_state_manager.get_state()
    soil = SoilService.evaluate_soil()
    irrigation = IrrigationService.get_recommendation()
    crop = CropService.get_crop_analysis()

    alerts = []
    # Water alerts
    if irrigation.action == "IRRIGATE" and state.soil_moisture < 30:
        alerts.append({
            "id": "alt_moisture_crit",
            "title": "Severe Soil Moisture Deficit",
            "message": f"Moisture is {state.soil_moisture:.1f}%. Immediate irrigation is recommended to prevent wilting.",
            "severity": "danger",
            "category": "water",
            "action_label": "Start Irrigation"
        })
    elif irrigation.action == "DO NOT IRRIGATE" and state.rain_probability >= 75:
        alerts.append({
            "id": "alt_rain_imminent",
            "title": "Impending Rainfall Detected",
            "message": f"{state.rain_probability:.0f}% chance of precipitation. Irrigation should be delayed to save water.",
            "severity": "info",
            "category": "weather",
            "action_label": "Acknowledge"
        })

    # Nutrient & Soil alerts
    if state.nitrogen < 35:
        alerts.append({
            "id": "alt_nitrogen_low",
            "title": "Nitrogen Hunger in Root Zone",
            "message": f"Available nitrogen is low ({state.nitrogen:.1f} mg/kg). Top-dressing recommended.",
            "severity": "warning",
            "category": "soil",
            "action_label": "Review Fertilizer Plan"
        })
    elif state.nitrogen > 110:
        alerts.append({
            "id": "alt_nitrogen_high",
            "title": "Excess Nitrogen & Leaching Hazard",
            "message": f"Nitrogen is elevated ({state.nitrogen:.1f} mg/kg). Suspend additional urea application.",
            "severity": "warning",
            "category": "soil",
            "action_label": "Halt Application"
        })

    if state.ph < 5.8:
        alerts.append({
            "id": "alt_ph_acidic",
            "title": "Soil Acidity Warning",
            "message": f"Soil pH is {state.ph:.1f}. Phosphorus uptake may be restricted.",
            "severity": "warning",
            "category": "soil",
            "action_label": "View Lime Dosage"
        })

    if state.ec > 1.8:
        alerts.append({
            "id": "alt_ec_salinity",
            "title": "High Soil Salinity / EC Warning",
            "message": f"Salinity is elevated ({state.ec:.2f} dS/m). Root osmosis may be impeded.",
            "severity": "danger",
            "category": "soil",
            "action_label": "Flush Drainage"
        })

    if not alerts:
        alerts.append({
            "id": "alt_optimal",
            "title": "Farm Conditions Optimal",
            "message": "All monitored soil, moisture, and crop indicators are currently within balanced ranges.",
            "severity": "success",
            "category": "general",
            "action_label": "All Clear"
        })

    return alerts

# ============================================================
# FARM MAP GIS ZONES (DYNAMICALLY REACTIVE TO FARM STATE)
# ============================================================
@router.get("/map/zones", response_model=List[FarmZone])
def get_farm_map_zones():
    state = farm_state_manager.get_state()
    soil = SoilService.evaluate_soil()

    # Create 3 sub-zones of Farm Alpha that react to FarmState
    m = state.soil_moisture
    n = state.nitrogen
    ph = state.ph

    # Zone A (North Sector - Primary Rice Block)
    if m < 35:
        za_status = "Water Stress"
        za_color = "red"
        za_issue = f"Soil moisture at {m:.1f}% (Low)"
        za_action = "Initiate drip line irrigation"
    elif n < 40:
        za_status = "Nutrient Stress"
        za_color = "amber"
        za_issue = f"Available nitrogen at {n:.1f} mg/kg (Low)"
        za_action = "Targeted neem-coated urea application"
    elif soil.degradation_risk in ["High", "Critical"]:
        za_status = "Degradation Alert"
        za_color = "red"
        za_issue = f"Multiple stresses: pH {ph:.1f}, EC {state.ec:.2f}"
        za_action = "Execute soil amendment protocol"
    else:
        za_status = "Healthy"
        za_color = "emerald"
        za_issue = "Optimal moisture and balanced NPK"
        za_action = "Maintain regular surveillance"

    # Zone B (Central Sector)
    zb_moisture = max(15.0, min(95.0, m + 3.5))
    zb_n = max(15.0, min(140.0, n - 4.0))
    if zb_moisture < 35:
        zb_status = "Water Stress"
        zb_color = "red"
        zb_issue = f"Soil moisture at {zb_moisture:.1f}%"
        zb_action = "Schedule irrigation run"
    elif zb_n < 35:
        zb_status = "Nutrient Stress"
        zb_color = "amber"
        zb_issue = f"Nitrogen deficient ({zb_n:.1f} mg/kg)"
        zb_action = "Apply compost top dressing"
    else:
        zb_status = "Healthy"
        zb_color = "emerald"
        zb_issue = "Good soil structure and moisture"
        zb_action = "Routine check"

    # Zone C (South Drainage Sector)
    zc_moisture = max(15.0, min(98.0, m + 8.0))
    zc_n = n
    if zc_moisture > 88:
        zc_status = "Waterlogging Hazard"
        zc_color = "blue"
        zc_issue = f"High moisture ({zc_moisture:.1f}%)"
        zc_action = "Clear drainage ditch"
    elif zc_moisture < 35:
        zc_status = "Water Stress"
        zc_color = "red"
        zc_issue = f"Moisture deficit ({zc_moisture:.1f}%)"
        zc_action = "Activate micro-sprinkler"
    else:
        zc_status = "Healthy"
        zc_color = "emerald"
        zc_issue = "Balanced soil hydration"
        zc_action = "No action needed"

    zones = [
        FarmZone(
            zone_id="zone-a-north",
            zone_name="Zone A (North Block - 1.0 Acre)",
            area_acres=1.0,
            crop=state.config.crop_type,
            status=za_status,
            status_color=za_color,
            soil_moisture=round(m, 1),
            ph=round(ph, 1),
            nitrogen=round(n, 1),
            degradation_risk=soil.degradation_risk,
            primary_issue=za_issue,
            recommended_action=za_action,
            coordinates=[
                [20.7460, 78.6015],
                [20.7468, 78.6025],
                [20.7462, 78.6035],
                [20.7454, 78.6025]
            ]
        ),
        FarmZone(
            zone_id="zone-b-central",
            zone_name="Zone B (Central Block - 0.8 Acre)",
            area_acres=0.8,
            crop=state.config.crop_type,
            status=zb_status,
            status_color=zb_color,
            soil_moisture=round(zb_moisture, 1),
            ph=round(ph, 1),
            nitrogen=round(zb_n, 1),
            degradation_risk=soil.degradation_risk,
            primary_issue=zb_issue,
            recommended_action=zb_action,
            coordinates=[
                [20.7454, 78.6025],
                [20.7462, 78.6035],
                [20.7456, 78.6045],
                [20.7448, 78.6035]
            ]
        ),
        FarmZone(
            zone_id="zone-c-south",
            zone_name="Zone C (South Drainage Block - 0.6 Acre)",
            area_acres=0.6,
            crop=state.config.crop_type,
            status=zc_status,
            status_color=zc_color,
            soil_moisture=round(zc_moisture, 1),
            ph=round(ph, 1),
            nitrogen=round(zc_n, 1),
            degradation_risk=soil.degradation_risk,
            primary_issue=zc_issue,
            recommended_action=zc_action,
            coordinates=[
                [20.7448, 78.6035],
                [20.7456, 78.6045],
                [20.7450, 78.6055],
                [20.7442, 78.6045]
            ]
        )
    ]
    return zones

# ============================================================
# SIMULATION ENGINE CONTROLS
# ============================================================
@router.post("/simulation/generate", response_model=SimulationGenerateResponse)
def generate_simulation_scenario(template_id: Optional[str] = None):
    scenario = scenario_engine.generate_scenario(template_id=template_id)
    state = farm_state_manager.get_state()
    soil = SoilService.evaluate_soil()
    irrigation = IrrigationService.get_recommendation()
    advisor = AIFarmAdvisor.generate_daily_advice()
    economics = EconomicsService.get_economics()

    return SimulationGenerateResponse(
        scenario=scenario,
        current_state=state,
        soil_health=soil,
        irrigation=irrigation,
        advisor=advisor,
        economics=economics
    )

@router.post("/simulation/reset")
def reset_simulation():
    farm_state_manager.reset_to_healthy()
    state = farm_state_manager.get_state()
    return {
        "message": "Farm reset to healthy balanced baseline",
        "state": state,
        "soil_health": SoilService.evaluate_soil(),
        "advisor": AIFarmAdvisor.generate_daily_advice()
    }

@router.get("/simulation/history")
def get_simulation_history():
    return scenario_engine.get_history()
