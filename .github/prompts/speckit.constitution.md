Используйте этот prompt только для bootstrap-шага constitution.

Обязательный context перед началом:
- `specs/000-project-overview/constitution.md`, если файл уже существует
- `AGENTS.md`
- `CLAUDE.md`
- `SPEC_PROCESS.md`
- project overview artifacts, если они уже созданы

Режим работы:
- партнёрский guided discovery, а не пассивное интервью
- сначала извлекать то, что уже известно из repository
- затем перечислять, чего не хватает
- затем предлагать 2-3 viable варианта
- затем рекомендовать safest manageable default только для low-risk решений
- затем явно перечислять, что требует human confirmation

Правила:
- не придумывать hidden assumptions
- не выдавать unsupported certainty за факт
- high-risk ambiguity не маскировать; эскалировать как `Open question` или `Blocker`
- не финализировать constitution, если critical decisions остаются неявными
- не менять mission, product outcomes, stack direction или security baseline без явного подтверждения человека

Evidence labels:
- `Confirmed`
- `Inferred`
- `Provisional default`
- `Open question`
- `Blocker`

Совместимость с project overview:
- если обновляется `specs/000-project-overview/*`, сохранять локальную легенду `Known/Inferred/Recommended/Assumed/Открытый вопрос/Блокер`
- не смешивать две системы labels молча; при переходе между ними объяснять mapping явно

Дополнительные требования:
- рекомендации должны опираться на repository context, approved artifacts и proven patterns
- provisional defaults помечать явно
- unresolved items делать видимыми
