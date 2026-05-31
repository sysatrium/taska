# Bootstrap 0.5 — Create Operational Prompts

## Назначение

Создайте operational prompts, которые проводят агента через discovery, feature lifecycle и maintenance без потери governance rules, evidence discipline и scope control.

## Когда использовать

Используйте после создания constitution, agent context и project overview.

## Входы

- `specs/000-project-overview/constitution.md`
- `AGENTS.md`
- `SPEC_PROCESS.md`, если уже создан
- project overview artifacts
- agreed repository structure and path conventions

## Выходы

- `SPEC_PROCESS.md` с явным lifecycle gate `Implement -> Verify -> Runtime Smoke -> Release Marking`
- prompts для discovery
- prompts для feature lifecycle
- prompts для maintenance и refinement

## Что делать

1. Определите обязательные стадии workflow и соответствующие prompts, включая `Implement -> Verify -> Runtime Smoke -> Release Marking` для user-facing features.
2. Обеспечьте, чтобы каждый prompt наследовал governing rules из constitution и practical operating rules из `AGENTS.md`.
3. Зафиксируйте evidence labeling, confidence expectations и escalation rules.
4. Вшивайте в prompts проверки на scope discipline, dependency policy, quality gates, Runtime Usability Gate и path consistency.
5. Добавьте обязательный шаг post-implementation / post-verification review: нужно ли обновить constitution, AGENTS, project overview, templates или repository-wide prompts.
6. Обеспечьте, чтобы prompts ссылались только на актуальные артефакты репозитория.

## Operational requirements

- prompts для implementation должны требовать чтения spec, plan и tasks перед изменениями
- prompts для verification должны проверять acceptance criteria, regression risk, scope purity, Golden Path reachability и governance compliance
- prompts не должны молча разрешать broad refactor, dependency additions или speculative design changes
- prompts для UI work должны напоминать про design tokens, accessibility, consistency rules, app shell/navigation wiring и Runtime Usability Gate, если проект включает интерфейс
- prompts для maintenance должны обновлять спецификации и governance artifacts после инцидентов или drift
- prompts должны различать approved facts, inferred context и provisional defaults

## Quality gate

Принимайте результат только если:

- operational prompts образуют непрерывный workflow без пропусков между стадиями, особенно между verify, runtime smoke и release marking
- каждый prompt поддерживает те же governing rules, что и constitution/AGENTS
- path references консистентны и соответствуют реальной структуре репозитория
- prompts помогают агенту принимать одинаковые решения в похожих ситуациях
