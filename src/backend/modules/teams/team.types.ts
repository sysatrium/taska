export type Team = {
  id: string;
  name: string;
  ownerRole: string;
  competencyIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type TeamCreateRequest = {
  name: string;
  ownerRole: string;
  competencyIds: string[];
};

export type TeamPatchRequest = Partial<TeamCreateRequest>;

export type TeamListResponse = {
  items: Team[];
};
