# Project Data Model Overview

## Purpose

Describe the system-level domain model before feature-level implementation begins.

## 1. Modeling principles

- Keep the model aligned with approved project boundaries.
- Separate confirmed entities from inferred or provisional ones.
- Avoid inventing persistence details before they are needed.

## 2. Evidence map

### Known entities

- Describe confirmed domain entities.

### Inferred entities

- Describe entities inferred from approved context.

### Provisional entities or relationships

- Describe temporary modeling defaults that require later confirmation.

### Open questions

- Capture unresolved modeling uncertainty.

## 3. Core entities

For each entity capture:

- name
- purpose
- key attributes
- constraints
- lifecycle notes

## 4. Relationships

For each relationship capture:

- source entity
- target entity
- cardinality
- ownership or dependency notes
- deletion or mutation implications

## 5. Value objects and enums

- Value object:
  - purpose:
  - fields:
- Enum:
  - allowed values:
  - business meaning:

## 6. State transitions

Describe important entity states and valid transitions.

## 7. Invariants and business rules

- Rule:
  - affected entities:
  - enforcement point:

## 8. Storage implications

Describe storage or schema implications only at a high level.

## 9. Sensitive data and compliance notes

- data class:
- reason for sensitivity:
- handling expectation:

## 10. Decisions requiring confirmation

- Capture entity or relationship decisions that later planning must not guess.
