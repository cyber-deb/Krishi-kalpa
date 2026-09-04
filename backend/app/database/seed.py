import logging
from datetime import datetime
from app.database.database import SessionLocal, engine, Base
from app.models.farm import User, Farm, Field
from app.models.sensor import SensorDevice, SensorReading, Alert, AIRecommendation
from app.models.soil import SoilAnalysis
from app.models.crop import Crop, CropCycle
from app.models.market import MarketPrice
from app.models.finance import FarmExpense, FarmDebt
from app.utils.demo_data import DEFAULT_DEMO_STATE

logger = logging.getLogger("krishi_kalpa.seed")

def seed_database():
    """Initializes tables and seeds initial data."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(User).first():
            logger.info("Database already seeded.")
            return

        logger.info("Seeding Krishi-Kalpa initial database records...")

        # 1. User & Farm
        user = User(full_name="Rajinder Singh", phone_number="+91-9876543210", email="farmer@krishikalpa.org")
        db.add(user)
        db.commit()
        db.refresh(user)

        farm = Farm(name="Green Meadows Farm", owner_id=user.id, location_name="Karnal, Haryana", total_area_acres=2.4)
        db.add(farm)
        db.commit()
        db.refresh(farm)

        field1 = Field(farm_id=farm.id, name="North Field (Zone A)", area_acres=1.4, current_crop="Paddy (Basmati PB-1121)")
        field2 = Field(farm_id=farm.id, name="South Field (Zone B)", area_acres=1.0, current_crop="Paddy (Basmati PB-1121)")
        db.add_all([field1, field2])

        # 2. Sensor Device & Initial Reading
        device = SensorDevice(device_id="ESP32-FARM-001", farm_id=farm.id, status="ACTIVE", battery_level=94.5)
        db.add(device)

        reading = SensorReading(
            device_id="ESP32-FARM-001",
            soil_moisture=DEFAULT_DEMO_STATE["soil_moisture"],
            soil_temperature=DEFAULT_DEMO_STATE["soil_temperature"],
            ph=DEFAULT_DEMO_STATE["ph"],
            ec=DEFAULT_DEMO_STATE["ec"],
            nitrogen=DEFAULT_DEMO_STATE["nitrogen"],
            phosphorus=DEFAULT_DEMO_STATE["phosphorus"],
            potassium=DEFAULT_DEMO_STATE["potassium"],
            air_temperature=DEFAULT_DEMO_STATE["air_temperature"],
            humidity=DEFAULT_DEMO_STATE["humidity"],
            rainfall=DEFAULT_DEMO_STATE["rainfall"]
        )
        db.add(reading)

        # 3. Soil Analysis
        soil = SoilAnalysis(
            farm_id=farm.id,
            health_score=68.0,
            organic_matter_percent=0.72,
            degradation_risk="MODERATE",
            nitrogen_level=58.0,
            phosphorus_level=72.0,
            potassium_level=64.0,
            ph=6.4,
            ec=0.82,
            moisture=62.0
        )
        db.add(soil)

        # 4. Mandi Market Prices
        markets = [
            MarketPrice(market_name="Karnal Main APMC", commodity="Paddy (Basmati)", distance_km=6.5, modal_price_per_quintal=3850.0, transport_cost_per_quintal=22.75, mandi_fee_per_quintal=40.0, net_realization_per_quintal=3787.25),
            MarketPrice(market_name="Taraori Mandi (Hub)", commodity="Paddy (Basmati)", distance_km=21.0, modal_price_per_quintal=4050.0, transport_cost_per_quintal=73.50, mandi_fee_per_quintal=45.0, net_realization_per_quintal=3931.50),
            MarketPrice(market_name="Panipat APMC", commodity="Paddy (Basmati)", distance_km=34.0, modal_price_per_quintal=3920.0, transport_cost_per_quintal=119.0, mandi_fee_per_quintal=45.0, net_realization_per_quintal=3756.0),
        ]
        db.add_all(markets)

        # 5. Farm Expenses Comparison
        expenses = [
            FarmExpense(category="Seeds & Nursery", current_practice_cost=3200.0, ai_optimized_cost=2800.0),
            FarmExpense(category="Chemical Fertilizers (DAP/Urea)", current_practice_cost=6800.0, ai_optimized_cost=4200.0),
            FarmExpense(category="Water & Tube-well Electricity", current_practice_cost=4500.0, ai_optimized_cost=2900.0),
            FarmExpense(category="Pesticides & Fungicides", current_practice_cost=3900.0, ai_optimized_cost=2600.0),
            FarmExpense(category="Labour & Harvesting", current_practice_cost=7500.0, ai_optimized_cost=7000.0)
        ]
        db.add_all(expenses)

        # 6. Actionable Alerts
        alerts = [
            Alert(severity="INFO", title="Optimal NPK Ratio Detected", message="Phosphorus levels slightly elevated. Reduce next basal application.", recommended_action="Delay DAP application by 10 days.", category="SOIL"),
            Alert(severity="INFO", title="Weather Window", message="Light rain forecasted in 36 hours (4.2 mm).", recommended_action="Avoid surface pesticide spraying today.", category="WEATHER"),
        ]
        db.add_all(alerts)

        # 7. AI Recommendations
        recs = [
            AIRecommendation(category="IRRIGATION", recommendation="DO NOT IRRIGATE TODAY", reason="Soil moisture is currently at 62% (adequate) and light precipitation is modeled.", confidence=0.91, expected_impact="Saves 3,200 L groundwater and ₹180 pumping electricity."),
            AIRecommendation(category="SOIL", recommendation="Apply Bio-fertilizer (PSB culture) instead of chemical DAP", reason="Phosphorus is already sufficient (72 kg/ha) but bound in soil matrix.", confidence=0.88, expected_impact="Saves ₹650/acre and reduces soil salinity risk."),
            AIRecommendation(category="MARKET", recommendation="Route harvest to Taraori Mandi for +₹3,400 higher net gain", reason="Higher demand from rice millers compensates for 14.5 km extra transit.", confidence=0.94, expected_impact="+₹144.25 net profit per quintal.")
        ]
        db.add_all(recs)

        db.commit()
        logger.info("Database seeding successfully completed!")
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()
