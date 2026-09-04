import { WeatherInfo, DEMO_WEATHER } from '../data/demoWeather';

export async function getFarmWeather(): Promise<WeatherInfo> {
  return DEMO_WEATHER;
}
