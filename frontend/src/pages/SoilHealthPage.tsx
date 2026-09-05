import React from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import {
  Layers,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Info,
  TrendingUp,
  Sparkles,
  FlaskConical,
  Sprout
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

export const SoilHealthPage: React.FC = () => {
  const { t } = useTranslation();
  const { soilHealth, farmState } = useFarmState();

  const npkChartData = [
    {
      name: 'Nitrogen (N)',
      value: farmState.nitrogen,
      optimalMin: 50,
      optimalMax: 85,
      unit: 'mg/kg',
      fill: farmState.nitrogen < 35 || farmState.nitrogen > 110 ? '#ef4444' : farmState.nitrogen < 50 ? '#f59e0b' : '#10b981'
    },
    {
      name: 'Phosphorus (P)',
      value: farmState.phosphorus,
      optimalMin: 55,
      optimalMax: 90,
      unit: 'mg/kg',
      fill: farmState.phosphorus < 30 || farmState.phosphorus > 95 ? '#ef4444' : farmState.phosphorus < 55 ? '#f59e0b' : '#10b981'
    },
    {
      name: 'Potassium (K)',
      value: farmState.potassium,
      optimalMin: 50,
      optimalMax: 85,
      unit: 'mg/kg',
      fill: farmState.potassium < 35 ? '#ef4444' : farmState.potassium < 50 ? '#f59e0b' : '#10b981'
    }
  ];

  const trendData = soilHealth.historical_trend.map((item) => ({
    name: item.day,
    score: item.score,
    moisture: item.moisture,
    nitrogen: item.nitrogen
  }));

  const riskBadgeColor =
    soilHealth.degradation_risk === 'Low'
      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
      : soilHealth.degradation_risk === 'Moderate'
      ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
      : soilHealth.degradation_risk === 'High'
      ? 'bg-amber-100 text-amber-800 border-amber-300'
      : 'bg-red-100 text-red-800 border-red-300';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-stone-900 font-serif tracking-tight">
          {t('soil.title')}
        </h2>
        <p className="text-sm text-stone-500 mt-0.5">
          {t('soil.subtitle')} • {farmState.config.soil_type}
        </p>
      </div>

      {/* Main Score & Degradation Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Score Gauge */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
            {t('soil.overall_score')}
          </span>
          <div className="relative flex items-center justify-center w-36 h-36 my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-stone-100"
                strokeWidth="3.8"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={soilHealth.overall_score > 70 ? 'text-agri-600' : soilHealth.overall_score > 50 ? 'text-amber-500' : 'text-red-500'}
                strokeDasharray={`${soilHealth.overall_score}, 100`}
                strokeWidth="3.8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-extrabold text-stone-900 font-serif">
                {soilHealth.overall_score}
              </span>
              <span className="text-[11px] font-bold text-stone-400">/ 100</span>
            </div>
          </div>
          <span className="text-base font-bold text-stone-800 mt-1">{soilHealth.status}</span>
          <p className="text-xs text-stone-500 mt-1 max-w-xs">{soilHealth.summary}</p>
        </div>

        {/* Degradation Risk Details */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-stone-900">
                  {t('soil.degradation_risk')}
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${riskBadgeColor}`}>
                {soilHealth.degradation_risk} Risk
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                {t('soil.contributing_factors')}
              </span>
              {soilHealth.degradation_factors.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {soilHealth.degradation_factors.map((factor, idx) => (
                    <li key={idx} className="flex items-start space-x-2 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>No active degradation factors detected. Soil physical & chemical balances are optimal.</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Methodology: Multi-Criteria Agronomic Telemetry</span>
            <span className="font-semibold text-agri-700">{soilHealth.confidence}</span>
          </div>
        </div>
      </div>

      {/* Nutrients & Soil Chemistry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NPK Chart */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-stone-900 flex items-center space-x-2">
              <FlaskConical className="w-5 h-5 text-agri-600" />
              <span>{t('soil.npk_balance')}</span>
            </h3>
            <span className="text-xs text-stone-400 font-medium">Optimal: 50–85 mg/kg</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={npkChartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: '#78716c', fontSize: 12 }} />
                <YAxis tick={{ fill: '#78716c', fontSize: 12 }} />
                <Tooltip
                  formatter={(val: any) => [`${val} mg/kg`, 'Current Value']}
                  contentStyle={{ backgroundColor: '#1c1917', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {npkChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
            {npkChartData.map((item) => (
              <div key={item.name} className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <span className="text-stone-500 block font-medium">{item.name.split(' ')[0]}</span>
                <span className="text-lg font-bold text-stone-900 font-serif">{item.value}</span>
                <span className="text-[10px] text-stone-400 block">{item.unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* pH, EC, and Organic Carbon Table */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center space-x-2">
              <Sprout className="w-5 h-5 text-emerald-600" />
              <span>Soil Physical & Chemical Telemetry</span>
            </h3>

            <div className="space-y-3">
              {soilHealth.nutrients.map((nutr) => (
                <div
                  key={nutr.symbol}
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center font-bold text-xs text-agri-900 shadow-sm">
                      {nutr.symbol}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-stone-900">{nutr.name}</div>
                      <div className="text-[11px] text-stone-500">
                        Target: {nutr.optimal_min}–{nutr.optimal_max} {nutr.unit}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-extrabold text-stone-900 font-serif">
                      {nutr.current_value} <span className="text-[11px] font-normal text-stone-500">{nutr.unit}</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        nutr.status_color === 'emerald'
                          ? 'bg-emerald-100 text-emerald-800'
                          : nutr.status_color === 'yellow'
                          ? 'bg-yellow-100 text-yellow-800'
                          : nutr.status_color === 'amber'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {nutr.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scientific honesty note */}
          <div className="mt-4 p-3 bg-stone-100/70 rounded-xl text-[11px] text-stone-500 flex items-start space-x-2">
            <Info className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Scientific Note:</strong> IoT NPK & optical pH telemetry provide indicative field readings for immediate decision support. Periodic government soil lab testing is recommended for baseline calibration.
            </span>
          </div>
        </div>
      </div>

      {/* Soil Amendment Plan */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <h3 className="text-base font-bold text-stone-900 mb-3 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-agri-600" />
          <span>{t('soil.amendment_plan')}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {soilHealth.soil_amendment_plan.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-xl bg-agri-50/50 border border-agri-100 text-xs text-agri-950 font-medium">
              <span className="w-5 h-5 rounded-full bg-agri-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Trend Chart */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-agri-600" />
          <span>Soil Health & Moisture Trend</span>
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fill: '#78716c', fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#78716c', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1c1917', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="score" stroke="#2e7940" strokeWidth={3} name="Soil Health Score" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="moisture" stroke="#0284c7" strokeWidth={2} name="Moisture (%)" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
