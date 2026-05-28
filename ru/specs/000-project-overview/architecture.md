# Обзор architecture

## Назначение

Зафиксировать top-level architecture boundaries, modules, integrations и trade-offs до начала feature-specific planning.

## Легенда evidence labels

- **Known**
- **Inferred**
- **Recommended**
- **Assumed**
- **Открытый вопрос**
- **Блокер**

## 1. System context

- **Known**: Система — internal planning application для одного продукта или product line.
- **Known**: Основные пользователи — product leader и team lead; read-only stakeholder рекомендован как дополнительный actor.
- **Known**: Система должна заменить manual aggregation plan data из разрозненных источников.
- **Assumed**: Первый shared deployment ориентирован на controlled internal usage, а не на public internet product.

## 2. Architecture boundaries

- **Known**: Frontend и backend разделены явным API boundary.
- **Known**: Core planning logic живёт на backend.
- **Known**: Backend стартует как modular monolith.
- **Known**: External integrations в MVP не являются обязательной частью core architecture.
- **Recommended**: Domain, application, infrastructure и interface concerns должны быть отделены друг от друга даже внутри modular monolith.

## 3. Major modules

### Frontend application

- **Known**: React + TypeScript + Vite.
- **Responsibility**: UI для product-level и team-level planning views, forms ввода planning inputs, review risks и overflow.
- **Constraint**: Не хранить core planning rules только во frontend.

### API layer

- **Known**: REST-first JSON API.
- **Responsibility**: Принимать requests, валидировать input, вызывать use cases, возвращать explainable responses.
- **Constraint**: Controllers должны оставаться thin.

### Planning domain module

- **Known**: Ключевой системный модуль.
- **Responsibility**: Prioritization, fit checks, allocation rules, overload detection, dependency checks, overflow detection, rationale generation.
- **Constraint**: Поведение должно быть deterministic и reproducible.

### Persistence module

- **Known**: SQLite baseline.
- **Recommended**: Persistence abstractions не должны зашивать business truth в SQLite-specific behavior.
- **Responsibility**: Хранение planning entities, relationships и audit-relevant data.

### Verification and audit support

- **Inferred**: Нужен модуль или subsystem для audit events, change history и verification-friendly tracing planning decisions.
- **Recommended**: Даже если это не отдельный deployable модуль, эта ответственность должна быть явно выделена в architecture.

## 4. Integration patterns

- **Known**: Внутренние модули backend взаимодействуют in-process.
- **Known**: Frontend общается с backend по synchronous HTTP API.
- **Recommended**: External integrations проектировать через adapters.
- **Recommended**: Import/export и reporting делать отдельными application services, а не смешивать с core planning rules.
- **Открытый вопрос**: Нужна ли event-driven integration модель на более позднем этапе.

## 5. Cross-cutting concerns

- **Known**: Validation обязательна на API boundaries и write paths.
- **Known**: Role-based access control требуется до широкого multi-user usage.
- **Known**: Planning changes, влияющие на priorities, allocations, capacity и scope, должны быть auditable.
- **Known**: Automated tests обязательны для non-trivial rules.
- **Recommended**: Logging и tracing должны помогать объяснять planning outcomes, а не только технические сбои.
- **Recommended**: Sanitization обязательна для user-provided rich text или notes.

## 6. Key constraints

- **Known**: Не вводить microservices на раннем этапе.
- **Known**: Не прятать critical business rules только в SQL queries.
- **Known**: Не использовать hidden magic defaults.
- **Known**: Не считать SQLite окончательным production database decision.
- **Recommended**: Все module boundaries должны облегчать future migration на server database и возможные integrations.

## 7. Approved vs provisional architecture decisions

### Approved decisions

- Separated frontend/backend system.
- React + TypeScript + Vite на frontend.
- NestJS + TypeScript на backend.
- Backend как modular monolith.
- Backend-owned planning logic.
- SQLite как bootstrap и early MVP database baseline.

### Provisional decisions

- Prisma как ORM.
- REST-first JSON API как основной integration style.
- Read-only stakeholder как отдельный actor первого уровня.
- Audit support как выделенная responsibility внутри backend.

### Decisions requiring human confirmation

- Auth mechanism.
- Hosting target.
- Scope external integrations.
- Approval workflow.
- Production database strategy после pilot/starter этапа.

## 8. High-risk unresolved decisions

- **Открытый вопрос**: Нужен ли concurrent multi-user editing в первом shared deployment.
- **Открытый вопрос**: Какая глубина audit trail требуется.
- **Открытый вопрос**: Нужен ли отдельный planning scenario engine.
- **Блокер**: Нет на этапе Bootstrap 0.3, пока эти вопросы остаются явно видимыми и не маскируются как confirmed.

## 9. Trade-offs and rationale

- **Known**: Выбран separated frontend/backend system вместо full-stack monolith с общей runtime-логикой, чтобы лучше контролировать API boundary и backend-owned planning logic.
- **Known**: Выбран modular monolith вместо microservices ради manageability на раннем этапе.
- **Known**: Выбран SQLite как simplicity-first baseline, чтобы не увеличивать bootstrap complexity раньше времени.
- **Recommended**: Платой за SQLite baseline считается обязательная readiness к migration, если система выйдет в серьёзный shared production usage.

## 10. Decision freeze policy

- **Known**: Последующие агенты не могут молча менять approved stack direction.
- **Known**: Последующие агенты не могут переносить planning logic во frontend.
- **Known**: Последующие агенты не могут трактовать provisional decisions как confirmed.
- **Known**: Любой change, затрагивающий architecture baseline, должен быть явно отражён в shared artifacts после verification.
