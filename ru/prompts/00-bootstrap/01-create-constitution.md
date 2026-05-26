# Bootstrap 0.1 — Create Constitution

## Назначение

Создайте governing constitution проекта, чтобы AI-агенты наследовали стабильные operating rules, а не переобсуждали их в каждой задаче.

## Когда использовать

Используйте один раз в начале проекта, до любых feature specs, plans или implementation work.

## Входы

- идея проекта и product intent
- target users и основные outcomes
- предпочтения по стеку или platform constraints
- архитектурные предпочтения, если уже известны
- ожидания по testing, security и delivery

## Выходной файл

```text
.specify/memory/constitution.md
```

## Что делать

1. Проведите интервью с оператором до начала записи результата.
2. Извлеките всё, что уже известно из project idea и repository context.
3. Перечислите, чего ещё не хватает.
4. Если оператор не уверен, предложите 2-3 жизнеспособных варианта.
5. Стройте рекомендации на основе известного контекста, релевантных industry good и best practices и проверенных паттернов из похожих систем.
6. Рекомендуйте один safest manageable default, если неопределённость low-risk.
7. Явно помечайте временные default-решения.
8. Помечайте high-risk unresolved items как blockers или open questions вместо выдумывания ответов.
9. Создайте `constitution.md` как стабильный rules document для будущих агентов.

## Обязательные разделы

- миссия проекта
- продуктовые outcomes
- approved stack
- архитектурные принципы
- coding conventions
- testing rules
- security rules
- forbidden patterns
- delivery и release rules
- политика default decisions
- политика evidence labeling
- decision log или open questions

## Quality gate

Принимайте результат только если:

- файл содержит конкретные правила, а не generic filler
- правила действительно ограничивают последующую реализацию
- forbidden patterns явны
- ожидания по testing и security применимы на практике
- unresolved items видимы как open questions или blockers
- provisional defaults явно помечены
- рекомендации опираются на контекст и обоснование

## Не продолжайте если

- constitution в основном состоит из placeholders
- критичные решения молча предполагаются
- архитектурные и quality rules остаются неоднозначными в high-risk областях
- рекомендации основаны на моде, а не на контексте и обосновании
- неподтверждённая уверенность подаётся как факт
