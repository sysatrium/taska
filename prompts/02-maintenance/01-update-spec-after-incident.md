# Обновление Spec после инцидента

## Назначение

Обновить feature spec после бага, production incident, пропущенного edge case или неверно понятого требования.

В SDD инциденты должны улучшать будущие исполняемые спецификации, а не только приводить к точечным исправлениям кода.

## Когда использовать

Используйте, когда:

- Произошёл production incident.
- Был пропущен edge case.
- Обнаружен test gap.
- Requirement был понят неверно.
- Сгенерированный код повторно ошибается одинаковым способом.

## Необходимые входные данные

- Описание инцидента.
- Root cause.
- Affected feature folder.
- Текущие `spec.md`, `plan.md`, `tasks.md` и contracts.
- Test или monitoring evidence, если доступны.

## Инструкции для AI

Прочитай:

```text
AGENTS.md
.specify/memory/constitution.md
specs/NNN-feature-name/spec.md
specs/NNN-feature-name/plan.md
specs/NNN-feature-name/tasks.md
specs/NNN-feature-name/contracts/
```

Задай уточняющие вопросы, если root cause неясен.

Обнови feature spec так, чтобы эта проблема с меньшей вероятностью повторилась.

Конкретно:

1. Добавь или уточни constraints.
2. Добавь verification criteria.
3. Добавь edge cases.
4. Обнови out-of-scope, если нужно.
5. Обнови acceptance criteria, если нужно.
6. Определи, нужно ли регенерировать contracts, plan или tasks.

Не прячь implementation fixes внутри spec. Spec должен описывать ожидаемое поведение и ограничения, а не детали патча.

## Выходные файлы

Обновлённый:

```text
specs/NNN-feature-name/spec.md
```

Опциональные обновления:

```text
specs/NNN-feature-name/plan.md
specs/NNN-feature-name/tasks.md
specs/NNN-feature-name/contracts/
```

## Quality gate

Результат приемлем только если:

- Root cause отражён в spec.
- Новые verification criteria проверяемы.
- Ясно указано, какие downstream artifacts должны измениться.
- Spec остаётся согласованным с constitution и AGENTS.

