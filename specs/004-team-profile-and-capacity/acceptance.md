# Acceptance: 004 Team Profile and Capacity

## Status

- Acceptance status: approved for release
- Date opened: 2026-06-04
- Feature status: released
- Release status: released in `mvp-0.1`
- Decision owner: User

## Acceptance basis

- Feature spec: `specs/004-team-profile-and-capacity/spec.md`
- Implementation plan: `specs/004-team-profile-and-capacity/plan.md`
- Task decomposition: `specs/004-team-profile-and-capacity/tasks.md`
- Verification report: `specs/004-team-profile-and-capacity/verify.md`
- API contract: `specs/004-team-profile-and-capacity/contracts/api-spec.yaml`
- Data contract: `specs/004-team-profile-and-capacity/contracts/data-schema.json`

## Owner-facing summary

Feature 004 adds a reusable global team profile before period-specific planning begins.

The user can:

1. Open the global teams screen.
2. Create a team with a name, responsible role and at least one competency.
3. Select competencies only from the centralized seeded catalog.
4. Save the team without entering period-specific capacity.
5. Re-open and edit the team profile, including changing competencies.

The feature intentionally does not include capacity input, planning items, planning period participation, iteration allocation, overload analysis, catalog administration or team deletion.

## Evidence

- Lint passed.
- Unit/integration tests passed.
- Build passed.
- Security audit passed with 0 vulnerabilities.
- Prisma migration and seed passed.
- API smoke passed.
- Browser Golden Path smoke passed in system Google Chrome.

## Acceptance questions

1. Does the create/edit team flow match the expected Golden Path for feature 004?
2. Is the approved MVP competency catalog sufficient for this first slice?
3. Is `If-Match: updatedAt` acceptable as optimistic concurrency handling for team edits?
4. Is the current role selector acceptable for MVP until full auth strategy is confirmed?

## Possible owner decisions

- `approved for release` — feature can proceed to explicit release marking.
- `approved with follow-ups` — feature can proceed, but follow-ups should be tracked.
- `needs rework` — specific gaps must be fixed before release.
- `rejected for this release` — feature remains done but should not be included.

## Current recommendation

- Recommendation: approved for release.
- Rationale: no release blockers remain; feature-level verification and Runtime Usability Gate passed.

## Decision log

- 2026-06-04: Acceptance opened. Awaiting owner decision.
- 2026-06-04: Owner accepted feature 004 as `approved for release`.
- 2026-06-04: Feature 004 marked as released in `mvp-0.1`.
