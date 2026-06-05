import { useEffect, useState } from "react";
import { PlanningPeriodsApp } from "../planning-periods/PlanningPeriodsApp";
import { createTeam, listCompetencies, listTeams, patchTeam } from "./teamApi";
import { TeamForm } from "./teamForm";
import { TeamList } from "./teamList";
import type { ApiError, Competency, Team, TeamPayload } from "./types";

export function App() {
  const [section, setSection] = useState<"teams" | "periods">("teams");
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selected, setSelected] = useState<Team | null>(null);
  const [userRole, setUserRole] = useState("team-lead");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    loadInitial(setCompetencies, setTeams, setLoading, setError);
  }, []);

  async function save(payload: TeamPayload) {
    setSaving(true);
    setError(null);
    try {
      const saved = selected ? await patchTeam(selected, payload, userRole) : await createTeam(payload, userRole);
      setTeams(upsertTeam(teams, saved));
      setSelected(saved);
    } catch (caught) {
      setError(caught as ApiError);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="app-shell">
      <header className="top-bar">
        <div>
          <h1>Подготовка планирования</h1>
          <p>Глобальные planning entities для периода: команды и периоды планирования.</p>
        </div>
        <label>
          Роль пользователя
          <select value={userRole} onChange={(event) => setUserRole(event.target.value)}>
            <option value="team-lead">Team Lead</option>
            <option value="head-of-product">Head of Product</option>
            <option value="viewer">Read-only stakeholder</option>
          </select>
        </label>
      </header>
      <nav className="section-tabs" aria-label="Разделы подготовки планирования">
        <button className={section === "teams" ? "selected" : ""} type="button" onClick={() => setSection("teams")}>Команды</button>
        <button className={section === "periods" ? "selected" : ""} type="button" onClick={() => setSection("periods")}>Периоды планирования</button>
      </nav>
      {section === "teams" ? (
        <>
          <h2>Глобальные команды</h2>
          {loading ? <p className="status-line">Загрузка команд и справочника компетенций...</p> : null}
          {error && !saving ? <p className="error-message">{error.message}</p> : null}
          <section className="workspace">
            <TeamList teams={teams} competencies={competencies} selectedId={selected?.id ?? null} onSelect={setSelected} />
            <TeamForm competencies={competencies} selected={selected} saving={saving} error={error} onCancel={() => setSelected(null)} onSubmit={save} />
          </section>
        </>
      ) : <PlanningPeriodsApp />}
    </main>
  );
}

async function loadInitial(
  setCompetencies: (items: Competency[]) => void,
  setTeams: (items: Team[]) => void,
  setLoading: (value: boolean) => void,
  setError: (value: ApiError | null) => void
) {
  try {
    const [competencyItems, teamItems] = await Promise.all([listCompetencies(), listTeams()]);
    setCompetencies(competencyItems);
    setTeams(teamItems);
  } catch (caught) {
    setError(caught as ApiError);
  } finally {
    setLoading(false);
  }
}

function upsertTeam(teams: Team[], saved: Team): Team[] {
  const exists = teams.some((team) => team.id === saved.id);
  return exists ? teams.map((team) => (team.id === saved.id ? saved : team)) : [...teams, saved];
}
