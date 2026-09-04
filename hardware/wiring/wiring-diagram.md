# Hardware Wiring Diagram & Pin Map

```text
       ┌────────────────────────────────────────────────────────┐
       │                   ESP32 DevKit V1                      │
       │                                                        │
       │   [3V3] ────► VCC (BME280, Capacitive Sensor)          │
       │   [VIN] ────► 5V Out from TP4056 Booster / Battery     │
       │   [GND] ────► Common Ground Plane                      │
       │                                                        │
       │   [GPIO 34] (ADC1_CH6) ◄── Capacitive Moisture AOUT    │
       │   [GPIO 4]  (1-Wire)   ◄── DS18B20 Soil Temp Data      │
       │   [GPIO 21] (SDA)      ◄── BME280 SDA                  │
       │   [GPIO 22] (SCL)      ◄── BME280 SCL                  │
       │   [GPIO 16] (RX2)      ◄── MAX485 RO (NPK RS485 RX)    │
       │   [GPIO 17] (TX2)      ──► MAX485 DI (NPK RS485 TX)    │
       │   [GPIO 5]  (Output)   ──► MAX485 DE & RE (Direction)  │
       │   [GPIO 25] (Output)   ──► 5V Relay Signal (Pump/Valve)│
       └────────────────────────────────────────────────────────┘

Solar & Power Subsystem:
Solar Panel (5V) ──► TP4056 IN(+) / IN(-) ──► 18650 Battery ──► Boost Converter (5V) ──► ESP32 VIN
```
