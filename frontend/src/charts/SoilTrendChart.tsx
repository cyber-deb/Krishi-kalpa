import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { SoilHistoryPoint } from '../types/soil';

interface SoilTrendChartProps {
  data: SoilHistoryPoint[];
}

export const SoilTrendChart: React.FC<SoilTrendChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="soilScoreGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94a3b8" />
          <YAxis domain={[40, 100]} tick={{ fontSize: 10 }} stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#fff', fontSize: '12px' }}
          />
          <Area
            type="monotone"
            dataKey="health_score"
            stroke="#10b981"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#soilScoreGrad)"
            name="Soil Health Score"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
