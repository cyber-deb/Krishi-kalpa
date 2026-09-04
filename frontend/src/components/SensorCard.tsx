import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SensorCardProps {
  label: string;
  value: number | string;
  unit: string;
  idealRange: string;
  status: 'Optimal' | 'Warning' | 'Alert';
  icon: LucideIcon;
}

export const SensorCard: React.FC<SensorCardProps> = ({
  label,
  value,
  unit,
  idealRange,
  status,
  icon: Icon
}) => {
  const statusColors = {
    Optimal: "text-emerald-700 bg-emerald-50 border-emerald-200",
    Warning: "text-amber-700 bg-amber-50 border-amber-200",
    Alert: "text-rose-700 bg-rose-50 border-rose-200"
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-emerald-300 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500">{label}</span>
        <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-baseline gap-1 my-1">
        <span className="text-2xl font-black text-slate-900">{value}</span>
        <span className="text-xs font-medium text-slate-500">{unit}</span>
      </div>
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <span className="text-slate-400">Target: {idealRange}</span>
        <span className={`px-2 py-0.5 rounded-full font-bold border ${statusColors[status]}`}>
          {status}
        </span>
      </div>
    </div>
  );
};
