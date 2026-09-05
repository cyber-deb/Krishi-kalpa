import random
from typing import Dict, Any, List, Optional
from datetime import datetime
from app.simulation.scenario_templates import SCENARIO_TEMPLATES
from app.simulation.farm_state import farm_state_manager
from app.schemas.schemas import SimulationScenario

class ScenarioEngine:
    def __init__(self):
        self.templates = SCENARIO_TEMPLATES
        self._last_index = -1
        self.history: List[Dict[str, Any]] = []

    def get_all_templates(self) -> List[Dict[str, Any]]:
        return self.templates

    def generate_scenario(self, template_id: Optional[str] = None) -> SimulationScenario:
        current_state = farm_state_manager.get_state()

        if template_id:
            template = next((t for t in self.templates if t["scenario_id"] == template_id), None)
            if not template:
                template = random.choice(self.templates)
        else:
            # Pick a different template than last time
            available_indices = [i for i in range(len(self.templates)) if i != self._last_index]
            choice_idx = random.choice(available_indices) if available_indices else 0
            self._last_index = choice_idx
            template = self.templates[choice_idx]

        # Apply realistic small random fluctuations so it feels like living data
        target = template["target_state"].copy()
        perturbed_target: Dict[str, Any] = {}

        for key, val in target.items():
            if isinstance(val, (int, float)):
                # +/- 2% realistic fluctuation
                delta = (random.random() - 0.5) * 0.04 * val
                perturbed_target[key] = round(val + delta, 2)
            else:
                perturbed_target[key] = val

        # Update the central farm state
        farm_state_manager.apply_scenario_state(
            updates=perturbed_target,
            scenario_title=template["title"],
            scenario_category=template["category"]
        )

        scenario_obj = SimulationScenario(
            scenario_id=template["scenario_id"],
            title=template["title"],
            category=template["category"],
            description=template["description"],
            tags=template["tags"],
            changes_summary=template["changes_summary"],
            what_should_i_do=template["what_should_i_do"],
            expected_impact=template["expected_impact"],
            target_state=perturbed_target
        )

        # Record in history
        history_entry = {
            "id": len(self.history) + 1,
            "timestamp": datetime.utcnow().isoformat(),
            "scenario_id": template["scenario_id"],
            "title": template["title"],
            "category": template["category"],
            "description": template["description"],
            "soil_health_score": template["expected_impact"].get("soil_health_score", 70),
            "primary_action": template["what_should_i_do"][0] if template["what_should_i_do"] else "Monitor farm conditions",
            "changes_summary": " | ".join(template["changes_summary"])
        }
        self.history.insert(0, history_entry)
        if len(self.history) > 20:
            self.history.pop()

        return scenario_obj

    def get_history(self) -> List[Dict[str, Any]]:
        return self.history

scenario_engine = ScenarioEngine()
