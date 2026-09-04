export interface FarmZone {
  id: string;
  name: string;
  area_acres: number;
  health_status: 'Healthy' | 'Moderate' | 'Stress' | 'High Risk';
  soil_moisture: number;
  health_score: number;
  degradation_risk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  current_crop: string;
  coordinates: [number, number][];
}

export interface MasterDailyAction {
  headline: string;
  badge: string;
  badge_color: 'emerald' | 'blue' | 'amber' | 'rose';
  reason: string;
  confidence: number;
  impact: string;
}
