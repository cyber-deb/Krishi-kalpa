import React from 'react';
import { ProfitComparisonData } from '../types/market';
import { formatCurrency } from '../utils/formatting';
import { TrendingUp, DollarSign } from 'lucide-react';

interface ProfitCardProps {
  profit: ProfitComparisonData;
}

export const ProfitCard: React.FC<ProfitCardProps> = ({ profit }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Farmer Economic Optimization</span>
          <h3 className="text-lg font-bold text-slate-900">Projected Profit & Savings</h3>
        </div>
        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <p className="text-[11px] text-slate-500 font-semibold">Traditional Profit</p>
          <p className="text-lg font-bold text-slate-800">{formatCurrency(profit.current_practice_profit_inr)}</p>
        </div>
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
          <p className="text-[11px] text-emerald-800 font-semibold">AI-Optimized Profit</p>
          <p className="text-lg font-black text-emerald-700">{formatCurrency(profit.ai_optimized_profit_inr)}</p>
        </div>
        <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 col-span-2 sm:col-span-1">
          <p className="text-[11px] text-teal-800 font-semibold">Total Input Savings</p>
          <p className="text-lg font-black text-teal-700">+{formatCurrency(profit.total_input_savings_inr)}</p>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 italic text-center">
        * Model-based projection for 2.4-acre Basmati Paddy crop cycle.
      </p>
    </div>
  );
};
