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
- stop and escalate if the task cannot be completed cleanly

Output:
- source changes only for the selected task
