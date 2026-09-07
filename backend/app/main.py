import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, HTMLResponse # Added HTMLResponse

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

# REPLACED ROOT ROUTE FOR QR CODE REDIRECT
@app.get("/", response_class=HTMLResponse)
def wake_and_redirect():
    # ⚠️ REPLACE THIS with your actual deployed Render frontend URL
    frontend_url = "https://krishi-kalpa-frontend.onrender.com/" 
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
      <head>
        <title>Loading Krishi-Kalpa...</title>
        <meta http-equiv="refresh" content="2;url={frontend_url}" />
      </head>
      <body style="font-family: sans-serif; text-align: center; padding-top: 20%; background-color: #f4f4f9;">
        <h2 style="color: #2e7d32;">Waking up Krishi-Kalpa server... 🌾</h2>
        <p>Redirecting you to the application now!</p>
        <script>
          setTimeout(() => {{ window.location.href = "{frontend_url}"; }}, 1500);
        </script>
      </body>
    </html>
    """
    return html_content

# If you still want the old JSON status, you can add it on a new path like this:
@app.get("/status")
def status():
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
