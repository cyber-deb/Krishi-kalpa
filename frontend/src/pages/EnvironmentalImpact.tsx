import React from 'react';
import { EnvironmentalChart } from '../charts/EnvironmentalChart';
import { Leaf, Droplet, Shield, Cloud } from 'lucide-react';

export const EnvironmentalImpact: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Environmental & Soil Sustainability Impact</h2>
        <p className="text-xs text-slate-500">Quantified metrics on water, chemical reduction, and carbon sequestration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-sm text-slate-800 mb-3">Resource Reduction Breakdown (%)</h3>
          <EnvironmentalChart />
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-800 shrink-0">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">34% Groundwater Conserved</h4>
              <p className="text-xs text-slate-600 mt-1">Prevented over-irrigation using real-time capacitive probes and precipitation forecasts.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">28% Less Chemical Fertilizer</h4>
              <p className="text-xs text-slate-600 mt-1">Prevented nitrate runoff and groundwater contamination by avoiding excess DAP and urea dumping.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-800 shrink-0">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">145 kg CO2e / Acre Sequestered</h4>
              <p className="text-xs text-slate-600 mt-1">Improved Soil Organic Carbon via biological biochar and cover cropping advisories.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
