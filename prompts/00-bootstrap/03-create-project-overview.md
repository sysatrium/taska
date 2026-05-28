# Bootstrap 0.3 — Create Project Overview

## Назначение

Создайте верхнеуровневые project artifacts, которые определяют, что такое система, какие доменные объекты существуют и какие архитектурные границы уже известны.

## Когда использовать

Используйте после утверждения constitution и до создания feature-specific specs.

## Входы

- `.specify/memory/constitution.md`
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
6. Поддерживайте согласованность всех трёх файлов с constitution.
