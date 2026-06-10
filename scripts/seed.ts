import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { translations } from "../app/translations";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Admin
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: "admin" }
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("Shiko2026!", 10);
    await prisma.admin.create({
      data: {
        username: "admin",
        passwordHash,
      }
    });
    console.log("Created Admin account: username 'admin', password 'Shiko2026!'");
  }

  // Seed Plans
  const plansDataEn = translations.en.detailedPlans as any;
  const plansDataAr = translations.ar.detailedPlans as any;

  let order = 0;
  for (const slug in plansDataEn) {
    const en = plansDataEn[slug];
    const ar = plansDataAr[slug];

    const priceMonthlyEgp = ar.localPricing?.monthly || null;
    const priceQuarterlyEgp = ar.localPricing?.quarterly || null;
    const priceMonthlyUsd = en.globalPricing?.monthly || null;
    const priceQuarterlyUsd = en.globalPricing?.quarterly || null;

    const followUpFrequency = en.followUpFrequency || null;
    const isBooking = en.isBooking || false;
    const bookingStartHour = en.bookingStartHour ?? null;
    const bookingEndHour = en.bookingEndHour ?? null;
    const bookingSlotMins = en.bookingSlotMins ?? null;
    const salePriceMonthlyEgp = ar.saleLocalPricing?.monthly || null;
    const salePriceQuarterlyEgp = ar.saleLocalPricing?.quarterly || null;
    const salePriceMonthlyUsd = en.saleGlobalPricing?.monthly || null;
    const salePriceQuarterlyUsd = en.saleGlobalPricing?.quarterly || null;

    await prisma.plan.upsert({
      where: { slug },
      update: {
        nameEn: en.name,
        nameAr: ar.name,
        briefEn: en.brief,
        briefAr: ar.brief,
        featuresEn: JSON.stringify(en.features),
        featuresAr: JSON.stringify(ar.features),
        priceMonthlyEgp: priceMonthlyEgp || null,
        priceQuarterlyEgp: priceQuarterlyEgp || null,
        priceMonthlyUsd: priceMonthlyUsd || null,
        priceQuarterlyUsd: priceQuarterlyUsd || null,
        salePriceMonthlyEgp,
        salePriceQuarterlyEgp,
        salePriceMonthlyUsd,
        salePriceQuarterlyUsd,
        ...(followUpFrequency && { followUpFrequency }),
        isBooking,
        ...(bookingStartHour !== null && { bookingStartHour }),
        ...(bookingEndHour !== null && { bookingEndHour }),
        ...(bookingSlotMins !== null && { bookingSlotMins }),
        order: order++,
        isActive: true,
      },
      create: {
        slug,
        nameEn: en.name,
        nameAr: ar.name,
        briefEn: en.brief,
        briefAr: ar.brief,
        featuresEn: JSON.stringify(en.features),
        featuresAr: JSON.stringify(ar.features),
        priceMonthlyEgp: priceMonthlyEgp || null,
        priceQuarterlyEgp: priceQuarterlyEgp || null,
        priceMonthlyUsd: priceMonthlyUsd || null,
        priceQuarterlyUsd: priceQuarterlyUsd || null,
        salePriceMonthlyEgp,
        salePriceQuarterlyEgp,
        salePriceMonthlyUsd,
        salePriceQuarterlyUsd,
        ...(followUpFrequency && { followUpFrequency }),
        isBooking,
        ...(bookingStartHour !== null && { bookingStartHour }),
        ...(bookingEndHour !== null && { bookingEndHour }),
        ...(bookingSlotMins !== null && { bookingSlotMins }),
        order: order++,
        isActive: true,
      }
    });
    console.log(`Seeded plan: ${slug}`);
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
