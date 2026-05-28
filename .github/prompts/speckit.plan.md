Сгенерируйте `plan.md` из `spec.md` и relevant contracts.

Перед началом обязательно прочитать:
- `specs/000-project-overview/constitution.md`
- `AGENTS.md`
- `SPEC_PROCESS.md`
- approved `spec.md`
- relevant contracts
- project overview artifacts при наличии затрагивания architecture или data model

`plan.md` должен включать:
- traceability к spec
- architecture impact
- data flow
- schema/storage changes
- API/contracts impact
- risks and mitigations
- non-functional requirements
- rollout and rollback
- decision status для major choices
- unsupported или weakly supported areas

Правила:
- не вводить architecture changes без traceability
- distinguish approved decisions от provisional recommendations
- не делать hidden decisions за пользователя
- не трактовать SQLite как final production database strategy
- не вводить microservices, если это не approved change
- если change влияет на shared rules, отметить это заранее

Evidence labels по умолчанию:
- `Confirmed`
- `Inferred`
- `Provisional default`
- `Open question`
- `Blocker`

В конце плана явно укажите:
- что план делает
- что план не решает
- какие решения требуют human confirmation
