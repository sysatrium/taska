# Feature 1.1 — Create Feature Specification

## Purpose

Create the feature-level specification that defines intent, scope, constraints, and verification expectations before design or coding starts.

## When to use

Use at the beginning of every new feature, epic, or substantial change request.

## Inputs

- project overview artifacts
- relevant constitution rules
- business goal, user need, or problem statement
- constraints, dependencies, and known decisions

## Output file

```text
specs/NNN-feature-name/spec.md
```

## What to do

1. Clarify the feature outcome before describing implementation.
2. Define what is in scope and out of scope.
3. Record constraints, assumptions, dependencies, and decisions already made.
4. Capture open questions instead of hiding uncertainty.
5. Add verification criteria that later agents can test against.

## Required sections

- objective
- expected outcomes
- in-scope
- out-of-scope
- constraints
- dependencies
- decisions already made
- open questions
- verification criteria

## Quality gate

Accept the result only if:

- the feature outcome is explicit
- scope boundaries are concrete
- implementation details do not replace specification intent
- verification criteria are testable
