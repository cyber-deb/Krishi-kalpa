import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

interface NutrientChartProps {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export const NutrientChart: React.FC<NutrientChartProps> = ({ nitrogen, phosphorus, potassium }) => {
  const chartData = [
    { name: 'Nitrogen (N)', current: nitrogen, ideal: 60 },
    { name: 'Phosphorus (P)', current: phosphorus, ideal: 45 },
    { name: 'Potassium (K)', current: potassium, ideal: 65 },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#64748b" />
          <YAxis tick={{ fontSize: 10 }} stroke="#64748b" />
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.5rem', color: '#fff', fontSize: '12px' }} />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
          <Bar dataKey="current" fill="#10b981" name="Current (kg/ha)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="ideal" fill="#94a3b8" name="Ideal Target" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
