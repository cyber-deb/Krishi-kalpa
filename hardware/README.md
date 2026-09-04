# Krishi-Kalpa Hardware Node Specification

## 1. Overview
The Krishi-Kalpa IoT Edge node is designed for ultra-low power rural deployment with solar harvesting, measuring:
- Multi-depth Volumetric Soil Water Content (Capacitive)
- Soil Temperature & Ambient Air Humidity (BME280/DHT22)
- Indicative Soil pH & Electrical Conductivity (EC)
- Optical NPK Sensor (Modbus RS485 / Analog interface)
- Tipping-bucket Rain Gauge input

## 2. Microcontroller
- **MCU**: ESP32 DevKit V1 (Dual-Core Tensilica Xtensa 32-bit LX6, 240MHz, 520KB SRAM)
- **Connectivity**: 2.4GHz Wi-Fi 802.11 b/g/n / GSM SIM800L / LoRa SX1278 (optional)
- **Power**: 3.7V 18650 Li-Ion 2600mAh battery + 5V 2W Solar Panel with TP4056 charging module with deep-sleep duty cycle (wakes up every 15 minutes).

## 3. Communication Protocol
The microcontroller sends periodic telemetry payload via HTTP POST to:
`POST https://krishi-kalpa-backend.onrender.com/api/sensors/data`

Header: `Content-Type: application/json`
Payload format:
```json
{
  "device_id": "ESP32-FARM-001",
  "soil_moisture": 58.4,
  "soil_temperature": 26.8,
  "ph": 6.5,
  "ec": 0.85,
  "nitrogen": 62,
  "phosphorus": 48,
  "potassium": 70,
  "air_temperature": 28.5,
  "humidity": 68.0,
  "rainfall": 0.0
}
```
