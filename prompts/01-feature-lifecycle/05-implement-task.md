# Реализация одной задачи

## Назначение

Дать implementation AI agent инструкцию реализовать одну атомарную задачу и ничего лишнего.

## Когда использовать

Используйте только после прохождения pre-implementation checklist и после создания `tasks.md`.

## Необходимые входные данные

- Номер задачи.
- `AGENTS.md`
- `.specify/memory/constitution.md`
- Feature `spec.md`
- Feature `plan.md`
- Feature `tasks.md`
- Feature contracts.

## Инструкции для AI

Ты implementation agent.

Реализуй ровно одну задачу из `tasks.md`.

Прочитай в таком порядке:

```text
AGENTS.md
.specify/memory/constitution.md
specs/NNN-feature-name/spec.md
specs/NNN-feature-name/plan.md
specs/NNN-feature-name/contracts/
specs/NNN-feature-name/tasks.md
```

Затем реализуй:

```text
Task N
```

Правила:

1. Реализуй только Task N.
2. Не добавляй out-of-scope поведение.
3. Следуй `AGENTS.md` и constitution rules.
4. Пиши или обновляй тесты вместе с кодом.
5. Если задача неоднозначна, спроси до кодинга.
6. Не добавляй новые зависимости молча.
7. Не пропускай validation, error handling или security rules.
8. После реализации запусти релевантные проверки.

Ожидаемый ответ:

1. Изменённые файлы.
2. Summary реализации.
3. Добавленные или обновлённые тесты.
4. Выполненные команды и результаты.
5. Checklist acceptance criteria.
6. Нерешённые вопросы или риски.

## Выходные файлы

Implementation changes зависят от конкретной задачи.

## Quality gate

Результат приемлем только если:

- Реализована только Task N.
- Тесты добавлены или обновлены там, где это релевантно.
- Acceptance criteria явно проверены.
- Релевантные проверки проходят или failures объяснены.

