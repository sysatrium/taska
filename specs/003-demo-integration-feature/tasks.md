# Tasks — External Issue Tracker Sync

## Decomposition rules

- One task = one atomic unit of work.
- Every task must have acceptance criteria and verification.
- Tasks must not silently decide unresolved product, security, or architecture questions.

## Task list metadata

- Feature ID: 003-demo-integration-feature
- Feature name: External Issue Tracker Sync
- Based on spec: `specs/003-demo-integration-feature/spec.md`
- Based on plan: `specs/003-demo-integration-feature/plan.md`
- Last updated: 2026-05-26

## Task 1: Finalize webhook contract and sync-state schema

**Type:** Docs

**Depends on:** none

**Upstream decision dependency:** whether V1 handles stale events as failed or manual-review cases

**Files affected:**
- `specs/003-demo-integration-feature/contracts/webhook-contract.yaml`
- `specs/003-demo-integration-feature/contracts/sync-state-schema.json`

**Traceability:** Spec sections 3, 5, 10, 11 / Plan sections 2, 7, 8

### Description

Finalize inbound webhook payload expectations, signature header rules, acknowledgment semantics, and sync-state lifecycle schema.

### Acceptance criteria

- [ ] Webhook contract defines required headers, payload shape, and response behavior.
- [ ] Sync-state schema covers accepted, queued, processing, synced, duplicate, stale, failed, and manual_review states.
- [ ] Contract documents signature and idempotency expectations.

### Verification

Review the contract and schema together to ensure every documented processing outcome can be represented.

### This task must not decide

- provider-specific UI for operators
- future multi-provider abstraction design

### Blocked if

- the team cannot define whether stale events are terminal failures or reviewable states in V1.

## Task 2: Implement ingestion, verification, and deduplication flow

**Type:** Backend / Integration

**Depends on:** Task 1

**Upstream decision dependency:** agreed source of idempotency keys

**Files affected:**
- webhook endpoint
- signature verification module
- acceptance ledger or deduplication store
- tests

**Traceability:** Spec sections 4, 7, 8, 10, 11 / Plan sections 4, 5, 8, 9, 10, 11

### Description

Implement the inbound webhook path that validates authenticity, acknowledges accepted events, records ingestion metadata, and prevents duplicate downstream processing.

### Acceptance criteria

- [ ] Invalid signatures are rejected safely.
- [ ] Accepted events are recorded or queued before heavy processing.
- [ ] Duplicate deliveries do not create duplicate downstream attempts.

### Verification

Run tests for valid events, invalid signatures, malformed payloads, and duplicate deliveries.

### This task must not decide

- final reconciliation ordering policy
- provider-agnostic onboarding flows

### Blocked if

- idempotency signal quality is too weak to support safe deduplication.

## Task 3: Implement reconciliation, mapping, and failure diagnostics

**Type:** Backend / Integration

**Depends on:** Task 2

**Upstream decision dependency:** approved stale-event policy and unmapped-status behavior

**Files affected:**
- async processor or reconciliation handler
- status mapping module
- sync-state persistence
- observability instrumentation
- tests

**Traceability:** Spec sections 4, 5, 10, 11 / Plan sections 5, 7, 8, 9, 10, 11, 12

### Description

Implement processing that resolves local linkage, applies status mapping, updates the local domain safely, and records final sync outcomes with enough diagnostics for operations.

### Acceptance criteria

- [ ] Supported statuses map correctly to local statuses.
- [ ] Missing mapping and missing linkage paths become explicit failure or review states.
- [ ] Sync outcomes are logged and measurable.

### Verification

Run integration and failure-path tests for mapped status updates, unmapped events, missing local linkage, stale events, and processor retry behavior.

### This task must not decide

- full bidirectional sync strategy
- long-term operator dashboard design

### Blocked if

- stale-event and manual-review policies remain unresolved.
