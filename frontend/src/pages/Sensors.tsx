import React from 'react';
import { useSensors } from '../hooks/useSensors';
import { SensorCard } from '../components/SensorCard';
import { Droplets, Thermometer, Activity, Gauge, Zap, Wind } from 'lucide-react';

export const Sensors: React.FC = () => {
  const { sensors } = useSensors(true);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">In-Field IoT Telemetry Node</h2>
          <p className="text-xs text-slate-500">Device ID: {sensors.device_id} | Battery: 94.5% (Solar Harvesting)</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-emerald-800">15-Min Telemetry Cycle Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <SensorCard
          label="Soil Moisture (VWC)"
          value={sensors.soil_moisture}
          unit="%"
          idealRange="50% - 75%"
          status={sensors.soil_moisture >= 45 ? "Optimal" : "Alert"}
          icon={Droplets}
        />
        <SensorCard
          label="Soil Temperature"
          value={sensors.soil_temperature}
          unit="°C"
          idealRange="22°C - 30°C"
          status="Optimal"
          icon={Thermometer}
        />
        <SensorCard
          label="Soil pH"
          value={sensors.ph}
          unit="pH"
          idealRange="6.2 - 7.2"
          status="Optimal"
          icon={Activity}
        />
        <SensorCard
          label="Electrical Conductivity (EC)"
          value={sensors.ec}
          unit="dS/m"
          idealRange="< 1.0 dS/m"
          status="Optimal"
          icon={Gauge}
        />
        <SensorCard
          label="Available Nitrogen (N)"
          value={sensors.nitrogen}
          unit="kg/ha"
          idealRange="50 - 70"
          status="Optimal"
          icon={Zap}
        />
        <SensorCard
          label="Available Phosphorus (P)"
          value={sensors.phosphorus}
          unit="kg/ha"
          idealRange="40 - 60"
          status="Warning"
          icon={Zap}
        />
      </div>
    </div>
  );
};
