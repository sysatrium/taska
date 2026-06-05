import { Body, Controller, Get, Headers, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import { PlanningPeriodService } from "./planning-period.service";
import { assertHeadOfProduct, parseCreateRequest, parseListQuery, parsePatchRequest } from "./planning-period.validation";
import type { PlanningPeriodDetailResponse, PlanningPeriodListResponse } from "./planning-period.types";

@Controller("/api/planning-periods")
export class PlanningPeriodController {
  constructor(@Inject(PlanningPeriodService) private readonly periods: PlanningPeriodService) {}

  @Get()
  async list(@Query() query: Record<string, unknown>): Promise<PlanningPeriodListResponse> {
    return this.periods.list(parseListQuery(query));
  }

  @Post()
  async create(@Body() body: unknown, @Headers("x-user-role") role?: string, @Headers("x-user-id") userId?: string) {
    assertHeadOfProduct(role);
    return this.periods.create(parseCreateRequest(body), userId ?? "head-of-product");
  }

  @Get(":planningPeriodId")
  async get(@Param("planningPeriodId") planningPeriodId: string): Promise<PlanningPeriodDetailResponse> {
    return this.periods.get(planningPeriodId);
  }

  @Patch(":planningPeriodId")
  async patch(@Param("planningPeriodId") planningPeriodId: string, @Body() body: unknown, @Headers("x-user-role") role?: string) {
    assertHeadOfProduct(role);
    return this.periods.patch(planningPeriodId, parsePatchRequest(body));
  }

  @Post(":planningPeriodId/open")
  async open(@Param("planningPeriodId") planningPeriodId: string, @Headers("x-user-role") role?: string) {
    assertHeadOfProduct(role);
    return this.periods.open(planningPeriodId);
  }

  @Post(":planningPeriodId/close")
  async close(@Param("planningPeriodId") planningPeriodId: string, @Headers("x-user-role") role?: string) {
    assertHeadOfProduct(role);
    return this.periods.close(planningPeriodId);
  }

  @Post(":planningPeriodId/cancel")
  async cancel(@Param("planningPeriodId") planningPeriodId: string, @Headers("x-user-role") role?: string) {
    assertHeadOfProduct(role);
    return this.periods.cancel(planningPeriodId);
  }
}
