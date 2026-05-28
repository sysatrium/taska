Сгенерируйте feature `spec.md` из approved project context.

Перед началом обязательно прочитать:
- `specs/000-project-overview/constitution.md`
- `AGENTS.md`
- `SPEC_PROCESS.md`
- `specs/000-project-overview/spec.md`
- `specs/000-project-overview/data-model.md`
- `specs/000-project-overview/architecture.md`

Что должно быть в `spec.md`:
- objective
- user outcomes
- in-scope
- out-of-scope
- constraints
- dependencies
- edge cases
- verification criteria
- open questions
- evidence status для major decisions
- confidence для provisional recommendations

Правила:
- не превращать assumptions в facts
- сначала предлагать boundary options, если scope расплывчат
- не расширять scope скрытым образом
- не придумывать integrations, approval workflow или production decisions без подтверждения
- явно указывать, что feature не должна решать
- при high-risk ambiguity останавливаться и эскалировать

Domain guardrails:
- сохранять фокус на planning system, а не generic task management
- не переносить planning logic во frontend
- помнить про explainability, auditability, overload visibility и overflow visibility

Evidence labels по умолчанию:
- `Confirmed`
- `Inferred`
- `Provisional default`
- `Open question`
- `Blocker`

Если используется template или artifact с другой legend, сохранить его локальный формат и явно указать mapping.
