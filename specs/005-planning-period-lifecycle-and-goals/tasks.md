# Задачи реализации — 005 Planning Period Lifecycle and Goals

## T01 — Backend: доменная модель и lifecycle PlanningPeriod

- Тип: backend/domain
- Зависимости: нет (базовая доменная модель)
- Затрагиваемые файлы/модули: доменная модель `PlanningPeriod`, lifecycle policy, domain tests
- Прослеживаемость: spec.md — разделы "Цель", "Пользовательский сценарий", "Lifecycle периода"; plan.md — "Подход к реализации", "Затрагиваемые компоненты"
- User-facing: no
- Affects Golden Path: yes
- Expected entry point affected: no
- Критерии приёмки:
  - Aggregate `PlanningPeriod` поддерживает статусы `draft`, `open`, `closed`, `cancelled`.
  - Допустимы только переходы `draft → open`, `draft → cancelled`, `open → closed`; любые другие переходы не проходят доменную валидацию.
  - В доменной модели зафиксированы инварианты по невозможности возврата из `closed`/`cancelled` в рабочие статусы.
- Evidence expected:
  - Набор domain/unit тестов, демонстрирующих допустимые и недопустимые lifecycle transitions.

## T02 — Backend: бизнес-правила дат и overlap для periods

- Тип: backend/domain
- Зависимости: T01
- Затрагиваемые файлы/модули: application services/validators для create/open, доменные проверки
- Прослеживаемость: spec.md — раздел "Критерии проверки" (AC01–AC03 и связанные с датами), plan.md — "Поток данных", "Изменения хранения или схемы"
- User-facing: no
- Affects Golden Path: yes
- Expected entry point affected: no
- Критерии приёмки:
  - Попытка создать или открыть период с `endDate <= startDate` отклоняется с доменной ошибкой.
  - Попытка создать или открыть период, полностью лежащий в прошлом относительно текущей даты, отклоняется.
  - Попытка создать или открыть пересекающийся период (тот же product, тот же periodType, пересечение по датам с существующим периодом) отклоняется.
- Evidence expected:
  - Автотесты на application/domain уровне, покрывающие валидные и невалидные сценарии дат и overlap.

## T03 — Backend: goals как форматируемый артефакт и readiness rules

- Тип: backend/domain
- Зависимости: T01
- Затрагиваемые файлы/модули: модель хранения goals, нормализация, проверки readiness для `open`
- Прослеживаемость: spec.md — разделы про goals и readiness hints, plan.md — "Подход к реализации", "Изменения хранения или схемы"
- User-facing: no
- Affects Golden Path: yes
- Expected entry point affected: no
- Критерии приёмки:
  - Goals хранятся и возвращаются как structured formatted content, позволяя сохранять форматирование между сохранениями.
  - При переходе в `open` применяется trim/нормализация и проверка на семантическую непустоту goals.
  - Попытка перевести период в `open` без хотя бы одной осмысленной цели завершается валидируемой доменной/аппликационной ошибкой.
- Evidence expected:
  - Тесты, демонстрирующие сохранение форматирования goals и корректную работу readiness checks для `open`.

## T04 — Backend: API endpoints list/create/details/update/open/close/cancel

- Тип: backend/API
- Зависимости: T01, T02, T03
- Затрагиваемые файлы/модули: реализация контрактов api-spec.yaml, HTTP handlers/controllers, mapping ошибок
- Прослеживаемость: spec.md — Golden Path и раздел "Критерии проверки"; plan.md — "Поток данных"; contracts/api-spec.yaml, contracts/data-schema.json
- User-facing: no
- Affects Golden Path: yes
- Expected entry point affected: no
- Критерии приёмки:
  - Реализованы `GET /planning-periods`, `POST /planning-periods`, `GET /planning-periods/{id}`, `PATCH /planning-periods/{id}`, `POST /planning-periods/{id}/open`, `POST /planning-periods/{id}/close`, `POST /planning-periods/{id}/cancel` в соответствии с контрактом.
  - Возвращаемые модели соответствуют data-schema.json.
  - Ошибки 400/404/409 возвращаются согласно описаниям контрактов (validation, not found, status conflict).
- Evidence expected:
  - API-level tests или Postman/HTTP transcript, демонстрирующие основные сценарии и ошибки.

## T05 — Backend: events for lifecycle transitions

- Тип: backend/domain/integration
- Зависимости: T01, T04
- Затрагиваемые файлы/модули: event publisher, mapping доменных событий на contracts/events.yaml
- Прослеживаемость: plan.md — "Интеграции"; contracts/events.yaml
- User-facing: no
- Affects Golden Path: yes (важно для downstream, но не блокирует UI напрямую)
- Expected entry point affected: no
- Критерии приёмки:
  - При создании периода публикуется `planning-period-created`.
  - При переходе `draft → open` публикуется `planning-period-opened`.
  - При переходе `open → closed` публикуется `planning-period-closed`.
  - При переходе `draft → cancelled` публикуется `planning-period-cancelled`.
- Evidence expected:
  - Тесты или логи/фикстуры, показывающие публикацию соответствующих событий.

## T06 — Frontend: список planning periods и empty/loading/error states

- Тип: frontend/UI
- Зависимости: T04
- Затрагиваемые файлы/модули: planning module list screen, API client, state management
- Прослеживаемость: spec.md — разделы "Пользовательский сценарий", "В скоупе", "Empty / loading / error states"; plan.md — "Поток данных", "Нефункциональные требования"
- User-facing: yes
- Affects Golden Path: yes
- Expected entry point affected: yes
- Критерии приёмки:
  - Head of Product может из основного planning UI попасть в раздел списка planning periods без скрытых URL.
  - При отсутствии периодов отображается понятный empty state с объяснением и явным CTA для создания периода.
  - При загрузке данных отображается loading state, не ломающий layout.
  - При ошибке загрузки отображается человекочитаемый error state с возможностью повторить запрос.
- Evidence expected:
  - Скриншоты или краткое видео, демонстрирующие list/empty/loading/error states и доступность entry point.

## T07 — Frontend: создание периода и переход в draft

- Тип: frontend/UI
- Зависимости: T04, T06
- Затрагиваемые файлы/модули: форма создания периода, связанный API client, валидация на клиенте
- Прослеживаемость: spec.md — Golden Path шаги создания периода; plan.md — "Поток данных"
- User-facing: yes
- Affects Golden Path: yes
- Expected entry point affected: no (использует уже существующий entry point из T06)
- Критерии приёмки:
  - Пользователь может из списка стартовать создание периода.
  - Вводит название, дату начала, дату окончания, базовые goals и сохраняет период как `draft` через API.
  - При ошибках валидации (даты, пустое имя) UI показывает понятные сообщения и не ломает форму.
- Evidence expected:
  - Скриншоты/видео прохождения сценария создания периода до статуса `draft`, включая обработку типовых ошибок.

## T08 — Frontend: details screen периода и редактирование

- Тип: frontend/UI
- Зависимости: T04, T06, T07
- Затрагиваемые файлы/модули: details screen, goals editor, metadata display
- Прослеживаемость: spec.md — Golden Path, разделы про details screen и редактирование по статусам; plan.md — "Подход к реализации", "Нефункциональные требования"
- User-facing: yes
- Affects Golden Path: yes
- Expected entry point affected: no (вход через list)
- Критерии приёмки:
  - Из списка периода можно открыть details screen по явному действию.
  - В `draft` пользователь может редактировать название, даты и goals.
  - В `open` пользователь может редактировать goals и допустимые по правилам даты.
  - Форматирование goals сохраняется после сохранения и повторного открытия.
- Evidence expected:
  - Скриншоты/видео работы details screen в статусах `draft` и `open`, включая сохранение и повторное открытие.

## T09 — Frontend: lifecycle actions Open/Close/Cancel и readiness hints

- Тип: frontend/UI
- Зависимости: T04, T08
- Затрагиваемые файлы/модули: элементы UI для lifecycle, отображение readiness hints, обработка ошибок
- Прослеживаемость: spec.md — Golden Path, разделы про readiness и lifecycle; plan.md — "Подход к реализации", "Нефункциональные требования"
- User-facing: yes
- Affects Golden Path: yes
- Expected entry point affected: no
- Критерии приёмки:
  - Для периода в `draft` доступны действия Open и Cancel; для `open` доступно Close; для `closed` и `cancelled` lifecycle actions недоступны.
  - Перед выполнением Open UI показывает readiness hints по goals и датам (что ещё нужно, если не выполнено).
  - При ошибках readiness/валидации UI отображает сообщения, соответствующие контрактным поводам 400/409.
- Evidence expected:
  - Скриншоты/видео, демонстрирующие жизненный цикл периода через Open/Close/Cancel и работу readiness hints.

## T10 — Frontend: Golden Path end-to-end smoke

- Тип: frontend/UI/system test
- Зависимости: T06, T07, T08, T09
- Затрагиваемые файлы/модули: end-to-end сценарий, тест-кейсы или script
- Прослеживаемость: spec.md — Golden Path; plan.md — "Нефункциональные требования"
- User-facing: yes
- Affects Golden Path: yes
- Expected entry point affected: no (перепроверка уже настроенного маршрута)
- Критерии приёмки:
  - Полный сценарий: из основного UI зайти в список, создать период, открыть details, ввести goals, пройти readiness hints, перевести в `open`, убедиться в корректном статусе в списке и details.
  - Сценарий выполняется без hidden URL, технических флагов и ручного вмешательства в данные.
- Evidence expected:
  - Видео или поэтапные скриншоты с кратким описанием шагов Golden Path и наблюдаемых результатов.
