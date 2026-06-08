# Архитектурные решения: Taska — Workspace, Auth & Roles

## Контекст

**Дата сессии:** 6 июня 2026  
**Статус:** Decision log — принятые продуктовые и архитектурные решения

---

## 1. Бизнес-контекст: multi-tenancy

Taska используется как компаниями, так и трайбами. У каждого трайба/компании — своя изолированная область с собственным набором команд, planning periods и пользователей. Это означает необходимость полноценной multi-tenant архитектуры.

**Решение:** Ввести сущность **Workspace** как tenant-контейнер. Не «Компания» — термин намеренно нейтральный, покрывает и компанию, и трайб, и любой другой организационный контекст.

---

## 2. Модель данных: Workspace и пользователи

**Решение:** `User` существует глобально. Членство и роль привязаны к конкретному Workspace через junction table.

```
User ──< WorkspaceMember >── Workspace
              │
           role: admin | head-of-product | team-lead | member
```

Один User может иметь разные роли в разных Workspace (например, `head-of-product` в Workspace A и `member` в Workspace B).

**Owner может создавать несколько Workspace.** При создании Workspace создатель автоматически получает роль `admin`.

### Изменения в существующей схеме

| Таблица | Изменение |
|---|---|
| `Team` | Добавить `workspaceId` |
| `PlanningPeriod` | Заменить/дополнить `productId` → `workspaceId` |
| Новая: `User` | `id`, `clerkId`, `email`, `name`, `createdAt` |
| Новая: `Workspace` | `id`, `clerkOrgId`, `name`, `slug`, `createdAt` |
| Новая: `WorkspaceMember` | `userId`, `workspaceId`, `role`, `joinedAt` |

---

## 3. Аутентификация: Clerk

**Решение:** Использовать **Clerk** как провайдер аутентификации.

**Обоснование выбора Clerk над Auth0:**
- Встроенная концепция `Organization` = Workspace из коробки
- React-first: готовые компоненты `<SignIn />`, `useUser()`, `useOrganization()`
- NestJS guard через Clerk Node SDK
- Дешевле при росте, лучший DX для стартап-стадии
- Invite flow, magic links, SSO — все из коробки

**Стратегия синхронизации данных:** Вариант B — синхронизация через Clerk webhooks.

Clerk шлёт webhook при событиях → бэкенд создаёт локальные записи в SQLite:

| Clerk Event | Действие в Taska |
|---|---|
| `user.created` | Создать `User { clerkId, email }` |
| `organization.created` | Создать `Workspace { clerkOrgId, name, slug }` |
| `organizationMembership.created` | Создать `WorkspaceMember { userId, workspaceId, role }` |

Локальная копия в БД снижает зависимость от доступности Clerk и сохраняет целостность planning-данных.

---

## 3.1 Архитектурное ограничение: Clerk не проникает в домен

**Правило:** Clerk-специфичный код живёт **только в auth-адаптере**. Бизнес-логика работает через абстракцию `AuthProvider` и никогда не импортирует Clerk напрямую.

**Мотивация:** Если auth-провайдер изолирован в адаптере, замена Clerk на Keycloak, Auth0 или корпоративный IdP (Active Directory, SAML) — это задача на 1–2 недели без рефакторинга бизнес-логики. Нарушение этого правила превращает замену в переписывание продукта.

### Правильно ✅

```typescript
// auth/auth.provider.ts — единственное место где живёт Clerk
export interface AuthProvider {
  verifyToken(token: string): Promise<AuthUser>
  getUserById(id: string): Promise<AuthUser>
}

export class ClerkAuthProvider implements AuthProvider {
  async verifyToken(token: string): Promise<AuthUser> {
    // здесь и только здесь — Clerk SDK
    const payload = await clerkClient.verifyToken(token)
    return { id: payload.sub, email: payload.email }
  }
}

// planning/planning.service.ts — бизнес-логика не знает про Clerk
export class PlanningService {
  constructor(private auth: AuthProvider) {} // абстракция, не Clerk

  async getPeriods(userId: string): Promise<Period[]> {
    // userId — это наш внутренний ID, не clerkId
  }
}
```

### Неправильно ❌

```typescript
// НАРУШЕНИЕ — Clerk просочился в домен
import { clerkClient } from '@clerk/clerk-sdk-node'

export class PlanningService {
  async getPeriods(clerkUserId: string) { // ❌ clerkUserId в домене
    const user = await clerkClient.users.getUser(clerkUserId) // ❌ прямой вызов Clerk
  }
}
```

### Правило для ID

Во всей бизнес-логике и БД используется **внутренний `userId`** (наш UUID из таблицы `User`). `clerkId` хранится только в таблице `User` как поле для синхронизации — и нигде больше не используется как ключ.

```
User { id (UUID, internal), clerkId (string, only for sync), email, name }
                ↑
        это ходит по всему домену, не clerkId
```

### Checklist при code review

- [ ] Нет `import ... from '@clerk/...'` вне папки `auth/`
- [ ] Нет `clerkId` в аргументах методов сервисов и контроллеров (кроме `AuthService`)
- [ ] Нет прямых вызовов `clerkClient` вне адаптера
- [ ] Все guards инжектируют `AuthProvider`, не Clerk напрямую

---

## 4. Роли и права

Четыре роли в рамках Workspace (Clerk Organization roles):

| Роль | Clerk permission key | Кто | MVP права | Будущее |
|---|---|---|---|---|
| **Admin** | `org:admin` | Создатель Workspace | Управление членами, настройки Workspace | Billing, audit log |
| **Head of Product** | `org:head-of-product` | Руководитель продукта | Создаёт periods, управляет backlog, видит всё | Approval flows |
| **Team Lead** | `org:team-lead` | Лидер команды | Управляет командой, вводит capacity, приглашает участников | Делегирование |
| **Member** | `org:member` | Участник команды | Read-only: видит свою команду и задачи | Подтверждение capacity, оценки |

**Кто приглашает участников:**
- Admin приглашает Head of Product и Team Lead
- **Team Lead приглашает своих Team Members** самостоятельно (Clerk permission `org:invitations:create` на роли `org:team-lead`)

---

## 5. Team Member: запись vs пользователь

**Решение:** Team Member в MVP — это **запись в БД без обязательного логина** («ghost member»).

```
TeamMember {
  id
  teamId
  name              // "Иван Петров"
  competencies      // ["Backend", "DevOps"]
  clerkUserId       // NULL до принятия приглашения
  inviteEmail       // опционально
}
```

Team Lead вводит capacity **за своих участников** без требования их логина. Когда Team Lead решает пригласить участника — тот принимает invite, логинится, и `clerkUserId` заполняется. Ранее введённый capacity не меняется.

---

## 6. Модель capacity: per person

**Решение:** Capacity вводится **per person**, не агрегированно по команде.

```
Команда "Backend Alpha" — Sprint Q3
  Иван Петров     — Backend: 22 дня, DevOps: 3 дня
  Мария Сидорова  — Backend: 20 дней
```

**Обоснование:** Детальная картина позволяет объяснять capacity (отпуска, частичная занятость), даёт естественный апгрейд к invite flow, соответствует discovery-требованию видеть «почему capacity именно такой».

---

## 7. Пересмотренный roadmap фич

| # | Фича | Зависит от | Приоритет |
|---|---|---|---|
| **006** | Workspace Foundation (Clerk + data model) | 004 ✅ 005 ✅ | 🔴 Сначала — foundation |
| **007** | Auth flow (login, session, защита роутов) | 006 | 🔴 Сразу после |
| **008** | Invite & Roles (Team Lead приглашает Members) | 007 | 🟡 До capacity |
| **009** | Team Capacity per Period (per person) | 006, 007 | 🟡 |
| **010** | Planning Items Backlog | 006, 007 | 🟡 |
| **011** | Capacity Fit View | 009, 010 | 🟢 MVP-завершение |

---

## 8. Открытые вопросы (зафиксированы, не решены)

- **Тариф и billing**: когда вводить, через Clerk Billing или отдельно?
- **SSO**: нужен ли в первом production-релизе или это enterprise-tier?
- **Admin = Head of Product**: в MVP Admin автоматически получает права HoP или это отдельное назначение?
- **Несколько Workspace у одного User**: нужен ли UI выбора активного Workspace (как в Slack) или переключение через URL/slug?

---

*Документ отражает решения, принятые в ходе архитектурной сессии 06.06.2026. Все решения требуют фиксации в `specs/000-project-overview/constitution.md` перед началом реализации feature 006.*
