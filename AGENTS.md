# AGENTS.md

## Purpose

This file defines repository-wide operating rules for AI agents and contributors. It turns the project constitution into practical delivery behavior for specification, implementation, verification, and release marking.

## Source-of-truth precedence

1. Direct human instruction in the current task.
2. `specs/000-project-overview/constitution.md`.
3. Current feature artifacts: `spec.md`, `plan.md`, `tasks.md`, `verify.md`, and `meta.yaml`.
4. Repository prompts in `prompts/`.
5. Existing code and local conventions.

If these sources conflict, stop and escalate instead of silently choosing the convenient interpretation.

## Project commands

The runnable toolchain must be documented here when it exists. Until commands are confirmed, do not pretend the project is runtime-verified.

- Install: TBD
- Dev server: TBD
- Lint: TBD
- Test: TBD
- Build: TBD

For user-facing features, missing install/dev/test/build commands are a release Blocker when they prevent runtime smoke. They may not be hidden as ordinary follow-up items.

## Definition of Done

A task or feature is done only when all applicable conditions are true:

- It satisfies the approved `spec.md`, `plan.md`, and `tasks.md`.
- Scope did not silently expand beyond the approved artifact set.
- Relevant automated checks were run when available, or the reason they could not run is documented.
- User-facing scope passes the Runtime Usability Gate below.
- Follow-ups are clearly separated from release blockers.
- Governance-impacting learnings are reflected in shared artifacts or explicitly marked as not needed.

## Runtime Usability Gate

For every user-facing feature, verification must include a runnable Golden Path check. A feature is not eligible for `released` status unless:

- The app can be started locally or in the agreed target environment.
- The primary user can reach the feature from an expected UI entry point.
- The user can complete the main scenario without knowing hidden or internal URLs.
- Empty, loading, and error states do not silently block the main path.
- API/backend behavior required by the UI has been smoke-tested through the runtime path.

If the project has no runnable toolchain or the target environment cannot be started, missing runtime verification is a Blocker for release, not a follow-up.

## Golden Path discipline

Before implementation of a user-facing feature, identify the primary Golden Path in plain language:

1. Where the user enters the product.
2. What they click or submit.
3. What successful completion looks like.
4. How they return to the list, detail page, dashboard, or next natural step.

If task decomposition produces screens, routes, or APIs but no usable workflow, the agent must challenge the decomposition and propose a navigation/app-shell task before calling the work done.

## When writing code

- Read the relevant feature artifacts before editing.
- Implement one approved task at a time.
- Prefer minimal local changes over broad refactors.
- Do not add dependencies without explicit human approval.
- Do not treat hidden URLs as sufficient UI integration for user-facing scope.
- For UI changes, wire reachable actions: CTA, navigation, routes, list/detail/edit links, and post-submit return paths as required by the task.

## When blocked

Classify a problem as a Blocker when it prevents correct verification, release eligibility, security, data integrity, or the primary user flow. Do not downgrade blockers into follow-ups to keep the task moving.

Examples of blockers:

- No runnable toolchain for a user-facing feature that requires runtime smoke.
- Feature exists only at a hidden route and is not reachable from the expected entry point.
- Required backend/API behavior cannot be exercised by the UI.
- Acceptance criteria cannot be verified from available artifacts.

## When reviewing code

Review must check:

- Acceptance criteria and traceability to `spec.md` / `tasks.md`.
- Scope boundaries and absence of broad unrelated changes.
- Runtime reachability for user-facing features.
- Empty/loading/error state behavior on the main path.
- Governance compliance with constitution and this file.

A technically correct implementation that cannot be reached by the primary user is not complete for user-facing scope.

## Post-feature governance review

After verification, explicitly decide whether the change requires updates to shared artifacts such as:

- `AGENTS.md`
- `SPEC_PROCESS.md`
- `specs/000-project-overview/constitution.md`
- `specs/templates/*`
- lifecycle prompts in `prompts/`

If no update is needed, state that explicitly in the verification result.

## Changelog

- 2026-05-31: Initial version with Runtime Usability Gate and Golden Path release rules.
