import { HttpStatus } from "@nestjs/common";
import { apiError, type ErrorDetail } from "../shared/errors";
import type { TeamCreateRequest, TeamPatchRequest } from "./team.types";

const ALLOWED_ROLES = new Set(["head-of-product", "team-lead"]);
const MAX_NAME = 120;
const MAX_OWNER_ROLE = 80;

export function assertAllowedRole(role: string | undefined) {
  if (!role || !ALLOWED_ROLES.has(role)) {
    throw apiError(HttpStatus.FORBIDDEN, "forbidden", "User role is not allowed to manage team profiles");
  }
}

export function parseCreateRequest(body: unknown): TeamCreateRequest {
  const details = validateBase(body, true);
  if (details.length > 0) {
    throw apiError(HttpStatus.UNPROCESSABLE_ENTITY, "validation_error", "Team payload is invalid", details);
  }
  const payload = body as TeamCreateRequest;
  return cleanRequest(payload);
}

export function parsePatchRequest(body: unknown): TeamPatchRequest {
  const details = validateBase(body, false);
  if (details.length > 0) {
    throw apiError(HttpStatus.UNPROCESSABLE_ENTITY, "validation_error", "Team patch is invalid", details);
  }
  return cleanPatch(body as TeamPatchRequest);
}

function validateBase(body: unknown, requireAll: boolean): ErrorDetail[] {
  if (!isRecord(body)) {
    return [{ field: "body", issue: "Expected JSON object" }];
  }
  const allowed = ["name", "ownerRole", "competencyIds"];
  const details = Object.keys(body).filter((field) => !allowed.includes(field)).map(unknownField);
  if (!requireAll && Object.keys(body).length === 0) {
    details.push({ field: "body", issue: "At least one field is required" });
  }
  validateText(body, "name", MAX_NAME, requireAll, details);
  validateText(body, "ownerRole", MAX_OWNER_ROLE, requireAll, details);
  validateCompetencyIds(body, requireAll, details);
  return details;
}

function validateText(body: Record<string, unknown>, field: string, max: number, required: boolean, details: ErrorDetail[]) {
  const value = body[field];
  if (value === undefined && !required) return;
  if (typeof value !== "string" || value.trim().length === 0 || value.trim().length > max) {
    details.push({ field, issue: `Must be a non-empty string up to ${max} characters` });
  }
}

function validateCompetencyIds(body: Record<string, unknown>, required: boolean, details: ErrorDetail[]) {
  const value = body.competencyIds;
  if (value === undefined && !required) return;
  if (!Array.isArray(value) || value.length === 0 || !value.every(isNonEmptyString)) {
    details.push({ field: "competencyIds", issue: "At least one competency id is required" });
    return;
  }
  if (new Set(value).size !== value.length) {
    details.push({ field: "competencyIds", issue: "Duplicate competency ids are not allowed" });
  }
}

function cleanRequest(payload: TeamCreateRequest): TeamCreateRequest {
  return {
    name: payload.name.trim(),
    ownerRole: payload.ownerRole.trim(),
    competencyIds: payload.competencyIds
  };
}

function cleanPatch(payload: TeamPatchRequest): TeamPatchRequest {
  return {
    ...(payload.name === undefined ? {} : { name: payload.name.trim() }),
    ...(payload.ownerRole === undefined ? {} : { ownerRole: payload.ownerRole.trim() }),
    ...(payload.competencyIds === undefined ? {} : { competencyIds: payload.competencyIds })
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function unknownField(field: string): ErrorDetail {
  return { field, issue: "Field is not allowed" };
}
