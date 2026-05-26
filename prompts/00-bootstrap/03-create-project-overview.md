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
2. If actors, workflows, or boundaries are unclear, propose candidate versions from the constitution and product intent.
3. Label major statements as Known, Inferred, Recommended, Assumed, Open Question, or Blocked.
4. Mark provisional defaults explicitly.
5. Block only on high-risk ambiguity.
6. Keep all three files consistent with the constitution.

## Quality gate

Accept the result only if:

- the project overview is specific to this system
- the data model identifies meaningful entities and constraints
- architecture boundaries are explicit enough to guide later plans
- provisional items are clearly marked
- no file contradicts the constitution
