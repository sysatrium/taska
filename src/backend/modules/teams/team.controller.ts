import { Body, Controller, Get, Headers, Inject, Param, Patch, Post } from "@nestjs/common";
import { assertAllowedRole, parseCreateRequest, parsePatchRequest } from "./team.validation";
import { TeamService } from "./team.service";
import type { Team, TeamListResponse } from "./team.types";

@Controller("/api/teams")
export class TeamController {
  constructor(@Inject(TeamService) private readonly teams: TeamService) {}

  @Post()
  async create(@Body() body: unknown, @Headers("x-user-role") role?: string): Promise<Team> {
    assertAllowedRole(role);
    return this.teams.create(parseCreateRequest(body));
  }

  @Get()
  async list(): Promise<TeamListResponse> {
    return this.teams.list();
  }

  @Get(":teamId")
  async get(@Param("teamId") teamId: string): Promise<Team> {
    return this.teams.get(teamId);
  }

  @Patch(":teamId")
  async patch(
    @Param("teamId") teamId: string,
    @Body() body: unknown,
    @Headers("x-user-role") role?: string,
    @Headers("if-match") expectedVersion?: string
  ): Promise<Team> {
    assertAllowedRole(role);
    return this.teams.patch(teamId, parsePatchRequest(body), expectedVersion);
  }
}
