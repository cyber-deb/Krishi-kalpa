import React from 'react';
import { useDemoMode } from '../hooks/useDemoMode';
import { Droplets, CloudRain, Power, ShieldCheck } from 'lucide-react';

export const Irrigation: React.FC = () => {
  const { simState, rainProb } = useDemoMode();
  const isReq = simState.soil_moisture < 35 && rainProb <= 70;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Precision Irrigation Scheduling</h2>
        <p className="text-xs text-slate-500">Penman-Monteith ET₀ Evapotranspiration water balance model</p>
      </div>

      <div className={`p-6 rounded-2xl border text-white shadow-md ${
        isReq ? 'bg-gradient-to-r from-amber-700 to-orange-800 border-amber-600' : 'bg-gradient-to-r from-emerald-800 to-teal-900 border-emerald-700'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-200">System Recommendation</span>
          <span className="text-xs bg-black/40 px-3 py-1 rounded-full font-bold border border-white/20">
            {isReq ? 'PUMP ACTIVE' : 'PUMP OFF (STANDBY)'}
          </span>
        </div>
        <h3 className="text-2xl font-black mb-2">
          {isReq ? 'IRRIGATION REQUIRED — CRITICAL ROOT ZONE DEPLETION' : 'DO NOT IRRIGATE TODAY'}
        </h3>
        <p className="text-sm text-emerald-100 max-w-2xl">
          {isReq
            ? `Soil moisture has fallen to ${simState.soil_moisture}%. Run tube-well for 45 minutes to restore root hydration.`
            : `Soil moisture is at ${simState.soil_moisture}% with rain probability of ${rainProb}%. Natural hydration is projected.`}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-semibold">Estimated Water Saved</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">36,960 Liters</p>
          <p className="text-[11px] text-slate-400 mt-1">Across 2.4-acre farm</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-semibold">Power & Diesel Savings</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">₹360.00</p>
          <p className="text-[11px] text-slate-400 mt-1">Pump electricity avoided</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-semibold">Crop Stress Index</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">0.12 (Low)</p>
          <p className="text-[11px] text-emerald-600 mt-1">Optimal transpiration rate</p>
        </div>
      </div>
    </div>
  );
};
