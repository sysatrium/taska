# Tasks: [feature name]

## Task list

### T1 — [task name]

- Type: [implementation / test / integration / UI / enablement]
- Depends on: [none / task ids]
- Traceability: [spec/plan section]
- Files likely touched: [paths]
- Acceptance criteria:
  - [Concrete criterion]
- Verification:
  - [Automated/manual check]

## Required user-facing task coverage

For user-facing features, tasks must include explicit coverage for:

- App shell/navigation wiring: CTA, menu item, route, link, or documented entry point.
- Golden Path completion from the expected entry point.
- Post-submit or post-action destination: return to list, detail, dashboard, or next natural step.
- Empty/loading/error state behavior on the main path.
- Runtime smoke method and toolchain/environment requirement.

If the current decomposition creates only hidden routes or isolated components, add a task to make the workflow reachable before calling the feature done.

## Blockers

- [Use Blocker for missing runnable toolchain, unreachable UI, unverifiable API behavior, or anything that prevents runtime smoke.]
