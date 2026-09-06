import React, { useState } from 'react';
import { useTranslation, LANGUAGES } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import {
  Globe,
  MapPin,
  Cpu,
  Sparkles,
  Wifi,
  Save,
  CheckCircle2
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { t, tText, language, setLanguage } = useTranslation();
  const { farmState, toggleFarmMode, updateCustomSensor } = useFarmState();

  const [farmName, setFarmName] = useState(farmState.config.farm_name);
  const [area, setArea] = useState(farmState.config.area_acres);
  const [crop, setCrop] = useState(farmState.config.crop_type);
  const [soilType, setSoilType] = useState(farmState.config.soil_type);
  const [savedToast, setSavedToast] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomSensor('config', {
      ...farmState.config,
      farm_name: farmName,
      area_acres: Number(area),
      crop_type: crop,
      soil_type: soilType
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const isDemo = farmState.mode === 'demo';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-stone-900 font-serif tracking-tight">
          {t('settings.title')}
        </h2>
        <p className="text-sm text-stone-500 mt-0.5">
          {tText("Farm configuration, language preference, and IoT device parameters")}
        </p>
      </div>

      {savedToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{tText("Farm profile settings updated successfully!")}</span>
        </div>
      )}

      {/* 1. Language Preference (All 13 Languages in Native Script) */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <h3 className="text-base font-bold text-stone-900 mb-3 flex items-center space-x-2">
          <Globe className="w-5 h-5 text-agri-600" />
          <span>{t('settings.language')}</span>
        </h3>
        <p className="text-xs text-stone-500 mb-4">
          {tText("Select your preferred native Indian language for the entire platform interface.")}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`p-3 rounded-xl border text-center transition ${
                lang.code === language
                  ? 'bg-agri-600 text-white border-agri-600 font-bold shadow-sm'
                  : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100 font-medium'
              }`}
            >
              <div className="text-sm font-serif">{lang.nativeName}</div>
              <div className={`text-[10px] mt-0.5 ${lang.code === language ? 'text-agri-200' : 'text-stone-400'}`}>
                {lang.englishName}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Farm & Soil Profile Form */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-agri-600" />
          <span>{t('settings.farm_info')}</span>
        </h3>

        <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-stone-500 font-bold uppercase tracking-wider mb-1 text-[10px]">
              {tText("Farm Name")}
            </label>
            <input
              type="text"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-agri-500"
            />
          </div>

          <div>
            <label className="block text-stone-500 font-bold uppercase tracking-wider mb-1 text-[10px]">
              {tText("Total Area")} ({t('common.acres')})
            </label>
            <input
              type="number"
              step="0.1"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-agri-500"
            />
          </div>

          <div>
            <label className="block text-stone-500 font-bold uppercase tracking-wider mb-1 text-[10px]">
              {tText("Primary Crop Type")}
            </label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-agri-500"
            >
              <option value="Rice (Paddy)">{tText("Rice (Paddy)")}</option>
              <option value="Wheat">{tText("Wheat")}</option>
              <option value="Cotton">{tText("Cotton")}</option>
              <option value="Soybean">{tText("Soybean")}</option>
              <option value="Maize">{tText("Maize")}</option>
              <option value="Sugarcane">{tText("Sugarcane")}</option>
              <option value="Tomato">{tText("Tomato")}</option>
            </select>
          </div>

          <div>
            <label className="block text-stone-500 font-bold uppercase tracking-wider mb-1 text-[10px]">
              {tText("Soil Type Classification")}
            </label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-agri-500"
            >
              <option value="Clay Loam">{tText("Clay Loam")}</option>
              <option value="Black Cotton Soil">{tText("Black Cotton Soil")}</option>
              <option value="Sandy Loam">{tText("Sandy Loam")}</option>
              <option value="Red Loam">{tText("Red Loam")}</option>
              <option value="Alluvial Soil">{tText("Alluvial Soil")}</option>
            </select>
          </div>

          <div className="sm:col-span-2 pt-2">
            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-agri-600 hover:bg-agri-700 text-white text-xs sm:text-sm font-bold shadow-md transition"
            >
              <Save className="w-4 h-4" />
              <span>{tText("Save Profile Changes")}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. System Mode & IoT Telemetry Config */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-agri-600" />
          <span>{t('settings.iot_config')}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
            <span className="font-bold text-stone-900 block mb-1">{tText("Active Operation Mode")}</span>
            <p className="text-stone-600 mb-3">
              {tText("Switch between the Agronomic Simulation Engine and live ESP32 wireless hardware telemetry stream.")}
            </p>
            <button
              onClick={() => toggleFarmMode(isDemo ? 'live' : 'demo')}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold border transition ${
                isDemo ? 'bg-amber-50 text-amber-900 border-amber-300' : 'bg-emerald-50 text-emerald-900 border-emerald-300'
              }`}
            >
              {isDemo ? <Sparkles className="w-4 h-4 text-amber-600" /> : <Wifi className="w-4 h-4 text-emerald-600" />}
              <span>{tText("Mode:")} {isDemo ? t('common.demo_mode') : t('common.live_mode')}</span>
            </button>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
            <span className="font-bold text-stone-900 block mb-1">{tText("ESP32 REST Telemetry Endpoint")}</span>
            <div className="font-mono bg-white p-2.5 rounded-lg border border-stone-200 text-[11px] text-stone-800 my-1 select-all">
              POST /api/sensors/data
            </div>
            <p className="text-[11px] text-stone-500">
              {tText("Hardware code is available in")} <code className="font-bold">hardware/esp32/esp32_sensor_code.ino</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
