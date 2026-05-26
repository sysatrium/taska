# Maintenance 5.1 — Update Spec After Incident

## Purpose

Update the feature specification after an incident so the system learns from production reality instead of only patching code.

## When to use

Use after a bug, outage, security event, data issue, or serious verification miss reveals a gap in the current spec.

## Inputs

- incident summary
- affected feature `spec.md`
- current `plan.md` and `tasks.md`, if relevant
- new constraints or lessons learned

## Output file

```text
specs/NNN-feature-name/spec.md
```

## What to do

1. Identify what the existing spec failed to express.
2. Add missing constraints, edge cases, assumptions, or verification criteria.
3. Update scope notes if the incident exposed hidden requirements.
4. Keep the spec focused on intent and rules, not just the code patch.

## Quality gate

Accept the update only if:

- the incident caused a real spec improvement
- new constraints are explicit and reusable
- verification criteria became stronger after the update
