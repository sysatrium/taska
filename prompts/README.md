# SDD Greenfield Prompts

This folder contains the interactive prompt set for launching a greenfield project with Spec-Driven Development.

The core idea is simple: do not create an empty structure mechanically. Instead, walk through structured interviews with AI, make explicit project decisions, and generate meaningful operating artifacts.

## How to use it

Run prompts sequentially.

Do not move to the next step until the previous step produced the expected files and passed its quality gate.

Unknown is acceptable.

If the human operator does not know the answer yet, the agent must narrow the decision space instead of repeatedly asking the same open question.

## Partner-style bootstrap rules

During bootstrap, the agent must follow this sequence:

`what is already known -> what is missing -> viable options -> recommended default -> what requires user confirmation`

Recommendation rules:

- use known context first
- use relevant industry good and best practices
- use proven patterns from similar systems
- present 2-3 viable options
- recommend the safest manageable default
- show short tradeoff-oriented reasoning
- mark provisional defaults explicitly

## Anti-hallucination rules

- do not invent hidden assumptions
- convert unsupported uncertainty into open questions
- label major decisions as Known, Inferred, Recommended, Assumed, Open Question, or Blocked
- add confidence when recommendations rely on partial context
- refuse finalization when ambiguity is high-risk

## Phase map

### Bootstrap phase

1. `00-bootstrap/01-create-constitution.md`
2. `00-bootstrap/02-create-agents.md`
3. `00-bootstrap/03-create-project-overview.md`
4. `00-bootstrap/04-create-sdd-structure.md`
5. `00-bootstrap/05-create-operational-prompts.md`

### Feature lifecycle phase

1. `01-feature-lifecycle/01-create-feature-spec.md`
2. `01-feature-lifecycle/02-create-api-contract.md`
3. `01-feature-lifecycle/03-create-plan.md`
4. `01-feature-lifecycle/04-create-tasks.md`
5. `01-feature-lifecycle/05-implement-task.md`
6. `01-feature-lifecycle/06-verify-task.md`

### Maintenance phase

Use maintenance prompts when incidents, drift, or new evidence change the rules.

## Reference example

Before writing a new feature package, review the demo pack in `specs/001-demo-feature/`.

Treat it as the expected baseline for:

- evidence map structure
- spec-to-plan traceability
- task granularity
- contract-first artifacts
- verifier output style

## Secondary reference example

Use `specs/002-demo-ui-feature/` as the UI-heavy companion example to `specs/001-demo-feature/`.

It demonstrates inline interaction modeling, UI state schema design, frontend task decomposition, and verifier expectations for stateful user-facing features.

## Third reference example

Use `specs/003-demo-integration-feature/` as the integration-heavy reference example.

It demonstrates webhook contracts, async reconciliation, idempotency, stale-event handling, observability, and verifier expectations for external-system integrations.
## Discovery phase

Use discovery prompts before bootstrap or before feature specification when the team still needs to clarify segment, jobs, MVP scope, or risky assumptions.
