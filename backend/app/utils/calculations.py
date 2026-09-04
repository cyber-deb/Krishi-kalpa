def calculate_soil_health_score(ph: float, ec: float, n: float, p: float, k: float, om: float = 0.75) -> float:
    """
    Computes a composite Soil Quality Index (0-100) based on agronomic thresholds:
    - Ideal pH: 6.5 - 7.5
    - Ideal EC: < 1.0 dS/m
    - Ideal N: 50 - 70 kg/ha
    - Ideal P: 40 - 60 kg/ha
    - Ideal K: 60 - 80 kg/ha
    - Ideal Organic Matter: > 1.0%
    """
    score = 100.0

    # pH Penalty
    if ph < 6.0:
        score -= (6.0 - ph) * 15
    elif ph > 7.8:
        score -= (ph - 7.8) * 15

    # Salinity / EC Penalty
    if ec > 1.2:
        score -= (ec - 1.2) * 20

    # NPK Balance penalties
    if n < 40: score -= 8
    elif n > 90: score -= 12 # excess causes leaching/salinity

    if p < 30: score -= 6
    if k < 40: score -= 6

    # Organic matter bonus/penalty
    if om < 0.5:
        score -= 10
    elif om > 1.0:
        score += 5

    return max(15.0, min(98.0, round(score, 1)))

def calculate_degradation_risk(score: float, ec: float, ph: float) -> str:
    """Classifies soil degradation vulnerability."""
    if score >= 80 and ec < 1.0 and (6.2 <= ph <= 7.5):
        return "LOW"
    elif score >= 60:
        return "MODERATE"
    elif score >= 40 or ec >= 1.5:
        return "HIGH"
    return "CRITICAL"

def calculate_net_realization(price: float, distance_km: float, qty_quintals: float, base_transport: float = 3.5, mandi_fee: float = 45.0) -> float:
    """
    Net Realization Formula:
    Net = Selling Price - Transport Cost (₹/km/quintal) - Mandi Cess
    """
    transport_cost = distance_km * base_transport
    net_per_quintal = price - transport_cost - mandi_fee
    return max(0.0, net_per_quintal)
