# Проверка Pre-Implementation Checklist

## Назначение

Проверить, готова ли фича к началу кодинга.

Это финальный gate перед implementation.

## Когда использовать

Используйте перед запуском `05-implement-task.md` для первой задачи фичи.

## Необходимые входные данные

- Feature folder.
- Project constitution.
- AGENTS.md.
- Feature `spec.md`.
- Feature contracts.
- Feature `plan.md`.
- Feature `tasks.md`.

## Инструкции для AI

Прочитай:

```text
.specify/memory/constitution.md
AGENTS.md
.specify/checklists/pre-implementation-checklist.md
specs/NNN-feature-name/spec.md
specs/NNN-feature-name/contracts/
specs/NNN-feature-name/plan.md
specs/NNN-feature-name/tasks.md
```

Оцени готовность к реализации.

Проверь:

1. Constitution существует и актуален.
2. AGENTS.md существует и актуален.
3. Feature spec содержит все обязательные разделы.
4. Outcomes измеримы.
5. In-scope и out-of-scope указаны явно.
6. Constraints and assumptions указаны явно.
7. Contracts существуют там, где нужны.
8. Plan объясняет architecture и risks.
9. Tasks атомарны и упорядочены по dependencies.
10. Acceptance criteria проверяемы.
11. Data model и migrations описаны, если релевантно.
12. Security и non-functional requirements покрыты.

Верни:

```text
READY / NOT READY
```

Если результат `NOT READY`, перечисли blockers и точные файлы, которые нужно исправить.

## Выходные файлы

Создание файлов не требуется, если это явно не запрошено.

## Quality gate

Результат приемлем только если:

- Есть ясное решение ready/not-ready.
- Blockers конкретны.
- Кодинг не разрешается, если обязательные артефакты отсутствуют.

