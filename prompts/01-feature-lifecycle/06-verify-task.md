# Feature 4.2 — Verify Task

## Purpose

Use a separate verifier role to challenge the implementation.

## Required checks

- spec compliance
- no out-of-scope additions
- conventions compliance
- forbidden pattern detection
- security checks
- null/empty/boundary cases
- test adequacy

## Output

List findings with severity:

- BLOCKER
- MAJOR
- MINOR

## Quality gate

Accept only if the verifier is optimized to find faults, not to confirm success.
