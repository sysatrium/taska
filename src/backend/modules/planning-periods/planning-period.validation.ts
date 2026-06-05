import { HttpStatus } from "@nestjs/common";
import { planningPeriodError, type PlanningPeriodErrorDetail } from "./planning-period.errors";
import type {
  PeriodType,
  PlanningPeriodCreateRequest,
  PlanningPeriodListQuery,
  PlanningPeriodPatchRequest,
  PlanningPeriodStatus
} from "./planning-period.types";

const PERIOD_TYPES = new Set<PeriodType>(["sprint", "month", "quarter", "year"]);
const STATUSES = new Set<PlanningPeriodStatus>(["draft", "open", "closed", "cancelled"]);
const MAX_NAME = 200;

export function parseCreateRequest(body: unknown): PlanningPeriodCreateRequest {
  const details = validatePayload(body, true);
  if (details.length > 0) throw validationError(details);
  const payload = body as PlanningPeriodCreateRequest;
  return { ...payload, name: payload.name.trim() };
}

export function parsePatchRequest(body: unknown): PlanningPeriodPatchRequest {
  const details = validatePayload(body, false);
  if (details.length > 0) throw validationError(details);
  const payload = body as PlanningPeriodPatchRequest;
  return { ...payload, ...(payload.name === undefined ? {} : { name: payload.name.trim() }) };
}

export function parseListQuery(query: Record<string, unknown>): PlanningPeriodListQuery {
  const productId = typeof query.productId === "string" ? query.productId.trim() : "";
  if (!productId) throw validationError([{ field: "productId", issue: "productId is required" }]);
  return {
    productId,
    periodType: parseOptionalEnum(query.periodType, PERIOD_TYPES, "periodType"),
    status: parseOptionalEnum(query.status, STATUSES, "status"),
    page: parsePositiveInteger(query.page, 1),
    pageSize: Math.min(parsePositiveInteger(query.pageSize, 20), 100)
  };
}

export function assertHeadOfProduct(role?: string) {
  if (role !== "head-of-product") {
    throw planningPeriodError(HttpStatus.CONFLICT, "STATUS_NOT_COMPATIBLE_WITH_OPERATION", "Только Head of Product может управлять planning periods");
  }
}

function validatePayload(body: unknown, requireAll: boolean): PlanningPeriodErrorDetail[] {
  if (!isRecord(body)) return [{ field: "body", issue: "Expected JSON object" }];
  const allowed = ["productId", "periodType", "name", "startDate", "endDate", "goals"];
  const details = Object.keys(body).filter((field) => !allowed.includes(field)).map(unknownField);
  if (!requireAll && Object.keys(body).length === 0) details.push({ field: "body", issue: "At least one field is required" });
  if (requireAll) validateText(body, "productId", 100, true, details);
  if (requireAll) validateEnum(body.periodType, PERIOD_TYPES, "periodType", details);
  validateText(body, "name", MAX_NAME, requireAll, details);
  validateDateText(body, "startDate", requireAll, details);
  validateDateText(body, "endDate", requireAll, details);
  validateGoals(body, requireAll, details);
  return details;
}

function validateText(body: Record<string, unknown>, field: string, max: number, required: boolean, details: PlanningPeriodErrorDetail[]) {
  const value = body[field];
  if (value === undefined && !required) return;
  if (typeof value !== "string" || value.trim().length === 0 || value.trim().length > max) {
    details.push({ field, issue: `Must be a non-empty string up to ${max} characters` });
  }
}

function validateDateText(body: Record<string, unknown>, field: string, required: boolean, details: PlanningPeriodErrorDetail[]) {
  const value = body[field];
  if (value === undefined && !required) return;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    details.push({ field, issue: "Must be an ISO date string" });
  }
}

function validateGoals(body: Record<string, unknown>, required: boolean, details: PlanningPeriodErrorDetail[]) {
  const value = body.goals;
  if (value === undefined && !required) return;
  if (!isRecord(value)) details.push({ field: "goals", issue: "Must be structured formatted content" });
}

function validateEnum<T extends string>(value: unknown, allowed: Set<T>, field: string, details: PlanningPeriodErrorDetail[]) {
  if (typeof value !== "string" || !allowed.has(value as T)) details.push({ field, issue: "Unsupported value" });
}

function parseOptionalEnum<T extends string>(value: unknown, allowed: Set<T>, field: string): T | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "string" && allowed.has(value as T)) return value as T;
  throw validationError([{ field, issue: "Unsupported value" }]);
}

function parsePositiveInteger(value: unknown, fallback: number): number {
  const parsed = typeof value === "string" ? Number.parseInt(value, 10) : fallback;
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function validationError(details: PlanningPeriodErrorDetail[]): never {
  throw planningPeriodError(HttpStatus.BAD_REQUEST, "INVALID_DATE_RANGE", "Planning period payload is invalid", details);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function unknownField(field: string): PlanningPeriodErrorDetail {
  return { field, issue: "Field is not allowed" };
}
