# SDD Greenfield Prompts

Эта папка содержит интерактивный набор промптов для запуска greenfield-проекта в подходе Spec-Driven Development.

Главная идея: не создавать пустую структуру механически, а последовательно пройти интервью с AI, принять ключевые решения и получить осмысленные проектные артефакты. В результате спецификации становятся основным контрактом для AI-агентов, а код появляется только после прохождения цикла `Specify -> Plan -> Tasks -> Implement -> Verify`.

## Для чего нужна эта папка

`prompts/` — это bootstrap-мастер и операционная инструкция для человека. Пользователь открывает prompt-файлы по порядку, запускает их в выбранном AI-инструменте, отвечает на вопросы, а AI на основе ответов создаёт или обновляет файлы проекта.

Эта папка отличается от `.github/prompts/`:

- `prompts/` — интерактивные промпты для человека и пошагового создания SDD-системы.
- `.github/prompts/` — опциональные операционные промпты для IDE/agent tooling, например GitHub Copilot, Cursor, Claude Code или AWS Kiro.

На старте проекта достаточно `prompts/`. Папку `.github/prompts/` лучше генерировать позже, когда уже есть `constitution.md`, `AGENTS.md` и проектные соглашения.

## Как использовать

Запускайте промпты последовательно. Не переходите к следующему шагу, пока предыдущий не создал ожидаемые файлы и не прошёл quality gate.

Рекомендуемый способ работы:

1. Откройте нужный `.md` файл.
2. Скопируйте его содержимое в AI-инструмент.
3. Ответьте на вопросы AI.
4. Попросите AI создать или обновить указанные файлы.
5. Проверьте результат по секции `Quality gate`.
6. Зафиксируйте изменения в git.

## Bootstrap phase

Эти промпты используются один раз при запуске нового проекта.

### `00-bootstrap/01-create-constitution.md`

Создаёт:

```text
.specify/memory/constitution.md
```

Используется для фиксации базовых правил проекта: стек, архитектурные принципы, code conventions, forbidden patterns, требования к тестированию, security и delivery.

Это главный контракт для AI-агентов. Если правило есть в constitution, агент не должен переобсуждать его при каждой задаче.

### `00-bootstrap/02-create-agents.md`

Создаёт:

```text
AGENTS.md
CLAUDE.md
```

`AGENTS.md` — постоянный контекст для всех AI-агентов. `CLAUDE.md` — краткая инструкция для Claude Code с командами и правилами работы в репозитории.

### `00-bootstrap/03-create-project-overview.md`

Создаёт:

```text
specs/000-project-overview/spec.md
specs/000-project-overview/data-model.md
specs/000-project-overview/architecture.md
```

Эти файлы описывают проект на верхнем уровне: что строим, для кого, какие outcomes важны, какие сущности есть в домене и какие архитектурные границы уже заданы.

### `00-bootstrap/04-create-sdd-structure.md`

Создаёт базовую структуру SDD:

```text
.specify/
specs/
specs/templates/
src/
SPEC_PROCESS.md
README.md
```

Также создаёт шаблоны для feature lifecycle: `spec-template.md`, `plan-template.md`, `tasks-template.md`, `verification-template.md`, `adr-template.md`.

### `00-bootstrap/05-create-operational-prompts.md`

Опционально создаёт:

```text
.github/prompts/
```

Этот шаг нужен только если проект будет использовать IDE/agent prompt library для GitHub Copilot, Cursor, Claude Code, AWS Kiro или других инструментов.

## Feature lifecycle phase

Эти промпты используются для каждой новой фичи или эпика.

### `01-feature-lifecycle/01-create-feature-spec.md`

Создаёт:

```text
specs/NNN-feature-name/spec.md
```

Фиксирует outcomes, in-scope, out-of-scope, constraints, decisions already made, предварительную декомпозицию и verification criteria.

### `01-feature-lifecycle/02-create-api-contract.md`

Создаёт контракты фичи:

```text
specs/NNN-feature-name/contracts/api-spec.yaml
specs/NNN-feature-name/contracts/data-schema.json
specs/NNN-feature-name/contracts/events.yaml
```

Фактический набор файлов зависит от архитектуры проекта. Для REST API обычно создаётся OpenAPI-спецификация.

### `01-feature-lifecycle/03-create-plan.md`

Создаёт:

```text
specs/NNN-feature-name/plan.md
```

Описывает, как именно будет реализована фича: компоненты, data flow, технологические решения, изменения в БД, интеграции, риски и non-functional requirements.

### `01-feature-lifecycle/04-create-tasks.md`

Создаёт:

```text
specs/NNN-feature-name/tasks.md
```

Разбивает фичу на атомарные задачи. Каждая задача должна иметь тип, зависимости, affected files, описание, acceptance criteria и способ проверки.

### `01-feature-lifecycle/05-implement-task.md`

Используется implementation agent для реализации одной конкретной задачи из `tasks.md`.

Правило: один запуск — одна задача. Агент не должен расширять scope и реализовывать соседние задачи.

### `01-feature-lifecycle/06-verify-task.md`

Используется verifier agent после реализации задачи.

Роль verifier agent — искать проблемы: несоответствие spec, out-of-scope изменения, нарушения constitution, security gaps, edge cases и недостаточные тесты.

## Maintenance phase

Эти промпты используются, когда спецификации и правила проекта должны эволюционировать.

### `02-maintenance/01-update-spec-after-incident.md`

Обновляет feature spec после бага, инцидента, пропущенного edge case или неверно понятого требования.

Цель: превратить инцидент в новое ограничение, acceptance criteria или verification criteria.

### `02-maintenance/02-update-constitution.md`

Обновляет `.specify/memory/constitution.md`, когда меняются фундаментальные правила проекта: стек, архитектура, security, delivery или forbidden patterns.

### `02-maintenance/03-refine-tasks.md`

Уточняет `tasks.md`, если задачи оказались слишком крупными, неоднозначными, неверно зависимыми или плохо проверяемыми.

### `02-maintenance/04-run-pre-implementation-checklist.md`

Проверяет готовность фичи к реализации.

Результат должен быть одним из двух:

```text
READY
NOT READY
```

Если результат `NOT READY`, кодинг начинать нельзя. Сначала нужно устранить blockers.

## Целевой процесс

```text
Idea
  -> Constitution
  -> AGENTS.md
  -> Project Overview
  -> Feature Spec
  -> Contracts
  -> Plan
  -> Tasks
  -> Implement one task
  -> Verify
  -> Iterate
```

## Основные правила

- Спецификации пишутся до кода.
- Out-of-scope должен быть явным.
- Контракты должны быть проверяемыми.
- План должен объяснять архитектурные решения до реализации.
- Задачи должны быть атомарными.
- Реализация идёт по одной задаче за раз.
- Верификация выполняется отдельной ролью, которая ищет проблемы.
- Инциденты и баги должны обновлять спецификации, а не только код.

