# Krishi-Kalpa (कृषि-कल्प)
> **" Cultivating Intelligence, Growing Prosperity "**

[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20TypeScript-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20Python%203.11-green.svg)](https://fastapi.tiangolo.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8.svg)](https://tailwindcss.com/)
[![ESP32 IoT](https://img.shields.io/badge/Hardware-ESP32%20IoT%20Station-red.svg)](https://espressif.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌾 1. Project Overview

**Krishi-Kalpa** is a unified, connected agricultural intelligence platform engineered specifically for **Indian farmers**. By establishing a continuous bridge between **IoT root-zone telemetry**, **soil chemistry analytics**, **meteorological radar**, **smart irrigation**, and **APMC Mandi pricing**, Krishi-Kalpa transforms complex agronomic data into **simple, daily actionable decisions**.

Unlike traditional static dashboards, every screen in Krishi-Kalpa is dynamically bound to a **Central Single Source of Truth (`FarmState`)**. If soil moisture drops or nitrogen levels fluctuate, the entire platform updates in real-time across sensors, soil degradation indices, AI advisories, water pumping controls, farm economics, GIS map zones, and carbon credit ledgers.

---

## 🎯 2. Core Problems Solved

```
               SOIL HEALTH (NPK, pH, Salinity, Organic Carbon)
                                     ↓
                 SMART INPUT & IRRIGATION MANAGEMENT
                                     ↓
                    LOWER FARMING INPUT COSTS (20-30%)
                                     ↓
                       HIGHER CROP PRODUCTIVITY
                                     ↓
                     HIGHER NET FARMER PROFIT
                                     ↓
                   LOWER FINANCIAL DEBT PRESSURE
                                     ↓
                     SUSTAINABLE AGRICULTURE
```

1. **Soil Degradation & Chemical Over-Application:** Indiscriminate urea and fertilizer dumping causes soil acidification, salinity lockup, and groundwater pollution. Krishi-Kalpa continuously evaluates soil health and generates tailored soil amendment plans.
2. **Poverty & Low Farmer Income:** High input costs eat away farm margins. Krishi-Kalpa models input costs vs. net profits to maximize in-hand returns.
3. **Farmer Indebtedness:** Tracks debt serviceability ratios and helps farmers budget input investments to reduce credit risks.
4. **Supply Chain & Market Inefficiency:** Recommends regional APMC Mandis based on *Net Realization* ($Selling\ Price - Transportation - Mandi\ Fees$) rather than deceptive gross prices.

---

## 🧠 3. Core Technologies & Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FARM STATE / SINGLE SOURCE OF TRUTH             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ↓                          ↓                          ↓
 ┌───────────────┐          ┌───────────────┐          ┌───────────────┐
 │ IoT Telemetry │          │ Soil Health   │          │ Smart Water   │
 │ (ESP32 Node)  │          │ (NPK, pH, EC) │          │ (Radar Sync)  │
 └───────┬───────┘          └───────┬───────┘          └───────┬───────┘
         │                          │                          │
         └──────────────────────────┼──────────────────────────┘
                                    ↓
 ┌───────────────────────────────────────────────────────────────────────┐
 │               AI FARM ADVISOR ("WHAT SHOULD I DO TODAY?")              │
 └──────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ↓                          ↓                          ↓
 ┌───────────────┐          ┌───────────────┐          ┌───────────────┐
 │Farm Economics │          │ Market Mandi  │          │ GIS Farm Map  │
 │(Profit/Debt)  │          │ Intelligence  │          │ Spatial Health│
 └───────────────┘          └───────────────┘          └───────────────┘
```

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Recharts, Lucide Icons, Leaflet GIS.
- **Backend:** Python 3.11, FastAPI, Pydantic v2, SQLAlchemy, PostgreSQL / SQLite auto-fallback.
- **Hardware IoT:** ESP32 DevKit V1, Capacitive Soil Moisture, 7-in-1 Modbus RS485 NPK/pH/EC Probe, DHT22, Rain Sensor, 5V Optocoupler Relay.
- **Multi-Language i18n:** Full support for **13 Indian Languages** in their native script (English, हिन्दी, বাংলা, मराठी, తెలుగు, தமிழ், ગુજરાતી, ಕನ್ನಡ, മലയാളം, ਪੰਜਾਬੀ, ଓଡ଼ିଆ, অসমীয়া, اردو).

---

## 📁 4. Folder Structure

```
krishi-kalpa/
├── README.md                 # Complete documentation & hackathon demo guide
├── render.yaml               # Render single-repo blueprint deployment config
├── .gitignore                # Git exclusions
│
├── frontend/                 # React 18 + TypeScript + Vite SPA
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.ts        # Vite configuration
│   ├── tsconfig.json         # TypeScript compiler configuration
│   ├── tailwind.config.js    # Custom agricultural theme palette
│   ├── postcss.config.js     # PostCSS plugins
│   ├── index.html            # HTML5 entry point
│   ├── public/               # Favicon and static assets
│   └── src/
│       ├── main.tsx          # React DOM mounting
│       ├── App.tsx           # Router and application layout
│       ├── index.css         # Tailwind & smooth transition classes
│       ├── types/            # TypeScript type definitions
│       ├── services/         # API HTTP communication layer
│       ├── data/             # Deterministic fallback agronomic models
│       ├── state/
│       │   └── FarmStateContext.tsx # Central Single Source of Truth
│       ├── i18n/             # 13 Indian language translations
│       │   ├── index.tsx     # i18n engine & translation hook
│       │   └── translations/ # JSON files for en, hi, bn, mr, te, ta, gu, kn, ml, pa, or, as, ur
│       ├── components/       # Navbar, Sidebar, SimulationBar, MetricCard, AdvisorActionCard
│       └── pages/            # 13 Dedicated responsive dashboard pages
│
├── backend/                  # Python FastAPI Backend
│   ├── requirements.txt      # Python dependencies
│   ├── .env.example          # Environment variable template
│   └── app/
│       ├── main.py           # FastAPI application entry point & CORS
│       ├── database/         # SQLAlchemy DB connection & SQLite fallback
│       ├── models/           # Sensor readings & scenario history models
│       ├── schemas/          # Pydantic data schemas
│       ├── api/              # REST API routes (/api/farm, /api/sensors, etc.)
│       ├── services/         # Soil, Irrigation, Crop, Economics, Market, Sustainability engines
│       ├── ai/               # AI Farm Advisor decision rules
│       └── simulation/       # Farm simulation state & 20+ scenario templates
│
└── hardware/                 # ESP32 IoT Station & Schematics
    ├── README.md             # Hardware flashing guide
    ├── BOM.md                # Bill of Materials with Indian prototype pricing
    ├── wiring/               # ASCII & pinout wiring diagram
    └── esp32/                # Production-ready Arduino C++ code
```

---

## 🚀 5. Local Quickstart Installation

### Prerequisites
- Node.js (v18+ or v20+)
- Python (v3.10+ or v3.11+)
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/krishi-kalpa.git
cd krishi-kalpa
```

### Step 2: Backend Setup
```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env

# Run FastAPI Server (Runs on http://localhost:8000)
uvicorn app.main:app --reload --port 8000
```

### Step 3: Frontend Setup
Open a new terminal window:
```bash
cd krishi-kalpa/frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser to experience Krishi-Kalpa!

---

## 🎮 6. Interactive Farm Simulation Engine

Krishi-Kalpa features a realistic **Farm Simulation Engine** capable of generating 20+ agronomically accurate scenarios with subtle transitions.

| Scenario | Generated State | Platform Dynamic Response |
|----------|-----------------|---------------------------|
| **Low Nitrogen** | N = 28 mg/kg, Moisture = 58% | Flagged as Deficient; AI Advisor recommends neem-coated urea split top-dressing; fertilizer cost updates. |
| **Water Stress** | Moisture = 23%, Temp = 34°C | Critical Deficit; Irrigation switches to **IRRIGATE**; Virtual Pump becomes **ON**; Water needed: 18,500 L. |
| **Impending Monsoon** | Moisture = 79%, Rain Prob = 88% | Irrigation switches to **DO NOT IRRIGATE**; Pump **OFF**; Saves 22,000 L water & ₹420 electricity. |
| **Acidic Soil (Low pH)** | pH = 5.1, P = 35 mg/kg | Chemical Degradation alert; Phosphorus lockup identified; Recommends 150 kg/acre agricultural lime. |
| **High Salinity (EC)** | EC = 2.45 dS/m, Moisture = 52% | Root osmotic stress detected; AI Advisor recommends canal leaching and cross-field drainage trenches. |
| **Heatwave & Dry Wind** | Air Temp = 39.2°C, Moisture = 28% | Heat stress alert; Advises light evening micro-sprinkler cooling and anti-transpirant potassium foliar spray. |
| **Healthy Balanced Farm** | NPK 62:74:66, pH 6.5, Moisture 64% | Optimal status; Soil Health 86/100; Peak yield trajectory. |

---

## 🌐 7. Multi-Language System (13 Languages)

All 13 supported Indian languages are rendered in their **native script with no flag symbols**:

1. **English** (English)
2. **हिन्दी** (Hindi)
3. **বাংলা** (Bengali)
4. **मराठी** (Marathi)
5. **తెలుగు** (Telugu)
6. **தமிழ்** (Tamil)
7. **ગુજરાતી** (Gujarati)
8. **ಕನ್ನಡ** (Kannada)
9. **മലയാളം** (Malayalam)
10. **ਪੰਜਾਬੀ** (Punjabi)
11. **ଓଡ଼ିଆ** (Odia)
12. **অসমীয়া** (Assamese)
13. **اردو** (Urdu)

*Technical terms (ESP32, IoT, API, MQTT, GPS, EC, NPK, AI, ML, HTTP, WiFi) are preserved universally across all languages.*

---

## 📡 8. IoT Hardware Integration (ESP32)

1. Connect the sensors according to `hardware/wiring/wiring-diagram.md`.
2. Open `hardware/esp32/esp32_sensor_code.ino` in Arduino IDE.
3. Set your WiFi credentials and backend endpoint:
   ```cpp
   const char* WIFI_SSID     = "YOUR_WIFI";
   const char* WIFI_PASSWORD = "YOUR_PASSWORD";
   const char* SERVER_URL    = "http://YOUR_SERVER_IP:8000/api/sensors/data";
   const char* DEVICE_ID     = "ESP32-FARM-001";
   ```
4. Flash the sketch to your ESP32. Real telemetry will automatically stream into Krishi-Kalpa!

---

## 📤 9. GitHub Upload Instructions (Drag & Drop or CLI)

### Method A: Git Command Line (Recommended)
1. Create a new repository on GitHub named `krishi-kalpa`.
2. In your local terminal:
   ```bash
   cd krishi-kalpa
   git init
   git add .
   git commit -m "Initial commit: Krishi-Kalpa connected agricultural intelligence platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/krishi-kalpa.git
   git push -u origin main
   ```

### Method B: GitHub Web Drag-and-Drop
1. Create a new repository on GitHub named `krishi-kalpa`.
2. Drag and drop the `krishi-kalpa` folder contents into the GitHub repository upload window.
3. Ensure `render.yaml`, `README.md`, `.gitignore`, `frontend/`, `backend/`, and `hardware/` are at the repository root.
4. Commit changes directly to `main`.

---

## ☁️ 10. One-Click Render Deployment

Krishi-Kalpa includes a unified `render.yaml` Blueprint file for automated deployment.

1. Log into [Render.com](https://render.com/).
2. Click **New +** > **Blueprint**.
3. Connect your GitHub repository `krishi-kalpa`.
4. Render will automatically detect `render.yaml` and configure:
   - **Backend Web Service:** FastAPI (`python -r requirements.txt`, `uvicorn app.main:app`)
   - **Frontend Static Site:** React (`npm install && npm run build`, publish dir: `./frontend/dist`)
5. Click **Apply**.
6. Once deployed, set the frontend environment variable `VITE_API_URL` to your live backend Render URL (e.g. `https://krishi-kalpa-backend.onrender.com`).

---

## 🏆 11. 2-3 Minute Hackathon Demo Flow

- **Step 1 (Overview):** Open Krishi-Kalpa. Point out the header motto *"Cultivating Intelligence, Growing Prosperity"*, Farm Alpha (2.4 Acres), and the 6 core metric cards (Soil Health 68/100, Water Status, Crop Health, Profit, Env Risk, Market Opportunity).
- **Step 2 (Live Sensors):** Navigate to **Live Sensors**. Show the 10 real-time parameters, ESP32 device health, and 12-hour historical trend charts.
- **Step 3 (Simulation Trigger):** Click **"Generate Farm Scenario"**. Scenario: *Low Moisture + Nitrogen Deficiency*. Show the smooth "Analyzing Farm..." transition.
- **Step 4 (Interconnectedness):** Show that:
  - Sensors update to Moisture: 24%, N: 22 mg/kg.
  - Soil Health score drops to 41/100.
  - AI Advisor updates with urgent irrigation and fertigation instructions.
  - Smart Irrigation activates Virtual Pump **ON**.
  - Farm Economics recalculates fertilizer cost and profit projections.
  - Farm Map marks Zone A in red (*Water Stress*).
- **Step 5 (Second Scenario):** Click **"Generate Farm Scenario"** again. Scenario: *High Moisture + Monsoon Downpour (88% rain)*.
- **Step 6 (Resource Conservation):** Show that Smart Irrigation automatically sets irrigation to **DO NOT IRRIGATE**, saving 22,000 Litres of groundwater and logging ₹420 in electricity savings.
- **Step 7 (Multi-Language):** Open the Language dropdown. Switch to **हिन्दी**, **বাংলা**, **मराठी**, or **తెలుగు**. Show the entire dashboard, alerts, advice, and charts instantly translating in native script.
- **Step 8 (Farmer Action Plan):** Open **"What Should I Do Today?"** to demonstrate the actionable guidance with clear reasoning, impact, and direct remediation buttons.

---

## 📜 12. License & Scientific Disclaimer

**License:** MIT License  
**Scientific Disclaimer:** *Agronomic recommendations and financial projections generated by Krishi-Kalpa are model-based indicative estimates designed for farmer decision support. Prototype optical/capacitive IoT sensors should be periodically cross-calibrated against certified agricultural laboratory soil testing cards.*
