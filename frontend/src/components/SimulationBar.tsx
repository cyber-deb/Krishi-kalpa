import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import {
  Sparkles,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Loader2,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const SimulationBar: React.FC = () => {
  const { t } = useTranslation();
  const {
    farmState,
    activeScenario,
    isAnalyzing,
    generateScenario,
    resetToHealthyFarm,
    soilHealth
  } = useFarmState();

  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-agri-950 text-white rounded-2xl shadow-xl border border-stone-700 overflow-hidden farm-transition mb-6">
      {/* Top Banner Header & Primary Controls */}
      <div className="p-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-700/60">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
            {isAnalyzing ? (
              <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {t('simulation_bar.banner_title')}
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-xs text-stone-300">
                {isAnalyzing ? t('common.analyzing') : activeScenario?.category || 'Optimal'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {activeScenario?.title || farmState.active_scenario_title}
            </h3>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={() => generateScenario()}
            disabled={isAnalyzing}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-agri-600 hover:bg-agri-500 active:bg-agri-700 text-white text-sm font-bold shadow-lg transition disabled:opacity-50"
          >
            {isAnalyzing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300" />
            )}
            <span>{t('common.generate_scenario')}</span>
          </button>

          <button
            onClick={() => resetToHealthyFarm()}
            disabled={isAnalyzing}
            className="inline-flex items-center space-x-1.5 px-3 py-2.5 rounded-xl bg-stone-700/80 hover:bg-stone-600 active:bg-stone-800 text-stone-200 text-sm font-semibold border border-stone-600 transition"
            title={t('common.reset_healthy')}
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">{t('common.reset_healthy')}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl bg-stone-700/50 hover:bg-stone-600 text-stone-300 transition"
            aria-label="Toggle details"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Slide-out Diagnostic Details (WHAT CHANGED? / WHAT SHOULD I DO? / EXPECTED IMPACT) */}
      {isExpanded && activeScenario && (
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-stone-900/60 text-xs sm:text-sm">
          {/* 1. What Changed */}
          <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700/70">
            <div className="flex items-center space-x-1.5 text-amber-400 font-bold uppercase tracking-wider mb-2.5">
              <TrendingDown className="w-4 h-4" />
              <span>{t('common.what_changed')}</span>
            </div>
            <ul className="space-y-2 text-stone-200">
              {activeScenario.changes_summary?.map((change, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. What Should I Do Today */}
          <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700/70">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-bold uppercase tracking-wider mb-2.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('common.what_should_i_do')}</span>
            </div>
            <ul className="space-y-2 text-stone-200">
              {activeScenario.what_should_i_do?.map((action, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Expected Impact */}
          <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700/70">
            <div className="flex items-center space-x-1.5 text-blue-400 font-bold uppercase tracking-wider mb-2.5">
              <TrendingUp className="w-4 h-4" />
              <span>{t('common.expected_impact')}</span>
            </div>
            <div className="space-y-2 text-stone-200">
              <div className="flex justify-between items-center py-1 border-b border-stone-700/50">
                <span className="text-stone-400">Soil Health Score:</span>
                <span className="font-bold text-white text-base">
                  {soilHealth.overall_score}/100
                </span>
              </div>
              {activeScenario.expected_impact?.water_requirement_l !== undefined && activeScenario.expected_impact.water_requirement_l > 0 && (
                <div className="flex justify-between items-center py-1 border-b border-stone-700/50">
                  <span className="text-stone-400">Water Needed:</span>
                  <span className="font-semibold text-blue-300">
                    {activeScenario.expected_impact.water_requirement_l.toLocaleString()} L
                  </span>
                </div>
              )}
              {activeScenario.expected_impact?.water_saved_l !== undefined && (
                <div className="flex justify-between items-center py-1 border-b border-stone-700/50">
                  <span className="text-stone-400">Water Conserved:</span>
                  <span className="font-semibold text-emerald-300">
                    {activeScenario.expected_impact.water_saved_l.toLocaleString()} L
                  </span>
                </div>
              )}
              {activeScenario.expected_impact?.estimated_cost_inr !== undefined && (
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-400">Est. Additional Cost:</span>
                  <span className="font-semibold text-amber-300">
                    ₹{activeScenario.expected_impact.estimated_cost_inr}
                  </span>
                </div>
              )}
              {activeScenario.expected_impact?.estimated_cost_saving_inr !== undefined && (
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-400">Est. Cost Saved:</span>
                  <span className="font-semibold text-emerald-300">
                    ₹{activeScenario.expected_impact.estimated_cost_saving_inr}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
