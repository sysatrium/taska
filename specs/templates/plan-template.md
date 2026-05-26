# Implementation Plan Template

## How to use this template

This plan turns an approved feature spec into an implementation route.

If you are a beginner, do not invent architecture from scratch.

Use the approved spec, the constitution, and the default project rules first.

When unsure:

- prefer the smallest workable change;
- keep logic in the correct layer;
- prefer composition over a universal super-component;
- prefer existing semantic tokens over creating new visual rules.

## Metadata

- Feature ID:
- Feature name:
- Status: Draft | Approved | In Progress | Completed
- Based on spec:
- Related contracts:
- Confidence level: High | Medium | Low
- Decision status summary:
- Last updated:

## 1. Scope summary

Summarize what will be implemented and what remains intentionally excluded.

## 2. Traceability to spec

| Spec item | Plan response | Status | Notes |
|---|---|---|---|
| Outcome / constraint | Component / change | Approved / Recommended / Provisional | |

## 3. Assumption-sensitive areas

- Describe areas where the plan depends on provisional assumptions.

## 4. Architecture changes

Describe which modules, services, boundaries, or layers will change.

### Affected layers

- `app`:
- `shared`:
- `entities`:
- `features`:
- `widgets`:
- `pages`:

### Dependency direction check

Confirm that the planned dependency direction stays valid.

- Allowed dependency path used:
- Boundary risks:
- Explicit note that `shared` must not depend on feature layers:
- Explicit note that `entities` must not depend on pages:

## 5. Data flow and sequence

Describe the critical path and key state transitions.

## 6. UI composition plan

Use this section for frontend work. If not applicable, write `Not applicable`.

- Primitive components reused:
- Patterns reused:
- New feature UI components:
- Where domain language is allowed:
- Where domain language is forbidden:
- Loading state plan:
- Empty state plan:
- Error state plan:

## 7. Technology choices

- Decision:
  - Status: Approved | Recommended | Provisional
  - Evidence:
  - Rationale:
  - Alternatives rejected:
  - Requires confirmation by:

## 8. Design token and theming impact

Use this section for UI work. If not applicable, write `Not applicable`.

- Existing semantic tokens reused:
- New semantic tokens proposed:
- Theme mapping impact:
- Explicit note confirming no raw hex in feature UI:
- Explicit note confirming no raw px in feature UI:

## 9. Data model, database, and schema changes

- Change:
  - Impact:
  - Migration or rollout note:

## 10. Integration points

- Integration:
  - Interface:
  - Failure mode:
  - Fallback behavior:

## 11. Risks and mitigations

- Risk:
  - Likelihood:
  - Impact:
  - Mitigation:

## 12. Non-functional requirements

- Performance:
- Security:
- Reliability:
- Accessibility:
- Observability:

## 13. Testing strategy

- Unit tests:
- Integration tests:
- End-to-end tests:
- Manual verification:

## 14. Verifier hot spots

List the areas the verifier should inspect aggressively.

- Hot spot 1:
- Hot spot 2:
- Hot spot 3:

## 15. Implementation slices

1. Slice 1:
2. Slice 2:
3. Slice 3:

## 16. Ready-for-tasks checklist

- [ ] Scope is aligned with the approved spec.
- [ ] Affected layers are identified.
- [ ] Dependency direction has been checked.
- [ ] UI composition strategy is captured or marked not applicable.
- [ ] Token and theme impact is captured or marked not applicable.
- [ ] Risks have mitigations.
- [ ] Testing strategy is visible.
- [ ] Verifier hot spots are listed.
