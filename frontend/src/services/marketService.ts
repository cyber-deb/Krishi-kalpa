import { fetchApi } from './api';
import { MandiItem } from '../types/market';
import { DEMO_MANDI_DATA } from '../data/demoMarket';

export async function getMandiMarketData(quintals: number = 54): Promise<{ all_markets: MandiItem[]; best_market: MandiItem; market_opportunity_gain_inr: number }> {
  const data = await fetchApi<{ all_markets: MandiItem[]; best_market: MandiItem; market_opportunity_gain_inr: number }>(`/api/market/prices?harvest_quintals=${quintals}`);
  if (data && data.all_markets) {
    return data;
  }
  return {
    all_markets: DEMO_MANDI_DATA,
    best_market: DEMO_MANDI_DATA[1],
    market_opportunity_gain_inr: 7789.50
  };
}
