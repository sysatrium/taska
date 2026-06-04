import type { ApiError, Competency, Team, TeamPayload } from "./types";

const ROLE_HEADER = "X-User-Role";

export async function listCompetencies(): Promise<Competency[]> {
  const response = await fetch("/api/competencies");
  const data = await readResponse<{ items: Competency[] }>(response);
  return data.items;
}

export async function listTeams(): Promise<Team[]> {
  const response = await fetch("/api/teams");
  const data = await readResponse<{ items: Team[] }>(response);
  return data.items;
}

export async function createTeam(payload: TeamPayload, userRole: string): Promise<Team> {
  const response = await fetch("/api/teams", request("POST", payload, userRole));
  return readResponse<Team>(response);
}

export async function patchTeam(team: Team, payload: TeamPayload, userRole: string): Promise<Team> {
  const init = request("PATCH", payload, userRole);
  init.headers = { ...init.headers, "If-Match": team.updatedAt };
  const response = await fetch(`/api/teams/${team.id}`, init);
  return readResponse<Team>(response);
}

function request(method: "POST" | "PATCH", payload: TeamPayload, userRole: string): RequestInit {
  return {
    method,
    headers: { "Content-Type": "application/json", [ROLE_HEADER]: userRole },
    body: JSON.stringify(payload)
  };
}

async function readResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T | ApiError;
  if (!response.ok) throw data;
  return data as T;
}
