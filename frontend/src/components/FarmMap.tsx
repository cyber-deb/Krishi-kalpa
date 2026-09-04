import React from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Marker } from 'react-leaflet';
import { DEMO_ZONES } from '../data/demoFarm';
import { FarmZone } from '../types/farm';

interface FarmMapProps {
  onSelectZone?: (zone: FarmZone) => void;
}

export const FarmMap: React.FC<FarmMapProps> = ({ onSelectZone }) => {
  const center: [number, number] = [29.6850, 76.9910];

  const getColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return '#10b981'; // Green
      case 'MODERATE': return '#f59e0b'; // Amber
      case 'HIGH': return '#ef4444'; // Red
      default: return '#3b82f6';
    }
  };

  return (
    <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative z-0">
      <MapContainer center={center} zoom={16} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {DEMO_ZONES.map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.coordinates}
            pathOptions={{
              color: getColor(zone.degradation_risk),
              fillColor: getColor(zone.degradation_risk),
              fillOpacity: 0.45,
              weight: 2
            }}
            eventHandlers={{
              click: () => onSelectZone && onSelectZone(zone)
            }}
          >
            <Popup>
              <div className="p-2 text-xs">
                <p className="font-bold text-sm text-slate-900">{zone.name}</p>
                <p className="text-slate-600">Area: {zone.area_acres} Acres</p>
                <p className="text-slate-600">Health Score: <strong>{zone.health_score}/100</strong></p>
                <p className="text-slate-600">Degradation Risk: <strong className="text-emerald-700">{zone.degradation_risk}</strong></p>
                <p className="text-slate-600">Crop: {zone.current_crop}</p>
              </div>
            </Popup>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
};
