# Feature Metadata Schema

## Purpose

`meta.yaml` is the stable lifecycle and release metadata artifact for every feature folder under `specs/NNN-feature-name/`.

The file is intentionally small, human-readable and auditable. It must not replace `spec.md`, `tasks.md` or `verification.md`; it only records lifecycle state, release inclusion and release-relevant risks/decisions.

## Required Fields

Every feature `meta.yaml` must include:

```yaml
id: "005"
name: planning-period-lifecycle-and-goals
status: in_progress
included_in_release: false
release: null
```

### `id`

- String.
- Three-digit feature id as used in the folder name.

### `name`

- String.
- Feature slug as used in the folder name.

### `status`

Allowed values:

- `specified` — feature folder and artifacts exist, implementation has not started.
- `in_progress` — implementation or verification is in progress.
- `done` — implementation and verification are complete, but feature is not released.
- `released` — owner approved release and `07-mark-feature-release.md` explicitly marked release metadata.
- `unknown` — fallback for analysis only; do not write manually unless recovering incomplete legacy metadata.

### `included_in_release`

- Boolean.
- Must be `true` only when `status: released`.

### `release`

- String release identifier when `included_in_release: true`.
- `null` when unreleased.

## Optional Fields

### `owner_approval`

Use only after Human approval or release approval:

```yaml
owner_approval:
  status: approved
  approved_for_release: mvp-0.1
  note: "Owner manually checked the UI checklist."
```

Allowed `owner_approval.status` values:

- `approved`
- `rejected`
- `deferred`

### `risk_register`

Use for release-relevant risks, mitigations, accepted limitations and follow-ups:

```yaml
risk_register:
  - id: goals-editor-depth
    type: accepted_limitation
    status: accepted_for_mvp
    decision: "Structured markdown-like goals document is accepted for MVP."
    release_blocking: false
```

Required item fields:

- `id` — stable kebab-case identifier.
- `type` — one of:
  - `risk`
  - `mitigation`
  - `accepted_limitation`
  - `follow_up`
  - `process_gate`
- `status` — short state such as `open`, `mitigated`, `completed`, `accepted_for_mvp`, `follow_up`.
- `decision` — short human-readable decision or current handling.
- `release_blocking` — boolean.

## Release Rules

`status: released` may be set only by `07-mark-feature-release.md` after:

- implementation is complete;
- per-task verification exists;
- feature-level verification exists;
- user-facing Runtime Usability Gate / Golden Path smoke has passed when applicable;
- `verification.md` or another persistent verification artifact exists;
- owner explicitly approved release;
- release id is known;
- no `risk_register` item has `release_blocking: true`.

Without explicit owner approval and release prompt execution, leave:

```yaml
status: in_progress
included_in_release: false
release: null
```

or use `status: done` if verification is complete but release is not approved.
