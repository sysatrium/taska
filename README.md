# taska

Production-grade repository for **Spec-Driven Development (SDD)** in greenfield projects.

This repository helps a human operator and AI coding agents produce specifications before code, execute delivery through deterministic handoffs, and continuously improve the system through verification and incident feedback.

## Purpose

Use this repository to run the full cycle:

`Bootstrap -> Specify -> Contract -> Plan -> Tasks -> Implement -> Verify -> Learn`

The operating model is intentionally biased toward:

- deterministic AI execution
- explicit scope boundaries
- artifact-first delivery
- separate verifier responsibility
- post-incident specification learning

## Canonical policy

The repository root is the **canonical source** for structure and operating rules.

Use the root documentation and prompt set when you want:

- the source-of-truth structure
- the canonical wording of operating rules
- the baseline prompt-pack for tooling integration

Use `ru/` when you want:

- human-facing Russian documentation
- Russian bootstrap and feature prompts
- Russian onboarding for local teams

When the root and `ru/` diverge, update the root first, then synchronize `ru/`.

## Operating model

This kit assumes a **human-led bootstrap**:

1. A human runs bootstrap prompts in order.
2. AI agents generate project operating artifacts.
3. Feature work starts only after the bootstrap gate is complete.
4. Each feature is implemented through atomic tasks.
5. Verification is performed by a separate verifier agent.
6. Incidents update specs, constraints, or verification criteria, not just code.

## Repository structure

```text
.specify/
  memory/
    constitution.md

specs/
  000-project-overview/
    spec.md
    data-model.md
    architecture.md
  templates/
    spec-template.md
    plan-template.md
    tasks-template.md
    api-spec-template.yaml
    data-schema-template.json

.github/
  prompts/
    speckit.constitution.md
    speckit.specify.md
    speckit.plan.md
    speckit.tasks.md
    speckit.implement.md
    speckit.verify.md

prompts/
  00-bootstrap/
  01-feature-lifecycle/
  02-maintenance/

ru/
  README.md
  GLOSSARY.md
  prompts/
  .github/prompts/
  specs/
```

## Bootstrap flow

Run the bootstrap prompts in this exact order.

### 0.1 Create Constitution

Prompt file:

```text
prompts/00-bootstrap/01-create-constitution.md
```

Output:

```text
.specify/memory/constitution.md
```

### 0.2 Create Agent Operating Context

Prompt file:

```text
prompts/00-bootstrap/02-create-agents.md
```

Outputs:

```text
AGENTS.md
CLAUDE.md
```

### 0.3 Create Project Overview

Prompt file:

```text
prompts/00-bootstrap/03-create-project-overview.md
```

Outputs:

```text
specs/000-project-overview/spec.md
specs/000-project-overview/data-model.md
specs/000-project-overview/architecture.md
```

### 0.4 Create SDD Structure

Prompt file:

```text
prompts/00-bootstrap/04-create-sdd-structure.md
```

Outputs:

- project folders for specs and contracts
- reusable templates
- prompt-pack structure
- feature numbering convention

### 0.5 Create Operational Prompts

Prompt file:

```text
prompts/00-bootstrap/05-create-operational-prompts.md
```

Outputs:

```text
.github/prompts/*.md
```

## Feature flow

For every new feature create a folder under `specs/`:

```text
specs/001-feature-name/
  spec.md
  plan.md
  tasks.md
  research.md
  contracts/
    api-spec.yaml
    data-schema.json
```

Run feature prompts in order:

1. `01-create-feature-spec.md`
2. `02-create-api-contract.md`
3. `03-create-plan.md`
4. `04-create-tasks.md`
5. `05-implement-task.md`
6. `06-verify-task.md`

## Maintenance flow

Use maintenance prompts when reality changes the plan:

1. `01-update-spec-after-incident.md`
2. `02-update-constitution.md`
3. `03-refine-tasks.md`
4. `04-run-pre-implementation-checklist.md`

These prompts prevent silent drift between intent, plan, and execution.

## Non-negotiable gates

Coding may start **only after** the following are true:

- `constitution.md` exists and is current
- `AGENTS.md` exists and is current
- project overview artifacts exist
- feature `spec.md` exists
- `Out-of-Scope` is explicit
- API/data contracts exist where applicable
- `plan.md` exists
- `tasks.md` exists with dependencies and verification steps

## Agent roles

### Spec Author

Creates or updates specifications and contracts.

### Planner

Translates approved spec into architecture, sequence, risks, and rollout design.

### Task Decomposer

Breaks the plan into atomic tasks with dependencies and acceptance criteria.

### Implementer

Implements exactly one task at a time.

### Verifier

Actively searches for scope violations, missed edge cases, forbidden patterns, and security defects.

## Production rules

- Specs are the primary artifacts; code is downstream.
- No feature implementation from vague prompts.
- No multi-day tasks in `tasks.md`.
- No hidden assumptions; unresolved items must be listed as open questions.
- No self-verification as the only quality control.
- Every production incident must feed back into specs, constraints, or verification criteria.
- Root documentation is canonical; localized documentation must be synchronized after root changes.

## Quick start

1. Complete bootstrap phase `00-bootstrap`.
2. Review generated artifacts with a human.
3. Lock constitution and agent rules.
4. Create `specs/001-first-feature/`.
5. Run the feature lifecycle.
6. Run the pre-implementation checklist before coding.
7. Merge only after verifier feedback is resolved.
