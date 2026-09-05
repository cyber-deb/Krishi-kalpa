# Krishi-Kalpa: Hardware & IoT Station

Welcome to the hardware integration guide for **Krishi-Kalpa** ("Cultivating Intelligence, Growing Prosperity").

---

## 1. Overview

The Krishi-Kalpa IoT Station is a solar-powered field station designed for 24/7 continuous telemetry in Indian agricultural environments. It acquires:
- Volumetric Soil Moisture (%)
- Soil Temperature (°C)
- Soil pH (0-14)
- Electrical Conductivity / Salinity (dS/m)
- Available Nitrogen, Phosphorus, Potassium (mg/kg)
- Ambient Temperature & Relative Humidity
- Precipitation / Rain Rate (mm)
- Battery Health & Signal Strength (dBm)

---

## 2. Directory Structure

```
hardware/
├── README.md                 # Hardware system documentation
├── BOM.md                    # Detailed Bill of Materials and Indian pricing
├── wiring/
│   └── wiring-diagram.md     # Pinout mapping and ASCII schematic
└── esp32/
    └── esp32_sensor_code.ino # Complete Arduino C++ sketch for ESP32
```

---

## 3. Quick Setup & Flashing Instructions

1. **Install Arduino IDE** (v2.0+) or PlatformIO.
2. Install the **ESP32 Board Package** (`Tools` > `Board Manager` > Search `esp32` by Espressif Systems).
3. Install required Arduino libraries:
   - `DHT sensor library` by Adafruit
   - `ArduinoJson` (v6 or v7) by Benoit Blanchon
   - `WiFi` and `HTTPClient` (built into ESP32 core)
4. Open `hardware/esp32/esp32_sensor_code.ino`.
5. Configure your WiFi credentials and Krishi-Kalpa backend URL:
   ```cpp
   const char* WIFI_SSID = "YOUR_WIFI_NAME";
   const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";
   const char* SERVER_URL = "http://YOUR_SERVER_IP:8000/api/sensors/data";
   const char* DEVICE_ID = "ESP32-FARM-001";
   ```
6. Select board **ESP32 Dev Module** and the appropriate COM / Serial Port.
7. Click **Upload**.
8. Open the Serial Monitor at **115200 baud** to observe sensor calibration and transmission receipts.
