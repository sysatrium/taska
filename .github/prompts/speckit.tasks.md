Сгенерируйте `tasks.md` из approved `spec.md` и `plan.md`.

Перед началом обязательно прочитать:
- `specs/000-project-overview/constitution.md`
- `AGENTS.md`
- `SPEC_PROCESS.md`
- approved `spec.md`
- approved `plan.md`

Правила:
- только atomic tasks
- explicit dependencies между tasks
- перечислить affected files
- для каждой task указать acceptance criteria
- для каждой task указать verification method
- задачи не должны молча решать unresolved product или architecture questions
- каждая task должна явно фиксировать, что она не должна решать
- block instead of improvising, если upstream decisions отсутствуют
- prefer thin vertical slices
- одна task должна вести к проверяемому результату

Дополнительно:
- учитывать contracts folder policy: `specs/NNN-feature-slug/contracts/`
- если нужны новые contracts или ADR, создать отдельные tasks
- если change может затронуть shared artifacts, добавить task на post-feature review
