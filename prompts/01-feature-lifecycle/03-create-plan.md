# Feature 2.1 — Create Implementation Plan

## Purpose

Translate the approved feature spec into an implementation plan that describes how the system will change.

## When to use

Use after the feature spec and required contracts are ready.

## Inputs

- `specs/NNN-feature-name/spec.md`
- contract files, if applicable
- relevant project overview and constitution artifacts

## Output file

```text
specs/NNN-feature-name/plan.md
```

## What to do

1. Define the components or modules that will change.
2. Describe data flow, sequencing, and integration touchpoints.
3. Record database or schema changes where relevant.
4. Identify risks, tradeoffs, and non-functional requirements.
5. Keep the plan traceable to the feature spec.

## Required sections

- implementation approach
- affected components
- data flow
- persistence or schema changes
- integrations
- risks and tradeoffs
- non-functional requirements

## Quality gate

Accept the result only if:

- the plan is implementable and traceable to the spec
- architecture choices are explicit
- major risks and constraints are visible
- the plan does not silently expand feature scope
