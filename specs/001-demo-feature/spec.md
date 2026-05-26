# Feature Specification — Task Status Update API

## Metadata

- Feature ID: 001-demo-feature
- Feature name: Task Status Update API
- Status: Draft
- Owner: Product / Platform
- Decision owner: Product + Engineering
- Confidence level: Medium
- Evidence status: Mixed; partly approved project assumptions, partly demo defaults
- Last updated: 2026-05-26
- Related overview artifacts:
  - `specs/000-project-overview/spec.md`
  - `specs/000-project-overview/data-model.md`
  - `specs/000-project-overview/architecture.md`
- Related contracts:
  - `specs/001-demo-feature/contracts/api-spec.yaml`
  - `specs/001-demo-feature/contracts/data-schema.json`

## 1. Objective

Provide a minimal, well-specified API capability that allows an authorized client to update the status of an existing task while preserving validation, auditability, and clear error handling.

## 2. Business context

- Why this feature exists: a task-centric system needs a controlled way to move work between lifecycle states.
- Who benefits: product users, delivery teams, integrations, and reporting consumers.
- What changes if the feature succeeds: task state changes become explicit, testable, and contract-driven.
- Why now: this is a small vertical slice suitable as a golden SDD example.

## 3. Evidence map

### Known facts

- The repository is structured around Spec-Driven Development.
- Bootstrap and template rules require spec, plan, tasks, and contracts before implementation.
- The feature is intentionally designed as a demonstration artifact.

### Inferred context

- A task entity likely has a lifecycle status field.
- Status updates will be relevant to downstream reporting and audit trails.
- The API is likely consumed by UI and future automation clients.

### Recommended defaults

- Use a dedicated endpoint for status updates rather than a generic patch.
- Restrict valid statuses to a small enum: `todo`, `in_progress`, `done`, `blocked`.
- Require a reason when moving a task to `blocked`.

### Provisional assumptions

- Task identifiers are string IDs.
- Authentication is bearer-token based.
- The first version will not enforce complex role-based transition rules.

### Needs confirmation

- Whether the task state machine should allow reopening from `done`.
- Whether blocked tasks require a structured reason taxonomy.
- Whether audit events are stored synchronously or asynchronously.

## 4. Expected outcomes

- Outcome 1: an authorized client can update the status of an existing task through a documented API.
- Outcome 2: invalid status transitions are rejected with explicit validation errors.
- Outcome 3: successful changes produce a deterministic response shape suitable for tests and integrations.

## 5. In scope

- A feature-level endpoint to change task status.
- Validation of allowed statuses and required fields.
- Response contract and baseline error handling.
- Audit event emission requirements at the specification level.

## 6. Out of scope

- Full task creation and deletion APIs.
- Bulk updates.
- Complex workflow engines or approval chains.
- Real notification delivery.

## 7. Constraints and assumptions

### Constraints

- Stack constraints: keep the feature technology-agnostic at spec level.
- Performance constraints: a single status update should be lightweight.
- Compliance or security constraints: only authenticated callers may perform updates.
- Delivery constraints: the feature should remain small enough for a demo pack.
- Integration constraints: response shape must be stable enough for UI and automation use.

### Assumptions

- The task already exists before the update call.
- Basic persistence already exists elsewhere in the system.
- Audit data can be represented at minimum as who changed what and when.

## 8. Dependencies

- Upstream dependency: project-level task entity definition.
- Downstream dependency: reporting or activity timeline consumers.
- External dependency: authentication mechanism.

## 9. Decisions already made

- Decision: status update is exposed as a dedicated endpoint.
  - Status: Recommended
  - Rationale: simplifies contract clarity and verification.
  - Implication: partial task mutation is intentionally constrained.
  - Requires confirmation by: Engineering lead

- Decision: blocked transitions require `blockedReason`.
  - Status: Provisional
  - Rationale: keeps important exceptions explicit.
  - Implication: clients must supply more context for blocked work.
  - Requires confirmation by: Product owner

## 10. Edge cases and failure scenarios

- Edge case: request repeats the current status.
  - Expected behavior: return success without duplicate state change side effects, or return a no-op response according to approved API design.
- Edge case: transition to `blocked` without a reason.
  - Expected behavior: reject with a validation error.
- Failure scenario: task ID does not exist.
  - Expected behavior: return not found.
- Failure scenario: caller is unauthenticated.
  - Expected behavior: return authentication error.

## 11. Verification criteria

### Functional verification

- Valid status update returns the expected response contract.
- Invalid status value is rejected.
- Missing `blockedReason` is rejected for `blocked` status.
- Unknown task ID returns not found.

### Non-functional verification

- Endpoint behavior is deterministic.
- Contract examples are valid against the JSON schema.
- Error responses remain structured and stable.

### Observability and diagnostics

- logs: task status update attempts and outcome.
- metrics: count of successful and failed updates by reason.
- traces: include the update operation in request tracing.
- alerts: optional later-phase alerting for abnormal failure rates.

## 12. Initial task hints

1. Define the contract and schema.
2. Plan domain and persistence behavior.
3. Implement the endpoint and verification tests.

## 13. Open questions

- Should the state machine restrict `done -> in_progress` transitions?
- Should `blockedReason` be free text or enum-based?
- Should audit event publishing be mandatory for successful changes in V1?

## 14. Ready-for-plan checklist

- [x] Objective is explicit.
- [x] Evidence status is visible.
- [x] Provisional items are labeled.
- [x] In-scope and out-of-scope are separated clearly.
- [x] Constraints are concrete.
- [x] Dependencies are visible.
- [x] Verification criteria are testable.
- [x] Open questions are captured.
