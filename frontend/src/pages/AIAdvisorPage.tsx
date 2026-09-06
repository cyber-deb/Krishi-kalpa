import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import { AdvisorActionCard } from '../components/AdvisorActionCard';
import {
  Bot,
  Sparkles,
  CheckCircle2,
  Info
} from 'lucide-react';

export const AIAdvisorPage: React.FC = () => {
  const { t, tText } = useTranslation();
  const { aiAdvisor, farmState, actionToast, dismissActionToast } = useFarmState();
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'routine'>('all');

  const filteredRecs = aiAdvisor.recommendations.filter((rec) => {
    if (filter === 'high') return rec.urgency === 'High Priority';
    if (filter === 'medium') return rec.urgency === 'Medium Priority';
    if (filter === 'routine') return rec.urgency === 'Standard';
    return true;
  });

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
        <h2 className="text-2xl font-extrabold text-stone-900 font-serif tracking-tight flex items-center space-x-2.5">
          <Bot className="w-7 h-7 text-agri-600" />
          <span>{t('advisor.title')}</span>
        </h2>
        <p className="text-sm text-stone-500 mt-0.5">
          {t('advisor.subtitle')} • Connected Agricultural Inference Engine
        </p>
      </div>

      {/* Daily Diagnostic Summary Banner */}
      <div className="bg-gradient-to-r from-agri-900 to-stone-900 text-white rounded-2xl p-6 shadow-md border border-agri-800">
        <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Farm Health Evaluation</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-serif mb-2 text-white">
          {tText(aiAdvisor.headline)}
        </h3>
        <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
          {tText(aiAdvisor.summary)}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-stone-700/60 text-xs text-stone-300">
          <div>
            <span className="text-stone-400">{tText("Current Status:")}</span>{' '}
            <span className="font-bold text-amber-300">{tText(aiAdvisor.overall_farm_condition)}</span>
          </div>
          <div>
            <span className="text-stone-400">{tText("Action Items:")}</span>{' '}
            <span className="font-bold text-white">{aiAdvisor.recommendations.length} {tText("Pending Tasks")}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-stone-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            filter === 'all'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          {tText("All Recommendations")} ({aiAdvisor.recommendations.length})
        </button>

        <button
          onClick={() => setFilter('high')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            filter === 'high'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-red-50 text-red-700 hover:bg-red-100'
          }`}
        >
          {tText("High Priority")} ({aiAdvisor.recommendations.filter((r) => r.urgency === 'High Priority').length})
        </button>

        <button
          onClick={() => setFilter('medium')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            filter === 'medium'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
          }`}
        >
          {tText("Medium Priority")} ({aiAdvisor.recommendations.filter((r) => r.urgency === 'Medium Priority').length})
        </button>

        <button
          onClick={() => setFilter('routine')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            filter === 'routine'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          {tText("Routine")} ({aiAdvisor.recommendations.filter((r) => r.urgency === 'Standard').length})
        </button>
      </div>

      {/* Action Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredRecs.length > 0 ? (
          filteredRecs.map((rec) => <AdvisorActionCard key={rec.id} action={rec} />)
        ) : (
          <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-stone-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-stone-900">No Pending Actions in this Category</h4>
            <p className="text-xs text-stone-500 mt-1">Farm parameters are operating smoothly within target thresholds.</p>
          </div>
        )}
      </div>

      {/* Farmer Guidance & Safety Assurance */}
      <div className="bg-stone-100 p-4 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-start space-x-3">
        <Info className="w-5 h-5 text-agri-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-stone-900 block mb-0.5">Philosophy: Helping Farmers Act</span>
          <span>
            Every recommendation is calculated strictly from live root zone telemetry, soil chemical balances, and meteorological radars. Actions taken update the farm state and prevent unnecessary input expenditures.
          </span>
        </div>
      </div>
    </div>
  );
};
