import { Module } from "@nestjs/common";
import { CompetencyController } from "./competencies/competency.controller";
import { CompetencyService } from "./competencies/competency.service";
import { PrismaService } from "./persistence/prisma.service";
import { PlanningPeriodController } from "./planning-periods/planning-period.controller";
import { PlanningPeriodEventPublisher } from "./planning-periods/planning-period.events";
import { PlanningPeriodService } from "./planning-periods/planning-period.service";
import { TeamController } from "./teams/team.controller";
import { TeamService } from "./teams/team.service";

@Module({
  controllers: [CompetencyController, TeamController, PlanningPeriodController],
  providers: [PrismaService, CompetencyService, TeamService, PlanningPeriodService, PlanningPeriodEventPublisher]
})
export class AppModule {}
