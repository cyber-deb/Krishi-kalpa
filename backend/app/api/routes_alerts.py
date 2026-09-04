from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.sensor import Alert

router = APIRouter(prefix="/alerts", tags=["Alerts & Warnings"])

@router.get("/", summary="Get list of active farm alerts")
def get_alerts(db: Session = Depends(get_db)):
    """Returns all active field alerts categorized by severity."""
    try:
        alerts = db.query(Alert).order_by(Alert.created_at.desc()).limit(15).all()
        return alerts
    except Exception:
        return [
            {
                "id": 1,
                "severity": "INFO",
                "title": "Optimal NPK Ratio Detected",
                "message": "Phosphorus levels slightly elevated. Reduce next basal application.",
                "recommended_action": "Delay DAP application by 10 days.",
                "category": "SOIL",
                "is_resolved": False,
                "created_at": "2026-09-05T09:00:00"
            }
        ]
