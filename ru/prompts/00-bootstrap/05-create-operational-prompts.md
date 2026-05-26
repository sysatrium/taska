# Bootstrap 0.5 — Create Operational Prompts

## Назначение

Создайте optional prompt-pack для IDE и agent tooling после стабилизации repository rules.

## Когда использовать

Используйте только после определения constitution, agent context и core SDD structure.

## Входы

- `.specify/memory/constitution.md`
- `AGENTS.md`
- repository workflow и artifact rules

## Выходные файлы

```text
.github/prompts/*.md
```

## Что делать

1. Сгенерируйте короткие tool-facing prompts для constitution, specification, planning, tasks, implementation и verification.
2. Держите prompts согласованными с canonical operating model.
3. Убедитесь, что prompts поддерживают guided discovery, discipline рекомендаций, evidence labels, confidence labeling и escalation при high-risk ambiguity.
4. Не создавайте prompts, которые поощряют расширение scope или hidden assumptions.
