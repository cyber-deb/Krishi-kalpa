import React from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import {
  Sprout,
  TrendingDown,
  Thermometer,
  Wind,
  Droplets
} from 'lucide-react';

export const CropIntelligencePage: React.FC = () => {
  const { t, tText } = useTranslation();
  const { cropAnalysis, farmState } = useFarmState();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-stone-900 font-serif tracking-tight">
          {t('crop.title')}
        </h2>
        <p className="text-sm text-stone-500 mt-0.5">
          {t('crop.subtitle')} • {farmState.config.crop_type} ({farmState.config.crop_variety})
        </p>
      </div>

      {/* Main Crop Vigor Banner */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center justify-center text-center p-4 bg-stone-50 rounded-xl border border-stone-100">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
            {t('crop.health_score')}
          </span>
          <div className="text-5xl font-extrabold text-stone-900 font-serif mb-1">
            {cropAnalysis.crop_health_score}%
          </div>
          <span
            className={`text-xs font-bold px-3 py-0.5 rounded-full ${
              cropAnalysis.crop_health_score > 75
                ? 'bg-emerald-100 text-emerald-800'
                : cropAnalysis.crop_health_score > 55
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {cropAnalysis.crop_health_score > 75 ? tText('Optimal Vigor') : cropAnalysis.crop_health_score > 55 ? tText('Moderate Stress') : tText('Critical Stress')}
          </span>
        </div>

        {/* Growth Stage & Days to Harvest */}
        <div className="md:col-span-2 flex flex-col justify-between p-2">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                {t('crop.growth_stage')}
              </span>
              <span className="text-xs font-bold text-agri-700 bg-agri-50 px-2.5 py-0.5 rounded-md">
                {tText("Active Tillering Phase")}
              </span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-serif mb-2">
              {tText(cropAnalysis.growth_stage + ' Stage')} ({farmState.config.crop_type})
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {tText(cropAnalysis.stage_specific_advice)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-stone-100 text-xs">
            <div>
              <span className="text-stone-400 font-medium block">Sowing Date:</span>
              <span className="font-bold text-stone-800">{farmState.config.sowing_date}</span>
            </div>
            <div>
              <span className="text-stone-400 font-medium block">{t('crop.days_to_harvest')}:</span>
              <span className="font-bold text-stone-800">~{cropAnalysis.estimated_days_to_harvest} Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stress Diagnostics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Moisture Stress */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Moisture Stress</span>
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-base font-bold text-stone-900 mb-1">
            {tText(cropAnalysis.moisture_stress)}
          </div>
          <div className="text-[11px] text-stone-500">
            Soil moisture: {farmState.soil_moisture}%
          </div>
        </div>

        {/* Nutrient Stress */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Nutrient Stress</span>
            <Sprout className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-base font-bold text-stone-900 mb-1 truncate">
            {tText(cropAnalysis.nutrient_stress)}
          </div>
          <div className="text-[11px] text-stone-500">
            N: {farmState.nitrogen} • P: {farmState.phosphorus} • K: {farmState.potassium}
          </div>
        </div>

        {/* Heat Stress */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Heatwave Stress</span>
            <Thermometer className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-base font-bold text-stone-900 mb-1">
            {tText(cropAnalysis.heat_stress)}
          </div>
          <div className="text-[11px] text-stone-500">
            Air temp: {farmState.air_temperature}°C
          </div>
        </div>

        {/* Disease / Humidity Risk */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Fungal Disease Risk</span>
            <Wind className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-base font-bold text-stone-900 mb-1 truncate">
            {tText(cropAnalysis.disease_humidity_risk)}
          </div>
          <div className="text-[11px] text-stone-500">
            Humidity: {farmState.humidity}%
          </div>
        </div>
      </div>

      {/* Yield Projection Card */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center space-x-2">
          <TrendingDown className="w-5 h-5 text-agri-600" />
          <span>Yield Projection & Loss Mitigation</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
            <span className="text-xs font-medium text-stone-500 block">Baseline Genetic Potential</span>
            <span className="text-2xl font-extrabold text-stone-900 font-serif">24.5 {tText("Q / Acre")}</span>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
            <span className="text-xs font-medium text-stone-500 block">Expected Model Harvest</span>
            <span className="text-2xl font-extrabold text-agri-700 font-serif">
              {cropAnalysis.expected_yield_quintals_per_acre} {tText("Q / Acre")}
            </span>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
            <span className="text-xs font-medium text-stone-500 block">Yield Penalty Risk</span>
            <span className={`text-2xl font-extrabold font-serif ${cropAnalysis.potential_yield_loss_percent > 10 ? 'text-red-600' : 'text-emerald-600'}`}>
              {cropAnalysis.potential_yield_loss_percent}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
