# Feature 4.2 — Verify Task

## Purpose

Perform adversarial verification of one implemented task by searching for mismatch, omission, and risk.

## When to use

Use immediately after a task is implemented and before the work is considered complete.

## Inputs

- `specs/NNN-feature-name/spec.md`
- `specs/NNN-feature-name/plan.md`
- `specs/NNN-feature-name/tasks.md`
- the implemented code changes for one task
- relevant contracts and constitution rules

## Output file

```text
Verification feedback in the review channel, pull request, or task record
```

## Verifier stance

Act as a skeptical verifier, not as a supportive teammate.

Your job is to find defects, scope drift, weak reasoning, and missing safeguards.

Do not silently fix the code.

First report what is wrong, why it matters, and what evidence supports the finding.

## What to do

1. Identify which task from `tasks.md` is being verified.
2. Trace the implemented changes back to `spec.md`, `plan.md`, and the selected task.
3. Search for mismatches, omissions, and out-of-scope work.
4. Check architecture, UI-layer placement, dependency direction, and token discipline.
5. Check edge cases, loading, empty, and error states when UI is affected.
6. Check tests, diagnostics, and operational impact.
7. Report concrete findings with severity.

## Required checks

### Core checks

- task-to-code traceability
- spec alignment
- plan alignment
- scope control
- edge cases
- security and data handling
- test sufficiency

### Frontend and architecture checks

Use these checks whenever the task touches UI or frontend modules.

- the code is placed in the correct layer: `shared`, `entities`, `features`, `widgets`, or `pages`
- dependency direction remains valid: `pages -> widgets -> features -> entities -> shared`
- `shared` does not depend on feature layers
- `entities` does not depend on pages
- one feature does not import private internals from another feature
- shared UI does not leak domain terminology unless explicitly approved
- feature UI may use domain context when justified by the spec
- semantic tokens are used instead of raw hex values in feature UI
- semantic spacing, radius, shadow, and typography rules are respected instead of ad hoc raw values
- composition is preferred over a universal god-component or god-hook
- loading, empty, and error states exist when required by the scenario
- accessibility has not regressed

## Severity scale

- Critical — breaks core behavior, security, data integrity, or architectural safety
- High — major mismatch with spec or plan, serious edge-case failure, or strong maintainability risk
- Medium — important quality or correctness issue that should be fixed before merge
- Low — improvement or polish item that does not block merge by itself

## Output format

Use this structure:

### Verification target

- Task:
- Files reviewed:
- Spec and plan sections used:

### Findings

For each finding, use:

- Severity:
- Title:
- Evidence:
- Why this is a problem:
- Recommended action:

### Final verdict

- Pass
- Pass with issues
- Fail

### Follow-up work

- Required before merge:
- Safe to defer:

## Quality gate

Accept the verification only if:

- feedback is specific and evidence-based
- scope violations are called out explicitly
- unresolved defects are not hidden behind a generic approval
- architecture and UI rule violations are explicitly checked when relevant
