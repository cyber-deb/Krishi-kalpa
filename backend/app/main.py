import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.seed import seed_database
from app.api import (
    routes_sensors,
    routes_soil,
    routes_irrigation,
    routes_crop,
    routes_market,
    routes_profit,
    routes_alerts,
    routes_demo
)

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("krishi_kalpa")

app = FastAPI(
    title="Krishi-Kalpa API (कृषि-कल्प)",
    description="Intelligent Sustainable Agriculture & Soil Telemetry Platform. Cultivating Intelligence, Growing Prosperity.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS for frontend access
cors_origins_env = os.getenv("CORS_ORIGINS", "*")
origins = [origin.strip() for origin in cors_origins_env.split(",")] if cors_origins_env != "*" else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(routes_sensors.router, prefix="/api")
app.include_router(routes_soil.router, prefix="/api")
app.include_router(routes_irrigation.router, prefix="/api")
app.include_router(routes_crop.router, prefix="/api")
app.include_router(routes_market.router, prefix="/api")
app.include_router(routes_profit.router, prefix="/api")
app.include_router(routes_alerts.router, prefix="/api")
app.include_router(routes_demo.router, prefix="/api")

@app.on_event("startup")
def on_startup():
    logger.info("Krishi-Kalpa backend starting up...")
    try:
        seed_database()
    except Exception as e:
        logger.warning(f"Database auto-seeding encountered notice: {e}")

@app.get("/", tags=["Health Check"])
def root():
    return {
        "application": "Krishi-Kalpa",
        "tagline": "Cultivating Intelligence, Growing Prosperity",
        "team": "RED HAWKS",
        "status": "OPERATIONAL",
        "demo_mode": os.getenv("DEMO_MODE", "true"),
        "docs": "/docs"
    }

@app.get("/health", tags=["Health Check"])
def health():
    return {"status": "healthy", "service": "krishi-kalpa-core"}
