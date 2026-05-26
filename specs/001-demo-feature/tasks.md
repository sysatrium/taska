# Tasks — Task Status Update API

## Decomposition rules

- One task = one atomic unit of work.
- Every task must have acceptance criteria and verification.
- Tasks must not silently decide unresolved product or architecture questions.

## Task list metadata

- Feature ID: 001-demo-feature
- Feature name: Task Status Update API
- Based on spec: `specs/001-demo-feature/spec.md`
- Based on plan: `specs/001-demo-feature/plan.md`
- Last updated: 2026-05-26

## Task 1: Finalize contract artifacts

**Type:** Docs

**Depends on:** none

**Upstream decision dependency:** confirm whether `blockedReason` is required in V1

**Files affected:**
- `specs/001-demo-feature/contracts/api-spec.yaml`
- `specs/001-demo-feature/contracts/data-schema.json`

**Traceability:** Spec sections 3, 5, 10, 11 / Plan sections 2, 7, 8

### Description

Finalize the request and response contract for the endpoint, including validation rules, example payloads, and structured error responses.

### Acceptance criteria

- [ ] API contract contains request, success response, and error response examples.
- [ ] JSON schema matches the response and relevant task data fields.
- [ ] Validation requirements for `blockedReason` are explicit.

### Verification

Review examples against the schema and confirm that all contract fields are defined consistently.

### This task must not decide

- final role-based authorization policy
- full cross-feature workflow engine behavior

### Blocked if

- the team cannot decide whether `blockedReason` is mandatory for V1.

### Notes

Keep the contract minimal and deterministic.

## Task 2: Implement domain validation and persistence update

**Type:** Backend

**Depends on:** Task 1

**Upstream decision dependency:** allowed transition matrix remains minimal

**Files affected:**
- application service
- domain validation module
- persistence repository
- tests

**Traceability:** Spec sections 4, 7, 10, 11 / Plan sections 4, 5, 7, 10, 11

### Description

Implement logic that loads a task, validates the requested status transition, applies audit metadata, and persists the change.

### Acceptance criteria

- [ ] Valid transitions are persisted.
- [ ] Invalid statuses or missing required fields are rejected.
- [ ] Audit metadata is applied according to the approved design.

### Verification

Run unit and integration tests for valid, invalid, and not-found paths.

### This task must not decide

- notification side effects
- asynchronous event pipeline guarantees

### Blocked if

- persistence model lacks a task status field and no schema change path is agreed.

### Notes

Keep transport concerns separated from domain rules.

## Task 3: Expose API handler and verification tests

**Type:** Backend

**Depends on:** Task 2

**Upstream decision dependency:** approved route naming and auth integration pattern

**Files affected:**
- API route handler
- request validation layer
- integration tests
- contract verification tests

**Traceability:** Spec sections 1, 4, 10, 11 / Plan sections 2, 5, 8, 11, 12

### Description

Expose the endpoint, connect it to the domain logic, return the contract-compliant response, and verify the handler through automated tests.

### Acceptance criteria

- [ ] Endpoint returns success payload for valid requests.
- [ ] Endpoint returns structured errors for invalid, unauthorized, and not-found cases.
- [ ] Tests verify traceability back to the contract and spec.

### Verification

Run integration and contract-focused tests; manually exercise the endpoint with valid and invalid requests.

### This task must not decide

- long-term API versioning strategy
- bulk mutation support

### Blocked if

- authentication context cannot be injected consistently into the handler.

### Notes

Preserve stable error semantics.
