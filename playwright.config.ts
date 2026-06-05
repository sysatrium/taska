import { defineConfig, devices } from "@playwright/test";

const apiPort = process.env.E2E_API_PORT ?? "3000";
const reuseExistingServer = process.env.PLAYWRIGHT_REUSE_SERVER === "1";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  expect: {
    timeout: 5_000
  },
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" }
    }
  ],
  webServer: [
    {
      command: `PORT=${apiPort} DATABASE_URL="file:./e2e.db" npm run dev:api`,
      url: `http://127.0.0.1:${apiPort}/api/competencies`,
      reuseExistingServer,
      timeout: 120_000
    },
    {
      command: `API_PROXY_TARGET="http://127.0.0.1:${apiPort}" npm run dev -- --host 127.0.0.1`,
      url: "http://127.0.0.1:5173",
      reuseExistingServer,
      timeout: 120_000
    }
  ]
});
