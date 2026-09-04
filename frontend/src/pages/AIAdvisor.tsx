import React from 'react';
import { Bot, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AIAdvisor: React.FC = () => {
  const recommendations = [
    {
      title: "Delay Basal Fertilizer Application",
      reason: "Available soil phosphorus is elevated at 72 kg/ha. Applying additional DAP leads to nutrient lock-in.",
      confidence: 89,
      impact: "Saves ₹1,420 / acre in input expenses."
    },
    {
      title: "Maintain Water Table in North Zone",
      reason: "Soil moisture retention is high. No supplemental pumping needed for next 48 hours.",
      confidence: 94,
      impact: "Preserves 4,800 L groundwater."
    },
    {
      title: "Pre-sell 50% Contract at Taraori Mandi",
      reason: "Historical trend indicates peak price window around 15th-20th October.",
      confidence: 87,
      impact: "+₹145/quintal higher realization."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Bot className="w-6 h-6 text-emerald-700" />
        <div>
          <h2 className="text-xl font-bold text-slate-900">AI Agronomy Advisor</h2>
          <p className="text-xs text-slate-500">Physics-guided machine intelligence for farm decision support</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-emerald-100 text-emerald-800">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-sm text-slate-900">{rec.title}</h3>
              </div>
              <span className="text-xs font-semibold bg-slate-100 px-2.5 py-0.5 rounded-full text-slate-700">
                Confidence: {rec.confidence}%
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-3">{rec.reason}</p>
            <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 text-xs font-semibold text-emerald-900">
              Expected Impact: {rec.impact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
