import { fetchApi } from './api';
import { SensorReading } from '../types/sensor';
import { INITIAL_DEMO_SENSOR } from '../data/demoSensors';

export async function getLatestSensorTelemetry(): Promise<SensorReading> {
  const data = await fetchApi<SensorReading>('/api/sensors/latest');
  return data || INITIAL_DEMO_SENSOR;
}

export async function postSensorTelemetry(payload: Partial<SensorReading>): Promise<boolean> {
  const data = await fetchApi<{ status: string }>('/api/sensors/data', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return !!data;
}
