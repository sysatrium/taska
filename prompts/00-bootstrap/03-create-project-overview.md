# Bootstrap 0.3 — Create Project Overview

## Назначение

Создайте верхнеуровневые project artifacts, которые определяют, что такое система, какие доменные объекты существуют, какие архитектурные границы уже известны и какие governance-правила должны учитываться на уровне всего проекта.

## Когда использовать

Используйте после утверждения constitution и до создания feature-specific specs.

## Входы

- `specs/000-project-overview/constitution.md`
- `AGENTS.md` и `CLAUDE.md`, если уже созданы
- product vision и target users
- известные domain concepts и architecture constraints

## Выходные файлы

```text
specs/000-project-overview/spec.md
specs/000-project-overview/data-model.md
specs/000-project-overview/architecture.md
```

## Что делать

1. Опишите систему на уровне проекта.
2. Если акторы, workflows или boundaries неясны, предложите candidate-версии на основе constitution и product intent.
3. Помечайте важные утверждения как Known, Inferred, Recommended, Assumed, «Открытый вопрос» или «Блокер».
4. Явно помечайте provisional defaults.
5. Блокируйте финализацию только при high-risk ambiguity.
6. Поддерживайте согласованность всех трёх файлов с constitution и agent operating rules.
7. Вшивайте в overview не только product intent, но и project-level constraints: dependency policy, quality expectations, security posture и scope boundaries, если они влияют на system design.

## Специальные требования

- Не ссылайтесь на legacy paths; используйте только актуальные artifact locations.
- Отражайте separation of concerns между product facts, inferred context и provisional defaults.
- Если UI входит в проект, фиксируйте design-system implications только на project level, без premature component design.
- Если интеграции критичны, фиксируйте trust boundaries и ownership zones уже на уровне architecture overview.
- Если в constitution есть project-wide out-of-scope, он должен быть явно виден в project overview.

## Quality gate

Принимайте результат только если:

- три project-overview артефакта согласованы между собой
- approved decisions, provisional defaults и open questions не смешаны
- system boundaries и non-goals видимы
- overview можно безопасно использовать как основу для feature specs без повторного угадывания базового контекста
