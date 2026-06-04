import { describe, expect, it } from "vitest";
import type { PrismaService } from "../persistence/prisma.service";
import { TeamService } from "./team.service";

type StoredTeam = {
  id: string;
  name: string;
  ownerRole: string;
  competencyIds: string;
  createdAt: Date;
  updatedAt: Date;
};

function makeService(existingTeams: StoredTeam[] = []) {
  const teams = [...existingTeams];
  const competencies = [{ id: "backend-development" }, { id: "qa-testing" }];
  const prisma = {
    competency: {
      count: async ({ where }: { where: { id: { in: string[] } } }) =>
        competencies.filter((item) => where.id.in.includes(item.id)).length
    },
    team: {
      create: async ({ data }: { data: Omit<StoredTeam, "createdAt"> }) => {
        const stored = { ...data, createdAt: new Date("2026-05-31T00:00:00.000Z") };
        teams.push(stored);
        return stored;
      },
      findMany: async () => teams,
      findUnique: async ({ where }: { where: { id?: string; name?: string } }) =>
        teams.find((team) => team.id === where.id || team.name === where.name) ?? null,
      update: async ({ where, data }: { where: { id: string }; data: Partial<StoredTeam> }) => {
        const index = teams.findIndex((team) => team.id === where.id);
        teams[index] = { ...teams[index], ...data, updatedAt: new Date("2026-05-31T01:00:00.000Z") };
        return teams[index];
      }
    }
  };
  return new TeamService(prisma as unknown as PrismaService);
}

describe("TeamService", () => {
  it("creates a global team without period-specific fields", async () => {
    const service = makeService();
    const team = await service.create({
      name: "Payments Platform",
      ownerRole: "team-lead",
      competencyIds: ["backend-development"]
    });

    expect(team).toMatchObject({ name: "Payments Platform", competencyIds: ["backend-development"] });
    expect("planningPeriodId" in team).toBe(false);
  });

  it("rejects unknown competency ids", async () => {
    const service = makeService();
    await expect(
      service.create({ name: "Payments", ownerRole: "team-lead", competencyIds: ["unknown"] })
    ).rejects.toThrow();
  });

  it("prevents stale concurrent updates when If-Match is stale", async () => {
    const stored = {
      id: "team_1",
      name: "Core",
      ownerRole: "team-lead",
      competencyIds: JSON.stringify(["backend-development"]),
      createdAt: new Date("2026-05-31T00:00:00.000Z"),
      updatedAt: new Date("2026-05-31T01:00:00.000Z")
    };
    const service = makeService([stored]);

    await expect(
      service.patch("team_1", { name: "Core Updated" }, "2026-05-31T00:00:00.000Z")
    ).rejects.toThrow();
  });
});
