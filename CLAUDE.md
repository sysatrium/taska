# CLAUDE.md

## Назначение

Краткий tool-facing operating guide для работы в этом repository.

Всегда использовать вместе с `.specify/memory/constitution.md` и `AGENTS.md`.

## Source of truth

Порядок precedence:

1. Явное указание человека в текущей задаче.
2. `.specify/memory/constitution.md`.
3. Принятые bootstrap artifacts и feature-specific specs/plans.
4. `AGENTS.md`.
5. `CLAUDE.md`.
6. Existing codebase conventions без конфликта с более сильными источниками.

## Core operating rules

- Использовать русский как основной output language.
- Не переводить abbreviations и устоявшиеся technical terms, если перевод ухудшает точность.
- Не изобретать product facts.
- При нехватке данных предлагать 2–3 viable варианта и рекомендовать safest manageable default только для low-risk решений.
- Для high-risk ambiguity не угадывать; фиксировать `Open question` или `Blocker`.
- Не переходить к следующему bootstrap step, пока текущий не завершён явно.

## Implementation guardrails

- Stack baseline: React + TypeScript + Vite, NestJS + TypeScript, SQLite.
- Backend first principle для planning logic: scheduling, fit checks, overload detection и conflict evaluation живут на server side.
- Backend остаётся modular monolith на раннем этапе.
- Не вводить microservices.
- Не хранить critical business rules только во frontend code или только в SQL.
- Не считать SQLite окончательным production decision без повторной оценки.
- Не вводить hidden magic defaults.

## Testing and verification

- Каждый non-trivial business rule должен иметь automated test.
- Bug fix для planning logic требует regression test.
- Проверять unit, integration и end-to-end expectations в зависимости от характера change.
- Нельзя считать работу завершённой, если UI меняется, а critical planning behavior не проверен.

## Evidence labels

Использовать только такие labels:

- `Confirmed`
- `Inferred`
- `Provisional default`
- `Open question`
- `Blocker`

Никогда не представлять `Inferred` и `Provisional default` как `Confirmed`.

## Human confirmation required

Обязательно спрашивать подтверждение человека перед изменением:

- mission или product outcomes;
- approved stack direction;
- auth strategy;
- hosting target;
- production database strategy;
- repository-wide policies;
- high-impact product trade-offs.

## Escalation triggers

Эскалировать как `Open question` или `Blocker`, если:

- conflicting instructions;
- недостаточно данных для safe decision;
- риск для correctness, security, data integrity или operational viability;
- change влияет на planning outcomes без подтверждённого rule;
- verification выявила критическую неполноту tests или evidence.

## Post-feature review

После verification всегда явно отвечать:

- требует ли change обновления `AGENTS.md`;
- требует ли change обновления `.specify/memory/constitution.md`;
- требует ли change обновления templates;
- требует ли change обновления repository-wide instructions.

Если update не нужен, это нужно явно написать.


## Версионирование изменений

При изменении constitution.md — добавляй запись:

```
## Changelog
- 2026-05-28 v1.0: Initial version
- [дата] v1.1: [что изменилось и почему]
```