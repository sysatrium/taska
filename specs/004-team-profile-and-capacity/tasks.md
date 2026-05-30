# Tasks — 004 Team Profile and Capacity

## Метаданные

- Feature ID: 004
- Feature name: team-profile-and-capacity
- Status: Planned
- Last updated: 2026-05-30
- Input artifacts:
  - specs/004-team-profile-and-capacity/spec.md
  - specs/004-team-profile-and-capacity/plan.md
  - specs/004-team-profile-and-capacity/contracts/api-spec.yaml
  - specs/004-team-profile-and-capacity/contracts/data-schema.json

## Правила выполнения

- Задачи выполняются по порядку зависимостей.
- Одна задача — одна проверяемая единица выполнения.
- Если в ходе реализации появляется scope, не описанный в spec.md или plan.md, он не добавляется в текущую feature автоматически и фиксируется отдельно как follow-up.

---

## T1 — Ввести persistent model для global team profile

- Type: backend
- Category: storage
- Estimate: 2–4h
- Depends on: none
- Enablement task: yes
- Реализует:
  - spec.md → В скоупе: создание и хранение глобального профиля команды
  - plan.md → Изменения хранения или схемы / Team storage
- Затрагиваемые файлы:
  - backend storage schema / migration files
  - team repository model files
- Что сделать:
  - Добавить persistent schema для team profile с полями `id`, `name`, `ownerRole`, `competencyIds`, `createdAt`, `updatedAt`.
  - Убедиться, что в схеме отсутствуют `planningPeriodId`, capacity fields и planning item references.
- Критерии приёмки:
  - Сущность команды может быть сохранена и прочитана из хранилища.
  - В storage model нет полей period-specific planning state.
- Проверка:
  - Миграция применяется локально без ошибок.
  - Repository-level test или smoke test подтверждает create/read roundtrip.

---

## T2 — Ввести reference storage и seed-механизм для competency catalog

- Type: backend
- Category: storage
- Estimate: 2–4h
- Depends on: none
- Enablement task: yes
- Реализует:
  - spec.md → Approved decisions: справочник компетенций предзаполнен типовым набором
  - plan.md → Competency catalog storage
- Затрагиваемые файлы:
  - backend reference schema / migration files
  - seed scripts or bootstrap files
- Что сделать:
  - Добавить reference storage для competency catalog.
  - Предзаполнить каталог seed list значениями: Backend Development, Frontend Development, QA / Testing, DevOps / Infrastructure, Design (UI/UX), Product Management, Data Engineering, Mobile Development, Security / InfoSec.
- Критерии приёмки:
  - После инициализации окружения competency catalog не пустой.
  - Все seed competencies доступны как selectable values.
- Проверка:
  - Seed / bootstrap выполняется успешно.
  - Проверка чтения каталога возвращает все ожидаемые значения.

---

## T3 — Реализовать read API для competency catalog

- Type: backend
- Category: api
- Estimate: 1–3h
- Depends on: T2
- Enablement task: yes
- Реализует:
  - spec.md → AC03
  - plan.md → Backend / Competency catalog query service
- Затрагиваемые файлы:
  - competency API handler / controller
  - competency query service
  - API routing files
- Что сделать:
  - Реализовать `GET /api/competencies` в соответствии с `contracts/api-spec.yaml`.
  - Возвращать только централизованный read-only catalog без admin operations.
- Критерии приёмки:
  - Endpoint возвращает список selectable competencies в контрактной форме.
  - Endpoint не позволяет создавать, обновлять или удалять competencies.
- Проверка:
  - API test на `GET /api/competencies`.
  - Response shape совпадает с `data-schema.json`.

---

## T4 — Реализовать create team API

- Type: backend
- Category: api
- Estimate: 2–4h
- Depends on: T1, T2
- Enablement task: no
- Реализует:
  - spec.md → AC01, AC02, AC04
  - plan.md → Поток данных / Сценарий создания команды
- Затрагиваемые файлы:
  - team API handler / controller
  - team application service
  - repository integration files
  - API routing files
- Что сделать:
  - Реализовать `POST /api/teams`.
  - Сохранять новый глобальный профиль команды и возвращать созданную сущность.
- Критерии приёмки:
  - Команда создаётся только при наличии `name`, `ownerRole` и минимум одной competency.
  - Response совпадает с контрактом `Team`.
- Проверка:
  - API test на happy path создания команды.
  - Repository подтверждает сохранение сущности.

---

## T5 — Добавить validation и authorization для create team API

- Type: backend
- Category: validation
- Estimate: 2–3h
- Depends on: T4
- Enablement task: no
- Реализует:
  - spec.md → AC01, AC02, AC03
  - spec.md → Edge cases: недопустимая роль, пустые компетенции, несуществующая competency
  - plan.md → Validation layer / Authorization checks
- Затрагиваемые файлы:
  - request validation layer
  - authorization / policy files
  - error mapping files
- Что сделать:
  - Добавить проверки обязательных полей, уникальности `competencyIds`, существования competencyIds в каталоге.
  - Ограничить create flow допустимыми ролями.
  - Возвращать `400`, `403`, `409`, `422` по контракту.
- Критерии приёмки:
  - Невалидные payloads отклоняются адресными ошибками.
  - Пользователь без допустимой роли не может создать команду.
  - Очевидный дубль команды не создаётся молча.
- Проверка:
  - Набор API tests на validation and authorization failures.

---

## T6 — Реализовать get/list team API

- Type: backend
- Category: api
- Estimate: 1–3h
- Depends on: T1
- Enablement task: no
- Реализует:
  - spec.md → AC08
  - plan.md → Сценарий получения списка команд
- Затрагиваемые файлы:
  - team query handlers / controllers
  - team query service
  - API routing files
- Что сделать:
  - Реализовать `GET /api/teams` и `GET /api/teams/{teamId}`.
  - Возвращать глобальные team profiles без period-specific fields.
- Критерии приёмки:
  - Список команд доступен downstream consumers.
  - Получение одной команды по id возвращает контрактную сущность или `404`.
- Проверка:
  - API tests на list and get by id.
  - Проверка отсутствия лишних полей вне контрактной модели.

---

## T7 — Реализовать patch team API

- Type: backend
- Category: api
- Estimate: 2–4h
- Depends on: T1, T2, T6
- Enablement task: no
- Реализует:
  - spec.md → AC09
  - plan.md → Поток данных / Сценарий редактирования команды
- Затрагиваемые файлы:
  - team patch handler / controller
  - team application service
  - repository update logic
- Что сделать:
  - Реализовать `PATCH /api/teams/{teamId}` как частичное обновление.
  - Разрешить менять `name`, `ownerRole`, `competencyIds`.
- Критерии приёмки:
  - Частичный update работает только для разрешённых полей.
  - Изменение и удаление competencies допустимо в рамках feature 004.
  - При отсутствии команды возвращается `404`.
- Проверка:
  - API tests на успешный patch, patch with invalid competencyIds и patch missing team.

---

## T8 — Добавить conflict handling для конкурентных изменений команды

- Type: backend
- Category: reliability
- Estimate: 1–3h
- Depends on: T7
- Enablement task: no
- Реализует:
  - spec.md → Failure scenario: concurrent edits
  - plan.md → Conflict handling
- Затрагиваемые файлы:
  - repository concurrency logic
  - service layer conflict mapping
  - error response mapping
- Что сделать:
  - Добавить механизм предотвращения silent overwrite при конкурентном редактировании team profile.
  - Возвращать явный conflict response.
- Критерии приёмки:
  - Конкурентные изменения не затирают друг друга молча.
  - Клиент получает распознаваемый conflict error.
- Проверка:
  - Integration test или concurrency-focused test на конфликт обновлений.

---

## T9 — Реализовать frontend flow создания команды

- Type: frontend
- Category: ui
- Estimate: 2–4h
- Depends on: T3, T4, T5
- Enablement task: no
- Реализует:
  - spec.md → Пользовательский сценарий / шаги 1–4
  - plan.md → UI / форма создания команды
- Затрагиваемые файлы:
  - team create page / form files
  - frontend API client files
  - form validation bindings
- Что сделать:
  - Построить форму создания команды.
  - Загружать competency catalog, позволять выбрать минимум одну competency и отправлять `POST /api/teams`.
- Критерии приёмки:
  - Пользователь может создать команду через UI happy path.
  - Форма не позволяет отправить пустой `name`, пустой `ownerRole` или пустой набор competencies.
- Проверка:
  - Manual QA сценария создания команды.
  - UI/component/integration test на create flow.

---

## T10 — Реализовать frontend flow просмотра и редактирования команды

- Type: frontend
- Category: ui
- Estimate: 2–4h
- Depends on: T3, T6, T7, T8
- Enablement task: no
- Реализует:
  - spec.md → возможность поддерживать и обновлять команду
  - spec.md → AC08, AC09
  - plan.md → UI / edit flow
- Затрагиваемые файлы:
  - team details / edit page files
  - frontend API client files
  - edit form state management files
- Что сделать:
  - Реализовать загрузку существующей команды.
  - Реализовать редактирование `name`, `ownerRole`, `competencyIds` и отправку `PATCH`.
- Критерии приёмки:
  - Существующая команда открывается и редактируется через UI.
  - Изменённые competencies сохраняются и отображаются после reload.
  - Conflict error отображается явно и не теряется.
- Проверка:
  - Manual QA сценария редактирования.
  - UI/integration test на edit flow.

---

## T11 — Добавить empty/loading/error states для team UI

- Type: frontend
- Category: ux
- Estimate: 1–3h
- Depends on: T9, T10
- Enablement task: no
- Реализует:
  - spec.md → Empty state, Loading state, Error state
  - plan.md → UX и производительность / loading and error states
- Затрагиваемые файлы:
  - team UI state components
  - form error rendering files
  - empty state view files
- Что сделать:
  - Добавить loading state при загрузке команды и каталога компетенций.
  - Добавить empty state при отсутствии команд.
  - Добавить адресное отображение validation и save errors без потери пользовательского контекста.
- Критерии приёмки:
  - Пользователь видит предсказуемые loading, empty и error states.
  - Уже введённые данные не теряются при save error.
- Проверка:
  - Manual QA на негативные сценарии.
  - UI test на error rendering и empty state.

---

## T12 — Провести contract/spec/plan alignment check

- Type: qa
- Category: verification
- Estimate: 1–2h
- Depends on: T3, T5, T6, T7, T8, T9, T10, T11
- Enablement task: no
- Реализует:
  - plan.md → финальная проверка соответствия
  - spec.md → Acceptance criteria coverage
- Затрагиваемые файлы:
  - test checklist files
  - feature documentation updates if needed
- Что сделать:
  - Проверить соответствие реализации `spec.md`, `plan.md`, `api-spec.yaml` и `data-schema.json`.
  - Подтвердить отсутствие скрытого scope: status, period-specific capacity, planning items, admin-flow catalog.
- Критерии приёмки:
  - Все AC из spec имеют явное подтверждение в реализации или тестах.
  - В реализации нет лишних полей и сценариев вне scope feature 004.
- Проверка:
  - Final QA checklist.
  - Ручная сверка артефактов и результатов реализации.

## Порядок выполнения

1. T1
2. T2
3. T3
4. T4
5. T5
6. T6
7. T7
8. T8
9. T9
10. T10
11. T11
12. T12
