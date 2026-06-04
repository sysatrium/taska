export type Competency = {
  id: string;
  name: string;
  isSelectable: true;
  source: "seeded";
};

export type Team = {
  id: string;
  name: string;
  ownerRole: string;
  competencyIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type TeamPayload = {
  name: string;
  ownerRole: string;
  competencyIds: string[];
};

export type ApiError = {
  code: string;
  message: string;
  details?: Array<{ field: string; issue: string }>;
};
