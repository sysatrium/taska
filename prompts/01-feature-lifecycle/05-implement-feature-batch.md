# Этап 4.1b — Реализация feature батчем

## Назначение

Реализовать одну утверждённую feature целиком в рамках одного vertical slice из `specs/NNN-feature-name/`, используя `tasks.md` как техническую декомпозицию, но не подменяя завершение feature простым закрытием всех задач.

## Примечание о путях

Пути вида `specs/NNN-feature-name/...` в этом prompt — это шаблонный placeholder. Перед работой агент должен использовать реальный feature folder, созданный по принятому naming convention.

## Когда использовать

Используйте после готовности `spec.md`, `plan.md`, `tasks.md` и прохождения проверки готовности перед реализацией, если для данной feature допустим batch-режим выполнения.

## Входные данные

- `specs/NNN-feature-name/spec.md`
- `specs/NNN-feature-name/plan.md`
- `specs/NNN-feature-name/tasks.md`
- `specs/NNN-feature-name/meta.yaml`
- релевантные контракты и правила репозитория

## Выходной результат

- изменённые исходные файлы в рамках approved feature scope
- статус реализации по каждой задаче из `tasks.md`
- собранное evidence по каждой задаче
- feature-level summary о готовности к verify, но не к `released`

## Что нужно сделать

1. Сначала проверить `meta.yaml` и убедиться, что feature не находится в статусе `released`, если только это не отдельный подтверждённый change request.
2. Прочитать `spec.md`, `plan.md`, `tasks.md`, контракты и repository rules как обязательный source of truth.
3. Реализовать tasks feature батчем, сохраняя их границы, traceability и порядок зависимостей.
4. Не расширять scope feature даже если рядом видны связанные улучшения.
5. Не изменять поведение released feature без отдельного подтверждения человека.
6. Не создавать локальный git commit и не выполнять другие операции изменения истории репозитория без явного указания человека. По умолчанию реализация выполняется только через изменения в working tree.
7. Для каждой задачи сохранять и уважать поля `User-facing`, `Affects Golden Path`, `Expected entry point affected` и `Evidence expected`.
8. Если task markers в `tasks.md` выглядят неверными относительно фактически реализуемого поведения, явно зафиксировать mismatch, а не игнорировать его.
9. Если task decomposition даёт код, но не даёт usable workflow для user-facing feature, не скрывать это: зафиксировать Blocker или необходимость дополнительной navigation/app-shell task.
10. Если отсутствует runnable toolchain, невозможно выполнить runtime smoke или недоказуема достижимость expected entry point для задачи, влияющей на Golden Path, не скрывать это как follow-up: отметить как Blocker для release.
11. После реализации не считать feature автоматически завершённой только потому, что все задачи из `tasks.md` выполнены.
12. Подготовить результат так, чтобы следующий шаг мог выполнить `06-verify-task.md` по каждой задаче, а `07-mark-feature-release.md` запускался только после verify и явного подтверждения человека.

## Формат результата

Для каждой задачи из `tasks.md` указать:

- Task ID
- Status: `done` / `partial` / `blocked`
- Marker check: соответствуют ли фактические изменения полям `User-facing`, `Affects Golden Path`, `Expected entry point affected`
- Files touched
- Evidence prepared
- Follow-ups or Blockers

После списка задач дать feature-level summary:

- Golden Path risk: [none / explained]
- Expected entry point risk: [none / explained]
- Runtime verification readiness: [ready / not ready / blocked]
- Recommendation: `ready for per-task verify` / `ready with blockers`

## Критерии готовности

Результат принимается только если:

- реализована только одна approved feature
- изменения ограничены её scope
- задачи реализованы с сохранением traceability к `tasks.md`
- не появилось молчаливого расширения feature
- локальный git commit не создавался автоматически
- для каждой задачи подготовлен статус и evidence
- для задач с `User-facing: yes` или `Affects Golden Path: yes` не скрыты риски Golden Path, entry point или runtime verification
- результат явно подготавливает следующий шаг `06-verify-task.md`, а не подменяет его
- feature не помечена как `released` и не объявлена готовой к release автоматически
