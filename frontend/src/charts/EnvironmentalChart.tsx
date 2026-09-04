import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

export const EnvironmentalChart: React.FC = () => {
  const data = [
    { name: 'Groundwater Saved', value: 34, fill: '#38bdf8' },
    { name: 'Synthetic Fertilizer Cut', value: 28, fill: '#4ade80' },
    { name: 'Pesticide Reduction', value: 35, fill: '#fbbf24' },
    { name: 'CO2 Footprint Cut', value: 22, fill: '#a78bfa' },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="20%" outerRadius="90%" data={data} startAngle={180} endAngle={0}>
          <RadialBar background dataKey="value" />
          <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" wrapperStyle={{ fontSize: '11px' }} />
          <Tooltip formatter={(val: number) => [`${val}% Reduction`, 'Environmental Benefit']} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};
