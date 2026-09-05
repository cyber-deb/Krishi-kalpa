import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.database.database import Base, engine
from app.api.endpoints import router as api_router

# Setup Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("krishi_kalpa")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize Database Tables
    logger.info("Initializing Krishi-Kalpa Farm Intelligence System...")
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database schemas verified.")
    except Exception as e:
        logger.warning(f"Database schema initialization notice (using memory fallback): {e}")
    yield
    # Shutdown
    logger.info("Krishi-Kalpa System shutdown complete.")

app = FastAPI(
    title="Krishi-Kalpa API",
    description="Cultivating Intelligence, Growing Prosperity — Connected Agricultural Intelligence Backend",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if "*" in origins else origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Fallback Exception Handler for maximum resilience
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Handled exception on {request.url.path}: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Processing Notice",
            "message": str(exc),
            "fallback_active": True
        }
    )

# Include API Router
app.include_router(api_router)

@app.get("/")
def root():
    return {
        "application": "Krishi-Kalpa",
        "motto": "Cultivating Intelligence, Growing Prosperity",
        "status": "Running",
        "documentation": "/docs",
        "api_prefix": "/api"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
