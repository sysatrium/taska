# Bootstrap 0.4 — Create SDD Structure

## Purpose

Create the repository structure and reusable templates that make the SDD workflow repeatable.

## When to use

Use after the constitution and project overview exist, before starting the first feature.

## Inputs

- constitution and project overview artifacts
- desired repository conventions
- feature numbering convention, if already decided

## Output files

```text
.specify/
specs/
specs/templates/
src/
SPEC_PROCESS.md
README.md
```

## What to do

1. Establish the core folders required by the repository.
2. Create reusable templates for spec, plan, tasks, verification, and architecture decisions where applicable.
3. Define a consistent feature numbering and naming convention.
4. Make sure the structure supports the full lifecycle from spec to verification.

## Required decisions

- feature numbering approach
- template inventory
- contract folder convention
- where implementation code lives
- where process documentation lives

## Quality gate

Accept the result only if:

- the folder layout is consistent and reusable
- templates support the full lifecycle
- conventions are explicit enough for a new contributor or agent to follow
