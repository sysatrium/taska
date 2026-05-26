# Bootstrap 0.3 — Create Project Overview

## Purpose

Create the top-level project artifacts that define what the system is, which domain objects exist, and which architecture boundaries are already known.

## When to use

Use after the constitution is approved and before feature-specific specs are created.

## Inputs

- `.specify/memory/constitution.md`
- product vision and target users
- known domain concepts and architecture constraints

## Output files

```text
specs/000-project-overview/spec.md
specs/000-project-overview/data-model.md
specs/000-project-overview/architecture.md
```

## What to do

1. Summarize the system at a project-wide level.
2. Write `spec.md` for goals, actors, scope shape, and expected outcomes.
3. Write `data-model.md` for core entities, relationships, invariants, and important lifecycle states.
4. Write `architecture.md` for boundaries, modules, integrations, constraints, and major tradeoffs.
5. Keep all three files consistent with the constitution.

## Quality gate

Accept the result only if:

- the project overview is specific to this system
- the data model identifies meaningful entities and constraints
- architecture boundaries are explicit enough to guide later plans
- no file contradicts the constitution
