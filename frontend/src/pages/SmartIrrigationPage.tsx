import React from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import {
  Droplets,
  Power,
  CloudRain,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const SmartIrrigationPage: React.FC = () => {
  const { t, tText } = useTranslation();
  const { irrigation, farmState, executeAdvisorAction, actionToast, dismissActionToast } = useFarmState();

  const isIrrigate = irrigation.action === 'IRRIGATE';
  const isMonitor = irrigation.action === 'MONITOR';

  const pumpActive = irrigation.pump_status === 'ON';

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
          {t('irrigation.title')}
        </h2>
        <p className="text-sm text-stone-500 mt-0.5">
          {t('irrigation.subtitle')} • {farmState.config.irrigation_system}
        </p>
      </div>

      {/* Primary Decision Banner */}
      <div
        className={`rounded-2xl p-6 border shadow-sm farm-transition ${
          isIrrigate
            ? 'bg-red-50/70 border-red-200'
            : isMonitor
            ? 'bg-yellow-50/70 border-yellow-200'
            : 'bg-emerald-50/70 border-emerald-200'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {t('irrigation.recommendation')}
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-xs font-semibold text-stone-600">
                Next Evaluation in {irrigation.next_check_hours} hours
              </span>
            </div>

            <h3
              className={`text-2xl sm:text-3xl font-extrabold font-serif tracking-tight ${
                isIrrigate ? 'text-red-700' : isMonitor ? 'text-yellow-800' : 'text-emerald-800'
              }`}
            >
              {tText(irrigation.action)}
            </h3>

            <p className="text-sm font-medium text-stone-700 mt-2 max-w-2xl leading-relaxed">
              <strong>Why?</strong> {tText(irrigation.primary_reason)}
            </p>
          </div>

          {/* Virtual Water Pump State Widget */}
          <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-stone-200 shadow-sm self-start md:self-auto">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                pumpActive
                  ? 'bg-emerald-600 text-white animate-pump-active shadow-lg shadow-emerald-200'
                  : 'bg-stone-100 text-stone-400'
              }`}
            >
              <Power className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                Virtual Pump
              </div>
              <div className="text-lg font-extrabold text-stone-900 font-serif">
                {tText(`Pump: ${irrigation.pump_status}`)}
              </div>
              <div className="text-[11px] text-stone-500">
                {pumpActive ? 'Delivering Drip Flow' : 'Motors Standby'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Water & Cost Savings Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Soil Moisture */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Current Moisture</span>
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900 font-serif mb-1">
            {farmState.soil_moisture}%
          </div>
          <div className="text-xs text-stone-500">
            Target: 65% (Field Capacity)
          </div>
        </div>

        {/* Rain Forecast */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Precipitation</span>
            <CloudRain className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900 font-serif mb-1">
            {farmState.rain_probability}%
          </div>
          <div className="text-xs text-stone-500">
            Expected: {farmState.expected_rainfall} mm
          </div>
        </div>

        {/* Water Conserved */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Water Conserved</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 font-serif mb-1">
            {irrigation.water_saved_liters.toLocaleString()} L
          </div>
          <div className="text-xs text-stone-500">
            Groundwater preserved
          </div>
        </div>

        {/* Cost Saved */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Pumping Cost Saved</span>
            <IndianRupee className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 font-serif mb-1">
            ₹{irrigation.estimated_cost_saving_inr.toLocaleString()}
          </div>
          <div className="text-xs text-stone-500">
            Electricity / fuel saved
          </div>
        </div>
      </div>

      {/* Smart Water Advice & Direct Control Actions */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <h3 className="text-base font-bold text-stone-900 mb-3 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-agri-600" />
          <span>Agronomic Irrigation Advice</span>
        </h3>

        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 mb-4">
          <p className="text-sm font-medium text-stone-800 leading-relaxed">
            {tText(irrigation.smart_advice)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-stone-100">
          {isIrrigate ? (
            <button
              onClick={() => executeAdvisorAction('irrigate_now', 'irrigate')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-agri-600 hover:bg-agri-700 text-white text-sm font-bold shadow-md transition"
            >
              <Power className="w-4 h-4" />
              <span>{tText("Start Irrigation Pump")}</span>
            </button>
          ) : (
            <button
              onClick={() => executeAdvisorAction('hold_irrigation', 'dismiss')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{tText("Confirm Rain Hold")}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
