# Обзор проекта

## Статус

Bootstrap 0.3 baseline.

## Назначение

Зафиксировать систему на уровне проекта до начала feature-specific specs.

## Легенда evidence labels

- **Known** — подтверждено discovery или constitution.
- **Inferred** — логически выведено из подтверждённого контекста.
- **Recommended** — рекомендуемое решение для согласованного проектного baseline.
- **Assumed** — временное допущение, пока не подтверждено человеком.
- **Открытый вопрос** — требует подтверждения, но не блокирует завершение Bootstrap 0.3.
- **Блокер** — не позволяет безопасно продолжать следующий шаг.

## 1. Миссия системы

- **Known**: Система предназначена для планирования одного продукта или product line, где одновременно участвуют 10–15 команд.
- **Known**: Система должна помочь собрать единый ordered backlog на планируемый период, распределить work по командам и iteration, учесть capacity по competency и явно показать, что не помещается в период.
- **Known**: Целевой outcome — реалистичный, explainable и auditable план периода, по которому можно принимать управленческие решения.

## 2. Основные акторы

### Product leader / Head of Product

- **Known**: Основной приоритетный актор первого релиза.
- **Known**: Хочет видеть единый product-level plan на период, понимать распределение work между командами, видеть риски, ограничения и overflow.
- **Known**: Принимает решения по prioritization при конфликтах capacity и dependencies.

### Team lead / Engineering Manager

- **Known**: Обязательный операционный участник первого релиза.
- **Known**: Указывает team capacity по competency, фиксирует estimates, раскладывает work по iteration и делает видимыми ограничения команды.
- **Inferred**: Может предлагать корректировки распределения work, но не является основным owner итогового product-level плана.

### Read-only stakeholder

- **Recommended**: Нужен как actor для просмотра согласованного плана, ограничений и объяснений по принятым trade-offs.
- **Assumed**: В MVP этот actor не меняет planning inputs, а только просматривает snapshots и риски.

## 3. Primary workflows

### Workflow A — Подготовка planning period

- **Known**: Product leader создаёт planning period и собирает candidate backlog на период.
- **Inferred**: В рамках периода задаются общие planning assumptions, порядок приоритетов и рабочие boundaries.

### Workflow B — Сбор planning inputs от команд

- **Known**: Team leads указывают team capacity по competency, estimates и ограничения по iteration.
- **Known**: Система должна выявлять missing estimates и unconfirmed dependencies ещё до финализации плана.

### Workflow C — Формирование и корректировка плана

- **Known**: Система распределяет или помогает распределить work по командам и iteration.
- **Known**: Система должна показывать overload, dependency risks и work, которое не помещается в период.
- **Inferred**: Итеративная replanning-петля является core workflow, а не edge case.

### Workflow D — Review и управленческое решение

- **Known**: Product leader просматривает consolidated plan, узкие места, overflow и причины вытеснения work.
- **Recommended**: Любое заметное изменение planning outcome должно сопровождаться explainable rationale.

## 4. Evidence map

### Known

- Planning system для одного продукта или product line.
- 10–15 команд как рабочий масштаб.
- Core entities бизнеса связаны с backlog, team planning, capacity, dependencies, iteration и overflow.
- Stack baseline: React + TypeScript + Vite, NestJS + TypeScript, SQLite.
- Architecture direction: separated frontend/backend system, backend как modular monolith.

### Inferred

- Система должна хранить не только финальный план, но и explainable причины конфликтов и вытеснения.
- Для принятия решений понадобится role-based access control минимум для product leader, team lead и read-only stakeholder.
- Product-level и team-level views должны использовать один и тот же source of planning truth.

### Recommended

- Канонический baseline артефактов хранить в `specs/000-project-overview/*`.
- Считать planning period главным контейнером business context для backlog, capacity, allocations, dependencies и overflow.

### Assumed

- Первый релиз не требует глубокой integration coupling с Jira или другими external systems.
- Пользовательская ценность первого релиза достигается без сложного ресурсного моделирования сверх capacity по competency.

### Открытые вопросы

- Нужна ли автоматическая auto-allocation как рекомендательный режим или только manual/assisted planning.
- Нужен ли approval workflow между team lead и product leader.
- Какая глубина audit trail требуется в первом shared deployment.

### Блокеры

- На этапе Bootstrap 0.3 блокеров нет.

## 5. System boundaries

### In scope at project level

- **Known**: Единый ordered backlog на planning period.
- **Known**: Planning по командам и iteration.
- **Known**: Учёт capacity по competency.
- **Known**: Выявление overload, missing estimates, unconfirmed dependencies и overflow.
- **Known**: Product-level и team-level views поверх одного planning dataset.
- **Recommended**: Auditability planning changes, влияющих на priorities, allocations, capacity и scope.

### Out of scope at project level

- **Known**: Полноценная general-purpose task management system.
- **Recommended**: Deep execution tracking после старта периода, если он не влияет на planning decisions.
- **Recommended**: Обязательные enterprise integrations в первом implementation slice.
- **Recommended**: Microservices, complex optimization engine и advanced scenario simulation до подтверждения реальной потребности.

## 6. Global constraints

- **Known**: Planning logic должна жить на backend, а не в browser.
- **Known**: Расчёты должны быть deterministic и reproducible.
- **Known**: Critical planning rules нельзя прятать только во frontend code или только в SQL.
- **Known**: SQLite является provisional operational choice и требует последующей переоценки перед серьёзным production rollout.
- **Recommended**: Все project-level артефакты должны явно маркировать uncertain statements через evidence labels.

## 7. Non-goals

- **Known**: Не превращать продукт в generic project management suite.
- **Recommended**: Не оптимизировать под гипотетический enterprise scale до подтверждения core workflow.
- **Recommended**: Не строить opaque planning automation, которую нельзя объяснить пользователю.
- **Recommended**: Не смешивать governance artifacts и feature logic в одном документе.

## 8. Success metrics

- **Recommended**: Пользователь может собрать baseline-план периода без ручной склейки из нескольких разрозненных инструментов.
- **Recommended**: Система явно показывает, что вошло в период, что не вошло и почему.
- **Recommended**: Product leader может увидеть ключевые planning risks и bottlenecks на одном экране.
- **Recommended**: Team lead может объяснить team-level overload или capacity gaps через данные системы.
- **Assumed**: Внутренние pilot users считают planning result более прозрачным и управляемым, чем текущий manual process.

## 9. System-level verification

- **Known**: Проверка системы не может ограничиваться только feature acceptance.
- **Recommended**: На project level нужно проверять консистентность planning results, explainability ключевых решений, видимость overflow и корректность capacity constraints.
- **Recommended**: Критический verification path должен покрывать создание planning period, ввод capacity, assignment work, detection overload и фиксацию items вне периода.

## 10. Открытые вопросы

- **Открытый вопрос**: Какой auth mechanism будет использоваться в shared deployment.
- **Открытый вопрос**: Нужен ли approval-based workflow между team lead и product leader.
- **Открытый вопрос**: Нужна ли интеграция с внешними источниками backlog в MVP или позже.
- **Открытый вопрос**: Требуются ли exports/reporting как часть первого релиза.
- **Открытый вопрос**: Может ли SQLite обслуживать первый shared deployment или он ограничивается local/pilot usage.
