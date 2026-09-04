import React from 'react';
import { SoilHealthData } from '../types/soil';
import { ShieldCheck, AlertCircle } from 'lucide-react';

interface SoilHealthCardProps {
  soil: SoilHealthData;
}

export const SoilHealthCard: React.FC<SoilHealthCardProps> = ({ soil }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Soil Health & Degradation Index</h3>
          <p className="text-xs text-slate-500">Real-time physicochemical profile</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-emerald-700">{soil.health_score}/100</span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
            soil.degradation_risk === 'LOW'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            {soil.degradation_risk} RISK
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-center">
          <p className="text-[11px] text-slate-500 font-semibold">Nitrogen (N)</p>
          <p className="text-lg font-bold text-slate-800">{soil.nitrogen} <span className="text-xs font-normal">kg/ha</span></p>
          <span className="text-[10px] text-emerald-600 font-medium">Optimal</span>
        </div>
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-center">
          <p className="text-[11px] text-slate-500 font-semibold">Phosphorus (P)</p>
          <p className="text-lg font-bold text-slate-800">{soil.phosphorus} <span className="text-xs font-normal">kg/ha</span></p>
          <span className="text-[10px] text-amber-600 font-medium">Elevated</span>
        </div>
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-center">
          <p className="text-[11px] text-slate-500 font-semibold">Potassium (K)</p>
          <p className="text-lg font-bold text-slate-800">{soil.potassium} <span className="text-xs font-normal">kg/ha</span></p>
          <span className="text-[10px] text-emerald-600 font-medium">Optimal</span>
        </div>
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-center">
          <p className="text-[11px] text-slate-500 font-semibold">Soil pH</p>
          <p className="text-lg font-bold text-slate-800">{soil.ph}</p>
          <span className="text-[10px] text-emerald-600 font-medium">Slightly Acidic</span>
        </div>
      </div>

      <div className="bg-emerald-50/70 rounded-lg p-3 border border-emerald-100 flex items-start gap-2 text-xs text-emerald-900">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p>
          <span className="font-bold">Agronomist Note:</span> Phosphorus carryover detected from prior wheat crop. Reduce next DAP application by 30% to avoid salinity buildup.
        </p>
      </div>
    </div>
  );
};
