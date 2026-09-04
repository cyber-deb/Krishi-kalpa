# Bill of Materials (BOM) - Krishi-Kalpa Prototype Node

| Item # | Component | Purpose | Qty | Approx Cost (INR ₹) | Approx Cost (USD $) | Sourcing / Notes |
|---|---|---|---|---|---|---|
| 1 | ESP32-WROOM-32 DevKit V1 | Main MCU with Wi-Fi & Bluetooth | 1 | ₹450 | $5.40 | Standard 30-pin dev board |
| 2 | Capacitive Soil Moisture Sensor v1.2 | Corrosion-resistant soil water measurement | 1 | ₹120 | $1.45 | Analog Output (A0 pin) |
| 3 | DS18B20 Waterproof Temp Sensor | Probe-style soil temperature | 1 | ₹180 | $2.15 | 1-Wire interface with 4.7k pullup |
| 4 | BME280 Sensor Module | Ambient temperature, relative humidity, pressure | 1 | ₹290 | $3.50 | I2C Interface (0x76) |
| 5 | RS485 to TTL MAX485 Module | Modbus transceiver for industrial NPK probe | 1 | ₹65 | $0.80 | Hardware Serial connection |
| 6 | 5-in-1 Soil NPK + pH + EC Sensor | Indicative soil nutrient & salinity probe | 1 | ₹2,400 | $29.00 | RS485 Modbus RTU protocol |
| 7 | Single Channel 5V Relay Module | Pump / Solenoid Valve trigger | 1 | ₹75 | $0.90 | Optocoupler isolated |
| 8 | 5V 3W Polycrystalline Solar Panel | Renewable field energy harvesting | 1 | ₹350 | $4.20 | Weatherproof sealed |
| 9 | TP4056 Lithium Battery Charger + Protection | Solar charge regulation | 1 | ₹45 | $0.55 | Type-C / Solder pad version |
| 10 | 18650 3.7V 2600mAh Li-ion Battery | Power reservoir for night / overcast days | 1 | ₹180 | $2.15 | High capacity cell |
| 11 | IP66 Weatherproof Enclosure Box | Field environmental protection | 1 | ₹220 | $2.65 | Polycarbonate with cable glands |
| 12 | Miscellaneous (Jumper wires, PCB, Resistors) | Interconnects and pull-up resistors | - | ₹100 | $1.20 | Standard prototyping stock |
| **TOTAL** | **Complete Prototype Node** | **Full AgTech In-Field Station** | - | **₹4,475** | **~$53.95** | *Substantially cheaper than commercial ₹45k loggers* |
