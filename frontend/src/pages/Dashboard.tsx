import React from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import { SimulationBar } from '../components/SimulationBar';
import { MetricCard } from '../components/MetricCard';
import { AdvisorActionCard } from '../components/AdvisorActionCard';
import {
  Layers,
  Droplets,
  Sprout,
  IndianRupee,
  ShieldAlert,
  Store,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  CloudSun
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { t, tText } = useTranslation();
  const {
    farmState,
    soilHealth,
    irrigation,
    cropAnalysis,
    economics,
    marketIntelligence,
    sustainability,
    aiAdvisor,
    actionToast,
    dismissActionToast
  } = useFarmState();

  // Status Colors
  const soilStatusColor = soilHealth.overall_score > 75 ? 'emerald' : soilHealth.overall_score > 55 ? 'yellow' : 'red';
  const waterStatusColor = irrigation.action === 'DO NOT IRRIGATE' ? 'emerald' : irrigation.action === 'MONITOR' ? 'yellow' : 'red';
  const cropStatusColor = cropAnalysis.crop_health_score > 75 ? 'emerald' : cropAnalysis.crop_health_score > 55 ? 'yellow' : 'red';
  const envRiskColor = soilHealth.degradation_risk === 'Low' ? 'emerald' : soilHealth.degradation_risk === 'Moderate' ? 'yellow' : 'red';

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

      {/* Interactive Simulation Control Bar */}
      <SimulationBar />

      {/* Farmer Greeting & Field Quick-Info */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-agri-700 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{t('dashboard.field_overview')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif">
            {t('dashboard.welcome')}, {farmState.config.farmer_name}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {farmState.config.farm_name} • {farmState.config.crop_type} ({farmState.config.crop_variety}) • {farmState.config.area_acres} {t('common.acres')} • {tText(farmState.config.growth_stage + ' Stage')}
          </p>
        </div>

        {/* Microclimate Weather Snapshot */}
        <div className="flex items-center space-x-3 bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-700">
          <CloudSun className="w-8 h-8 text-amber-500 flex-shrink-0" />
          <div>
            <div className="font-bold text-stone-900 text-sm">
              {farmState.air_temperature}°C • {tText(farmState.weather_condition)}
            </div>
            <div className="text-stone-500 text-[11px]">
              {tText("Rain Chance:")} <span className="font-semibold text-blue-600">{farmState.rain_probability}%</span> ({farmState.expected_rainfall} mm)
            </div>
          </div>
        </div>
      </div>

      {/* 6 Core Priority Metric Cards (Connected to Single FarmState) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* 1. Soil Health */}
        <Link to="/app/soil-health" className="block">
          <MetricCard
            title={t('dashboard.soil_card_title')}
            value={soilHealth.overall_score}
            unit="/ 100"
            subtitle={tText(soilHealth.status)}
            icon={Layers}
            iconColor="text-emerald-700"
            statusText={tText(soilHealth.degradation_risk + ' Risk')}
            statusColor={soilStatusColor}
          />
        </Link>

        {/* 2. Water Status */}
        <Link to="/app/irrigation" className="block">
          <MetricCard
            title={t('dashboard.water_card_title')}
            value={farmState.soil_moisture}
            unit="%"
            subtitle={tText(`Pump: ${irrigation.pump_status}`)}
            icon={Droplets}
            iconColor="text-blue-600"
            statusText={tText(irrigation.action)}
            statusColor={waterStatusColor}
          />
        </Link>

        {/* 3. Crop Health */}
        <Link to="/app/crop" className="block">
          <MetricCard
            title={t('dashboard.crop_card_title')}
            value={cropAnalysis.crop_health_score}
            unit="%"
            subtitle={`${cropAnalysis.expected_yield_quintals_per_acre} ${tText("Q / Acre")}`}
            icon={Sprout}
            iconColor="text-green-600"
            statusText={tText(cropAnalysis.growth_stage)}
            statusColor={cropStatusColor}
          />
        </Link>

        {/* 4. Estimated Profit */}
        <Link to="/app/economics" className="block">
          <MetricCard
            title={t('dashboard.profit_card_title')}
            value={`₹${economics.recommended_practice.estimated_net_profit.toLocaleString()}`}
            subtitle={`+₹${economics.net_profit_gain_inr.toLocaleString()} ${tText("gain")}`}
            icon={IndianRupee}
            iconColor="text-amber-600"
            statusText={`${tText("Save")} ${economics.input_cost_reduction_percent}%`}
            statusColor="emerald"
          />
        </Link>

        {/* 5. Environmental Risk */}
        <Link to="/app/sustainability" className="block">
          <MetricCard
            title={t('dashboard.env_risk_title')}
            value={tText(soilHealth.degradation_risk + ' Risk')}
            subtitle={`${tText("Saved:")} ${sustainability.water_saved_liters.toLocaleString()} L`}
            icon={ShieldAlert}
            iconColor="text-purple-600"
            statusText={`Rating: ${sustainability.sustainability_rating}`}
            statusColor={envRiskColor}
          />
        </Link>

        {/* 6. Market Opportunity */}
        <Link to="/app/market" className="block">
          <MetricCard
            title={t('dashboard.market_opp_title')}
            value={`₹${marketIntelligence.maximum_net_realization}`}
            unit="/ Q"
            subtitle={marketIntelligence.best_market_name.split(' ')[0] + ' Mandi'}
            icon={Store}
            iconColor="text-indigo-600"
            statusText={tText("Best Realization")}
            statusColor="blue"
          />
        </Link>
      </div>

      {/* WHAT SHOULD I DO TODAY? Section */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-agri-700 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-agri-600" />
              <span>{t('dashboard.quick_actions')}</span>
            </div>
            <h3 className="text-xl font-extrabold text-stone-900 tracking-tight font-serif mt-1">
              {t('common.what_should_i_do')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">
              {tText(aiAdvisor.summary)}
            </p>
          </div>

          <Link
            to="/app/advisor"
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-agri-700 hover:text-agri-800 transition"
          >
            <span>{t('dashboard.view_all_actions')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Action Cards List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {aiAdvisor.recommendations.slice(0, 4).map((rec) => (
            <AdvisorActionCard key={rec.id} action={rec} />
          ))}
        </div>
      </div>
    </div>
  );
};
