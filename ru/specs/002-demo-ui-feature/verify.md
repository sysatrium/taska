# Verification Outcome — Inline UI-редактор статуса задачи

## Context

Этот файл показывает ожидания verifier для UI-heavy feature pack, который зависит от существующего backend contract.

## Используемые evidence labels

- Known
- Inferred
- Recommended
- Assumed
- Open Question
- Blocked

## Findings

1. **Known** — У пакета сильная traceability от UI objective к plan, tasks и interaction contracts.
2. **Recommended** — Interaction contract должен явно выбрать между optimistic и pessimistic submit до начала реализации.
3. **Open Question** — Захват причины для blocked status остаётся неразрешённым и не должен импровизироваться внутри component.
4. **Assumed** — Предполагается, что backend error semantics достаточно стабильна для маппинга в inline UI states.
5. **Recommended** — Нужно добавить явное правило focus return после success и cancel для снижения a11y ambiguity.
6. **Blocked** — Если backend contract не различает validation и stale-item failures, UI error model недостаточно определена для чистой реализации.

## Риски

- Утечка per-row state может вызвать неверный visual feedback в списке.
- Недоопределённое timing закрытия после success может создать разнородное ощущение взаимодействия.
- Отсутствие различения backend errors может схлопнуть разные failure types в расплывчатые inline errors.

## Решение safe-to-proceed

Можно продолжать для demo implementation, если команда подтвердит submit strategy и focus-return behavior, а backend errors можно будет маппить на UI state model без hidden assumptions.

## Требует явного решения

- policy optimistic vs pessimistic submit
- pattern взаимодействия для blocked-reason
- target возврата focus после submit, cancel и error
