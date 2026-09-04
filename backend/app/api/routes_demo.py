from fastapi import APIRouter, Body
from app.ai.recommendation_engine import MasterRecommendationEngine
from app.utils.demo_data import DEFAULT_DEMO_STATE

router = APIRouter(prefix="/demo", tags=["Demo Sandbox & Simulation"])
engine = MasterRecommendationEngine()

@router.post("/simulate", summary="Simulate live environmental and soil perturbations")
def simulate_farm_state(payload: dict = Body(...)):
    """
    Allows hackathon judges and users to interactively tweak:
    - soil_moisture (0 - 100%)
    - ph (4.0 - 9.0)
    - ec (0.1 - 3.0)
    - nitrogen, phosphorus, potassium
    - rainfall & rain_probability

    Returns the dynamically updated Master Action Plan, Soil Health, and Irrigation advice.
    """
    state = DEFAULT_DEMO_STATE.copy()
    state.update(payload)

    weather = {
        "rain_probability": float(state.get("rain_probability", 20.0)),
        "temperature": float(state.get("air_temperature", 29.0)),
        "humidity": float(state.get("humidity", 65.0)),
        "rainfall": float(state.get("rainfall", 0.0))
    }

    result = engine.generate_daily_master_plan(state, weather, float(state.get("farm_area_acres", 2.4)))
    result["simulated_state"] = state
    return result
