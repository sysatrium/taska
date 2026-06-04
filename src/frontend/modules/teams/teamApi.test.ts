import { afterEach, describe, expect, it, vi } from "vitest";
import { createTeam, patchTeam } from "./teamApi";
import type { Team } from "./types";

const savedTeam: Team = {
  id: "team_1",
  name: "Core",
  ownerRole: "team-lead",
  competencyIds: ["backend-development"],
  createdAt: "2026-05-31T00:00:00.000Z",
  updatedAt: "2026-05-31T01:00:00.000Z"
};

describe("team API client", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends the selected user role when creating a team", async () => {
    const fetchMock = vi.fn(async () => response(savedTeam));
    vi.stubGlobal("fetch", fetchMock);

    await createTeam({ name: "Core", ownerRole: "team-lead", competencyIds: ["backend-development"] }, "team-lead");

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/teams",
      expect.objectContaining({ headers: expect.objectContaining({ "X-User-Role": "team-lead" }) })
    );
  });

  it("sends updatedAt as If-Match for conflict detection", async () => {
    const fetchMock = vi.fn(async () => response(savedTeam));
    vi.stubGlobal("fetch", fetchMock);

    await patchTeam(savedTeam, { name: "Core", ownerRole: "team-lead", competencyIds: ["backend-development"] }, "team-lead");

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/teams/team_1",
      expect.objectContaining({ headers: expect.objectContaining({ "If-Match": savedTeam.updatedAt }) })
    );
  });
});

function response(body: Team): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
