# Verification: [feature name]

## Verification summary

- Result: [passed / passed with follow-ups / failed]
- Verified by: [agent/person]
- Date: [YYYY-MM-DD]

## Artifact checks

- Spec alignment: [pass/fail/details]
- Plan alignment: [pass/fail/details]
- Task completion: [pass/fail/details]
- Scope control: [pass/fail/details]
- Task marker alignment: [pass/fail/details for User-facing / Affects Golden Path / Expected entry point affected]
- Evidence expected satisfied: [pass/fail/details]

## Automated checks

- Install: [command/result or not available]
- Lint: [command/result or not available]
- Tests: [command/result or not available]
- Build: [command/result or not available]

## Runtime Usability Gate

Required for features or tasks where `User-facing: yes` or `Affects Golden Path: yes`.

- App/runtime started: [yes/no; command/environment]
- Expected entry point opened: [path/screen]
- Golden Path completed: [yes/no/details]
- Hidden URL knowledge required: [yes/no]
- Entry point reachability verified: [yes/no/details]
- Empty/loading/error states checked: [yes/no/details]
- Required API/backend smoke checked: [yes/no/details]
- Evidence observed: [browser smoke / runtime smoke / route reached / API response / test result]

If any required runtime check cannot be executed, mark it as Blocker for release rather than follow-up.

## Acceptance report

Use a short non-technical summary:

- Entry point checked: [where the user starts]
- User steps checked: [2-5 steps]
- Observable result: [what the user sees when the scenario succeeds]
- Decision: [passed / passed with follow-ups / failed]
- Blockers or follow-ups: [specific list]

## Findings

### Blockers

- [Blocker or none]

### Follow-ups

- [Follow-up or none]

## Release recommendation

- Eligible for release marking: [yes/no]
- Rationale: [Short explanation]
