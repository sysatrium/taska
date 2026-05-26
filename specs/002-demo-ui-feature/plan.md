# Implementation Plan — Inline Task Status Editor UI

## Metadata

- Feature ID: 002-demo-ui-feature
- Feature name: Inline Task Status Editor UI
- Status: Draft
- Based on spec: `specs/002-demo-ui-feature/spec.md`
- Related contracts:
  - `specs/002-demo-ui-feature/contracts/interaction-contract.md`
  - `specs/002-demo-ui-feature/contracts/ui-state-schema.json`
- Dependency contract:
  - `specs/001-demo-feature/contracts/api-spec.yaml`
- Confidence level: Medium
- Decision status summary: approved UI-local error direction with provisional submission strategy
- Last updated: 2026-05-26

## 1. Scope summary

Implement a compact inline status editor that opens within a task row or card, allows status selection, submits through the status-update backend contract, and reflects idle, open, submitting, success, and error states without breaking the surrounding task list context.

## 2. Traceability to spec

| Spec item | Plan response | Status | Notes |
|---|---|---|---|
| Inline selector interaction | Build row-level inline editor component | Recommended | Keeps interaction close to the task |
| Loading, success, and error visibility | Add explicit local state machine | Approved | Required for deterministic UI behavior |
| Keyboard accessibility | Define focus entry, navigation, selection, and exit rules | Approved | Needed for a11y verification |
| Blocked status may need extra reason | Reserve extensibility point in interaction flow | Provisional | Depends on product decision |

## 3. Assumption-sensitive areas

- Submission may be pessimistic or optimistic depending on product preference.
- The list may re-render after save; local state ownership must survive predictable refreshes.
- Inline blocked-reason capture is not finalized.

## 4. Architecture changes

Introduce a UI component boundary for the inline editor, a local state machine or reducer for interaction states, a request adapter for the backend API, and a small mapping layer between backend errors and user-facing inline messages.

## 5. Data flow and sequence

1. User activates the inline editor.
2. UI opens the status choices and moves focus into the control.
3. User selects a target status.
4. UI validates any locally known constraints.
5. UI submits the request through the status update API.
6. UI enters submitting state and prevents duplicate actions.
7. UI resolves to success, inline error, or stale-item handling state.
8. Task row updates or refreshes without forcing full-page navigation.

## 6. Technology choices

- Decision:
  - Status: Recommended
  - Evidence: UI demo should stay portable across frameworks while still showing state discipline.
  - Rationale: focus the example on interaction design and state management, not a specific UI library.
  - Alternatives rejected: framework-specific hooks and component APIs inside the plan itself.
  - Requires confirmation by: Engineering

## 7. Data model, UI state, and schema changes

- Change: define a local interaction state schema covering `idle`, `open`, `submitting`, `success`, and `error`.
  - Impact: tests and implementation can validate state completeness.
  - Migration or rollout note: none at project level; purely feature-local UI state.

## 8. Integration points

- Integration: task status update API
  - Interface: request adapter calling backend contract from demo feature 001
  - Failure mode: validation error, not found, unauthorized, transport failure
  - Fallback behavior: render inline error and preserve user context

- Integration: design system primitives
  - Interface: button, menu/listbox, status chip, inline message area
  - Failure mode: inconsistent composition or missing a11y affordances
  - Fallback behavior: use simpler primitive composition that preserves semantics

## 9. Risks and mitigations

- Risk: inline editor state leaks between multiple task rows.
  - Likelihood: Medium
  - Impact: High
  - Mitigation: scope state ownership per task row and verify with multi-row interaction tests.

- Risk: optimistic UI creates mismatch with backend truth.
  - Likelihood: Medium
  - Impact: Medium
  - Mitigation: default to pessimistic confirmation unless explicitly approved otherwise.

- Risk: blocked status workflow remains underspecified.
  - Likelihood: High
  - Impact: Medium
  - Mitigation: keep blocked-reason behavior as an explicit extension point and open question.

## 10. Non-functional requirements

- Performance: control open/close and response rendering should feel immediate.
- Accessibility: keyboard and focus management are mandatory.
- Reliability: failed requests must not silently mutate visible status.
- Observability: client-side failures should be attributable to task and request context where possible.
- Maintainability: UI state transitions should be explicit and testable.

## 11. Testing strategy

- unit tests: local state machine transitions and error mapping.
- integration tests: component interaction with mocked backend outcomes.
- contract tests: backend response shapes mapped into UI states.
- end-to-end tests: optional, but useful for focus and inline error behavior.
- manual verification: keyboard-only and mouse interaction walkthroughs.

## 12. Rollout and rollback

- rollout plan: release behind a feature flag or demo-only route first.
- rollback trigger: frequent UI errors, broken keyboard interaction, or stale-state mismatch.
- rollback steps: disable inline editor and fall back to read-only status display.
- post-release checks: confirm submit success rate, failure rate, and no duplicate-submit spikes.

## 13. Unsupported or weakly supported areas

- final blocked-reason UX remains undefined.
- optimistic UI behavior is intentionally unresolved.
- mobile-specific touch patterns are not fully detailed in this first example.

## 14. Plan readiness checklist

- [x] Plan maps back to spec intent.
- [x] Approved and provisional decisions are distinguished.
- [x] Data and UI state changes are visible.
- [x] Risks and mitigations are documented.
- [x] Testing strategy exists.
- [x] Rollout and rollback are defined.
