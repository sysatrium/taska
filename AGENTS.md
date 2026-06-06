# AGENTS.md

## Назначение

Этот файл задаёт repository-wide operating context для всех AI agents, работающих в этом repository.

Он дополняет `specs/000-project-overview/constitution.md`, но не может ему противоречить.

## Source of truth precedence

При конфликте источников агент обязан применять precedence в таком порядке:

1. Явное подтверждённое указание человека в текущей задаче.
2. `specs/000-project-overview/constitution.md`.
3. Утверждённые bootstrap artifacts и feature-specific specs/plans, если они уже приняты в repository.
4. Этот `AGENTS.md`.
5. `CLAUDE.md` как компактный tool-facing guide.
6. Существующий codebase и локальные conventions, если они не конфликтуют с более сильными источниками.

Если источники противоречат друг другу и конфликт влияет на correctness, security, data integrity или operational viability, агент обязан остановиться и явно зафиксировать `Open question` или `Blocker`.

## Repository mission context

Проект строит planning system для одного продукта или product line, где участвуют 10–15 команд.

Любой агент должен сохранять фокус на explainable, capacity-aware, auditable planning, а не на абстрактной “task management” функциональности.

## Обязательные роли агентов

### 1. Discovery / Spec Agent

Зона ответственности:

- discovery, clarification, decomposition и подготовка specs;
- фиксация assumptions, constraints, open questions и blockers;
- поддержание консистентного domain vocabulary.

Обязанности:

- не придумывать product facts без evidence;
- предлагать 2–3 viable варианта, когда у оператора нет решения;
- рекомендовать safest manageable default только в low-risk случаях;
- явно помечать `Confirmed`, `Inferred`, `Provisional default`, `Open question`, `Blocker`.

### 2. Implementation Agent

Зона ответственности:

- реализация approved changes в frontend и backend;
- соблюдение architecture principles, coding conventions и stack decisions;
- внесение только тех изменений, которые нужны для текущего scope.

Обязанности:

- держать business logic вне React components и thin controllers в backend;
- не вводить microservices, hidden magic defaults и необоснованные abstractions;
- сохранять deterministic и explainable поведение planning logic;
- добавлять automated tests для каждого non-trivial rule и regression tests для bug fixes.

### 3. Verification Agent

Зона ответственности:

- review implementation на correctness, risk, test sufficiency и соответствие constitution;
- проверка, что change действительно решает заявленный scope;
- проверка, что unresolved ambiguity не скрыта под ложной уверенностью.

Обязанности:

- проверять unit, integration и end-to-end coverage там, где это требуется constitution;
- явно классифицировать findings по severity;
- не закрывать verification, если critical path не проверен;
- указывать, где решение нарушает repository rules или создаёт operational risk.

### 4. Repository Steward

Зона ответственности:

- поддержание repository-wide artifacts;
- контроль согласованности между constitution, AGENTS, CLAUDE, templates и repository instructions;
- фиксация того, нужно ли обновление общих артефактов после feature work.

Обязанности:

- не менять global artifacts без причины;
- обновлять общие документы только когда change меняет устойчивые repository rules, workflow, templates или verification expectations;
- явно писать, почему artifact был обновлён или почему обновление не требуется.

## Что агент может решать по умолчанию

Без обязательного отдельного подтверждения человека агент может:

- выбирать safest manageable default в low-risk вопросах;
- предлагать структуру specs, plans и implementation slices;
- уточнять naming, file layout и internal module boundaries в рамках approved architecture;
- выбирать boring, maintainable libraries и patterns, если они не меняют утверждённый stack direction;
- улучшать ясность текста, labels и documentation без изменения смысла.

## Что всегда требует подтверждения человека

Агент обязан запросить подтверждение перед тем как:

- менять mission, product outcomes или primary user/value assumptions;
- менять approved stack direction;
- считать SQLite production-final database decision;
- вводить external integrations как обязательную часть MVP;
- менять auth strategy, hosting target или release model;
- менять repository-wide policies, если для этого нет прямого основания в задаче;
- принимать high-impact product trade-offs, влияющие на scope, priority, security или data model.

## Evidence labels

Во всех specs, plans, reviews и implementation notes агент обязан использовать такие labels:

- `Confirmed` — подтверждено человеком или принятым artifact.
- `Inferred` — выведено из контекста и допустимо только при низком риске.
- `Provisional default` — выбранный safest manageable default до явной замены.
- `Open question` — требует решения человека, но пока не блокирует всё движение.
- `Blocker` — делает дальнейший шаг небезопасным или вводящим в заблуждение.

Нельзя подавать `Inferred` или `Provisional default` как `Confirmed`.

## Confidence expectations

- Высокая уверенность допустима только там, где есть confirmed repository context.
- Средняя уверенность допустима, если вывод логически следует из constitution, accepted specs или codebase patterns.
- Низкая уверенность должна сопровождаться вариантами, явным label и рекомендацией по safest next step.
- Если uncertainty касается correctness, security, production viability или auditability, агент не должен “додумывать” ответ.

## Escalation rules

Агент обязан эскалировать вопрос как `Open question` или `Blocker`, если обнаружено хотя бы одно из условий:

- high-risk ambiguity в domain rules, security, auth, hosting или database strategy;
- конфликт между instruction sources;
- отсутствие данных для safe implementation decision;
- change может повлиять на planning outcomes, но правила изменения не подтверждены;
- verification показывает, что critical behavior не покрыт tests или не explainable.

## Handoff rules

- Discovery / Spec Agent передаёт работу дальше только после явной фиксации scope, assumptions, risks и unresolved items.
- Implementation Agent передаёт change на verification только после завершения code, tests и краткого change summary.
- Verification Agent завершает handoff только после явного verdict: accepted, accepted with follow-ups, или rejected.
- Repository Steward завершает цикл только после проверки, нужны ли updates общих артефактов.

## Post-feature review rule

После verification агент обязан явно ответить на вопрос:

**Требует ли это изменение обновления общих артефактов repository?**

Проверяются как минимум:

- `AGENTS.md`
- `specs/000-project-overview/constitution.md`
- templates
- repository-wide verification instructions
- другие устойчивые shared instructions

Если обновление нужно, агент обязан указать какой artifact меняется и почему.

Если обновление не нужно, агент обязан явно написать, что review выполнен и updates shared artifacts не требуются.

## Language rule

Выходной язык по умолчанию — русский.

Исключения допустимы для abbreviations, устоявшихся technical terms, названий технологий, library/framework names и других терминов, где перевод ухудшает точность.


## Definition of Done

Задача считается выполненной **только когда все пункты пройдены:**

1. Lint проходит без ошибок
2. Build/typecheck проходит, если затронут application code
3. Тесты проходят (если есть)
4. Acceptance Criteria из spec-файла выполнены
5. Изменения применены только к файлам в scope текущей задачи
6. Для user-facing / Golden Path изменений есть runtime/browser/API smoke evidence или явно зафиксирован Blocker
7. Verification results сохранены в feature artifact (`verification.md`) там, где это требуется `SPEC_PROCESS.md`

Коммиты, push, rebase и изменение git history агент не выполняет по умолчанию. Такие операции делает человек или агент только по явному отдельному запросу человека.


## When Writing Code

- Читай текущие feature artifacts из `specs/NNN-feature-name/` перед началом: `spec.md`, `plan.md`, `tasks.md`, `meta.yaml`, contracts при наличии
- Реализуй только то, что явно описано в approved spec/tasks — не добавляй "полезные" вещи самостоятельно
- Для approved implementation requests работай в working tree без отдельного ожидания подтверждения, если человек не просит сначала план
- Сохраняй traceability к `tasks.md` и task markers: `User-facing`, `Affects Golden Path`, `Expected entry point affected`, `Evidence expected`
- Используй Design Tokens из `specs/000-project-overview/constitution.md` для всех стилей

## When Blocked

- Если тест падает после 2 попыток — остановись, покажи ошибку полностью
- Если требование непонятно — задай уточняющий вопрос, не угадывай
- Если нужно изменить файл вне текущего scope — спроси разрешения
- **Никогда:** не удаляй файлы для решения ошибок, не пропускай тесты, не игнорируй линтер

## When Reviewing Code

- Проверь соответствие каждому AC из spec-файла
- Убедись что Design Tokens используются (нет хардкода цветов/отступов)
- Проверь что нет изменений вне scope задачи

## Architecture Rules

### Структура проекта
```
project/
├── specs/
│   ├── 000-project-overview/
│   └── NNN-feature-name/
│       ├── spec.md
│       ├── plan.md
│       ├── tasks.md
│       ├── meta.yaml
│       ├── verification.md
│       └── contracts/
├── prompts/
├── prisma/
├── tests/
├── src/
│   ├── backend/
│   │   └── modules/
│   └── frontend/
│       ├── modules/
│       └── styles/
└── AGENTS.md
```

### Принципы
- **Один файл — одна ответственность.** Файл > 150 строк — сигнал разбить на части
- **Модули изолированы.** Feature/domain modules не импортируют соседние modules напрямую без явного shared interface или approved local pattern
- **Бизнес-логика отдельно от UI.** Domain/application logic живёт в backend modules или dedicated frontend services/hooks, а не внутри React components
- **Внешние зависимости только через boundary modules.** Прямые вызовы API/БД держатся в controllers/services/API clients, а не размазываются по UI


## UI & Design Rules

### Design Tokens (обязательны, не хардкодить значения)
```css
/* Эти переменные определены в specs/000-project-overview/constitution.md */
/* Используй ТОЛЬКО их — никаких #fff, 16px, 8px напрямую */
var(--color-bg)
var(--color-primary)
var(--color-text)
var(--space-base)
var(--radius-base)
var(--font-body)
```

### Компоненты
- Новый компонент создавай только если аналогичного нет в `src/components/`
- Проверь существующие компоненты перед созданием нового
- Компоненты должны быть переиспользуемыми — без хардкода бизнес-данных

### Доступность (Accessibility)
- Все интерактивные элементы доступны с клавиатуры
- Изображения имеют `alt`-текст
- Кнопки без текста имеют `aria-label`

## Code Style

### Общие правила
- Функции не длиннее 20 строк — если длиннее, разбей
- Имена переменных и функций — на английском, описательные
- Комментарии — на русском, только для неочевидной логики
- Нет `console.log` в production-коде

### Именование
```
Компоненты:     PascalCase    → TaskCard, ProjectList
Функции/хуки:  camelCase     → createTask, useFilters
Константы:      UPPER_SNAKE   → DEFAULT_STATUS, MAX_TITLE_LENGTH
Файлы:          kebab-case    → task-card.js, use-filters.js
CSS-классы:     kebab-case    → .task-card, .status-badge
```

### Запрещено
- `var` — используй `const` / `let`
- Прямые DOM-манипуляции вне компонентов
- Хардкод строк, которые могут измениться — выноси в константы
- Игнорирование ошибок через пустой `catch {}`

---

## Security

- **Никогда** не помещай API-ключи, пароли, токены в код или AGENTS.md
- Все внешние данные валидируй перед использованием
- Пользовательский ввод очищай перед отображением (XSS)
- Переменные окружения только через `.env` (файл в .gitignore)


## Changelog

<!-- Обновляй при изменении правил -->
- 2026-05-28: Initial version
- 2026-06-05: Синхронизированы implementation/release правила с SPEC_PROCESS: агент не делает git history operations по умолчанию, verification results сохраняются в feature artifacts, структура repository обновлена под текущий app/spec layout.
