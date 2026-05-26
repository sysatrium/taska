# Implementation Plan — Task Status Update API

## Metadata

- Feature ID: 001-demo-feature
- Feature name: Task Status Update API
- Status: Draft
- Based on spec: `specs/001-demo-feature/spec.md`
- Related contracts:
  - `specs/001-demo-feature/contracts/api-spec.yaml`
  - `specs/001-demo-feature/contracts/data-schema.json`
- Confidence level: Medium
- Decision status summary: approved demo direction with provisional workflow details
- Last updated: 2026-05-26

## 1. Scope summary

Implement a minimal API slice for updating task status, validating a limited transition model, persisting the new status, and returning a stable contract-compliant response. Full workflow engines, notifications, and multi-entity orchestration remain excluded.

## 2. Traceability to spec

| Spec item | Plan response | Status | Notes |
|---|---|---|---|
| Update existing task status | Add dedicated update-status endpoint and handler | Recommended | Follows contract-first design |
| Reject invalid status values | Validate against enum before persistence | Approved | Required by contract |
| Require reason for blocked | Validate `blockedReason` when status is `blocked` | Provisional | Needs product confirmation |
| Keep response deterministic | Standardize success and error payloads | Approved | Needed for testing and integrations |

## 3. Assumption-sensitive areas

- The allowed state transition matrix is intentionally minimal for the demo.
- Audit event storage may be synchronous or asynchronous in a real implementation.
- Authentication is assumed to exist outside this slice.

## 4. Architecture changes

Introduce one API handler, one application-service method, one domain validation rule set, and one persistence update operation. Keep boundaries explicit: transport validates request shape, domain validates transition logic, persistence updates stored state.

## 5. Data flow and sequence

1. Client sends authenticated request.
2. API layer validates request schema.
3. Application service loads existing task.
4. Domain rule validates the target status and transition conditions.
5. Persistence layer updates the task record.
6. Audit event is recorded or queued.
7. Response is returned in the contract-defined shape.

## 6. Technology choices

- Decision:
  - Status: Recommended
  - Evidence: demo repository constraints favor contract-first and stack-neutral structure.
  - Rationale: keeps the example portable across implementation stacks.
  - Alternatives rejected: framework-specific design in the spec pack.
  - Requires confirmation by: Engineering

## 7. Data model, database, and schema changes

- Change: add or formalize `status`, `blockedReason`, `updatedAt`, and `updatedBy` fields in the task representation.
  - Impact: persistence schema must support state tracking and auditability.
  - Migration or rollout note: nullable `blockedReason` except when status is `blocked`.

## 8. Integration points

- Integration: authentication layer
  - Interface: authenticated request context
  - Failure mode: missing or invalid principal
  - Fallback behavior: reject with authentication error

- Integration: audit pipeline
  - Interface: internal event or log emission
  - Failure mode: audit write failure
  - Fallback behavior: define whether to fail hard or degrade gracefully before implementation

## 9. Risks and mitigations

- Risk: transition rules remain underspecified.
  - Likelihood: Medium
  - Impact: Medium
  - Mitigation: keep transition logic minimal and document open questions.

- Risk: clients rely on unstable response fields.
  - Likelihood: Medium
  - Impact: High
  - Mitigation: verify examples against schema and freeze the response contract.

## 10. Non-functional requirements

- Performance: single-task updates should remain low latency.
- Security: only authenticated callers may update status.
- Reliability: updates must not partially commit silent invalid state.
- Observability: every request should produce diagnosable logs and counters.
- Maintainability: rule logic should remain separate from transport code.

## 11. Testing strategy

- unit tests: status validation and transition rules.
- integration tests: endpoint + persistence happy path and validation errors.
- contract tests: response examples and request validation against schema.
- end-to-end tests: optional for the demo.
- manual verification: curl/Postman requests for valid and invalid cases.

## 12. Rollout and rollback

- rollout plan: enable endpoint in development or demo environment first.
- rollback trigger: repeated contract failures or unexpected state corruption.
- rollback steps: disable route and revert schema change if needed.
- post-release checks: verify success/error rate, audit emission, and response shape stability.

## 13. Unsupported or weakly supported areas

- Role-specific transition permissions are not defined.
- Final decision on audit pipeline strictness is unresolved.
- Reopen semantics for completed tasks are intentionally left open.

## 14. Plan readiness checklist

- [x] Plan maps back to spec intent.
- [x] Approved and provisional decisions are distinguished.
- [x] Data changes are visible.
- [x] Risks and mitigations are documented.
- [x] Testing strategy exists.
- [x] Rollout and rollback are defined.
