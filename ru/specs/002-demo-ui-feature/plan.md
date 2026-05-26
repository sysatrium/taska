# Implementation Plan — Inline UI-редактор статуса задачи

## Metadata

- Feature ID: 002-demo-ui-feature
- Feature name: Inline Task Status Editor UI
- Status: Draft
- Based on spec: `specs/002-demo-ui-feature/spec.md`
- Related contracts:
  - `specs/002-demo-ui-feature/contracts/interaction-contract.md`
  - `specs/002-demo-ui-feature/contracts/ui-state-schema.json`
- Dependency contract:
  - `specs/001-demo-feature/contracts/api-spec.yaml`
- Confidence level: Medium
- Decision status summary: approved UI-local error direction with provisional submission strategy
- Last updated: 2026-05-26

## 1. Краткое описание скоупа

Реализовать компактный inline status editor, который открывается внутри строки или карточки задачи, позволяет выбрать статус, отправляет изменение через backend contract обновления статуса и отражает idle, open, submitting, success и error states без потери контекста окружающего task list.

## 2. Прослеживаемость к спецификации

| Элемент спецификации | Ответ в плане | Статус | Примечание |
|---|---|---|---|
| Inline selector interaction | Построить row-level inline editor component | Recommended | Сохраняет взаимодействие рядом с задачей |
| Видимость loading, success и error | Добавить явную local state machine | Approved | Нужна для детерминированного UI behavior |
| Keyboard accessibility | Определить правила focus entry, navigation, selection и exit | Approved | Нужно для a11y verification |
| Blocked status может требовать extra reason | Зарезервировать extensibility point в interaction flow | Provisional | Зависит от product decision |

## 3. Зоны, чувствительные к допущениям

- Submission может быть pessimistic или optimistic в зависимости от product preference.
- List может перерисовываться после save; локальное state ownership должно переживать предсказуемые refresh.
- Inline capture причины для blocked ещё не финализирован.

## 4. Архитектурные изменения

Ввести границу UI component для inline editor, local state machine или reducer для interaction states, request adapter для backend API и небольшой mapping layer между backend errors и user-facing inline messages.

## 5. Поток данных и последовательность

1. Пользователь активирует inline editor.
2. UI открывает selector статусов и переводит focus внутрь control.
3. Пользователь выбирает целевой статус.
4. UI валидирует локально известные ограничения.
5. UI отправляет запрос через status update API.
6. UI входит в submitting state и блокирует duplicate actions.
7. UI переходит в success, inline error или stale-item handling state.
8. Строка задачи обновляется или refresh-ится без full-page navigation.

## 6. Технологические решения

- Решение:
  - Статус: Recommended
  - Evidence: UI demo должен оставаться переносимым между framework-ами и при этом показывать discipline управления state.
  - Обоснование: это фокусирует пример на interaction design и state management, а не на конкретной UI library.
  - Отклонённые альтернативы: framework-specific hooks и component APIs внутри самого плана.
  - Требует подтверждения от: Engineering

## 7. Изменения модели данных, UI state и схем

- Изменение: определить local interaction state schema, покрывающую `idle`, `open`, `submitting`, `success` и `error`.
  - Влияние: тесты и реализация смогут проверять полноту state model.
  - Примечание по миграции или rollout: нет на project-level; это purely feature-local UI state.

## 8. Точки интеграции

- Интеграция: task status update API
  - Интерфейс: request adapter, вызывающий backend contract из demo feature 001
  - Режим отказа: validation error, not found, unauthorized, transport failure
  - Fallback-поведение: показать inline error и сохранить пользовательский контекст

- Интеграция: design system primitives
  - Интерфейс: button, menu/listbox, status chip, inline message area
  - Режим отказа: несогласованная композиция или отсутствие a11y affordances
  - Fallback-поведение: использовать более простую композицию primitives с сохранением семантики

## 9. Риски и меры снижения

- Риск: state inline editor протекает между несколькими строками задач.
  - Вероятность: Medium
  - Влияние: High
  - Митигирующее действие: локализовать state ownership по task row и проверить multi-row interaction tests.

- Риск: optimistic UI создаёт рассогласование с backend truth.
  - Вероятность: Medium
  - Влияние: Medium
  - Митигирующее действие: по умолчанию использовать pessimistic confirmation, пока явно не утверждено иное.

- Риск: workflow blocked status остаётся недоопределённым.
  - Вероятность: High
  - Влияние: Medium
  - Митигирующее действие: держать blocked-reason behavior как явный extension point и открытый вопрос.

## 10. Нефункциональные требования

- Производительность: open/close control и рендер response должны ощущаться быстрыми.
- Accessibility: keyboard и focus management обязательны.
- Надёжность: failed requests не должны молча менять видимый статус.
- Наблюдаемость: client-side failures должны быть привязуемы к задаче и request context, где это возможно.
- Сопровождаемость: UI state transitions должны быть явными и тестируемыми.

## 11. Стратегия тестирования

- unit-тесты: local state machine transitions и error mapping.
- integration-тесты: component interaction с mocked backend outcomes.
- contract-тесты: mapping backend response shapes в UI states.
- end-to-end тесты: опциональны, но полезны для focus и inline error behavior.
- ручная проверка: walkthrough только клавиатурой и мышью.

## 12. Вывод в эксплуатацию и откат

- план вывода: выпустить под feature flag или demo-only route.
- триггер отката: частые UI errors, сломанная keyboard interaction или stale-state mismatch.
- шаги отката: отключить inline editor и вернуть read-only отображение статуса.
- post-release проверки: подтвердить submit success rate, failure rate и отсутствие duplicate-submit spikes.

## 13. Слабо подтверждённые области

- финальный UX для blocked-reason не определён.
- поведение optimistic UI намеренно не решено.
- mobile-specific touch patterns не полностью детализированы в первом примере.

## 14. Контрольный список готовности плана

- [x] План прослеживается к замыслу спецификации.
- [x] Approved и provisional решения различимы.
- [x] Изменения данных и UI state видимы.
- [x] Риски и меры снижения задокументированы.
- [x] Стратегия тестирования определена.
- [x] Вывод в эксплуатацию и откат описаны.
