export interface SensorReading {
  device_id: string;
  soil_moisture: number;
  soil_temperature: number;
  ph: number;
  ec: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  air_temperature: number;
  humidity: number;
  rainfall: number;
  timestamp?: string;
}

export interface AlertItem {
  id: number;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  message: string;
  recommended_action: string;
  category: 'SOIL' | 'IRRIGATION' | 'WEATHER' | 'MARKET';
  is_resolved: boolean;
  created_at: string;
}

export interface AIRecommendationItem {
  id: number;
  category: string;
  recommendation: string;
  reason: string;
  confidence: number;
  expected_impact: string;
  action_type: string;
}
