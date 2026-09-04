export interface WeatherInfo {
  temperature: number;
  humidity: number;
  rainfall: number;
  rain_probability: number;
  condition: string;
  forecast_summary: string;
}

export const DEMO_WEATHER: WeatherInfo = {
  temperature: 29.1,
  humidity: 71,
  rainfall: 4.2,
  rain_probability: 20,
  condition: "Partly Cloudy",
  forecast_summary: "Light precipitation expected in 36-48 hours. Soil moisture levels comfortable."
};
