from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.crop_service import CropService

router = APIRouter(prefix="/crop", tags=["Crop Intelligence"])

@router.get("/intelligence", summary="Get crop growth stage, health index, and yield model")
def get_crop_intelligence(db: Session = Depends(get_db)):
    """Returns current growth stage, health index, days to harvest, and predicted quintals."""
    return CropService.get_crop_intelligence(db)
