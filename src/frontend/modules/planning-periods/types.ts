export type PlanningPeriodStatus = "draft" | "open" | "closed" | "cancelled";
export type PeriodType = "sprint" | "month" | "quarter" | "year";
export type RichTextDocument = Record<string, unknown>;

export type PlanningPeriod = {
  id: string;
  productId: string;
  periodType: PeriodType;
  name: string;
  startDate: string;
  endDate: string;
  status: PlanningPeriodStatus;
  goals: RichTextDocument;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type PlanningPeriodSummary = Omit<PlanningPeriod, "goals">;

export type PlanningPeriodPayload = {
  productId: string;
  periodType: PeriodType;
  name: string;
  startDate: string;
  endDate: string;
  goals: RichTextDocument;
};

export type PlanningPeriodPatch = Partial<Pick<PlanningPeriodPayload, "name" | "startDate" | "endDate" | "goals">>;

export type ApiError = {
  code: string;
  message: string;
  details?: Array<{ field: string; issue: string }>;
};
