# Создание Feature Implementation Plan

## Назначение

Создать `plan.md` — архитектурный план реализации фичи.

Plan объясняет, как именно будет реализована фича до создания задач.

## Когда использовать

Используйте после того, как существуют:

```text
specs/NNN-feature-name/spec.md
specs/NNN-feature-name/contracts/
```

## Необходимые входные данные

- Feature `spec.md`
- Feature contracts
- Project overview architecture
- Constitution
- AGENTS.md

## Инструкции для AI

Прочитай:

```text
AGENTS.md
.specify/memory/constitution.md
specs/000-project-overview/architecture.md
specs/NNN-feature-name/spec.md
specs/NNN-feature-name/contracts/
specs/templates/plan-template.md
```

Задай уточняющие вопросы, если архитектурные решения неясны.

Создай:

```text
specs/NNN-feature-name/plan.md
```

Включи:

1. Component Diagram в Mermaid.
2. Technology Choices с rationale и рассмотренными alternatives.
3. Data Flow в Mermaid sequence diagram, если полезно.
4. Database Changes.
5. Integration Points.
6. Risk Assessment.
7. Non-Functional Requirements.
8. Impact on existing project architecture.
9. Open Questions.

Не вводи архитектурные решения, которые противоречат constitution.

Если требуется значимое новое архитектурное решение, также предложи ADR entry.

## Выходные файлы

```text
specs/NNN-feature-name/plan.md
```

Опционально:

```text
specs/NNN-feature-name/ADR-NNN-title.md
```

## Quality gate

Результат приемлем только если:

- Plan объясняет, как будет реализован spec.
- У каждого значимого выбора есть rationale.
- У рисков есть mitigation.
- Non-functional requirements покрыты.
- Plan достаточно конкретен для генерации атомарных задач.

