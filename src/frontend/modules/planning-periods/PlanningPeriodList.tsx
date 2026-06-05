import type { PlanningPeriodSummary } from "./types";

type Props = {
  items: PlanningPeriodSummary[];
  selectedId: string | null;
  onCreate: () => void;
  onSelect: (period: PlanningPeriodSummary) => void;
};

export function PlanningPeriodList({ items, selectedId, onCreate, onSelect }: Props) {
  if (items.length === 0) {
    return (
      <section className="empty-state">
        <h2>Периодов планирования пока нет</h2>
        <p>Создайте первый период, чтобы зафиксировать даты, цели и lifecycle подготовки.</p>
        <button className="primary-button" type="button" onClick={onCreate}>Создать период планирования</button>
      </section>
    );
  }

  return (
    <section className="period-list" aria-label="Периоды планирования">
      <button className="primary-button" type="button" onClick={onCreate}>Создать период планирования</button>
      {items.map((period) => (
        <button className={period.id === selectedId ? "period-row selected" : "period-row"} key={period.id} onClick={() => onSelect(period)}>
          <span>
            <strong>{period.name}</strong>
            <small>{period.startDate} - {period.endDate}</small>
          </span>
          <span className={`status-badge ${period.status}`}>{period.status}</span>
        </button>
      ))}
    </section>
  );
}
