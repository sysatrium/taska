# Discovery phase

Используйте эти prompts до bootstrap и до написания feature specs.

## Назначение

Discovery снижает неопределённость до старта SDD delivery flow и фиксирует исходный продуктовый контекст в одном каноническом артефакте.

## Поток

1. `01-run-prd-interview.md`

## Выходы

Discovery должен создавать или обновлять:

- `specs/000-project-overview/discovery.md`

## Правило консистентности

- `specs/000-project-overview/` — единый source of truth для project-level discovery и overview artifacts.
- Discovery не создает параллельную структуру в `ru/` или других каталогах.
- Если discovery-результаты влияют на границы MVP, риски или сегменты, это фиксируется внутри `specs/000-project-overview/discovery.md` до появления отдельных специализированных артефактов.
