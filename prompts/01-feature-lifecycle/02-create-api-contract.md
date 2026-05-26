# Создание API и Data Contracts

## Назначение

Создать формальные контракты для фичи.

Контракты могут включать OpenAPI, AsyncAPI, JSON Schema, event schema или database schema notes в зависимости от архитектуры проекта.

## Когда использовать

Используйте после создания `spec.md` и до создания `plan.md` или реализации.

## Необходимые входные данные

- `specs/NNN-feature-name/spec.md`
- `.specify/memory/constitution.md`
- `AGENTS.md`
- Existing project data model.

## Инструкции для AI

Прочитай:

```text
AGENTS.md
.specify/memory/constitution.md
specs/000-project-overview/data-model.md
specs/NNN-feature-name/spec.md
```

Задай уточняющие вопросы, если spec не определяет:

- API consumers.
- Authentication and authorization.
- Request and response fields.
- Error cases.
- Idempotency.
- Rate limiting.
- Data validation.

Создай:

```text
specs/NNN-feature-name/contracts/
```

В зависимости от фичи создай один или несколько файлов:

```text
specs/NNN-feature-name/contracts/api-spec.yaml
specs/NNN-feature-name/contracts/data-schema.json
specs/NNN-feature-name/contracts/events.yaml
```

Для OpenAPI:

- Используй OpenAPI 3.x.
- Включи все endpoints.
- Включи request и response schemas.
- Включи все success и error HTTP codes.
- Добавь examples.
- Добавь security schemes.
- Укажи rate limits и idempotency notes, если релевантно.
- Опиши каждое поле.

## Выходные файлы

Один или несколько:

```text
specs/NNN-feature-name/contracts/api-spec.yaml
specs/NNN-feature-name/contracts/data-schema.json
specs/NNN-feature-name/contracts/events.yaml
```

## Quality gate

Результат приемлем только если:

- Contracts соответствуют feature spec.
- Error cases указаны явно.
- Security requirements отражены.
- Data structures не противоречат project data model.
- Нет схем, состоящих только из placeholders.

