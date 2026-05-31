# AGENTS.md

## Назначение

Этот файл определяет общие правила работы AI-агентов и участников репозитория.

Он переводит конституцию проекта и process-правила в практические инструкции для specification, implementation, verification и release marking.

## Приоритет source of truth

При конфликте источников используйте следующий порядок приоритета:

1. Прямая инструкция человека в текущей задаче.
2. `specs/000-project-overview/constitution.md`.
3. Актуальные артефакты feature: `spec.md`, `plan.md`, `tasks.md`, `verify.md`, `meta.yaml`.
4. Репозиторные prompts в `prompts/`.
5. Существующий код и локальные соглашения.

Если источники противоречат друг другу, нельзя молча выбирать удобную интерпретацию. Нужно остановиться и вынести конфликт на решение человека.

## Команды проекта

Если в проекте есть runnable toolchain, он должен быть явно задокументирован в этом файле.

Пока команды не подтверждены, нельзя делать вид, что проект runtime-verified.

- Install: TBD
- Dev server: TBD
- Lint: TBD
- Test: TBD
- Build: TBD

Для user-facing feature отсутствие подтверждённых install/dev/test/build команд считается release Blocker, если из-за этого нельзя выполнить runtime smoke. Такой gap нельзя маскировать как обычный follow-up.

## Definition of Done

Задача или feature считается done только если выполнены все применимые условия:

- Она соответствует утверждённым `spec.md`, `plan.md` и `tasks.md`.
- Scope не был молча расширен за пределы утверждённого набора артефактов.
- Релевантные automated checks были выполнены, если они доступны, либо явно задокументирована причина, почему их нельзя было выполнить.
- User-facing scope проходит Runtime Usability Gate.
- Follow-ups явно отделены от release blockers.
- Learnings, влияющие на governance или process, отражены в общих артефактах либо явно отмечены как не требующие обновления.

## Runtime Usability Gate

Для каждой user-facing feature verification должна включать runnable Golden Path check.

Feature не может получить статус `released`, если не выполнены все условия:

- Приложение можно запустить локально или в согласованной целевой среде.
- Основной пользователь может дойти до feature из ожидаемого UI entry point.
- Пользователь может пройти основной сценарий без знания скрытых или внутренних URL.
- Empty, loading и error states не блокируют основной сценарий молча.
- API/backend поведение, от которого зависит UI, прошло smoke-проверку через реальный runtime path.

Если у проекта нет runnable toolchain или целевая среда не может быть поднята, отсутствие runtime verification считается Blocker для release, а не follow-up.

## Дисциплина Golden Path

Перед реализацией user-facing feature нужно сформулировать основной Golden Path простым человеческим языком:

1. Откуда пользователь входит в продукт.
2. Что он нажимает, заполняет или отправляет.
3. Как выглядит успешное завершение сценария.
4. Куда пользователь естественно попадает дальше: обратно в список, в detail page, в dashboard или в следующий ожидаемый шаг.

Если task decomposition даёт набор экранов, роутов или API, но не даёт usable workflow, агент обязан оспорить такую декомпозицию и предложить navigation/app-shell task до того, как работа будет признана done.

## Git и rollback safety

- Нельзя создавать локальные git commits, amend, rebase, reset, checkout, revert, stash или иным образом переписывать историю репозитория без прямой и явной инструкции человека на это конкретное git-действие.
- `05-implement-task` и другие lifecycle-prompts не должны по умолчанию создавать автоматические checkpoint commits.
- Режим реализации по умолчанию — только working tree: изменяются нужные файлы в рамках approved task без создания commit.
- Если нужна rollback safety, агент должен предложить варианты и попросить человека выбрать, например: локальный commit, patch file или опора на текущее состояние VCS.
- Если человек явно просит commit, нужно создать ровно один чётко ограниченный commit для утверждённого изменения и не выполнять лишние history-операции.
- Автоматические локальные commits никогда не считаются обязательной частью task completion или release readiness.

## Когда агент пишет код

- Сначала прочитать релевантные артефакты feature.
- Реализовывать только одну approved task за раз, если человек не запросил batch-режим для всей feature.
- Предпочитать минимальные локальные изменения широким рефакторам.
- Не добавлять новые зависимости без явного одобрения человека.
- Не считать hidden URL достаточной интеграцией UI для user-facing scope.
- Для UI-изменений обязательно wiring reachable actions: CTA, navigation, routes, list/detail/edit links и post-submit return paths, если это требуется задачей.

## Когда агент заблокирован

Проблема должна классифицироваться как Blocker, если она мешает корректной verification, eligibility for release, security, data integrity или основному пользовательскому сценарию.

Нельзя понижать blocker до follow-up только для того, чтобы формально продвинуть задачу дальше.

Примеры blocker:

- Нет runnable toolchain для user-facing feature, которой нужен runtime smoke.
- Feature существует только на hidden route и недостижима из ожидаемого entry point.
- Обязательное backend/API поведение не может быть реально использовано из UI.
- Acceptance criteria невозможно проверить по доступным артефактам.

## Когда агент ревьюит код

Review должен проверять:

- Acceptance criteria и traceability к `spec.md` / `tasks.md`.
- Границы scope и отсутствие широких нерелевантных изменений.
- Runtime reachability для user-facing feature.
- Empty / loading / error state поведение на основном пути.
- Соответствие ожидаемому entry point.
- Наличие честного evidence, а не только code-level аргументации.
- Отсутствие скрытых release blockers, замаскированных как follow-ups.

## Release discipline

Статус `released` нельзя ставить только потому, что код написан или локальные проверки зелёные.

Feature может быть помечена как released только если:

- Verify завершён по согласованному process.
- Для user-facing feature пройден Runtime Usability Gate.
- Есть acceptance evidence человеческим языком, а не только technical proof.
- Нет незакрытых release-blocking gaps.
- Человек явно подтвердил, что feature действительно можно включать в релиз.

## Поведение по умолчанию

По умолчанию агент должен действовать консервативно:

- не расширять scope;
- не делать git history actions;
- не скрывать blockers;
- не подменять runtime verification рассуждениями по коду;
- не ставить `released` без явного human approval.

Если есть сомнение, нужно остановиться и запросить решение человека.
