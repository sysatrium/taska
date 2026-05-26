# SDD Greenfield Prompts

This folder contains the interactive prompt set for launching a greenfield project with Spec-Driven Development.

The core idea is simple: do not create an empty structure mechanically. Instead, walk through structured interviews with AI, make explicit project decisions, and generate meaningful operating artifacts. Specifications become the primary contract for AI agents, and code appears only after the cycle `Specify -> Plan -> Tasks -> Implement -> Verify` is complete.

## Why this folder exists

`prompts/` is the **human-facing orchestration layer** of the repository.

A person opens the files in order, runs them in an AI tool, answers the AI's questions, and asks the AI to create or update the project artifacts named in the prompt.

This folder is different from `.github/prompts/`:

- `prompts/` contains interactive prompts for humans and step-by-step SDD setup.
- `.github/prompts/` contains shorter system prompts for IDE and agent tooling.

At the start of a project, `prompts/` is enough. Generate `.github/prompts/` later, after `constitution.md`, `AGENTS.md`, and core rules exist.

## How to use it

Run prompts sequentially. Do not move to the next step until the previous step produced the expected files and passed its quality gate.

Recommended workflow:

1. Open the target `.md` file.
2. Paste its contents into your AI tool.
3. Answer the AI's questions.
4. Ask the AI to create or update the listed files.
5. Review the result against the `Quality gate` section.
6. Commit the change in git.

## Phase map

### Bootstrap phase

Use these prompts once when starting a new project.

#### `00-bootstrap/01-create-constitution.md`

Creates:

```text
.specify/memory/constitution.md
```

Defines the project's governing rules: stack, architecture principles, code conventions, forbidden patterns, testing rules, security rules, and delivery rules.

This is the main contract for AI agents. If a rule exists in the constitution, the agent should not renegotiate it task by task.

#### `00-bootstrap/02-create-agents.md`

Creates:

```text
AGENTS.md
CLAUDE.md
```

`AGENTS.md` is the persistent context for all AI agents. `CLAUDE.md` is a shorter tool-specific guide for Claude Code.

#### `00-bootstrap/03-create-project-overview.md`

Creates:

```text
specs/000-project-overview/spec.md
specs/000-project-overview/data-model.md
specs/000-project-overview/architecture.md
```

These files describe the system at the top level: what is being built, for whom, which outcomes matter, which domain entities exist, and which architecture boundaries already exist.

#### `00-bootstrap/04-create-sdd-structure.md`

Creates the structural SDD foundation:

```text
.specify/
specs/
specs/templates/
src/
SPEC_PROCESS.md
README.md
```

It should also establish reusable templates and folder conventions for the feature lifecycle.

#### `00-bootstrap/05-create-operational-prompts.md`

Optionally creates:

```text
.github/prompts/
```

Use this step when the project will rely on IDE or agent prompt libraries such as GitHub Copilot, Cursor, Claude Code, AWS Kiro, or similar tooling.

### Feature lifecycle phase

Use these prompts for every new feature or epic.

#### `01-feature-lifecycle/01-create-feature-spec.md`

Creates:

```text
specs/NNN-feature-name/spec.md
```

Captures outcomes, in-scope, out-of-scope, constraints, decisions already made, initial decomposition, and verification criteria.

#### `01-feature-lifecycle/02-create-api-contract.md`

Creates feature contracts such as:

```text
specs/NNN-feature-name/contracts/api-spec.yaml
specs/NNN-feature-name/contracts/data-schema.json
```

The actual set of contract files depends on the system architecture.

#### `01-feature-lifecycle/03-create-plan.md`

Creates:

```text
specs/NNN-feature-name/plan.md
```

Describes how the feature will be built: components, data flow, technology choices, database changes, integrations, risks, and non-functional requirements.

#### `01-feature-lifecycle/04-create-tasks.md`

Creates:

```text
specs/NNN-feature-name/tasks.md
```

Breaks the feature into atomic tasks. Each task must include a type, dependencies, affected files, a description, acceptance criteria, and a verification method.

#### `01-feature-lifecycle/05-implement-task.md`

Used by the implementation agent to execute one specific task from `tasks.md`.

Rule: one run, one task. The agent must not expand scope or silently implement adjacent work.

#### `01-feature-lifecycle/06-verify-task.md`

Used by the verifier agent after implementation.

The verifier's job is to search for problems: spec mismatch, out-of-scope changes, constitution violations, security gaps, missed edge cases, and weak tests.

### Maintenance phase

Use these prompts after incidents, planning changes, or decomposition failures.

#### `02-maintenance/01-update-spec-after-incident.md`

Updates the feature spec after an incident so the system learns from reality by adding missing constraints, edge cases, or verification rules.

#### `02-maintenance/02-update-constitution.md`

Updates project-wide rules when stack choices, security models, delivery models, or architecture assumptions change.

#### `02-maintenance/03-refine-tasks.md`

Rebuilds `tasks.md` when the current decomposition is too large, too vague, outdated, or no longer verifiable.

#### `02-maintenance/04-run-pre-implementation-checklist.md`

Acts as a hard readiness gate before coding starts.

## Reading order

If you are new to the repository, use this order:

1. `README.md`
2. `prompts/README.md`
3. `prompts/00-bootstrap/*`
4. generated `constitution.md`
5. generated `AGENTS.md`
6. `prompts/01-feature-lifecycle/*`
7. `prompts/02-maintenance/*`

## Documentation policy

The repository root is canonical. The `ru/` directory is the localized Russian mirror for human-facing usage. When operational rules change, update the root documentation first and synchronize `ru/` immediately afterward.
