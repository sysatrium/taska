import { HttpException, HttpStatus } from "@nestjs/common";

export type PlanningPeriodErrorCode =
  | "INVALID_DATE_RANGE"
  | "DATE_CONFLICT_WITH_EXISTING_PERIOD"
  | "MISSING_GOALS_FOR_OPEN"
  | "NAME_NOT_EDITABLE_IN_OPEN"
  | "STATUS_NOT_COMPATIBLE_WITH_OPERATION"
  | "PLANNING_PERIOD_NOT_FOUND";

export type PlanningPeriodErrorDetail = {
  field: string;
  issue: string;
};

export function planningPeriodError(
  status: HttpStatus,
  code: PlanningPeriodErrorCode,
  message: string,
  details?: PlanningPeriodErrorDetail[]
) {
  return new HttpException({ error: { code, message, details } }, status);
}
