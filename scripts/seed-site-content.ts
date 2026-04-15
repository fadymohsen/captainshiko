import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Professional FAQs and Legal Policies...");

  // 1. Clear existing FAQs to avoid duplicates
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
      titleAr: "سياسة الخصوصية وحماية البيانات",
      titleEn: "Privacy Policy & Data Protection",
      contentAr: `
<h2>1. مقدمة</h2>
<p>نحن في "Captain Shiko" نولي أهمية قصوى لخصوصية عملائنا. توضح هذه السياسة كيفية جمع واستخدام وحماية بياناتك الشخصية عند استخدامك لخدماتنا الاستشارية.</p>

<h2>2. البيانات التي نجمعها</h2>
<p>لتقديم خطط غذائية وتدريبية مخصصة، نقوم بجمع البيانات التالية:</p>
<ul>
  <li><strong>المعلومات الشخصية:</strong> الاسم، البريد الإلكتروني، رقم الهاتف (الواتساب).</li>
  <li><strong>المعلومات الصحية والبدنية:</strong> العمر، الطول، الوزن، نسبة الدهون، التاريخ الطبي، والإصابات السابقة (يتم جمعها بموافقتك الصريحة).</li>
  <li><strong>معلومات الدفع:</strong> يتم معالجة جميع المدفوعات عبر مزود الخدمة المعتمد "Fawaterak"، ولا نقوم بتخزين تفاصيل بطاقات الائتمان على خوادمنا.</li>
</ul>

<h2>3. الغرض من معالجة البيانات</h2>
<p>تستخدم بياناتك حصرياً للأغراض التالية:</p>
<ul>
  <li>تصميم وتعديل البرامج التدريبية والغذائية.</li>
  <li>المتابعة الدورية وتقييم النتائج.</li>
  <li>إرسال التحديثات الهامة والرد على استفساراتك.</li>
</ul>

<h2>4. مشاركة البيانات</h2>
<p>نحن لا نبيع أو نؤجر بياناتك لأطراف خارجية. يتم مشاركة معلومات محدودة فقط مع أطراف ثالثة موثوقة مثل:</p>
<ul>
  <li>بوابة الدفع "Fawaterak" لمعالجة المعاملات المالية.</li>
  <li>مزودي خدمات الاستضافة السحابية لضمان استمرارية الخدمة.</li>
</ul>

<h2>5. حقوقك القانونية</h2>
<p>بموجب قوانين حماية البيانات، لديك الحق في:</p>
<ul>
  <li>الوصول إلى بياناتك وطلب نسخة منها.</li>
  <li>تصحيح أي معلومات غير دقيقة.</li>
  <li>طلب حذف بياناتك عند انتهاء الخدمة (مع مراعاة المتطلبات القانونية للاحتفاظ بالسجلات).</li>
</ul>

<h2>6. أمن البيانات</h2>
<p>نطبق إجراءات تقنية وإدارية صارمة لحماية بياناتك من الوصول غير المصرح به أو الفقدان أو التعديل.</p>
      `,
      contentEn: `
<h2>1. Introduction</h2>
<p>At "Captain Shiko," we prioritize the privacy of our clients. This policy outlines how we collect, use, and protect your personal data when using our coaching services.</p>

<h2>2. Data We Collect</h2>
<p>To provide personalized nutrition and training plans, we collect the following:</p>
<ul>
  <li><strong>Personal Information:</strong> Name, email address, phone number (WhatsApp).</li>
  <li><strong>Health & Physical Data:</strong> Age, height, weight, body fat percentage, medical history, and previous injuries (collected with your explicit consent).</li>
  <li><strong>Payment Information:</strong> All payments are processed via our authorized provider "Fawaterak." We do not store credit card details on our servers.</li>
</ul>

<h2>3. Purpose of Processing</h2>
<p>Your data is used exclusively for:</p>
<ul>
  <li>Designing and modifying training and nutrition programs.</li>
  <li>Regular progress monitoring and evaluations.</li>
  <li>Sending important updates and responding to inquiries.</li>
</ul>

<h2>4. Data Sharing</h2>
<p>We do not sell or rent your data to third parties. Limited information is only shared with trusted partners such as:</p>
<ul>
  <li>Payment gateway "Fawaterak" for transaction processing.</li>
  <li>Cloud hosting providers to ensure service availability.</li>
</ul>

<h2>5. Your Rights</h2>
<p>Under data protection laws, you have the right to:</p>
<ul>
  <li>Access your data and request a copy.</li>
  <li>Rectify any inaccurate information.</li>
  <li>Request the deletion of your data once services conclude (subject to legal record-keeping requirements).</li>
</ul>

<h2>6. Data Security</h2>
<p>We implement strict technical and administrative measures to protect your data from unauthorized access, loss, or modification.</p>
      `,
    },
    {
      slug: "terms",
      titleAr: "الشروط والأحكام العامة",
      titleEn: "General Terms & Conditions",
      contentAr: `
<h2>1. الشروط العامة</h2>
<p>من خلال الاشتراك في برامجنا، فإنك توافق على الالتزام الكامل بهذه الشروط. الخدمات مقدمة للأفراد الذين تزيد أعمارهم عن 18 عاماً (أو بموافقة ولي الأمر).</p>

<h2>2. إخلاء المسؤولية الطبية</h2>
<p><strong>هام جداً:</strong> المعلومات والبرامج المقدمة ليست بديلاً عن النصيحة الطبية المهنية. يجب عليك استشارة طبيبك قبل البدء في أي نظام رياضي أو غذائي مكثف. باشتراكك، فإنك تقر بأنك في حالة صحية تسمح لك بممارسة النشاط البدني وتتحمل كامل المسؤولية عن أي إصابات ناتجة عن عدم الالتزام بالتعليمات أو إخفاء معلومات طبية.</p>

<h2>3. التزامات العميل</h2>
<ul>
  <li>تقديم معلومات دقيقة وصادقة عن الحالة البدنية.</li>
  <li>الالتزام بتعليمات الكوتش فيما يخص الأداء الحركي لتجنب الإصابات.</li>
  <li>عدم مشاركة محتوى البرنامج (الفيديوهات والخطط) مع أطراف أخرى، حيث أنها ملكية فكرية محمية.</li>
</ul>

<h2>4. الدفع والاشتراكات</h2>
<ul>
  <li>تعتبر الرسوم المدفوعة مقابل الوقت والخبرة المستثمرة في تصميم الخطط المخصصة.</li>
  <li>يتم تفعيل الاشتراك فور تأكيد الدفع من بوابة "Fawaterak".</li>
</ul>

<h2>5. الملكية الفكرية</h2>
<p>جميع الخطط التدريبية، الكتب الإلكترونية، والوصفات هي ملكية حصرية لـ "Captain Shiko". يمنع منعاً باتاً نشرها أو تداولها تجارياً دون إذن كتابي مسبق.</p>

<h2>6. تعديل الشروط</h2>
<p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت، وسيتم إخطار المشتركين الحاليين بأي تغييرات جوهرية.</p>
      `,
      contentEn: `
<h2>1. General Terms</h2>
<p>By subscribing to our programs, you agree to comply fully with these terms. Services are intended for individuals aged 18+ (or with parental consent).</p>

<h2>2. Medical Disclaimer</h2>
<p><strong>IMPORTANT:</strong> The information and programs provided are not a substitute for professional medical advice. Always consult your physician before starting any intense physical activity or dietary program. By subscribing, you acknowledge that you are in good health to perform physical activities and assume full responsibility for any injuries resulting from non-compliance with instructions or withholding medical information.</p>

<h2>3. Client Obligations</h2>
<ul>
  <li>Provide accurate and honest information regarding physical condition.</li>
  <li>Follow the coach's instructions regarding technique and form to avoid injury.</li>
  <li>Do not share program content (videos, plans) with third parties, as it is protected intellectual property.</li>
</ul>

<h2>4. Payments & Subscriptions</h2>
<ul>
  <li>Fees are paid in exchange for the time and expertise invested in designing customized plans.</li>
  <li>Subscriptions are activated immediately upon payment confirmation via "Fawaterak."</li>
</ul>

<h2>5. Intellectual Property</h2>
<p>All training plans, e-books, and recipes are the exclusive property of "Captain Shiko." Publishing or commercial distribution without prior written consent is strictly prohibited.</p>

<h2>6. Amendments</h2>
<p>We reserve the right to amend these terms at any time. Current subscribers will be notified of any material changes.</p>
      `,
    },
    {
      slug: "refund",
      titleAr: "سياسة الاسترداد والإلغاء",
      titleEn: "Refund & Cancellation Policy",
      contentAr: `
<h2>1. طبيعة الخدمة الرقمية</h2>
<p>نظراً لأن الخدمات المقدمة هي منتجات رقمية (خطط مصممة خصيصاً) واستشارات مبنية على الوقت، فإن جميع المبيعات تعتبر <strong>نهائية وغير قابلة للاسترداد</strong> بمجرد بدء العمل على تصميم البرنامج أو تسليمه.</p>

<h2>2. لماذا لا يوجد استرداد؟</h2>
<p>بمجرد اشتراكك، يتم حجز مكان في قائمة المتابعة الخاصة بالكوتش ويبدأ العمل فوراً على تحليل بياناتك وتصميم خطتك المخصصة، وهذه الجهود غير قابلة للاسترداد.</p>

<h2>3. الحالات الاستثنائية</h2>
<p>يتم النظر في استرداد المبالغ فقط في الحالات التالية:</p>
<ul>
  <li>وجود خطأ تقني أدى إلى خصم المبلغ مرتين (سيتم استرداد المبلغ الزائد بالكامل).</li>
  <li>إذا لم يتم تسليم البرنامج أو البدء في الخدمة خلال الفترة الزمنية المتفق عليها (3-5 أيام عمل من تاريخ اكتمال البيانات).</li>
</ul>

<h2>4. طلبات الإلغاء</h2>
<p>يمكنك طلب إلغاء الاشتراك قبل إرسال بياناتك الصحية والبدنية الأولية. في هذه الحالة، قد يتم خصم رسوم إدارية وبنكية بسيطة قبل إعادة المبلغ.</p>
      `,
      contentEn: `
<h2>1. Nature of Digital Service</h2>
<p>Given that our services are customized digital products and time-based consulting, all sales are <strong>final and non-refundable</strong> once work has begun on designing the program or after delivery.</p>

<h2>2. No-Refund Rationale</h2>
<p>Upon subscription, a slot is reserved in the coach's roster, and work begins immediately on analyzing your data and designing your plan. These efforts are non-retrievable.</p>

<h2>3. Exceptional Cases</h2>
<p>Refunds are only considered in the following scenarios:</p>
<ul>
  <li>Technical errors resulting in double billing (duplicate amount will be fully refunded).</li>
  <li>Failure to deliver the program or start the service within the agreed-upon timeframe (3-5 business days from data completion).</li>
</ul>

<h2>4. Cancellation Requests</h2>
<p>You may request a cancellation before submitting your initial health and physical data. In such cases, minor administrative and banking fees may be deducted before processing the refund.</p>
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
