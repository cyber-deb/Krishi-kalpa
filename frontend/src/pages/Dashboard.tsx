import React from 'react';
import { StatCard } from '../components/StatCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { SoilHealthCard } from '../components/SoilHealthCard';
import { WeatherCard } from '../components/WeatherCard';
import { DemoControls } from '../components/DemoControls';
import { Sprout, Droplets, Activity, DollarSign, ShieldAlert, TrendingUp } from 'lucide-react';
import { useDemoMode } from '../hooks/useDemoMode';
import { useSoilHealth } from '../hooks/useSoilHealth';
import { DEMO_WEATHER } from '../data/demoWeather';
import { SCIENTIFIC_DISCLAIMER } from '../utils/constants';

export const Dashboard: React.FC = () => {
  const {
    isDemoMode,
    simState,
    rainProb,
    updateSimParam,
    setRainProb,
    setSimState,
    getDynamicAction
  } = useDemoMode();

  const { soilHealth } = useSoilHealth(simState.soil_moisture);
  const primaryAction = getDynamicAction();

  return (
    <div className="space-y-6">
      {/* Simulation Sandbox Bar */}
      <DemoControls
        simState={simState}
        rainProb={rainProb}
        onUpdateParam={updateSimParam}
        onUpdateRainProb={setRainProb}
        onReset={() => {
          setSimState({
            device_id: "ESP32-FARM-001",
            soil_moisture: 62.0,
            soil_temperature: 27.4,
            ph: 6.4,
            ec: 0.82,
            nitrogen: 58.0,
            phosphorus: 72.0,
            potassium: 64.0,
            air_temperature: 29.1,
            humidity: 71.0,
            rainfall: 4.2
          });
          setRainProb(20);
        }}
      />

      {/* 6 Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Soil Health"
          value={`${soilHealth.health_score}/100`}
          subtitle="Alluvial Loam"
          icon={Sprout}
          color="emerald"
          trend={`${soilHealth.degradation_risk} RISK`}
        />
        <StatCard
          title="Water Status"
          value={`${simState.soil_moisture}%`}
          subtitle="Root Zone VWC"
          icon={Droplets}
          color={simState.soil_moisture < 35 ? "rose" : "blue"}
          trend={simState.soil_moisture < 35 ? "DEFICIT" : "ADEQUATE"}
        />
        <StatCard
          title="Crop Health"
          value="81%"
          subtitle="Paddy Tillering"
          icon={Activity}
          color="emerald"
          trend="GOOD VIGOR"
        />
        <StatCard
          title="Estimated Profit"
          value="₹42,800"
          subtitle="Net Realization"
          icon={DollarSign}
          color="purple"
          trend="+₹6,400 GAIN"
        />
        <StatCard
          title="Environmental Risk"
          value="LOW"
          subtitle="Eco-Score Index"
          icon={ShieldAlert}
          color="emerald"
          trend="SUSTAINABLE"
        />
        <StatCard
          title="Market Opportunity"
          value="+₹3,400"
          subtitle="Taraori Mandi"
          icon={TrendingUp}
          color="emerald"
          trend="BEST ARBITRAGE"
        />
      </div>

      {/* Primary Action Hero Component: "What Should I Do Today?" */}
      <RecommendationCard action={primaryAction} />

      {/* Middle Grid: Soil Breakdown & Micro-climate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SoilHealthCard soil={{ ...soilHealth, soil_moisture: simState.soil_moisture, phosphorus: simState.phosphorus, ph: simState.ph }} />
        </div>
        <div>
          <WeatherCard weather={{ ...DEMO_WEATHER, rain_probability: rainProb }} />
        </div>
      </div>

      {/* Scientific Disclaimer Footer */}
      <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 text-center text-[11px] text-slate-500">
        {SCIENTIFIC_DISCLAIMER}
      </div>
    </div>
  );
};
