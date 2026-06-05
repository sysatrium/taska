import { HttpException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import type { PrismaService } from "../persistence/prisma.service";
import { PlanningPeriodEventPublisher } from "./planning-period.events";
import { PlanningPeriodService } from "./planning-period.service";

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

const VALID_GOALS = { type: "doc", content: [{ type: "heading", text: "Grow adoption" }, { type: "listItem", text: "Reduce overload" }] };

function makeService(existing: StoredPlanningPeriod[] = []) {
  const periods = [...existing];
  const events = new PlanningPeriodEventPublisher();
  const prisma = {
    planningPeriod: {
      count: async ({ where }: { where: Partial<StoredPlanningPeriod> }) => filter(periods, where).length,
      findMany: async ({ where }: { where: Partial<StoredPlanningPeriod> }) => filter(periods, where),
      findUnique: async ({ where }: { where: { id: string } }) => periods.find((period) => period.id === where.id) ?? null,
      create: async ({ data }: { data: Omit<StoredPlanningPeriod, "createdAt"> }) => {
        const stored = { ...data, createdAt: new Date("2026-06-05T00:00:00.000Z") };
        periods.push(stored);
        return stored;
      },
      update: async ({ where, data }: { where: { id: string }; data: Partial<StoredPlanningPeriod> }) => {
        const index = periods.findIndex((period) => period.id === where.id);
        periods[index] = { ...periods[index], ...data, updatedAt: new Date("2026-06-05T01:00:00.000Z") };
        return periods[index];
      }
    }
  };
  return { service: new PlanningPeriodService(prisma as unknown as PrismaService, events), events, periods };
}

describe("PlanningPeriodService", () => {
  it("creates a draft period with structured goals and emits created event", async () => {
    const { service, events } = makeService();
    const response = await service.create(validPayload(), "head-of-product");

    expect(response.planningPeriod).toMatchObject({ status: "draft", goals: VALID_GOALS });
    expect(events.published[0]).toMatchObject({ name: "planning-period-created", payload: { status: "draft" } });
  });

  it("allows only draft to open, draft to cancel, and open to close", async () => {
    const draft = storedPeriod({ id: "draft", status: "draft" });
    const { service, events } = makeService([draft]);

    await expect(service.open("draft")).resolves.toMatchObject({ planningPeriod: { status: "open" } });
    await expect(service.close("draft")).resolves.toMatchObject({ planningPeriod: { status: "closed" } });
    await expect(service.open("draft")).rejects.toThrow();
    expect(events.published.map((event) => event.name)).toEqual(["planning-period-opened", "planning-period-closed"]);
  });

  it("emits cancelled event when a draft period is cancelled", async () => {
    const { service, events } = makeService([storedPeriod({ status: "draft" })]);

    await expect(service.cancel("period-1")).resolves.toMatchObject({ planningPeriod: { status: "cancelled" } });
    expect(events.published[0]).toMatchObject({ name: "planning-period-cancelled", payload: { status: "cancelled" } });
  });

  it("prevents cancelled and closed periods from returning to work", async () => {
    const cancelled = storedPeriod({ id: "cancelled", status: "cancelled" });
    const closed = storedPeriod({ id: "closed", status: "closed" });
    const { service } = makeService([cancelled, closed]);

    await expectErrorMessage(service.open("cancelled"), "Отменённый период нельзя вернуть в работу");
    await expectErrorMessage(service.open("closed"), "Закрытый период является зафиксированным историческим объектом");
  });

  it("rejects invalid date ranges and fully past periods on create", async () => {
    const { service } = makeService();
    await expectErrorMessage(service.create(validPayload({ endDate: "2026-07-01" }), "head-of-product"), "Дата окончания должна быть позже");
    await expectErrorMessage(service.create(validPayload({ startDate: "2020-01-01", endDate: "2020-02-01" }), "head-of-product"), "прошлом");
  });

  it("rejects overlapping periods for the same product and period type", async () => {
    const existing = storedPeriod({ startDate: "2026-07-01", endDate: "2026-09-30" });
    const { service } = makeService([existing]);

    await expectErrorMessage(service.create(validPayload({ startDate: "2026-08-01", endDate: "2026-10-01" }), "head-of-product"), "пересекающийся");
  });

  it("allows overlapping dates for a different period type", async () => {
    const existing = storedPeriod({ periodType: "year", startDate: "2026-01-01", endDate: "2026-12-31" });
    const { service } = makeService([existing]);

    await expect(service.create(validPayload({ periodType: "quarter" }), "head-of-product")).resolves.toMatchObject({
      planningPeriod: { status: "draft" }
    });
  });

  it("rejects open when goals are semantically empty after trimming", async () => {
    const emptyGoals = { type: "doc", content: [{ type: "paragraph", text: "   \n " }] };
    const { service } = makeService([storedPeriod({ goals: emptyGoals })]);

    await expectErrorMessage(service.open("period-1"), "содержательные цели");
  });

  it("keeps goals editable in open but rejects name edits", async () => {
    const { service } = makeService([storedPeriod({ status: "open" })]);
    await expectErrorMessage(service.patch("period-1", { name: "Renamed" }), "Name can be edited only");
    await expect(service.patch("period-1", { goals: { type: "doc", content: [{ type: "paragraph", text: "Updated" }] } })).resolves.toMatchObject({
      planningPeriod: { status: "open", goals: { type: "doc" } }
    });
  });
});

function validPayload(overrides: Partial<Parameters<PlanningPeriodService["create"]>[0]> = {}) {
  return {
    productId: "product-alpha",
    periodType: "quarter" as const,
    name: "Q3 Planning",
    startDate: "2026-07-01",
    endDate: "2026-09-30",
    goals: VALID_GOALS,
    ...overrides
  };
}

type StoredPlanningPeriodOverride = Partial<Omit<StoredPlanningPeriod, "startDate" | "endDate" | "goals">> & {
  startDate?: string | Date;
  endDate?: string | Date;
  goals?: unknown;
};

function storedPeriod(overrides: StoredPlanningPeriodOverride = {}): StoredPlanningPeriod {
  const base: StoredPlanningPeriod = {
    id: "period-1",
    productId: "product-alpha",
    periodType: "quarter",
    name: "Q3 Planning",
    startDate: new Date("2026-07-01T00:00:00.000Z"),
    endDate: new Date("2026-09-30T00:00:00.000Z"),
    status: "draft",
    goals: JSON.stringify(VALID_GOALS),
    createdBy: "head-of-product",
    createdAt: new Date("2026-06-05T00:00:00.000Z"),
    updatedAt: new Date("2026-06-05T00:00:00.000Z")
  };
  return { ...base, ...normalizedOverrides(overrides) };
}

function normalizedOverrides(overrides: StoredPlanningPeriodOverride): Partial<StoredPlanningPeriod> {
  const { startDate, endDate, goals, ...plain } = overrides;
  return {
    ...plain,
    ...(typeof startDate === "string" ? { startDate: new Date(`${startDate}T00:00:00.000Z`) } : {}),
    ...(startDate instanceof Date ? { startDate } : {}),
    ...(typeof endDate === "string" ? { endDate: new Date(`${endDate}T00:00:00.000Z`) } : {}),
    ...(endDate instanceof Date ? { endDate } : {}),
    ...(typeof goals === "string" ? { goals } : {}),
    ...(typeof goals === "object" ? { goals: JSON.stringify(goals) } : {})
  };
}

function filter(items: StoredPlanningPeriod[], where: Partial<StoredPlanningPeriod>) {
  return items.filter((item) => Object.entries(where).every(([key, value]) => value === undefined || item[key as keyof StoredPlanningPeriod] === value));
}

async function expectErrorMessage(action: Promise<unknown>, message: string) {
  try {
    await action;
    throw new Error("Expected action to fail");
  } catch (caught) {
    expect(caught).toBeInstanceOf(HttpException);
    const response = (caught as HttpException).getResponse() as { error: { message: string } };
    expect(response.error.message).toContain(message);
  }
}
