from datetime import datetime, timedelta

DEFAULT_DEMO_STATE = {
    "device_id": "ESP32-FARM-001",
    "soil_moisture": 62.0,
    "soil_temperature": 27.4,
    "ph": 6.4,
    "ec": 0.82,
    "nitrogen": 58.0,
    "phosphorus": 72.0,
    "potassium": 64.0,
    "air_temperature": 29.1,
    "humidity": 71.0,
    "rainfall": 4.2,
    "rain_probability": 20.0,
    "farm_area_acres": 2.4,
    "crop_name": "Paddy (Basmati PB-1121)",
    "growth_stage": "Vegetative Tillering"
}

def generate_30day_soil_history():
    """Generates realistic 30-day degradation & moisture trend data."""
    history = []
    base_date = datetime.utcnow() - timedelta(days=30)
    for i in range(30):
        d = base_date + timedelta(days=i)
        # Slow recovery simulated over 30 days
        moisture = 55.0 + (i % 7) * 2.5 - (i % 4) * 1.5
        n = 52.0 + (i * 0.3)
        p = 68.0 - (i * 0.1)
        k = 60.0 + (i * 0.2)
        score = 62.0 + (i * 0.25)
        history.append({
            "date": d.strftime("%d %b"),
            "moisture": round(moisture, 1),
            "nitrogen": round(n, 1),
            "phosphorus": round(p, 1),
            "potassium": round(k, 1),
            "health_score": round(score, 1),
            "ec": round(0.88 - (i * 0.002), 2)
        })
    return history
