# Krishi-Kalpa: Bill of Materials (BOM)

**Platform:** Connected Agricultural Intelligence Node  
**Target Deployment:** Indian Field Farms (2.4 - 10 Acres)  
**Power Profile:** Solar-Assisted Li-Ion Battery / Grid Fallback  

---

## 1. Electronic Components & Sensors

| # | Component | Quantity | Primary Purpose | Approx Cost (INR) | Approx Cost (USD) | Source / Notes |
|---|-----------|----------|-----------------|-------------------|-------------------|----------------|
| 1 | **ESP32 DevKit V1 (30-pin)** | 1 | Microcontroller with 2.4 GHz WiFi & BLE | ₹450 | $5.40 | Dual-core Tensilica Xtensa 32-bit |
| 2 | **Capacitive Soil Moisture Sensor v1.2** | 2 | Corrosion-resistant root zone moisture (0-100%) | ₹280 (₹140 × 2) | $3.35 | Analog voltage output (A0) |
| 3 | **Industrial RS485 NPK + pH + EC Soil Probe (7-in-1)** | 1 | Multi-parameter soil chemistry & salinity | ₹2,400 | $28.80 | Modbus RTU interface via MAX485 |
| 4 | **MAX485 TTL to RS485 Transceiver Module** | 1 | UART to RS485 differential communication | ₹60 | $0.72 | Connected to ESP32 Hardware UART2 |
| 5 | **DHT22 / BME280 Sensor** | 1 | Ambient Air Temperature & Relative Humidity | ₹250 | $3.00 | Digital 1-Wire interface (GPIO 4) |
| 6 | **Optical / Tipping Bucket Rain Gauge Sensor** | 1 | Rainfall detection and precipitation volume | ₹180 | $2.15 | Digital pulse counter / analog (GPIO 15) |
| 7 | **1-Channel 5V Optocoupler Relay Module** | 1 | Automated Irrigation Pump / Solenoid Valve Control | ₹90 | $1.08 | Active LOW trigger (GPIO 26) |
| 8 | **12V 0.5A Micro Drip Submersible Water Pump** | 1 | Prototype irrigation delivery | ₹350 | $4.20 | Actuated via relay contacts |
| 9 | **18650 Li-Ion Rechargeable Batteries (2600 mAh)** | 2 | Primary backup power storage | ₹380 (₹190 × 2) | $4.55 | Connected in 1S2P configuration |
| 10 | **TP4056 Battery Charging & Protection Module** | 1 | Micro-USB / Solar charge controller | ₹45 | $0.54 | Over-charge & over-discharge protection |
| 11 | **6V 3W Monocrystalline Solar Panel** | 1 | Autonomous daytime battery charging | ₹320 | $3.85 | Waterproof outdoor casing |
| 12 | **LM2596 / MT3608 DC-DC Step-Up/Down Converter** | 1 | 3.3V / 5V / 12V voltage regulation | ₹85 | $1.02 | High efficiency switching regulator |
| 13 | **IP65 Weatherproof Junction Enclosure Box** | 1 | Environmental protection against dust & rain | ₹220 | $2.64 | ABS plastic with PG7 cable glands |
| 14 | **Connecting Wires, Headers, PCB & Resistors** | 1 Set | Interconnects and 4.7kΩ pull-up resistors | ₹110 | $1.32 | 22 AWG shielded hookup wire |

---

## 2. Summary Cost Analysis

| Category | Total (INR) | Total (USD) |
|----------|-------------|-------------|
| **Core Compute & Telemetry** | ₹790 | $9.48 |
| **Soil Chemistry & Microclimate Sensors** | ₹2,830 | $33.95 |
| **Power Management & Solar Harvest** | ₹830 | $9.96 |
| **Enclosure & Field Actuation** | ₹770 | $9.24 |
| **TOTAL PROTOTYPE BOM COST** | **₹5,220** | **$62.63** |

---

## 3. Scientific Honesty & Sensor Calibration Guidelines

1. **Indicative Prototype Measurements:**
   Low-cost optical/capacitive sensors provide rapid relative trend detection for real-time decision support.
2. **Laboratory Calibration:**
   The Krishi-Kalpa architecture incorporates offset calibration variables in the firmware and backend database. Farmers can enter certified soil test laboratory card numbers to automatically zero-calibrate field NPK and pH readings.
3. **Corrosion Prevention:**
   Capacitive sensors are utilized over resistive copper-trace probes to eliminate galvanic electrolysis in humid soils.
