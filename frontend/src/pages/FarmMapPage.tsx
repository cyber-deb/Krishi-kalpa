import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import {
  Map,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export const FarmMapPage: React.FC = () => {
  const { t, tText } = useTranslation();
  const { farmZones, farmState, executeAdvisorAction, actionToast, dismissActionToast } = useFarmState();
  const [selectedZoneId, setSelectedZoneId] = useState<string>(farmZones[0]?.zone_id || 'zone-a-north');

  const activeZone = farmZones.find((z) => z.zone_id === selectedZoneId) || farmZones[0];

  const getZoneFillAndStroke = (status: string, isSelected: boolean) => {
    let fill = '#10b981';
    let stroke = '#059669';

    switch (status) {
      case 'Water Stress':
        fill = '#ef4444';
        stroke = '#dc2626';
        break;
      case 'Nutrient Stress':
        fill = '#f59e0b';
        stroke = '#d97706';
        break;
      case 'Waterlogging Hazard':
        fill = '#3b82f6';
        stroke = '#2563eb';
        break;
      case 'Degradation Alert':
        fill = '#b91c1c';
        stroke = '#991b1b';
        break;
      default:
        fill = '#10b981';
        stroke = '#059669';
    }

    return {
      fill: fill + '33', // 20% opacity fill
      stroke: isSelected ? '#38bdf8' : stroke,
      strokeWidth: isSelected ? 4 : 2,
      textColor: isSelected ? '#ffffff' : '#f5f5f4'
    };
  };

  return (
    <div className="space-y-6">
      {/* Action Toast Feedback */}
      {actionToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-400 flex items-center space-x-3 max-w-md animate-bounce">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-200" />
          <div className="text-xs sm:text-sm font-bold">{tText(actionToast)}</div>
          <button onClick={dismissActionToast} className="text-xs text-emerald-200 hover:text-white font-bold ml-2">✕</button>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-stone-900 font-serif tracking-tight">
          {t('map.title')}
        </h2>
        <p className="text-sm text-stone-500 mt-0.5">
          {t('map.subtitle')} • {farmState.config.farm_name} ({farmState.config.location})
        </p>
      </div>

      {/* Interactive Zone Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {farmZones.map((zone) => {
          const isSelected = zone.zone_id === activeZone.zone_id;
          return (
            <button
              key={zone.zone_id}
              onClick={() => setSelectedZoneId(zone.zone_id)}
              className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
                isSelected
                  ? 'bg-agri-50 border-agri-600 ring-2 ring-agri-500/20 shadow-sm'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-stone-900 font-serif">
                    {tText(zone.zone_name)}
                  </span>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-agri-600" />}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  {tText("Moisture")}: <span className="font-semibold text-stone-800">{zone.soil_moisture}%</span> • N: <span className="font-semibold text-stone-800">{zone.nitrogen} mg/kg</span>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  zone.status === 'Healthy'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {tText(zone.status)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive GIS Spatial Farm Canvas */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Map className="w-5 h-5 text-agri-600" />
              <h3 className="text-base font-bold text-stone-900">{tText("Spatial Farm Health Map")}</h3>
            </div>
            <span className="text-xs text-stone-400 font-medium">{t('map.select_zone_hint')}</span>
          </div>

          {/* Farm Vector Layout SVG */}
          <div className="relative w-full h-80 sm:h-96 bg-stone-900/95 rounded-2xl overflow-hidden border border-stone-800 flex items-center justify-center p-3">
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

            <svg viewBox="0 0 600 400" className="w-full h-full max-h-84 select-none">
              <rect x="15" y="15" width="570" height="370" rx="16" fill="#1c1917" stroke="#44403c" strokeWidth="2" />

              {/* Zone A - North Sector */}
              {(() => {
                const z0 = farmZones[0];
                const isSelected = activeZone.zone_id === z0.zone_id;
                const style = getZoneFillAndStroke(z0.status, isSelected);
                return (
                  <g
                    onClick={() => setSelectedZoneId(z0.zone_id)}
                    style={{ cursor: 'pointer', pointerEvents: 'all' }}
                    className="group"
                  >
                    <rect x="35" y="35" width="530" height="105" rx="8" fill={style.fill} stroke={style.stroke} strokeWidth={style.strokeWidth} />
                    <rect x="35" y="35" width="530" height="105" rx="8" fill="transparent" />
                    <text x="55" y="75" fill={style.textColor} fontSize="14" fontWeight="bold">
                      {tText(z0.zone_name)} {isSelected ? '✓ (Selected)' : ''}
                    </text>
                    <text x="55" y="105" fill="#d6d3d1" fontSize="12">
                      {tText("Status")}: {tText(z0.status)} • {tText("Moisture")}: {z0.soil_moisture}% • N: {z0.nitrogen} mg/kg • pH: {z0.ph}
                    </text>
                  </g>
                );
              })()}

              {/* Zone B - Central Sector */}
              {(() => {
                const z1 = farmZones[1];
                const isSelected = activeZone.zone_id === z1.zone_id;
                const style = getZoneFillAndStroke(z1.status, isSelected);
                return (
                  <g
                    onClick={() => setSelectedZoneId(z1.zone_id)}
                    style={{ cursor: 'pointer', pointerEvents: 'all' }}
                    className="group"
                  >
                    <rect x="35" y="150" width="530" height="110" rx="8" fill={style.fill} stroke={style.stroke} strokeWidth={style.strokeWidth} />
                    <rect x="35" y="150" width="530" height="110" rx="8" fill="transparent" />
                    <text x="55" y="195" fill={style.textColor} fontSize="14" fontWeight="bold">
                      {tText(z1.zone_name)} {isSelected ? '✓ (Selected)' : ''}
                    </text>
                    <text x="55" y="225" fill="#d6d3d1" fontSize="12">
                      {tText("Status")}: {tText(z1.status)} • {tText("Moisture")}: {z1.soil_moisture}% • N: {z1.nitrogen} mg/kg • pH: {z1.ph}
                    </text>
                  </g>
                );
              })()}

              {/* Zone C - South Drainage Sector */}
              {(() => {
                const z2 = farmZones[2];
                const isSelected = activeZone.zone_id === z2.zone_id;
                const style = getZoneFillAndStroke(z2.status, isSelected);
                return (
                  <g
                    onClick={() => setSelectedZoneId(z2.zone_id)}
                    style={{ cursor: 'pointer', pointerEvents: 'all' }}
                    className="group"
                  >
                    <rect x="35" y="270" width="530" height="95" rx="8" fill={style.fill} stroke={style.stroke} strokeWidth={style.strokeWidth} />
                    <rect x="35" y="270" width="530" height="95" rx="8" fill="transparent" />
                    <text x="55" y="305" fill={style.textColor} fontSize="14" fontWeight="bold">
                      {tText(z2.zone_name)} {isSelected ? '✓ (Selected)' : ''}
                    </text>
                    <text x="55" y="335" fill="#d6d3d1" fontSize="12">
                      {tText("Status")}: {tText(z2.status)} • {tText("Moisture")}: {z2.soil_moisture}% • N: {z2.nitrogen} mg/kg • pH: {z2.ph}
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-stone-100 text-xs">
            <span className="flex items-center text-stone-600">
              <span className="w-3 h-3 rounded-full bg-emerald-500 mr-1.5"></span> {tText("Good")}
            </span>
            <span className="flex items-center text-stone-600">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></span> {tText("Water Stress")}
            </span>
            <span className="flex items-center text-stone-600">
              <span className="w-3 h-3 rounded-full bg-amber-500 mr-1.5"></span> {tText("Nutrient Stress")}
            </span>
            <span className="flex items-center text-stone-600">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-1.5"></span> {tText("Waterlogging Hazard")}
            </span>
          </div>
        </div>

        {/* Selected Zone Real-time Diagnostics Card */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-agri-700 bg-agri-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                {tText(activeZone.crop)}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  activeZone.status === 'Healthy'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {tText(activeZone.status)}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-stone-900 font-serif mb-1">
              {tText(activeZone.zone_name)}
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              {tText("Area")}: {activeZone.area_acres} {t('common.acres')} • GPS: 20.7453° N, 78.6022° E
            </p>

            {/* Diagnostics Metrics */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                <span className="text-stone-500 font-medium">{tText("Current Moisture")}</span>
                <span className="font-bold text-stone-900 text-sm font-serif">{activeZone.soil_moisture}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                <span className="text-stone-500 font-medium">{tText("Available Nitrogen (N)")}</span>
                <span className="font-bold text-stone-900 text-sm font-serif">{activeZone.nitrogen} mg/kg</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                <span className="text-stone-500 font-medium">{tText("Soil pH Reaction")}</span>
                <span className="font-bold text-stone-900 text-sm font-serif">{activeZone.ph} pH</span>
              </div>
            </div>

            {/* Identified Problem & Action */}
            <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/80 mb-4 text-xs">
              <span className="font-bold text-amber-900 block mb-1">{tText("Identified Issue:")}</span>
              <p className="text-amber-800">{tText(activeZone.primary_issue)}</p>
            </div>

            <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200/80 text-xs">
              <span className="font-bold text-emerald-900 block mb-1">{tText("Recommended Action:")}</span>
              <p className="text-emerald-800">{tText(activeZone.recommended_action)}</p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-400">{tText("Degradation Risk")}: {tText(activeZone.degradation_risk + ' Risk')}</span>
            {activeZone.status !== 'Healthy' && (
              <button
                onClick={() => executeAdvisorAction('zone_remediate', 'zone_remediate')}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-agri-600 hover:bg-agri-700 text-white text-xs font-bold transition shadow-sm"
              >
                <span>{tText("Remediate Zone")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
