# Обновление Project Constitution

## Назначение

Обновить `.specify/memory/constitution.md`, когда должны измениться фундаментальные правила проекта.

## Когда использовать

Используйте, когда:

- Меняется technology stack.
- Меняются architecture principles.
- Обнаружены новые forbidden patterns.
- Меняются security requirements.
- Меняется delivery или review policy.
- Повторяющиеся implementation problems показывают, что в правилах есть пробел.

## Необходимые входные данные

- Текущий `.specify/memory/constitution.md`
- Причина изменения.
- Затронутые файлы или workflows.
- Incident, ADR или decision record, которые вызвали изменение.

## Инструкции для AI

Прочитай:

```text
.specify/memory/constitution.md
AGENTS.md
SPEC_PROCESS.md
```

Перед изменением foundational rules задай уточняющие вопросы.

Затем обнови constitution и включи:

1. Новое правило.
2. Rationale.
3. Consequences.
4. Impacted files.
5. Migration или follow-up tasks.

После обновления constitution определи, какие файлы нужно обновить:

- `AGENTS.md`
- `CLAUDE.md`
- `SPEC_PROCESS.md`
- `specs/templates/`
- Existing feature specs или plans.

Не делай широких несвязанных изменений.

## Выходные файлы

Обновлённый:

```text
.specify/memory/constitution.md
```

Опциональные обновления:

```text
AGENTS.md
CLAUDE.md
SPEC_PROCESS.md
specs/templates/
```

## Quality gate

Результат приемлем только если:

- Изменение явно сформулировано и обосновано.
- Нет противоречий с существующими правилами.
- Downstream impact перечислен.
- AI-agent operating rules остаются согласованными.

