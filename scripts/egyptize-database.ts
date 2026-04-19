import { PrismaClient } from '@prisma/client';
import { translations } from '../app/translations';

const prisma = new PrismaClient();

async function main() {
  console.log('🇪🇬 Egyptizing Database Content...');

  // 1. Sync Plans with latest translations
  const plansDataAr = translations.ar.detailedPlans as any;
  for (const slug in plansDataAr) {
    const ar = plansDataAr[slug];
    await prisma.plan.updateMany({
      where: { slug },
      data: {
        nameAr: ar.name,
        briefAr: ar.brief,
        featuresAr: JSON.stringify(ar.features),
      }
    });
    console.log(`✅ Updated plan in DB: ${slug}`);
  }

  // 2. Egyptize FAQs
  const faqs = [
    {
      questionAr: "هو أنا لازم هشترك في جيم عشان الباقات دي؟",
      answerAr: "على حسب الباقة. باقة التغذية 'باقة التذكية الذكية' مش محتاجة جيم خالص، لكن 'الباقة الشاملة' والباقي بيحتاجوا جيم أو على الأقل أوزان في البيت. وممكن أفصلك برنامج للبيت مخصوص لو طلبت.",
      order: 1
    },
    {
      questionAr: "يعني إيه أصلا تدريب أونلاين وهنمشي إزاي؟",
      answerAr: "بمجرد ما تشترك، هبعتلك فورم تقييم شامل. كوتش محمد رشدي هيصمم لك بناءً عليه برنامجك على التطبيق بتاعنا، وهنتابع مع بعض أسبوع بأسبوع عشان نعدل أي حاجة ونضمن إنك ماشي صح.",
      order: 2
    },
    {
      questionAr: "ينفع أشترك لو عامل نظام دايت معين (نباتي، كيتو، إلخ)؟",
      answerAr: "طبعاً! نظام الأكل بيتصمم بالكامل على مقاس جسمك والحاجات اللي بتحبها أو لأ، وسواء كنت نباتي أو بتعمل صيام متقطع، هنظبطلك اللي يريحك.",
      order: 3
    }
  ];

  for (const f of faqs) {
    await prisma.fAQ.updateMany({
      where: { order: f.order },
      data: {
        questionAr: f.questionAr,
        answerAr: f.answerAr
      }
    });
    console.log(`✅ Updated FAQ #${f.order}`);
  }

  // 3. Egyptize Policies
  const policies = [
    {
      slug: "terms",
      titleAr: "شروطنا",
      contentAr: "لما تشترك في أي برنامج مع كوتش محمد رشدي، ده معناه إن صحتك كويسة وإنك استشرت دكتور قبل ما تبدأ أي مجهود بدني. النتايج بتختلف من بطل للتاني وبتعتمد بشكل أساسي على أد إيه إنت ملتزم بالبرنامج اللي حطيناه.",
    },
    {
      slug: "privacy",
      titleAr: "خصوصيتك في أمان",
      contentAr: "احنا بنهتم بخصوصيتك جداً. كل بياناتك، صور التحول، وتاريخك الصحي اللي بتشاركه معانا محفوظين وبسرية تامة، ومستحيل ننشر أي حاجة من غير موافقتك الصريحة.",
    },
    {
      slug: "refund",
      titleAr: "سياسة الاسترجاع",
      contentAr: "عشان خدمات التدريب الأونلاين دي رقمية ومتفصلة ومحسوبة بالملي عشانك إنت بالذات، فـ كل الاشتراكات نهائية. أول ما تستلم البرنامج بتاعك، مينفعش نسترد المبلغ.",
    }
  ];

  for (const p of policies) {
    await prisma.policy.update({
      where: { slug: p.slug },
      data: {
        titleAr: p.titleAr,
        contentAr: p.contentAr
      }
    });
    console.log(`✅ Updated Policy: ${p.slug}`);
  }

  console.log('\n✨ Database content is now 100% Egyptized! 🚀');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
