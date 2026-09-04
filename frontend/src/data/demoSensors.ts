import { SensorReading } from '../types/sensor';

export const INITIAL_DEMO_SENSOR: SensorReading = {
  device_id: "ESP32-FARM-001",
  soil_moisture: 62.0,
  soil_temperature: 27.4,
  ph: 6.4,
  ec: 0.82,
  nitrogen: 58.0,
  phosphorus: 72.0,
  potassium: 64.0,
  air_temperature: 29.1,
  humidity: 71.0,
  rainfall: 4.2,
  timestamp: new Date().toISOString()
};
