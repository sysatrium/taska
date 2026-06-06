# Этап 4.1c — Pre-verify hardening gate

## Назначение

Проверить feature после реализации, но до adversarial verify, чтобы не тратить verify-этап на очевидные инфраструктурные, evidence и wiring gaps.

Этот этап не заменяет `06-verify-task.md` и `06b-verify-feature.md`. Он только подготавливает feature к ним.

## Когда использовать

Используйте после `05-implement-feature-batch.md` и до `06-verify-task.md`, особенно для user-facing или Golden Path задач.

## Входные данные

- `specs/NNN-feature-name/spec.md`
- `specs/NNN-feature-name/plan.md`
- `specs/NNN-feature-name/tasks.md`
- `specs/NNN-feature-name/meta.yaml`
- `specs/000-project-overview/feature-meta.schema.md`, если он есть
- `specs/000-project-overview/templates/verification.md`, если он есть
- релевантные контракты
- фактические изменения в working tree
- доступный локальный toolchain

## Что нужно сделать

1. Проверить, что `meta.yaml` существует, соответствует `feature-meta.schema.md` при наличии schema artifact, и feature не находится в статусе `released`.
2. Выполнить базовые quality gates, если toolchain доступен:
   - lint;
   - build/typecheck;
   - unit/component tests.
3. Для изменённых backend/API endpoints подготовить focused API contract evidence:
   - route доступен;
   - response shape соответствует контракту;
   - error envelope соответствует контракту;
   - основные lifecycle/status paths покрыты хотя бы API-level tests или HTTP transcript.
4. Для user-facing feature подготовить runnable browser/e2e smoke:
   - entry point достижим из ожидаемого UI;
   - Golden Path или main user path проходит без hidden URL;
   - предыдущие released Golden Path/critical smoke, если затронут app shell, не сломаны.
5. Проверить, что `Evidence expected` из `tasks.md` не расходится с фактическим evidence:
   - если ожидаются screenshots/video, либо подготовить их, либо явно зафиксировать, что заменяющим evidence является browser smoke transcript/e2e report;
   - если evidence отсутствует, пометить pre-verify blocker.
6. Обновить или создать `specs/NNN-feature-name/verification.md` с командами, результатами, known blockers/follow-ups и ссылкой на risk register, если он есть. Если есть `templates/verification.md`, использовать его структуру.
7. Обновить `risk_register` в `meta.yaml`, если обнаружены или сняты риски.
8. Не менять `status` на `released` и не запускать `07-mark-feature-release.md`.

## Выходной результат

- краткий pre-verify hardening report;
- список команд и результатов;
- список pre-verify blockers/follow-ups;
- обновлённый `verification.md` или явное объяснение, почему он не создан;
- рекомендация: `ready for per-task verify` / `not ready for per-task verify`.

## Критерии готовности

Результат принимается только если:

- `meta.yaml` существует, release status проверен и schema expectations соблюдены;
- quality gates выполнены или невозможность запуска явно классифицирована;
- для user-facing/Golden Path feature есть runnable smoke evidence или release-blocking blocker;
- API contract evidence подготовлен для изменённых endpoints;
- results не живут только в чате: есть persistent verification artifact или явный blocker;
- следующий шаг однозначен: запускать `06-verify-task.md` или возвращаться к доработке.
