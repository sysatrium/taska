export type Competency = {
  id: string;
  name: string;
  isSelectable: true;
  source: "seeded";
};

export type CompetencyListResponse = {
  items: Competency[];
};
