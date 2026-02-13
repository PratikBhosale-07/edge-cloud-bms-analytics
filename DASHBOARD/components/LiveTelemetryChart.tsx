import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TelemetryPoint } from '../types';

interface LiveTelemetryChartProps {
  data: TelemetryPoint[];
}

export const LiveTelemetryChart: React.FC<LiveTelemetryChartProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState('Voltage');

  return (
    <div className="bg-surface-dark rounded-xl border border-white/5 shadow-sm flex flex-col h-[500px]">
      <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Live Telemetry</h2>
          <p className="text-xs text-gray-400">Real-time sensor data aggregation</p>
        </div>
        <div className="flex items-center gap-4 bg-black/30 p-1 rounded-lg">
          {['Voltage', 'Current', 'Temp', 'SOC'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-primary text-bg-dark shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 p-5 overflow-hidden" style={{
        backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}>
        <div className="absolute top-5 right-5 flex gap-2 z-10">
          <button className="px-3 py-1 rounded border border-white/10 text-xs font-medium text-gray-400 hover:bg-white/5">1H</button>
          <button className="px-3 py-1 rounded bg-primary text-bg-dark text-xs font-bold border border-primary">24H</button>
          <button className="px-3 py-1 rounded border border-white/10 text-xs font-medium text-gray-400 hover:bg-white/5">7D</button>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0df259" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0df259" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#666" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              tickMargin={10} 
            />
            <YAxis 
              stroke="#666" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              domain={['auto', 'auto']}
              tickFormatter={(val) => `${val}${activeTab === 'Voltage' ? 'V' : ''}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#161b18', borderColor: '#333', borderRadius: '4px' }}
              itemStyle={{ color: '#0df259' }}
              labelStyle={{ color: '#999' }}
            />
            <Area 
              type="monotone" 
              dataKey={activeTab.toLowerCase()} 
              stroke="#0df259" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};