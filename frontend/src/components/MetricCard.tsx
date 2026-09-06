import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  statusText?: string;
  statusColor?: 'emerald' | 'yellow' | 'amber' | 'red' | 'blue';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  iconColor = 'text-agri-600',
  statusText,
  statusColor = 'emerald',
  onClick
}) => {
  const colorMap = {
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    yellow: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    red: 'bg-red-50 text-red-800 border-red-200',
    blue: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-md transition farm-transition ${
        onClick ? 'cursor-pointer hover:border-agri-300' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl bg-stone-50 border border-stone-100 ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline space-x-1.5 mb-2">
        <span className="text-3xl font-extrabold text-stone-900 tracking-tight font-serif">
          {value}
        </span>
        {unit && <span className="text-sm font-semibold text-stone-500">{unit}</span>}
      </div>

      <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100">
        {subtitle && <span className="text-stone-500 truncate max-w-[140px]">{subtitle}</span>}
        {statusText && (
          <span className={`px-2 py-0.5 rounded-full font-bold border ${colorMap[statusColor]}`}>
            {statusText}
          </span>
        )}
      </div>
    </div>
  );
};
