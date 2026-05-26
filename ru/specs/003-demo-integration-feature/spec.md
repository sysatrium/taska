# Feature Specification — Синхронизация с внешним issue tracker

## Metadata

- Feature ID: 003-demo-integration-feature
- Feature name: External Issue Tracker Sync
- Status: Draft
- Owner: Product / Platform / Integrations
- Decision owner: Product + Engineering + Security
- Confidence level: Medium
- Evidence status: смешанный; основан на существующих demo-конвенциях и integration-first assumptions
- Last updated: 2026-05-26
- Related overview artifacts:
  - `specs/000-project-overview/spec.md`
  - `specs/000-project-overview/data-model.md`
  - `specs/000-project-overview/architecture.md`
- Related demo artifacts:
  - `specs/001-demo-feature/spec.md`
  - `specs/002-demo-ui-feature/spec.md`
- Related contracts:
  - `specs/003-demo-integration-feature/contracts/webhook-contract.yaml`
  - `specs/003-demo-integration-feature/contracts/sync-state-schema.json`

## 1. Цель

Синхронизировать изменения статусов задач между локальной task system и внешним issue tracker через webhook ingestion и reconciliation logic, сохраняя idempotency, traceability и контролируемую обработку отказов.

## 2. Бизнес-контекст

- Почему фича существует: команды часто ведут исполнение сразу во внутренних и внешних tracking systems.
- Кто выигрывает: platform teams, delivery leads и пользователи, которым нужна parity статусов между инструментами.
- Что меняется при успехе: уменьшается количество дублирующих ручных обновлений статуса, а drift между системами становится видимым и управляемым.
- Почему сейчас: starter kit уже содержит API-heavy и UI-heavy demo; этот пример демонстрирует integration-heavy SDD.

## 3. Карта оснований

### Подтверждённые факты

- В репозитории уже есть demo patterns для backend API и UI interaction features.
- Starter kit ожидает full lifecycle package для каждого reference example.
- Integration-heavy сценарии требуют явной обработки retries, idempotency и partial failure.

### Выведенный контекст

- Внешние системы могут доставлять duplicate, delayed или out-of-order webhook events.
- Локальные и внешние vocabularies статусов могут не совпадать one-to-one.
- Auditability важна, потому что side effects интеграции сложнее интерпретировать, чем локальные обновления.

### Рекомендуемые defaults

- Принимать webhooks в durable processing queue до применения business-side effects.
- Использовать idempotency keys, производные от provider event identifiers, когда это возможно.
- Разделять успешный webhook acceptance и успешную downstream reconciliation.

### Временные допущения

- Внешний tracker может отправлять webhook events для изменений статуса issue.
- Локальная система хранит external issue reference для каждой синхронизируемой задачи.
- Первая версия поддерживает только один профиль внешнего провайдера.

### Требует подтверждения

- Является ли sync в V1 однонаправленным или двунаправленным.
- Должны ли unmatched statuses приводить к fail, fallback state или manual review.
- Должна ли reconciliation выполняться немедленно или по расписанию после ingestion.

## 4. Ожидаемые результаты

- Результат 1: webhook events принимаются, валидируются и обрабатываются идемпотентно.
- Результат 2: поддерживаемые внешние изменения статуса обновляют локальное состояние задачи через явную mapping model.
- Результат 3: failures и drift conditions видимы через logs, metrics и reconciliation artifacts.

## 5. В скоупе

- Webhook ingestion contract.
- Durable sync state model и processing lifecycle.
- Status mapping и reconciliation behavior.
- Error handling для duplicate, invalid, stale и unmapped events.
- Observability expectations для integration processing.

## 6. Вне скоупа

- Полный provider onboarding UI.
- Multi-provider abstraction для первой версии.
- Historical backfill всех внешних issues.
- Bidirectional conflict resolution beyond explicitly defined V1 behavior.

## 7. Ограничения и допущения

### Ограничения

- Ограничения интеграции: семантика внешнего провайдера может быть непоследовательной или запаздывающей.
- Security-ограничения: должны быть покрыты webhook authenticity и secret management.
- Ограничения надёжности: retries не должны создавать duplicate local updates.
- Ограничения поставки: demo должен оставаться provider-neutral и компактным.
- Ограничения данных: локальные и внешние статусы требуют явной mapping table.

### Допущения

- Payload webhooks от провайдера включает unique event identifier или эквивалентный deduplication signal.
- Локальный task domain допускает eventually consistent status synchronization.
- Операторы могут инспектировать failed sync attempts через logs или support workflow.

## 8. Зависимости

- Upstream dependency: delivery webhook-событий от внешнего issue tracker.
- Internal dependency: local task update domain service.
- Supporting dependency: queue, job runner или эквивалентный background processing mechanism.
- Supporting dependency: secret management для webhook verification.

## 9. Уже принятые решения

- Decision: разделить webhook receipt и business reconciliation.
  - Status: Approved
  - Rationale: webhook endpoints должны быстро подтверждать прием и переносить тяжёлую работу в async flow.
  - Implication: успех acceptance не означает успех reconciliation.
  - Requires confirmation by: already aligned with integration best practice

- Decision: требовать явный status mapping layer.
  - Status: Approved
  - Rationale: внешние и локальные workflows редко безопасно совпадают только по имени.
  - Implication: unmapped states становятся видимыми operating events, а не тихой порчей данных.
  - Requires confirmation by: already aligned with demo direction

## 10. Пограничные и отказные сценарии

- Пограничный сценарий: duplicate delivery event.
  - Ожидаемое поведение: event распознаётся идемпотентно и не вызывает duplicate local mutation.
- Пограничный сценарий: out-of-order status events.
  - Ожидаемое поведение: stale-event handling следует policy timestamp/version и избегает rollback к более старому состоянию без явного правила.
- Отказной сценарий: validation webhook signature проваливается.
  - Ожидаемое поведение: отклонить event и записать security-relevant diagnostic.
- Отказной сценарий: отсутствует status mapping.
  - Ожидаемое поведение: перевести event в failed или manual-review state с понятной observability.
- Отказной сценарий: отсутствует local task reference.
  - Ожидаемое поведение: не создавать silent orphan side effects; зафиксировать unresolved linkage.

## 11. Критерии проверки

### Функциональная проверка

- Валидные webhook events принимаются и маршрутизируются на обработку.
- Duplicate events не создают duplicate updates.
- Поддерживаемые внешние статусы корректно маппятся на локальные статусы.
- Unmapped или invalid events становятся явными failed или reviewable states.

### Нефункциональная проверка

- Processing идемпотентен.
- Failure handling диагностируемо.
- Sync state schema явно покрывает lifecycle states.
- Security verification logic явно описана на уровне contract.

### Наблюдаемость и диагностика

- логи: webhook receipt, signature failure, deduplication decisions, mapping failures, reconciliation results.
- метрики: accepted events, rejected events, duplicate events, successful syncs, failed syncs, manual-review cases.
- трейсы: корреляция от receipt до reconciliation attempt.
- алерты: sustained failure rate или backlog threshold очереди.

## 12. Первичные подсказки по задачам

1. Определить webhook contract и sync-state schema.
2. Спланировать ingestion, verification, deduplication и reconciliation flow.
3. Реализовать processing path и failure diagnostics.

## 13. Открытые вопросы

- Является ли V1 строго inbound sync, или должны моделироваться и outbound updates?
- Какая policy определяет, что out-of-order event является stale?
- Как manual-review cases должны быть представлены операционно?

## 14. Контрольный список готовности к планированию

- [x] Цель сформулирована явно.
- [x] Evidence status видим.
- [x] Provisional items помечены.
- [x] Разделы «в скоупе» и «вне скоупа» разделены чётко.
- [x] Ограничения конкретны.
- [x] Зависимости видимы.
- [x] Критерии проверки тестируемы.
- [x] Открытые вопросы зафиксированы.
