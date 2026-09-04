import React from 'react';
import { WeatherInfo } from '../data/demoWeather';
import { CloudRain, Sun, Wind, Droplets } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherInfo;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-xs text-blue-200 font-semibold uppercase tracking-wider">Field Micro-Climate</span>
          <h3 className="text-xl font-bold">{weather.condition}</h3>
        </div>
        <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md">
          <CloudRain className="w-6 h-6 text-blue-300" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-black">{weather.temperature}°C</span>
        <span className="text-xs text-blue-200">Rain Prob: <strong className="text-white">{weather.rain_probability}%</strong></span>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs">
        <div className="flex items-center gap-1.5 text-blue-100">
          <Droplets className="w-3.5 h-3.5 text-blue-300" />
          <span>Humidity: {weather.humidity}%</span>
        </div>
        <div className="flex items-center gap-1.5 text-blue-100">
          <Wind className="w-3.5 h-3.5 text-blue-300" />
          <span>Precip: {weather.rainfall} mm</span>
        </div>
      </div>
    </div>
  );
};
