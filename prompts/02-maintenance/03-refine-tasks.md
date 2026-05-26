# Maintenance 5.3 — Refine Tasks

## Purpose

Rebuild `tasks.md` when the current decomposition is too large, too vague, outdated, or no longer verifiable.

## When to use

Use when:

- tasks exceed the intended 1-4 hour size
- multiple unrelated concerns were bundled together
- dependencies are unclear or contradictory
- the spec or plan changed and invalidated the current task list
- implementers cannot start without replanning the feature

## Inputs

- current `spec.md`
- current `plan.md`
- current `tasks.md`
- description of what is wrong with the current decomposition

## Output file

```text
specs/NNN-feature-name/tasks.md
```

## What to do

1. Re-check the execution order implied by the plan.
2. Split large tasks into smaller atomic tasks.
3. Clarify task types, dependencies, affected files, and verification methods.
4. Remove ambiguity that would force implementers to redesign the feature during coding.
5. Keep the new task list aligned with the approved plan.

## Quality gate

Accept the result only if:

- each task is again atomic and verifiable
- dependencies are explicit and consistent
- implementers can pick one task without replanning the feature
- verifier review remains possible task by task
