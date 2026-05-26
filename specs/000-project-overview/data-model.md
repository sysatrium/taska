# Project Data Model

## Purpose

Describe the top-level domain entities, relationships, invariants, and lifecycle states that define the system.

## 1. Core entities

For each entity capture:

- purpose
- important attributes
- owner or source of truth
- lifecycle states
- sensitive fields

## 2. Relationships

Describe how entities relate to one another.

For each relationship capture:

- relationship type
- cardinality
- ownership
- consistency expectations

## 3. Invariants

Document domain rules that must always remain true.

- identity invariants
- state invariants
- financial or numerical invariants
- temporal invariants

## 4. State transitions

Describe major lifecycle transitions for important entities.

For each entity include:

- initial state
- allowed transitions
- forbidden transitions
- terminal states

## 5. Sensitive data

Identify sensitive, regulated, or high-risk data elements.

- PII
- credentials or secrets
- financial data
- audit-critical fields

## 6. Open questions

List unresolved data-model questions.
