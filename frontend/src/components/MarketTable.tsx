import React from 'react';
import { MandiItem } from '../types/market';
import { formatCurrency } from '../utils/formatting';
import { Award, CheckCircle2, TrendingUp } from 'lucide-react';

interface MarketTableProps {
  markets: MandiItem[];
}

export const MarketTable: React.FC<MarketTableProps> = ({ markets }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-slate-900 text-base">APMC Mandi Net Realization Matrix</h3>
          <p className="text-xs text-slate-500">True profit after transit and mandi fee deductions (54 Quintals harvest)</p>
        </div>
        <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
          Formula: Price - Transport - Fees
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3">Mandi / Market</th>
              <th className="p-3">Distance</th>
              <th className="p-3">Modal Price</th>
              <th className="p-3">Transport Cost</th>
              <th className="p-3">Mandi Cess</th>
              <th className="p-3">Net Realization / Q</th>
              <th className="p-3">Est. Total Net</th>
              <th className="p-3 text-right">Advantage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {markets.map((m, idx) => (
              <tr key={idx} className={m.is_recommended ? 'bg-emerald-50/60 font-semibold text-emerald-950' : 'hover:bg-slate-50'}>
                <td className="p-3 flex items-center gap-1.5">
                  {m.is_recommended && <Award className="w-4 h-4 text-emerald-600 shrink-0" />}
                  <span>{m.market_name}</span>
                </td>
                <td className="p-3">{m.distance_km} km</td>
                <td className="p-3">{formatCurrency(m.modal_price_per_quintal)}</td>
                <td className="p-3 text-rose-600">-{formatCurrency(m.transport_cost_per_quintal)}</td>
                <td className="p-3 text-rose-600">-{formatCurrency(m.mandi_fee_per_quintal)}</td>
                <td className="p-3 font-bold text-slate-900">{formatCurrency(m.net_realization_per_quintal)}</td>
                <td className="p-3 font-bold text-emerald-800">{formatCurrency(m.estimated_total_net_inr)}</td>
                <td className="p-3 text-right">
                  {m.advantage_vs_local_inr > 0 ? (
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                      +{formatCurrency(m.advantage_vs_local_inr)}
                    </span>
                  ) : m.advantage_vs_local_inr < 0 ? (
                    <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      {formatCurrency(m.advantage_vs_local_inr)}
                    </span>
                  ) : (
                    <span className="text-slate-400">Baseline</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
