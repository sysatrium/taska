# Создание SDD-структуры и шаблонов

## Назначение

Создать переиспользуемую структуру директорий и шаблоны для greenfield Spec-Driven Development проекта.

Этот prompt создаёт scaffolding после того, как базовые проектные решения уже приняты.

## Когда использовать

Используйте после создания:

```text
.specify/memory/constitution.md
AGENTS.md
CLAUDE.md
specs/000-project-overview/
```

## Необходимые входные данные

- `.specify/memory/constitution.md`
- `AGENTS.md`
- `specs/000-project-overview/spec.md`
- `specs/000-project-overview/data-model.md`
- `specs/000-project-overview/architecture.md`

## Инструкции для AI

Создай следующую структуру, если она ещё не существует:

```text
.specify/
  memory/
  scripts/
  checklists/

specs/
  000-project-overview/
  templates/

src/
```

Создай файлы:

```text
specs/templates/spec-template.md
specs/templates/plan-template.md
specs/templates/tasks-template.md
specs/templates/verification-template.md
specs/templates/adr-template.md
.specify/checklists/pre-implementation-checklist.md
SPEC_PROCESS.md
README.md
```

Используй существующие `constitution.md` и `AGENTS.md`, чтобы адаптировать шаблоны под проект.

Не перезаписывай существующие файлы без явного подтверждения.

`SPEC_PROCESS.md` должен объяснять lifecycle:

```text
Specify -> Plan -> Tasks -> Implement -> Verify
```

`README.md` должен объяснять:

- Что это за проект.
- Где находятся SDD-артефакты.
- Как начать новую фичу.
- Когда разрешено начинать кодинг.

## Выходные файлы

```text
specs/templates/spec-template.md
specs/templates/plan-template.md
specs/templates/tasks-template.md
specs/templates/verification-template.md
specs/templates/adr-template.md
.specify/checklists/pre-implementation-checklist.md
SPEC_PROCESS.md
README.md
src/
```

## Quality gate

Результат приемлем только если:

- Структура поддерживает feature-by-feature SDD.
- Шаблоны содержат конкретные обязательные разделы.
- Checklist предотвращает кодинг до готовности specs, plan, tasks и contracts.
- README и SPEC_PROCESS согласованы между собой.

