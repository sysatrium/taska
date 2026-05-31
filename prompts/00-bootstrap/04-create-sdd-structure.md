# Этап 0.4 — Создание структуры SDD

## Назначение

Создать структуру репозитория и переиспользуемые шаблоны, которые делают SDD-процесс повторяемым, консистентным и совместимым с governance artifacts, создаваемыми на bootstrap.

## Когда использовать

Используйте после создания constitution и project overview, но до активного feature delivery.

## Входы

- `specs/000-project-overview/constitution.md`
- `AGENTS.md` и `CLAUDE.md`, если уже созданы
- project overview artifacts в `specs/000-project-overview/`
- решение о том, как будут нумероваться и именоваться feature folders

## Выходы

- согласованная структура каталогов
- базовые шаблоны для feature lifecycle artifacts
- repository conventions для новых spec-папок и contract-папок

## Что делать

1. Создайте и/или уточните структуру каталогов так, чтобы bootstrap, discovery, feature lifecycle и maintenance использовали одну и ту же модель путей.
2. Зафиксируйте naming convention для feature folders, например `NNN-short-feature-name`.
3. Зафиксируйте обязательный состав артефактов внутри каждой feature folder: `spec.md`, `plan.md`, `tasks.md`, `verify.md`, а при необходимости `contracts/`.
4. Для шаблонов feature artifacts добавьте обязательные поля Golden Path, expected entry point, runtime smoke evidence и release blockers для user-facing features.
5. Убедитесь, что шаблоны и prompts не ссылаются на несуществующие legacy directories.
6. Убедитесь, что структура не конфликтует с governance files, project overview и examples-derived practices.
7. Если в проекте есть UI, integrations или contracts, предусмотрите для них понятные папки и стабильные conventions.

## Обязательные требования

- все path conventions должны быть актуальны для текущего репозитория
- examples и templates не должны расходиться по структуре
- feature lifecycle должен быть трассируемым от overview к spec, от spec к plan, от plan к tasks, от tasks к verify
- папки `specs/`, `prompts/`, `examples/` и рабочая зона кода должны иметь ясные границы ответственности
- шаблоны не должны провоцировать агентов создавать артефакты в неправильных местах
- шаблоны для user-facing features должны требовать достижимости Golden Path из ожидаемого UI/API entry point

## Quality gate

Принимайте результат только если:

- структура каталогов понятна без устных пояснений
- path conventions едины во всех bootstrap и operational prompts
- шаблоны поддерживают практики из constitution и AGENTS.md
- шаблоны включают Runtime Usability Gate для user-facing features
- новые feature artifacts можно создавать без ручного исправления путей
