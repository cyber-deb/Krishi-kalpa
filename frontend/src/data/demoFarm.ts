import { FarmZone } from '../types/farm';

export const DEMO_ZONES: FarmZone[] = [
  {
    id: "zone-a",
    name: "Zone A - North Field (Paddy PB-1121)",
    area_acres: 1.4,
    health_status: "Healthy",
    soil_moisture: 62,
    health_score: 74,
    degradation_risk: "LOW",
    current_crop: "Paddy (Basmati)",
    coordinates: [
      [29.6865, 76.9890],
      [29.6875, 76.9915],
      [29.6855, 76.9925],
      [29.6845, 76.9900]
    ]
  },
  {
    id: "zone-b",
    name: "Zone B - South Field (Paddy PB-1121)",
    area_acres: 1.0,
    health_status: "Moderate",
    soil_moisture: 54,
    health_score: 62,
    degradation_risk: "MODERATE",
    current_crop: "Paddy (Basmati)",
    coordinates: [
      [29.6840, 76.9895],
      [29.6850, 76.9920],
      [29.6830, 76.9930],
      [29.6820, 76.9905]
    ]
  }
];
