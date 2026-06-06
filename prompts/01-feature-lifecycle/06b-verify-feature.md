# Этап 4.2b — Проверка feature как vertical slice

## Назначение

Проверить feature целиком как собранный vertical slice после batch-реализации и per-task verification, чтобы убедиться, что отдельные задачи вместе дают работоспособный результат, а не только локально корректные изменения.

## Примечание о путях

Пути вида `specs/NNN-feature-name/...` в этом prompt — это шаблонный placeholder. Перед работой агент должен использовать реальный feature folder, созданный по принятому naming convention.

## Когда использовать

Используйте после завершения `05-implement-feature-batch.md` и после прохождения `06-verify-task.md` по всем релевантным задачам feature, но до запуска `07-mark-feature-release.md`.

## Входные данные

- `specs/NNN-feature-name/spec.md`
- `specs/NNN-feature-name/plan.md`
- `specs/NNN-feature-name/tasks.md`
- `specs/NNN-feature-name/meta.yaml`
- `SPEC_PROCESS.md`, если он есть в репозитории
- `specs/000-project-overview/templates/verification.md`, если он есть
- `specs/NNN-feature-name/verification.md`
- результаты `06-verify-task.md` по всем задачам feature
- релевантные контракты
- изменённые исходные файлы
- runtime / browser / API / integration evidence, если оно ожидалось

## Выходной результат

- решение по feature: `passed`, `passed with follow-ups` или `failed`
- aggregated summary по всем задачам feature
- feature-level verdict о том, работает ли vertical slice как единый сценарий
- список blockers и follow-ups на уровне feature
- краткий acceptance report человеческим языком для owner
- рекомендация: `ready for owner approval` или `not ready for owner approval`

## Что нужно сделать

1. Проверить feature против `spec.md`, `plan.md`, `tasks.md`, контрактов, `meta.yaml`, результатов per-task verification и фактически изменённых файлов.
2. Убедиться, что все задачи feature получили явный verify verdict; если по какой-то задаче verify отсутствует, считать feature verification неполной.
3. Проверить, что task-level результаты не противоречат друг другу и не оставляют незакрытых gaps на стыках задач.
4. Проверить, что реализована именно одна approved feature, а не смесь соседних feature или скрытое расширение scope.
5. Сверить feature-level поведение с Golden Path из `spec.md`, если feature user-facing.
6. Для feature без UI проверить эквивалент main path: API entry, integration trigger, background flow, observable side effect или другой agreed entry path, который определён в spec/plan/contracts.
7. Проверить, что expected entry point или agreed entry path действительно работает end-to-end, а не только на уровне отдельных частей.
8. Проверить, что `Evidence expected` по задачам в сумме даёт достаточное feature-level доказательство; если evidence фрагментарно и не доказывает assembled slice, считать verification неполной.
9. Для user-facing feature выполнить feature-level runnable smoke: открыть ожидаемый entry point, пройти основной сценарий, проверить observable result, natural next step и отсутствие зависимости от hidden/internal URLs.
10. Для non-UI feature выполнить feature-level verification по согласованному main path: вызвать API, инициировать integration flow, проверить side effects, контракты, статусные переходы, логи/ответы и другие observable outcomes, если это предусмотрено артефактами.
11. Если runtime, browser, API или integration verification невозможны из-за toolchain, environment, wiring или другого main-path gap, классифицировать это как Blocker для release, а не как follow-up.
12. Явно различать результат feature verification: `passed`, `passed with follow-ups` или `failed`.
13. Не считать успешную feature verification автоматическим основанием для release.
14. Подготовить owner-friendly acceptance report, чтобы non-technical owner мог понять, работает ли feature как единый vertical slice без чтения кода.
15. Если найдены gaps, явно разделить их на task rework, feature-level follow-up или release Blocker.
16. Передать в следующий шаг только feature, которая действительно готова к owner approval; сам prompt не должен менять статус на `released`.
17. На основе acceptance report сформировать короткий owner-checklist для feature:
    - 2–5 пунктов, описывающих основную пользовательскую историю от entry point до observable result простым языком;
    - 2–4 вопроса к owner, которые помогают принять решение об одобрении feature (например: «Этот путь соответствует ожидаемому Golden Path?», «Допустим ли такой обходной шаг?», «Достаточно ли текущего уровня evidence для release?»).
    Checklist должен быть достаточно коротким, чтобы owner мог принять решение «approve / reject / доработать» за один просмотр.
18. Явно зафиксировать, что данный шаг не меняет статус feature на `released` и не запускает `07-mark-feature-release.md`. Любое дальнейшее действие (release marking, дополнительная реализация, повторный verify) должно выполняться только по явному запросу человека.
19. Обновить `specs/NNN-feature-name/verification.md` feature-level verdict, aggregated evidence, owner-checklist и recommendation.

## Acceptance report format

Используйте короткий формат:

- Feature: [feature id and name]
- Verification basis: [verified tasks / contracts / smoke / API checks / integration checks]
- Entry path checked: [UI entry point / API entry / integration trigger / background path]
- Main steps checked: [2-6 шагов]
- Observable result: [what the user or consuming system gets when the slice succeeds]
- Aggregated evidence: [browser smoke / runtime smoke / API response / integration result / test result]
- Decision: [passed / passed with follow-ups / failed]
- Blockers or follow-ups: [specific list]
- Recommendation: [ready for owner approval / not ready for owner approval]

## Критерии готовности

Результат принимается только если:

- проверка опирается на утверждённые feature artifacts и результаты per-task verify
- по всем релевантным задачам есть явный verify verdict
- assembled slice проверен как единое поведение, а не как сумма локальных проверок
- для user-facing feature подтверждён Golden Path из expected entry point
- для non-UI feature подтверждён agreed main path и observable outcome
- незакрытые gaps на стыках задач не скрыты
- `Evidence expected` не проигнорировано на feature уровне
- результат выражен явно одним из трёх состояний
- есть понятный acceptance report для owner
- путь к следующему действию ясен: owner approval, доработка или Blocker
- feature не помечена как `released` автоматически
- feature-level результат сохранён в `verification.md`
