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
2. Extract what is already known from the project idea and repository context.
3. List what is still missing.
4. When the operator is unsure, propose 2-3 viable options.
5. Build recommendations from known context, relevant industry good and best practices, and proven patterns from similar systems.
6. Recommend one safest manageable default when the ambiguity is low-risk.
7. Mark provisional defaults explicitly.
8. Mark high-risk unresolved items as blockers or open questions instead of inventing answers.
9. Create `constitution.md` as a stable rules document for all future agents.

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
- default decision policy
- evidence labeling policy
- decision log or open questions

## Quality gate

Accept the result only if:

- the file contains concrete rules, not generic filler
- the rules are specific enough to constrain later implementation
- forbidden patterns are explicit
- testing and security expectations are actionable
- unresolved items are visible as open questions or blockers
- provisional defaults are clearly labeled
- recommendations are grounded in context and rationale

## Do not proceed if

- the constitution is mostly placeholders
- critical decisions are silently assumed
- architecture and quality rules are still ambiguous in high-risk areas
- recommendations are based on fashion instead of context and rationale
- unsupported certainty is presented as fact
