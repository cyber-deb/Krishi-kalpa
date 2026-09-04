import React from 'react';
import { SensorReading } from '../types/sensor';
import { Sliders, RefreshCw, Sparkles } from 'lucide-react';

interface DemoControlsProps {
  simState: SensorReading;
  rainProb: number;
  onUpdateParam: (param: keyof SensorReading, val: number) => void;
  onUpdateRainProb: (val: number) => void;
  onReset: () => void;
}

export const DemoControls: React.FC<DemoControlsProps> = ({
  simState,
  rainProb,
  onUpdateParam,
  onUpdateRainProb,
  onReset
}) => {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-700 shadow-xl mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm text-white">Live What-If Simulation Sandbox</h3>
          <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
            Interactive Judge Testing
          </span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        {/* Soil Moisture Slider */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-300 font-medium">Soil Moisture</span>
            <span className="font-bold text-amber-400">{simState.soil_moisture}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="95"
            value={simState.soil_moisture}
            onChange={(e) => onUpdateParam('soil_moisture', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>

        {/* Rain Probability Slider */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-300 font-medium">Rain Probability</span>
            <span className="font-bold text-blue-400">{rainProb}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={rainProb}
            onChange={(e) => onUpdateRainProb(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-400"
          />
        </div>

        {/* Phosphorus Slider */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-300 font-medium">Phosphorus (P)</span>
            <span className="font-bold text-emerald-400">{simState.phosphorus} kg/ha</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={simState.phosphorus}
            onChange={(e) => onUpdateParam('phosphorus', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
        </div>

        {/* Soil pH Slider */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-300 font-medium">Soil pH</span>
            <span className="font-bold text-purple-400">{simState.ph}</span>
          </div>
          <input
            type="range"
            min="4.5"
            max="9.0"
            step="0.1"
            value={simState.ph}
            onChange={(e) => onUpdateParam('ph', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
          />
        </div>
      </div>
    </div>
  );
};
