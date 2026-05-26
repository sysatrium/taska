# taska

Production-grade репозиторий для **Spec-Driven Development (SDD)** в greenfield-проектах.

Этот репозиторий помогает человеку и AI coding-агентам сначала создавать спецификации, потом выполнять delivery через детерминированные handoff и улучшать систему через verification и incident feedback.

## Назначение

Используйте репозиторий для полного цикла:

`Bootstrap -> Specify -> Contract -> Plan -> Tasks -> Implement -> Verify -> Learn`

## Каноническая политика

Корень репозитория является canonical source для структуры и operating rules.

`ru/` используется для русскоязычного onboarding и синхронизированной локальной документации.

Если root и `ru/` расходятся, сначала обновляется root, затем синхронизируется `ru/`.

## Operating model

Этот kit предполагает human-led bootstrap:

1. Человек запускает bootstrap prompts по порядку.
2. AI-агенты создают проектные operating artifacts.
3. Работа по фичам начинается только после завершения bootstrap gate.
4. Каждая фича реализуется через атомарные задачи.
5. Проверку выполняет отдельный verifier-агент.
6. Инциденты обновляют specs, constraints или verification criteria, а не только код.

## Партнёрский bootstrap

Для новичка начните с `ru/GETTING-STARTED.md` — это пошаговый гид по первому запуску репозитория и безопасному входу в SDD workflow.

Неопределённость новичка считается нормальной.

Если пользователь не знает ответа, агент должен работать не как пассивный интервьюер, а как партнёр по принятию решений.

Обязательная схема:

`что уже известно -> чего не хватает -> какие есть жизнеспособные варианты -> recommended default -> что нужно подтвердить пользователю`

Рекомендации должны опираться на:

- уже известный контекст проекта
- релевантные отраслевые good и best practices
- проверенные паттерны из похожих систем

Правила рекомендаций:

- выбирать самый безопасный и управляемый default, а не самый модный вариант
- показывать 2-3 жизнеспособных варианта, а не бесконечный список
- кратко объяснять tradeoff
- явно помечать временные default-решения
- эскалировать, а не угадывать, если неопределённость high-risk

## Anti-hallucination policy

Репозиторий использует controlled uncertainty вместо скрытого выдумывания.

Обязательные механизмы:

- никаких hidden assumptions; неразрешённые вопросы фиксируются как открытые вопросы
- важные решения помечаются как Known, Inferred, Recommended, Assumed, «Открытый вопрос» или «Блокер»
- рекомендации получают confidence level, если контекст неполный
- high-risk ambiguity блокирует финализацию вместо догадки
- verifier ищет unsupported claims и phantom certainty

## Governance решений

### Приоритет источников истины

При конфликте информации используйте такой порядок:

1. явное подтверждение человека
2. текущая constitution
3. утверждённый project overview
4. утверждённая feature spec
5. утверждённый plan
6. inferred context

### Бюджет допущений

Нельзя допускать накопление большого числа скрытых assumptions.

Если для продолжения требуется слишком много допущений, их нужно перевести в открытые вопросы или сделать blocker.

### Точки заморозки решений

После утверждения constitution, approved spec или approved plan агентам нельзя молча пересматривать эти решения на следующих фазах.

Для изменений нужно использовать явные update flows.

## Эталонный пример

Используйте demo feature pack как канонический пример того, как одна фича должна проходить через весь SDD lifecycle.

Основной пример:

- `specs/001-demo-feature/spec.md`
- `specs/001-demo-feature/plan.md`
- `specs/001-demo-feature/tasks.md`
- `specs/001-demo-feature/contracts/api-spec.yaml`
- `specs/001-demo-feature/contracts/data-schema.json`
- `specs/001-demo-feature/verify.md`

Используйте этот пакет для калибровки формата agent output, глубины traceability, evidence labeling и ожиданий от verifier до генерации новых feature artifacts.

## Второй эталонный пример

Используйте `specs/002-demo-ui-feature/` как UI-heavy companion example к `specs/001-demo-feature/`.

Он показывает modeling inline interactions, проектирование UI state schema, frontend task decomposition и ожидания verifier для stateful user-facing features.

## Третий эталонный пример

Используйте `specs/003-demo-integration-feature/` как integration-heavy reference example.

Он показывает webhook contracts, async reconciliation, idempotency, stale-event handling, observability и ожидания verifier для интеграций с внешними системами.
## Discovery flow

Запускайте discovery до bootstrap, когда продуктовый контекст или границы MVP ещё не прояснены.

1. `prompts/00-discovery/01-run-prd-interview.md`
2. `prompts/00-discovery/02-summarize-discovery.md`
3. `prompts/00-discovery/03-generate-segments-and-jobs.md`
4. `prompts/00-discovery/04-rank-risky-assumptions.md`
5. `prompts/00-discovery/05-freeze-mvp-boundaries.md`

Эти prompts наполняют `specs/000-project-overview/discovery.md`, `segments-and-jobs.md`, `risks-and-assumptions.md` и `mvp-boundaries.md`.
