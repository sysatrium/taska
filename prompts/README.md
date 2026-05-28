# SDD Greenfield Prompts

Эта папка содержит интерактивный набор prompts для запуска greenfield-проекта через Spec-Driven Development.

Основная идея проста: не создавать пустую структуру механически. Вместо этого нужно пройти через структурированное интервью с AI, зафиксировать явные проектные решения и создать meaningful operating artifacts.

## Как использовать

Запускайте prompts последовательно.

Не переходите к следующему шагу, пока предыдущий не создал ожидаемые файлы и не прошёл quality gate.

Ответ "не знаю" — нормальный сценарий.

Если оператор пока не знает ответа, агент должен сузить пространство решений, а не повторять тот же вопрос без прогресса.

## Правила партнёрского bootstrap

Во время bootstrap агент должен следовать схеме:

`что уже известно -> чего не хватает -> какие есть жизнеспособные варианты -> recommended default -> что нужно подтвердить пользователю`

Правила рекомендаций:

- сначала использовать известный контекст
- использовать релевантные industry good и best practices
- использовать проверенные паттерны из похожих систем
- предлагать 2-3 жизнеспособных варианта
- рекомендовать самый безопасный управляемый default
- кратко объяснять tradeoff
- явно помечать временные default-решения

## Anti-hallucination rules

- не придумывать hidden assumptions
- переводить неподтверждённую неопределённость в открытые вопросы
- помечать важные решения как Known, Inferred, Recommended, Assumed, «Открытый вопрос» или «Блокер»
- добавлять confidence, если рекомендации опираются на неполный контекст
- блокировать финализацию при high-risk ambiguity

## Эталонный пример

Перед созданием нового feature package просмотрите demo pack в `specs/001-demo-feature/`.

Считайте его ожидаемым baseline для:

- структуры evidence map
- traceability между spec и plan
- granularity задач
- contract-first artifacts
- стиля verifier output

## Второй эталонный пример

Используйте `specs/002-demo-ui-feature/` как UI-heavy companion example к `specs/001-demo-feature/`.

Он показывает modeling inline interactions, проектирование UI state schema, frontend task decomposition и ожидания verifier для stateful user-facing features.

## Третий эталонный пример

Используйте `specs/003-demo-integration-feature/` как integration-heavy reference example.

Он показывает webhook contracts, async reconciliation, idempotency, stale-event handling, observability и ожидания verifier для интеграций с внешними системами.
## Discovery phase

Используйте discovery-prompts до bootstrap или до feature specification, когда команде ещё нужно прояснить сегмент, jobs, границы MVP или рискованные предположения.


## Canonical paths

Используйте единые canonical paths для всех стадий:

- constitution: `specs/000-project-overview/constitution.md`
- project overview: `specs/000-project-overview/spec.md`
- architecture: `specs/000-project-overview/architecture.md`
- data model: `specs/000-project-overview/data-model.md`
- discovery: `specs/000-project-overview/discovery.md`
- feature artifacts: `specs/NNN-feature-name/`

## Roles of artifacts

- `prompts/` — executable workflow и operating instructions.
- `specs/` — canonical project and feature artifacts.
- demo feature folders в `specs/001-*`, `002-*`, `003-*` — reference examples, а не source-of-truth для нового проекта.
- `examples/` — справочные шаблоны и практики, которые нужно адаптировать, а не копировать без нормализации.
