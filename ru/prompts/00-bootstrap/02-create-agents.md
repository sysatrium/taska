# Bootstrap 0.2 — Create Agent Operating Context

## Назначение

Создайте стабильные context files, чтобы implementation- и verification-агенты работали из одного набора repository rules.

## Когда использовать

Используйте после создания constitution и до старта feature work.

## Входы

- `.specify/memory/constitution.md`
- repository workflow и artifact rules
- уже утверждённые bootstrap decisions

## Выходные файлы

```text
AGENTS.md
CLAUDE.md
```

## Что делать

1. Создайте `AGENTS.md` как постоянный repository-wide context для всех AI-агентов.
2. Создайте `CLAUDE.md` как компактный tool-facing operating guide.
3. Зафиксируйте source-of-truth precedence.
4. Опишите, что агент может рекомендовать по умолчанию, а что всегда требует подтверждения человека.
5. Зафиксируйте evidence labels и ожидания по confidence.
6. Зафиксируйте, как агент должен эскалировать blockers и high-risk ambiguity.
