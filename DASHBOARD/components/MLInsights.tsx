import React from 'react';
import { LineChart, Line, ResponsiveContainer, ReferenceLine, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const MLInsights: React.FC = () => {
  // Data combining historical actuals and future predictions
  const chartData = [
    { name: 'Jan', actual: 100 },
    { name: 'Feb', actual: 99.5 },
    { name: 'Mar', actual: 99.1 },
    { name: 'Apr', actual: 98.8 },
    { name: 'May', actual: 98.2 },
    { name: 'Jun', actual: 97.5 },
    { name: 'Jul', actual: 96.8 },
    { name: 'Aug', actual: 96.1, pred: 96.1 }, // Connection point
    { name: 'Sep', pred: 95.4 },
    { name: 'Oct', pred: 94.7 },
    { name: 'Nov', pred: 93.9 },
    { name: 'Dec', pred: 93.1 },
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* RUL Card */}
      <div className="bg-surface-dark rounded-xl p-5 border border-white/5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-icons-round text-primary">psychology</span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">AI Prediction: RUL</h3>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="relative w-28 h-28 mx-auto">
            {/* SVG Gauge */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="transparent" stroke="#333" strokeWidth="8" />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="transparent" 
                stroke="#0df259" 
                strokeDasharray="282.7" 
                strokeDashoffset="50.8" 
                strokeLinecap="round" 
                strokeWidth="8" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">82%</span>
              <span className="text-[10px] text-gray-400">Life Left</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 ml-4">
            <div>
              <p className="text-xs text-gray-500">Remaining Cycles</p>
              <p className="text-xl font-bold text-white">312</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Est. Date</p>
              <p className="text-sm font-medium text-white">Nov 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Degradation Trend */}
      <div className="flex-1 bg-surface-dark rounded-xl p-5 border border-white/5 shadow-sm flex flex-col min-h-[300px]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Degradation Trend</h3>
          <div className="flex gap-2 text-[10px]">
            <span className="flex items-center gap-1 text-gray-400"><span className="w-2 h-2 rounded-full bg-white"></span>Actual</span>
            <span className="flex items-center gap-1 text-gray-400"><span className="w-2 h-2 rounded-full bg-electric-blue"></span>Pred</span>
          </div>
        </div>
        
        <div className="flex-1 w-full mt-2 text-xs">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" tick={{fill: '#666'}} tickLine={false} axisLine={false} />
                    <YAxis domain={[90, 102]} stroke="#666" tick={{fill: '#666'}} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#161b18', borderColor: '#333', borderRadius: '4px', fontSize: '12px' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#999', marginBottom: '0.25rem' }}
                    />
                    <ReferenceLine y={95} stroke="#f59e0b" strokeDasharray="3 3" />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      name="SOH (Actual)" 
                      stroke="#fff" 
                      strokeWidth={2} 
                      dot={{ r: 3, fill: '#fff', strokeWidth: 0 }} 
                      activeDot={{ r: 5 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="pred" 
                      name="SOH (Predicted)" 
                      stroke="#2563eb" 
                      strokeDasharray="5 5" 
                      strokeWidth={2} 
                      dot={{ r: 3, fill: '#2563eb', strokeWidth: 0 }} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Current SOH</span>
            <span className="text-[10px] text-gray-600">State of Health</span>
          </div>
          <span className="text-2xl font-bold text-primary">96.1%</span>
        </div>
      </div>
    </div>
  );
};