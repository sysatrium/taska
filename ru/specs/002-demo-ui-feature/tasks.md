# Tasks — Inline UI-редактор статуса задачи

## Правила декомпозиции

- Одна задача = одна атомарная единица работы.
- У каждой задачи должны быть criteria приёмки и verification.
- Задачи не должны молча принимать неразрешённые продуктовые или архитектурные решения.

## Метаданные набора задач

- Feature ID: 002-demo-ui-feature
- Feature name: Inline Task Status Editor UI
- Based on spec: `specs/002-demo-ui-feature/spec.md`
- Based on plan: `specs/002-demo-ui-feature/plan.md`
- Last updated: 2026-05-26

## Задача 1: Зафиксировать interaction contract и UI state schema

**Тип:** Docs

**Зависит от:** none

**Upstream decision dependency:** требует ли blocked status secondary reason step в V1

**Затрагиваемые файлы:**
- `specs/002-demo-ui-feature/contracts/interaction-contract.md`
- `specs/002-demo-ui-feature/contracts/ui-state-schema.json`

**Прослеживаемость:** разделы спецификации 3, 5, 10, 11 / разделы плана 2, 7, 8

### Описание

Зафиксировать ожидаемый interaction flow, имена состояний, event triggers и error mapping для inline status editor.

### Критерии приёмки

- [ ] Interaction contract определяет open, select, submit, success и error behavior.
- [ ] UI state schema покрывает все поддерживаемые states и transitions.
- [ ] Accessibility-relevant behavior явно задокументировано.

### Проверка

Просмотреть interaction contract и убедиться, что каждое задокументированное состояние представимо в schema.

### Эта задача не должна решать

- финальные visual styling details
- долгосрочную mobile interaction strategy

### Блокируется если

- команда не может решить, является ли blocked status single-step или multi-step в первой версии.

### Примечания

Держать interaction flow компактным и детерминированным.

## Задача 2: Реализовать local state management и интеграцию с API adapter

**Тип:** Frontend

**Зависит от:** Задача 1

**Upstream decision dependency:** использовать pessimistic submit по умолчанию, пока не утверждено иное

**Затрагиваемые файлы:**
- inline status editor component
- local reducer/state machine
- request adapter
- tests

**Прослеживаемость:** разделы спецификации 4, 7, 10, 11 / разделы плана 4, 5, 7, 8, 10, 11

### Описание

Реализовать component logic, которая открывает control, фиксирует выбор, отправляет запрос через adapter и переходит в success или error state без влияния на другие строки.

### Критерии приёмки

- [ ] State transitions явные и тестируемые.
- [ ] Duplicate submit предотвращается во время submitting.
- [ ] Backend validation errors маппятся в inline user-facing errors.

### Проверка

Запустить unit и integration tests для idle, open, submitting, success, validation error, not-found и transport failure states.

### Эта задача не должна решать

- policy optimistic UI
- стратегию cross-feature analytics

### Блокируется если

- backend adapter contract не различает validation, not-found и auth failures.

### Примечания

Обеспечить state isolation на уровне task row.

## Задача 3: Добавить accessibility behavior и verification coverage

**Тип:** Frontend

**Зависит от:** Задача 2

**Upstream decision dependency:** утверждённая семантика focus return после submit или cancel

**Затрагиваемые файлы:**
- component accessibility behavior
- keyboard interaction tests
- manual verification checklist

**Прослеживаемость:** разделы спецификации 5, 10, 11 / разделы плана 2, 5, 10, 11, 12

### Описание

Добавить focus management, keyboard navigation, escape/close behavior и verification coverage для accessible interaction paths.

### Критерии приёмки

- [ ] Пользователь может открыть и управлять control с клавиатуры.
- [ ] Focus handling детерминирован при open, submit, cancel и error.
- [ ] Verification artifacts покрывают accessible interaction paths.

### Проверка

Запустить keyboard-centric tests и manual walkthroughs для open, navigate, submit, recovery после error и focus return behavior.

### Эта задача не должна решать

- полный refactor design system
- правила drag-and-drop interaction

### Блокируется если

- правила focus target после submit или cancel остаются не определены.

### Примечания

Предпочитать простые accessible patterns вместо кастомной interaction complexity.
