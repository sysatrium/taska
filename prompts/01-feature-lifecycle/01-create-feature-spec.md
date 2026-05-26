# Создание Feature Spec

## Назначение

Создать `spec.md` для новой фичи или эпика.

Feature spec определяет, какой результат должен быть достигнут до начала архитектурного планирования и реализации.

## Когда использовать

Используйте для каждой новой фичи до создания implementation plan, task breakdown и кода.

## Необходимые входные данные

- Название фичи.
- Бизнес-контекст.
- Пользователь или stakeholder.
- Желаемый outcome.
- Existing project overview.
- `AGENTS.md`
- `.specify/memory/constitution.md`

## Инструкции для AI

Прочитай:

```text
AGENTS.md
.specify/memory/constitution.md
specs/000-project-overview/spec.md
specs/templates/spec-template.md
```

Не создавай feature spec сразу.

Сначала проведи интервью. Спроси про:

1. Измеримые outcomes.
2. In-scope поведение.
3. Out-of-scope поведение.
4. Constraints and assumptions.
5. Decisions already made.
6. User flows.
7. Edge cases.
8. Verification criteria.
9. Dependencies and integrations.

Затем создай новую папку фичи:

```text
specs/NNN-feature-name/
```

Используй следующий доступный numeric prefix.

Создай:

```text
specs/NNN-feature-name/spec.md
```

Spec должен включать:

1. Outcomes
2. In-Scope
3. Out-of-Scope
4. Constraints and Assumptions
5. Decisions Already Made
6. Preliminary Task Breakdown
7. Verification Criteria

## Выходные файлы

```text
specs/NNN-feature-name/spec.md
```

## Quality gate

Результат приемлем только если:

- Outcomes измеримы.
- Out-of-scope указан явно.
- Verification criteria проверяемы.
- Фича не противоречит project overview и constitution.
- Любая неоднозначность зафиксирована как open question.

