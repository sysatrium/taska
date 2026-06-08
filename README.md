# Taska

Planning system for one product or product line with explainable, capacity-aware planning across 10-15 teams.

## Runtime

- Node.js 24 LTS.
- npm.
- SQLite for bootstrap and early MVP.

Use the repository runtime baseline:

```sh
nvm use
```

If your shell uses another Node version, install Node `24.16.0` first.

## Environment

Create a local environment file from the example:

```sh
cp .env.example .env
```

The default local database URL is:

```sh
DATABASE_URL="file:./dev.db"
```

Prisma resolves that SQLite path relative to the `prisma/` directory, so the local file is `prisma/dev.db`.

## Setup

```sh
npm install
npm run prisma:generate
DATABASE_URL="file:./dev.db" npm run prisma:migrate
DATABASE_URL="file:./dev.db" npm run prisma:seed
```

`npm run prisma:migrate` uses native Prisma Migrate. The small SQLite preflight only creates an empty database file when it does not exist yet.

## Development

Run the backend API:

```sh
DATABASE_URL="file:./dev.db" npm run dev:api
```

`npm run dev:api` runs Prisma migrations first, so the local SQLite schema stays aligned with the current code after new feature migrations are added.

Run the frontend:

```sh
npm run dev
```

Frontend: `http://localhost:5173/`

Backend API: `http://localhost:3000/`

## Verification

```sh
npm run lint
npm test
npm run build
npm audit --omit=dev --audit-level=moderate
```

Feature 004 browser smoke expects the API and frontend dev server to be running.

Run the browser Golden Path smoke with system Google Chrome:

```sh
npm run e2e:setup
npm run test:e2e
```

The e2e database is `prisma/e2e.db` and is ignored by git.
