import { type FormEvent, useEffect, useMemo, useState } from "react";
import type { ApiError, Competency, Team, TeamPayload } from "./types";

type Props = {
  competencies: Competency[];
  selected: Team | null;
  saving: boolean;
  error: ApiError | null;
  onCancel: () => void;
  onSubmit: (payload: TeamPayload) => void;
};

const EMPTY_FORM: TeamPayload = { name: "", ownerRole: "team-lead", competencyIds: [] };

export function TeamForm(props: Props) {
  const [form, setForm] = useState<TeamPayload>(EMPTY_FORM);
  const isEditing = props.selected !== null;
  const canSubmit = form.name.trim() && form.ownerRole.trim() && form.competencyIds.length > 0;

  useEffect(() => {
    setForm(props.selected ? teamToPayload(props.selected) : EMPTY_FORM);
  }, [props.selected]);

  const title = useMemo(() => (isEditing ? "Редактировать команду" : "Создать команду"), [isEditing]);

  return (
    <form className="team-form" onSubmit={(event) => submit(event, form, props.onSubmit)}>
      <div className="form-header">
        <h2>{title}</h2>
        {isEditing ? <button type="button" onClick={props.onCancel}>Новая команда</button> : null}
      </div>
      <label>
        Название команды
        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
      </label>
      <label>
        Ответственная роль
        <select value={form.ownerRole} onChange={(event) => setForm({ ...form, ownerRole: event.target.value })}>
          <option value="team-lead">Team Lead</option>
          <option value="head-of-product">Head of Product</option>
        </select>
      </label>
      <fieldset>
        <legend>Компетенции</legend>
        <div className="competency-grid">
          {props.competencies.map((competency) => (
            <label className="check-option" key={competency.id}>
              <input
                type="checkbox"
                checked={form.competencyIds.includes(competency.id)}
                onChange={() => setForm(toggleCompetency(form, competency.id))}
              />
              {competency.name}
            </label>
          ))}
        </div>
      </fieldset>
      {props.error ? <p className="error-message">{formatError(props.error)}</p> : null}
      <button className="primary-button" disabled={!canSubmit || props.saving} type="submit">
        {props.saving ? "Сохраняем..." : "Сохранить глобальный профиль"}
      </button>
    </form>
  );
}

function submit(event: FormEvent, form: TeamPayload, onSubmit: (payload: TeamPayload) => void) {
  event.preventDefault();
  onSubmit({ ...form, name: form.name.trim(), ownerRole: form.ownerRole.trim() });
}

function toggleCompetency(form: TeamPayload, competencyId: string): TeamPayload {
  const exists = form.competencyIds.includes(competencyId);
  const competencyIds = exists
    ? form.competencyIds.filter((id) => id !== competencyId)
    : [...form.competencyIds, competencyId];
  return { ...form, competencyIds };
}

function teamToPayload(team: Team): TeamPayload {
  return { name: team.name, ownerRole: team.ownerRole, competencyIds: team.competencyIds };
}

function formatError(error: ApiError): string {
  const details = error.details?.map((detail) => `${detail.field}: ${detail.issue}`).join("; ");
  return details ? `${error.message}. ${details}` : error.message;
}
