import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { PrismaService } from "../persistence/prisma.service";
import { planningPeriodError } from "./planning-period.errors";
import { PlanningPeriodEventPublisher, type PlanningPeriodEventName } from "./planning-period.events";
import { assertTransitionAllowed } from "./planning-period.lifecycle";
import type {
  PeriodType,
  PlanningPeriod,
  PlanningPeriodCreateRequest,
  PlanningPeriodDetailResponse,
  PlanningPeriodListQuery,
  PlanningPeriodListResponse,
  PlanningPeriodPatchRequest,
  PlanningPeriodStatus,
  RichTextDocument
} from "./planning-period.types";

type StoredPlanningPeriod = {
  id: string;
  productId: string;
  periodType: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: string;
  goals: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PlanningPeriodService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(PlanningPeriodEventPublisher) private readonly events: PlanningPeriodEventPublisher
  ) {}

  async list(query: PlanningPeriodListQuery): Promise<PlanningPeriodListResponse> {
    const where = toWhere(query);
    const [items, total] = await Promise.all([
      this.prisma.planningPeriod.findMany({
        where,
        orderBy: { startDate: "desc" },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize
      }),
      this.prisma.planningPeriod.count({ where })
    ]);
    return { items: items.map(toSummary), page: query.page, pageSize: query.pageSize, total };
  }

  async create(payload: PlanningPeriodCreateRequest, createdBy: string): Promise<PlanningPeriodDetailResponse> {
    assertDateRules(payload.startDate, payload.endDate);
    await this.assertNoOverlap(payload.productId, payload.periodType, payload.startDate, payload.endDate);
    const created = await this.prisma.planningPeriod.create({ data: toCreateData(payload, createdBy) });
    this.publish("planning-period-created", created);
    return { planningPeriod: toPlanningPeriod(created) };
  }

  async get(id: string): Promise<PlanningPeriodDetailResponse> {
    return { planningPeriod: toPlanningPeriod(await this.find(id)) };
  }

  async patch(id: string, payload: PlanningPeriodPatchRequest): Promise<PlanningPeriodDetailResponse> {
    const current = await this.find(id);
    this.assertPatchAllowed(current, payload);
    const nextStart = payload.startDate ?? toDateText(current.startDate);
    const nextEnd = payload.endDate ?? toDateText(current.endDate);
    assertDateRules(nextStart, nextEnd);
    await this.assertNoOverlap(current.productId, current.periodType as PeriodType, nextStart, nextEnd, id);
    const updated = await this.prisma.planningPeriod.update({ where: { id }, data: toPatchData(payload) });
    return { planningPeriod: toPlanningPeriod(updated) };
  }

  async open(id: string): Promise<PlanningPeriodDetailResponse> {
    const current = await this.find(id);
    assertTransitionAllowed(current.status as PlanningPeriodStatus, "open");
    assertDateRules(toDateText(current.startDate), toDateText(current.endDate));
    assertMeaningfulGoals(parseGoals(current.goals));
    await this.assertNoOverlap(current.productId, current.periodType as PeriodType, toDateText(current.startDate), toDateText(current.endDate), id);
    return this.transition(current, "open", "planning-period-opened");
  }

  async close(id: string): Promise<PlanningPeriodDetailResponse> {
    const current = await this.find(id);
    assertTransitionAllowed(current.status as PlanningPeriodStatus, "closed");
    return this.transition(current, "closed", "planning-period-closed");
  }

  async cancel(id: string): Promise<PlanningPeriodDetailResponse> {
    const current = await this.find(id);
    assertTransitionAllowed(current.status as PlanningPeriodStatus, "cancelled");
    return this.transition(current, "cancelled", "planning-period-cancelled");
  }

  private async transition(current: StoredPlanningPeriod, status: PlanningPeriodStatus, eventName: PlanningPeriodEventName) {
    const updated = await this.prisma.planningPeriod.update({ where: { id: current.id }, data: { status } });
    this.publish(eventName, updated);
    return { planningPeriod: toPlanningPeriod(updated) };
  }

  private async find(id: string): Promise<StoredPlanningPeriod> {
    const period = await this.prisma.planningPeriod.findUnique({ where: { id } });
    if (!period) throw planningPeriodError(HttpStatus.NOT_FOUND, "PLANNING_PERIOD_NOT_FOUND", "Planning period not found");
    return period;
  }

  private assertPatchAllowed(current: StoredPlanningPeriod, payload: PlanningPeriodPatchRequest) {
    const status = current.status as PlanningPeriodStatus;
    if (status === "closed" || status === "cancelled") {
      throw planningPeriodError(HttpStatus.CONFLICT, "STATUS_NOT_COMPATIBLE_WITH_OPERATION", "Terminal planning period cannot be edited");
    }
    if (status === "open" && payload.name !== undefined) {
      throw planningPeriodError(HttpStatus.BAD_REQUEST, "NAME_NOT_EDITABLE_IN_OPEN", "Name can be edited only while status is draft");
    }
  }

  private async assertNoOverlap(productId: string, periodType: PeriodType, startDate: string, endDate: string, excludeId?: string) {
    const overlaps = await this.prisma.planningPeriod.findMany({ where: { productId, periodType } });
    const duplicate = overlaps.find((period) => period.id !== excludeId && rangesOverlap(startDate, endDate, period.startDate, period.endDate));
    if (duplicate) {
      throw planningPeriodError(HttpStatus.CONFLICT, "DATE_CONFLICT_WITH_EXISTING_PERIOD", "Для данного уровня периода уже существует пересекающийся период");
    }
  }

  private publish(name: PlanningPeriodEventName, period: StoredPlanningPeriod) {
    this.events.publish({
      name,
      payload: {
        planningPeriodId: period.id,
        productId: period.productId,
        periodType: period.periodType as PeriodType,
        status: period.status as PlanningPeriodStatus
      }
    });
  }
}

export function assertDateRules(startDate: string, endDate: string, today = new Date()) {
  if (endDate <= startDate) {
    throw planningPeriodError(HttpStatus.BAD_REQUEST, "INVALID_DATE_RANGE", "Дата окончания должна быть позже даты начала");
  }
  if (endDate < toDateText(today)) {
    throw planningPeriodError(HttpStatus.BAD_REQUEST, "INVALID_DATE_RANGE", "Период не может полностью находиться в прошлом");
  }
}

export function assertMeaningfulGoals(goals: RichTextDocument) {
  if (extractText(goals).trim().length === 0) {
    throw planningPeriodError(HttpStatus.BAD_REQUEST, "MISSING_GOALS_FOR_OPEN", "Для открытия периода необходимо задать содержательные цели");
  }
}

function toCreateData(payload: PlanningPeriodCreateRequest, createdBy: string) {
  return {
    id: randomUUID(),
    productId: payload.productId,
    periodType: payload.periodType,
    name: payload.name,
    startDate: toDate(payload.startDate),
    endDate: toDate(payload.endDate),
    status: "draft",
    goals: JSON.stringify(payload.goals),
    createdBy,
    updatedAt: new Date()
  };
}

function toPatchData(payload: PlanningPeriodPatchRequest) {
  return {
    ...(payload.name === undefined ? {} : { name: payload.name }),
    ...(payload.startDate === undefined ? {} : { startDate: toDate(payload.startDate) }),
    ...(payload.endDate === undefined ? {} : { endDate: toDate(payload.endDate) }),
    ...(payload.goals === undefined ? {} : { goals: JSON.stringify(payload.goals) })
  };
}

function toWhere(query: PlanningPeriodListQuery) {
  return {
    productId: query.productId,
    ...(query.periodType === undefined ? {} : { periodType: query.periodType }),
    ...(query.status === undefined ? {} : { status: query.status })
  };
}

function toPlanningPeriod(period: StoredPlanningPeriod): PlanningPeriod {
  return { ...toSummary(period), goals: parseGoals(period.goals) };
}

function toSummary(period: StoredPlanningPeriod) {
  return {
    id: period.id,
    productId: period.productId,
    periodType: period.periodType as PeriodType,
    name: period.name,
    startDate: toDateText(period.startDate),
    endDate: toDateText(period.endDate),
    status: period.status as PlanningPeriodStatus,
    createdBy: period.createdBy,
    createdAt: period.createdAt.toISOString(),
    updatedAt: period.updatedAt.toISOString()
  };
}

function parseGoals(raw: string): RichTextDocument {
  return JSON.parse(raw) as RichTextDocument;
}

function extractText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(extractText).join(" ");
  if (typeof value === "object" && value !== null) return textValues(value).map(extractText).join(" ");
  return "";
}

function textValues(value: object): unknown[] {
  return Object.entries(value).filter(([key]) => key !== "type").map(([, entry]) => entry);
}

function rangesOverlap(startDate: string, endDate: string, storedStart: Date, storedEnd: Date): boolean {
  return startDate < toDateText(storedEnd) && endDate > toDateText(storedStart);
}

function toDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

function toDateText(date: Date): string {
  return date.toISOString().slice(0, 10);
}
