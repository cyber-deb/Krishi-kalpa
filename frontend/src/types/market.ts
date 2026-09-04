export interface MandiItem {
  market_name: string;
  commodity: string;
  distance_km: number;
  modal_price_per_quintal: number;
  transport_cost_per_quintal: number;
  mandi_fee_per_quintal: number;
  net_realization_per_quintal: number;
  estimated_total_net_inr: number;
  is_recommended: boolean;
  advantage_vs_local_inr: number;
}

export interface ProfitComparisonData {
  farm_area_acres: number;
  total_current_cost_inr: number;
  total_ai_optimized_cost_inr: number;
  total_input_savings_inr: number;
  projected_revenue_inr: number;
  current_practice_profit_inr: number;
  ai_optimized_profit_inr: number;
  net_profit_gain_inr: number;
  profit_increase_pct: number;
  expense_breakdown: {
    category: string;
    current_practice_inr: number;
    ai_optimized_inr: number;
    savings_inr: number;
  }[];
}
