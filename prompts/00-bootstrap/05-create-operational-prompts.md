# Создание Operational AI Tool Prompts

## Назначение

Сгенерировать операционные промпты для AI coding tools после того, как проектная SDD-основа уже создана.

Эти промпты могут быть размещены в:

```text
.github/prompts/
```

Они отличаются от папки `prompts/`.

- `prompts/` — интерактивный bootstrap и lifecycle guide для человека.
- `.github/prompts/` — операционная prompt library для IDE и agent tooling.

## Когда использовать

Используйте после того, как существуют и проверены:

```text
.specify/memory/constitution.md
AGENTS.md
SPEC_PROCESS.md
specs/templates/
```

## Необходимые входные данные

- Какие AI tools нужно поддержать: GitHub Copilot, Cursor, Claude Code, AWS Kiro или другие.
- Существующий `constitution.md`.
- Существующий `AGENTS.md`.
- Существующие templates в `specs/templates/`.

## Инструкции для AI

Спроси, какие AI-инструменты должен поддерживать проект.

Затем сгенерируй только те operational prompts, которые релевантны выбранным инструментам.

Рекомендуемый baseline:

```text
.github/prompts/speckit.constitution.md
.github/prompts/speckit.specify.md
.github/prompts/speckit.plan.md
.github/prompts/speckit.tasks.md
.github/prompts/speckit.implement.md
.github/prompts/speckit.verify.md
```

Каждый operational prompt должен:

- Ссылаться на `AGENTS.md`.
- Ссылаться на `.specify/memory/constitution.md`.
- Ссылаться на релевантный файл из `specs/templates/`.
- Быть прямым и execution-oriented.
- Не содержать длинных объяснений, предназначенных для человека.

Не создавай `.github/prompts/`, если я не выбрал GitHub-style prompt library.

## Выходные файлы

Опционально:

```text
.github/prompts/speckit.constitution.md
.github/prompts/speckit.specify.md
.github/prompts/speckit.plan.md
.github/prompts/speckit.tasks.md
.github/prompts/speckit.implement.md
.github/prompts/speckit.verify.md
```

## Quality gate

Результат приемлем только если:

- Operational prompts создаются после появления project-specific rules.
- Они не дублируют полностью bootstrap prompts.
- Они совместимы с выбранными AI tools.
- Они заставляют AI читать правильные source-of-truth файлы перед действием.

