import { useState, useEffect } from 'react';
import { SensorReading } from '../types/sensor';
import { getLatestSensorTelemetry } from '../services/sensorService';
import { INITIAL_DEMO_SENSOR } from '../data/demoSensors';

export function useSensors(isLive: boolean = true) {
  const [sensors, setSensors] = useState<SensorReading>(INITIAL_DEMO_SENSOR);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshSensors = async () => {
    try {
      const data = await getLatestSensorTelemetry();
      setSensors(data);
    } catch (e) {
      console.warn("Sensor fetch error, maintaining state");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSensors();
    if (!isLive) return;

    const interval = setInterval(() => {
      refreshSensors();
    }, 8000);

    return () => clearInterval(interval);
  }, [isLive]);

  return { sensors, setSensors, loading, refreshSensors };
}
