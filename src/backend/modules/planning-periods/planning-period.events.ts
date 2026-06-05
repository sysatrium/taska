import { Injectable } from "@nestjs/common";
import type { PeriodType, PlanningPeriodStatus } from "./planning-period.types";

export type PlanningPeriodEventName =
  | "planning-period-created"
  | "planning-period-opened"
  | "planning-period-closed"
  | "planning-period-cancelled";

export type PlanningPeriodEvent = {
  name: PlanningPeriodEventName;
  payload: {
    planningPeriodId: string;
    productId: string;
    periodType: PeriodType;
    status: PlanningPeriodStatus;
  };
};

@Injectable()
export class PlanningPeriodEventPublisher {
  readonly published: PlanningPeriodEvent[] = [];

  publish(event: PlanningPeriodEvent) {
    this.published.push(event);
  }
}
