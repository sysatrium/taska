# Feature 4.1 — Implement Task

## Purpose

Implement exactly one approved task from `tasks.md` without expanding scope.

## When to use

Use only after `spec.md`, `plan.md`, `tasks.md`, and the pre-implementation readiness checks are complete.

## Inputs

- `specs/NNN-feature-name/spec.md`
- `specs/NNN-feature-name/plan.md`
- `specs/NNN-feature-name/tasks.md`
- the single task being implemented
- relevant contracts and repository rules

## Output files

```text
Changed source files only for the selected task
```

## What to do

1. Re-read the selected task and confirm its dependencies are satisfied.
2. Implement only the files required for that task.
3. Keep changes traceable to the feature spec and plan.
4. Stop and escalate if the task cannot be completed without scope expansion.
5. Record any follow-up issue instead of silently implementing extra work.

## Rules

- one run equals one task
- do not modify adjacent scope unless the task explicitly requires it
- do not rewrite the plan during implementation
- do not self-approve incomplete work

## Quality gate

Accept the result only if:

- the selected task is fully implemented
- no extra scope was added
- changes remain consistent with spec, plan, and contracts
- the result is ready for separate verification
