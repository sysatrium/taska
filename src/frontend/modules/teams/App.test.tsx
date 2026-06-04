import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";

describe("team profile UI", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("loads the catalog, creates a team, and shows it in the list", async () => {
    const fetchMock = vi.fn(mockFetch);
    vi.stubGlobal("fetch", fetchMock);
    render(<App />);

    expect(await screen.findByText("Команд пока нет")).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Название команды"), { target: { value: "Platform Team" } });
    fireEvent.click(screen.getByLabelText("Backend Development"));
    fireEvent.click(screen.getByRole("button", { name: "Сохранить глобальный профиль" }));

    expect(await screen.findByText("Platform Team")).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/teams",
      expect.objectContaining({ method: "POST" })
    );
    await waitFor(() => expect(screen.queryByText("Сохраняем...")).toBeNull());
  });
});

async function mockFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = input.toString();
  if (url === "/api/competencies") return json({ items: competencyItems });
  if (url === "/api/teams" && !init) return json({ items: [] });
  if (url === "/api/teams" && init?.method === "POST") return json(createdTeam);
  return json({ code: "not_found", message: "Unhandled mock route" }, 404);
}

const competencyItems = [
  { id: "backend-development", name: "Backend Development", isSelectable: true, source: "seeded" }
];

const createdTeam = {
  id: "team_1",
  name: "Platform Team",
  ownerRole: "team-lead",
  competencyIds: ["backend-development"],
  createdAt: "2026-05-31T00:00:00.000Z",
  updatedAt: "2026-05-31T00:00:00.000Z"
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
