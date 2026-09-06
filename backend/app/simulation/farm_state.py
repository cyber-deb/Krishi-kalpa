import threading
from datetime import datetime
from typing import Dict, Any, Optional, List
from app.schemas.schemas import FarmState, FarmConfig

class FarmStateManager:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(FarmStateManager, cls).__new__(cls)
                cls._instance._init_state()
            return cls._instance

    def _init_state(self):
        self.state = FarmState(
            mode="demo",
            last_updated=datetime.utcnow(),
            config=FarmConfig(),
            soil_moisture=62.0,
            soil_temperature=27.4,
            ph=6.4,
            ec=0.82,
            nitrogen=58.0,
            phosphorus=72.0,
            potassium=64.0,
            organic_matter=1.45,
            air_temperature=29.1,
            humidity=71.0,
            rain_probability=78.0,
            expected_rainfall=4.2,
            weather_condition="Scattered Clouds / Humid",
            wind_speed=12.0,
            device_id="ESP32-FARM-001",
            device_status="Online",
            battery=95.0,
            signal_strength=-64,
            last_sensor_reading=datetime.utcnow(),
            active_scenario_title="Balanced Healthy Farm",
            active_scenario_category="Optimal"
        )
        self.history: List[Dict[str, Any]] = []

    def get_state(self) -> FarmState:
        with self._lock:
            return self.state.model_copy(deep=True)

    def update_from_sensors(self, sensor_data: Dict[str, Any], is_live: bool = False):
        with self._lock:
            for key, value in sensor_data.items():
                if hasattr(self.state, key) and value is not None:
                    setattr(self.state, key, value)

            self.state.last_updated = datetime.utcnow()
            self.state.last_sensor_reading = datetime.utcnow()
            if is_live:
                self.state.mode = "live"
                self.state.device_status = "Online (Live IoT)"
                self.state.active_scenario_title = "Live Sensor Stream"
                self.state.active_scenario_category = "Live Stream"

    def apply_scenario_state(self, updates: Dict[str, Any], scenario_title: str, scenario_category: str):
        with self._lock:
            for key, value in updates.items():
                if hasattr(self.state, key) and value is not None:
                    setattr(self.state, key, value)

            self.state.last_updated = datetime.utcnow()
            self.state.active_scenario_title = scenario_title
            self.state.active_scenario_category = scenario_category
            self.state.mode = "demo"
            self.state.device_status = "Simulated Hardware"

    def reset_to_healthy(self):
        with self._lock:
            self.state.soil_moisture = 65.0
            self.state.soil_temperature = 26.5
            self.state.ph = 6.5
            self.state.ec = 0.75
            self.state.nitrogen = 60.0
            self.state.phosphorus = 70.0
            self.state.potassium = 65.0
            self.state.organic_matter = 1.6
            self.state.air_temperature = 28.0
            self.state.humidity = 68.0
            self.state.rain_probability = 20.0
            self.state.expected_rainfall = 0.0
            self.state.weather_condition = "Pleasant / Sunny"
            self.state.wind_speed = 10.0
            self.state.battery = 98.0
            self.state.signal_strength = -60
            self.state.last_updated = datetime.utcnow()
            self.state.active_scenario_title = "Healthy Farm Baseline"
            self.state.active_scenario_category = "Balanced & Optimal"
            self.state.mode = "demo"

    def set_mode(self, mode: str):
        with self._lock:
            if mode in ["demo", "live"]:
                self.state.mode = mode
                if mode == "live":
                    self.state.device_status = "Listening for ESP32..."
                else:
                    self.state.device_status = "Simulated Mode Active"

# Global singleton accessor
farm_state_manager = FarmStateManager()
