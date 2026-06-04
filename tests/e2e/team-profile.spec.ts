import { expect, test } from "@playwright/test";

test("creates and edits a global team profile through the UI", async ({ page }) => {
  const teamName = `E2E Team ${Date.now()}`;
  const updatedName = `${teamName} Updated`;

  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Глобальные команды" })).toBeVisible();

  await page.getByLabel("Название команды").fill(teamName);
  await page.getByLabel("Backend Development").check();
  await page.getByRole("button", { name: "Сохранить глобальный профиль" }).click();

  await expect(page.getByRole("button", { name: new RegExp(teamName) })).toBeVisible();

  await page.getByLabel("Название команды").fill(updatedName);
  await page.getByLabel("QA / Testing").check();
  await page.getByRole("button", { name: "Сохранить глобальный профиль" }).click();

  const updatedRow = page.getByRole("button", { name: new RegExp(updatedName) });
  await expect(updatedRow).toBeVisible();
  await expect(updatedRow).toContainText("QA / Testing");
});
