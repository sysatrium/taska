# Tasks — API обновления статуса задачи

## Правила декомпозиции

- Одна задача = одна атомарная единица работы.
- У каждой задачи должны быть criteria приёмки и verification.
- Задачи не должны молча принимать неразрешённые продуктовые или архитектурные решения.

## Метаданные набора задач

- Feature ID: 001-demo-feature
- Feature name: Task Status Update API
- Based on spec: `specs/001-demo-feature/spec.md`
- Based on plan: `specs/001-demo-feature/plan.md`
- Last updated: 2026-05-26

## Задача 1: Зафиксировать contract artifacts

**Тип:** Docs

**Зависит от:** none

**Upstream decision dependency:** подтвердить, обязателен ли `blockedReason` в V1

**Затрагиваемые файлы:**
- `specs/001-demo-feature/contracts/api-spec.yaml`
- `specs/001-demo-feature/contracts/data-schema.json`

**Прослеживаемость:** разделы спецификации 3, 5, 10, 11 / разделы плана 2, 7, 8

### Описание

Зафиксировать request и response contract для endpoint, включая validation rules, примеры payloads и structured error responses.

### Критерии приёмки

- [ ] API contract содержит request, success response и error response examples.
- [ ] JSON schema соответствует response и релевантным task data fields.
- [ ] Требования к `blockedReason` зафиксированы явно.

### Проверка

Проверить примеры на соответствие schema и убедиться, что все contract fields определены согласованно.

### Эта задача не должна решать

- финальную role-based authorization policy
- поведение полного cross-feature workflow engine

### Блокируется если

- команда не может решить, обязателен ли `blockedReason` в V1.

### Примечания

Держать контракт минимальным и детерминированным.

## Задача 2: Реализовать domain validation и persistence update

**Тип:** Backend

**Зависит от:** Задача 1

**Upstream decision dependency:** матрица допустимых переходов остаётся минимальной

**Затрагиваемые файлы:**
- application service
- domain validation module
- persistence repository
- tests

**Прослеживаемость:** разделы спецификации 4, 7, 10, 11 / разделы плана 4, 5, 7, 10, 11

### Описание

Реализовать логику, которая загружает задачу, валидирует requested status transition, применяет audit metadata и сохраняет изменение.

### Критерии приёмки

- [ ] Валидные переходы сохраняются.
- [ ] Невалидные статусы или отсутствующие обязательные поля отклоняются.
- [ ] Audit metadata применяется согласно утверждённому design.

### Проверка

Запустить unit и integration tests для валидных, невалидных и not-found сценариев.

### Эта задача не должна решать

- notification side effects
- гарантии asynchronous event pipeline

### Блокируется если

- persistence model не содержит task status field и не согласован путь schema change.

### Примечания

Сохранять разделение transport concerns и domain rules.

## Задача 3: Открыть API handler и verification tests

**Тип:** Backend

**Зависит от:** Задача 2

**Upstream decision dependency:** утверждённые route naming и auth integration pattern

**Затрагиваемые файлы:**
- API route handler
- request validation layer
- integration tests
- contract verification tests

**Прослеживаемость:** разделы спецификации 1, 4, 10, 11 / разделы плана 2, 5, 8, 11, 12

### Описание

Открыть endpoint, подключить его к domain logic, вернуть contract-compliant response и проверить handler через automated tests.

### Критерии приёмки

- [ ] Endpoint возвращает success payload для валидных запросов.
- [ ] Endpoint возвращает structured errors для invalid, unauthorized и not-found cases.
- [ ] Тесты подтверждают прослеживаемость к contract и spec.

### Проверка

Запустить integration и contract-focused tests; вручную проверить endpoint валидными и невалидными запросами.

### Эта задача не должна решать

- долгосрочную API versioning strategy
- поддержку bulk mutation

### Блокируется если

- authentication context нельзя последовательно инжектировать в handler.

### Примечания

Сохранять стабильную семантику ошибок.
