# Этап 4.0 — Запуск полного workflow feature

## Назначение

Единый рабочий prompt для агента, который запускает полный lifecycle одной feature как vertical slice по правилам, описанным в `SPEC_PROCESS.md` и lifecycle‑prompts.

## Когда использовать

Когда нужно отработать конкретную feature из `specs/` целиком: реализовать, проверить задачи и assembled slice, подготовить отчёты для owner и остановиться перед release.

## Входные данные
- `specs/000-project-overview/constitution.md`
- `AGENTS.md`
- `SPEC_PROCESS.md`
- `specs/000-project-overview/feature-meta.schema.md`, если есть
- `specs/000-project-overview/templates/verification.md`, если есть
- `specs/NNN-feature-name/spec.md`
- `specs/NNN-feature-name/plan.md`
- `specs/NNN-feature-name/tasks.md`
- `specs/NNN-feature-name/meta.yaml`
- релевантные контракты и правила репозитория

## Рабочий prompt (текст для запуска агента)

Отработай одну feature как vertical slice по моему процессу из SPEC_PROCESS.md.

Контекст:
- feature = specs/NNN-feature-name/ с артефактами spec.md, plan.md, tasks.md, meta.yaml
- tasks.md = техническая декомпозиция реализации feature с markers и expected evidence
- SPEC_PROCESS.md описывает полный lifecycle и инварианты (нет автокоммитов, Golden Path, human approval и ручной release)

Работай строго по шагам:

1) Прочитай:
- constitution.md
- AGENTS.md
- SPEC_PROCESS.md
- specs/NNN-feature-name/spec.md
- specs/NNN-feature-name/plan.md
- specs/NNN-feature-name/tasks.md
- specs/NNN-feature-name/meta.yaml
и приведи своё понимание feature (vertical slice, entry points, Golden Path/main path, scope).

2) Реализуй feature батчем по tasks.md по правилам 05-implement-feature-batch:
- сохраняй границы задач и traceability;
- не расширяй scope и не трогай другие feature;
- не делай никаких git commit / push / history rewrite (только working tree);
- уважай поля User-facing, Affects Golden Path, Expected entry point affected, Evidence expected;
- явно фиксируй Blocker, если Golden Path/main path нельзя честно проверить.

3) Выполни pre-verify hardening gate по 05b-pre-verify-hardening:
- проверь наличие meta.yaml и что feature не released;
- прогони lint/build/unit tests, если toolchain доступен;
- подготовь focused API contract evidence для изменённых endpoints;
- для user-facing feature подготовь runnable browser/e2e smoke;
- проверь, что expected evidence из tasks.md соответствует фактическому evidence;
- создай или обнови specs/NNN-feature-name/verification.md;
- не меняй статус feature на released.

4) Выполни per-task verify по 06-verify-task для всех релевантных задач:
- для каждой задачи сделай verdict (passed / passed with follow-ups / failed), acceptance report и owner-checklist (1–2 предложения «что сделано» + 1–3 вопроса ко мне);
- не меняй статус feature на released и не запускай следующие этапы автоматически.

5) Выполни feature-level verify по 06b-verify-feature:
- агрегируй результаты задач;
- проверь assembled slice как единый сценарий;
- для user-facing feature выполни feature-level Golden Path smoke (UI entry point, сценарий, observable result, natural next step, без hidden URL);
- для non-UI feature проверь согласованный main path (API/integration/background);
- выдай verdict (passed / passed with follow-ups / failed), acceptance report и owner-checklist по feature;
- не запускай release и не меняй статус на released.

6) Остановись и жди моего решения:
- явно НЕ запускать 07-mark-feature-release;
- в выводе сделай понятное резюме: что реализовано, какие есть Blockers/follow-ups, что рекомендовано для release/нерелиза.

## Критерии готовности

Результат принимается только если:

- агент явно опирается на SPEC_PROCESS.md и актуальные feature‑артефакты;
- реализована ровно одна feature в рамках её scope, без скрытого расширения;
- все релевантные задачи прошли per-task verify с отчётами и owner‑checklists;
- pre-verify hardening gate выполнен, а results сохранены в feature verification artifact или явно объяснено, почему это невозможно;
- feature прошла feature-level verify с acceptance report и owner‑checklist;
- статус `released` не меняется и release‑prompt не вызывается автоматически — дальнейшие действия остаются за человеком.
