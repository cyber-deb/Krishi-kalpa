import React from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import {
  Store,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

export const MarketIntelligencePage: React.FC = () => {
  const { t, tText } = useTranslation();
  const { marketIntelligence, farmState } = useFarmState();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-stone-900 font-serif tracking-tight">
          {t('market.title')}
        </h2>
        <p className="text-sm text-stone-500 mt-0.5">
          {t('market.subtitle')} • {farmState.config.crop_type} ({farmState.config.crop_variety})
        </p>
      </div>

      {/* Recommended Best Mandi Highlight Banner */}
      <div className="bg-gradient-to-r from-agri-900 to-stone-900 text-white rounded-2xl p-6 shadow-md border border-agri-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{t('market.best_mandi')}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            {marketIntelligence.best_market_name}
          </h3>
          <p className="text-sm text-stone-300 mt-2 max-w-xl leading-relaxed">
            {tText(marketIntelligence.price_forecast_advice)}
          </p>
        </div>

        <div className="flex items-center space-x-4 bg-stone-800/80 p-4 rounded-xl border border-stone-700 self-start md:self-auto">
          <div>
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              {t('market.highest_realization')}
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 font-serif">
              ₹{marketIntelligence.maximum_net_realization} <span className="text-xs text-stone-400">/ Q</span>
            </div>
            <div className="text-[11px] text-stone-400">
              Total Revenue: <span className="font-bold text-white">₹{marketIntelligence.total_estimated_revenue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* APMC Mandi Comparison Table */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center space-x-2">
          <Store className="w-5 h-5 text-agri-600" />
          <span>Regional APMC Mandi Price Discovery & Logistics</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">APMC Mandi Yard</th>
                <th className="py-3 px-4">{t('market.distance')}</th>
                <th className="py-3 px-4">{t('market.modal_price')}</th>
                <th className="py-3 px-4">{t('market.transport_cost')}</th>
                <th className="py-3 px-4">APMC Cess & Fees</th>
                <th className="py-3 px-4 text-emerald-700 font-extrabold">{t('market.net_realization')}</th>
                <th className="py-3 px-4 text-right">Trend / Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
              {marketIntelligence.markets.map((m) => (
                <tr
                  key={m.mandi_name}
                  className={`transition ${
                    m.is_recommended ? 'bg-agri-50/70 font-bold text-agri-950' : 'hover:bg-stone-50'
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="font-bold text-stone-900">{m.mandi_name}</div>
                    <div className="text-[11px] text-stone-400 font-normal">{m.district} District</div>
                  </td>
                  <td className="py-4 px-4 font-semibold">{m.distance_km} km</td>
                  <td className="py-4 px-4 font-serif">₹{m.modal_price_per_quintal}</td>
                  <td className="py-4 px-4 text-stone-500">-₹{m.transport_cost_per_quintal}</td>
                  <td className="py-4 px-4 text-stone-500">-₹{m.mandi_cess_and_fees_per_quintal}</td>
                  <td className="py-4 px-4 font-extrabold text-emerald-700 font-serif text-sm sm:text-base">
                    ₹{m.net_realization_per_quintal}
                  </td>
                  <td className="py-4 px-4 text-right">
                    {m.is_recommended ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> {tText("Recommended")}
                      </span>
                    ) : (
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          m.price_trend === 'Rising'
                            ? 'bg-emerald-50 text-emerald-700'
                            : m.price_trend === 'Falling'
                            ? 'bg-red-50 text-red-700'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {tText(m.price_trend)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Marketing Calculation Formula Note */}
      <div className="bg-stone-100 p-4 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-start space-x-3">
        <Info className="w-5 h-5 text-stone-500 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-stone-900 block mb-0.5">Formula: Net In-Hand Realization</span>
          <span>
            Net Realization (₹/Q) = Mandi Modal Selling Price - Road Freight Transport Cost - APMC Cess & Weighment Fees. Always select the market yielding the highest net return rather than simply the highest gross listing price.
          </span>
        </div>
      </div>
    </div>
  );
};
