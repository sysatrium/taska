# taska

Production-grade repository for **Spec-Driven Development (SDD)** in greenfield projects.

This repository helps a human operator and AI coding agents produce specifications before code, execute delivery through deterministic handoffs, and continuously improve the system through verification and incident feedback.

## Purpose

Use this repository to run the full cycle:

`Bootstrap -> Specify -> Contract -> Plan -> Tasks -> Implement -> Verify -> Learn`

## Canonical policy

The repository root is the canonical source for structure and operating rules.

Use the root documentation and prompt set for source-of-truth rules.

Use `ru/` for Russian onboarding and synchronized local-team documentation.

When the root and `ru/` diverge, update the root first, then synchronize `ru/`.

## Operating model

This kit assumes a human-led bootstrap:

1. A human runs bootstrap prompts in order.
2. AI agents generate project operating artifacts.
3. Feature work starts only after the bootstrap gate is complete.
4. Each feature is implemented through atomic tasks.
5. Verification is performed by a separate verifier agent.
6. Incidents update specs, constraints, or verification criteria, not just code.

## Guided bootstrap mode

Beginner uncertainty is expected.

When the user does not know the answer, the agent must work as a decision partner rather than a passive interviewer.

The required sequence is:

`what is already known -> what is missing -> viable options -> recommended default -> what requires user confirmation`

Recommendations must be grounded in:

- known project context
- relevant industry good and best practices
- proven patterns from similar systems

Recommendation rules:

- prefer the safest manageable default over the most fashionable option
- show 2-3 viable options, not an unbounded list
- explain tradeoffs briefly
- mark provisional defaults explicitly
- escalate instead of guessing when ambiguity is high-risk

## Anti-hallucination policy

The repository uses controlled uncertainty instead of silent invention.

Required controls:

- no hidden assumptions; unresolved items must be listed as open questions
- major decisions should be labeled as Known, Inferred, Recommended, Assumed, Open Question, or Blocked
- recommendations should include a confidence level when the context is incomplete
- high-risk ambiguity must block finalization instead of being guessed away
- verifier review must search for unsupported claims and phantom certainty

## Decision governance

### Source-of-truth precedence

Use this order when information conflicts:

1. explicit human approval
2. current constitution
3. approved project overview
4. approved feature spec
5. approved plan
6. inferred context

### Assumption budget

Do not allow a large number of silent assumptions to accumulate.

If too many unresolved assumptions are needed to continue, convert them into open questions or block the artifact.

### Decision freeze points

After constitution, approved spec, or approved plan are accepted, agents must not silently revise those decisions during later phases.

Use explicit update flows instead.

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

1. `prompts/00-bootstrap/01-create-constitution.md`
2. `prompts/00-bootstrap/02-create-agents.md`
3. `prompts/00-bootstrap/03-create-project-overview.md`
4. `prompts/00-bootstrap/04-create-sdd-structure.md`
5. `prompts/00-bootstrap/05-create-operational-prompts.md`

## Reference example

Use the demo feature pack as the canonical example of how one feature should move through the SDD lifecycle.

Primary example:

- `specs/001-demo-feature/spec.md`
- `specs/001-demo-feature/plan.md`
- `specs/001-demo-feature/tasks.md`
- `specs/001-demo-feature/contracts/api-spec.yaml`
- `specs/001-demo-feature/contracts/data-schema.json`
- `specs/001-demo-feature/verify.md`

Use this pack to calibrate agent output format, traceability depth, evidence labeling, and verifier expectations before generating new feature artifacts.

## Non-negotiable gates

Coding may start only after:

- `constitution.md` exists and is current
- `AGENTS.md` exists and is current
- project overview artifacts exist
- feature `spec.md` exists
- `Out-of-Scope` is explicit
- API and data contracts exist where applicable
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

Searches for scope violations, unsupported claims, missed edge cases, forbidden patterns, weak tests, and security defects.

## Secondary reference example

Use `specs/002-demo-ui-feature/` as the UI-heavy companion example to `specs/001-demo-feature/`.

It demonstrates inline interaction modeling, UI state schema design, frontend task decomposition, and verifier expectations for stateful user-facing features.

## Third reference example

Use `specs/003-demo-integration-feature/` as the integration-heavy reference example.

It demonstrates webhook contracts, async reconciliation, idempotency, stale-event handling, observability, and verifier expectations for external-system integrations.
## Discovery flow

Run discovery before bootstrap when product context or MVP boundaries are still unclear.

1. `prompts/00-discovery/01-run-prd-interview.md`
2. `prompts/00-discovery/02-summarize-discovery.md`
3. `prompts/00-discovery/03-generate-segments-and-jobs.md`
4. `prompts/00-discovery/04-rank-risky-assumptions.md`
5. `prompts/00-discovery/05-freeze-mvp-boundaries.md`

These prompts feed `specs/000-project-overview/discovery.md`, `segments-and-jobs.md`, `risks-and-assumptions.md`, and `mvp-boundaries.md`.
