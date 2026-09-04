import React, { useState } from 'react';
import { FarmMap } from '../components/FarmMap';
import { FarmZone } from '../types/farm';
import { DEMO_ZONES } from '../data/demoFarm';

export const FarmMapPage: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<FarmZone>(DEMO_ZONES[0]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Farm GIS & Zone Degradation Map</h2>
        <p className="text-xs text-slate-500">Spatial telemetry and field boundary inspection</p>
      </div>

      <FarmMap onSelectZone={setSelectedZone} />

      {selectedZone && (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 mb-2">{selectedZone.name}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-lg">
              <span className="text-slate-500">Area</span>
              <p className="font-bold text-slate-800">{selectedZone.area_acres} Acres</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg">
              <span className="text-slate-500">Soil Health Score</span>
              <p className="font-bold text-emerald-700">{selectedZone.health_score} / 100</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg">
              <span className="text-slate-500">Degradation Risk</span>
              <p className="font-bold text-amber-700">{selectedZone.degradation_risk}</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg">
              <span className="text-slate-500">Soil Moisture</span>
              <p className="font-bold text-blue-700">{selectedZone.soil_moisture}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
