# Feature Specification — Inline Task Status Editor UI

## Metadata

- Feature ID: 002-demo-ui-feature
- Feature name: Inline Task Status Editor UI
- Status: Draft
- Owner: Product / UX / Frontend
- Decision owner: Product + Design + Engineering
- Confidence level: Medium
- Evidence status: Mixed; based on approved demo conventions plus UI-specific defaults
- Last updated: 2026-05-26
- Related overview artifacts:
  - `specs/000-project-overview/spec.md`
  - `specs/000-project-overview/data-model.md`
  - `specs/000-project-overview/architecture.md`
- Related feature artifacts:
  - `specs/001-demo-feature/spec.md`
  - `specs/001-demo-feature/contracts/api-spec.yaml`
- Related contracts:
  - `specs/002-demo-ui-feature/contracts/interaction-contract.md`
  - `specs/002-demo-ui-feature/contracts/ui-state-schema.json`

## 1. Objective

Provide an inline UI interaction that lets a user change a task status directly inside a task board or task list without leaving context, while preserving clear validation, loading feedback, and error recovery.

## 2. Business context

- Why this feature exists: UI users need a fast, low-friction way to move work between statuses.
- Who benefits: delivery teams, product managers, and any user working from a task list or board.
- What changes if the feature succeeds: status changes become faster and reduce navigation overhead.
- Why now: this is a good contrast to the API-heavy demo feature and demonstrates UI-first SDD.

## 3. Evidence map

### Known facts

- The repository already includes a contract-first API demo for task status updates.
- The demo kit expects spec, plan, tasks, and verifier output for each example.
- The UI example should remain implementation-agnostic while still being concrete.

### Inferred context

- The UI will depend on the existing task status update API or a compatible backend contract.
- Users will expect immediate visual feedback after status selection.
- Failure states must be visible inline rather than hidden in global toasts only.

### Recommended defaults

- Use a status dropdown or compact selector embedded in the task row or card.
- Use optimistic UI only after the product team explicitly approves it.
- Default to pessimistic submit with visible loading and inline error state for the demo.

### Provisional assumptions

- The task list already displays status chips or a visible status field.
- The first version targets desktop-first responsive web UI.
- Accessibility support requires keyboard navigation and screen-reader-readable status text.

### Needs confirmation

- Whether status changes should be optimistic or server-confirmed before UI commit.
- Whether blocked status requires opening a secondary reason input.
- Whether repeated clicks during loading should be ignored or queued.

## 4. Expected outcomes

- Outcome 1: a user can open the inline control and choose a new status.
- Outcome 2: the UI shows clear loading, success, and error states.
- Outcome 3: failed updates preserve user context and explain the problem inline.

## 5. In scope

- Inline status selector interaction.
- Local UI state model for idle, open, submitting, success, and error states.
- Accessibility and keyboard behavior at spec level.
- Inline error handling and retry guidance.

## 6. Out of scope

- Full board drag-and-drop workflow.
- Bulk multi-select editing.
- Rich animation system beyond functional feedback.
- Notification center integration.

## 7. Constraints and assumptions

### Constraints

- Stack constraints: remain framework-neutral at spec level.
- UX constraints: preserve local context and avoid disruptive full-page reloads.
- Accessibility constraints: support keyboard access and visible focus states.
- Delivery constraints: keep the demo small enough to explain in one feature pack.
- Integration constraints: align UI states with backend contract semantics.

### Assumptions

- A task row or card has enough space for an inline control.
- The API can return structured validation or not-found errors.
- The UI can identify the active user for audit-relevant display if needed.

## 8. Dependencies

- Upstream dependency: task status update backend contract.
- Downstream dependency: list refresh, analytics, or activity feed updates.
- External dependency: design system primitives for menu, button, and status chip.

## 9. Decisions already made

- Decision: use an inline selector instead of a separate edit modal.
  - Status: Recommended
  - Rationale: keeps task context visible and reduces interaction cost.
  - Implication: the control must manage compact state transitions cleanly.
  - Requires confirmation by: Product + Design

- Decision: show inline error message adjacent to the control.
  - Status: Approved
  - Rationale: local errors are easier to understand than generic page-level alerts.
  - Implication: task rows need space for compact error rendering.
  - Requires confirmation by: already aligned with demo direction

## 10. Edge cases and failure scenarios

- Edge case: user selects the same status that is already active.
  - Expected behavior: either treat as no-op or suppress submission by design.
- Edge case: user opens one selector, then opens another before completion.
  - Expected behavior: UI keeps state isolated per task and prevents cross-row leakage.
- Failure scenario: backend rejects blocked status because reason is missing.
  - Expected behavior: inline error explains the missing input and preserves the open state.
- Failure scenario: task was deleted or moved concurrently.
  - Expected behavior: show inline not-found or stale-state feedback and refresh or remove the stale item according to approved UX.

## 11. Verification criteria

### Functional verification

- User can open, select, submit, and observe the final status.
- Loading state disables duplicate submission.
- Error state is visible inline and recoverable.
- Keyboard interactions work for open, navigate, select, and escape/close behavior.

### Non-functional verification

- State transitions are deterministic.
- Visual feedback is consistent across success and failure paths.
- UI state schema covers all supported interaction states.

### Observability and diagnostics

- logs: UI interaction errors and unexpected response handling.
- metrics: open rate, submit success rate, submit failure rate.
- traces: optional correlation with backend request IDs.
- alerts: not required for the demo.

## 12. Initial task hints

1. Define interaction contract and UI state schema.
2. Plan component structure and state ownership.
3. Implement the control and test interaction paths.

## 13. Open questions

- Is optimistic UI allowed for the first version?
- Does `blocked` require a secondary inline reason field or a follow-up dialog?
- Should successful updates auto-close the selector immediately or after a brief confirmation state?

## 14. Ready-for-plan checklist

- [x] Objective is explicit.
- [x] Evidence status is visible.
- [x] Provisional items are labeled.
- [x] In-scope and out-of-scope are separated clearly.
- [x] Constraints are concrete.
- [x] Dependencies are visible.
- [x] Verification criteria are testable.
- [x] Open questions are captured.
