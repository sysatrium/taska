# Tasks Template

## Decomposition rules

- One task = one atomic unit of work.
- Typical implementation window = 1-4 hours.
- Every task must have acceptance criteria.
- Every task must have a verification method.
- Dependencies must be explicit.
- Tasks must be sequenced so an implementer can execute one task without replanning the feature.
- Tasks must not silently decide unresolved product or architecture questions.

## Task list metadata

- Feature ID:
- Feature name:
- Based on spec:
- Based on plan:
- Last updated:

## Recommended execution order

1. Setup / scaffolding
2. Schema / persistence
3. Domain logic
4. API / integration layer
5. UI or interface layer
6. Tests
7. Documentation / cleanup

## Task N: [Title]

**Type:** Setup | Schema | Backend | Frontend | Test | Docs | Infra

**Depends on:**

**Upstream decision dependency:**

**Files affected:**

**Traceability:** Spec section(s) / Plan section(s)

### Description

Describe the exact change.

### Acceptance criteria

- [ ]
- [ ]
- [ ]

### Verification

Describe how to verify the task and confirm that it did not introduce unsupported decisions.

### This task must not decide

- Describe the first excluded item for this task.
- Describe the second excluded item for this task.

### Blocked if

- Describe the condition that should stop execution instead of improvisation.

### Notes

Optional implementation notes, risks, or constraints.
