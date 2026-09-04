import React from 'react';
import { AlertCard } from '../components/AlertCard';
import { AlertItem } from '../types/sensor';

export const Alerts: React.FC = () => {
  const alerts: AlertItem[] = [
    {
      id: 1,
      severity: 'WARNING',
      title: 'Elevated Phosphorus (72 kg/ha)',
      message: 'Soil phosphorus is above the recommended 45-60 kg/ha threshold.',
      recommended_action: 'Hold synthetic DAP for 14 days and utilize PSB bio-culture.',
      category: 'SOIL',
      is_resolved: false,
      created_at: '2026-09-05T08:30:00'
    },
    {
      id: 2,
      severity: 'INFO',
      title: 'Precipitation Window Ahead',
      message: 'Light rain (4.2 mm) forecasted in 36 hours with 65% probability.',
      recommended_action: 'Postpone pesticide spraying to avoid chemical wash-off.',
      category: 'WEATHER',
      is_resolved: false,
      created_at: '2026-09-05T07:15:00'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Farm Alerts & Advisory Notifications</h2>
        <p className="text-xs text-slate-500">Automated telemetry anomaly detection and preventive alerts</p>
      </div>

      <div className="space-y-3">
        {alerts.map(a => (
          <AlertCard key={a.id} alert={a} />
        ))}
      </div>
    </div>
  );
};
