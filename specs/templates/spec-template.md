# Feature Specification Template

## How to use this template

This template is designed to be usable by a beginner with help from an IDE agent.

Do not try to fill everything perfectly from memory.

Use these rules:

- write in plain language first;
- if something is confirmed, label it as a fact;
- if something is a reasonable default, label it as a recommended default;
- if something is uncertain, label it as an assumption or open question;
- keep scope small enough for a first implementation slice.

If you are using an AI agent, ask it to guide you section by section and convert your plain-language answers into this structure.

## Metadata

- Feature ID:
- Feature name:
- Status: Draft | Approved | In Progress | Verified | Superseded
- Owner:
- Decision owner:
- Confidence level: High | Medium | Low
- Evidence status:
- Last updated:
- Related overview artifacts:
- Related contracts:

## 1. Objective

Plain-language question:
What problem are we solving with this feature right now?

Write 2–4 sentences describing the user problem and the intended business or user outcome.

Good example:
Users can create a PI plan, but they cannot quickly assign a team to a planning item. This feature adds a simple team assignment flow so planners can keep ownership visible and reduce coordination errors.

## 2. Business context

Answer these questions in simple bullets:

- Why does this feature exist?
- Who benefits?
- What changes if it works?
- Why is it important now?

## 3. Evidence map

### Known facts

Write only what is confirmed by approved artifacts, direct user input, or validated research.

- Fact 1:
- Fact 2:
- Fact 3:

### Inferred context

Write reasonable conclusions drawn from known facts.

- Inference 1:
- Inference 2:

### Recommended defaults

Write safe defaults that help the team move forward without pretending they are confirmed facts.

- Recommended default 1:
- Recommended default 2:

### Provisional assumptions

Write assumptions that may later prove false.

- Assumption 1:
- Assumption 2:
- Assumption 3:

### Needs confirmation

Write unresolved questions that block confidence but do not yet block drafting.

- Needs confirmation 1:
- Needs confirmation 2:
- Needs confirmation 3:

## 4. Expected outcomes

Plain-language question:
What should be better after this feature is released?

- Outcome 1:
- Outcome 2:
- Outcome 3:

## 5. In scope

Plain-language question:
What are we definitely building in this feature?

- In-scope item 1:
- In-scope item 2:
- In-scope item 3:

## 6. Out of scope

Plain-language question:
What are we explicitly not building now?

- Out-of-scope item 1:
- Out-of-scope item 2:
- Out-of-scope item 3:

## 7. Constraints and assumptions

### Constraints

Write real limits, not wishes.

- Stack constraints:
- Performance constraints:
- Compliance or security constraints:
- Delivery constraints:
- Integration constraints:

### Assumptions

Repeat only assumptions that materially affect implementation choices.

- Assumption 1:
- Assumption 2:
- Assumption 3:

## 8. Dependencies

Plain-language question:
What must exist before this works, and what will depend on it after delivery?

- Upstream dependency:
- Downstream dependency:
- External dependency:

## 9. Frontend and module placement

Use this section for web and frontend work. If the feature is not UI-related, write `Not applicable`.

### UI layer classification

Choose one and explain why:

- Primitive
- Pattern
- Feature UI
- Not applicable

Prompt for beginners:
A primitive is a reusable building block like Button or Input.
A pattern is a repeatable composition like PageHeader or EmptyState.
A feature UI component is tied to a specific user scenario like `CreatePlanForm`.

### Target layer

Choose the main layer where the feature belongs:

- `shared`
- `entities`
- `features`
- `widgets`
- `pages`
- Not applicable

### Module boundary notes

Write short answers:

- Why this layer is the right place:
- Which layers it may depend on:
- Which layers must not depend on it:
- Public API sketch:

### Domain language usage

Write whether the component may use domain terms directly.

- Shared UI rule:
- Feature UI rule:

## 10. Design token impact

Use this section for UI work. If not applicable, write `Not applicable`.

Plain-language question:
Will this feature use existing semantic tokens, or does it require new ones?

- Existing semantic tokens used:
- New semantic tokens needed:
- Base token impact, if any:
- Theme impact, if any:
- Explicit note confirming that raw hex and raw px will not be used in feature UI:

## 11. Decisions already made

- Decision:
  - Status: Approved | Recommended | Provisional
  - Rationale:
  - Implication:
  - Requires confirmation by:

## 12. Edge cases and failure scenarios

Plain-language question:
What can go wrong, and how should the product behave?

- Edge case:
  - Expected behavior:
- Failure scenario:
  - Expected behavior:
- Empty or no-data state:
  - Expected behavior:
- Loading state:
  - Expected behavior:
- Error state:
  - Expected behavior:

## 13. Verification criteria

### Functional verification

- 

### Non-functional verification

- 

### Frontend and architecture verification

- Correct layer placement is justified.
- Dependency direction is not violated.
- Shared UI does not leak domain terminology unless explicitly approved.
- Feature UI uses semantic tokens instead of raw hex or raw px.
- Loading, empty, and error states are defined.

### Observability and diagnostics

- logs:
- metrics:
- traces:
- alerts:

## 14. Initial task hints

1. Describe the first implementation slice.
2. Describe the second implementation slice.
3. Describe the third implementation slice.

## 15. Open questions

- Open question 1:
- Open question 2:
- Open question 3:

## 16. Ready-for-plan checklist

- [ ] Objective is explicit.
- [ ] Evidence status is visible.
- [ ] Provisional items are labeled.
- [ ] In-scope and out-of-scope are separated clearly.
- [ ] Constraints are concrete.
- [ ] Dependencies are visible.
- [ ] UI layer classification is set or marked not applicable.
- [ ] Target layer is set or marked not applicable.
- [ ] Design token impact is captured or marked not applicable.
- [ ] Verification criteria are testable.
- [ ] Open questions are captured.
