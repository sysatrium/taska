# Bootstrap 0.1 — Create Constitution

## Назначение

Создайте governing constitution проекта, чтобы AI-агенты наследовали стабильные operating rules, repository conventions и quality boundaries, а не переобсуждали их в каждой задаче.

## Когда использовать

Используйте один раз в начале проекта, до любых feature specs, plans или implementation work.

## Входы

- идея проекта и product intent
- target users и основные outcomes
- предпочтения по стеку или platform constraints
- архитектурные предпочтения, если уже известны
- ожидания по testing, security, delivery и UX quality
- принципы из bootstrap examples, если они релевантны проекту

## Выходной файл

```text
specs/000-project-overview/constitution.md
```

## Что делать

1. Проведите интервью с оператором до начала записи результата.
2. Извлеките всё, что уже известно из project idea, repository context и approved bootstrap artifacts.
3. Перечислите, чего ещё не хватает.
4. Если оператор не уверен, предложите 2-3 жизнеспособных варианта.
5. Стройте рекомендации на основе известного контекста, релевантных industry good и best practices и проверенных паттернов из похожих систем.
6. Рекомендуйте один safest manageable default, если неопределённость low-risk.
7. Явно помечайте временные default-решения.
8. Помечайте high-risk unresolved items как blockers или open questions вместо выдумывания ответов.
9. Создайте `constitution.md` как стабильный rules document для будущих агентов.
10. Делайте constitution не абстрактной, а operational: агент должен по ней понимать, что можно делать, что нельзя, и по каким критериям работа считается качественной.

## Обязательные разделы

- миссия проекта
- продуктовые outcomes
- approved stack и policy по новым зависимостям
- design tokens или policy, где они определяются и как используются
- архитектурные принципы и границы слоев
- coding conventions и naming rules
- testing rules
- accessibility expectations, если проект включает UI
- security rules
- forbidden patterns
- scope control и change minimization policy
- delivery и release rules
- политика default decisions
- политика evidence labeling
- project-wide out-of-scope
- decision log или open questions
- changelog для обновлений constitution

## Требования к содержанию

- Зафиксируйте правило: никаких новых зависимостей без явного согласования с владельцем проекта.
- Зафиксируйте принцип наименьшего изменения: менять только необходимое для текущего scope.
- Если проект включает UI, потребуйте token-first styling и запрет на визуальный хардкод без явного исключения.
- Если проект включает код, зафиксируйте минимальные code quality rules: без пустых `catch`, без hidden side effects, без production debugging артефактов.
- Если проект модульный, зафиксируйте separation of concerns между UI, business logic и integrations/data access.
- Явно перечислите, что агент не делает без разрешения: удаление файлов, schema-breaking changes, broad refactor, silent dependency adoption.
- Если есть предположительные решения, отделите approved decisions от provisional defaults.

## Quality gate

Принимайте результат только если:

- файл содержит конкретные правила, а не generic filler
- правила действительно ограничивают последующую реализацию
- forbidden patterns явны
- ожидания по testing, security и accessibility применимы на практике
- есть operational guidance для code quality, scope control и dependency policy
- unresolved items видимы как open questions или blockers
- provisional defaults явно помечены
- рекомендации опираются на контекст и обоснование

## Не продолжайте если

- constitution в основном состоит из placeholders
- критичные решения молча предполагаются
- архитектурные и quality rules остаются неоднозначными в high-risk областях
- рекомендации основаны на моде, а не на контексте и обосновании
- неподтверждённая уверенность подаётся как факт
