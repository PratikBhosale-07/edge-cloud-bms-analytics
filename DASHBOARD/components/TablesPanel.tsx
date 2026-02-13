import React from 'react';
import { Alert, LogEntry } from '../types';

export const TablesPanel: React.FC = () => {
  const alerts: Alert[] = [
    { id: '1', severity: 'Critical', type: 'Cell Overvoltage #4', time: '10:42 AM' },
    { id: '2', severity: 'Warning', type: 'High Temp Warning', time: '09:15 AM' },
    { id: '3', severity: 'Info', type: 'Balancing Complete', time: 'Yesterday' },
  ];

  const logs: LogEntry[] = [
    { id: '1', type: 'system', title: 'System Diagnostic Run', description: 'Initiated by System • 12 mins ago', timestamp: '12m' },
    { id: '2', type: 'charging', title: 'Fast Charging Session Started', description: 'Station ID: #4402 • 45 mins ago', timestamp: '45m' },
    { id: '3', type: 'update', title: 'Firmware Update v2.4.1 Installed', description: 'OTA Update • 3 hours ago', timestamp: '3h' },
    { id: '4', type: 'thermal', title: 'Thermal Management Active', description: 'Cooling Pump @ 80% • 5 hours ago', timestamp: '5h' },
  ];

  const getLogColor = (type: string) => {
    switch(type) {
      case 'system': return 'bg-primary';
      case 'charging': return 'bg-electric-blue';
      case 'update': return 'bg-gray-500';
      case 'thermal': return 'bg-warning-yellow';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'bg-alert-red/10 text-alert-red border-alert-red/20';
      case 'Warning': return 'bg-warning-yellow/10 text-warning-yellow border-warning-yellow/20';
      case 'Info': return 'bg-electric-blue/10 text-electric-blue border-electric-blue/20';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Alerts Table */}
      <div className="bg-surface-dark rounded-xl border border-white/5 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center gap-2">
            <span className="material-icons-round text-alert-red text-base">warning</span> Recent Alerts
          </h3>
          <button className="text-xs text-primary hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-black/20 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Alert Type</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityStyle(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white font-medium">{alert.type}</td>
                  <td className="px-4 py-3 text-gray-500">{alert.time}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-gray-400 hover:text-white">
                      <span className="material-icons-round text-sm">more_horiz</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-surface-dark rounded-xl border border-white/5 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/5 flex flex-wrap gap-3 justify-between items-center">
          <h3 className="font-bold text-white flex items-center gap-2">
            <span className="material-icons-round text-primary text-base">history</span> Activity Log
          </h3>
          <div className="flex gap-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
                <span className="material-icons-round text-sm">search</span>
              </span>
              <input 
                type="text" 
                className="pl-8 pr-3 py-1 bg-black/30 border-none rounded-md text-xs text-white focus:ring-1 focus:ring-primary w-32 sm:w-48 placeholder-gray-600" 
                placeholder="Search logs..." 
              />
            </div>
            <button className="flex items-center gap-1 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-md text-xs font-medium text-gray-300 transition-colors">
              <span className="material-icons-round text-sm">download</span> CSV
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto max-h-60 p-4 space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-3 items-start">
              <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${getLogColor(log.type)}`}></div>
              <div>
                <p className="text-sm text-white font-medium">{log.title}</p>
                <p className="text-xs text-gray-500">{log.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};