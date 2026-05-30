# Implementation Plan — 004 Team Profile and Capacity

## Метаданные

- Feature ID: 004
- Feature name: team-profile-and-capacity
- Status: Planned
- Last updated: 2026-05-30
- Input artifacts:
  - specs/004-team-profile-and-capacity/spec.md
  - specs/004-team-profile-and-capacity/contracts/api-spec.yaml
  - specs/004-team-profile-and-capacity/contracts/data-schema.json

## Подход к реализации

Фича реализуется как узкий вертикальный срез для создания и редактирования глобального профиля команды.
Реализация покрывает только те сценарии, которые подтверждены спецификацией и контрактами: создание команды, чтение команды, обновление команды, получение списка команд и чтение централизованного справочника компетенций.
Фича сознательно не включает period-specific capacity, planning items, привязку команды к planning period и администрирование справочника компетенций.

Ключевой архитектурный принцип: глобальный профиль команды хранится отдельно от любых period-specific planning-данных.
Централизованный справочник компетенций используется как read-only источник для feature 004.
Если в будущем потребуется управление справочником компетенций или хранение capacity по периодам, это должно быть реализовано отдельными feature, а не скрыто добавлено в текущую реализацию.

## Затрагиваемые компоненты

### UI / Frontend

- Экран или форма создания глобального профиля команды.
- Экран или форма редактирования профиля команды.
- Компонент выбора компетенций из централизованного справочника.
- Экран списка команд или reusable selector команд для downstream navigation.
- Состояния loading, empty, validation error и save error для формы команды.

### Backend / Application Layer

- Team application service для create, get, list и patch сценариев.
- Competency catalog query service для чтения централизованного справочника.
- Authorization / permission check на создание и редактирование team profile.
- Validation layer для обязательных полей и допустимых competencyIds.
- Conflict handling для дублей команд и конкурентных изменений.

### Persistence Layer

- Хранилище глобальных team profiles.
- Хранилище или seeded reference table централизованного справочника компетенций.
- Механизм начального заполнения competency catalog seed-данными.

## Поток данных

### Сценарий создания команды

1. Пользователь с допустимой ролью открывает форму создания команды.
2. Frontend запрашивает централизованный справочник компетенций через `GET /api/competencies`.
3. Пользователь вводит `name`, `ownerRole` и выбирает минимум одну компетенцию.
4. Frontend отправляет `POST /api/teams`.
5. Backend валидирует роль пользователя, обязательные поля, уникальность competencyIds и существование каждой компетенции в каталоге.
6. Backend проверяет наличие очевидного дубля команды.
7. При успехе backend сохраняет новый глобальный профиль команды и возвращает созданную сущность.
8. Frontend показывает сохранённый профиль команды или переводит пользователя в экран просмотра / редактирования.

### Сценарий редактирования команды

1. Frontend загружает профиль команды через `GET /api/teams/{teamId}`.
2. Frontend загружает централизованный справочник компетенций через `GET /api/competencies`.
3. Пользователь изменяет `name`, `ownerRole` и/или `competencyIds`.
4. Frontend отправляет `PATCH /api/teams/{teamId}` только с изменёнными полями.
5. Backend валидирует payload, наличие команды и допустимость выбранных компетенций.
6. Backend сохраняет обновлённый глобальный профиль команды.
7. Frontend показывает обновлённую сущность и сохраняет пользовательский контекст при ошибке.

### Сценарий получения списка команд

1. Frontend или downstream screen вызывает `GET /api/teams`.
2. Backend возвращает список глобальных профилей команд.
3. Полученные команды могут переиспользоваться следующими feature как доступные planning entities без period-specific state.

## Изменения хранения или схемы

### Team storage

Нужно ввести persistent model для глобального профиля команды со следующими полями:
- `id`
- `name`
- `ownerRole`
- `competencyIds`
- `createdAt`
- `updatedAt`

В этой модели не должно быть:
- `planningPeriodId`
- period-specific capacity fields
- participation flag for a planning period
- planning item references

### Competency catalog storage

Нужно ввести reference storage для централизованного справочника компетенций.
Для feature 004 этот справочник read-only и должен быть предзаполнен seed-данными до начала пользовательского сценария.

Минимальный seed list:
- Backend Development
- Frontend Development
- QA / Testing
- DevOps / Infrastructure
- Design (UI/UX)
- Product Management
- Data Engineering
- Mobile Development
- Security / InfoSec

### Data consistency rules

- У команды всегда должен быть минимум один `competencyId`.
- Каждый `competencyId` должен ссылаться на существующую competency из каталога.
- Дубли внутри `competencyIds` недопустимы.
- Изменение имени команды не должно разрушать её стабильную identity.
- В рамках feature 004 изменение или удаление компетенций у команды разрешено, так как downstream-связи ещё не создаются.

## Интеграции

### Внутренние интеграции

- Интеграция frontend формы команды с Team API.
- Интеграция формы выбора компетенций с Competency Catalog API.
- Интеграция application layer с persistent storage команд и reference storage компетенций.

### Внешние интеграции

- Для MVP внешние интеграции не требуются.
- Событийная интеграция не требуется.
- Интеграция с planning period, planning items и capacity planning не входит в текущую feature.

## Риски и компромиссы

### Риски

- Риск дублей команд при почти одновременном создании одной и той же команды разными пользователями.
- Риск слабой управляемости vocabulary, если типовой набор компетенций окажется недостаточным для реальных команд.
- Риск конфликтов при конкурентном редактировании одного team profile.
- Риск UX-блокировки, если справочник компетенций по ошибке не будет предзаполнен до запуска сценария.
- Риск неоднозначности поля `ownerRole`, если допустимые значения не будут согласованы на уровне реализации.

### Компромиссы

- В MVP справочник компетенций read-only, потому что admin flow исключён из scope текущей feature.
- В MVP команда не содержит `status`, потому что сценарий жизненного цикла команды не подтверждён спецификацией.
- В MVP нет delete team flow, чтобы не добавлять неподтверждённые правила soft delete и downstream protection.
- В MVP изменение компетенций разрешено без ограничений, потому что planning items и другие downstream-связи ещё не создаются.
- В MVP используется простая модель `ownerRole`, а не более сложная ownership model с отдельной сущностью владельца.

### Follow-up вне текущей feature

- Управление централизованным справочником компетенций.
- Правила поведения при изменении компетенций после появления downstream-связей.
- Period-specific capacity profile.
- Участие команды в planning period через planning items и последующие planning features.

## Нефункциональные требования

### Корректность и валидация

- Backend обязан явно валидировать обязательные поля `name`, `ownerRole` и `competencyIds`.
- Backend обязан отклонять несуществующие competencyIds.
- Backend обязан возвращать явные ошибки `400`, `403`, `404`, `409`, `422` в соответствии с API contract.

### Надёжность

- Ошибка сохранения не должна приводить к потере уже введённых пользователем данных на уровне UI.
- Конкурентные изменения не должны теряться молча.
- Seeded competency catalog должен быть доступен до начала пользовательского сценария создания команды.

### Поддерживаемость

- Team profile и competency catalog должны быть реализованы как отдельные bounded concerns.
- Period-specific planning logic не должна просачиваться в код feature 004.
- Контрактные модели должны оставаться синхронизированы с `api-spec.yaml` и `data-schema.json`.

### UX и производительность

- Форма создания и редактирования команды должна иметь предсказуемые loading и error states.
- Справочник компетенций должен загружаться достаточно быстро, чтобы не блокировать основной пользовательский сценарий.
- Валидационные ошибки должны быть адресными и привязанными к полям формы.

## Прослеживаемость к спецификации

### Пользовательский сценарий

- Create flow в плане соответствует пользовательскому сценарию создания глобального профиля команды.
- Edit flow поддерживает заявленную возможность поддерживать и обновлять команду.
- Read-only competency catalog соответствует решению о централизованном справочнике без локального расширения в MVP.

### Acceptance criteria coverage

- AC01 и AC02 покрываются create flow и authorization checks.
- AC03 покрывается отдельным competency catalog endpoint и validation layer.
- AC04, AC05 и AC06 покрываются отсутствием period-specific capacity и planning period linkage в data model и API.
- AC07 покрывается исключением planning items и iteration planning из реализации.
- AC08 покрывается `GET /api/teams` и `GET /api/teams/{teamId}` как источниками глобальных team profiles.
- AC09 покрывается `PATCH /api/teams/{teamId}` с разрешённым изменением `competencyIds`.

## Порядок реализации

1. Ввести persistent schema для global team profile и reference schema для competency catalog.
2. Добавить seed-механизм для начального заполнения competency catalog.
3. Реализовать backend read API для competency catalog.
4. Реализовать backend create/get/list/patch API для team profile.
5. Добавить validation, authorization и conflict handling.
6. Реализовать frontend flow создания команды.
7. Реализовать frontend flow редактирования и просмотра команды.
8. Добавить empty, loading и error states.
9. Проверить соответствие реализации `spec.md`, `api-spec.yaml` и `data-schema.json`.
