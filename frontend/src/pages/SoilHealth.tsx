import React from 'react';
import { useSoilHealth } from '../hooks/useSoilHealth';
import { SoilTrendChart } from '../charts/SoilTrendChart';
import { NutrientChart } from '../charts/NutrientChart';
import { Sprout, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export const SoilHealth: React.FC = () => {
  const { soilHealth, history } = useSoilHealth();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Soil Health & Degradation Analytics</h2>
          <p className="text-xs text-slate-500">Continuous chemical, physical, and biological soil monitoring</p>
        </div>
        <span className="text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full">
          Degradation Index: {soilHealth.degradation_risk}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-sm text-slate-800 mb-3">30-Day Soil Health Score Trend</h3>
          <SoilTrendChart data={history} />
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-sm text-slate-800 mb-3">NPK Balance vs Target Benchmark</h3>
          <NutrientChart nitrogen={soilHealth.nitrogen} phosphorus={soilHealth.phosphorus} potassium={soilHealth.potassium} />
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-sm text-slate-800 mb-4">Agronomic Soil Health Prescriptions</h3>
        <div className="space-y-3 text-xs">
          {soilHealth.recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
