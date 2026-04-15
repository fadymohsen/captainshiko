import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding FAQs and Policies...");

  // 1. Clear existing FAQs to avoid duplicates (FAQs don't have unique slugs)
  await prisma.fAQ.deleteMany({});

  // 1. FAQs Data
  const faqData = [
    {
      questionAr: "هل البرنامج مناسب للمبتدئين؟",
      questionEn: "Is the program suitable for beginners?",
      answerAr: "بكل تأكيد. يتم تصميم البرنامج بناءً على مستواك الحالي، سواء كنت لم تلمس حديداً من قبل أو كنت لاعباً متمرساً؛ التدرج هو سر النجاح.",
      answerEn: "Absolutely. The program is tailored based on your current level, whether you've never touched a weight before or are a seasoned athlete. Progression is the secret to success.",
      order: 1,
    },
    {
      questionAr: "متى سأبدأ في رؤية النتائج؟",
      questionEn: "When will I start seeing results?",
      answerAr: "النتائج تختلف من شخص لآخر، ولكن مع الالتزام التام، ستلاحظ تغيراً في طاقتك وشكل جسمك خلال أول 4 أسابيع.",
      answerEn: "Results vary from person to person, but with full commitment, you will notice changes in your energy and body shape within the first 4 weeks.",
      order: 2,
    },
    {
      questionAr: "هل أحتاج للذهاب للجيم أم يمكنني التمرين في المنزل؟",
      questionEn: "Do I need to go to the gym or can I train at home?",
      answerAr: "البرنامج مرن تماماً. يمكن تصميم خطتك لتناسب الأدوات المتاحة لديك، سواء كان جيماً متكاملاً أو حتى بوزن الجسم وأدوات بسيطة في المنزل.",
      answerEn: "The program is fully flexible. Your plan can be designed to suit the equipment you have available—whether it's a full gym or just bodyweight and simple home tools.",
      order: 3,
    },
    {
      questionAr: "هل سألتزم بنظام غذائي قاسي أو ممنوعات؟",
      questionEn: "Will I follow a harsh diet or be restricted?",
      answerAr: "لا نؤمن بالحرمان. نظامنا يعتمد على 'المرونة الواعية'؛ نركز على السعرات والمغذيات التي يحتاجها جسمك مع إدخال أكلاتك المفضلة بذكاء.",
      answerEn: "We don't believe in deprivation. Our system is based on 'Conscious Flexibility'; we focus on the calories and nutrients your body needs while intelligently incorporating your favorite foods.",
      order: 4,
    },
    {
      questionAr: "هل يجب عليّ شراء مكملات غذائية غالية؟",
      questionEn: "Do I need to buy expensive supplements?",
      answerAr: "المكملات هي عامل مساعد فقط وليست أساسية. الأساس هو الأكل الطبيعي، وسأرشح لك المكملات فقط إذا كنت في حاجة فعلية لها.",
      answerEn: "Supplements are only an aid and are not essential. The foundation is natural food, and I will only recommend supplements if you truly need them.",
      order: 5,
    },
    {
      questionAr: "كيف تتم المتابعة معك؟",
      questionEn: "How do we follow up?",
      answerAr: "نستخدم تطبيقات خاصة وواتساب لمتابعة التطور الأسبوعي، مراجعة تكنيك التمارين بالفيديو، والرد على استفساراتك اليومية لضمان بقائك على المسار الصحيح.",
      answerEn: "We use dedicated apps and WhatsApp to track weekly progress, review exercise technique via video, and answer your daily inquiries to ensure you stay on track.",
      order: 6,
    },
    {
      questionAr: "ماذا لو واجهتني مشكلة في تمرين معين؟",
      questionEn: "What if I have a problem with a specific exercise?",
      answerAr: "يمكنك إرسال فيديو لك وأنت تؤدي التمرين، وسأقوم بتعديل التكنيك لك أو استبدال التمرين بآخر يناسب طبيعة جسمك أو الإصابات السابقة إن وجدت.",
      answerEn: "You can send a video of yourself performing the exercise, and I will adjust the technique for you or replace the exercise with one that suits your body or any previous injuries.",
      order: 7,
    },
    {
      questionAr: "متوقع اخس قد اية فى الشهر ؟",
      questionEn: "How much weight can I expect to lose per month?",
      answerAr: "ديما هدفنا نسعدك تخس من الدهون مش تخس من العضلات والنسبة العلمية هو خسارة من نصف إلى واحد فى المية من وزن الجسم دهون كل أسبوع.",
      answerEn: "Our goal is always to help you lose fat without losing muscle. The scientific rate is losing 0.5% to 1% of body weight in fat every week.",
      order: 8,
    },
    {
      questionAr: "الكوتش محمد رشدى هو اللى بيتابع بنفسه ؟",
      questionEn: "Does Coach Mohamed Rushdy follow up personally?",
      answerAr: "الكوتش محمد رشدى هو اللي بيتابع بنفسه فى باقة الاليت وال transformation.",
      answerEn: "Coach Mohamed Rushdy personally handles follow-ups in the Elite and Transformation packages.",
      order: 9,
    },
    {
      questionAr: "هو أنا لازم اوزن الاكل بتاعى ؟",
      questionEn: "Do I have to weigh my food?",
      answerAr: "مش شرط لو مش حابب بنستخدم حاليا نظام أسمة hand portions دة يساعدك تقدر تحديد كمية الاكل فى كل وجبة بدون ميزان وبيكون مفيد جدا خاصة لو انت من الناس اللي بتسافر كتير.",
      answerEn: "Not necessarily if you don't want to. We use a system called 'hand portions' that helps you estimate food quantities per meal without a scale, which is very useful if you travel a lot.",
      order: 10,
    },
    {
      questionAr: "ينفع اخس دهون إبنى عضلات فى نفس الوقت ؟",
      questionEn: "Can I lose fat and build muscle at the same time?",
      answerAr: "ينفع طبعا لو مشيت على نظام غذائي مخصص لجسمك ومحسوب السعرات وكمية البروتين اللي هتساعدك تبنى عضلات وكمية الكربوهيدرات والدهون اللي هيساعدوك تخس دهون ودى من اهم الخدمات اللي بنقدمها recomposition your body.",
      answerEn: "Yes, of course, if you follow a diet tailored to your body, with calculated calories, protein for muscle building, and carbs/fats for fat loss. This is body recomposition.",
      order: 11,
    },
    {
      questionAr: "فى كتاب لوصفات الاكل ؟",
      questionEn: "Is there a food recipe book?",
      answerAr: "عملك كتاب فى كل الوصفات الصحية وطريقة التحضير الصحيحة عشان تاكل كل الاكل اللي بتحبة وكمان الحلويات من غير ما تبوظ الدايت موجود عندى على الابليكشن.",
      answerEn: "I've created a book with healthy recipes and correct preparation methods so you can eat all the foods you love, including desserts, without ruining your diet. Available on the app.",
      order: 12,
    },
    {
      questionAr: "هو الدايت والتمرين بيتعملو فعلا لكل واحد ولة نظام ثابت بيتوزع ؟",
      questionEn: "Are the plans truly personalized?",
      answerAr: "الدايت لازم يتعمل بشكل مخصص لجسمك وهدفك عشان نضمن انك تشوف نتايج سريعة ويكون مناسب ليومك وتقدر تلتزم بية وهكذا التمرين.",
      answerEn: "The diet and training must be customized to your body and goal to ensure fast results and fit your daily routine for better commitment.",
      order: 13,
    },
    {
      questionAr: "لازم اعمل inbody قبل ما نبدء ?",
      questionEn: "Do I need an InBody test before starting?",
      answerAr: "كل الاسئلة اللي بحتاجها ببعتهالك من خلال الابليكشن لجمع اكبر قدر من المعلومات عنك وعن حياتك. ممكن نبدء بالميزان دة اهم حاجة عندنا وفى اى وقت نعمل ال inbody.",
      answerEn: "All the info I need is gathered through the app. We can start with just the scale—that's the most important for your BMI. You can do an InBody any time.",
      order: 14,
    },
    {
      questionAr: "المفروض الدايت بيتغير كل قد اية ؟",
      questionEn: "How often should the diet change?",
      answerAr: "احنا مش بنعمل 'دايت' لفترة مؤقتة، احنا بنصمم نظام حياة صحي مستدام. التغيير مرتبط بتطور تكوين جسمك أو تغير الميزان، وده غالبًا بنعدل عليه كل 3 لـ 4 أسابيع.",
      answerEn: "We design a sustainable lifestyle, not a temporary diet. Changes are based on your body composition progress or weight changes, usually every 3 to 4 weeks.",
      order: 15,
    },
  ];

  for (const faq of faqData) {
    await prisma.fAQ.create({ data: faq });
  }

  // 2. Policies Data
  const policiesData = [
    {
      slug: "privacy",
      titleAr: "سياسة الخصوصية",
      titleEn: "Privacy Policy",
      contentAr: `
<h3>المعلومات التي نجمعها</h3>
<p>نحن نلتزم بحماية خصوصيتك. نجمع معلومات مثل الاسم، البريد الإلكتروني، ورقم الواتساب عند اشتراكك في أحد برامجنا لضمان تقديم أفضل خدمة متابعة.</p>
<h3>كيفية استخدام البيانات</h3>
<p>تستخدم البيانات لتصميم برامجك الغذائية والتدريبية، وللتواصل معك بخصوص تطور مستواك.</p>
<h3>أمن البيانات</h3>
<p>نستخدم تقنيات تشفير متطورة لحماية بياناتك الشخصية ومعلومات الدفع الخاصة بك.</p>
      `,
      contentEn: `
<h3>Information We Collect</h3>
<p>We are committed to protecting your privacy. We collect information such as name, email, and WhatsApp number to ensure the best coaching services.</p>
<h3>How We Use Data</h3>
<p>Data is used to design your nutrition and training programs and to communicate regarding your progress.</p>
<h3>Data Security</h3>
<p>We use advanced encryption technologies to protect your personal data and payment information.</p>
      `,
    },
    {
      slug: "terms",
      titleAr: "الشروط والأحكام",
      titleEn: "Terms & Conditions",
      contentAr: `
<h3>استخدام البرنامج</h3>
<p>باشتراكك في برامج كابتن محمد رشدي، فإنك توافق على الالتزام بالتوجيهات والتعليمات لضمان سلامتك وتحقيق النتائج.</p>
<h3>إخلاء المسؤولية الطبية</h3>
<p>البرامج مصممة للأفراد الأصحاء. يجب عليك استشارة طبيبك قبل البدء في أي نشاط رياضي مكثف أو تغيير جذري في النظام الغذائي.</p>
<h3>الملكية الفكرية</h3>
<p>جميع الخطط التدريبية والغذائية والكتب المتاحة هي ملكية فكرية لموقع كابتن شيكو ولا يجوز تداولها أو نشرها.</p>
      `,
      contentEn: `
<h3>Program Use</h3>
<p>By subscribing to Coach Mohamed Rushdy's programs, you agree to follow the guidelines and instructions to ensure your safety and results.</p>
<h3>Medical Disclaimer</h3>
<p>Programs are designed for healthy individuals. Consult your physician before starting any intense physical activity or radical dietary changes.</p>
<h3>Intellectual Property</h3>
<p>All training and nutrition plans and books are the intellectual property of Captain Shiko and may not be distributed or published.</p>
      `,
    },
    {
      slug: "refund",
      titleAr: "سياسة الاسترجاع",
      titleEn: "Refund Policy",
      contentAr: `
<h3>طبيعة الخدمة</h3>
<p>نظراً لأن جميع برامجنا هي منتجات رقمية وخدمات استشارية يتم تصميمها خصيصاً لكل عميل، فإن المبالغ المدفوعة غير قابلة للاسترجاع بمجرد استلام البرنامج.</p>
<h3>الحالات الاستثنائية</h3>
<p>في حال وجود خطأ تقني في الدفع أو تكرار العملية، يتم التواصل مع الدعم الفني لاسترداد المبلغ الزائد.</p>
      `,
      contentEn: `
<h3>Nature of Service</h3>
<p>Since all our programs are digital products and consulting services tailored specifically for each client, payments are non-refundable once the program is received.</p>
<h3>Exceptional Cases</h3>
<p>In case of technical payment errors or duplicate transactions, please contact support to refund the extra amount.</p>
      `,
    },
  ];

  for (const policy of policiesData) {
    await prisma.policy.upsert({
      where: { slug: policy.slug },
      update: policy,
      create: policy,
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
