# Maintenance 5.2 — Update Constitution

## Purpose

Update project-wide operating rules when the repository's baseline assumptions have changed.

## When to use

Use when changes affect the whole project, not just one feature.

## Inputs

- current `.specify/memory/constitution.md`
- the trigger for change
- evidence that the rule should become project-wide

## Output file

```text
.specify/memory/constitution.md
```

## What to do

1. Determine whether the change is truly project-wide.
2. Update constitution rules for stack, architecture, security, testing, or delivery as needed.
3. Remove outdated rules when they no longer apply.
4. Keep a visible rationale for important changes.

## Trigger examples

- stack migration
- security model change
- delivery model change
- architecture boundary change
- quality standard escalation after incidents

## Quality gate

Accept the update only if:

- the change belongs at constitution level
- the new rule is concrete and reusable
- affected agent behavior would clearly change because of the update
