export interface SoilHealthData {
  health_score: number;
  degradation_risk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  organic_matter_percent: number;
  ph: number;
  ec: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  soil_moisture: number;
  soil_temperature: number;
  nutrient_status: Record<string, string>;
  recommendations: string[];
}

export interface SoilHistoryPoint {
  date: string;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  health_score: number;
  ec: number;
}
