from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    phone_number = Column(String(20), unique=True, index=True)
    email = Column(String(100), unique=True, nullable=True)
    hashed_password = Column(String(255), default="demo_hashed_pass")
    role = Column(String(50), default="farmer")
    created_at = Column(DateTime, default=datetime.utcnow)

    farms = relationship("Farm", back_populates="owner")

class Farm(Base):
    __tablename__ = "farms"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))
    location_name = Column(String(150), default="Karnal, Haryana")
    latitude = Column(Float, default=29.6857)
    longitude = Column(Float, default=76.9905)
    total_area_acres = Column(Float, default=2.4)
    soil_type = Column(String(80), default="Alluvial Loam")
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="farms")
    fields = relationship("Field", back_populates="farm", cascade="all, delete-orphan")

class Field(Base):
    __tablename__ = "fields"
    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"))
    name = Column(String(100), nullable=False)
    area_acres = Column(Float, default=1.2)
    zone_type = Column(String(50), default="Zone A - North Field")
    current_crop = Column(String(100), default="Paddy (Basmati)")
    created_at = Column(DateTime, default=datetime.utcnow)

    farm = relationship("Farm", back_populates="fields")
