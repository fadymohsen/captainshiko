import { PrismaClient } from "@prisma/client";
import { translations } from "../app/translations";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting migration of transformations...");

  const enTrans = translations.en.transformationsData;
  const arTrans = translations.ar.transformationsData;

  if (!enTrans || !arTrans) {
    console.error("Could not find transformation data in translations.ts");
    return;
  }

  // Clear existing to avoid duplicates if re-running
  await prisma.transformation.deleteMany({});

  for (let i = 0; i < enTrans.length; i++) {
    const en = enTrans[i];
    // Find matching Arabic entry by index (assumed to be in same order)
    const ar = arTrans[i];

    await prisma.transformation.create({
      data: {
        nameEn: en.name,
        nameAr: ar.name,
        age: en.age || null,
        resultEn: en.result,
        resultAr: ar.result,
        durationEn: en.duration || null,
        durationAr: ar.duration || null,
        imagePath: en.img,
        order: i,
      },
    });

    console.log(`Migrated: ${en.name}`);
  }

  console.log("Migration complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
