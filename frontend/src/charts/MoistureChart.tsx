import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const MoistureChart: React.FC<{ data: { time: string; moisture: number }[] }> = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#94a3b8" />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.5rem', color: '#fff', fontSize: '12px' }} />
          <Line type="monotone" dataKey="moisture" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="Moisture (%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
