import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Sprout,
  Activity,
  Droplets,
  Cpu,
  Bot,
  TrendingUp,
  ShoppingBag,
  Map as MapIcon,
  Leaf,
  Bell,
  Settings,
  X
} from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from '../utils/constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navLinks = [
    { to: "/", label: "Overview", icon: LayoutDashboard },
    { to: "/soil", label: "Soil Health", icon: Sprout },
    { to: "/sensors", label: "Live Sensors", icon: Activity },
    { to: "/irrigation", label: "Smart Irrigation", icon: Droplets },
    { to: "/crop", label: "Crop Intelligence", icon: Cpu },
    { to: "/ai-advisor", label: "AI Farm Advisor", icon: Bot },
    { to: "/economics", label: "Farm Economics", icon: TrendingUp },
    { to: "/market", label: "Market Intelligence", icon: ShoppingBag },
    { to: "/map", label: "Farm Map", icon: MapIcon },
    { to: "/environmental", label: "Environmental Impact", icon: Leaf },
    { to: "/alerts", label: "Alerts & Notifications", icon: Bell },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#0d2e1a] text-slate-200 flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between border-b border-forest-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-700 flex items-center justify-center border border-forest-500 shadow-md">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white tracking-wide">{APP_NAME}</h1>
              <p className="text-[10px] text-emerald-400/90 font-medium tracking-tight uppercase">Decision Intelligence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-400 hover:text-white rounded-lg hover:bg-forest-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => onClose()}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-emerald-600/90 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:bg-forest-800/80 hover:text-white'}
                `}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Tagline Info */}
        <div className="p-4 border-t border-forest-800 bg-[#081e11]">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-300">ESP32 Ingest Online</span>
          </div>
          <p className="text-[11px] text-slate-400 italic leading-tight">
            "{APP_TAGLINE}"
          </p>
        </div>
      </aside>
    </>
  );
};
