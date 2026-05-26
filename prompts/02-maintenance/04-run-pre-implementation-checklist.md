# Maintenance 5.4 — Run Pre-Implementation Checklist

## Purpose

Decide whether a feature is actually ready for coding.

## When to use

Use before the first implementation task of every feature and again after any major spec, contract, or plan change.

## Inputs

- `.specify/memory/constitution.md`
- `AGENTS.md`
- project overview artifacts
- feature `spec.md`
- feature contracts, if applicable
- `plan.md`
- `tasks.md`

## Output file

```text
Readiness decision in the current working context or task record
```

## What to do

Check each item explicitly:

- constitution exists and is current
- AGENTS.md exists and is current
- feature spec exists and is complete
- out-of-scope boundaries are explicit
- contracts exist where needed
- plan exists and is coherent
- tasks are atomic and ordered
- acceptance criteria are testable
- major open questions are resolved or marked as blockers

## Quality gate

Return only one of these outcomes:

- `READY FOR IMPLEMENTATION`
- `NOT READY FOR IMPLEMENTATION`

A ready decision is valid only if it is based on explicit artifact review, not intuition.
