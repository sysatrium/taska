# Bootstrap 0.2 — Create Agent Operating Context

## Purpose

Create stable operating context files so implementation and verification agents work from the same repository rules.

## When to use

Use after `constitution.md` exists and before feature-level work starts.

## Inputs

- `.specify/memory/constitution.md`
- repository conventions already decided during bootstrap
- expected agent/tool usage in the project

## Output files

```text
AGENTS.md
CLAUDE.md
```

## What to do

1. Read the constitution before generating agent files.
2. Create `AGENTS.md` as the persistent repository-wide context for all AI agents.
3. Create `CLAUDE.md` as a compact tool-facing guide for Claude Code.
4. Keep both files aligned with the constitution.
5. Avoid duplicating long explanations when a short rule is enough.

## Required content for AGENTS.md

- project purpose
- canonical artifact flow
- agent role boundaries
- repository rules
- implementation guardrails
- verification expectations
- escalation rules for ambiguity

## Required content for CLAUDE.md

- short operating summary
- repository commands or workflow conventions
- what Claude must not do
- how to respect spec boundaries and task atomicity

## Quality gate

Accept the result only if:

- both files are consistent with the constitution
- agent roles are clearly separated
- implementer and verifier expectations are explicit
- ambiguity escalation rules are present
