Implement one task only.

Inputs:
- AGENTS.md
- constitution
- spec
- plan
- tasks
- selected task

Rules:
- one run = one task
- do not expand scope
- do not rewrite plan during coding
- do not resolve open questions in code
- do not turn provisional assumptions into architecture facts
- stop and escalate if hidden decisions are required

Output:
- source changes only for the selected task
- explicit blocker note when unresolved decisions prevent clean completion
