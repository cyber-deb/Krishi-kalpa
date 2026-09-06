import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { useFarmState } from '../state/FarmStateContext';
import {
  LayoutDashboard,
  Layers,
  Activity,
  Droplets,
  Sprout,
  Bot,
  IndianRupee,
  Store,
  Map,
  Leaf,
  Bell,
  Settings
} from 'lucide-react';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { t, tText } = useTranslation();
  const { alerts, soilHealth, irrigation } = useFarmState();

  const activeAlertCount = alerts.filter((a) => a.severity === 'danger' || a.severity === 'warning').length;

  const navItems = [
    { to: '/app', icon: LayoutDashboard, label: t('nav.overview'), exact: true },
    {
      to: '/app/soil-health',
      icon: Layers,
      label: t('nav.soil_health'),
      badge: `${soilHealth.overall_score}/100`,
      badgeColor: soilHealth.overall_score > 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
    },
    { to: '/app/sensors', icon: Activity, label: t('nav.live_sensors') },
    {
      to: '/app/irrigation',
      icon: Droplets,
      label: t('nav.smart_irrigation'),
      badge: irrigation.pump_status === 'ON' ? 'ON' : undefined,
      badgeColor: 'bg-blue-100 text-blue-800 animate-pulse'
    },
    { to: '/app/crop', icon: Sprout, label: t('nav.crop_intelligence') },
    { to: '/app/advisor', icon: Bot, label: t('nav.ai_advisor'), highlight: true },
    { to: '/app/economics', icon: IndianRupee, label: t('nav.farm_economics') },
    { to: '/app/market', icon: Store, label: t('nav.market_intelligence') },
    { to: '/app/map', icon: Map, label: t('nav.farm_map') },
    { to: '/app/sustainability', icon: Leaf, label: t('nav.sustainability') },
    {
      to: '/app/alerts',
      icon: Bell,
      label: t('nav.alerts'),
      badge: activeAlertCount > 0 ? String(activeAlertCount) : undefined,
      badgeColor: 'bg-red-100 text-red-700 font-bold'
    },
    { to: '/app/settings', icon: Settings, label: t('nav.settings') }
  ];

  return (
    <aside className="w-64 bg-white border-r border-stone-200 flex flex-col h-full select-none">
      {/* Navigation items list */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-agri-600 text-white shadow-sm'
                  : item.highlight
                  ? 'text-agri-800 bg-agri-50 hover:bg-agri-100'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center space-x-3">
                  <item.icon
                    className={`w-5 h-5 flex-shrink-0 ${
                      isActive ? 'text-white' : item.highlight ? 'text-agri-600' : 'text-stone-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Quick Status Footer */}
      <div className="p-3 border-t border-stone-200 bg-stone-50 text-xs text-stone-500 rounded-b-xl">
        <div className="flex items-center justify-between">
          <span className="font-medium">{tText("System Status:")}</span>
          <span className="inline-flex items-center text-emerald-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            {tText("Operational")}
          </span>
        </div>
      </div>
    </aside>
  );
};
