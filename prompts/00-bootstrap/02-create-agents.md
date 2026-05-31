# Bootstrap 0.2 — Create Agent Operating Context

## Назначение

Создайте стабильные context files, чтобы implementation- и verification-агенты работали из одного набора repository rules и применяли одинаковые практики качества, scope control и review discipline.

## Когда использовать

Используйте после создания constitution и до старта feature work.

## Входы

- `specs/000-project-overview/constitution.md`
- repository workflow и artifact rules
- уже утверждённые bootstrap decisions
- актуальная структура `specs/`, `prompts/` и `src/`

## Выходные файлы

```text
AGENTS.md
CLAUDE.md
```

## Что делать

1. Создайте `AGENTS.md` как постоянный repository-wide context для всех AI-агентов.
2. Создайте `CLAUDE.md` как компактный tool-facing operating guide.
3. Зафиксируйте source-of-truth precedence.
4. Опишите, что агент может рекомендовать по умолчанию, а что всегда требует подтверждения человека.
5. Зафиксируйте evidence labels и ожидания по confidence.
6. Зафиксируйте, как агент должен эскалировать blockers и high-risk ambiguity.
7. Добавьте обязательное правило Runtime Usability Gate: после UI/user-facing задачи агент обязан проверить Golden Path в браузере/API или зафиксировать Blocker, если runtime smoke невозможен.
8. Добавьте правило, что агент обязан спорить с task decomposition, если задачи дают код, но не дают reachable usable workflow из основного UI.
9. Добавьте обязательное правило post-feature review: после verification агент должен явно решить, требует ли реализованное изменение обновления общих артефактов, таких как `AGENTS.md`, `specs/000-project-overview/constitution.md`, шаблоны или repository-wide verification instructions. Если обновление не нужно, агент должен явно это указать.
10. Перенесите в operational form лучшие практики из repository examples, но нормализуйте их под текущую структуру репозитория, не копируя сломанные или устаревшие пути.

## AGENTS.md должен обязательно включать

- краткий project overview: name, purpose, stack
- ссылки на актуальные source-of-truth artifacts в текущей структуре репозитория
- project commands: install, dev, lint, test, build
- Definition of Done
- Runtime Usability Gate и Golden Path rules для user-facing features
- правила `When Writing Code`
- правила `When Blocked`
- правила `When Reviewing Code`
- architecture rules и project structure expectations
- UI/design rules, если проект включает интерфейс
- accessibility rules, если проект включает интерфейс
- code style и naming rules
- security expectations
- changelog discipline для самого `AGENTS.md`

## Специальные требования

- Требуйте явного запрета на broad changes вне scope задачи.
- Требуйте, чтобы агент сначала читал релевантные spec/plan/tasks артефакты перед implementation.
- Требуйте, чтобы агент показывал план до кода, если это соответствует режиму работы проекта.
- Требуйте, чтобы review проверял соответствие acceptance criteria, scope boundaries, Golden Path reachability и governing rules.
- Требуйте, чтобы отсутствие runnable toolchain считалось Blocker для release user-facing feature, а не follow-up.
- Не допускайте ссылок на несуществующие файлы или legacy structure.

## Quality gate

Принимайте результат только если:

- `AGENTS.md` и `CLAUDE.md` согласованы с constitution
- у агента есть practical operating instructions, а не только общие принципы
- Definition of Done применим к реальным задачам
- Runtime Usability Gate защищает пользователя от формально выполненных, но недостижимых UI-фич
- правила для blockers, review и post-feature governance update явно сформулированы
- все ссылки и references соответствуют текущей структуре репозитория
