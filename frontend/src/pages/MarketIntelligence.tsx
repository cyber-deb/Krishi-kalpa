import React from 'react';
import { MarketTable } from '../components/MarketTable';
import { DEMO_MANDI_DATA } from '../data/demoMarket';

export const MarketIntelligence: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Market Intelligence & Mandi Realization</h2>
        <p className="text-xs text-slate-500">Dynamic logistics routing and APMC market price discovery</p>
      </div>

      <MarketTable markets={DEMO_MANDI_DATA} />
    </div>
  );
};
