# Feature 1.2 — Create API Contract

## Purpose

Define the feature contracts before implementation so interfaces become explicit and testable.

## When to use

Use after `spec.md` is approved and before detailed implementation planning or coding.

## Inputs

- `specs/NNN-feature-name/spec.md`
- relevant project overview files
- known integration requirements

## Output files

```text
specs/NNN-feature-name/contracts/api-spec.yaml
specs/NNN-feature-name/contracts/data-schema.json
specs/NNN-feature-name/contracts/events.yaml
```

## What to do

1. Create only the contract files that fit the architecture.
2. Define request, response, validation, and error behavior explicitly.
3. Capture event or schema contracts when the feature depends on them.
4. Keep contracts aligned with the feature spec and out-of-scope boundaries.

## Quality gate

Accept the result only if:

- the contract set matches the actual architecture
- interfaces are specific enough for implementation and testing
- field semantics and error behavior are explicit
- no contract extends beyond approved feature scope
