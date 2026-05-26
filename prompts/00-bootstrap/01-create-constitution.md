# Создание Project Constitution

## Назначение

Создать `.specify/memory/constitution.md` — основной свод правил проекта.

Этот документ управляет поведением AI-агентов: технологическим стеком, архитектурными ограничениями, соглашениями по коду, запрещёнными практиками, требованиями к тестированию, безопасности и delivery-процессу.

## Когда использовать

Используйте один раз в начале greenfield-проекта, до создания feature specs и до написания кода.

Повторно используйте только тогда, когда меняются фундаментальные правила проекта.

## Необходимые входные данные

- Идея проекта в 2-3 предложениях.
- Целевые пользователи и бизнес-цель.
- Предпочтительный или обязательный технологический стек, если он уже известен.
- Известные ограничения, интеграции, security-требования и delivery-требования.

## Инструкции для AI

Ты помогаешь мне запустить greenfield-проект в подходе Spec-Driven Development.

Не создавай `constitution.md` сразу.

Сначала проведи интервью и собери все обязательные решения, необходимые для качественной project constitution.

Задавай вопросы блоками. Не задавай больше 7 вопросов за один раз. Продолжай интервью, пока не будут покрыты все обязательные области.

Покрой следующие области:

1. Продуктовый контекст:
   - Что мы строим?
   - Для кого?
   - Какую проблему решаем?
   - Какие outcomes важны?

2. Технологический стек:
   - Язык.
   - Framework.
   - База данных.
   - Frontend, если применимо.
   - Инфраструктура и deployment.
   - Инструменты тестирования.
   - Инструменты observability.

3. Архитектурные принципы:
   - Monolith, modular monolith, microservices, serverless или другой стиль.
   - Domain boundaries.
   - DDD, CQRS, event-driven, layered architecture, hexagonal architecture или другие паттерны.
   - Принципы интеграции.

4. Code conventions:
   - Naming.
   - File organization.
   - Error handling.
   - Logging.
   - Configuration.
   - Dependency management.

5. Forbidden patterns:
   - Что AI-агенты никогда не должны делать.
   - Примеры: hardcoded secrets, пропуск тестов, неутверждённые framework, скрытое global state, неподтверждённые зависимости.

6. Quality requirements:
   - Уровни тестирования.
   - Минимальное покрытие.
   - Performance expectations.
   - Reliability expectations.
   - Accessibility, если применимо.

7. Security rules:
   - Authentication и authorization.
   - Secret management.
   - Input validation.
   - Data privacy.
   - Audit logging.

8. Delivery process:
   - Branching.
   - Pull request rules.
   - CI checks.
   - Release process.
   - Definition of Done.

Если мои ответы расплывчатые, задай уточняющие вопросы. Не придумывай важные правила проекта молча.

Когда информации достаточно, сгенерируй полный файл:

```text
.specify/memory/constitution.md
```

## Выходные файлы

```text
.specify/memory/constitution.md
```

## Quality gate

Результат приемлем только если:

- Технологический стек содержит конкретные решения, а не варианты вида "X или Y".
- Forbidden patterns описаны явно.
- Testing и security rules применимы на практике.
- AI-агенты могут использовать документ как стабильный контракт принятия решений.
- Все неизвестные вопросы перечислены как open questions, а не спрятаны в assumptions.

