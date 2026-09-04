import React from 'react';
import { Cpu, Calendar, Activity, Sprout } from 'lucide-react';

export const CropIntelligence: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Crop Intelligence & Growth Phenology</h2>
        <p className="text-xs text-slate-500">Paddy (Basmati PB-1121) | Sowing Date: 22 July</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-slate-900 text-sm">Stage: Vegetative Tillering (46% Complete)</h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            68 Days to Harvest
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
          <div className="bg-emerald-600 h-3 rounded-full transition-all" style={{ width: '46%' }}></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-3 border-t border-slate-100">
          <div>
            <span className="text-slate-500">Crop Health Index</span>
            <p className="text-base font-bold text-slate-800">81 / 100</p>
          </div>
          <div>
            <span className="text-slate-500">Projected Yield</span>
            <p className="text-base font-bold text-slate-800">22.5 Q / Acre</p>
          </div>
          <div>
            <span className="text-slate-500">Total Est. Harvest</span>
            <p className="text-base font-bold text-emerald-700">54.0 Quintals</p>
          </div>
          <div>
            <span className="text-slate-500">Risk Vulnerability</span>
            <p className="text-base font-bold text-slate-800">Low (BPH monitored)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
