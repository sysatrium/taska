# Implementation Plan — Синхронизация с внешним issue tracker

## Metadata

- Feature ID: 003-demo-integration-feature
- Feature name: External Issue Tracker Sync
- Status: Draft
- Based on spec: `specs/003-demo-integration-feature/spec.md`
- Related contracts:
  - `specs/003-demo-integration-feature/contracts/webhook-contract.yaml`
  - `specs/003-demo-integration-feature/contracts/sync-state-schema.json`
- Confidence level: Medium
- Decision status summary: approved async ingestion и explicit mapping; stale-event policy остаётся provisional
- Last updated: 2026-05-26

## 1. Краткое описание скоупа

Реализовать integration flow, который принимает webhooks от внешнего issue tracker, проверяет подлинность, сохраняет или ставит в очередь принятые events, дедуплицирует по provider event identifier, маппит поддерживаемые внешние статусы в локальные статусы задачи и фиксирует результаты reconciliation для диагностики и последующих действий.

## 2. Прослеживаемость к спецификации

| Элемент спецификации | Ответ в плане | Статус | Примечание |
|---|---|---|---|
| Webhook ingestion contract | Определить signed inbound webhook endpoint и поведение подтверждения | Approved | Быстрый ack, async processing |
| Idempotent processing | Добавить deduplication store или event ledger по provider event ID | Approved | Предотвращает duplicate local side effects |
| Status mapping | Определить явную mapping table и путь для unmapped events | Approved | Избегает name-based assumptions |
| Обработка out-of-order events | Ввести точку решения для stale-event policy | Provisional | Требует явного ordering rule |
| Observability | Захватывать метрики и логи lifecycle processing | Approved | Нужно для operations |

## 3. Зоны, чувствительные к допущениям

- Provider event identifiers могут быть не всегда глобально уникальны.
- Provider timestamps или versions могут быть недостаточны для безопасного разрешения порядка.
- Workflow manual review может ещё не существовать в product UI.

## 4. Архитектурные изменения

Ввести inbound webhook boundary, signature verification component, acceptance ledger, queue или async processor, status mapping module, reconciliation executor и sync-state persistence model для отслеживания processing lifecycle.

## 5. Поток данных и последовательность

1. Внешний tracker отправляет webhook event.
2. Webhook endpoint валидирует signature и required payload shape.
3. Валидный event быстро подтверждается.
4. Event metadata сохраняется в acceptance ledger или очередь.
5. Processor проверяет idempotency и stale-event policy.
6. Processor разрешает local task linkage.
7. Processor маппит внешний статус на локальный статус.
8. Local task status update выполняется через domain service.
9. Sync result сохраняется как success, failed, duplicate, stale или review-needed.
10. Logs, metrics и traces отражают end-to-end processing outcome.

## 6. Технологические решения

- Решение:
  - Статус: Recommended
  - Evidence: integration demo должен оставаться platform-neutral, но отражать production-safe patterns.
  - Обоснование: пример должен обучать архитектуре и обработке отказов, а не привязывать к одной queue или framework.
  - Отклонённые альтернативы: прямую synchronous mutation внутри webhook controller.
  - Требует подтверждения от: Engineering

## 7. Изменения модели данных и схем

- Изменение: определить sync-state schema для accepted, queued, processing, synced, duplicate, stale, failed и manual_review states.
  - Влияние: операторы и тесты смогут явно интерпретировать lifecycle integration.
  - Примечание по миграции или rollout: в контексте demo это feature-local persistence.

- Изменение: определить явный artifact маппинга provider-to-local statuses.
  - Влияние: изменения mapping становятся reviewable decisions, а не скрытыми code branches.
  - Примечание по миграции или rollout: provider-specific entries могут эволюционировать позже.

## 8. Точки интеграции

- Интеграция: источник webhook событий внешнего issue tracker
  - Интерфейс: signed HTTP webhook payload
  - Режим отказа: bad signature, malformed payload, duplicate delivery, out-of-order events
  - Fallback-поведение: reject, record и не выполнять local mutation

- Интеграция: local task domain service
  - Интерфейс: вызов task status update
  - Режим отказа: local task missing, validation failure, domain conflict
  - Fallback-поведение: mark sync failure или manual review с сохранением event diagnostics

- Интеграция: queue или background processor
  - Интерфейс: enqueue принятого event и async job execution
  - Режим отказа: backlog, processing crash, retry storms
  - Fallback-поведение: dead-letter или failed-state handling с видимостью

## 9. Риски и меры снижения

- Риск: duplicate и retried deliveries создают повторные local mutations.
  - Вероятность: High
  - Влияние: High
  - Митигирующее действие: строгая policy idempotency key и acceptance ledger.

- Риск: out-of-order events перезаписывают более новую локальную truth.
  - Вероятность: Medium
  - Влияние: High
  - Митигирующее действие: явная stale-event comparison logic и безопасный fallback в manual review.

- Риск: unmapped statuses тихо портят workflow state.
  - Вероятность: Medium
  - Влияние: High
  - Митигирующее действие: fail closed в manual-review или failed-sync state.

- Риск: пробелы в webhook verification создают security exposure.
  - Вероятность: Medium
  - Влияние: High
  - Митигирующее действие: signature verification contract и discipline ротации secrets.

## 10. Нефункциональные требования

- Надёжность: processing должен быть идемпотентным при retries.
- Security: проверки webhook authenticity обязательны.
- Observability: acceptance и reconciliation outcomes должны быть диагностируемы.
- Сопровождаемость: status mapping и stale-event policy должны быть явными и reviewable.
- Масштабируемость: ingestion не должен блокироваться на downstream domain mutation.

## 11. Стратегия тестирования

- unit-тесты: signature verification, mapping logic, stale-event policy, idempotency decisions.
- integration-тесты: end-to-end webhook receipt до local domain update с mocked provider payloads.
- contract-тесты: payload validation против webhook contract и sync-state schema.
- failure-path tests: duplicate delivery, malformed payload, missing linkage, unmapped status, processor retry.
- ручная проверка: operational walkthrough логов и failure diagnostics.

## 12. Вывод в эксплуатацию и откат

- план вывода: включить для одного provider profile в контролируемой demo environment.
- триггер отката: повторяющаяся corruption sync, неограниченный backlog queue, failures security validation.
- шаги отката: отключить webhook ingestion и остановить downstream processing с сохранением event diagnostics.
- post-release проверки: accepted-to-synced ratio, duplicate rate, failed-sync rate, health backlog.

## 13. Слабо подтверждённые области

- bidirectional sync намеренно не промоделирован полностью.
- operational UI для manual review не специфицирован.
- provider-specific payload variants могут выходить за рамки demo contract.

## 14. Контрольный список готовности плана

- [x] План прослеживается к замыслу спецификации.
- [x] Approved и provisional решения различимы.
- [x] Изменения данных и lifecycle states видимы.
- [x] Риски и меры снижения задокументированы.
- [x] Стратегия тестирования определена.
- [x] Вывод в эксплуатацию и откат описаны.
