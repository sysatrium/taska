# Tasks — Синхронизация с внешним issue tracker

## Правила декомпозиции

- Одна задача = одна атомарная единица работы.
- У каждой задачи должны быть criteria приёмки и verification.
- Задачи не должны молча принимать неразрешённые product, security или architecture decisions.

## Метаданные набора задач

- Feature ID: 003-demo-integration-feature
- Feature name: External Issue Tracker Sync
- Based on spec: `specs/003-demo-integration-feature/spec.md`
- Based on plan: `specs/003-demo-integration-feature/plan.md`
- Last updated: 2026-05-26

## Задача 1: Зафиксировать webhook contract и sync-state schema

**Тип:** Docs

**Зависит от:** none

**Upstream decision dependency:** считаются ли stale events failed или manual-review cases в V1

**Затрагиваемые файлы:**
- `specs/003-demo-integration-feature/contracts/webhook-contract.yaml`
- `specs/003-demo-integration-feature/contracts/sync-state-schema.json`

**Прослеживаемость:** разделы спецификации 3, 5, 10, 11 / разделы плана 2, 7, 8

### Описание

Зафиксировать ожидания к inbound webhook payload, правила signature headers, semantics подтверждения и schema lifecycle sync-state.

### Критерии приёмки

- [ ] Webhook contract определяет required headers, payload shape и response behavior.
- [ ] Sync-state schema покрывает accepted, queued, processing, synced, duplicate, stale, failed и manual_review states.
- [ ] Contract документирует signature и idempotency expectations.

### Проверка

Просмотреть contract и schema вместе, чтобы убедиться, что каждый задокументированный processing outcome можно представить.

### Эта задача не должна решать

- provider-specific UI для операторов
- future multi-provider abstraction design

### Блокируется если

- команда не может определить, являются ли stale events terminal failures или reviewable states в V1.

## Задача 2: Реализовать ingestion, verification и deduplication flow

**Тип:** Backend / Integration

**Зависит от:** Задача 1

**Upstream decision dependency:** согласованный источник idempotency keys

**Затрагиваемые файлы:**
- webhook endpoint
- signature verification module
- acceptance ledger или deduplication store
- tests

**Прослеживаемость:** разделы спецификации 4, 7, 8, 10, 11 / разделы плана 4, 5, 8, 9, 10, 11

### Описание

Реализовать inbound webhook path, которая валидирует подлинность, подтверждает accepted events, записывает ingestion metadata и предотвращает duplicate downstream processing.

### Критерии приёмки

- [ ] Неверные signatures безопасно отклоняются.
- [ ] Accepted events записываются или ставятся в очередь до тяжёлой обработки.
- [ ] Duplicate deliveries не создают duplicate downstream attempts.

### Проверка

Запустить тесты на valid events, invalid signatures, malformed payloads и duplicate deliveries.

### Эта задача не должна решать

- финальную reconciliation ordering policy
- provider-agnostic onboarding flows

### Блокируется если

- качество сигнала idempotency слишком слабое для безопасной deduplication.

## Задача 3: Реализовать reconciliation, mapping и failure diagnostics

**Тип:** Backend / Integration

**Зависит от:** Задача 2

**Upstream decision dependency:** утверждённая stale-event policy и поведение для unmapped statuses

**Затрагиваемые файлы:**
- async processor или reconciliation handler
- status mapping module
- sync-state persistence
- observability instrumentation
- tests

**Прослеживаемость:** разделы спецификации 4, 5, 10, 11 / разделы плана 5, 7, 8, 9, 10, 11, 12

### Описание

Реализовать processing, которая разрешает local linkage, применяет status mapping, безопасно обновляет local domain и фиксирует final sync outcomes с достаточной диагностикой для operations.

### Критерии приёмки

- [ ] Поддерживаемые статусы корректно маппятся в локальные статусы.
- [ ] Paths отсутствующего mapping и linkage становятся явными failure или review states.
- [ ] Sync outcomes логируются и измеряются.

### Проверка

Запустить integration и failure-path tests для mapped status updates, unmapped events, missing local linkage, stale events и processor retry behavior.

### Эта задача не должна решать

- полную bidirectional sync strategy
- долгосрочный design operator dashboard

### Блокируется если

- stale-event и manual-review policies остаются неразрешёнными.
