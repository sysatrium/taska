import { Inject, Injectable } from "@nestjs/common";
import { SEEDED_COMPETENCIES } from "./competency-seed";
import type { Competency, CompetencyListResponse } from "./competency.types";
import { PrismaService } from "../persistence/prisma.service";

@Injectable()
export class CompetencyService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async list(): Promise<CompetencyListResponse> {
    const stored = await this.prisma.competency.findMany({ orderBy: { name: "asc" } });
    return { items: stored.length > 0 ? stored.map(toCompetency) : sortedSeed() };
  }

  async exists(ids: string[]): Promise<boolean> {
    const found = await this.prisma.competency.count({ where: { id: { in: ids }, isSelectable: true } });
    return found === ids.length;
  }
}

function sortedSeed(): Competency[] {
  return [...SEEDED_COMPETENCIES].sort((left, right) => left.name.localeCompare(right.name));
}

function toCompetency(value: { id: string; name: string; isSelectable: boolean; source: string }): Competency {
  return { id: value.id, name: value.name, isSelectable: true, source: "seeded" };
}
