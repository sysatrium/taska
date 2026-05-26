# Bootstrap 0.1 — Create Constitution

## Purpose

Create the project's governing constitution so AI agents inherit stable operating rules instead of renegotiating them in every task.

## When to use

Use once at project start, before any feature specs, plans, or implementation work begin.

## Inputs

- project idea and product intent
- target users and main outcomes
- preferred stack or platform constraints
- architecture preferences, if already known
- testing, security, and delivery expectations

## Output file

```text
.specify/memory/constitution.md
```

## What to do

1. Interview the human operator before writing anything.
2. Resolve missing decisions about stack, architecture boundaries, quality rules, security, and deployment.
3. Create `constitution.md` as a stable rules document for all future agents.
4. Prefer explicit rules over vague guidance.
5. Mark unresolved issues as open questions instead of inventing answers.

## Required sections

- project mission
- product outcomes
- approved stack
- architecture principles
- coding conventions
- testing rules
- security rules
- forbidden patterns
- delivery and release rules
- decision log or open questions

## Quality gate

Accept the result only if:

- the file contains concrete rules, not generic best-practice filler
- the rules are specific enough to constrain later implementation
- forbidden patterns are explicit
- testing and security expectations are actionable
- unresolved items are visible as open questions

## Do not proceed if

- the constitution is mostly placeholders
- critical decisions are silently assumed
- architecture and quality rules are still ambiguous
