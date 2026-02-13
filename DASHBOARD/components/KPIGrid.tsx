import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface KPIGridProps {
  voltage: number;
  current: number;
  temp: number;
  soc: number;
}

const Sparkline = () => {
  const data = [
    { v: 10 }, { v: 15 }, { v: 12 }, { v: 20 }, { v: 18 }, { v: 25 }, { v: 22 }, { v: 30 }
  ];
  return (
    <div className="h-10 w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Area type="monotone" dataKey="v" stroke="#0df259" fill="#0df259" fillOpacity={0.2} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const KPIGrid: React.FC<KPIGridProps> = ({ voltage, current, temp, soc }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* Voltage Card */}
      <div className="bg-surface-dark rounded-xl p-5 border border-white/5 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="material-icons-round text-6xl text-primary">bolt</span>
        </div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-400 text-sm uppercase font-semibold tracking-wider">Total Voltage</h3>
          <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded font-bold">Normal</span>
        </div>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-3xl font-bold text-white">{voltage}</span>
          <span className="text-sm text-gray-400 font-medium">V</span>
        </div>
        <Sparkline />
      </div>

      {/* Current Card */}
      <div className="bg-surface-dark rounded-xl p-5 border border-white/5 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="material-icons-round text-6xl text-electric-blue">waves</span>
        </div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-400 text-sm uppercase font-semibold tracking-wider">Current Flow</h3>
          <span className="bg-electric-blue/10 text-electric-blue text-xs px-2 py-0.5 rounded font-bold flex items-center gap-1">
            Discharging <span className="material-icons-round text-[10px]">arrow_downward</span>
          </span>
        </div>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-bold text-white">{current}</span>
          <span className="text-sm text-gray-400 font-medium">A</span>
        </div>
        <div className="relative h-8 w-full bg-white/5 rounded-lg overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-blue/20 to-transparent animate-pulse"></div>
             <span className="text-xs text-electric-blue font-mono relative z-10">-1.2A / 10s</span>
        </div>
      </div>

      {/* Temp Card */}
      <div className="bg-surface-dark rounded-xl p-5 border border-white/5 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="material-icons-round text-6xl text-warning-yellow">thermostat</span>
        </div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-400 text-sm uppercase font-semibold tracking-wider">Pack Temp</h3>
          <span className="text-gray-400 text-xs px-2 py-0.5 font-medium">Avg Cell</span>
        </div>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-bold text-white">{temp.toFixed(0)}</span>
          <span className="text-sm text-gray-400 font-medium">°C</span>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1 font-mono">
            <span>0°C</span>
            <span>60°C</span>
          </div>
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden relative">
            <div className="h-full w-full bg-gradient-to-r from-primary via-warning-yellow to-alert-red"></div>
            {/* Indicator Dot */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white border border-black shadow-lg transition-all duration-500" 
              style={{ left: `${(temp / 60) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* SOC Card */}
      <div className="bg-surface-dark rounded-xl p-4 border border-white/5 shadow-sm flex items-center justify-between group">
        <div>
          <h3 className="text-gray-400 text-sm uppercase font-semibold tracking-wider mb-1">State of Charge</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-primary">{soc.toFixed(0)}</span>
            <span className="text-lg text-primary font-medium">%</span>
          </div>
          <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
            <span className="material-icons-round text-sm">directions_car</span>
            240 miles
          </p>
        </div>
        
        {/* SVG Circular Progress */}
        <div className="relative w-20 h-20">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#374151" strokeWidth="8" />
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="transparent" 
              stroke="#0df259" 
              strokeWidth="8" 
              strokeLinecap="round"
              strokeDasharray="251.2" 
              strokeDashoffset={251.2 - (251.2 * soc) / 100}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-icons-round text-primary animate-pulse">battery_charging_full</span>
          </div>
        </div>
      </div>
    </div>
  );
};