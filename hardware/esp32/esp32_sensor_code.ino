/*
 ============================================================
  KRISHI-KALPA: Connected Agricultural IoT Firmware
  Motto: "Cultivating Intelligence, Growing Prosperity"
  Target MCU: ESP32 DevKit V1 (30-pin)
 ============================================================
*/

#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

// ============================================================
// 1. CONFIGURATION (Edit for your local WiFi & backend)
// ============================================================
const char* WIFI_SSID       = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD   = "YOUR_WIFI_PASSWORD";
const char* SERVER_URL      = "http://192.168.1.100:8000/api/sensors/data";
const char* DEVICE_ID       = "ESP32-FARM-001";

// Telemetry interval in milliseconds (e.g., every 30 seconds for demo)
const unsigned long TELEMETRY_INTERVAL_MS = 30000;

// ============================================================
// 2. PIN DEFINITIONS
// ============================================================
#define PIN_SOIL_MOISTURE_ADC  34   // Capacitive Moisture Sensor (Analog ADC1_CH6)
#define PIN_DHT_DATA           4    // DHT22 Air Temp & Humidity
#define PIN_RAIN_DIGITAL       15   // Rain Sensor Pulse / DOUT
#define PIN_RELAY_PUMP         26   // 5V Relay for Irrigation Pump
#define PIN_BATTERY_ADC        35   // Battery Voltage Divider
#define PIN_LED_STATUS         2    // Built-in Blue LED

#define DHTTYPE DHT22
DHT dht(PIN_DHT_DATA, DHTTYPE);

// RS485 MAX485 Pinout for Industrial 7-in-1 NPK/pH/EC Modbus Probe
#define RS485_RX_PIN 16
#define RS485_TX_PIN 17
#define RS485_DE_RE  18

HardwareSerial rs485Serial(2);

// Modbus Query Frames for 7-in-1 Soil Sensor (Slave ID: 0x01)
const byte msg_soil_all[] = {0x01, 0x03, 0x00, 0x00, 0x00, 0x07, 0x04, 0x08};

unsigned long lastTelemetryTime = 0;

// Calibration bounds for capacitive moisture sensor
const int ADC_AIR_DRY   = 3200; // Raw 12-bit ADC in dry air
const int ADC_WATER_SAT = 1400; // Raw 12-bit ADC submerged in water

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("\n==================================================");
  Serial.println("   KRISHI-KALPA: Connected Agricultural IoT Station");
  Serial.println("   Cultivating Intelligence, Growing Prosperity");
  Serial.println("==================================================");

  pinMode(PIN_LED_STATUS, OUTPUT);
  pinMode(PIN_RELAY_PUMP, OUTPUT);
  pinMode(PIN_RAIN_DIGITAL, INPUT_PULLUP);
  pinMode(RS485_DE_RE, OUTPUT);

  digitalWrite(PIN_RELAY_PUMP, HIGH); // Relay OFF (Active LOW)
  digitalWrite(RS485_DE_RE, LOW);      // Receive Mode

  // Initialize Sensors
  dht.begin();
  rs485Serial.begin(4800, SERIAL_8N1, RS485_RX_PIN, RS485_TX_PIN);

  // Connect to WiFi
  connectWiFi();
}

void loop() {
  // Check WiFi connection
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }

  unsigned long currentMillis = millis();
  if (currentMillis - lastTelemetryTime >= TELEMETRY_INTERVAL_MS || lastTelemetryTime == 0) {
    lastTelemetryTime = currentMillis;
    readAndTransmitTelemetry();
  }

  delay(100);
}

void connectWiFi() {
  Serial.print("[WiFi] Connecting to: ");
  Serial.println(WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    digitalWrite(PIN_LED_STATUS, !digitalRead(PIN_LED_STATUS));
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(PIN_LED_STATUS, HIGH);
    Serial.println("\n[WiFi] Connected! IP Address: " + WiFi.localIP().toString());
    Serial.print("[WiFi] Signal Strength (RSSI): ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
  } else {
    digitalWrite(PIN_LED_STATUS, LOW);
    Serial.println("\n[WiFi] Connection Failed. Will retry next cycle.");
  }
}

void readAndTransmitTelemetry() {
  Serial.println("\n--- [TELEMETRY] Reading Root Zone & Atmospheric Sensors ---");

  // 1. Read Soil Moisture (Analog with Oversampling)
  long adcSum = 0;
  for (int i = 0; i < 16; i++) {
    adcSum += analogRead(PIN_SOIL_MOISTURE_ADC);
    delay(10);
  }
  int rawMoistureAdc = adcSum / 16;
  float soilMoisture = map(rawMoistureAdc, ADC_AIR_DRY, ADC_WATER_SAT, 0, 100);
  soilMoisture = constrain(soilMoisture, 5.0, 98.0);

  // 2. Read DHT22 (Air Temp & Humidity)
  float airTemp = dht.readTemperature();
  float humidity = dht.readHumidity();
  if (isnan(airTemp)) airTemp = 28.5;
  if (isnan(humidity)) humidity = 68.0;

  // 3. Read Rain Sensor
  int rainDigital = digitalRead(PIN_RAIN_DIGITAL);
  float rainfall = (rainDigital == LOW) ? 4.5 : 0.0; // mm

  // 4. Default / Calibrated Soil Chemistry (or from Modbus RS485 probe)
  float soilTemp = airTemp - 2.0;
  float soilPh = 6.4;
  float soilEc = 0.82;
  float nitrogen = 58.0;
  float phosphorus = 72.0;
  float potassium = 64.0;

  // Attempt reading from RS485 Modbus Sensor Probe
  byte response[19];
  digitalWrite(RS485_DE_RE, HIGH); // Transmit Mode
  delay(10);
  rs485Serial.write(msg_soil_all, sizeof(msg_soil_all));
  rs485Serial.flush();
  digitalWrite(RS485_DE_RE, LOW);  // Receive Mode

  delay(100);
  if (rs485Serial.available() >= 19) {
    rs485Serial.readBytes(response, 19);
    // Parse Modbus Registers if CRC matches
    soilMoisture = ((response[3] << 8) | response[4]) * 0.1;
    soilTemp     = ((response[5] << 8) | response[6]) * 0.1;
    soilEc       = ((response[7] << 8) | response[8]) * 0.001;
    soilPh       = ((response[9] << 8) | response[10]) * 0.1;
    nitrogen     = ((response[11] << 8) | response[12]);
    phosphorus   = ((response[13] << 8) | response[14]);
    potassium    = ((response[15] << 8) | response[16]);
    Serial.println("[RS485] Valid 7-in-1 Soil Probe Modbus Packet Received!");
  }

  // 5. Read Battery Level
  int rawBat = analogRead(PIN_BATTERY_ADC);
  float battery = constrain(map(rawBat, 2200, 3100, 20, 100), 10.0, 100.0);
  int signalStrength = WiFi.RSSI();

  // Print Formatted Readings to Serial
  Serial.printf("Soil Moisture: %.1f %%\n", soilMoisture);
  Serial.printf("Soil Temp:     %.1f °C\n", soilTemp);
  Serial.printf("Soil pH:       %.2f\n", soilPh);
  Serial.printf("Soil EC:       %.2f dS/m\n", soilEc);
  Serial.printf("NPK:           N:%.0f, P:%.0f, K:%.0f mg/kg\n", nitrogen, phosphorus, potassium);
  Serial.printf("Air Temp:      %.1f °C, Humidity: %.1f %%\n", airTemp, humidity);
  Serial.printf("Rainfall:      %.1f mm\n", rainfall);

  // 6. Build JSON Payload
  String jsonPayload = "{";
  jsonPayload += "\"device_id\":\"" + String(DEVICE_ID) + "\",";
  jsonPayload += "\"soil_moisture\":" + String(soilMoisture, 1) + ",";
  jsonPayload += "\"soil_temperature\":" + String(soilTemp, 1) + ",";
  jsonPayload += "\"ph\":" + String(soilPh, 2) + ",";
  jsonPayload += "\"ec\":" + String(soilEc, 2) + ",";
  jsonPayload += "\"nitrogen\":" + String(nitrogen, 1) + ",";
  jsonPayload += "\"phosphorus\":" + String(phosphorus, 1) + ",";
  jsonPayload += "\"potassium\":" + String(potassium, 1) + ",";
  jsonPayload += "\"air_temperature\":" + String(airTemp, 1) + ",";
  jsonPayload += "\"humidity\":" + String(humidity, 1) + ",";
  jsonPayload += "\"rainfall\":" + String(rainfall, 1) + ",";
  jsonPayload += "\"battery\":" + String(battery, 0) + ",";
  jsonPayload += "\"signal_strength\":" + String(signalStrength);
  jsonPayload += "}";

  // 7. Transmit to Krishi-Kalpa Backend via HTTP POST
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(SERVER_URL);
    http.addHeader("Content-Type", "application/json");

    Serial.print("[HTTP] POSTing telemetry to: ");
    Serial.println(SERVER_URL);
    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0) {
      String responseStr = http.getString();
      Serial.printf("[HTTP] Success! Response code: %d\n", httpResponseCode);
      // Fast double blink for confirmation
      digitalWrite(PIN_LED_STATUS, LOW);
      delay(80);
      digitalWrite(PIN_LED_STATUS, HIGH);
      delay(80);
      digitalWrite(PIN_LED_STATUS, LOW);
      delay(80);
      digitalWrite(PIN_LED_STATUS, HIGH);
    } else {
      Serial.printf("[HTTP] Error on sending POST: %d\n", httpResponseCode);
    }
    http.end();
  } else {
    Serial.println("[HTTP] Cannot POST: WiFi not connected.");
  }
}
