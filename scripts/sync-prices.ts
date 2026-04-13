import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const plansData = [
  {
    slug: "self-starter",
    nameEn: "The Self-Starter",
    nameAr: "الباقة الأساسية (The Self-Starter)",
    priceMonthlyEgp: "1500",
    priceQuarterlyEgp: "3000",
    priceMonthlyUsd: "75",
    priceQuarterlyUsd: "200",
    order: 1
  },
  {
    slug: "fuel-and-focus",
    nameEn: "Fuel & Focus",
    nameAr: "باقة التغذية الذكية (Fuel & Focus)",
    priceMonthlyEgp: "2000",
    priceQuarterlyEgp: "4500",
    priceMonthlyUsd: "100",
    priceQuarterlyUsd: "220",
    order: 2
  },
  {
    slug: "power-and-performance",
    nameEn: "Power & Performance",
    nameAr: "باقة الأداء البدني (Power & Performance)",
    priceMonthlyEgp: "2000",
    priceQuarterlyEgp: "4500",
    priceMonthlyUsd: "100",
    priceQuarterlyUsd: "220",
    order: 3
  },
  {
    slug: "elite-transformation",
    nameEn: "Elite Transformation",
    nameAr: "باقة التحول الشامل (Elite Transformation)",
    priceMonthlyEgp: "3000",
    priceQuarterlyEgp: "6000",
    priceMonthlyUsd: "150",
    priceQuarterlyUsd: "400",
    order: 4
  },
  {
    slug: "elite-coaching",
    nameEn: "Elite Coaching",
    nameAr: "باقة الـ VIP (Elite Coaching)",
    priceMonthlyEgp: "5000",
    priceQuarterlyEgp: "12000",
    priceMonthlyUsd: "400",
    priceQuarterlyUsd: "900",
    order: 5
  }
]

async function main() {
  console.log("Starting price sync...")
  
  for (const data of plansData) {
    const plan = await prisma.plan.upsert({
      where: { slug: data.slug },
      update: {
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        priceMonthlyEgp: data.priceMonthlyEgp,
        priceQuarterlyEgp: data.priceQuarterlyEgp,
        priceMonthlyUsd: data.priceMonthlyUsd,
        priceQuarterlyUsd: data.priceQuarterlyUsd,
        order: data.order,
      },
      create: {
        slug: data.slug,
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        priceMonthlyEgp: data.priceMonthlyEgp,
        priceQuarterlyEgp: data.priceQuarterlyEgp,
        priceMonthlyUsd: data.priceMonthlyUsd,
        priceQuarterlyUsd: data.priceQuarterlyUsd,
        order: data.order,
        briefEn: "", // Placeholders if missing, we use translations.ts for briefs in UI mostly
        briefAr: "",
        featuresEn: "[]",
        featuresAr: "[]"
      }
    })
    console.log(`Synced plan: ${plan.slug}`)
  }
  
  console.log("Price sync completed successfully.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
