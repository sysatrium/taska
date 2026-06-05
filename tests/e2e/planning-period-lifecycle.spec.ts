import { expect, test } from "@playwright/test";

test("opens planning periods from the main UI and moves a period to open", async ({ page }) => {
  const periodName = `E2E Planning Period ${Date.now()}`;
  const dates = futureDateRange();

  await page.goto("/");
  await page.getByRole("button", { name: "Периоды планирования" }).click();

  await expect(page.getByRole("heading", { name: "Создать planning period" })).toBeVisible();
  await page.getByLabel("Название периода").fill(periodName);
  await page.getByLabel("Дата начала").fill(dates.startDate);
  await page.getByLabel("Дата окончания").fill(dates.endDate);
  await page.getByRole("button", { name: "Сохранить" }).click();

  const periodRow = page.getByRole("button", { name: new RegExp(periodName) });
  await expect(periodRow).toBeVisible();
  await expect(periodRow).toContainText("draft");

  await periodRow.click();
  await page.getByLabel("Goals").fill("# Period goals\n- Open with confidence\nKeep planning explainable");
  await expect(page.getByRole("region", { name: "Предпросмотр goals" })).toContainText("Period goals");
  await page.getByRole("button", { name: "Сохранить" }).click();

  await expect(page.getByLabel("Readiness hints")).toContainText("Goals заполнены");
  await expect(page.getByRole("region", { name: "Предпросмотр goals" })).toContainText("Period goals");
  await page.getByRole("button", { name: "Open", exact: true }).click();

  await expect(periodRow).toContainText("open");
  await expect(page.getByText("open").last()).toBeVisible();
  await expect(page.getByRole("region", { name: "Предпросмотр goals" })).toContainText("Open with confidence");
});

function futureDateRange() {
  const start = new Date(Date.UTC(2030, 0, 1 + Math.floor(Date.now() / 1000) % 20000));
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 7);
  return { startDate: toDateInput(start), endDate: toDateInput(end) };
}

function toDateInput(date: Date): string {
  return date.toISOString().slice(0, 10);
}
