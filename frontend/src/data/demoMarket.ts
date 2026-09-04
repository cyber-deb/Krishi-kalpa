import { MandiItem } from '../types/market';

export const DEMO_MANDI_DATA: MandiItem[] = [
  {
    market_name: "Karnal Main APMC",
    commodity: "Paddy (Basmati)",
    distance_km: 6.5,
    modal_price_per_quintal: 3850.0,
    transport_cost_per_quintal: 22.75,
    mandi_fee_per_quintal: 40.0,
    net_realization_per_quintal: 3787.25,
    estimated_total_net_inr: 204511.50,
    is_recommended: false,
    advantage_vs_local_inr: 0.0
  },
  {
    market_name: "Taraori Mandi (Basmati Hub)",
    commodity: "Paddy (Basmati)",
    distance_km: 21.0,
    modal_price_per_quintal: 4050.0,
    transport_cost_per_quintal: 73.50,
    mandi_fee_per_quintal: 45.0,
    net_realization_per_quintal: 3931.50,
    estimated_total_net_inr: 212301.00,
    is_recommended: true,
    advantage_vs_local_inr: 7789.50
  },
  {
    market_name: "Panipat APMC",
    commodity: "Paddy (Basmati)",
    distance_km: 34.0,
    modal_price_per_quintal: 3920.0,
    transport_cost_per_quintal: 119.00,
    mandi_fee_per_quintal: 45.0,
    net_realization_per_quintal: 3756.00,
    estimated_total_net_inr: 202824.00,
    is_recommended: false,
    advantage_vs_local_inr: -1687.50
  },
  {
    market_name: "Gharaunda Sub-Yard",
    commodity: "Paddy (Basmati)",
    distance_km: 14.0,
    modal_price_per_quintal: 3810.0,
    transport_cost_per_quintal: 49.00,
    mandi_fee_per_quintal: 38.0,
    net_realization_per_quintal: 3723.00,
    estimated_total_net_inr: 201042.00,
    is_recommended: false,
    advantage_vs_local_inr: -3469.50
  }
];
