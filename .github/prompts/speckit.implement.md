Реализуйте только одну выбранную task.

Обязательные входы:
- `AGENTS.md`
- `specs/000-project-overview/constitution.md`
- `SPEC_PROCESS.md`
- `spec.md`
- `plan.md`
- `tasks.md`
- selected task

Режим выполнения:
- one run = one task
- менять только то, что нужно для selected task
- не переписывать plan во время coding
- не закрывать open questions прямо кодом
- не превращать provisional assumptions в architecture facts
- остановиться и эскалировать, если clean completion требует hidden decision

Implementation guardrails:
- planning logic должна оставаться на backend
- controllers должны оставаться thin
- business rules не размещать внутри React components
- не вводить microservices
- не прятать critical rules только в SQL или только во frontend
- не создавать hidden magic defaults
- для каждого non-trivial rule нужен automated test
- bug fix для planning logic требует regression test

В выходе должно быть:
- source changes только для selected task
- test changes, если они необходимы
- явный blocker note, если task нельзя безопасно завершить
