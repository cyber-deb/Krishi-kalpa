import React from 'react';
import { MasterDailyAction } from '../types/farm';
import { CheckCircle2, AlertTriangle, Droplet, ArrowRight, ShieldCheck } from 'lucide-react';

interface RecommendationCardProps {
  action: MasterDailyAction;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ action }) => {
  const badgeStyles = {
    emerald: "bg-emerald-100 text-emerald-800 border-emerald-300",
    blue: "bg-blue-100 text-blue-800 border-blue-300",
    amber: "bg-amber-100 text-amber-800 border-amber-300",
    rose: "bg-rose-100 text-rose-800 border-rose-300"
  };

  return (
    <div className="bg-gradient-to-br from-[#0d2e1a] to-[#144626] rounded-2xl p-6 text-white shadow-lg border border-emerald-700/50 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-emerald-300/90 font-bold">Primary Action Recommendation</span>
            <p className="text-[10px] text-emerald-200/70">What Should I Do Today?</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-black/40 px-2.5 py-1 rounded-full text-emerald-300 font-medium border border-emerald-500/30">
            Confidence: {action.confidence}%
          </span>
          <span className={`text-xs px-3 py-1 rounded-full font-bold border ${badgeStyles[action.badge_color]}`}>
            {action.badge}
          </span>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-3 leading-snug">
        {action.headline}
      </h2>

      <p className="text-sm text-emerald-100/90 leading-relaxed mb-5 max-w-3xl">
        {action.reason}
      </p>

      <div className="pt-4 border-t border-emerald-700/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300">
            <Droplet className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-emerald-200">
            Expected Impact: <span className="text-white font-bold">{action.impact}</span>
          </span>
        </div>

        <button className="flex items-center gap-2 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl transition-all shadow-md">
          <span>Apply Protocol</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
