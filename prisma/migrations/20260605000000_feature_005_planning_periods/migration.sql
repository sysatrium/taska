CREATE TABLE "PlanningPeriod" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "periodType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE INDEX "PlanningPeriod_productId_periodType_status_idx" ON "PlanningPeriod"("productId", "periodType", "status");
CREATE INDEX "PlanningPeriod_productId_periodType_startDate_endDate_idx" ON "PlanningPeriod"("productId", "periodType", "startDate", "endDate");
