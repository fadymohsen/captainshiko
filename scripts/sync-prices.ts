import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const plansData = [
  {
    slug: "self-starter",
    nameEn: "The Self-Starter",
    nameAr: "الباقة الأساسية (The Self-Starter)",
    briefEn: "Complete nutrition and exercise program for experienced individuals",
    briefAr: "برنامج تغذية وتمرين متكامل مصمم لمن لديهم خبرة سابقة",
    featuresEn: ["Customized training program for your specific goal.", "Calculated calorie and macro nutrition plan.", "Food alternatives list.", "Monthly follow-up via WhatsApp or Email."],
    featuresAr: ["برنامج تدريبي مخصص لهدفك (تنشيف/تضخيم).", "خطة نظام غذائي محسوبة السعرات والماكروز.", "قائمة بدائل للأطعمة.", "متابعة شهرية مرة واحدة من خلال الواتساب أو الإيميل."],
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
    briefEn: "Professional nutrition-only plan to master your metabolism",
    briefAr: "خطة تغذية احترافية فقط لإصلاح علاقتك بالأكل وحرق الدهون",
    featuresEn: ["Detailed nutrition-only plan customized for your body.", "Weekly follow-up on WhatsApp with Coach Muhammad Roshdy.", "Macro-calculated meals based on your daily activity.", "Flexible food alternatives list.", "Weekly weight and measurement tracking."],
    featuresAr: ["نظام غذائي علمي مخصص بالكامل لجسمك وهدفك.", "متابعة أسبوعية على الواتساب مع كابتن محمد رشدي.", "جداول بدائل الأطعمة لمرونة كاملة في اختيار وجباتك.", "حساب السعرات والماكروز حسب نشاطك اليومي.", "مراجعة أسبوعية لنتائج الجسم والقياسات."],
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
    briefEn: "Professional exercise-only program built for strength",
    briefAr: "برنامج تدريبي مخصص فقط للأداء الرياضي والقوة",
    featuresEn: ["Customized training program (Exercise only).", "Weekly follow-up with Coach Muhammad Roshdy.", "Technique evaluation via video review.", "Advanced training splits for optimal recovery.", "Progressive overload tracking system."],
    featuresAr: ["برنامج تدريبي متطور مخصص (تمارين فقط).", "متابعة أسبوعية على الواتساب مع كابتن محمد رشدي.", "مراجعة تكنيك التمارين بالفيديو لضمان الأمان.", "نظام تطوير القوة (Progressive Overload) أسبوعياً.", "خطة شاملة للكارديو والإطالات لتحسين اللياقة."],
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
    briefEn: "Full nutrition and exercise program for major results",
    briefAr: "الخيار المتكامل تغذية وتمرين لنتائج حقيقية وجذرية",
    featuresEn: ["Combined nutrition and exercise program.", "Weekly follow-up with Coach Muhammad Roshdy.", "Custom training splits (Gym or Home).", "Flexible macro-calculated meal plans.", "Weekly plan updates based on progress.", "Direct WhatsApp access for queries."],
    featuresAr: ["برنامج تغذية وتمرين مكامل مخصص لجسمك.", "متابعة أسبوعية مع كابتن محمد رشدي شخصياً.", "تحديثات دورية للخطة بناءً على تقدمك أسبوعياً.", "تواصل مباشر عبر الواتساب للرد على الاستفسارات.", "ملف كامل للمكملات والفيتامينات المطلوبة.", "نظام مرونة للتعامل مع السفر والعزومات."],
    priceMonthlyEgp: "3000",
    priceQuarterlyEgp: "6000",
    priceMonthlyUsd: "150",
    priceQuarterlyUsd: "400",
    order: 4
  },
  {
    slug: "elite-coaching",
    nameEn: "Elite VIP",
    nameAr: "باقة الـ VIP (Elite VIP)",
    briefEn: "Daily 1-on-1 access and maximum care for fast results",
    briefAr: "متابعة يومية وتواصل دائم لأقصى درجات الاهتمام والنتائج",
    featuresEn: ["Full nutrition and exercise program.", "Daily follow-up via WhatsApp.", "Weekly call with Coach Muhammad Roshdy.", "Real-time plan adjustments (travel, events).", "Priority response and 1-on-1 coaching.", "Limited enrollment for elite-level care."],
    featuresAr: ["برنامج شامل (تغذية وتمرين) مع رعاية خاصة جداً.", "متابعة يومية لحظية عبر الواتساب.", "مكالمة تليفون أسبوعية مع كابتن محمد رشدي.", "تعديل فوري للنظام حسب ظروفك الطارئة (سفر/مناسبات).", "أولوية قصوى في الرد والدعم الفني.", "أماكن محدودة جداً لضمان جودة المتابعة."],
    priceMonthlyEgp: "7000",
    priceQuarterlyEgp: "15000",
    priceMonthlyUsd: "500",
    priceQuarterlyUsd: "1100",
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
        briefEn: data.briefEn,
        briefAr: data.briefAr,
        featuresEn: JSON.stringify(data.featuresEn),
        featuresAr: JSON.stringify(data.featuresAr),
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
        briefEn: data.briefEn,
        briefAr: data.briefAr,
        featuresEn: JSON.stringify(data.featuresEn),
        featuresAr: JSON.stringify(data.featuresAr),
        priceMonthlyEgp: data.priceMonthlyEgp,
        priceQuarterlyEgp: data.priceQuarterlyEgp,
        priceMonthlyUsd: data.priceMonthlyUsd,
        priceQuarterlyUsd: data.priceQuarterlyUsd,
        order: data.order,
        isActive: true,
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
