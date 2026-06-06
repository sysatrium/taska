# Этап 4.2 — Проверка задачи

## Назначение

Провести adversarial-проверку одной реализованной задачи, целенаправленно ища несоответствия, пропуски и риски.

## Примечание о путях

Пути вида `specs/NNN-feature-name/...` в этом prompt — это шаблонный placeholder. Перед работой агент должен использовать реальный feature folder, созданный по принятому naming convention.

## Когда использовать

Используйте после реализации одной задачи и до перехода к следующей задаче или к release marking.

## Входные данные

- `specs/NNN-feature-name/spec.md`
- `specs/NNN-feature-name/plan.md`
- `specs/NNN-feature-name/tasks.md`
- `specs/NNN-feature-name/meta.yaml`
- `SPEC_PROCESS.md`, если он есть в репозитории
- `specs/000-project-overview/templates/verification.md`, если он есть
- `specs/NNN-feature-name/verification.md`, если он уже создан
- реализованная задача
- изменённые исходные файлы
- релевантные контракты

## Выходной результат

- решение по задаче: `passed`, `passed with follow-ups` или `failed`
- список найденных несоответствий, рисков и follow-up пунктов
- проверка соответствия task markers: `User-facing`, `Affects Golden Path`, `Expected entry point affected`, `Evidence expected`
- для задач с `User-facing: yes` или `Affects Golden Path: yes`: результат runtime smoke / browser smoke или явный Blocker, если smoke невозможен
- краткий acceptance report человеческим языком: entry point, user steps, observable result, blockers/follow-ups

## Что нужно сделать

1. Проверить реализацию против `spec.md`, `plan.md`, `tasks.md`, контрактов и фактически изменённых файлов.
2. Целенаправленно искать несоответствия, пропуски, регрессии и скрытое расширение scope.
3. Проверить, действительно ли реализована именно выбранная задача, а не набор соседних изменений.
4. Проверить, правильно ли в `tasks.md` проставлены `User-facing`, `Affects Golden Path`, `Expected entry point affected` и соответствует ли им фактически реализованное поведение.
5. Сверить фактическую проверку с полем `Evidence expected`; если evidence не предоставлено или не соответствует задаче, считать проверку неполной.
6. Явно различать результат проверки: `passed`, `passed with follow-ups` или `failed`.
7. Для задач с `User-facing: yes` или `Affects Golden Path: yes` выполнить runnable Golden Path check: запустить приложение/API в согласованной среде, открыть ожидаемый entry point, пройти основной сценарий и проверить, что пользователь не должен знать скрытые URL.
8. Если `Expected entry point affected: yes`, отдельно проверить, что фича достижима из ожидаемого UI entry point, а не только по прямому/internal URL.
9. Если runtime smoke невозможен из-за отсутствия toolchain, окружения, route wiring или других препятствий main path, классифицировать это как Blocker для release, а не как follow-up.
10. Если задача технически завершена, можно рекомендовать перевод feature или задачи в состояние `done`, но не в `released`.
11. Не считать успешную проверку автоматическим основанием для release.
12. Если найдены gaps, вернуть их либо в доработку задачи, либо в отдельный follow-up на уровне feature; release-blocking gaps маркировать как Blocker.
13. Направлять установку статуса `released` только через отдельный шаг `07-mark-feature-release`.
14. Сформировать короткий acceptance report человеческим языком, чтобы non-technical owner мог понять, работает ли пользовательский сценарий без чтения кода.
15. Для каждой задачи сформировать короткий owner-checklist для non-technical owner:
   - 1–2 предложения, что именно было реализовано в терминах пользователя/сценариев, а не кода.
   - 1–3 вопроса к owner по задаче (например: «Соответствует ли такой путь ожиданиям?», «Нормально ли, что сценарий доступен только из этого раздела?»).
   Checklist должен быть понятен без чтения кода и без знания внутренней архитектуры.
16. Обновить `specs/NNN-feature-name/verification.md` результатом проверки задачи. Если artifact отсутствует, создать его по `templates/verification.md` при наличии template.

## Acceptance report format

Используйте короткий формат:

- Task: [task id and name]
- Markers: [User-facing / Affects Golden Path / Expected entry point affected]
- Entry point checked: [where the user starts]
- User steps checked: [2-5 шагов]
- Observable result: [what the user sees when the scenario succeeds]
- Evidence observed: [runtime smoke / browser smoke / API response / test result]
- Decision: [passed / passed with follow-ups / failed]
- Blockers or follow-ups: [specific list]

## Критерии готовности

Результат принимается только если:

- проверка опирается на утверждённые артефакты, а не на догадки
- результат проверки выражен явно одним из трёх состояний
- найденные проблемы и риски перечислены конкретно
- успешная проверка не перепутана с фактом релиза
- для задач с `User-facing: yes` или `Affects Golden Path: yes` зафиксирован результат Golden Path/runtime smoke или Blocker
- task markers проверены против фактически реализованного поведения
- поле `Evidence expected` не проигнорировано
- путь к следующему действию ясен: принять, доработать или вынести follow-up
- non-technical owner может понять результат по acceptance report без чтения кода
- результат сохранён в `verification.md` или явно указан blocker, почему persistent artifact не может быть обновлён
