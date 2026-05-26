# Bootstrap 0.2 — Create Agent Operating Context

## Purpose

Create persistent operating context for AI agents after constitution is approved.

## Preconditions

- `.specify/memory/constitution.md` exists
- constitution is reviewed by a human

## Outputs

```text
AGENTS.md
CLAUDE.md
```

## Required content for AGENTS.md

1. Project overview
2. SDD workflow
3. Tech stack
4. Architecture decisions
5. Code conventions
6. File organization
7. Forbidden patterns
8. Testing strategy
9. Security rules
10. Delivery and review rules
11. Agent operating rules

## Required content for CLAUDE.md

- link to `AGENTS.md`
- required file reading order
- implementation rules
- clarification rules
- verification rules

## Quality gate

Accept only if both files are concise, operational, and tool-usable.
