import { closeSync, existsSync, mkdirSync, openSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const databasePath = resolveDatabasePath(process.env.DATABASE_URL);

mkdirSync(dirname(databasePath), { recursive: true });

if (!existsSync(databasePath)) {
  closeSync(openSync(databasePath, "w"));
  console.log(`Created SQLite database file at ${databasePath}`);
}

function resolveDatabasePath(databaseUrl) {
  if (!databaseUrl?.startsWith("file:")) {
    throw new Error("DATABASE_URL must be set to a SQLite file: URL");
  }

  const value = databaseUrl.slice("file:".length);
  if (value.startsWith("/")) return value;

  return resolve(root, "prisma", value);
}
