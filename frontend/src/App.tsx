import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Dashboard } from './pages/Dashboard';
import { SoilHealth } from './pages/SoilHealth';
import { Sensors } from './pages/Sensors';
import { Irrigation } from './pages/Irrigation';
import { CropIntelligence } from './pages/CropIntelligence';
import { AIAdvisor } from './pages/AIAdvisor';
import { FarmEconomics } from './pages/FarmEconomics';
import { MarketIntelligence } from './pages/MarketIntelligence';
import { FarmMapPage } from './pages/FarmMapPage';
import { EnvironmentalImpact } from './pages/EnvironmentalImpact';
import { Alerts } from './pages/Alerts';
import { Settings } from './pages/Settings';
import { useDemoMode } from './hooks/useDemoMode';

export const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const {
    isDemoMode,
    setIsDemoMode,
    run2MinuteDemo,
    isDemoRunning,
    demoStep
  } = useDemoMode();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex">
        {/* Sidebar Navigation */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
          <Topbar
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isDemoMode={isDemoMode}
            onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
            onStart2MinDemo={run2MinuteDemo}
            isDemoRunning={isDemoRunning}
          />

          {/* Guided Demo Notification Banner */}
          {isDemoRunning && (
            <div className="bg-amber-500 text-white text-xs font-bold px-4 py-2 flex items-center justify-between shadow-sm animate-pulse">
              <span>
                2-MINUTE GUIDED TOUR ACTIVE: Step {demoStep}/5 — {
                  demoStep === 1 ? 'Inspecting Initial Baseline Farm Conditions' :
                  demoStep === 2 ? 'Simulating Soil Moisture Drought Stress (24%)' :
                  demoStep === 3 ? 'Incoming Rain Forecast Detected (85% Probability)' :
                  demoStep === 4 ? 'Balancing Soil Nutrients & Preventing Salinity' :
                  'Demo Complete — Review Farm Economics'
                }
              </span>
            </div>
          )}

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/soil" element={<SoilHealth />} />
              <Route path="/sensors" element={<Sensors />} />
              <Route path="/irrigation" element={<Irrigation />} />
              <Route path="/crop" element={<CropIntelligence />} />
              <Route path="/ai-advisor" element={<AIAdvisor />} />
              <Route path="/economics" element={<FarmEconomics />} />
              <Route path="/market" element={<MarketIntelligence />} />
              <Route path="/map" element={<FarmMapPage />} />
              <Route path="/environmental" element={<EnvironmentalImpact />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};
