import React from 'react';
import { StatCard } from '../components/StatCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { SoilHealthCard } from '../components/SoilHealthCard';
import { WeatherCard } from '../components/WeatherCard';
import { DemoControls } from '../components/DemoControls';
import { Sprout, Droplets, Activity, DollarSign, ShieldAlert, TrendingUp } from 'lucide-react';
import { useDemoMode } from '../context/DemoContext';
import { DEMO_WEATHER } from '../data/demoWeather';
import { SCIENTIFIC_DISCLAIMER } from '../utils/constants';

export const Dashboard: React.FC = () => {
  const {
    simState,
    rainProb,
    activeScenario,
    setScenario,
    updateSimParam,
    setRainProb,
    resetToDefaults,
    getDynamicAction,
    dynamicSoilHealth
  } = useDemoMode();

  const primaryAction = getDynamicAction();
  const isMoistureDeficit = simState.soil_moisture < 35;

  return (
    <div className="space-y-6">
      {/* Simulation Sandbox Bar */}
      <DemoControls
        simState={simState}
        rainProb={rainProb}
        activeScenario={activeScenario}
        onSelectScenario={setScenario}
        onUpdateParam={updateSimParam}
        onUpdateRainProb={setRainProb}
        onReset={resetToDefaults}
      />

      {/* 6 Top Metric Cards — Reacting live to simState */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Soil Health"
          value={`${dynamicSoilHealth.health_score}/100`}
          subtitle="Alluvial Loam"
          icon={Sprout}
          color={dynamicSoilHealth.health_score > 70 ? "emerald" : dynamicSoilHealth.health_score > 50 ? "amber" : "rose"}
          trend={`${dynamicSoilHealth.degradation_risk} RISK`}
        />
        <StatCard
          title="Water Status"
          value={`${simState.soil_moisture}%`}
          subtitle="Root Zone VWC"
          icon={Droplets}
          color={isMoistureDeficit ? "rose" : "blue"}
          trend={isMoistureDeficit ? "CRITICAL DEFICIT" : "ADEQUATE"}
        />
        <StatCard
          title="Crop Health"
          value={isMoistureDeficit ? "64%" : "84%"}
          subtitle="Paddy Tillering"
          icon={Activity}
          color={isMoistureDeficit ? "amber" : "emerald"}
          trend={isMoistureDeficit ? "WATER STRESS" : "GOOD VIGOR"}
        />
        <StatCard
          title="Estimated Profit"
          value={isMoistureDeficit && rainProb < 50 ? "₹34,200" : "₹42,800"}
          subtitle="Net Realization"
          icon={DollarSign}
          color="purple"
          trend={isMoistureDeficit && rainProb < 50 ? "-₹8,600 RISK" : "+₹6,400 GAIN"}
        />
        <StatCard
          title="Environmental Risk"
          value={simState.phosphorus > 75 ? "ELEVATED" : "LOW"}
          subtitle="Eco-Score Index"
          icon={ShieldAlert}
          color={simState.phosphorus > 75 ? "amber" : "emerald"}
          trend={simState.phosphorus > 75 ? "NUTRIENT LEACH" : "SUSTAINABLE"}
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
          <SoilHealthCard soil={dynamicSoilHealth} />
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
