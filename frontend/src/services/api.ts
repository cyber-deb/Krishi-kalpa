import {
  FarmState,
  SoilHealthReport,
  IrrigationRecommendation,
  CropStressAnalysis,
  FarmEconomicsReport,
  MarketIntelligenceReport,
  SustainabilityReport,
  AIAdvisorResponse,
  SimulationScenario,
  FarmZone,
  AlertItem
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL.replace(/\/$/, '');
  }

  private async fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      }
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async getHealth(): Promise<{ status: string; mode: string }> {
    return this.fetchJson('/api/health');
  }

  async getFarmState(): Promise<FarmState> {
    return this.fetchJson('/api/farm/state');
  }

  async setFarmMode(mode: 'demo' | 'live'): Promise<{ message: string; mode: string }> {
    return this.fetchJson('/api/farm/mode', {
      method: 'POST',
      body: JSON.stringify({ mode })
    });
  }

  async getSoilHealth(): Promise<SoilHealthReport> {
    return this.fetchJson('/api/soil-health');
  }

  async getIrrigation(): Promise<IrrigationRecommendation> {
    return this.fetchJson('/api/irrigation/recommendation');
  }

  async getCropAnalysis(): Promise<CropStressAnalysis> {
    return this.fetchJson('/api/crop/recommendation');
  }

  async getEconomics(): Promise<FarmEconomicsReport> {
    return this.fetchJson('/api/farm/profit');
  }

  async getMarketPrices(): Promise<MarketIntelligenceReport> {
    return this.fetchJson('/api/market/prices');
  }

  async getSustainability(): Promise<SustainabilityReport> {
    return this.fetchJson('/api/environmental-impact');
  }

  async getAdvisor(): Promise<AIAdvisorResponse> {
    return this.fetchJson('/api/advisor/today');
  }

  async getAlerts(): Promise<AlertItem[]> {
    return this.fetchJson('/api/alerts');
  }

  async getMapZones(): Promise<FarmZone[]> {
    return this.fetchJson('/api/map/zones');
  }

  async generateSimulationScenario(templateId?: string): Promise<{
    scenario: SimulationScenario;
    current_state: FarmState;
    soil_health: SoilHealthReport;
    irrigation: IrrigationRecommendation;
    advisor: AIAdvisorResponse;
    economics: FarmEconomicsReport;
  }> {
    const endpoint = templateId
      ? `/api/simulation/generate?template_id=${encodeURIComponent(templateId)}`
      : '/api/simulation/generate';
    return this.fetchJson(endpoint, { method: 'POST' });
  }

  async resetSimulation(): Promise<{ message: string; state: FarmState }> {
    return this.fetchJson('/api/simulation/reset', { method: 'POST' });
  }

  async getSimulationHistory(): Promise<any[]> {
    return this.fetchJson('/api/simulation/history');
  }

  async sendSensorTelemetry(data: any): Promise<any> {
    return this.fetchJson('/api/sensors/data', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

export const api = new ApiService();
