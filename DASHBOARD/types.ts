export interface TelemetryPoint {
  time: string;
  voltage: number;
  current: number;
  temp: number;
  soc: number;
}

export interface Alert {
  id: string;
  severity: 'Critical' | 'Warning' | 'Info';
  type: string;
  time: string;
}

export interface LogEntry {
  id: string;
  type: 'system' | 'charging' | 'update' | 'thermal';
  title: string;
  description: string;
  timestamp: string;
}

export interface SystemStatus {
  online: boolean;
  lastUpdated: string;
  packId: string;
  currentSOH: number;
}