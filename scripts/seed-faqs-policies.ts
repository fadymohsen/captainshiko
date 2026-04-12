import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding FAQs and Policies...');

  // 1. Seed FAQs
  const faqs = [
    {
      questionEn: "Do I need a gym membership for these plans?",
      answerEn: "It depends on the plan. Our 'Fuel & Focus' plan is primarily nutrition, but 'Elite Transformation' and others require access to basic gym equipment (dumbbells, barbells, machines). Custom home options are available upon request.",
      questionAr: "هل أحتاج لاشتراك جيم علشان الباقات دي؟",
      answerAr: "على حسب الباقة. باقة التغذية مش بتحتاج، لكن الباقات الشاملة زي 'التحول الاحترافي' بتحتاج أجهزة وأوزان. ممكن نصمم لك برنامج منزلي لو طلبت.",
      order: 1
    },
    {
      questionEn: "How exactly does the online coaching work?",
      answerEn: "Once you purchase a plan, you will receive a comprehensive assessment form. Based on your answers, Captain Shiko will build a custom regimen using our dedicated app, and you'll log your progress weekly for continuous adjustment.",
      questionAr: "التدريب الأونلاين بيشتغل إزاي بالظبط؟",
      answerAr: "بمجرد الاشتراك، هتوصلك استمارة تقييم شاملة. كابتن شيكو هيصمم بناءً عليها برنامجك على التطبيق بتاعنا، وهتتابع معاه وتطوراتك أسبوعياً للتعديل المستمر.",
      order: 2
    },
    {
      questionEn: "Are meal plans flexible for strict dietary needs (Vegan, Keto, etc)?",
      answerEn: "Absolutely! The nutrition plan is custom-built around your allergies, preferences, and lifestyle constraints. Whether you're vegan, gluten-free, or doing intermittent fasting.",
      questionAr: "هل خطط التغذية مرنة لو عندي نظام معين (نباتي، كيتو)؟",
      answerAr: "أكيد! خطة التغذية بتتصمم بالكامل على مقاس حساسياتك، تفضيلاتك، ونظام حياتك سواء كنت نباتي أو بتعمل صيام متقطع.",
      order: 3
    }
  ];

  await prisma.fAQ.deleteMany(); // Clear existing
  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }
  console.log('Seeded FAQs.');

  // 2. Seed Policies
  const policies = [
    {
      slug: "terms",
      titleEn: "Terms of Service",
      titleAr: "شروط الخدمة",
      contentEn: "By purchasing any online coaching program from Captain Shiko, you agree that you are in good physical condition and have consulted with a physician before starting any exercise regimen. Results vary from individual to individual and depend heavily on adherence to the prescribed programs.",
      contentAr: "بشرائك أي برنامج تدريب أونلاين من كابتن شيكو، تقر بأنك في حالة صحية جيدة وأنك استشرت طبيباً قبل البدء في أي نظام رياضي. النتائج تختلف من شخص لآخر وتعتمد بشكل كبير على الالتزام بالبرامج.",
    },
    {
      slug: "privacy",
      titleEn: "Privacy Policy",
      titleAr: "سياسة الخصوصية",
      contentEn: "We take your privacy seriously. All your physical assessment data, transformation photos, and medical history shared with us are kept strictly confidential and will never be shared without your explicit consent.",
      contentAr: "نحن نأخذ خصوصيتك على محمل الجد. جميع بيانات التقييم البدني وصور التحول وتاريخك الطبي الذي تشاركه معنا تُحفظ بسرية تامة ولن يتم نشرها دون موافقة صريحة منك.",
    },
    {
      slug: "refund",
      titleEn: "Refund Policy",
      titleAr: "سياسة الاسترجاع",
      contentEn: "Due to the digital and highly customized nature of our online coaching, all sales are final. Once your personalized plans have been delivered, no refunds will be issued.",
      contentAr: "نظراً لطبيعة خدمات التدريب الأونلاين الرقمية والمخصصة بالكامل، جميع المبيعات نهائية. بمجرد تسليم خطتك المخصصة، لا يمكن استرداد المبلغ.",
    }
  ];

  await prisma.policy.deleteMany(); // Clear existing
  for (const policy of policies) {
    await prisma.policy.create({ data: policy });
  }
  console.log('Seeded Policies.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
