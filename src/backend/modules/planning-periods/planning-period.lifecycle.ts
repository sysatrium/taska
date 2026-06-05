import { HttpStatus } from "@nestjs/common";
import { planningPeriodError } from "./planning-period.errors";
import type { PlanningPeriodStatus } from "./planning-period.types";

const ALLOWED_TRANSITIONS: Record<PlanningPeriodStatus, PlanningPeriodStatus[]> = {
  draft: ["open", "cancelled"],
  open: ["closed"],
  closed: [],
  cancelled: []
};

export function assertTransitionAllowed(from: PlanningPeriodStatus, to: PlanningPeriodStatus) {
  if (!ALLOWED_TRANSITIONS[from].includes(to)) {
    throw planningPeriodError(
      HttpStatus.CONFLICT,
      "STATUS_NOT_COMPATIBLE_WITH_OPERATION",
      lifecycleMessage(from, to)
    );
  }
}

function lifecycleMessage(from: PlanningPeriodStatus, to: PlanningPeriodStatus): string {
  if (from === "cancelled") return "Отменённый период нельзя вернуть в работу";
  if (from === "closed") return "Закрытый период является зафиксированным историческим объектом";
  return `Переход planning period из ${from} в ${to} недоступен`;
}
