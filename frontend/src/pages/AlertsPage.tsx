import React from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import {
  Bell,
  Droplets,
  Sprout,
  Layers,
  CloudRain,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { t, tText } = useTranslation();
  const { alerts, executeAdvisorAction, actionToast, dismissActionToast } = useFarmState();

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
          {t('alerts.title')}
        </h2>
        <p className="text-sm text-stone-500 mt-0.5">
          {t('alerts.subtitle')} • Active Farm Diagnostics
        </p>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3 shadow-inner">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-serif mb-1">
              {tText("All Clear")}
            </h3>
            <p className="text-sm text-stone-500 max-w-md">
              {tText("Farm Operating in Optimal Health Range")}
            </p>
          </div>
        ) : (
          alerts.map((alert) => {
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
                        {tText(alert.category)} • {tText(alert.severity)}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-stone-900 leading-snug">
                      {tText(alert.title)}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed max-w-2xl">
                      {tText(alert.message)}
                    </p>
                  </div>
                </div>

                {alert.action_label && (
                  <div className="self-end sm:self-center flex-shrink-0">
                    <button
                      onClick={() => executeAdvisorAction(alert.id, 'review')}
                      className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${style.btn}`}
                    >
                      <span>{tText(alert.action_label)}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
