import React from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  Droplets,
  Sprout,
  Layers,
  CloudRain,
  ArrowRight
} from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { t } = useTranslation();
  const { alerts, executeAdvisorAction } = useFarmState();

  const getAlertIcon = (category: string) => {
    switch (category) {
      case 'water':
        return Droplets;
      case 'soil':
        return Layers;
      case 'crop':
        return Sprout;
      case 'weather':
        return CloudRain;
      default:
        return Bell;
    }
  };

  const getAlertStyles = (severity: string) => {
    switch (severity) {
      case 'danger':
        return {
          bg: 'bg-red-50/70 border-red-200',
          badge: 'bg-red-100 text-red-800 border-red-200',
          btn: 'bg-red-600 hover:bg-red-700 text-white',
          iconColor: 'text-red-600'
        };
      case 'warning':
        return {
          bg: 'bg-amber-50/70 border-amber-200',
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
          btn: 'bg-amber-600 hover:bg-amber-700 text-white',
          iconColor: 'text-amber-600'
        };
      case 'info':
        return {
          bg: 'bg-blue-50/70 border-blue-200',
          badge: 'bg-blue-100 text-blue-800 border-blue-200',
          btn: 'bg-blue-600 hover:bg-blue-700 text-white',
          iconColor: 'text-blue-600'
        };
      default:
        return {
          bg: 'bg-emerald-50/70 border-emerald-200',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
          iconColor: 'text-emerald-600'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-stone-900 font-serif tracking-tight">
          {t('alerts.title')}
        </h2>
        <p className="text-sm text-stone-500 mt-0.5">
          {t('alerts.subtitle')} • Active Farm Diagnostics
        </p>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.category);
          const style = getAlertStyles(alert.severity);

          return (
            <div
              key={alert.id}
              className={`rounded-2xl p-5 border shadow-sm transition farm-transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${style.bg}`}
            >
              <div className="flex items-start space-x-3.5">
                <div className={`p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-sm ${style.iconColor} flex-shrink-0 mt-0.5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${style.badge}`}>
                      {alert.category} • {alert.severity}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-stone-900 leading-snug">
                    {alert.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed max-w-2xl">
                    {alert.message}
                  </p>
                </div>
              </div>

              {alert.action_label && (
                <div className="self-end sm:self-center flex-shrink-0">
                  <button
                    onClick={() => executeAdvisorAction(alert.id, 'review')}
                    className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${style.btn}`}
                  >
                    <span>{alert.action_label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
