# Feature Spec: [feature name]

## Goal

[What user or business outcome this feature creates.]

## User scenario

[Who does what, in what context, and why.]

## Golden Path

Use this section for every user-facing feature.

- Expected entry point: [home/list/nav/API entry]
- Main action: [what the user does]
- Success result: [what confirms completion]
- Natural next step: [where the user lands or what they can do next]
- Hidden URL dependency: [none / explain why unavoidable]

## Expected outcomes

- [Outcome 1]
- [Outcome 2]

## In scope

- [Scope item]

## Out of scope

- [Non-goal]

## Constraints and dependencies

- [Constraint or dependency]

## Open questions

- [Question]

## Task classification guidance

Use this section to help create `tasks.md` consistently.

- A change is `User-facing: yes` if it changes what the user can see, click, enter, navigate to, submit, or understand during the main scenario.
- A change is `Affects Golden Path: yes` if it can block, enable, or change completion of the primary scenario, even when it is backend, API, validation, or integration work.
- A change is `Expected entry point affected: yes` if it changes where the user starts, how they enter the flow, or whether they can reach the feature from the expected UI entry point.
- User-facing features should identify which expected runtime evidence will prove the scenario works: browser smoke, runtime smoke, API response, visible route reachability, or test evidence.

## Acceptance criteria

- [Functional AC]
- For user-facing features: primary user can complete the Golden Path from the expected entry point without knowing hidden/internal URLs.
- For user-facing features: empty, loading, and error states do not silently block the main path.
- For user-facing features: runtime smoke can be performed in the agreed environment.
- For user-facing features: task decomposition must include explicit app shell/navigation reachability and observable evidence for the main path.
