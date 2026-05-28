# SPEC_PROCESS.md

## Назначение

Этот документ описывает canonical SDD process в repository и связывает структуру каталогов с жизненным циклом feature.

## Source of truth

- Canonical process и structure фиксируются в repository root.
- Все canonical process artifacts поддерживаются напрямую в repository root и в его основных рабочих каталогах.

## Feature numbering and naming

### Схема нумерации

- Каждая feature хранится в каталоге `specs/NNN-feature-slug/`.
- `NNN` — трёхзначный числовой префикс с ведущими нулями: `001`, `002`, `003`.
- `feature-slug` — короткое, стабильное, lowercase-hyphenated имя.
- `000-project-overview/` зарезервирован только для project-level artifacts и не используется для feature delivery.

### Правила именования

- Использовать бизнес-ориентированные имена, а не технические клички.
- Не переименовывать feature directory после того, как на неё ссылаются другие artifacts, кроме случаев явной миграции.
- Один каталог feature соответствует одному управляемому increment of value.

## Standard feature structure

Каждая feature directory должна поддерживать полный lifecycle:

```text
specs/NNN-feature-slug/
  spec.md
  plan.md
  tasks.md
  verify.md
  contracts/
    ... feature-specific contracts ...
```

### Обязательные artifacts

- `spec.md` — что и зачем делаем.
- `plan.md` — как именно будем реализовывать.
- `tasks.md` — атомарные шаги реализации и проверки.
- `verify.md` — результат verification и выводы по качеству.
- `contracts/` — API, schema, UI interaction или integration contracts, когда это применимо.

## Contracts folder policy

- Canonical место контрактов — `specs/NNN-feature-slug/contracts/`.
- Контракты описываются рядом с feature, а не в общей свалке на уровне repository.
- Допустимые типы: API contracts, data schemas, UI state contracts, integration/webhook contracts и аналогичные interface artifacts.
- Если feature не имеет контрактов, в `spec.md` или `plan.md` нужно явно указать, почему contracts folder не требуется.

## Templates

Canonical reusable templates находятся в `specs/templates/`.

Ожидаемый набор:

- `spec-template.md`
- `plan-template.md`
- `tasks-template.md`
- `verify-template.md`
- `adr-template.md`
- `api-spec-template.yaml`
- `data-schema-template.json`


## Code placement

- Application code размещается в `src/`.
- Feature specs не должны смешиваться с runtime code.
- Shared scripts, config и tooling могут жить вне `src/`, если это соответствует назначению файла.
- До появления реальной implementation структуры запрещено заполнять `src/` фиктивным кодом ради видимости прогресса.

## Process documentation placement

- Repository-wide process documentation хранится в root (`README.md`, `SPEC_PROCESS.md`, `AGENTS.md`, `CLAUDE.md`).
- Project constitution хранится в `specs/000-project-overview/constitution.md`.
- Project overview хранится в `specs/000-project-overview/`.
- Onboarding и process documentation хранятся в root-структуре репозитория.

## Lifecycle expectations

Feature work проходит через последовательность:

`Specify -> Contract -> Plan -> Tasks -> Implement -> Verify -> Review shared artifacts`

Обязательные правила:

1. Нельзя начинать implementation без `spec.md`, если только это не repository maintenance без feature scope.
2. `plan.md` не должен противоречить `spec.md` и project-level artifacts.
3. `tasks.md` должен разбивать работу на проверяемые шаги.
4. `verify.md` обязателен для завершения feature.
5. После verification нужно явно решить, требует ли change обновления shared artifacts.

## ADR policy

Использовать ADR, когда решение:

- меняет architecture baseline;
- вводит новое устойчивое ограничение для нескольких feature;
- влияет на contracts, data model или verification rules beyond one feature.

По умолчанию ADR можно хранить:

- либо внутри feature directory, если решение локально для feature;
- либо в отдельной repository-wide ADR зоне после её явного введения.

До явного решения canonical reusable template для ADR находится в `specs/templates/adr-template.md`.

## Minimal readiness check for a new feature

Перед началом новой feature должно быть понятно:

- какой следующий номер feature;
- как называется feature slug;
- какие artifacts обязательны;
- нужны ли contracts;
- нужен ли ADR;
- как будет выполнен verification.
