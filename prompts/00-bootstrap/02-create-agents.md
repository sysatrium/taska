# Создание AGENTS.md и CLAUDE.md

## Назначение

Создать постоянные файлы контекста для AI-агентов:

```text
AGENTS.md
CLAUDE.md
```

`AGENTS.md` — общий операционный контекст для всех AI-агентов.

`CLAUDE.md` — специальная входная инструкция для Claude Code, которая ссылается на `AGENTS.md` и содержит конкретные команды репозитория.

## Когда использовать

Используйте после создания `.specify/memory/constitution.md`.

## Необходимые входные данные

- `.specify/memory/constitution.md`
- Описание проекта, если оно ещё не включено в constitution.
- Известные команды install, test, lint, build и run.

## Инструкции для AI

Прочитай `.specify/memory/constitution.md`.

Если не хватает команд, архитектурных правил, test-команд или правил организации файлов, задай точечные вопросы до генерации файлов.

Создай `AGENTS.md` со следующими разделами:

1. Project Overview
2. Spec-Driven Development Workflow
3. Tech Stack
4. Architecture Decisions
5. Code Conventions
6. File Organization
7. Forbidden Patterns
8. Testing Strategy
9. Security Rules
10. Delivery and Review Rules
11. AI Agent Operating Rules

Документ должен быть конкретным и операционным. Избегай фраз вроде "использовать best practices" без примеров и проверяемых правил.

Создай `CLAUDE.md` как краткий guide для Claude Code со следующими разделами:

1. Ссылка на `AGENTS.md`
2. Обязательный порядок чтения файлов
3. Частые команды
4. Правила реализации задач
5. Правила уточняющих вопросов
6. Правила верификации

Не дублируй весь `AGENTS.md` внутри `CLAUDE.md`. Оставь `CLAUDE.md` короткой tool-specific инструкцией.

## Выходные файлы

```text
AGENTS.md
CLAUDE.md
```

## Quality gate

Результат приемлем только если:

- `AGENTS.md` можно использовать как persistent project context для любого AI-агента.
- `CLAUDE.md` короткий, практичный и ссылается на `AGENTS.md`.
- Оба файла согласованы с `constitution.md`.
- В инструкциях нет противоречий.

