# Krishi-Kalpa: Hardware Wiring & Schematic Diagram

**Microcontroller:** ESP32 DevKit V1 (30-pin)  
**Operating Voltage:** 3.3V Logic / 5V Bus / 12V Actuation  

---

## 1. Pinout Mapping Table

| Sensor / Actuator | Sensor Pin | ESP32 GPIO Pin | Voltage | Notes |
|-------------------|------------|----------------|---------|-------|
| **Capacitive Soil Moisture** | AOUT (Analog) | **GPIO 34 (ADC1_CH6)** | 3.3V | Voltage divider / ADC input |
| **DHT22 / BME280** | DATA | **GPIO 4** | 3.3V | 4.7kΩ pull-up to 3.3V |
| **MAX485 Transceiver (RO)** | RO (Receiver Out) | **GPIO 16 (RX2)** | 3.3V / 5V | Hardware Serial 2 RX |
| **MAX485 Transceiver (DI)** | DI (Driver In) | **GPIO 17 (TX2)** | 3.3V / 5V | Hardware Serial 2 TX |
| **MAX485 Transceiver (DE/RE)**| DE & RE (Tied) | **GPIO 18** | 3.3V | HIGH = Transmit, LOW = Receive |
| **Rain Sensor / Counter** | DOUT (Digital) | **GPIO 15** | 3.3V | Internal pull-up enabled |
| **5V Relay Module (Pump)** | IN (Trigger) | **GPIO 26** | 5V / 3.3V | Active LOW relay trigger |
| **Battery Voltage Monitor** | Positive Lead | **GPIO 35 (ADC1_CH7)** | 3.3V | Via 100kΩ / 27kΩ voltage divider |
| **Status LED** | Anode | **GPIO 2** | 3.3V | Built-in Blue LED |

---

## 2. ASCII Wiring Architecture

```
                       +-----------------------------------+
                       |    6V Solar Panel (3W)            |
                       +-----------------+-----------------+
                                         |
                                         v
                       +-----------------------------------+
                       | TP4056 Solar Charge Controller    |
                       +--------+-----------------+--------+
                                |                 |
                                v                 v
                      +-------------------+  +------------------+
                      | 2x 18650 Li-Ion   |  | DC-DC Step-Up/   |
                      | 3.7V (5200 mAh)   |  | Step-Down Reg    |
                      +-------------------+  +--------+---------+
                                                      |
                                       +--------------+--------------+
                                       | 3.3V / 5V Bus Lines         |
                                       +--------------+--------------+
                                                      |
                                                      v
                                        +----------------------------+
                                        |    ESP32 DevKit V1 (MCU)   |
                                        +--------------+-------------+
                                                       |
        +-----------------------+----------------------+----------------------+----------------------+
        | (ADC1_CH6)            | (GPIO 4)             | (UART2: 16/17/18)    | (GPIO 15)            | (GPIO 26)
        v                       v                      v                      v                      v
+-------------------+   +---------------+   +--------------------+   +---------------+   +-------------------+
| Capacitive Soil   |   | DHT22 Temp &  |   | MAX485 Modbus RTU  |   | Rain Gauge    |   | 5V Opto-Relay     |
| Moisture Sensor   |   | Humidity      |   | RS485 Transceiver  |   | Pulse Sensor  |   | Module (Pump)     |
+-------------------+   +---------------+   +---------+----------+   +---------------+   +---------+---------+
                                                      |                                            |
                                                      v                                            v
                                            +--------------------+                       +-------------------+
                                            | 7-in-1 Soil Probe  |                       | 12V Drip Pump /   |
                                            | (NPK, pH, EC, Temp)|                       | Solenoid Valve    |
                                            +--------------------+                       +-------------------+
```

---

## 3. Power Safety & Grounding Principles

1. **Common Ground (GND):**
   All sensor modules, MAX485, voltage regulators, and the ESP32 ground pins must be tied together into a single star-ground topology to eliminate ground loop noise.
2. **Flyback Protection:**
   The 5V relay module contains an onboard freewheeling diode (1N4007) and optocoupler isolation to prevent inductive back-EMF spikes from reaching the ESP32 digital pins.
3. **Deep Sleep Wakeup:**
   GPIO 15 (Rain counter) can act as an external interrupt wakeup pin, allowing the ESP32 to sleep at ~15 µA during dry periods and wake immediately upon rain onset.
