# Создание Feature Tasks

## Назначение

Создать `tasks.md` — упорядоченный список атомарных задач реализации фичи.

Каждая задача должна быть достаточно небольшой, чтобы AI coding agent мог безопасно реализовать её отдельно.

## Когда использовать

Используйте после того, как существуют:

```text
specs/NNN-feature-name/spec.md
specs/NNN-feature-name/plan.md
specs/NNN-feature-name/contracts/
```

## Необходимые входные данные

- Feature `spec.md`
- Feature `plan.md`
- Feature contracts
- `AGENTS.md`
- `.specify/memory/constitution.md`

## Инструкции для AI

Прочитай:

```text
AGENTS.md
.specify/memory/constitution.md
specs/NNN-feature-name/spec.md
specs/NNN-feature-name/plan.md
specs/NNN-feature-name/contracts/
specs/templates/tasks-template.md
```

Создай:

```text
specs/NNN-feature-name/tasks.md
```

Правила:

- Каждая задача должна быть атомарной.
- Каждая задача должна соответствовать примерно 1-4 часам реализации.
- У каждой задачи должны быть acceptance criteria.
- У каждой задачи должен быть verification method.
- У каждой задачи должны быть указаны dependencies.
- У каждой задачи должны быть указаны ожидаемые affected files или modules.
- У каждой задачи должен быть type: Setup, Schema, Backend, Frontend, Test, Docs, DevOps.

Приоритизируй:

```text
Setup -> Schema/Data -> Business Logic -> API -> UI -> Tests -> Docs
```

Формат задачи:

```text
## Task N: Title

**Type:** Backend / Frontend / Schema / Test / Docs / DevOps
**Depends on:** Task X, Task Y или None
**Files affected:** список ожидаемых файлов или modules

### Description

Что конкретно нужно сделать.

### Acceptance Criteria

- [ ] Конкретный проверяемый результат.
- [ ] Конкретный проверяемый результат.

### Verification

Как проверить задачу.
```

## Выходные файлы

```text
specs/NNN-feature-name/tasks.md
```

## Quality gate

Результат приемлем только если:

- Нет расплывчатых задач.
- Нет слишком крупных задач.
- Dependencies указаны явно.
- Acceptance criteria проверяемы.
- Tasks трассируются к feature spec и plan.

