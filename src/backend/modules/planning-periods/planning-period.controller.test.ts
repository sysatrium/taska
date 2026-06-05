import { HttpStatus, Module, type INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { afterEach, describe, expect, it } from "vitest";
import { planningPeriodError } from "./planning-period.errors";
import { PlanningPeriodController } from "./planning-period.controller";
import { PlanningPeriodService } from "./planning-period.service";
import type {
  PlanningPeriodCreateRequest,
  PlanningPeriodDetailResponse,
  PlanningPeriodListQuery,
  PlanningPeriodListResponse
} from "./planning-period.types";

const detail: PlanningPeriodDetailResponse = {
  planningPeriod: {
    id: "11111111-1111-4111-8111-111111111111",
    productId: "product-alpha",
    periodType: "quarter",
    name: "Q3 Planning",
    startDate: "2026-07-01",
    endDate: "2026-09-30",
    status: "draft",
    goals: { type: "doc", content: [{ type: "heading", text: "Outcome" }] },
    createdBy: "head-of-product",
    createdAt: "2026-06-05T00:00:00.000Z",
    updatedAt: "2026-06-05T00:00:00.000Z"
  }
};

class FakePlanningPeriodService {
  listQuery: PlanningPeriodListQuery | null = null;
  createPayload: PlanningPeriodCreateRequest | null = null;
  createdBy: string | null = null;

  async list(query: PlanningPeriodListQuery): Promise<PlanningPeriodListResponse> {
    this.listQuery = query;
    return { items: [toSummary()], page: query.page, pageSize: query.pageSize, total: 1 };
  }

  async create(payload: PlanningPeriodCreateRequest, createdBy: string): Promise<PlanningPeriodDetailResponse> {
    this.createPayload = payload;
    this.createdBy = createdBy;
    return detail;
  }

  async get(): Promise<PlanningPeriodDetailResponse> {
    return detail;
  }

  async patch(): Promise<PlanningPeriodDetailResponse> {
    return { planningPeriod: { ...detail.planningPeriod, status: "open" } };
  }

  async open(): Promise<PlanningPeriodDetailResponse> {
    throw planningPeriodError(HttpStatus.BAD_REQUEST, "MISSING_GOALS_FOR_OPEN", "Для открытия периода необходимо задать содержательные цели");
  }

  async close(): Promise<PlanningPeriodDetailResponse> {
    return { planningPeriod: { ...detail.planningPeriod, status: "closed" } };
  }

  async cancel(): Promise<PlanningPeriodDetailResponse> {
    return { planningPeriod: { ...detail.planningPeriod, status: "cancelled" } };
  }
}

@Module({
  controllers: [PlanningPeriodController],
  providers: [{ provide: PlanningPeriodService, useClass: FakePlanningPeriodService }]
})
class TestModule {}

describe("PlanningPeriodController API contract", () => {
  let app: INestApplication | null = null;

  afterEach(async () => {
    await app?.close();
    app = null;
  });

  it("returns contract list shape and parses query parameters", async () => {
    const context = await startApi();
    const response = await fetch(`${context.url}/api/planning-periods?productId=product-alpha&page=2&pageSize=1`);
    const body = (await response.json()) as PlanningPeriodListResponse;

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ page: 2, pageSize: 1, total: 1 });
    expect(body.items[0]).toMatchObject({ name: "Q3 Planning", status: "draft" });
    expect(context.service.listQuery).toMatchObject({ productId: "product-alpha", page: 2, pageSize: 1 });
  });

  it("creates through POST with Head of Product headers and response envelope", async () => {
    const context = await startApi();
    const response = await fetch(`${context.url}/api/planning-periods`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-User-Role": "head-of-product", "X-User-Id": "owner-1" },
      body: JSON.stringify({ ...validPayload(), name: "  Q3 Planning  " })
    });
    const body = (await response.json()) as PlanningPeriodDetailResponse;

    expect(response.status).toBe(201);
    expect(body.planningPeriod).toMatchObject({ name: "Q3 Planning", goals: validPayload().goals });
    expect(context.service.createPayload?.name).toBe("Q3 Planning");
    expect(context.service.createdBy).toBe("owner-1");
  });

  it("returns contract error envelope for validation and readiness failures", async () => {
    const context = await startApi();
    const validation = await fetch(`${context.url}/api/planning-periods`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-User-Role": "head-of-product" },
      body: JSON.stringify({ ...validPayload(), endDate: "2026/09/30" })
    });
    const readiness = await fetch(`${context.url}/api/planning-periods/${detail.planningPeriod.id}/open`, {
      method: "POST",
      headers: { "X-User-Role": "head-of-product" }
    });

    expect(await validation.json()).toMatchObject({ error: { code: "INVALID_DATE_RANGE" } });
    expect(await readiness.json()).toMatchObject({ error: { code: "MISSING_GOALS_FOR_OPEN" } });
    expect(validation.status).toBe(400);
    expect(readiness.status).toBe(400);
  });

  it("exposes close and cancel lifecycle routes with detail response envelope", async () => {
    const context = await startApi();
    const close = await fetch(`${context.url}/api/planning-periods/${detail.planningPeriod.id}/close`, {
      method: "POST",
      headers: { "X-User-Role": "head-of-product" }
    });
    const cancel = await fetch(`${context.url}/api/planning-periods/${detail.planningPeriod.id}/cancel`, {
      method: "POST",
      headers: { "X-User-Role": "head-of-product" }
    });

    expect(await close.json()).toMatchObject({ planningPeriod: { status: "closed" } });
    expect(await cancel.json()).toMatchObject({ planningPeriod: { status: "cancelled" } });
    expect(close.status).toBe(201);
    expect(cancel.status).toBe(201);
  });

  async function startApi() {
    app = await NestFactory.create(TestModule, { logger: false });
    await app.listen(0);
    const service = app.get(PlanningPeriodService) as unknown as FakePlanningPeriodService;
    return { url: await app.getUrl(), service };
  }
});

function toSummary() {
  return {
    id: detail.planningPeriod.id,
    productId: detail.planningPeriod.productId,
    periodType: detail.planningPeriod.periodType,
    name: detail.planningPeriod.name,
    startDate: detail.planningPeriod.startDate,
    endDate: detail.planningPeriod.endDate,
    status: detail.planningPeriod.status,
    createdBy: detail.planningPeriod.createdBy,
    createdAt: detail.planningPeriod.createdAt,
    updatedAt: detail.planningPeriod.updatedAt
  };
}

function validPayload(): PlanningPeriodCreateRequest {
  return {
    productId: "product-alpha",
    periodType: "quarter",
    name: "Q3 Planning",
    startDate: "2026-07-01",
    endDate: "2026-09-30",
    goals: { type: "doc", content: [{ type: "heading", text: "Outcome" }] }
  };
}
