# SPEC_PROCESS

## AI Spec Driven Development (vertical slice)

Этот раздел описывает, как мы ведём фичи как vertical slice в `specs/` при участии AI‑агентов, сохраняя контроль у человеческого owner.

### Что такое feature в specs/

Feature рассматривается как один vertical slice в каталоге `specs/NNN-feature-name/`.

Для каждой feature используются артефакты:

- `spec.md` — формулировка vertical slice, цели, контекст, Golden Path (для user‑facing).
- `plan.md` — план реализации на уровне шагов/подсистем.
- `tasks.md` — техническая декомпозиция на задачи. Для каждой задачи задаются:
  - `User-facing`
  - `Affects Golden Path`
  - `Expected entry point affected`
  - `Evidence expected`
- `meta.yaml` — статус feature, связь с релизом и другие метаданные.
- `verification.md` — persistent artifact с pre-verify, per-task verify, feature-level verify, owner checklist и release decision.

Repository-wide metadata и verification форматы описываются в:

- `specs/000-project-overview/feature-meta.schema.md`
- `specs/000-project-overview/templates/verification.md`

Feature считается определённой, когда spec/plan/tasks согласованы и описывают один связный сценарий.

### Этап: Design the slice

На этапе дизайна feature формируется как vertical slice:

- Предложение фичи и вертикального среза.
- Подготовка `spec.md` с описанием сценариев и Golden Path.
- Подготовка `plan.md` с основными шагами и зонами изменений.
- Подготовка `tasks.md` по шаблону с обязательными markers и expected evidence.
- Подготовка `meta.yaml` по `feature-meta.schema.md`.

На этом этапе фиксируются:

- Основные сценарии и entry points (UI / API / integration / background).
- Что именно считается достаточным evidence, чтобы признать сценарий реально работоспособным.
- Какой artifact будет хранить verification evidence (`verification.md` по template by default).

### Этап: Build the slice (реализация)

Основной режим реализации — batch‑режим по всей feature на основе `tasks.md`.

Ключевые правила:

- Агент читает `spec.md`, `plan.md`, `tasks.md`, `meta.yaml` и правила репозитория.
- Реализует задачи батчем, но:
  - сохраняет границы задач и traceability к `tasks.md`;
  - не расширяет scope feature;
  - не затрагивает другие feature и не меняет уже released поведение без явного решения.
- Не выполняет git commit и не меняет историю репозитория:
  - все изменения вносятся только в working tree;
  - любые git‑операции делает человек.
- Уважает поля `User-facing`, `Affects Golden Path`, `Expected entry point affected`, `Evidence expected`.
- Если Golden Path / main path невозможно честно проверить по техническим причинам (toolchain, wiring и т.п.), это фиксируется как Blocker для release, а не как безобидный follow‑up.

Результат этого этапа — реализованная feature в working tree + статусы и evidence по задачам, но не release.

### Этап: Pre-verify hardening

Перед adversarial verification feature проходит короткий readiness gate.

Назначение gate — поймать очевидные gaps до verify:

- отсутствующий или некорректный `meta.yaml`;
- неработающие lint/build/unit checks;
- отсутствие API contract evidence для новых или изменённых endpoints;
- отсутствие runnable browser/e2e smoke для user-facing или Golden Path feature;
- расхождение между `Evidence expected` в `tasks.md` и фактически подготовленным evidence;
- отсутствие persistent verification artifact.

Ожидаемый результат:

- quality gates выполнены или невозможность запуска явно классифицирована;
- API/UI smoke evidence подготовлен;
- `specs/NNN-feature-name/verification.md` создан или обновлён;
- `risk_register` в `meta.yaml` обновлён, если появились или были сняты риски;
- feature получает рекомендацию `ready for per-task verify` или `not ready for per-task verify`.

Этот этап не имеет права менять статус feature на `released` и не заменяет `06-verify-task.md` / `06b-verify-feature.md`.

### Этап: Verify each task

Каждая задача проверяется отдельно в adversarial‑режиме.

Основные моменты:

- Проверка идёт против `spec.md`, `plan.md`, `tasks.md`, контрактов и фактических изменений.
- Проверяются task markers и согласованность `Evidence expected` с фактическим evidence.
- Для задач с `User-facing: yes` или `Affects Golden Path: yes` требуется runnable Golden Path check:
  - запуск приложения/API в согласованной среде;
  - вход через ожидаемый entry point;
  - прохождение основного сценария;
  - отсутствие требований знать скрытые URL.
- Если `Expected entry point affected: yes`, дополнительно проверяется достижимость фичи из ожидаемого UI entry point, а не только по прямым/internal URL.
- Если runtime/browser/API‑smoke невозможен, это считается Blocker для release.
- По каждой задаче формируются:
  - verdict: `passed` / `passed with follow-ups` / `failed`;
  - короткий acceptance report человеческим языком;
  - owner‑checklist:
    - 1–2 предложения «что сделано» в терминах сценария;
    - 1–3 вопроса к owner, помогающие принять решение.
- Results должны быть сохранены в `specs/NNN-feature-name/verification.md` или другом явно названном persistent artifact, а не только в чате.

Этот этап не имеет права менять статус `released` и не запускает автоматически следующие этапы — переход выполняется только по решению человека.

### Этап: Verify the assembled slice

После per‑task verify feature проверяется как собранный vertical slice.

Ключевые шаги:

- Агрегируются результаты по всем задачам, ищутся gaps на стыках.
- Проверяется, что реализована ровно одна approved feature, без скрытого расширения scope.
- Для user‑facing feature:
  - сверка поведения с Golden Path из `spec.md`;
  - feature‑level runnable smoke:
    - вход через ожидаемый UI entry point;
    - прохождение основного пользовательского сценария;
    - проверка observable result и natural next step;
    - отсутствие зависимости от hidden/internal URL.
- Для non‑UI feature:
  - проверка согласованного main path (API entry, integration trigger, background flow, observable side effects и т.п.).
- Если feature‑level runtime/API/integration проверка невозможна, это классифицируется как release Blocker.
- Объединяется evidence по задачам, оценивается, достаточно ли его для assembled slice.
- Feature-level verdict, acceptance report, owner-checklist и результаты команд сохраняются в `specs/NNN-feature-name/verification.md` или другом явно названном persistent artifact.

Выход:

- verdict по feature: `passed`, `passed with follow-ups` или `failed`;
- feature‑level acceptance report;
- owner‑checklist для feature:
  - 2–5 пунктов, описывающих путь от entry point до результата;
  - 2–4 вопроса к owner по Golden Path, обходным шагам и достаточности evidence;
- рекомендация: `ready for owner approval` или `not ready for owner approval`.

Этот этап также не меняет статус `released` и не вызывает release‑prompt. Любое продолжение — только по решению owner.

### Этап: Human approval

После feature‑verify non‑technical owner получает:

- task‑уровневые отчёты и checklists;
- feature‑level acceptance report и owner‑checklist.

На этой основе принимается решение:

- одобрить feature для релиза;
- вернуть на доработку отдельные задачи/части;
- не включать feature в ближайший релиз.

Факт решения фиксируется в удобном артефакте:

- комментарий в issue/PR;
- запись в `meta.yaml`;
- отдельный acceptance log и т.п.

### Этап: Mark released

Release‑этап используется только вручную, никогда не вызывается агентом автоматически.

Условия запуска:

- реализация и все verify‑этапы завершены;
- нет незакрытых release‑blocking gaps по task markers и expected evidence;
- есть feature‑level acceptance report и owner‑checklist;
- owner явно подтвердил включение feature в релиз;
- release‑prompt запущен по явному запросу человека.

Проверяется:

- статус и содержимое `meta.yaml`;
- результаты verify‑этапов и Runtime Usability Gate для user‑facing feature;
- соответствие acceptance report ожидаемому пользовательскому сценарию.

Только после этого:

- в `meta.yaml` ставится `status: released`;
- `included_in_release: true`;
- заполняется `release: <release-id>` (или другой согласованный идентификатор).

Без явного решения owner и явного запуска этого этапа feature не считается released, даже если код реализован и все проверки пройдены.

### Инварианты

- AI‑агент никогда сам не делает git commit и не меняет историю — только рабочие файлы.
- Ни один verify‑этап не переводит feature в `released` и не вызывает release‑этап автоматически.
- Для user‑facing feature release невозможен без Golden Path runtime/browser smoke и достижимости из основного UI.
- Любой blocker, мешающий реальному runtime‑проверочному запуску, считается release‑blocking, а не скрывается как follow‑up.
- Verification results должны быть воспроизводимо зафиксированы в feature artifact, чтобы owner/release decision не зависели только от истории чата.
