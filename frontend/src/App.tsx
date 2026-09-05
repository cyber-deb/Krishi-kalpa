import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { I18nProvider } from './i18n';
import { FarmStateProvider } from './state/FarmStateContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

// Pages
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { SoilHealthPage } from './pages/SoilHealthPage';
import { LiveSensorsPage } from './pages/LiveSensorsPage';
import { SmartIrrigationPage } from './pages/SmartIrrigationPage';
import { CropIntelligencePage } from './pages/CropIntelligencePage';
import { AIAdvisorPage } from './pages/AIAdvisorPage';
import { FarmEconomicsPage } from './pages/FarmEconomicsPage';
import { MarketIntelligencePage } from './pages/MarketIntelligencePage';
import { FarmMapPage } from './pages/FarmMapPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { AlertsPage } from './pages/AlertsPage';
import { SettingsPage } from './pages/SettingsPage';

// Mobile Bottom Navigation Bar Icons
import {
  LayoutDashboard,
  Layers,
  Droplets,
  Bot,
  IndianRupee
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      <Navbar onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Slide-over Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative z-50 w-72 max-w-full bg-white h-full shadow-2xl">
              <Sidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-20 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar for Indian Farmers */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <NavLink
          to="/app"
          end
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
              isActive ? 'text-agri-700 font-extrabold' : 'text-stone-500'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/app/soil-health"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
              isActive ? 'text-agri-700 font-extrabold' : 'text-stone-500'
            }`
          }
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span>Soil</span>
        </NavLink>

        <NavLink
          to="/app/irrigation"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
              isActive ? 'text-agri-700 font-extrabold' : 'text-stone-500'
            }`
          }
        >
          <Droplets className="w-5 h-5 mb-0.5" />
          <span>Water</span>
        </NavLink>

        <NavLink
          to="/app/advisor"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
              isActive ? 'text-agri-700 font-extrabold' : 'text-stone-500'
            }`
          }
        >
          <Bot className="w-5 h-5 mb-0.5 text-agri-600" />
          <span>AI Advisor</span>
        </NavLink>

        <NavLink
          to="/app/economics"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
              isActive ? 'text-agri-700 font-extrabold' : 'text-stone-500'
            }`
          }
        >
          <IndianRupee className="w-5 h-5 mb-0.5" />
          <span>Profit</span>
        </NavLink>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <I18nProvider>
      <FarmStateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Application Dashboard Routes */}
            <Route
              path="/app"
              element={
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              }
            />
            <Route
              path="/app/soil-health"
              element={
                <AppLayout>
                  <SoilHealthPage />
                </AppLayout>
              }
            />
            <Route
              path="/app/sensors"
              element={
                <AppLayout>
                  <LiveSensorsPage />
                </AppLayout>
              }
            />
            <Route
              path="/app/irrigation"
              element={
                <AppLayout>
                  <SmartIrrigationPage />
                </AppLayout>
              }
            />
            <Route
              path="/app/crop"
              element={
                <AppLayout>
                  <CropIntelligencePage />
                </AppLayout>
              }
            />
            <Route
              path="/app/advisor"
              element={
                <AppLayout>
                  <AIAdvisorPage />
                </AppLayout>
              }
            />
            <Route
              path="/app/economics"
              element={
                <AppLayout>
                  <FarmEconomicsPage />
                </AppLayout>
              }
            />
            <Route
              path="/app/market"
              element={
                <AppLayout>
                  <MarketIntelligencePage />
                </AppLayout>
              }
            />
            <Route
              path="/app/map"
              element={
                <AppLayout>
                  <FarmMapPage />
                </AppLayout>
              }
            />
            <Route
              path="/app/sustainability"
              element={
                <AppLayout>
                  <SustainabilityPage />
                </AppLayout>
              }
            />
            <Route
              path="/app/alerts"
              element={
                <AppLayout>
                  <AlertsPage />
                </AppLayout>
              }
            />
            <Route
              path="/app/settings"
              element={
                <AppLayout>
                  <SettingsPage />
                </AppLayout>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </FarmStateProvider>
    </I18nProvider>
  );
};
