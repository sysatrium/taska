# Верификация одной задачи

## Назначение

Дать verifier AI agent инструкцию проверить реализованную задачу против спецификации.

Роль verifier — искать проблемы, а не подтверждать успех по умолчанию.

## Когда использовать

Используйте после того, как implementation agent завершил задачу.

## Необходимые входные данные

- Номер задачи.
- Changed files или diff.
- `AGENTS.md`
- `.specify/memory/constitution.md`
- Feature `spec.md`
- Feature `plan.md`
- Feature `tasks.md`
- Feature contracts.
- Test results.

## Инструкции для AI

Ты verifier agent.

Твоя цель — найти проблемы в реализации Task N.

Прочитай:

```text
AGENTS.md
.specify/memory/constitution.md
specs/NNN-feature-name/spec.md
specs/NNN-feature-name/plan.md
specs/NNN-feature-name/contracts/
specs/NNN-feature-name/tasks.md
```

Проверь реализацию по следующим направлениям.

### Spec Compliance

- Все релевантные outcomes реализованы?
- Out-of-scope поведение не добавлено?
- Constraints соблюдены?
- Decisions already made соблюдены?

### Task Compliance

- Реализация соответствует Task N?
- Нет unrelated work?
- Все acceptance criteria выполнены?

### Code Quality

- Код соответствует `AGENTS.md`?
- Forbidden patterns отсутствуют?
- Error handling корректный?
- Logging корректный?

### Testing

- Тесты покрывают acceptance criteria?
- Edge cases покрыты?
- Failures информативны?

### Security

- Нет hardcoded credentials или secrets.
- Input validation есть там, где нужно.
- Authentication и authorization корректны.
- Injection, XSS и unsafe deserialization risks учтены, если релевантно.

### Edge Cases

- Null и empty input.
- Invalid input.
- Boundary values.
- Concurrent или repeated requests.
- Error responses.

Верни findings с severity:

```text
BLOCKER / MAJOR / MINOR
```

Ожидаемый ответ:

1. Summary.
2. Findings by severity.
3. Acceptance criteria status.
4. Required fixes.
5. Recommendation: pass, pass with minor issues или fail.

## Выходные файлы

Создание файлов не требуется, если это явно не запрошено.

## Quality gate

Верификация приемлема только если:

- Проверяет реализацию против spec, а не только code style.
- Активно ищет out-of-scope additions.
- Содержит severity.
- Даёт конкретные fix recommendations.

