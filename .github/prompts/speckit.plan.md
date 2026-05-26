Generate `plan.md` from `spec.md` and relevant contracts.

Evidence labels to use for major decisions:
- Known
- Inferred
- Recommended
- Assumed
- Open Question
- Blocked

Must include:
- traceability to spec
- architecture changes
- data flow
- schema or storage changes
- integrations
- risks and mitigations
- non-functional requirements
- rollout and rollback
- decision status for major choices
- unsupported or weakly supported areas

Rules:
- do not introduce architecture changes without traceability
- distinguish approved decisions from provisional recommendations
- use the evidence labels when documenting weakly supported or unresolved areas
