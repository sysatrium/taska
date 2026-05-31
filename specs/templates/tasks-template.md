# Tasks: [feature name]

## Task list

### T1 — [task name]

- Type: [implementation / test / integration / UI / enablement]
- User-facing: [yes / no]
- Affects Golden Path: [yes / no]
- Expected entry point affected: [yes / no]
- Depends on: [none / task ids]
- Traceability: [spec/plan section]
- Files likely touched: [paths]
- Acceptance criteria:
  - [Concrete criterion]
- Verification:
  - [Automated/manual check]
- Evidence expected:
  - [What the agent must show: runtime smoke result / screenshot note / route reached / API response / test result]

### Classification rule

A task is `User-facing: yes` if it changes what the user can see, click, enter, navigate to, submit, or understand during the main scenario.

A task is `Affects Golden Path: yes` if it can block, enable, or change the user's ability to complete the primary scenario, even when the task itself is backend, API, validation, or integration work.

A task is `Expected entry point affected: yes` if it changes where the user starts, how they enter the flow, or whether they can reach the feature from the expected UI entry point.

## Required user-facing task coverage

For user-facing features, tasks must include explicit coverage for:

- App shell/navigation wiring: CTA, menu item, route, link, or documented entry point.
- Golden Path completion from the expected entry point.
- Post-submit or post-action destination: return to list, detail, dashboard, or next natural step.
- Empty/loading/error state behavior on the main path.
- Runtime smoke method and toolchain/environment requirement.

If a task has `User-facing: yes` or `Affects Golden Path: yes`, its verification may not rely on static code inspection alone; it must define observable runtime evidence or a clear blocker.

If the current decomposition creates only hidden routes or isolated components, add a task to make the workflow reachable before calling the feature done.

## Blockers

- [Use Blocker for missing runnable toolchain, unreachable UI, unverifiable API behavior, or anything that prevents runtime smoke.]
