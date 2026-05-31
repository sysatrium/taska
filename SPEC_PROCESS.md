# SPEC_PROCESS.md

## Purpose

This document defines the feature lifecycle used by the repository. It complements the constitution and `AGENTS.md` by making the delivery gates explicit.

## Lifecycle

```text
Discovery / Proposal
  -> Feature Spec
  -> Plan
  -> Tasks
  -> Implement
  -> Verify
  -> Runtime Smoke
  -> Release Marking
```

`Runtime Smoke` is mandatory for every user-facing feature. It is not optional cleanup and it does not happen after release marking.

## Golden Path requirement

Every user-facing feature must define one Golden Path before implementation:

- Expected entry point: where the user starts.
- Main action: what the user does.
- Success result: what confirms the scenario worked.
- Natural next step: where the user lands or what they can do next.

The Golden Path must be executable without hidden/internal URLs. Hidden routes may exist, but they do not count as product usability unless the user can reach them through the expected UI or documented product entry.

## Runtime Smoke gate

Before `07-mark-feature-release.md` may be used, verification must show that:

- The app can be started locally or in the agreed target environment.
- The primary user can reach the feature from the expected entry point.
- The main scenario can be completed end to end.
- Empty, loading, and error states do not silently trap the user.
- Required API/backend behavior has been smoke-tested through the UI or runtime path.

If any of these cannot be checked, the release must stop and the issue must be recorded as a Blocker.

## Release marking rule

`status: released` may be set only after:

1. Implementation is complete.
2. Verification has passed or all non-blocking follow-ups are explicitly accepted.
3. Runtime Smoke has passed for user-facing scope.
4. A human has confirmed inclusion in release or the project has an explicit automated release policy.

Successful static verification alone is not enough for release.

## Follow-up vs Blocker

Use `follow-up` for improvements that do not prevent the approved user outcome from working. Use `Blocker` for anything that prevents verification, runtime execution, Golden Path completion, security, or data integrity.

Missing runnable toolchain is a Blocker for releasing user-facing features when it prevents runtime smoke.

## Changelog

- 2026-05-31: Initial lifecycle definition with Runtime Smoke between Verify and Release Marking.
