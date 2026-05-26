# Maintenance 5.1 — Update Spec After Incident

## Purpose

Convert production learning into durable specification changes.

## Inputs

- incident summary
- root cause
- affected feature

## Required updates

- add or refine constraints
- add missed edge cases
- add verification criteria
- identify which downstream artifacts must be regenerated

## Quality gate

Accept only if the same class of incident is less likely after regeneration.
