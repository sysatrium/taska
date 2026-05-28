# Обзор data model

## Назначение

Описать system-level domain model до начала feature-specific modelling.

## Легенда evidence labels

- **Known**
- **Inferred**
- **Recommended**
- **Assumed**
- **Открытый вопрос**
- **Блокер**

## 1. Modeling principles

- **Known**: Модель должна следовать approved project boundaries и не выходить за рамки planning system.
- **Known**: Core planning rules должны оставаться explainable и auditable.
- **Known**: Persistence details фиксируются только на high level, без premature schema overdesign.
- **Recommended**: Сущности и relationships должны проектироваться так, чтобы database migration с SQLite на server database была возможна без переписывания domain semantics.

## 2. Evidence map

### Known entities

- PlanningPeriod
- BacklogItem
- Team
- Iteration
- Competency
- TeamCapacity
- Allocation
- Dependency
- Risk
- OverflowItem

### Inferred entities

- PlanningScenario
- DecisionRationale
- AuditEvent
- User

### Provisional entities or relationships

- PlanSnapshot как отдельная сущность или materialized projection.
- ApprovalDecision как отдельная сущность, если подтвердится approval workflow.

### Open questions

- Нужен ли отдельный entity для initiative/epic над уровнем BacklogItem.
- Нужна ли отдельная сущность Scenario, если в MVP достаточно одного активного planning state.

## 3. Core entities

### PlanningPeriod

- **Purpose**: контейнер для planning cycle.
- **Key attributes**: id, name, status, planning horizon, prioritization policy, createdBy, timestamps.
- **Constraints**: в один момент времени должен существовать явный active или selected period для работы пользователя.
- **Lifecycle notes**: draft -> in_review -> approved -> archived.

### BacklogItem

- **Purpose**: единица планируемой работы.
- **Key attributes**: id, title, description, priority rank, estimate, required competencies, owning team candidate, status.
- **Constraints**: item не должен считаться готовым к планированию без достаточных planning inputs.
- **Lifecycle notes**: captured -> estimated -> planned -> overflowed или deferred.

### Team

- **Purpose**: организационная единица планирования.
- **Key attributes**: id, name, status, lead reference.
- **Constraints**: team участвует в planning только при наличии capacity context.
- **Lifecycle notes**: active -> inactive.

### Iteration

- **Purpose**: timebox внутри PlanningPeriod.
- **Key attributes**: id, planningPeriodId, name, sequence, date range.
- **Constraints**: iteration должны быть упорядочены и принадлежать одному PlanningPeriod.
- **Lifecycle notes**: planned -> active -> closed.

### Competency

- **Purpose**: тип навыка или capability, через который оценивается capacity.
- **Key attributes**: id, code, name, description.
- **Constraints**: competency catalog должен быть консистентным внутри PlanningPeriod.

### TeamCapacity

- **Purpose**: capacity команды по competency и iteration.
- **Key attributes**: teamId, iterationId, competencyId, availableUnits, source, confidence.
- **Constraints**: capacity не может быть отрицательным.
- **Lifecycle notes**: drafted -> confirmed.

### Allocation

- **Purpose**: связь между BacklogItem, Team и Iteration.
- **Key attributes**: backlogItemId, teamId, iterationId, allocatedUnits, allocationStatus.
- **Constraints**: allocation не должна нарушать capacity invariants без явной маркировки overload.
- **Lifecycle notes**: proposed -> confirmed -> changed -> removed.

### Dependency

- **Purpose**: зафиксировать зависимость между BacklogItem или командами.
- **Key attributes**: sourceItemId, targetItemId, dependencyType, confirmationStatus.
- **Constraints**: unconfirmed dependency должна быть видима как planning risk.

### Risk

- **Purpose**: представить planning risk, влияющий на достоверность плана.
- **Key attributes**: type, severity, description, relatedEntityRefs, status.
- **Constraints**: risk должен иметь явный source.

### OverflowItem

- **Purpose**: зафиксировать work, не помещённый в period.
- **Key attributes**: backlogItemId, overflowReason, detectedAt, explanation.
- **Constraints**: item не должен одновременно быть fully allocated и overflowed.

## 4. Relationships

- PlanningPeriod 1:N Iteration.
- PlanningPeriod 1:N BacklogItem.
- Team 1:N TeamCapacity.
- Team 1:N Allocation.
- Iteration 1:N TeamCapacity.
- Iteration 1:N Allocation.
- Competency 1:N TeamCapacity.
- BacklogItem 1:N Allocation.
- BacklogItem 0:N Dependency как source и 0:N Dependency как target.
- BacklogItem 0:N Risk.
- BacklogItem 0:1 OverflowItem для активного planning state.
- **Inferred**: PlanningPeriod 1:N Risk и 1:N DecisionRationale.

## 5. Value objects and enums

### Value objects

- CapacityUnits: значение и unit измерения capacity.
- PriorityRank: позиция item в ordered backlog.
- DateRange: границы PlanningPeriod или Iteration.
- CompetencyDemand: competency + required units для BacklogItem.

### Enums

- PlanningPeriodStatus: draft, in_review, approved, archived.
- AllocationStatus: proposed, confirmed, changed, removed.
- DependencyStatus: unconfirmed, confirmed, blocked.
- RiskSeverity: low, medium, high, critical.
- OverflowReason: no_capacity, missing_estimate, unresolved_dependency, priority_cutoff, policy_conflict.

## 6. State transitions

- PlanningPeriod: draft -> in_review -> approved -> archived.
- BacklogItem: captured -> estimated -> planned -> overflowed/deferred.
- TeamCapacity: drafted -> confirmed.
- Allocation: proposed -> confirmed -> changed/removed.
- Dependency: unconfirmed -> confirmed или blocked.
- Risk: open -> mitigated -> accepted/closed.

## 7. Invariants and business rules

- **Known**: Planning result должен быть explainable через сохранённые inputs и rules.
- **Known**: Один и тот же input state должен приводить к одному и тому же planning result.
- **Known**: Missing estimates и unconfirmed dependencies должны быть видимы до финализации плана.
- **Known**: Overload не должен скрываться; он должен быть явно представлен как состояние или risk.
- **Recommended**: Каждая confirmed allocation должна ссылаться на конкретный PlanningPeriod, Team и Iteration.
- **Recommended**: OverflowItem должен иметь machine-readable reason и human-readable explanation.

## 8. Storage implications

- **Known**: Database baseline — SQLite.
- **Known**: Domain model нельзя связывать с SQLite-specific ограничениями как с постоянной business truth.
- **Recommended**: Использовать нормализованные tables для core entities и relationships.
- **Recommended**: Derived views или projections допустимы для read-heavy screens, но source of truth остаётся в core planning entities.

## 9. Sensitive data and compliance notes

- **Known**: В модели пока не предполагаются специальные категории персональных данных.
- **Inferred**: User identities, team assignments, comments и audit history могут считаться internal sensitive operational data.
- **Recommended**: Любые notes или rich text fields должны проходить sanitization перед rendering.
- **Открытый вопрос**: Требуется ли дополнительная enterprise retention policy для audit data.

## 10. Decisions requiring confirmation

- **Открытый вопрос**: Нужен ли отдельный entity Scenario.
- **Открытый вопрос**: Нужна ли отдельная сущность approval workflow.
- **Открытый вопрос**: Нужен ли hierarchy level над BacklogItem.
- **Открытый вопрос**: Нужно ли хранить immutable PlanSnapshot как first-class entity.
- **Блокер**: Нет.
