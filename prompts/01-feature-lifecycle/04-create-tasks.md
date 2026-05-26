# Feature 3.1 — Create Tasks

## Purpose

Break the approved implementation plan into atomic, verifiable tasks that an implementation agent can execute one at a time.

## When to use

Use after `plan.md` is approved and before coding starts.

## Inputs

- `specs/NNN-feature-name/spec.md`
- `specs/NNN-feature-name/plan.md`
- relevant contracts

## Output file

```text
specs/NNN-feature-name/tasks.md
```

## What to do

1. Split work into atomic tasks, usually no larger than 1-4 hours.
2. Assign each task a type, dependencies, affected files, acceptance criteria, and verification method.
3. Preserve a logical implementation order.
4. Avoid bundling multiple independent concerns into one task.

## Rules

- one task should represent one clear unit of execution
- dependencies must be explicit
- tasks must be verifiable independently
- no multi-day or vague tasks

## Quality gate

Accept the result only if:

- the task list is executable in order
- each task is atomic and testable
- acceptance criteria are concrete
- verifier work can happen task by task
