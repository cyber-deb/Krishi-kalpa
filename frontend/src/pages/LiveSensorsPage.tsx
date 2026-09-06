import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import {
  Activity,
  Cpu,
  Wifi,
  BatteryCharging,
  Clock,
  Droplets,
  Thermometer,
  FlaskConical,
  Wind,
  CloudRain,
  Sparkles
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const LiveSensorsPage: React.FC = () => {
  const { t, tText } = useTranslation();
  const { farmState, toggleFarmMode } = useFarmState();
  const [selectedParam, setSelectedParam] = useState<'soil_moisture' | 'nitrogen' | 'air_temperature'>('soil_moisture');

  const isDemo = farmState.mode === 'demo';

  // Sensor array matching Single Source of Truth
  const sensors = [
    { key: 'soil_moisture', name: 'Soil Moisture', value: farmState.soil_moisture, unit: '%', icon: Droplets, color: 'text-blue-600', range: '50% - 75%' },
    { key: 'soil_temperature', name: 'Soil Temperature', value: farmState.soil_temperature, unit: '°C', icon: Thermometer, color: 'text-amber-600', range: '22°C - 30°C' },
    { key: 'ph', name: 'Soil pH', value: farmState.ph, unit: 'pH', icon: FlaskConical, color: 'text-emerald-600', range: '6.0 - 7.5' },
    { key: 'ec', name: 'Electrical Conductivity', value: farmState.ec, unit: 'dS/m', icon: Activity, color: 'text-purple-600', range: '0.2 - 1.0' },
    { key: 'nitrogen', name: 'Available Nitrogen (N)', value: farmState.nitrogen, unit: 'mg/kg', icon: FlaskConical, color: 'text-green-700', range: '50 - 85 mg/kg' },
    { key: 'phosphorus', name: 'Available Phosphorus (P)', value: farmState.phosphorus, unit: 'mg/kg', icon: FlaskConical, color: 'text-teal-600', range: '55 - 90 mg/kg' },
    { key: 'potassium', name: 'Available Potassium (K)', value: farmState.potassium, unit: 'mg/kg', icon: FlaskConical, color: 'text-indigo-600', range: '50 - 85 mg/kg' },
    { key: 'air_temperature', name: 'Air Temperature', value: farmState.air_temperature, unit: '°C', icon: Thermometer, color: 'text-amber-500', range: '20°C - 34°C' },
    { key: 'humidity', name: 'Relative Humidity', value: farmState.humidity, unit: '%', icon: Wind, color: 'text-cyan-600', range: '50% - 80%' },
    { key: 'expected_rainfall', name: 'Rainfall / Forecast', value: farmState.expected_rainfall, unit: 'mm', icon: CloudRain, color: 'text-blue-500', range: `${farmState.rain_probability}% chance` },
  ];

  // 12-hour timeline history
  const historyData = [
    { time: '-12h', soil_moisture: Math.max(10, farmState.soil_moisture + 3), nitrogen: farmState.nitrogen + 2, air_temperature: farmState.air_temperature - 3 },
    { time: '-9h', soil_moisture: Math.max(10, farmState.soil_moisture + 2), nitrogen: farmState.nitrogen + 1, air_temperature: farmState.air_temperature - 2 },
    { time: '-6h', soil_moisture: Math.max(10, farmState.soil_moisture + 1), nitrogen: farmState.nitrogen, air_temperature: farmState.air_temperature + 1 },
    { time: '-3h', soil_moisture: farmState.soil_moisture, nitrogen: farmState.nitrogen - 1, air_temperature: farmState.air_temperature + 2 },
    { time: 'Now', soil_moisture: farmState.soil_moisture, nitrogen: farmState.nitrogen, air_temperature: farmState.air_temperature },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 font-serif tracking-tight">
            {t('nav.live_sensors')} {tText("Telemetry")}
          </h2>
          <p className="text-sm text-stone-500 mt-0.5">
            {tText("Root zone IoT sensor cluster & microclimate weather telemetry")}
          </p>
        </div>

        <button
          onClick={() => toggleFarmMode(isDemo ? 'live' : 'demo')}
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold border transition ${
            isDemo
              ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
              : 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
          }`}
        >
          {isDemo ? <Sparkles className="w-4 h-4 text-amber-600" /> : <Wifi className="w-4 h-4 text-emerald-600 animate-pulse" />}
          <span>{isDemo ? t('common.demo_mode') : t('common.live_mode')}</span>
        </button>
      </div>

      {/* Hardware Diagnostics Status Bar */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-stone-100 text-stone-700">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">{tText("Device ID")}</div>
            <div className="font-extrabold text-stone-900">{farmState.device_id}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <div className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">{tText("Signal Strength")}</div>
            <div className="font-extrabold text-stone-900">{farmState.signal_strength} dBm ({tText("Good")})</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
            <BatteryCharging className="w-5 h-5" />
          </div>
          <div>
            <div className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">{tText("Battery Level")}</div>
            <div className="font-extrabold text-stone-900">{farmState.battery}% ({tText("Solar Charged")})</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">{tText("Last Sync")}</div>
            <div className="font-extrabold text-stone-900">{tText("Just Now (Real-time)")}</div>
          </div>
        </div>
      </div>

      {/* Sensor Grid (All 10 Parameters) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {sensors.map((s) => (
          <div
            key={s.key}
            onClick={() => setSelectedParam(s.key as any)}
            className={`bg-white rounded-2xl p-4 border shadow-sm cursor-pointer transition farm-transition ${
              selectedParam === s.key ? 'border-agri-600 ring-2 ring-agri-100' : 'border-stone-200 hover:border-agri-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider truncate">
                {tText(s.name)}
              </span>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>

            <div className="flex items-baseline space-x-1 mb-1">
              <span className="text-2xl font-extrabold text-stone-900 font-serif">
                {s.value}
              </span>
              <span className="text-xs font-semibold text-stone-500">{s.unit}</span>
            </div>

            <div className="text-[11px] text-stone-400 pt-1 border-t border-stone-100">
              {tText("Optimal:")} {s.range}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Telemetry Chart */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              {tText("Telemetry Trend (Last 12 Hours)")}
            </h3>
            <p className="text-xs text-stone-500">
              {tText("Observing microclimate and root zone dynamics over time")}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedParam('soil_moisture')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedParam === 'soil_moisture'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tText("Soil Moisture")}
            </button>
            <button
              onClick={() => setSelectedParam('nitrogen')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedParam === 'nitrogen'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tText("Available Nitrogen (N)")}
            </button>
            <button
              onClick={() => setSelectedParam('air_temperature')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedParam === 'air_temperature'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tText("Air Temperature")}
            </button>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fill: '#78716c', fontSize: 12 }} />
              <YAxis tick={{ fill: '#78716c', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1c1917', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
              />
              <Line
                type="monotone"
                dataKey={selectedParam}
                stroke={selectedParam === 'soil_moisture' ? '#2563eb' : selectedParam === 'nitrogen' ? '#059669' : '#d97706'}
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
