import { Controller, Get, Inject } from "@nestjs/common";
import { CompetencyService } from "./competency.service";
import type { CompetencyListResponse } from "./competency.types";

@Controller("/api/competencies")
export class CompetencyController {
  constructor(@Inject(CompetencyService) private readonly competencies: CompetencyService) {}

  @Get()
  async list(): Promise<CompetencyListResponse> {
    return this.competencies.list();
  }
}
