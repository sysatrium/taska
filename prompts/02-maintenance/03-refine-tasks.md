# Уточнение Feature Tasks

## Назначение

Уточнить `tasks.md`, если задачи слишком крупные, неоднозначные, заблокированные или не согласованы со spec и plan.

## Когда использовать

Используйте, когда:

- Implementation agent говорит, что задача слишком широкая.
- Verifier находит неясные acceptance criteria.
- Task dependencies указаны неверно.
- Plan изменился.
- Задачу нужно разделить на несколько smaller tasks.

## Необходимые входные данные

- Feature folder.
- Текущий `spec.md`
- Текущий `plan.md`
- Текущий `tasks.md`
- Причина refinement.

## Инструкции для AI

Прочитай:

```text
AGENTS.md
.specify/memory/constitution.md
specs/NNN-feature-name/spec.md
specs/NNN-feature-name/plan.md
specs/NNN-feature-name/tasks.md
```

Уточни `tasks.md`.

Правила:

- Сохрани traceability к spec и plan.
- Раздели крупные задачи на smaller tasks.
- Добавь missing dependencies.
- Сделай acceptance criteria конкретными.
- Сохрани atomicity задач.
- Не вводи scope, которого нет в spec.
- Если сначала нужно изменить spec или plan, остановись и объясни почему.

## Выходные файлы

Обновлённый:

```text
specs/NNN-feature-name/tasks.md
```

Опционально:

```text
specs/NNN-feature-name/spec.md
specs/NNN-feature-name/plan.md
```

## Quality gate

Результат приемлем только если:

- Каждая задача может быть реализована независимо.
- Acceptance criteria проверяемы.
- Dependencies корректны.
- Нет скрытого scope expansion.

