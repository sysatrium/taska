# Project Constitution

## Status

Template

## Purpose

Define the stable project-wide governance rules that all agents and contributors must follow before feature work begins.

## 1. Project mission

- Name: [Project name]
- Purpose: [One sentence about what the product does and for whom]
- Primary outcome: [Main value the system should create]

## 2. Product outcomes

- Outcome 1: [Expected user or business result]
- Outcome 2: [Expected user or business result]
- Outcome 3: [Expected user or business result]

## 3. Approved stack

- Frontend: [Approved choice or N/A]
- Backend: [Approved choice or N/A]
- Data store: [Approved choice or N/A]
- Infrastructure: [Approved choice or N/A]
- Tooling: [Approved choice or N/A]

### Dependency policy

- No new dependencies without explicit human approval.
- Prefer existing platform capabilities and approved libraries before introducing new packages.
- Record approved exceptions in the decision log.

## 4. Design tokens and UI policy

Use this section when the project includes UI.

- Visual values must come from approved design tokens.
- Avoid hardcoded colors, spacing, radius, and typography values unless explicitly approved.
- Accessibility and consistency take priority over visual novelty.

## 5. Architecture principles

- Separate UI, business logic, and integrations/data access.
- Keep modules cohesive and boundaries explicit.
- Prefer minimal, local changes over broad refactors.
- Do not silently expand scope beyond the approved feature intent.

## 6. Coding conventions and naming

- Use descriptive names in English for code identifiers.
- Keep functions and modules focused on one responsibility.
- Avoid dead code, hidden side effects, and temporary debug artifacts in production changes.
- Follow the repository naming convention for files, modules, and feature folders.

## 7. Testing rules

- Validate acceptance criteria before considering work complete.
- Run relevant automated checks when they exist.
- Add or update tests when behavior changes materially.
- Do not skip failing checks without explicit approval and documented rationale.

## 8. Accessibility expectations

Use this section when the project includes UI.

- Interactive elements must be keyboard-accessible.
- Images and icon-only controls must have appropriate text alternatives.
- Color contrast and focus visibility must be preserved.

## 9. Security rules

- Never commit secrets, tokens, or credentials.
- Validate and sanitize external or user-provided input.
- Apply least-privilege access to integrations and data handling.
- Treat security-impacting ambiguity as a blocker, not a default.

## 10. Forbidden patterns

- Silent dependency adoption.
- Broad refactor outside current scope.
- Placeholder logic presented as complete implementation.
- Empty error handling that hides failures.
- Direct edits to unrelated artifacts without justification.

## 11. Scope control

- Implement only what is required by the current approved artifact set.
- Keep non-essential cleanup out of feature work unless explicitly requested.
- Escalate ambiguity when it changes architecture, data model, security, or delivery risk.

## 12. Runtime Usability Gate

Use this section for every user-facing feature, including UI, API-backed UI flows, and any feature whose value is validated through an application runtime.

- Every user-facing feature must define a Golden Path: the primary user opens the expected entry point and completes the main scenario without knowing hidden or internal URLs.
- A user-facing feature is not eligible for `released` status unless the app can be started locally or in the agreed target environment.
- The primary user must be able to reach the feature from an expected UI entry point such as the home page, list page, navigation, or documented product entry.
- Empty, loading, and error states must not silently block the main path; they must guide the user to the next recoverable action when recovery is possible.
- API or backend behavior required by the UI must be smoke-tested through the runtime path, not only by static inspection.
- If the project has no runnable toolchain or the target runtime cannot be started, missing runtime verification is a Blocker for release, not a follow-up.
- Task completion is subordinate to product usability: code that exists but is not reachable through the Golden Path is not done for user-facing scope.

## 13. Delivery and release rules

- Definition of Done must be satisfied before marking work complete.
- Verification must check acceptance criteria, regressions, and governance compliance.
- Post-feature review must decide whether shared artifacts need updates.
- User-facing features must pass Runtime Usability Gate before release marking.

## 14. Default decision policy

- Use safe, reversible defaults only for low-risk uncertainty.
- Label provisional defaults explicitly.
- Do not convert assumptions into facts without confirmation.

## 15. Evidence labeling policy

Use consistent labels in planning and review artifacts:

- Known
- Inferred
- Recommended
- Assumed
- Open question
- Blocker

## 16. Project-wide out of scope

- [Explicit non-goal 1]
- [Explicit non-goal 2]
- [Explicit non-goal 3]

## 17. Decision log and open questions

### Approved decisions

- [Decision]

### Provisional defaults

- [Default requiring later confirmation]

### Open questions

- [Question]

## 18. Changelog

- YYYY-MM-DD: Initial version
- 2026-05-31: Added Runtime Usability Gate for Golden Path, runtime smoke, and release blocking rules.
