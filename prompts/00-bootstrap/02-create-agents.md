# Bootstrap 0.2 — Create Agent Operating Context

## Purpose

Create stable operating context files so implementation and verification agents work from the same repository rules.

## When to use

Use after the constitution is created and before feature work starts.

## Inputs

- `.specify/memory/constitution.md`
- repository workflow and artifact rules
- bootstrap decisions already approved

## Output files

```text
AGENTS.md
CLAUDE.md
```

## What to do

1. Create `AGENTS.md` as the persistent repository-wide context for all AI agents.
2. Create `CLAUDE.md` as the compact tool-facing operating guide.
3. Define source-of-truth precedence.
4. Define what agents may recommend by default and what always needs human confirmation.
5. Define evidence labels and confidence expectations.
6. Define how agents must escalate blockers and high-risk ambiguity.
7. Add a mandatory post-feature review rule: after verification, the agent must explicitly decide whether the implemented change requires updates to shared artifacts such as `AGENTS.md`, `.specify/memory/constitution.md`, templates, or repository-wide verification instructions. If no update is needed, the agent must say so explicitly.


## Required content for AGENTS.md

- repository operating model
- artifact order and phase gates
- source-of-truth precedence
- default decision policy
- evidence labels
- confidence policy
- anti-hallucination rules
- escalation policy

## Required content for CLAUDE.md

- concise operating flow
- scope rules
- evidence and confidence rules
- when to stop and escalate

## Quality gate

Accept the result only if both files make agent behavior more deterministic, not less.
