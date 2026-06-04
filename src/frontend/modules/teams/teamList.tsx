import type { Competency, Team } from "./types";

type Props = {
  teams: Team[];
  competencies: Competency[];
  selectedId: string | null;
  onSelect: (team: Team) => void;
};

export function TeamList({ teams, competencies, selectedId, onSelect }: Props) {
  if (teams.length === 0) {
    return (
      <section className="empty-state">
        <h2>Команд пока нет</h2>
        <p>Создайте первый глобальный профиль команды для следующих planning-сценариев.</p>
      </section>
    );
  }

  return (
    <section className="team-list" aria-label="Глобальные профили команд">
      {teams.map((team) => (
        <button className={team.id === selectedId ? "team-row selected" : "team-row"} key={team.id} onClick={() => onSelect(team)}>
          <span>
            <strong>{team.name}</strong>
            <small>{team.ownerRole}</small>
          </span>
          <span className="badge">{labels(team.competencyIds, competencies)}</span>
        </button>
      ))}
    </section>
  );
}

function labels(ids: string[], competencies: Competency[]): string {
  const names = ids.map((id) => competencies.find((competency) => competency.id === id)?.name ?? id);
  return names.join(", ");
}
