# Tasks — Inline Task Status Editor UI

## Decomposition rules

- One task = one atomic unit of work.
- Every task must have acceptance criteria and verification.
- Tasks must not silently decide unresolved product or architecture questions.

## Task list metadata

- Feature ID: 002-demo-ui-feature
- Feature name: Inline Task Status Editor UI
- Based on spec: `specs/002-demo-ui-feature/spec.md`
- Based on plan: `specs/002-demo-ui-feature/plan.md`
- Last updated: 2026-05-26

## Task 1: Finalize interaction contract and UI state schema

**Type:** Docs

**Depends on:** none

**Upstream decision dependency:** whether blocked status requires a secondary reason step in V1

**Files affected:**
- `specs/002-demo-ui-feature/contracts/interaction-contract.md`
- `specs/002-demo-ui-feature/contracts/ui-state-schema.json`

**Traceability:** Spec sections 3, 5, 10, 11 / Plan sections 2, 7, 8

### Description

Finalize the expected interaction flow, state names, event triggers, and error mapping for the inline status editor.

### Acceptance criteria

- [ ] Interaction contract defines open, select, submit, success, and error behavior.
- [ ] UI state schema covers all supported states and transitions.
- [ ] Accessibility-relevant behaviors are explicitly documented.

### Verification

Review the interaction contract and ensure every documented state can be represented in the schema.

### This task must not decide

- final visual styling details
- long-term mobile interaction strategy

### Blocked if

- the team cannot decide whether blocked status is single-step or multi-step in the first version.

### Notes

Keep the interaction flow compact and deterministic.

## Task 2: Implement local state management and API adapter integration

**Type:** Frontend

**Depends on:** Task 1

**Upstream decision dependency:** use pessimistic submit by default unless approval changes it

**Files affected:**
- inline status editor component
- local reducer/state machine
- request adapter
- tests

**Traceability:** Spec sections 4, 7, 10, 11 / Plan sections 4, 5, 7, 8, 10, 11

### Description

Implement the component logic that opens the control, captures selection, submits through the adapter, and resolves to success or error state without affecting other rows.

### Acceptance criteria

- [ ] State transitions are explicit and testable.
- [ ] Duplicate submit is prevented while submitting.
- [ ] Backend validation errors are mapped to inline user-facing errors.

### Verification

Run unit and integration tests for idle, open, submitting, success, validation error, not-found, and transport failure states.

### This task must not decide

- optimistic UI policy
- cross-feature analytics strategy

### Blocked if

- the backend adapter contract cannot distinguish validation, not-found, and auth failures.

### Notes

Ensure state isolation per task row.

## Task 3: Add accessibility handling and verification coverage

**Type:** Frontend

**Depends on:** Task 2

**Upstream decision dependency:** approved semantics for focus return after submit or cancel

**Files affected:**
- component accessibility behavior
- keyboard interaction tests
- manual verification checklist

**Traceability:** Spec sections 5, 10, 11 / Plan sections 2, 5, 10, 11, 12

### Description

Add focus management, keyboard navigation, escape/close behavior, and verification coverage for accessible interaction paths.

### Acceptance criteria

- [ ] User can open and operate the control by keyboard.
- [ ] Focus handling is deterministic on open, submit, cancel, and error.
- [ ] Verification artifacts cover accessible interaction paths.

### Verification

Run keyboard-centric tests and manual walkthroughs for open, navigate, submit, error recovery, and focus return behavior.

### This task must not decide

- complete design-system refactor
- drag-and-drop interaction rules

### Blocked if

- focus target rules after submit or cancel remain undefined.

### Notes

Prefer simple accessible patterns over custom interaction complexity.
