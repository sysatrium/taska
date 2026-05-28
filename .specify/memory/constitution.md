# Project Constitution

## Статус

Активный bootstrap baseline для этого repository.

Этот документ заменяет placeholder constitution и задаёт стабильные governing rules для будущих AI agents и contributors.

## Миссия

Построить planning system для одного продукта или product line, которая помогает 10–15 командам сформировать единый реалистичный, explainable и capacity-aware план на целевой период.

Система должна уменьшать ручную сборку плана и делать prioritization, team allocation, iteration planning, dependency visibility, overload detection и out-of-scope work явными.

## Product Outcomes

Продукт должен оптимизироваться под следующие outcomes:

1. Product leader видит один ordered backlog и один consolidated plan на весь planning period.
2. Team lead может задать team capacity по competency, оценить work и распланировать work по iteration.
3. Система делает overload, missing estimates, unconfirmed dependencies и displaced work видимыми до начала execution.
4. Система ясно показывает, что помещается в период, что не помещается и почему.
5. Planning decisions должны быть explainable и auditable, а не скрыты в spreadsheets или ad hoc assumptions.

## Approved Stack

### Confirmed decisions

- Frontend: React + TypeScript.
- Frontend build tool: Vite.
- Backend: NestJS + TypeScript.
- Database: SQLite.
- Repository mode: application code и specs могут жить в одном repository.

**Правило:** Никаких новых зависимостей без явного согласования с владельцем проекта.

### Provisional defaults

Эти defaults одобрены для bootstrap и early implementation, если не заменены явным decision:

- API style: REST-first JSON API.
- ORM: Prisma как safest manageable default для beginner-friendly TypeScript stack.
- Validation: shared schema validation на API boundaries; DTO validation обязательна на всех write paths.
- Package manager: npm, если repository уже не стандартизирован на другом manager.
- Testing stack: Vitest для frontend и unit tests, Jest или standard Nest test runner для backend integration tests, Playwright для end-to-end tests.

### SQLite policy

SQLite одобрен как осознанный simplicity-first choice для bootstrap и early MVP work.

Поскольку целевой domain включает 10–15 команд и collaborative planning, SQLite нужно рассматривать как provisional operational choice, а не как доказательство того, что вопрос production database закрыт.

Переход на PostgreSQL или другую server database становится обязательным до production, если выполняется хотя бы одно из условий:

- concurrent multi-user editing становится core workflow,
- требования к auditability или access control выходят за comfortable limits SQLite,
- background jobs, reporting load или размер dataset создают operational pain,
- требования enterprise hosting или compliance требуют server database.

## Architecture Principles

1. Строить separated frontend/backend system с явными API contracts.
2. Держать backend как modular monolith на первом этапе; не вводить microservices во время bootstrap или early MVP.
3. Явно моделировать domain вокруг planning concepts: planning period, backlog item, team, iteration, competency capacity, dependency, allocation, risk, overflow/out-of-plan item и decision rationale.
4. Размещать planning logic на server side, а не в browser. Scheduling, fit checks, overload detection и conflict evaluation — ответственность backend.
5. Делать расчёты deterministic и reproducible. Одно и то же input state должно давать один и тот же planning result.
6. Каждое material planning decision должно быть explainable через сохранённые inputs и rules.
7. Проектировать систему для последующей database migration, сохраняя domain rules, repository interfaces и SQL-specific concerns раздельными.
8. Сначала предпочитать простые synchronous flows; background jobs требуют явного justification.
9. Избегать глубокой integration coupling в MVP; external system integrations должны быть изолированы за adapters.

## Coding Conventions

1. TypeScript strict mode обязателен для frontend и backend.
2. `any` запрещён в application code, если только он не явно justified и не изолирован на boundary.
3. Business rules должны жить в именованных domain services или use-case modules, а не внутри controllers, React components или ORM models.
4. React components по возможности должны оставаться presentational; data fetching и domain mapping относятся к dedicated hooks/services.
5. NestJS controllers должны оставаться thin: validate input, call use case, map response.
6. Shared domain vocabulary должен оставаться консистентным между specs, code, API и UI labels.
7. Предпочитать маленькие composable modules с явными inputs и outputs.
8. Использовать ESLint и formatter automation; не форматировать файлы вручную непоследовательно.
9. Не создавать в code скрытые magic defaults. Defaults, влияющие на planning outcomes, должны быть именованы и задокументированы.
10. Каждое non-trivial rule должно иметь как минимум один automated test.

## Testing Rules

### Minimum test layers

- Unit tests для planning logic, prioritization helpers, capacity calculations, dependency validation и overflow detection.
- Integration tests для backend modules, которые затрагивают database persistence или API boundaries.
- End-to-end tests для critical user journeys: создание planning period, ввод capacity, назначение work, обнаружение overload и определение items, которые не помещаются.

### Required test expectations

1. Planning calculations должны тестироваться на realistic fixtures, а не только на toy examples.
2. Edge cases обязательны: zero capacity, partial estimates, missing competencies, broken dependencies, re-prioritization и overflow scenarios.
3. Bug fixes для planning logic должны включать regression test до того, как fix считается завершённым.
4. Database migrations и schema changes должны быть покрыты хотя бы одним integration test path.
5. Feature не считается завершённой, если работает только UI path, а underlying planning rules не протестированы.

## Security Rules

1. Все write endpoints должны валидировать и authorise input.
2. Role-based access control обязателен до широкого multi-user usage; минимально ожидаемые roles: product leader, team lead и read-only stakeholder.
3. Secrets никогда не должны коммититься в repository; использовать только environment variables и example env files.
4. Planning changes, влияющие на allocations, priorities, capacity или scope, должны быть auditable.
5. Нельзя доверять только client-side validation.
6. Любой user-provided rich text или notes должны быть escaped или sanitized перед rendering.
7. Dependencies и third-party packages должны оставаться минимальными и justified.
8. Authentication provider пока не подтверждён; до принятия решения auth-related implementation должна оставаться adapter-friendly.

## Forbidden Patterns

Следующие patterns явно запрещены:

- Старт с microservices.
- Встраивание core planning logic в React components.
- Хранение critical business rules только в SQL queries или только во frontend code.
- Разрешение silent auto-allocation, которое нельзя объяснить пользователю.
- Отношение к SQLite как к постоянному production decision без повторной оценки.
- Tight coupling с Jira или любым external tool в первом implementation slice.
- Пропуск tests для scheduling, capacity или dependency logic.
- Использование placeholders или mocked logic в constitution-governed production code без явного labeling.
- Сокрытие unresolved architectural risk под формулировкой “best practice”.
- Overengineering под гипотетический scale до того, как доказан core planning workflow.

## Delivery and Release Rules

1. Работа должна идти thin vertical slices, которые дают user-visible planning value.
2. Нельзя начинать implementation следующих bootstrap steps, пока текущий step явно не завершён.
3. Каждый slice должен определять scope, acceptance criteria, test coverage expectations и known risks.
4. Release candidates должны проходить linting, automated tests, релевантные изменённым областям, и manual check затронутого planning workflow.
5. Schema changes требуют review migrations и consideration rollback.
6. Любой release, меняющий planning outcomes, должен документировать, какое rule изменилось и как пользователь может это проверить.
7. Early releases должны предпочитать internal или controlled usage вместо broad rollout.

## Default Decision Policy

1. Когда неопределённость low-risk, выбирать safest manageable default и помечать его как provisional.
2. Когда неопределённость влияет на correctness, security, data integrity или operational viability, нужно остановиться и зафиксировать open question или blocker вместо выдуманной определённости.
3. Предпочитать boring, maintainable technology вместо trendy technology.
4. Предпочитать explicitness вместо implicit behavior.
5. Предпочитать reversible decisions во время bootstrap.
6. User-confirmed decisions имеют приоритет над assistant defaults.

## Evidence Labeling Policy

Использовать явные labels в specs, plans и implementation notes:

- **Confirmed** — прямо сказано оператором или уже зафиксировано в принятых repository artifacts.
- **Inferred** — выведено из confirmed context и domain logic; допустимо только когда риск низкий.
- **Provisional default** — выбран как safest manageable default до явной замены новым decision.
- **Open question** — нерешённый пункт, требующий подтверждения оператора, но пока не блокирующий весь progress.
- **Blocker** — нерешённый пункт, который делает дальнейшую работу unsafe или misleading.

Никогда не представлять inferred или provisional content как confirmed.

## Decision Log

### Confirmed

- Product domain: планирование одного продукта или product line для 10–15 команд.
- Core value: realistic, transparent, explainable planning на целевой период.
- Primary release focus остаётся на value для product leadership, при этом team leads являются essential operational participants.
- Stack direction: separated frontend/backend architecture.
- Frontend: React + TypeScript + Vite.
- Backend: NestJS + TypeScript.
- Database choice для bootstrap baseline: SQLite.

### Provisional defaults

- REST-first API.
- Prisma как ORM.
- Modular monolith backend.
- Controlled early rollout до более широкого adoption.

### Open questions

1. Authentication method: local auth, SSO или corporate identity provider.
2. Hosting target: local/self-hosted, cloud PaaS или internal enterprise platform.
3. Ожидаемый collaboration mode: sequential edits, concurrent edits или approval-based workflow.
4. Требуемая глубина audit: только event log или полная historical plan reconstruction.
5. External integrations, нужные для MVP или later phases.
6. Reporting/export requirements.
7. Является ли SQLite вариантом только для local и pilot environments или ожидается как database для первого shared production deployment.

### Blockers

На текущем этапе blockers для завершения Bootstrap 0.1 нет, но suitability SQLite для production должна быть переоценена до любого серьёзного multi-user rollout.


## Design Tokens

Все визуальные значения хранятся здесь. Агент использует ТОЛЬКО эти переменные — никакого хардкода.

```css
:root {
  /* === ЦВЕТА === */
  --color-bg:          [#0f0f0f];     /* Основной фон */
  --color-surface:     [#1a1a1a];     /* Карточки, панели */
  --color-border:      [#2a2a2a];     /* Границы */

  --color-primary:     [#3B82F6];     /* Акцент, CTA-кнопки */
  --color-primary-hover: [#2563EB];   /* Hover акцента */

  --color-text:        [#FFFFFF];     /* Основной текст */
  --color-text-muted:  [#9CA3AF];     /* Второстепенный текст */
  --color-text-faint:  [#4B5563];     /* Плейсхолдеры, метки */

  --color-success:     [#22C55E];     /* Успех, статус done */
  --color-warning:     [#F59E0B];     /* Предупреждения */
  --color-error:       [#EF4444];     /* Ошибки, деструктивные */

  /* === ТИПОГРАФИКА === */
  --font-body:         ['Inter', sans-serif];
  --font-display:      ['Inter', sans-serif]; /* Замени если нужен display-шрифт */

  --text-xs:    0.75rem;    /* 12px — метки, бейджи */
  --text-sm:    0.875rem;   /* 14px — кнопки, навигация */
  --text-base:  1rem;       /* 16px — основной текст */
  --text-lg:    1.125rem;   /* 18px — подзаголовки */
  --text-xl:    1.5rem;     /* 24px — заголовки секций */
  --text-2xl:   2rem;       /* 32px — заголовок страницы */

  /* === ОТСТУПЫ (4px grid) === */
  --space-1:   0.25rem;   /*  4px */
  --space-2:   0.5rem;    /*  8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px — базовый */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */

  /* === ФОРМА === */
  --radius-sm:   4px;
  --radius-base: 8px;
  --radius-lg:   12px;
  --radius-full: 9999px;

  /* === ТЕНИ === */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.5);

  /* === АНИМАЦИИ === */
  --transition-fast:   150ms ease;
  --transition-base:   200ms ease;
  --transition-slow:   300ms ease;
}
```

**Правило:** Агент использует только переменные выше. Прямые значения (#fff, 16px) — запрещены.

## Ограничения и запреты

### Что агент НЕ делает без явного разрешения:
- ❌ Не добавляет новые зависимости/библиотеки
- ❌ Не изменяет Design Tokens
- ❌ Не создаёт новые модули или файлы вне scope задачи
- ❌ Не рефакторит существующий код без запроса
- ❌ Не удаляет файлы
- ❌ Не изменяет структуру БД без явного описания в spec

### Качество кода:
- ❌ Нет `console.log` в production
- ❌ Нет хардкода (цвета, строки, числа — только через переменные/константы)
- ❌ Нет функций длиннее 20 строк
- ❌ Нет игнорирования ошибок через пустой catch

## Версионирование изменений

При изменении constitution.md — добавляй запись:

```
## Changelog
- 2026-05-28 v1.0: Initial version
- [дата] v1.1: [что изменилось и почему]
```