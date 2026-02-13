import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { KPIGrid } from './components/KPIGrid';
import { LiveTelemetryChart } from './components/LiveTelemetryChart';
import { MLInsights } from './components/MLInsights';
import { TablesPanel } from './components/TablesPanel';
import { telemetryService } from './services/mockTelemetryService';
import { TelemetryPoint } from './types';

// Initial data to populate chart before stream
const generateInitialData = (): TelemetryPoint[] => {
  const data: TelemetryPoint[] = [];
  const now = new Date();
  for (let i = 20; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 2000);
    data.push({
      time: `${t.getHours()}:${t.getMinutes().toString().padStart(2, '0')}`,
      voltage: 350 + Math.random() * 10,
      current: 20 + Math.random() * 5,
      temp: 32,
      soc: 78
    });
  }
  return data;
};

const App: React.FC = () => {
  const [telemetryHistory, setTelemetryHistory] = useState<TelemetryPoint[]>(generateInitialData());
  const [currentMetrics, setCurrentMetrics] = useState<TelemetryPoint>(telemetryHistory[telemetryHistory.length - 1]);

  useEffect(() => {
    // Start the mock service
    telemetryService.connect();

    // Subscribe to updates
    const unsubscribe = telemetryService.subscribe((point) => {
      setCurrentMetrics(point);
      setTelemetryHistory((prev) => {
        const newData = [...prev, point];
        if (newData.length > 50) newData.shift(); // Keep last 50 points
        return newData;
      });
    });

    return () => {
      telemetryService.disconnect();
      unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bg-dark text-white font-sans selection:bg-primary selection:text-bg-dark overflow-x-hidden">
      <Header />
      
      <main className="flex-1 p-6 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* KPI Row */}
        <KPIGrid 
          voltage={currentMetrics.voltage} 
          current={currentMetrics.current} 
          temp={currentMetrics.temp} 
          soc={currentMetrics.soc} 
        />

        {/* Middle Section: Chart + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LiveTelemetryChart data={telemetryHistory} />
          </div>
          <div>
            <MLInsights />
          </div>
        </div>

        {/* Bottom Section: Logs */}
        <TablesPanel />
      </main>

      <footer className="mt-auto border-t border-white/5 bg-surface-dark py-3 px-6 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="material-icons-round text-sm text-primary">cloud_done</span>
            Cloud Synced
          </span>
          <span className="h-3 w-px bg-gray-700"></span>
          <span>Server: US-East-1</span>
        </div>
        <div className="flex items-center gap-4">
          <span>ML Model: v2.4.1 (Production)</span>
          <span className="h-3 w-px bg-gray-700"></span>
          <span>© 2023 EV Intelligence</span>
        </div>
      </footer>
    </div>
  );
};

export default App;