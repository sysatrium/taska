import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { PrismaService } from "../persistence/prisma.service";
import { apiError } from "../shared/errors";
import type { Team, TeamCreateRequest, TeamListResponse, TeamPatchRequest } from "./team.types";

type StoredTeam = {
  id: string;
  name: string;
  ownerRole: string;
  competencyIds: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class TeamService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(payload: TeamCreateRequest): Promise<Team> {
    await this.assertKnownCompetencies(payload.competencyIds);
    await this.assertUniqueName(payload.name);
    const created = await this.prisma.team.create({ data: toCreateData(payload) });
    return toTeam(created);
  }

  async list(): Promise<TeamListResponse> {
    const teams = await this.prisma.team.findMany({ orderBy: { name: "asc" } });
    return { items: teams.map(toTeam) };
  }

  async get(teamId: string): Promise<Team> {
    const team = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!team) throw notFound();
    return toTeam(team);
  }

  async patch(teamId: string, payload: TeamPatchRequest, expectedVersion?: string): Promise<Team> {
    const current = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!current) throw notFound();
    this.assertFresh(current, expectedVersion);
    if (payload.competencyIds) await this.assertKnownCompetencies(payload.competencyIds);
    if (payload.name && payload.name !== current.name) await this.assertUniqueName(payload.name);
    const updated = await this.prisma.team.update({ where: { id: teamId }, data: toPatchData(payload) });
    return toTeam(updated);
  }

  private async assertKnownCompetencies(ids: string[]) {
    const found = await this.prisma.competency.count({ where: { id: { in: ids }, isSelectable: true } });
    if (found !== ids.length) {
      throw apiError(HttpStatus.UNPROCESSABLE_ENTITY, "unknown_competency", "Unknown competency id", [
        { field: "competencyIds", issue: "All competencies must exist in centralized catalog" }
      ]);
    }
  }

  private async assertUniqueName(name: string) {
    const duplicate = await this.prisma.team.findUnique({ where: { name } });
    if (duplicate) throw apiError(HttpStatus.CONFLICT, "duplicate_team", "Obvious duplicate team detected");
  }

  private assertFresh(current: StoredTeam, expectedVersion?: string) {
    if (!expectedVersion) return;
    if (expectedVersion !== current.updatedAt.toISOString()) {
      throw apiError(HttpStatus.CONFLICT, "team_update_conflict", "Team profile changed since it was loaded");
    }
  }
}

function toCreateData(payload: TeamCreateRequest) {
  return {
    id: `team_${randomUUID()}`,
    name: payload.name,
    ownerRole: payload.ownerRole,
    competencyIds: JSON.stringify(payload.competencyIds),
    updatedAt: new Date()
  };
}

function toPatchData(payload: TeamPatchRequest) {
  return {
    ...(payload.name === undefined ? {} : { name: payload.name }),
    ...(payload.ownerRole === undefined ? {} : { ownerRole: payload.ownerRole }),
    ...(payload.competencyIds === undefined ? {} : { competencyIds: JSON.stringify(payload.competencyIds) })
  };
}

function toTeam(team: StoredTeam): Team {
  return {
    id: team.id,
    name: team.name,
    ownerRole: team.ownerRole,
    competencyIds: JSON.parse(team.competencyIds) as string[],
    createdAt: team.createdAt.toISOString(),
    updatedAt: team.updatedAt.toISOString()
  };
}

function notFound() {
  return apiError(HttpStatus.NOT_FOUND, "team_not_found", "Team not found");
}
