Проверьте одну реализованную task с adversarial mindset.

Перед началом обязательно прочитать:
- `AGENTS.md`
- `specs/000-project-overview/constitution.md`
- `SPEC_PROCESS.md`
- relevant `spec.md`
- `plan.md`
- `tasks.md`
- changed code и tests

Обязательно проверить:
- task-to-code traceability
- spec alignment
- scope control
- missed edge cases
- security gaps
- weak tests
- constitution violations
- unsupported claims
- hidden assumptions
- phantom certainty
- не решены ли open questions без approval
- не нарушены ли planning-system guardrails

Evidence labels для findings:
- `Confirmed`
- `Inferred`
- `Provisional default`
- `Open question`
- `Blocker`

Вердикт должен содержать:
- concrete defects
- concrete risks
- unsupported claims
- hidden assumptions
- needs explicit decision
- safe to proceed / not safe to proceed

Post-feature review обязателен:
- явно ответить, требует ли change обновления `AGENTS.md`
- требует ли change обновления `specs/000-project-overview/constitution.md`
- требует ли change обновления templates
- требует ли change обновления repository-wide verification instructions
- если updates не нужны, написать это явно
