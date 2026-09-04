import React from 'react';
import { AlertItem } from '../types/sensor';
import { AlertTriangle, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

interface AlertCardProps {
  alert: AlertItem;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const iconMap = {
    CRITICAL: AlertTriangle,
    WARNING: AlertCircle,
    INFO: Info
  };

  const styleMap = {
    CRITICAL: "border-rose-300 bg-rose-50/70 text-rose-900",
    WARNING: "border-amber-300 bg-amber-50/70 text-amber-900",
    INFO: "border-blue-300 bg-blue-50/70 text-blue-900"
  };

  const badgeMap = {
    CRITICAL: "bg-rose-600 text-white",
    WARNING: "bg-amber-500 text-white",
    INFO: "bg-blue-600 text-white"
  };

  const Icon = iconMap[alert.severity] || Info;

  return (
    <div className={`p-4 rounded-xl border ${styleMap[alert.severity]} shadow-xs`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 shrink-0" />
          <h4 className="font-bold text-sm">{alert.title}</h4>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${badgeMap[alert.severity]}`}>
          {alert.severity}
        </span>
      </div>
      <p className="text-xs text-slate-700 mb-2">{alert.message}</p>
      <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/60 text-[11px] text-slate-800">
        <span className="font-bold text-slate-900">Recommended Action: </span>
        {alert.recommended_action}
      </div>
    </div>
  );
};
