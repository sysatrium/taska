import type { Competency } from "./competency.types";

export const SEEDED_COMPETENCIES: Competency[] = [
  { id: "backend-development", name: "Backend Development", isSelectable: true, source: "seeded" },
  { id: "frontend-development", name: "Frontend Development", isSelectable: true, source: "seeded" },
  { id: "qa-testing", name: "QA / Testing", isSelectable: true, source: "seeded" },
  { id: "devops-infrastructure", name: "DevOps / Infrastructure", isSelectable: true, source: "seeded" },
  { id: "design-ui-ux", name: "Design (UI/UX)", isSelectable: true, source: "seeded" },
  { id: "product-management", name: "Product Management", isSelectable: true, source: "seeded" },
  { id: "data-engineering", name: "Data Engineering", isSelectable: true, source: "seeded" },
  { id: "mobile-development", name: "Mobile Development", isSelectable: true, source: "seeded" },
  { id: "security-infosec", name: "Security / InfoSec", isSelectable: true, source: "seeded" }
];
