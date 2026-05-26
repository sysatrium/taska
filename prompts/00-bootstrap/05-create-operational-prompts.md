# Bootstrap 0.5 — Create Operational Prompts

## Purpose

Create the optional prompt-pack for IDE and agent tooling after the repository rules are stable.

## When to use

Use only after the constitution, agent context, and core SDD structure are already defined.

## Inputs

- `.specify/memory/constitution.md`
- `AGENTS.md`
- repository workflow and artifact rules

## Output files

```text
.github/prompts/*.md
```

## What to do

1. Generate short tool-facing prompts for constitution, specification, planning, tasks, implementation, and verification.
2. Keep prompts aligned with the canonical operating model.
3. Ensure prompts support guided discovery, recommendation discipline, evidence labels, confidence labeling, provisional defaults, and escalation on high-risk ambiguity.
4. Do not create prompts that encourage scope expansion or hidden assumptions.

## Quality gate

Accept the result only if prompts are concise, operational, deterministic, and anti-hallucination aware.
