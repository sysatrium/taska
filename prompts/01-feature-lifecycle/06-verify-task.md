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

## What to do

1. Check whether the implementation matches the selected task.
2. Search for out-of-scope changes.
3. Look for missed edge cases, weak tests, security gaps, and constitution violations.
4. Report concrete defects, ambiguities, and follow-up work.
5. Do not optimize for politeness over correctness.

## Required checks

- task-to-code traceability
- spec alignment
- scope control
- edge cases
- security and data handling
- test sufficiency

## Quality gate

Accept the verification only if:

- feedback is specific and evidence-based
- scope violations are called out explicitly
- unresolved defects are not hidden behind a generic approval
