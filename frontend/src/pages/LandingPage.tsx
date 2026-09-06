import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { LanguageSelector } from '../components/LanguageSelector';
import {
  Sprout,
  Droplets,
  Layers,
  IndianRupee,
  TrendingUp,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col selection:bg-agri-200">
      {/* Top Header */}
      <header className="bg-white border-b border-stone-200 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-agri-600 flex items-center justify-center text-white shadow-md">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-agri-950 font-serif">
                Krishi-Kalpa
              </span>
              <p className="text-xs text-stone-500 hidden sm:block">
                " Cultivating Intelligence, Growing Prosperity "
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <Link
              to="/app"
              className="px-4 py-2 rounded-xl bg-agri-600 hover:bg-agri-700 text-white text-sm font-bold shadow-md transition"
            >
              Enter Farm
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-agri-100 text-agri-800 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 text-agri-600" />
            <span>Connected Agricultural Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tight font-serif max-w-4xl mx-auto leading-tight sm:leading-tight">
            Smart decisions for <span className="text-agri-600">healthier soil</span> and{' '}
            <span className="text-agri-700">more profitable farming.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Krishi-Kalpa connects IoT root-zone telemetry, soil health analytics, smart irrigation,
            and APMC market intelligence to empower Indian farmers with daily actionable decisions.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/app"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl bg-agri-600 hover:bg-agri-700 text-white text-base font-bold shadow-xl transition transform hover:-translate-y-0.5"
            >
              <span>Enter Farm</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/app"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl bg-white hover:bg-stone-100 text-stone-800 text-base font-bold border border-stone-200 shadow-md transition"
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Try Demo Farm</span>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-6 text-xs font-semibold text-stone-500">
            <span className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> No Signup Required
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> 13 Indian Languages
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> Live Simulation Engine
            </span>
          </div>
        </section>

        {/* 4 Core Pillars */}
        <section className="py-12 bg-white border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
                The Soil-To-Prosperity Chain
              </h2>
              <p className="mt-2 text-sm text-stone-600">
                Solving soil degradation, high input costs, and farmer indebtedness through precision technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 text-center hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">Healthy Soil</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Real-time NPK, pH, and organic carbon tracking prevents chemical degradation and restores natural fertility.
                </p>
              </div>

              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 text-center hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">Smart Water</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Weather radar interlock stops unnecessary pumping during rains, conserving groundwater and electricity.
                </p>
              </div>

              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 text-center hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">Better Decisions</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  AI Farm Advisor translates complex telemetry into simple daily actions: What to do, Why, and Expected Result.
                </p>
              </div>

              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 text-center hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">Higher Profit</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Cut fertilizer waste by up to 25% and discover best APMC Mandi prices to relieve debt pressures.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-8 px-4 text-center text-xs">
        <p className="font-semibold text-stone-300">
          Krishi-Kalpa — " Cultivating Intelligence, Growing Prosperity "
        </p>
        <p className="mt-1 text-stone-500">
          Independent AgTech Decision Platform for Sustainable Indian Agriculture.
        </p>
      </footer>
    </div>
  );
};
