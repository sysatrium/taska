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

export type PlanningPeriodListResponse = {
  items: PlanningPeriodSummary[];
  page: number;
  pageSize: number;
  total: number;
};

export type PlanningPeriodDetailResponse = {
  planningPeriod: PlanningPeriod;
};

export type PlanningPeriodCreateRequest = {
  productId: string;
  periodType: PeriodType;
  name: string;
  startDate: string;
  endDate: string;
  goals: RichTextDocument;
};

export type PlanningPeriodPatchRequest = Partial<Pick<PlanningPeriodCreateRequest, "name" | "startDate" | "endDate" | "goals">>;

export type PlanningPeriodListQuery = {
  productId: string;
  periodType?: PeriodType;
  status?: PlanningPeriodStatus;
  page: number;
  pageSize: number;
};
