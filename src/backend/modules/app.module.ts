import { Module } from "@nestjs/common";
import { CompetencyController } from "./competencies/competency.controller";
import { CompetencyService } from "./competencies/competency.service";
import { PrismaService } from "./persistence/prisma.service";
import { TeamController } from "./teams/team.controller";
import { TeamService } from "./teams/team.service";

@Module({
  controllers: [CompetencyController, TeamController],
  providers: [PrismaService, CompetencyService, TeamService]
})
export class AppModule {}
