# Project Architecture Overview

## Purpose

Record the top-level architecture boundaries, modules, integrations, and key tradeoffs before feature-level planning begins.

## 1. System context

Describe the system's place in the wider environment.

- upstream systems
- downstream systems
- external dependencies
- operator touchpoints

## 2. Architecture boundaries

Describe the major boundaries that should shape implementation.

- domain boundaries
- service boundaries
- runtime boundaries
- trust boundaries
- deployment boundaries

## 3. Major modules

List the main modules or subsystems.

For each module capture:

- responsibility
- inputs and outputs
- dependencies
- ownership
- change risk

## 4. Integration patterns

Describe how modules and external systems communicate.

- sync vs async
- API style
- eventing or messaging
- retry and failure handling
- contract ownership

## 5. Cross-cutting concerns

Document concerns that apply across the whole system.

- authentication and authorization
- observability
- resilience
- configuration and secrets
- auditability

## 6. Key constraints

List project-level architecture constraints that later plans must honor.

## 7. Tradeoffs and rationale

Record major tradeoffs already accepted at project level.

- tradeoff
- rationale
- downside accepted
- follow-up implication

## 8. Architecture decisions log

Use this section for project-level ADR entries when needed.

### ADR-XXX: [Title]

- Status:
- Context:
- Decision:
- Rationale:
- Consequences:
- Follow-up:
