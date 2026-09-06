import React from 'react';
import { FarmAdvisorAction } from '../types';
import { useFarmState } from '../state/FarmStateContext';
import { useTranslation } from '../i18n';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface AdvisorActionCardProps {
  action: FarmAdvisorAction;
}

export const AdvisorActionCard: React.FC<AdvisorActionCardProps> = ({ action }) => {
  const { executeAdvisorAction } = useFarmState();
  const { tText } = useTranslation();

  const isHigh = action.urgency === 'High Priority';
  const isMedium = action.urgency === 'Medium Priority';

  const badgeColor = isHigh
    ? 'bg-red-50 text-red-700 border-red-200'
    : isMedium
    ? 'bg-amber-50 text-amber-800 border-amber-200'
    : 'bg-emerald-50 text-emerald-800 border-emerald-200';

  const btnColor = isHigh
    ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-md'
    : isMedium
    ? 'bg-agri-600 hover:bg-agri-700 active:bg-agri-800 text-white'
    : 'bg-stone-800 hover:bg-stone-900 active:bg-black text-white';

  return (
    <div
      className={`rounded-2xl p-5 border shadow-sm transition farm-transition ${
        isHigh
          ? 'bg-white border-red-200 ring-1 ring-red-100'
          : 'bg-white border-stone-200 hover:border-agri-300'
      }`}
    >
      {/* Header with Category & Urgency */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-agri-700 bg-agri-50 px-2.5 py-1 rounded-lg">
          {tText(action.category)}
        </span>
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
            {tText(action.urgency)}
          </span>
          <span className="text-xs text-stone-400 font-medium hidden sm:inline">
            {tText(action.confidence)}
          </span>
        </div>
      </div>

      {/* Main Title & Action */}
      <h4 className="text-base sm:text-lg font-bold text-stone-900 mb-1.5 leading-snug">
        {tText(action.title)}
      </h4>

      <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100 mb-3.5">
        <p className="text-sm font-semibold text-agri-950 flex items-start space-x-2">
          <span className="text-agri-600 font-bold text-base leading-none">👉</span>
          <span>{tText(action.action)}</span>
        </p>
      </div>

      {/* Why & Expected Impact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
        <div className="bg-stone-50/70 p-3 rounded-xl border border-stone-100">
          <span className="font-bold text-stone-500 uppercase tracking-wider block mb-1">
            {tText("Why this matters:")}
          </span>
          <p className="text-stone-700 leading-relaxed">{tText(action.why)}</p>
        </div>

        <div className="bg-stone-50/70 p-3 rounded-xl border border-stone-100">
          <span className="font-bold text-stone-500 uppercase tracking-wider block mb-1">
            {tText("Expected Result:")}
          </span>
          <p className="text-stone-700 leading-relaxed font-medium">{tText(action.expected_impact)}</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-100">
        <div className="flex items-center space-x-1.5 text-xs text-stone-500">
          <ShieldCheck className="w-4 h-4 text-agri-600" />
          <span>{tText("Agronomic AI Verified")}</span>
        </div>

        <button
          onClick={() => executeAdvisorAction(action.id, action.button_action_type)}
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${btnColor}`}
        >
          <span>{tText(action.button_label)}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
