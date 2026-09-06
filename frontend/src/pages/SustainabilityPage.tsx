import React from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import {
  Droplets,
  FlaskConical,
  Wind,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  TreePine,
  Info
} from 'lucide-react';

export const SustainabilityPage: React.FC = () => {
  const { t, tText } = useTranslation();
  const { sustainability, farmState } = useFarmState();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-stone-900 font-serif tracking-tight">
          {t('sustainability.title')}
        </h2>
        <p className="text-sm text-stone-500 mt-0.5">
          {t('sustainability.subtitle')} • Carbon & Natural Resource Ledger
        </p>
      </div>

      {/* Top Sustainability Grade Card */}
      <div className="bg-gradient-to-r from-agri-950 via-agri-900 to-stone-900 text-white rounded-2xl p-6 shadow-md border border-agri-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Ecological Health Assessment</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Sustainability Rating: {sustainability.sustainability_rating}
          </h3>
          <p className="text-sm text-stone-300 mt-2 max-w-xl leading-relaxed">
            Krishi-Kalpa precision nutrient and irrigation intelligence has prevented excessive chemical runoff and preserved local aquifer levels across {farmState.config.area_acres} acres.
          </p>
        </div>

        <div className="flex items-center space-x-4 bg-stone-800/80 p-4 rounded-xl border border-stone-700 self-start md:self-auto">
          <div>
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              Groundwater Score
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 font-serif">
              {sustainability.groundwater_conservation_score} <span className="text-xs text-stone-400">/ 100</span>
            </div>
            <div className="text-[11px] text-stone-400">
              Aquifer Conservation: <span className="font-bold text-white">High</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Ecological Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* 1. Groundwater Saved */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              {t('sustainability.water_conserved')}
            </span>
            <Droplets className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-blue-700 font-serif mb-1">
            {sustainability.water_saved_liters.toLocaleString()} L
          </div>
          <p className="text-xs text-stone-500">
            Rainfall interlock & drip precision water saving
          </p>
        </div>

        {/* 2. Chemical Fertilizer Avoided */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              {t('sustainability.fertilizer_reduced')}
            </span>
            <FlaskConical className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 font-serif mb-1">
            {sustainability.chemical_fertilizer_reduction_kg} kg
          </div>
          <p className="text-xs text-stone-500">
            Targeted soil-test guidance stops excess urea dumping
          </p>
        </div>

        {/* 3. CO2 Reduction */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              {t('sustainability.co2_reduced')}
            </span>
            <Wind className="w-5 h-5 text-teal-600" />
          </div>
          <div className="text-3xl font-extrabold text-teal-700 font-serif mb-1">
            {sustainability.estimated_co2_reduction_kg} kg
          </div>
          <p className="text-xs text-stone-500">
            Reduced synthetic N manufacturing & pumping diesel emissions
          </p>
        </div>

        {/* 4. Soil Organic Carbon */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              {t('sustainability.organic_carbon')}
            </span>
            <TreePine className="w-5 h-5 text-green-700" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900 font-serif mb-1">
            {sustainability.soil_organic_carbon_index}%
          </div>
          <p className="text-xs text-stone-500">
            Target: &gt;1.5% for microbial soil sponge structure
          </p>
        </div>
      </div>

      {/* Active Eco-Friendly Agricultural Practices */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-agri-600" />
          <span>Active Sustainable Agricultural Protocols</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sustainability.eco_friendly_practices_active.map((practice, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 p-3.5 rounded-xl bg-agri-50/60 border border-agri-100 text-xs font-semibold text-agri-950"
            >
              <CheckCircle2 className="w-4 h-4 text-agri-600 flex-shrink-0" />
              <span>{tText(practice)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Carbon Offset & ESG Credit Potential Note */}
      <div className="bg-stone-100 p-4 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-start space-x-3">
        <Info className="w-5 h-5 text-stone-500 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-stone-900 block mb-0.5">Voluntary Carbon Credit Tracking</span>
          <span>
            Verified reduction in synthetic chemical inputs and precision water conservation creates measurable carbon offsets eligible for sustainable agriculture incentives and premium organic certifications.
          </span>
        </div>
      </div>
    </div>
  );
};
