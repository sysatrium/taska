# Implementation Plan — API обновления статуса задачи

## Metadata

- Feature ID: 001-demo-feature
- Feature name: Task Status Update API
- Status: Draft
- Based on spec: `specs/001-demo-feature/spec.md`
- Related contracts:
  - `specs/001-demo-feature/contracts/api-spec.yaml`
  - `specs/001-demo-feature/contracts/data-schema.json`
- Confidence level: Medium
- Decision status summary: approved demo direction with provisional workflow details
- Last updated: 2026-05-26

## 1. Краткое описание скоупа

Реализовать минимальный API-срез для обновления статуса задачи, валидации ограниченной transition model, сохранения нового статуса и возврата стабильного contract-compliant response. Полные workflow engine, уведомления и multi-entity orchestration остаются вне реализации.

## 2. Прослеживаемость к спецификации

| Элемент спецификации | Ответ в плане | Статус | Примечание |
|---|---|---|---|
| Обновить статус существующей задачи | Добавить выделенный update-status endpoint и handler | Recommended | Следует contract-first design |
| Отклонять невалидные значения статуса | Валидировать по enum до сохранения | Approved | Требуется контрактом |
| Требовать причину для blocked | Валидировать `blockedReason`, когда status = `blocked` | Provisional | Нуждается в подтверждении продукта |
| Сохранять детерминированный response | Стандартизировать success и error payloads | Approved | Нужен для тестов и интеграций |

## 3. Зоны, чувствительные к допущениям

- Матрица допустимых переходов состояния намеренно минимальна для demo.
- Хранение audit events может быть синхронным или асинхронным в реальной реализации.
- Аутентификация предполагается существующей вне этого среза.

## 4. Архитектурные изменения

Ввести один API handler, один application-service method, один набор domain validation rules и одну persistence operation обновления. Держать границы явными: transport валидирует shape запроса, domain валидирует transition logic, persistence обновляет stored state.

## 5. Поток данных и последовательность

1. Клиент отправляет аутентифицированный запрос.
2. API-слой валидирует request schema.
3. Application service загружает существующую задачу.
4. Domain rule валидирует целевой статус и условия перехода.
5. Persistence layer обновляет запись задачи.
6. Audit event записывается или ставится в очередь.
7. Возвращается response в contract-defined shape.

## 6. Технологические решения

- Решение:
  - Статус: Recommended
  - Evidence: demo-ограничения репозитория благоприятствуют contract-first и stack-neutral структуре.
  - Обоснование: это сохраняет пример переносимым между разными implementation stacks.
  - Отклонённые альтернативы: framework-specific design внутри spec pack.
  - Требует подтверждения от: Engineering

## 7. Изменения модели данных, базы и схем

- Изменение: добавить или формализовать поля `status`, `blockedReason`, `updatedAt` и `updatedBy` в представлении task.
  - Влияние: persistence schema должна поддерживать state tracking и auditability.
  - Примечание по миграции или rollout: `blockedReason` nullable, кроме случая, когда status = `blocked`.

## 8. Точки интеграции

- Интеграция: authentication layer
  - Интерфейс: authenticated request context
  - Режим отказа: отсутствующий или невалидный principal
  - Fallback-поведение: отклонить с authentication error

- Интеграция: audit pipeline
  - Интерфейс: internal event или log emission
  - Режим отказа: ошибка записи audit
  - Fallback-поведение: определить, нужно ли fail hard или degrade gracefully, до начала реализации

## 9. Риски и меры снижения

- Риск: transition rules остаются недоопределёнными.
  - Вероятность: Medium
  - Влияние: Medium
  - Митигирующее действие: сохранить transition logic минимальной и задокументировать открытые вопросы.

- Риск: клиенты начнут полагаться на нестабильные response fields.
  - Вероятность: Medium
  - Влияние: High
  - Митигирующее действие: проверять примеры на соответствие schema и freeze response contract.

## 10. Нефункциональные требования

- Производительность: single-task updates должны оставаться low latency.
- Безопасность: только аутентифицированные вызовы могут обновлять статус.
- Надёжность: updates не должны частично коммитить silent invalid state.
- Наблюдаемость: каждый request должен давать диагностируемые логи и counters.
- Сопровождаемость: rule logic должна оставаться отдельно от transport code.

## 11. Стратегия тестирования

- unit-тесты: валидация статусов и transition rules.
- integration-тесты: happy path endpoint + persistence и validation errors.
- contract-тесты: response examples и request validation against schema.
- end-to-end тесты: опционально для demo.
- ручная проверка: curl/Postman для валидных и невалидных кейсов.

## 12. Вывод в эксплуатацию и откат

- план вывода: включить endpoint сначала в development или demo environment.
- триггер отката: повторяющиеся contract failures или неожиданная corruption состояния.
- шаги отката: отключить route и откатить schema change при необходимости.
- post-release проверки: проверить success/error rate, audit emission и стабильность response shape.

## 13. Слабо подтверждённые области

- Role-specific transition permissions не определены.
- Финальное решение по строгости audit pipeline не принято.
- Семантика reopen для completed tasks намеренно оставлена открытой.

## 14. Контрольный список готовности плана

- [x] План прослеживается к замыслу спецификации.
- [x] Approved и provisional решения различимы.
- [x] Изменения данных видимы.
- [x] Риски и меры снижения задокументированы.
- [x] Стратегия тестирования определена.
- [x] Вывод в эксплуатацию и откат описаны.
