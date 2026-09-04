import { useState, useEffect } from 'react';
import { SoilHealthData, SoilHistoryPoint } from '../types/soil';
import { fetchApi } from '../services/api';

export function useSoilHealth(sensorMoisture: number = 62) {
  const [soilHealth, setSoilHealth] = useState<SoilHealthData>({
    health_score: 68,
    degradation_risk: "MODERATE",
    organic_matter_percent: 0.74,
    ph: 6.4,
    ec: 0.82,
    nitrogen: 58,
    phosphorus: 72,
    potassium: 64,
    soil_moisture: sensorMoisture,
    soil_temperature: 27.4,
    nutrient_status: {
      "Nitrogen": "Optimal (58 kg/ha)",
      "Phosphorus": "Elevated (72 kg/ha)",
      "Potassium": "Optimal (64 kg/ha)",
      "pH Balance": "Slightly Acidic (6.4)",
      "Salinity (EC)": "Safe (0.82 dS/m)"
    },
    recommendations: [
      "Reduce synthetic DAP application by 30% due to existing phosphorus carryover.",
      "Apply biochar / compost post-harvest to increase soil organic carbon from 0.74% to >1.0%."
    ]
  });

  const [history, setHistory] = useState<SoilHistoryPoint[]>([]);

  useEffect(() => {
    async function loadData() {
      const liveReport = await fetchApi<SoilHealthData>('/api/soil/health');
      if (liveReport) setSoilHealth(liveReport);

      const liveHistory = await fetchApi<SoilHistoryPoint[]>('/api/soil/history');
      if (liveHistory) {
        setHistory(liveHistory);
      } else {
        // Fallback 30-day trend
        const defaultHistory: SoilHistoryPoint[] = Array.from({ length: 30 }, (_, i) => ({
          date: `Day ${i + 1}`,
          moisture: 52 + (i % 5) * 3,
          nitrogen: 50 + (i * 0.3),
          phosphorus: 70 - (i * 0.1),
          potassium: 62 + (i * 0.1),
          health_score: 64 + Math.round(i * 0.2),
          ec: 0.85 - (i * 0.001)
        }));
        setHistory(defaultHistory);
      }
    }
    loadData();
  }, [sensorMoisture]);

  return { soilHealth, history };
}
