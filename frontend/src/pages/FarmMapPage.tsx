import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import { FarmZone } from '../types';
import {
  Map,
  MapPin,
  Layers,
  Droplets,
  FlaskConical,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Info,
  ArrowRight
} from 'lucide-react';

export const FarmMapPage: React.FC = () => {
  const { t } = useTranslation();
  const { farmZones, farmState, executeAdvisorAction } = useFarmState();
  const [selectedZone, setSelectedZone] = useState<FarmZone>(farmZones[0]);

  // Keep selected zone synchronized with current farmState updates
  const activeZone = farmZones.find((z) => z.zone_id === selectedZone.zone_id) || farmZones[0];

  const getZoneColorClass = (status: string) => {
    switch (status) {
      case 'Water Stress':
        return 'fill-red-500/30 stroke-red-600';
      case 'Nutrient Stress':
        return 'fill-amber-500/30 stroke-amber-600';
      case 'Waterlogging Hazard':
        return 'fill-blue-500/30 stroke-blue-600';
      case 'Degradation Alert':
        return 'fill-red-600/40 stroke-red-700';
      default:
        return 'fill-emerald-500/30 stroke-emerald-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-stone-900 font-serif tracking-tight">
          {t('map.title')}
        </h2>
        <p className="text-sm text-stone-500 mt-0.5">
          {t('map.subtitle')} • {farmState.config.farm_name} ({farmState.config.location})
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive GIS Spatial Farm Canvas */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Map className="w-5 h-5 text-agri-600" />
              <h3 className="text-base font-bold text-stone-900">Spatial Farm Health Map</h3>
            </div>
            <span className="text-xs text-stone-400 font-medium">{t('map.select_zone_hint')}</span>
          </div>

          {/* Farm Vector Layout SVG */}
          <div className="relative w-full h-80 sm:h-96 bg-stone-900/90 rounded-2xl overflow-hidden border border-stone-800 flex items-center justify-center p-4">
            {/* Satellite Grid Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

            <svg viewBox="0 0 600 400" className="w-full h-full max-h-80 select-none">
              {/* Field Boundaries */}
              <rect x="20" y="20" width="560" height="360" rx="16" fill="#1c1917" stroke="#44403c" strokeWidth="2" />

              {/* Zone A - North Sector */}
              <g
                onClick={() => setSelectedZone(farmZones[0])}
                className="cursor-pointer group transition transform hover:scale-[1.01]"
              >
                <polygon
                  points="40,40 560,40 560,140 40,140"
                  className={`${getZoneColorClass(farmZones[0].status)} transition-all`}
                  strokeWidth={selectedZone.zone_id === farmZones[0].zone_id ? '3.5' : '2'}
                />
                <text x="60" y="85" fill="#f5f5f4" fontSize="14" fontWeight="bold">
                  {farmZones[0].zone_name}
                </text>
                <text x="60" y="110" fill="#a8a29e" fontSize="11">
                  Status: {farmZones[0].status} • Moisture: {farmZones[0].soil_moisture}% • N: {farmZones[0].nitrogen} mg/kg
                </text>
              </g>

              {/* Zone B - Central Sector */}
              <g
                onClick={() => setSelectedZone(farmZones[1])}
                className="cursor-pointer group transition transform hover:scale-[1.01]"
              >
                <polygon
                  points="40,155 560,155 560,265 40,265"
                  className={`${getZoneColorClass(farmZones[1].status)} transition-all`}
                  strokeWidth={selectedZone.zone_id === farmZones[1].zone_id ? '3.5' : '2'}
                />
                <text x="60" y="205" fill="#f5f5f4" fontSize="14" fontWeight="bold">
                  {farmZones[1].zone_name}
                </text>
                <text x="60" y="230" fill="#a8a29e" fontSize="11">
                  Status: {farmZones[1].status} • Moisture: {farmZones[1].soil_moisture}% • N: {farmZones[1].nitrogen} mg/kg
                </text>
              </g>

              {/* Zone C - South Drainage Sector */}
              <g
                onClick={() => setSelectedZone(farmZones[2])}
                className="cursor-pointer group transition transform hover:scale-[1.01]"
              >
                <polygon
                  points="40,280 560,280 560,360 40,360"
                  className={`${getZoneColorClass(farmZones[2].status)} transition-all`}
                  strokeWidth={selectedZone.zone_id === farmZones[2].zone_id ? '3.5' : '2'}
                />
                <text x="60" y="315" fill="#f5f5f4" fontSize="14" fontWeight="bold">
                  {farmZones[2].zone_name}
                </text>
                <text x="60" y="338" fill="#a8a29e" fontSize="11">
                  Status: {farmZones[2].status} • Moisture: {farmZones[2].soil_moisture}% • N: {farmZones[2].nitrogen} mg/kg
                </text>
              </g>
            </svg>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-stone-100 text-xs">
            <span className="flex items-center text-stone-600">
              <span className="w-3 h-3 rounded-full bg-emerald-500 mr-1.5"></span> Healthy
            </span>
            <span className="flex items-center text-stone-600">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></span> Water Deficit
            </span>
            <span className="flex items-center text-stone-600">
              <span className="w-3 h-3 rounded-full bg-amber-500 mr-1.5"></span> Nutrient Stress
            </span>
            <span className="flex items-center text-stone-600">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-1.5"></span> Excess Moisture
            </span>
          </div>
        </div>

        {/* Selected Zone Real-time Diagnostics Card */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-agri-700 bg-agri-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                {activeZone.crop}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  activeZone.status === 'Healthy'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {activeZone.status}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-stone-900 font-serif mb-1">
              {activeZone.zone_name}
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Area: {activeZone.area_acres} Acres • GPS Coordinates: 20.7453° N, 78.6022° E
            </p>

            {/* Diagnostics Metrics */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                <span className="text-stone-500 font-medium">Soil Moisture</span>
                <span className="font-bold text-stone-900 text-sm font-serif">{activeZone.soil_moisture}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                <span className="text-stone-500 font-medium">Available Nitrogen (N)</span>
                <span className="font-bold text-stone-900 text-sm font-serif">{activeZone.nitrogen} mg/kg</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                <span className="text-stone-500 font-medium">Soil pH Reaction</span>
                <span className="font-bold text-stone-900 text-sm font-serif">{activeZone.ph} pH</span>
              </div>
            </div>

            {/* Identified Problem & Action */}
            <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/80 mb-4 text-xs">
              <span className="font-bold text-amber-900 block mb-1">Identified Issue:</span>
              <p className="text-amber-800">{activeZone.primary_issue}</p>
            </div>

            <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200/80 text-xs">
              <span className="font-bold text-emerald-900 block mb-1">Recommended Action:</span>
              <p className="text-emerald-800">{activeZone.recommended_action}</p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-400">Degradation: {activeZone.degradation_risk}</span>
            {activeZone.status !== 'Healthy' && (
              <button
                onClick={() => executeAdvisorAction('zone_remediate', 'irrigate')}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-agri-600 hover:bg-agri-700 text-white text-xs font-bold transition"
              >
                <span>Remediate Zone</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
