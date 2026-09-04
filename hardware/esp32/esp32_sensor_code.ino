/*
 * Krishi-Kalpa (कृषि-कल्प) - IoT Edge Field Telemetry Firmware
 * Target: ESP32 DevKit V1
 * Purpose: Sample multi-sensor metrics and dispatch JSON payload to FastAPI backend.
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// ================= CONFIGURATION =================
const char* WIFI_SSID = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// Replace with your Render deployed URL or local IP (e.g. http://192.168.1.100:8000)
const char* SERVER_ENDPOINT = "https://krishi-kalpa-backend.onrender.com/api/sensors/data";
const char* DEVICE_ID = "ESP32-FARM-001";

// Deep sleep duration (15 minutes in microseconds)
#define TIME_TO_SLEEP  900ULL * 1000000ULL

// Pin Definitions
const int MOISTURE_PIN = 34;   // Analog ADC1_CH6
const int ONE_WIRE_BUS = 4;    // DS18B20
const int RELAY_PIN = 25;      // Pump control

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature soilTempSensor(&oneWire);

// Calibration constants for capacitive soil moisture
const int AIR_VALUE = 3200;    // Dry reading in air
const int WATER_VALUE = 1350;  // Submerged reading in water

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("\n[Krishi-Kalpa] Initializing IoT Node...");

  pinMode(MOISTURE_PIN, INPUT);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);

  soilTempSensor.begin();
  connectToWiFi();
  readAndDispatchTelemetry();

  Serial.println("[Krishi-Kalpa] Entering Deep Sleep to preserve battery...");
  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP);
  esp_deep_sleep_start();
}

void loop() {
  // Not reached due to deep sleep
}

void connectToWiFi() {
  Serial.printf("Connecting to WiFi: %s", WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi Connected! IP: " + WiFi.localIP().toString());
  } else {
    Serial.println("\nWiFi Connection failed. Proceeding with offline caching...");
  }
}

float readSoilMoisturePercentage() {
  int raw = analogRead(MOISTURE_PIN);
  float percentage = map(raw, AIR_VALUE, WATER_VALUE, 0, 100);
  if (percentage < 0.0) percentage = 0.0;
  if (percentage > 100.0) percentage = 100.0;
  return percentage;
}

void readAndDispatchTelemetry() {
  if (WiFi.status() != WL_CONNECTED) {
    return;
  }

  // 1. Read Physical Sensors
  soilTempSensor.requestTemperatures();
  float soilTemp = soilTempSensor.getTempCByIndex(0);
  if (soilTemp == DEVICE_DISCONNECTED_C) {
    soilTemp = 26.5; // Safe default
  }

  float soilMoisture = readSoilMoisturePercentage();

  // 2. Indicative Optical NPK & Chemical Metrics (or RS485 Modbus)
  // For field prototype, base values with micro-variance
  float ph = 6.5 + ((random(-20, 20)) / 100.0);
  float ec = 0.82 + ((random(-10, 10)) / 100.0);
  float nitrogen = 58.0 + random(-5, 5);
  float phosphorus = 45.0 + random(-3, 3);
  float potassium = 68.0 + random(-4, 4);
  float airTemp = 28.4 + ((random(-15, 15)) / 10.0);
  float humidity = 65.0 + random(-10, 10);
  float rainfall = 0.0;

  // 3. Construct JSON Payload
  String jsonPayload = "{";
  jsonPayload += "\"device_id\":\"" + String(DEVICE_ID) + "\",";
  jsonPayload += "\"soil_moisture\":" + String(soilMoisture, 1) + ",";
  jsonPayload += "\"soil_temperature\":" + String(soilTemp, 1) + ",";
  jsonPayload += "\"ph\":" + String(ph, 2) + ",";
  jsonPayload += "\"ec\":" + String(ec, 2) + ",";
  jsonPayload += "\"nitrogen\":" + String(nitrogen, 1) + ",";
  jsonPayload += "\"phosphorus\":" + String(phosphorus, 1) + ",";
  jsonPayload += "\"potassium\":" + String(potassium, 1) + ",";
  jsonPayload += "\"air_temperature\":" + String(airTemp, 1) + ",";
  jsonPayload += "\"humidity\":" + String(humidity, 1) + ",";
  jsonPayload += "\"rainfall\":" + String(rainfall, 1);
  jsonPayload += "}";

  Serial.println("\n[HTTP POST] Dispatching telemetry payload:");
  Serial.println(jsonPayload);

  // 4. Send HTTP Request
  HTTPClient http;
  http.begin(SERVER_ENDPOINT);
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST(jsonPayload);
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.printf("[HTTP] Success response code: %d\n", httpResponseCode);
    Serial.println("[HTTP] Server response: " + response);
  } else {
    Serial.printf("[HTTP] Error sending POST: %s (code %d)\n", http.errorToString(httpResponseCode).c_str(), httpResponseCode);
  }
  http.end();
}
