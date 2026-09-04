# Krishi-Kalpa (कृषि-कल्प)
> **"Cultivating Intelligence, Growing Prosperity"**
> *Developed by Team RED HAWKS for Agriculture & Sustainable Farming*

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC.svg)](https://tailwindcss.com/)
[![Render](https://img.shields.io/badge/Deploy-Render-46E3B7.svg)](https://render.com)

---

## 1. Executive Summary & Problem Statement

Soil degradation, erratic weather patterns, excessive chemical fertilizer application, and asymmetrical market pricing represent existential threats to smallholder farmers. 
- **Soil Degradation & Salinity**: Unmonitored NPK dumping deteriorates soil microbiome and structure.
- **Water Waste & Power Costs**: Flood irrigation without real-time moisture modeling wastes over 40% of groundwater.
- **Farmer Indebtedness**: Over-expenditure on unnecessary inputs combined with poor mandi market price discovery traps farmers in debt cycles.

**Krishi-Kalpa** is an end-to-end Agritech Decision Intelligence Platform combining affordable IoT field telemetry (ESP32 + multi-depth soil probes) with physics-aware AI agronomy models, dynamic farm economics, and predictive APMC mandi logistics optimization.

---

## 2. System Architecture

```text
       ┌──────────────────────────────────────────────────────────┐
       │                   IoT Field Telemetry                    │
       │  [ESP32 MCU] ──► [Capacitive Moisture + NPK + pH + BME]  │
       └─────────────────────────────┬────────────────────────────┘
                                     │ HTTPS REST / (MQTT Ready)
                                     ▼
       ┌──────────────────────────────────────────────────────────┐
       │               FastAPI High-Performance Core             │
       │  ┌────────────────────────────────────────────────────┐  │
       │  │  Telemetry Ingestion & Anomaly Detection Pipeline  │  │
       │  └──────────────────────────┬─────────────────────────┘  │
       │                             ▼                            │
       │  ┌────────────────────────────────────────────────────┐  │
       │  │   AI Agronomy Engine & Physics Recommendation Core  │  │
       │  │   • Soil Degradation Risk (NPK + pH + EC index)    │  │
       │  │   • Evapotranspiration Irrigation Model (ET₀-Penman)│  │
       │  │   • Dynamic Crop Yield & Input Optimization Model  │  │
       │  │   • Net Realization Mandi Supply Chain Optimization│  │
       │  └──────────────────────────┬─────────────────────────┘  │
       │                             ▼                            │
       │  ┌────────────────────────────────────────────────────┐  │
       │  │  PostgreSQL (Auto-fallback to SQLite / Demo Mode)  │  │
       │  └────────────────────────────────────────────────────┘  │
       └─────────────────────────────┬────────────────────────────┘
                                     │ JSON REST API + WebSockets
                                     ▼
       ┌──────────────────────────────────────────────────────────┐
       │              React 18 + TypeScript Web App               │
       │  • "What Should I Do Today?" Primary Action Card         │
       │  • 2-Minute Guided Hackathon Presentation Mode           │
       │  • Real-time Soil Telemetry & 30-Day Trend Visualizations│
       │  • Interactive GIS Zone Health Map (Leaflet)             │
       │  • APMC Mandi Net-Realization Transport Cost Calculator  │
       │  • Interactive What-If Simulation Sandbox                │
       └──────────────────────────────────────────────────────────┘
```

---

## 3. Key Capabilities

1. **"What Should I Do Today?" Engine**: Aggregates soil probes, upcoming precipitation forecasts, crop phenology stage, and fertilizer timing into an unambiguous daily action plan with confidence scoring and quantified ROI.
2. **Soil Health & Degradation Prevention**: Evaluates N-P-K ratios, Electrical Conductivity (EC), Organic Carbon, and pH to classify degradation risk (Low, Moderate, High, Critical) and recommend regenerative biological inputs.
3. **Weather-Integrated Smart Irrigation**: Combines capacitive moisture readings with real-time precipitation forecast to prevent redundant pump operation—saving energy and groundwater.
4. **Mandi Logistics & Net Realization Optimizer**: Computes real profit: `Net Realization = Mandi Rate - Transport Cost - Loading/Mandi Fees - Transit Spoilage Risk`.
5. **Farmer Economics & Input Comparison**: Direct comparison of traditional empirical farming versus Krishi-Kalpa AI-optimized recommendations.
6. **Dual-Mode Architecture (100% Zero-Hardware Demo Mode & Live IoT Mode)**: Seamlessly operates offline with built-in realistic simulation controls or ingests live field readings from ESP32 devices.

---

## 4. Scientific Disclaimer & Sensor Limitations

- Soil metrics provided by prototype optical/electrochemical sensors represent **indicative field estimates** intended for relative trend analysis, not certified laboratory spectroscopic assays.
- The platform supports Periodic Lab Calibration Offsets to reconcile field IoT readings with formal soil health card laboratory tests.
- Economic and yield predictions are model-based statistical estimates and subject to micro-climatic variances.

---

## 5. Quick Start Guide

### Step 1: Clone Repository
```bash
git clone https://github.com/your-org/smart-farm-intelligence.git
cd smart-farm-intelligence
```

### Step 2: Backend Setup
```bash
cd backend
python -m venv venv
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

### Step 3: Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
npm run dev
```
Open `http://localhost:5173` to explore the dashboard.

---

## 6. 2-Minute Hackathon Demo Script

Click the **"START 2-MINUTE DEMO"** button in the top navigation bar to trigger the automated tour, or manually follow these steps:
1. **Overview**: Note the "What Should I Do Today?" card showing high confidence advisories and 6 vital KPIs.
2. **Simulate Drought / Dry Soil**: In the Demo Sandbox bar, drag Soil Moisture down to 24%. Notice immediate alert generation: "Critical Moisture Deficit" -> Irrigation recommended.
3. **Simulate Rain Forecast**: Move Rainfall Probability to 85%. Notice the AI instantly updates: "DO NOT IRRIGATE TODAY: Rain Expected within 6 hours. Estimated water saved: 4,800 L."
4. **Soil Health**: Check NPK nutrient ratios, Soil Health Score (68/100), and 30-day degradation risk trend.
5. **Farm Economics & Mandi Intelligence**: Switch to Market Intelligence to see how Mandi B delivers +₹3,400 higher net profit despite being 14 km further away due to lower commission and higher crop demand.
