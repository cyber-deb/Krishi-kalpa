import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

interface ProfitChartProps {
  breakdown: {
    category: string;
    current_practice_inr: number;
    ai_optimized_inr: number;
  }[];
}

export const ProfitChart: React.FC<ProfitChartProps> = ({ breakdown }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={breakdown} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="category" tick={{ fontSize: 10 }} stroke="#64748b" />
          <YAxis tick={{ fontSize: 10 }} stroke="#64748b" />
          <Tooltip
            formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Cost']}
            contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.5rem', color: '#fff', fontSize: '12px' }}
          />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Bar dataKey="current_practice_inr" fill="#f87171" name="Current Practice (₹)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="ai_optimized_inr" fill="#34d399" name="AI-Optimized (₹)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
