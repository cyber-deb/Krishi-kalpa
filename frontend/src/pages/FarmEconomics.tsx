import React from 'react';
import { ProfitChart } from '../charts/ProfitChart';
import { ProfitCard } from '../components/ProfitCard';

export const FarmEconomics: React.FC = () => {
  const expenseData = [
    { category: 'Chemical Fertilizer', current_practice_inr: 16320, ai_optimized_inr: 10080 },
    { category: 'Water & Electricity', current_practice_inr: 10800, ai_optimized_inr: 6720 },
    { category: 'Pesticides', current_practice_inr: 9360, ai_optimized_inr: 6000 },
    { category: 'Seeds & Nursery', current_practice_inr: 7680, ai_optimized_inr: 6960 },
    { category: 'Labour & Harvest', current_practice_inr: 18240, ai_optimized_inr: 17040 },
  ];

  const profitSummary = {
    farm_area_acres: 2.4,
    total_current_cost_inr: 62400,
    total_ai_optimized_cost_inr: 46800,
    total_input_savings_inr: 15600,
    projected_revenue_inr: 212301,
    current_practice_profit_inr: 149901,
    ai_optimized_profit_inr: 165501,
    net_profit_gain_inr: 15600,
    profit_increase_pct: 10.4,
    expense_breakdown: []
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Farm Economics & Input Optimization</h2>
        <p className="text-xs text-slate-500">Reducing input indebtedness while maximizing harvest revenue</p>
      </div>

      <ProfitCard profit={profitSummary} />

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-sm text-slate-800 mb-3">Cost Comparison by Category (2.4 Acres)</h3>
        <ProfitChart breakdown={expenseData} />
      </div>
    </div>
  );
};
