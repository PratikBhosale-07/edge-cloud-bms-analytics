import { TelemetryPoint } from '../types';

// Simulate WebSocket behavior
type Listener = (data: TelemetryPoint) => void;

class MockTelemetryService {
  private listeners: Listener[] = [];
  private intervalId: number | null = null;
  private currentVoltage = 356.4;
  private currentAmps = 24.5;

  connect() {
    if (this.intervalId) return;

    this.intervalId = window.setInterval(() => {
      this.generateData();
    }, 2000); // Update every 2 seconds
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private generateData() {
    // Random walk for realistic looking data
    this.currentVoltage += (Math.random() - 0.5) * 1.5;
    this.currentAmps += (Math.random() - 0.5) * 0.5;
    
    // Clamp values
    this.currentVoltage = Math.max(340, Math.min(380, this.currentVoltage));
    this.currentAmps = Math.max(0, Math.min(50, this.currentAmps));

    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const point: TelemetryPoint = {
      time: timeString,
      voltage: parseFloat(this.currentVoltage.toFixed(1)),
      current: parseFloat(this.currentAmps.toFixed(1)),
      temp: 32 + Math.random(),
      soc: 78 - (Math.random() * 0.01),
    };

    this.listeners.forEach((l) => l(point));
  }
}

export const telemetryService = new MockTelemetryService();