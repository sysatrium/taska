import type { ApiError, PlanningPeriod, PlanningPeriodPatch, PlanningPeriodPayload, PlanningPeriodSummary } from "./types";

const ROLE_HEADER = "X-User-Role";
const USER_ID_HEADER = "X-User-Id";
const PRODUCT_ID = "product-alpha";

export async function listPlanningPeriods(): Promise<PlanningPeriodSummary[]> {
  const response = await fetch(`/api/planning-periods?productId=${PRODUCT_ID}`);
  const data = await readResponse<{ items: PlanningPeriodSummary[] }>(response);
  return data.items;
}

export async function getPlanningPeriod(id: string): Promise<PlanningPeriod> {
  const response = await fetch(`/api/planning-periods/${id}`);
  const data = await readResponse<{ planningPeriod: PlanningPeriod }>(response);
  return data.planningPeriod;
}

export async function createPlanningPeriod(payload: PlanningPeriodPayload): Promise<PlanningPeriod> {
  const response = await fetch("/api/planning-periods", request("POST", payload));
  const data = await readResponse<{ planningPeriod: PlanningPeriod }>(response);
  return data.planningPeriod;
}

export async function patchPlanningPeriod(id: string, payload: PlanningPeriodPatch): Promise<PlanningPeriod> {
  const response = await fetch(`/api/planning-periods/${id}`, request("PATCH", payload));
  const data = await readResponse<{ planningPeriod: PlanningPeriod }>(response);
  return data.planningPeriod;
}

export async function transitionPlanningPeriod(id: string, action: "open" | "close" | "cancel"): Promise<PlanningPeriod> {
  const response = await fetch(`/api/planning-periods/${id}/${action}`, request("POST"));
  const data = await readResponse<{ planningPeriod: PlanningPeriod }>(response);
  return data.planningPeriod;
}

function request(method: "POST" | "PATCH", payload?: unknown): RequestInit {
  return {
    method,
    headers: { "Content-Type": "application/json", [ROLE_HEADER]: "head-of-product", [USER_ID_HEADER]: "head-of-product" },
    ...(payload === undefined ? {} : { body: JSON.stringify(payload) })
  };
}

async function readResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T | { error: ApiError };
  if (!response.ok) throw (isErrorEnvelope(data) ? data.error : data);
  return data as T;
}

function isErrorEnvelope(value: unknown): value is { error: ApiError } {
  return typeof value === "object" && value !== null && "error" in value;
}
