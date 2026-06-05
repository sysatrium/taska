import { useEffect, useState } from "react";
import {
  createPlanningPeriod,
  getPlanningPeriod,
  listPlanningPeriods,
  patchPlanningPeriod,
  transitionPlanningPeriod
} from "./planningPeriodApi";
import { PlanningPeriodDetails } from "./PlanningPeriodDetails";
import { PlanningPeriodList } from "./PlanningPeriodList";
import type { ApiError, PlanningPeriod, PlanningPeriodPatch, PlanningPeriodPayload, PlanningPeriodSummary } from "./types";

export function PlanningPeriodsApp() {
  const [periods, setPeriods] = useState<PlanningPeriodSummary[]>([]);
  const [selected, setSelected] = useState<PlanningPeriod | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    loadPeriods(setPeriods, setLoading, setError);
  }, []);

  function retryLoad() {
    setLoading(true);
    loadPeriods(setPeriods, setLoading, setError);
  }

  async function select(period: PlanningPeriodSummary) {
    if (selected?.id === period.id) return;
    setError(null);
    setSelected(await getPlanningPeriod(period.id));
  }

  async function saveCreate(payload: PlanningPeriodPayload) {
    await save(setSaving, setError, async () => {
      const created = await createPlanningPeriod(payload);
      setPeriods(upsertSummary(periods, created));
      setSelected(created);
    });
  }

  async function savePatch(id: string, payload: PlanningPeriodPatch) {
    await save(setSaving, setError, async () => {
      const updated = await patchPlanningPeriod(id, payload);
      setPeriods(upsertSummary(periods, updated));
      setSelected(updated);
    });
  }

  async function transition(id: string, action: "open" | "close" | "cancel") {
    await save(setSaving, setError, async () => {
      const updated = await transitionPlanningPeriod(id, action);
      setPeriods(upsertSummary(periods, updated));
      setSelected(updated);
    });
  }

  return (
    <section className="planning-periods-workspace" aria-label="Периоды планирования">
      {loading ? <p className="status-line">Загрузка периодов планирования...</p> : null}
      {error && !saving ? (
        <div className="error-message">
          <p>{formatError(error)}</p>
          <button type="button" onClick={retryLoad}>Повторить</button>
        </div>
      ) : null}
      <div className="workspace">
        <PlanningPeriodList items={periods} selectedId={selected?.id ?? null} onCreate={() => setSelected(null)} onSelect={select} />
        <PlanningPeriodDetails selected={selected} saving={saving} error={saving ? null : error} onCreate={saveCreate} onPatch={savePatch} onTransition={transition} />
      </div>
    </section>
  );
}

async function loadPeriods(
  setPeriods: (items: PlanningPeriodSummary[]) => void,
  setLoading: (value: boolean) => void,
  setError: (value: ApiError | null) => void
) {
  try {
    setPeriods(await listPlanningPeriods());
  } catch (caught) {
    setError(caught as ApiError);
  } finally {
    setLoading(false);
  }
}

async function save(setSaving: (value: boolean) => void, setError: (value: ApiError | null) => void, action: () => Promise<void>) {
  setSaving(true);
  setError(null);
  try {
    await action();
  } catch (caught) {
    setError(caught as ApiError);
  } finally {
    setSaving(false);
  }
}

function upsertSummary(periods: PlanningPeriodSummary[], period: PlanningPeriod): PlanningPeriodSummary[] {
  const summary = toSummary(period);
  return periods.some((item) => item.id === period.id) ? periods.map((item) => (item.id === period.id ? summary : item)) : [summary, ...periods];
}

function toSummary(period: PlanningPeriod): PlanningPeriodSummary {
  return {
    id: period.id,
    productId: period.productId,
    periodType: period.periodType,
    name: period.name,
    startDate: period.startDate,
    endDate: period.endDate,
    status: period.status,
    createdBy: period.createdBy,
    createdAt: period.createdAt,
    updatedAt: period.updatedAt
  };
}

function formatError(error: ApiError): string {
  const details = error.details?.map((detail) => `${detail.field}: ${detail.issue}`).join("; ");
  return details ? `${error.message}. ${details}` : error.message;
}
