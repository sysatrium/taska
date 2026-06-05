# План реализации — 005 Planning Period Lifecycle and Goals

## Подход к реализации

Feature 005 реализуется как самостоятельный vertical slice вокруг aggregate `PlanningPeriod`, который становится управленческим контейнером planning-модуля до появления product items и team-level planning inputs. План должен поддержать основной пользовательский сценарий: Head of Product из основного UI открывает список planning periods, создаёт период в статусе `draft`, открывает details screen, заполняет goals, видит readiness hints и переводит период в `open`, либо при необходимости отменяет период в `cancelled`. [cite:45][cite:31][cite:40]

Реализация идёт от доменной модели к observable UI-поведению: сначала вводится lifecycle и business invariants периода, затем API-операции списка, создания, чтения, обновления и lifecycle transitions, после чего поверх них собираются list/details entry points и status-aware UI. План не включает product items, period-specific capacity, ownership/delegation, delete/archive и расширенную governance-логику, потому что они явно вне scope текущей feature. [cite:45]

## Затрагиваемые компоненты

- Backend domain/application layer: aggregate `PlanningPeriod`, lifecycle policy, readiness checks, validation rules, application services для create/update/open/close/cancel. [cite:45][cite:31][cite:36]
- Persistence layer: таблица planning periods, mapping lifecycle/status, storage goals как structured formatted content, системные metadata (`createdAt`, `updatedAt`, `createdBy`). [cite:31][cite:33]
- API layer: endpoints list, create, get details, update, open, close, cancel; contract-aligned error handling для validation/status conflict/not found. [cite:31][cite:34][cite:35]
- Frontend planning module: список planning periods, empty/loading/error states, details screen периода, create flow, editing controls, readiness hints, status-aware lifecycle actions. [cite:45]
- Event publication layer: domain/integration events `planning-period-created`, `planning-period-opened`, `planning-period-closed`, `planning-period-cancelled`. [cite:40]

## Поток данных

1. Head of Product открывает planning module и попадает в entry point списка planning periods. UI запрашивает `GET /planning-periods` по текущему продукту и показывает list/empty/loading state. [cite:45][cite:31]
2. При создании периода UI отправляет `POST /planning-periods` с `productId`, `periodType`, `name`, `startDate`, `endDate`, `goals`. Backend создаёт aggregate в статусе `draft`, сохраняет запись и публикует `planning-period-created`. [cite:31][cite:40]
3. При открытии details screen UI вызывает `GET /planning-periods/{planningPeriodId}` и показывает metadata, goals и доступные действия в зависимости от текущего статуса. [cite:31][cite:45]
4. При редактировании UI использует `PATCH /planning-periods/{planningPeriodId}`. Application layer разрешает только поля, допустимые по статусу, и возвращает обновлённую detail model либо validation/status conflict error. [cite:31][cite:45]
5. При переходе в `open` UI инициирует `POST /planning-periods/{planningPeriodId}/open`. Backend выполняет readiness checks: goals после нормализации не пусты, диапазон дат валиден, период не полностью в прошлом, нет пересечения с period того же типа для того же продукта; затем меняет статус и публикует `planning-period-opened`. [cite:34][cite:35][cite:45]
6. При переходе в `close` UI вызывает `POST /planning-periods/{planningPeriodId}/close`; при отмене — `POST /planning-periods/{planningPeriodId}/cancel`. Backend проверяет допустимость transition по lifecycle, сохраняет новый статус и публикует соответствующее событие. [cite:31][cite:40]

## Изменения хранения или схемы

Нужна одна основная сущность хранения `planning_periods` (или эквивалентная таблица/модель), которая хранит: `id`, `product_id`, `period_type`, `name`, `start_date`, `end_date`, `status`, `goals`, `created_by`, `created_at`, `updated_at`. Поле `goals` хранится как structured formatted content, а не как plain text, чтобы сохранять форматирование после повторного открытия details screen. [cite:31][cite:33][cite:45]

На уровне БД и/или доменного слоя требуется обеспечить базовые ограничения: обязательные поля сущности, поддержка статусов `draft/open/closed/cancelled`, невозможность невалидного lifecycle transition и проверка конфликтов пересечения по `(product_id, period_type, date range)` как business invariant. Сравнение дат с `today`, trim-нормализация goals и часть status-aware edit rules остаются в application/domain logic, а не переносятся целиком в схему хранения. [cite:33][cite:34][cite:36][cite:38]

## Интеграции

Внутренние интеграции в рамках feature ограничены связью frontend planning module с backend API и публикацией внутренних domain/integration events. Внешние интеграции с Jira, IDM, audit systems, notification systems и approval workflows в эту feature не входят. [cite:45][cite:40]

Контрактная интеграция уже определена файлами `api-spec.yaml`, `data-schema.json`, `events.yaml`; реализация должна следовать этим контрактам без немого расширения scope. Если в коде выяснится необходимость дополнительных полей или переходов, это должно быть оформлено как follow-up/change request, а не добавлено молча в текущий slice. [cite:31][cite:33][cite:40][cite:43]

## Риски и компромиссы

Главный компромисс MVP — goals хранятся как meaningful formatted artifact без истории изменений и без отдельного lifecycle целей. Это упрощает vertical slice, но оставляет follow-up на audit trail, governance и explainability изменения целей после `open`. [cite:45]

Второй риск — часть правил живёт в domain/application layer, а не полностью выражена через schema-level constraints: overlap periods, semantic emptiness of goals после trim, допустимость update по статусу, запрет periods полностью в прошлом. Это нормально для MVP, но требует сильных automated tests на application services и API acceptance coverage. [cite:34][cite:35][cite:38]

Третий риск — редактирование goals в `open` допустимо, а продуктовая ответственность за стабильность целей остаётся на Head of Product. Это ускоряет MVP, но потенциально создаёт ambiguity для downstream planning features, поэтому важно явно документировать этот компромисс и не расширять текущую feature скрытыми governance-ограничениями. [cite:45]

## Нефункциональные требования

- UI entry points должны быть достижимы из основного planning UI без hidden URL, а Golden Path должен проходиться через list screen и details screen естественным пользовательским маршрутом. [cite:45]
- Все lifecycle actions и editable fields должны быть status-aware и давать человекочитаемую обратную связь в empty/loading/error/validation states. [cite:45][cite:35]
- Форматирование goals должно сохраняться после сохранения и повторного открытия details screen. [cite:45][cite:31]
- Domain logic должна быть детерминированной и проверяемой: одинаковые входные данные дают одинаковый verdict readiness/validation/lifecycle transition. [cite:34][cite:38]
- Реализация не должна затрагивать другие features и не должна включать скрытую подготовку product items, capacity, approvals, delete/archive или release workflow. [cite:43][cite:45]
