# Создание Project Overview Specs

## Назначение

Создать верхнеуровневые спецификации проекта:

```text
specs/000-project-overview/spec.md
specs/000-project-overview/data-model.md
specs/000-project-overview/architecture.md
```

Эти файлы задают системный контекст, с которым должны быть согласованы все feature specs.

## Когда использовать

Используйте после создания:

```text
.specify/memory/constitution.md
AGENTS.md
```

## Необходимые входные данные

- `.specify/memory/constitution.md`
- `AGENTS.md`
- Продуктовая идея и бизнес-контекст.
- Известные типы пользователей.
- Известные сущности или domain concepts.
- Известные архитектурные ограничения.

## Инструкции для AI

Прочитай `.specify/memory/constitution.md` и `AGENTS.md`.

Перед генерацией файлов проведи интервью. Спроси про:

1. Product vision.
2. Target users.
3. Primary workflows.
4. Business outcomes.
5. High-level in-scope и out-of-scope.
6. Core domain entities.
7. External systems и integrations.
8. Data ownership и privacy requirements.
9. Architecture assumptions.

Затем создай:

### `specs/000-project-overview/spec.md`

Включи:

- Product summary.
- Problem statement.
- Target users.
- Primary outcomes.
- In-scope.
- Out-of-scope.
- High-level capabilities.
- Success metrics.
- Constraints and assumptions.

### `specs/000-project-overview/data-model.md`

Включи:

- Core entities.
- Entity relationships.
- Data ownership.
- Data lifecycle.
- Sensitive data.
- Retention rules, если известны.
- Mermaid ER diagram, если полезно.

### `specs/000-project-overview/architecture.md`

Включи:

- System context.
- Component overview.
- Integration boundaries.
- Architecture principles.
- Раздел Key Architecture Decision Records.
- Mermaid component diagram, если полезно.

## Выходные файлы

```text
specs/000-project-overview/spec.md
specs/000-project-overview/data-model.md
specs/000-project-overview/architecture.md
```

## Quality gate

Результат приемлем только если:

- Project overview достаточно конкретен, чтобы ограничивать будущие features.
- Out-of-scope указан явно.
- Data model не противоречит architecture.
- Architecture не противоречит constitution.
- Open questions явно отмечены.

