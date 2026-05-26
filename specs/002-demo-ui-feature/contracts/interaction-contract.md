# Interaction Contract — Inline Task Status Editor UI

## Purpose

Define the expected user-visible behavior of the inline status editor independent of UI framework.

## Actors

- End user interacting with a task row or card
- UI component managing local interaction state
- Backend status update API

## Primary flow

1. User activates the status editor from a task row.
2. UI opens a compact selector with available statuses.
3. User chooses a new status.
4. UI validates any locally known constraints.
5. UI submits the request.
6. UI shows submitting state and prevents duplicate submit.
7. UI resolves to success or inline error.
8. UI returns to stable row state.

## Interaction states

- `idle`: control is closed; current status is visible.
- `open`: user can inspect and choose statuses.
- `submitting`: selection is locked while request is in flight.
- `success`: updated status is rendered and the editor closes or confirms briefly.
- `error`: inline message is visible and the user can retry or cancel.

## Accessibility expectations

- Control is reachable by keyboard.
- Focus moves into the opened control predictably.
- Escape closes without side effects.
- Error feedback is perceivable to assistive technologies.
- Current status and target action remain screen-reader understandable.

## Error mapping

- validation error -> inline actionable message
- not found / stale item -> inline stale-state message plus refresh guidance
- unauthorized -> inline permissions/auth message or escalation to global auth handling
- transport error -> inline retryable failure state

## Open decisions

- same-status submit behavior
- blocked-reason interaction design
- success-state duration before control closes
