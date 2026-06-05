import { type FormEvent, useEffect, useState } from "react";
import { goalsDocumentToText, isGoalsDocumentEmpty, textToGoalsDocument } from "./goalsDocument";
import { GoalsPreview } from "./GoalsPreview";
import type { ApiError, PeriodType, PlanningPeriod, PlanningPeriodPatch, PlanningPeriodPayload } from "./types";

type Props = {
  selected: PlanningPeriod | null;
  saving: boolean;
  error: ApiError | null;
  onCreate: (payload: PlanningPeriodPayload) => void;
  onPatch: (id: string, payload: PlanningPeriodPatch) => void;
  onTransition: (id: string, action: "open" | "close" | "cancel") => void;
};

const EMPTY_FORM = {
  name: "",
  periodType: "quarter" as PeriodType,
  startDate: "",
  endDate: "",
  goalsText: ""
};

export function PlanningPeriodDetails(props: Props) {
  const [form, setForm] = useState(EMPTY_FORM);
  const selected = props.selected;
  const canEditName = selected?.status !== "open";
  const canEdit = selected?.status !== "closed" && selected?.status !== "cancelled";

  useEffect(() => {
    setForm(selected ? toForm(selected) : EMPTY_FORM);
  }, [selected]);

  return (
    <form className="period-details" onSubmit={(event) => submit(event, form, selected, props.onCreate, props.onPatch)}>
      <div className="form-header">
        <h2>{selected ? "Details planning period" : "Создать planning period"}</h2>
        {selected ? <span className={`status-badge ${selected.status}`}>{selected.status}</span> : null}
      </div>
      <MetadataFields form={form} isEditing={selected !== null} canEditName={canEditName} canEdit={canEdit} onChange={setForm} />
      <label>
        Goals
        <textarea
          value={form.goalsText}
          disabled={!canEdit}
          onChange={(event) => setForm({ ...form, goalsText: event.target.value })}
          placeholder="# Outcome&#10;- measurable goal&#10;Planning context"
        />
      </label>
      <GoalsPreview document={textToGoalsDocument(form.goalsText)} />
      {selected?.status === "draft" ? <ReadinessHints form={form} /> : null}
      <Metadata selected={selected} />
      {props.error ? <p className="error-message">{formatError(props.error)}</p> : null}
      <Actions selected={selected} saving={props.saving} canEdit={canEdit} onTransition={props.onTransition} />
    </form>
  );
}

function MetadataFields({ form, isEditing, canEditName, canEdit, onChange }: {
  form: typeof EMPTY_FORM;
  isEditing: boolean;
  canEditName: boolean;
  canEdit: boolean;
  onChange: (form: typeof EMPTY_FORM) => void;
}) {
  return (
    <div className="period-field-grid">
      <label>
        Название периода
        <input value={form.name} disabled={!canEdit || !canEditName} onChange={(event) => onChange({ ...form, name: event.target.value })} />
      </label>
      <label>
        Уровень периода
        <select value={form.periodType} disabled={isEditing} onChange={(event) => onChange({ ...form, periodType: event.target.value as PeriodType })}>
          <option value="sprint">Sprint</option>
          <option value="month">Month</option>
          <option value="quarter">Quarter</option>
          <option value="year">Year</option>
        </select>
      </label>
      <label>
        Дата начала
        <input type="date" value={form.startDate} disabled={!canEdit} onChange={(event) => onChange({ ...form, startDate: event.target.value })} />
      </label>
      <label>
        Дата окончания
        <input type="date" value={form.endDate} disabled={!canEdit} onChange={(event) => onChange({ ...form, endDate: event.target.value })} />
      </label>
    </div>
  );
}

function ReadinessHints({ form }: { form: typeof EMPTY_FORM }) {
  const validDates = form.startDate.length > 0 && form.endDate.length > 0 && form.endDate > form.startDate;
  const goalsReady = !isGoalsDocumentEmpty(textToGoalsDocument(form.goalsText));
  const datesPresent = form.startDate.length > 0 && form.endDate.length > 0;
  return (
    <section className="readiness-panel" aria-label="Readiness hints">
      <p className={goalsReady ? "hint ready" : "hint"}>{goalsReady ? "Goals заполнены" : "Goals нужно заполнить"}</p>
      <p className={datesPresent ? "hint ready" : "hint"}>{datesPresent ? "Дата начала и окончания заданы" : "Нужны дата начала и окончания"}</p>
      <p className={validDates ? "hint ready" : "hint"}>{validDates ? "Диапазон дат корректен" : "Дата окончания должна быть позже начала"}</p>
    </section>
  );
}

function Metadata({ selected }: { selected: PlanningPeriod | null }) {
  if (!selected) return null;
  return (
    <dl className="metadata-grid">
      <div><dt>Created by</dt><dd>{selected.createdBy}</dd></div>
      <div><dt>Created at</dt><dd>{new Date(selected.createdAt).toLocaleString()}</dd></div>
      <div><dt>Updated at</dt><dd>{new Date(selected.updatedAt).toLocaleString()}</dd></div>
    </dl>
  );
}

function Actions({ selected, saving, canEdit, onTransition }: {
  selected: PlanningPeriod | null;
  saving: boolean;
  canEdit: boolean;
  onTransition: (id: string, action: "open" | "close" | "cancel") => void;
}) {
  return (
    <div className="action-row">
      <button className="primary-button" disabled={saving || !canEdit} type="submit">{saving ? "Сохраняем..." : "Сохранить"}</button>
      {selected?.status === "draft" ? <button type="button" onClick={() => onTransition(selected.id, "open")}>Open</button> : null}
      {selected?.status === "draft" ? <button type="button" onClick={() => onTransition(selected.id, "cancel")}>Cancel</button> : null}
      {selected?.status === "open" ? <button type="button" onClick={() => onTransition(selected.id, "close")}>Close</button> : null}
    </div>
  );
}

function submit(
  event: FormEvent,
  form: typeof EMPTY_FORM,
  selected: PlanningPeriod | null,
  onCreate: (payload: PlanningPeriodPayload) => void,
  onPatch: (id: string, payload: PlanningPeriodPatch) => void
) {
  event.preventDefault();
  const goals = textToGoalsDocument(form.goalsText);
  if (selected?.status === "open") onPatch(selected.id, { startDate: form.startDate, endDate: form.endDate, goals });
  else if (selected) onPatch(selected.id, { name: form.name, startDate: form.startDate, endDate: form.endDate, goals });
  else onCreate({ productId: "product-alpha", periodType: form.periodType, name: form.name, startDate: form.startDate, endDate: form.endDate, goals });
}

function toForm(period: PlanningPeriod): typeof EMPTY_FORM {
  return { name: period.name, periodType: period.periodType, startDate: period.startDate, endDate: period.endDate, goalsText: goalsDocumentToText(period.goals) };
}

function formatError(error: ApiError): string {
  const details = error.details?.map((detail) => `${detail.field}: ${detail.issue}`).join("; ");
  return details ? `${error.message}. ${details}` : error.message;
}
