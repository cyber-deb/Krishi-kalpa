import React from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import {
  IndianRupee,
  TrendingUp,
  Percent,
  CreditCard,
  ShieldCheck,
  Info,
  Scale,
  ArrowDownRight,
  Sparkles
} from 'lucide-react';

export const FarmEconomicsPage: React.FC = () => {
  const { t, tText } = useTranslation();
  const { economics, farmState } = useFarmState();

  const cur = economics.current_practice;
  const rec = economics.recommended_practice;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-stone-900 font-serif tracking-tight">
          {t('economics.title')}
        </h2>
        <p className="text-sm text-stone-500 mt-0.5">
          {t('economics.subtitle')} • {farmState.config.area_acres} {t('common.acres')} ({farmState.config.crop_type})
        </p>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Net Profit Gain */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
            {t('economics.net_gain')}
          </span>
          <div className="text-3xl font-extrabold text-emerald-700 font-serif mb-1">
            +₹{economics.net_profit_gain_inr.toLocaleString()}
          </div>
          <p className="text-xs text-stone-500">
            Higher projected return from balanced inputs & yield protection
          </p>
        </div>

        {/* Input Cost Savings */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
            {t('economics.potential_savings')}
          </span>
          <div className="text-3xl font-extrabold text-agri-700 font-serif mb-1">
            ₹{economics.potential_savings_inr.toLocaleString()}
          </div>
          <p className="text-xs text-stone-500">
            {economics.input_cost_reduction_percent}% reduction in wasted fertilizers & energy
          </p>
        </div>

        {/* Repayment Pressure */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
            {t('economics.repayment_pressure')}
          </span>
          <div className="text-3xl font-extrabold text-stone-900 font-serif mb-1">
            {tText(economics.repayment_pressure)}
          </div>
          <p className="text-xs text-stone-500">
            Debt Coverage Ratio: {economics.debt_service_ratio}x
          </p>
        </div>
      </div>

      {/* Current Practice vs Recommended Practice Comparison Table */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center space-x-2">
          <Scale className="w-5 h-5 text-agri-600" />
          <span>{tText("Input Expenditure & Profit Comparison")}</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">{tText("FINANCIAL METRIC")}</th>
                <th className="py-3 px-4 text-stone-600">{t('economics.current_practice')}</th>
                <th className="py-3 px-4 text-agri-700">{t('economics.recommended_practice')}</th>
                <th className="py-3 px-4 text-emerald-700 text-right">{tText("BENEFIT / IMPACT")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
              <tr>
                <td className="py-3.5 px-4 font-bold text-stone-900">{tText("Fertilizer & Nutrition Cost")}</td>
                <td className="py-3.5 px-4">₹{cur.fertilizer_cost.toLocaleString()}</td>
                <td className="py-3.5 px-4 font-bold text-agri-800">₹{rec.fertilizer_cost.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold text-right">
                  {tText("Save")} ₹{(cur.fertilizer_cost - rec.fertilizer_cost).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-stone-900">{tText("Water Pumping Electricity")}</td>
                <td className="py-3.5 px-4">₹{cur.water_pumping_cost.toLocaleString()}</td>
                <td className="py-3.5 px-4 font-bold text-agri-800">₹{rec.water_pumping_cost.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold text-right">
                  {tText("Save")} ₹{(cur.water_pumping_cost - rec.water_pumping_cost).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-stone-900">{tText("Labor & Operations")}</td>
                <td className="py-3.5 px-4">₹{cur.labor_and_operations.toLocaleString()}</td>
                <td className="py-3.5 px-4 font-bold text-agri-800">₹{rec.labor_and_operations.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold text-right">
                  {tText("Save")} ₹{(cur.labor_and_operations - rec.labor_and_operations).toLocaleString()}
                </td>
              </tr>
              <tr className="bg-stone-50 font-bold text-stone-900">
                <td className="py-3.5 px-4">{t('economics.input_cost')}</td>
                <td className="py-3.5 px-4">₹{cur.total_input_cost.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-agri-800">₹{rec.total_input_cost.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-emerald-700 text-right">
                  -{economics.input_cost_reduction_percent}% {tText("reduction")}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-stone-900">{t('economics.gross_revenue')}</td>
                <td className="py-3.5 px-4">₹{cur.estimated_gross_revenue.toLocaleString()} ({cur.expected_yield_quintals} Q)</td>
                <td className="py-3.5 px-4 font-bold text-agri-800">₹{rec.estimated_gross_revenue.toLocaleString()} ({rec.expected_yield_quintals} Q)</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold text-right">
                  +₹{(rec.estimated_gross_revenue - cur.estimated_gross_revenue).toLocaleString()}
                </td>
              </tr>
              <tr className="bg-agri-50/70 text-agri-950 font-extrabold text-sm sm:text-base border-t-2 border-agri-300">
                <td className="py-4 px-4 font-serif">{t('economics.net_profit')}</td>
                <td className="py-4 px-4 font-serif">₹{cur.estimated_net_profit.toLocaleString()}</td>
                <td className="py-4 px-4 text-agri-800 font-serif">₹{rec.estimated_net_profit.toLocaleString()}</td>
                <td className="py-4 px-4 text-emerald-700 text-right font-serif">
                  +₹{economics.net_profit_gain_inr.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Indebtedness & Debt Alleviation Guidance */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-3">
          <CreditCard className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-stone-900 font-serif">
            {t('economics.financial_health')}
          </h3>
        </div>

        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-3">
            <div>
              <span className="text-stone-400 block font-medium">Estimated Crop Loan / KCC Debt:</span>
              <span className="text-base font-bold text-stone-900 font-serif">₹{economics.outstanding_debt_inr.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Annual Net Surplus Capacity:</span>
              <span className="text-base font-bold text-emerald-700 font-serif">₹{(rec.estimated_net_profit * 2).toLocaleString()}</span>
            </div>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            <strong>Financial Guidance:</strong> {economics.financial_guidance}
          </p>
        </div>

        <div className="text-[11px] text-stone-400 flex items-start space-x-2">
          <Info className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
          <span>{economics.disclaimer}</span>
        </div>
      </div>
    </div>
  );
};
