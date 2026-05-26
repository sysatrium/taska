# Feature Specification — Inline UI-редактор статуса задачи

## Metadata

- Feature ID: 002-demo-ui-feature
- Feature name: Inline Task Status Editor UI
- Status: Draft
- Owner: Product / UX / Frontend
- Decision owner: Product + Design + Engineering
- Confidence level: Medium
- Evidence status: смешанный; основан на утверждённых demo-конвенциях и UI-specific defaults
- Last updated: 2026-05-26
- Related overview artifacts:
  - `specs/000-project-overview/spec.md`
  - `specs/000-project-overview/data-model.md`
  - `specs/000-project-overview/architecture.md`
- Related feature artifacts:
  - `specs/001-demo-feature/spec.md`
  - `specs/001-demo-feature/contracts/api-spec.yaml`
- Related contracts:
  - `specs/002-demo-ui-feature/contracts/interaction-contract.md`
  - `specs/002-demo-ui-feature/contracts/ui-state-schema.json`

## 1. Цель

Предоставить inline UI-взаимодействие, которое позволяет пользователю менять статус задачи прямо внутри task board или task list без потери контекста, сохраняя понятную валидацию, loading feedback и recovery при ошибках.

## 2. Бизнес-контекст

- Почему фича существует: UI-пользователям нужен быстрый и низкофрикционный способ переводить работу между статусами.
- Кто выигрывает: delivery-команды, продуктовые менеджеры и любые пользователи, работающие из task list или board.
- Что меняется при успехе: смена статуса происходит быстрее и уменьшает navigation overhead.
- Почему сейчас: это хороший контраст к API-heavy demo feature и демонстрация UI-first SDD.

## 3. Карта оснований

### Подтверждённые факты

- В репозитории уже есть contract-first API demo для обновления статуса задачи.
- Demo kit ожидает spec, plan, tasks и verifier output для каждого примера.
- UI-пример должен оставаться implementation-agnostic, но при этом быть конкретным.

### Выведенный контекст

- UI будет зависеть от существующего API обновления статуса задачи или совместимого backend contract.
- Пользователи будут ожидать немедленный визуальный feedback после выбора статуса.
- Состояния ошибок должны быть видны inline, а не только скрыты в global toasts.

### Рекомендуемые defaults

- Использовать status dropdown или компактный selector, встроенный в строку или карточку задачи.
- Использовать optimistic UI только после явного одобрения product-командой.
- Для demo по умолчанию использовать pessimistic submit с видимым loading и inline error state.

### Временные допущения

- Task list уже показывает status chips или видимое поле статуса.
- Первая версия ориентирована на desktop-first responsive web UI.
- Accessibility требует keyboard navigation и screen-reader-readable текста статуса.

### Требует подтверждения

- Должно ли изменение статуса быть optimistic или server-confirmed до UI commit.
- Нужно ли для blocked статуса открывать вторичное поле причины.
- Нужно ли игнорировать повторные клики во время loading или ставить их в очередь.

## 4. Ожидаемые результаты

- Результат 1: пользователь может открыть inline control и выбрать новый статус.
- Результат 2: UI показывает понятные loading, success и error states.
- Результат 3: неудачные обновления сохраняют контекст пользователя и объясняют проблему inline.

## 5. В скоупе

- Inline status selector interaction.
- Local UI state model для idle, open, submitting, success и error states.
- Accessibility и keyboard behavior на уровне спецификации.
- Inline error handling и retry guidance.

## 6. Вне скоупа

- Полный board drag-and-drop workflow.
- Массовое multi-select редактирование.
- Богатая animation system сверх функционального feedback.
- Интеграция с notification center.

## 7. Ограничения и допущения

### Ограничения

- Ограничения стека: оставаться framework-neutral на уровне спецификации.
- UX-ограничения: сохранять локальный контекст и избегать disruptive full-page reload.
- Accessibility-ограничения: поддерживать keyboard access и visible focus states.
- Ограничения поставки: demo должен оставаться достаточно маленьким для одного feature pack.
- Ограничения интеграций: UI states должны быть согласованы с семантикой backend contract.

### Допущения

- В строке или карточке задачи достаточно места для inline control.
- API может возвращать structured validation или not-found errors.
- UI может идентифицировать активного пользователя для audit-relevant display при необходимости.

## 8. Зависимости

- Upstream dependency: backend contract обновления статуса задачи.
- Downstream dependency: refresh списка, analytics или activity feed updates.
- External dependency: design system primitives для menu, button и status chip.

## 9. Уже принятые решения

- Decision: использовать inline selector вместо отдельной edit modal.
  - Status: Recommended
  - Rationale: сохраняет контекст задачи и уменьшает interaction cost.
  - Implication: control должен чисто управлять компактными state transitions.
  - Requires confirmation by: Product + Design

- Decision: показывать inline error рядом с control.
  - Status: Approved
  - Rationale: локальные ошибки легче понять, чем generic page-level alerts.
  - Implication: строке задачи нужно место для компактного error rendering.
  - Requires confirmation by: already aligned with demo direction

## 10. Пограничные и отказные сценарии

- Пограничный сценарий: пользователь выбирает тот же статус, который уже активен.
  - Ожидаемое поведение: либо считать это no-op, либо по дизайну подавлять отправку.
- Пограничный сценарий: пользователь открывает один selector, затем другой до завершения первого.
  - Ожидаемое поведение: UI держит state изолированным по каждой задаче и не допускает cross-row leakage.
- Отказной сценарий: backend отклоняет blocked status, потому что отсутствует reason.
  - Ожидаемое поведение: inline error объясняет отсутствие input и сохраняет open state.
- Отказной сценарий: задача была удалена или перемещена конкурентно.
  - Ожидаемое поведение: показать inline not-found или stale-state feedback и обновить или удалить stale item согласно утверждённому UX.

## 11. Критерии проверки

### Функциональная проверка

- Пользователь может открыть, выбрать, отправить и увидеть итоговый статус.
- Loading state блокирует duplicate submission.
- Error state видим inline и поддерживает recovery.
- Keyboard interactions работают для open, navigate, select и escape/close behavior.

### Нефункциональная проверка

- State transitions детерминированы.
- Визуальный feedback консистентен для success и failure paths.
- UI state schema покрывает все поддерживаемые interaction states.

### Наблюдаемость и диагностика

- логи: ошибки UI-взаимодействия и unexpected response handling.
- метрики: open rate, submit success rate, submit failure rate.
- трейсы: опциональная корреляция с backend request IDs.
- алерты: для demo не требуются.

## 12. Первичные подсказки по задачам

1. Определить interaction contract и UI state schema.
2. Спланировать component structure и state ownership.
3. Реализовать control и проверить interaction paths.

## 13. Открытые вопросы

- Разрешён ли optimistic UI в первой версии?
- Требует ли `blocked` вторичного inline поля причины или follow-up dialog?
- Должен ли successful update auto-close selector сразу или после короткого confirmation state?

## 14. Контрольный список готовности к планированию

- [x] Цель сформулирована явно.
- [x] Evidence status видим.
- [x] Provisional items помечены.
- [x] Разделы «в скоупе» и «вне скоупа» разделены чётко.
- [x] Ограничения конкретны.
- [x] Зависимости видимы.
- [x] Критерии проверки тестируемы.
- [x] Открытые вопросы зафиксированы.
