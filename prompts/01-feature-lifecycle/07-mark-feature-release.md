# Этап 4.3 — Отметка feature как released

## Назначение

Явно отметить, что feature вошла в релиз, чтобы её статус был однозначно виден в `specs/`.

## Когда использовать

Используйте только после завершения реализации и проверки feature, когда человек подтвердил, что feature действительно включена в релиз, и только по явному запросу человека (агент не должен запускать этот prompt автоматически как «следующий шаг по умолчанию»).

## Входные данные

- `specs/NNN-feature-name/meta.yaml`
- `specs/000-project-overview/feature-meta.schema.md`, если он есть
- `specs/NNN-feature-name/verification.md`
- `SPEC_PROCESS.md`, если он есть в репозитории
- результаты verify-этапа
- результаты Runtime Usability Gate / Golden Path smoke для user-facing feature
- acceptance report по задачам или feature в целом
- идентификатор релиза, если он используется в проекте

## Что нужно сделать

1. Прочитать текущий `meta.yaml`.
2. Убедиться, что feature завершена и подтверждена к включению в релиз.
3. Проверить, что результаты verify-этапа не содержат незакрытых gaps по `User-facing`, `Affects Golden Path`, `Expected entry point affected` и `Evidence expected`, если эти поля применимы к задачам feature.
4. Для user-facing feature убедиться, что Runtime Usability Gate пройден: приложение запускается, feature достижима из ожидаемого UI entry point, Golden Path завершается без знания скрытых URL, а необходимые API/backend smoke checks выполнены.
5. Проверить, что acceptance report подтверждает понятный пользовательский сценарий: откуда пользователь входит, какие шаги проходит и какой наблюдаемый результат получает.
6. Если runtime smoke отсутствует, acceptance evidence неполно, expected entry point не подтвержден или имеются release-blocking gaps, остановиться и зафиксировать Blocker вместо установки `released`.
7. Проверить release checklist:
   - per-task verification существует и все релевантные задачи имеют verdict;
   - feature-level verification существует;
   - Runtime Usability Gate / Golden Path smoke существует для user-facing feature;
   - focused API/backend smoke существует для изменённых endpoints, если применимо;
   - `verification.md` существует и содержит commands/evidence/verdict/owner checklist;
   - owner approval явно зафиксирован;
   - release id указан;
   - в `risk_register` нет items с `release_blocking: true`.
8. Обновить поля статуса:
   - `status: released`
   - `included_in_release: true`
   - `release: <release-id>`
9. Если release identifier неизвестен, явно запросить его у человека или использовать согласованный проектный формат.
10. Не ставить `released` автоматически только на основании того, что код написан или verify завершен.
11. Не считать feature готовой к release, если доказательство существует только на уровне кода, hidden URL или частичных technical checks без подтвержденного пользовательского пути.

## Критерии готовности

Результат принимается только если:

- статус в `meta.yaml` обновлён явно
- feature помечена как включённая в релиз
- release identifier заполнен или явно согласован
- статус `released` установлен только после подтверждения человека
- для user-facing feature есть явное свидетельство пройденного Runtime Usability Gate
- `verification.md` существует и подтверждает per-task + feature-level verification
- acceptance report подтверждает рабочий пользовательский сценарий человеческим языком
- нет незакрытых release-blocking gaps по task markers или expected evidence
