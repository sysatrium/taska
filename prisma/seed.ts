import { PrismaClient } from "@prisma/client";
import { SEEDED_COMPETENCIES } from "../src/backend/modules/competencies/competency-seed";

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    SEEDED_COMPETENCIES.map((competency) =>
      prisma.competency.upsert({
        where: { id: competency.id },
        update: competency,
        create: competency
      })
    )
  );
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
