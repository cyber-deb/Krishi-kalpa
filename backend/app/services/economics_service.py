from app.simulation.farm_state import farm_state_manager
from app.services.soil_service import SoilService
from app.services.irrigation_service import IrrigationService
from app.services.crop_service import CropService
from app.schemas.schemas import FarmEconomicsReport, EconomicsComparison

class EconomicsService:
    @staticmethod
    def get_economics() -> FarmEconomicsReport:
        state = farm_state_manager.get_state()
        acres = state.config.area_acres

        soil = SoilService.evaluate_soil()
        irrigation = IrrigationService.get_recommendation()
        crop = CropService.get_crop_analysis()

        # Baseline market price for Paddy (IR-64) ~ ₹2,350 / Quintal
        mandi_rate = 2350.0

        # Current practice costs (Typical unoptimized farming)
        base_fert_cost = 6200.0 * acres
        base_water_cost = 4500.0 * acres
        base_labor_cost = 7800.0 * acres
        current_input_cost = base_fert_cost + base_water_cost + base_labor_cost

        # Yield calculations
        current_yield = crop.expected_yield_quintals_per_acre * acres
        current_revenue = current_yield * mandi_rate
        current_profit = current_revenue - current_input_cost

        # Recommended practice adjustments based on Krishi-Kalpa AI
        # Fertilizer optimization: save up to 25-35% on excessive chemical inputs
        if state.nitrogen > 100:
            rec_fert_cost = base_fert_cost * 0.65 # massive savings from stopping unnecessary N
        elif state.nitrogen < 35 or state.phosphorus < 30:
            rec_fert_cost = base_fert_cost * 0.90 # targeted precision application
        else:
            rec_fert_cost = base_fert_cost * 0.78 # balanced nutrition savings

        # Water pumping savings
        if irrigation.action == "DO NOT IRRIGATE":
            rec_water_cost = base_water_cost * 0.55 # saving pumping electricity
        elif irrigation.action == "MONITOR":
            rec_water_cost = base_water_cost * 0.70
        else:
            rec_water_cost = base_water_cost * 0.85 # precision timer drip

        rec_labor_cost = base_labor_cost * 0.92
        rec_input_cost = rec_fert_cost + rec_water_cost + rec_labor_cost

        # Recommended yield protection (+10% to 15% due to proactive stress remediation)
        rec_yield = min(28.0 * acres, current_yield * 1.12)
        rec_revenue = rec_yield * mandi_rate
        rec_profit = rec_revenue - rec_input_cost

        potential_savings = max(0.0, current_input_cost - rec_input_cost)
        profit_gain = max(0.0, rec_profit - current_profit)
        cost_reduction_pct = round(((current_input_cost - rec_input_cost) / current_input_cost) * 100.0, 1)

        # Indebtedness & Financial Stress Index
        outstanding_debt = 48000.0 # Representative farm credit / KCC loan
        net_annual_surplus = rec_profit * 2.0 # 2 seasons

        if net_annual_surplus <= 0:
            repayment_pressure = "High"
            debt_ratio = 1.8
            financial_guidance = "Immediate cost-containment needed. Avoid non-essential chemical inputs and utilize DBT government subsidies."
        elif outstanding_debt > net_annual_surplus * 0.7:
            repayment_pressure = "Elevated"
            debt_ratio = round(outstanding_debt / max(1.0, net_annual_surplus), 2)
            financial_guidance = "Manageable with disciplined input budgeting. Target high-realization mandi sales to accelerate loan repayment."
        else:
            repayment_pressure = "Manageable"
            debt_ratio = round(outstanding_debt / max(1.0, net_annual_surplus), 2)
            financial_guidance = "Favorable financial health. Reinvest projected savings into micro-irrigation maintenance or certified seeds."

        return FarmEconomicsReport(
            currency="₹",
            area_acres=acres,
            crop_type=state.config.crop_type,
            current_practice=EconomicsComparison(
                fertilizer_cost=round(base_fert_cost, 0),
                water_pumping_cost=round(base_water_cost, 0),
                labor_and_operations=round(base_labor_cost, 0),
                total_input_cost=round(current_input_cost, 0),
                expected_yield_quintals=round(current_yield, 1),
                estimated_gross_revenue=round(current_revenue, 0),
                estimated_net_profit=round(current_profit, 0)
            ),
            recommended_practice=EconomicsComparison(
                fertilizer_cost=round(rec_fert_cost, 0),
                water_pumping_cost=round(rec_water_cost, 0),
                labor_and_operations=round(rec_labor_cost, 0),
                total_input_cost=round(rec_input_cost, 0),
                expected_yield_quintals=round(rec_yield, 1),
                estimated_gross_revenue=round(rec_revenue, 0),
                estimated_net_profit=round(rec_profit, 0)
            ),
            net_profit_gain_inr=round(profit_gain, 0),
            potential_savings_inr=round(potential_savings, 0),
            input_cost_reduction_percent=cost_reduction_pct,
            outstanding_debt_inr=outstanding_debt,
            repayment_pressure=repayment_pressure,
            debt_service_ratio=debt_ratio,
            financial_guidance=financial_guidance,
            disclaimer="Model-based agronomic estimates. Indicative figures based on regional APMC market prices and typical agricultural input costs."
        )
