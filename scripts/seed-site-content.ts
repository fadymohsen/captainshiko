import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding High-Fidelity Professional FAQs and Legal Policies...");

  // 1. Clear existing FAQs
  await prisma.fAQ.deleteMany({});

  // FAQ Data (Updated for accuracy)
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
      questionAr: "أنا نباتي، هل البرنامج مناسب لي؟",
      questionEn: "I am a vegetarian, is the program suitable for me?",
      answerAr: "نعم. يتم تصميم الخطة الغذائية بناءً على تفضيلاتك الشخصية وما يناسب طبيعة حياتك وقيمك الغذائية.",
      answerEn: "Yes. The nutrition plan is designed based on your personal preferences and what suits your lifestyle and nutritional values.",
      order: 5,
    },
     {
      questionAr: "كيف تتم المتابعة معك؟",
      questionEn: "How do we follow up?",
      answerAr: "نستخدم تطبيقات خاصة وواتساب لمتابعة التطور الأسبوعي، مراجعة تكنيك التمارين بالفيديو، والرد على استفساراتك اليومية لضمان بقائك على المسار الصحيح.",
      answerEn: "We use dedicated apps and WhatsApp to track weekly progress, review exercise technique via video, and answer your daily inquiries to ensure you stay on track.",
      order: 6,
    },
  ];

  for (const faq of faqData) {
    await prisma.fAQ.create({ data: faq });
  }

  // 2. Policies Data (Structured based on Enjaz Care examples but specific to Captain Shiko)
  const policiesData = [
    {
      slug: "terms",
      titleAr: "شروط الخدمة",
      titleEn: "Terms of Service",
      contentAr: `
<h1>شروط الخدمة</h1>
<p>تاريخ السريان: 26 مارس 2026</p>

<h2>1. قبول الشروط</h2>
<p>بدخولك إلى موقعنا الإلكتروني (captainshiko.com)، أو اشتراكك في أي من برامجنا، أو تواصلك معنا عبر أي قناة، فإنك تقر بأنك قرأت وفهمت ووافقت على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق، يرجى الامتناع عن استخدام خدماتنا.</p>

<h2>2. الخدمات المقدمة</h2>
<p>يقدم "كابتن شيكو" خدمات تدريبية وتغذوية عبر الإنترنت تشمل:</p>
<ul>
  <li>تصميم جداول التمارين المخصصة (للمنزل أو الجيم).</li>
  <li>تصميم خطط التغذية وحساب الماكروز.</li>
  <li>المتابعة الشخصية وتقييم تكنيك التمارين.</li>
  <li>التوصية بالمكملات الغذائية بناءً على أسس علمية.</li>
</ul>

<h2>3. الحجز وتفعيل الاشتراك</h2>
<p>يتم تفعيل الاشتراك فور تأكيد الدفع من خلال بوابة الدفع المعتمدة (Fawaterak). أنت توافق على تقديم معلومات دقيقة وصادقة عند التسجيل، بما في ذلك بياناتك الصحية والبدنية.</p>

<h2>4. الأسعار والدفع</h2>
<ul>
  <li>يتم تحديد الأسعار بناءً على نوع الباقة المختار (شهرية أو ربع سنوية) والمنطقة الجغرافية (مصر أو خارجها).</li>
  <li>جميع الأسعار نهائية وتُدفع مقدماً.</li>
  <li>يحتفظ كابتن شيكو بالحق في تعديل الأسعار في أي وقت.</li>
</ul>

<h2>5. مسؤوليات العميل</h2>
<p>بصفتك عميلًا، فإنك توافق على:</p>
<ul>
  <li>تقديم معلومات صحية دقيقة لتجنب أي مخاطر صحية.</li>
  <li>الالتزام بتعليمات الكوتش فيما يخص الأداء الحركي.</li>
  <li>تأمين المرفق التدريبي الخاص بك (الجيم أو المنزل) وضمان سلامته للاستخدام.</li>
</ul>

<h2>6. إخلاء المسؤولية الطبية</h2>
<p><strong>هام جداً:</strong> المحتوى المقدم ليس بديلاً عن النصيحة الطبية. يجب عليك استشارة طبيبك قبل البدء في أي نظام رياضي. أنت تتحمل المسؤولية الكاملة عن أي إصابات ناتجة عن عدم الالتزام بالتكنيك الصحيح أو إخفاء معلومات طبية سابقة.</p>

<h2>7. الإلغاء</h2>
<p>نظراً لطبيعة الخدمات الرقمية المخصصة، لا يمكن إلغاء الاشتراك المدفوع واسترداد المبالغ بمجرد بدء العمل على تصميم خطتك (3-5 أيام من اكتمال بياناتك).</p>

<h2>8. تحديد المسؤولية</h2>
<p>لا يتحمل "كابتن شيكو" أي مسؤولية عن الأضرار المباشرة أو غير المباشرة الناتجة عن سوء استخدام الأنظمة الغذائية أو التدريبية بخلاف ما هو منصوص عليه في الخطط المخصصة.</p>

<h2>9. الملكية الفكرية</h2>
<p>جميع الخطط والكتب الإلكترونية والفيديوهات هي ملكية خاصة لكابتن شيكو. يمنع منعاً باتاً نشرها أو تداولها تجارياً.</p>

<h2>10. الخصوصية</h2>
<p>يخضع استخدامك لخدماتنا لسياسة الخصوصية الخاصة بنا، والمدرجة في شروط الخدمة هذه بالإحالة.</p>

<h2>11. الاستخدامات المحظورة</h2>
<p>توافق على عدم استخدام البرنامج لأي غرض غير قانوني، أو مضايقة فريق العمل، أو محاولة قرصنة المحتوى الرقمي.</p>

<h2>12. القانون الحاكم</h2>
<p>تخضع هذه الشروط وتُفسر وفقاً للقوانين المصرية/السعودية المعمول بها في معالجة العقود الرقمية، ويتم حل النزاعات ودياً قبل اللجوء للقضاء.</p>

<h2>13. التعديلات</h2>
<p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. استمرارك في استخدام الخدمة يعني قبولك للتعديلات.</p>

<h2>14. تواصل معنا</h2>
<p>لأي استفسار بخصوص هذه الشروط:</p>
<p>واتساب: 8830 303 155 20+</p>
      `,
      contentEn: `
<h1>Terms of Service</h1>
<p>Effective Date: March 26, 2026</p>

<h2>1. Acceptance of Terms</h2>
<p>By accessing our website (captainshiko.com), subscribing to our programs, or contacting us through any channel, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree, please refrain from using our services.</p>

<h2>2. Services Offered</h2>
<p>Captain Shiko provides online coaching and nutritional services, including:</p>
<ul>
  <li>Customized workout schedules (Home or Gym).</li>
  <li>Nutrition planning and macro calculation.</li>
  <li>Personal follow-up and movement technique evaluation.</li>
  <li>Scientific supplement recommendations.</li>
</ul>

<h2>3. Booking and Activation</h2>
<p>Subscriptions are activated immediately upon payment confirmation via "Fawaterak." You agree to provide accurate and honest information during registration, including health and physical data.</p>

<h2>4. Pricing and Payment</h2>
<ul>
  <li>Pricing is determined based on the selected package (Monthly or Quarterly) and geographic region.</li>
  <li>All prices are final and paid in advance.</li>
  <li>Captain Shiko reserves the right to modify pricing at any time.</li>
</ul>

<h2>5. Client Responsibilities</h2>
<p>As a client, you agree to:</p>
<ul>
  <li>Provide accurate health data to avoid medical risks.</li>
  <li>Follow the coach's movement technique instructions.</li>
  <li>Ensure your training environment (Gym or Home) is safe for use.</li>
</ul>

<h2>6. Medical Disclaimer</h2>
<p><strong>IMPORTANT:</strong> The provided content is not a substitute for professional medical advice. Consult your physician before starting any exercise regimen. You assume full responsibility for any injuries resulting from improper technique or withholding medical history data.</p>

<h2>7. Cancellation</h2>
<p>Due to the nature of customized digital services, paid subscriptions cannot be canceled or refunded once work on your plan design has commenced (3-5 days from data completion).</p>

<h2>8. Limitation of Liability</h2>
<p>Captain Shiko is not liable for direct or indirect damages resulting from the misuse of nutrition or training systems beyond what is specified in the customized plans.</p>

<h2>9. Intellectual Property</h2>
<p>All plans, e-books, and videos are the exclusive property of Captain Shiko. Commercial distribution or public sharing is strictly prohibited.</p>

<h2>10. Privacy</h2>
<p>Your use of our services is governed by our Privacy Policy, incorporated here by reference.</p>

<h2>11. Prohibited Uses</h2>
<p>You agree not to use the program for any unlawful purpose, harass staff, or attempt to breach digital content security.</p>

<h2>12. Governing Law</h2>
<p>These terms are governed by the applicable laws for digital contracts. Disputes will be attempted to be resolved amicably before legal action.</p>

<h2>13. Amendments</h2>
<p>We reserve the right to modify these terms. Continued use constitutes acceptance of amendments.</p>

<h2>14. Contact Us</h2>
<p>For questions regarding these terms:</p>
<p>WhatsApp: +20 155 303 8830</p>
      `,
    },
    {
      slug: "privacy",
      titleAr: "سياسة الخصوصية",
      titleEn: "Privacy Policy",
      contentAr: `
<h1>سياسة الخصوصية</h1>
<h2>1. مقدمة</h2>
<p>نحن ملتزمون بحماية بياناتك الشخصية وحقك في الخصوصية. توضح هذه السياسة كيفية جمعنا لمعلوماتك الصحية والبدنية واستخدامها.</p>

<h2>2. المعلومات التي نجمعها</h2>
<ul>
  <li>المعلومات الشخصية: الاسم، رقم الواتساب، البريد الإلكتروني.</li>
  <li>البيانات الصحية: الوزن، الطول، نسبة الدهون، الأمراض المزمنة، الإصابات السابقة.</li>
  <li>بيانات الدفع: تتم عبر Fawaterak ولا نقوم بتخزين بيانات بطاقتك الائتمانية.</li>
</ul>

<h2>3. كيفية استخدام معلوماتك</h2>
<p>نستخدم بياناتك لتصميم خطط مخصصة، ومتابعة تقدمك أسبوعياً، وتحسين جودة الخدمة.</p>

<h2>4. الاحتفاظ بالبيانات</h2>
<p>نحتفظ بسجالتك التدريبية والصحية لمدة 5 سنوات امتثالاً للمتطلبات التنظيمية.</p>

<h2>5. حقوقك</h2>
<p>لديك الحق في طلب تصحيح بياناتك أو حذفها عند انتهاء فترة اشتراكك.</p>

<p>تواصل معنا عبر واتساب للمزيد من المعلومات بخصوص بياناتك.</p>
      `,
      contentEn: `
<h1>Privacy Policy</h1>
<h2>1. Introduction</h2>
<p>We are committed to protecting your personal information and your right to privacy. This policy explains how we collect and use your health and physical data.</p>

<h2>2. Information We Collect</h2>
<ul>
  <li>Personal Information: Name, WhatsApp number, Email.</li>
  <li>Health Data: Weight, height, body fat %, chronic diseases, previous injuries.</li>
  <li>Payment Data: Processed via Fawaterak; we do not store your credit card details.</li>
</ul>

<h2>3. How We Use Your Information</h2>
<p>We use your data to design customized plans, track weekly progress, and improve service quality.</p>

<h2>4. Data Retention</h2>
<p>We retain training and health records for 5 years to comply with regulatory requirements.</p>

<h2>5. Your Rights</h2>
<p>You have the right to request the rectification or deletion of your data once your subscription ends.</p>

<p>Contact us via WhatsApp for more information regarding your data rights.</p>
      `,
    },
    {
      slug: "refund",
      titleAr: "سياسة الاسترداد",
      titleEn: "Refund Policy",
      contentAr: `
<h1>سياسة الاسترداد</h1>
<h2>1. نظرة عامة</h2>
<p>في "كابتن شيكو"، رضا العميل هو أولويتنا. ومع ذلك، نظراً لأن برامجنا هي سلع رقمية مصممة خصيصاً لكل عميل، فإن هناك ضوابط صارمة للاسترداد.</p>

<h2>2. حالات الاستحقاق</h2>
<p>يحق لك استرداد كامل المبلغ في حالة وجود خطأ تقني أدى لخصم المبلغ مرتين، أو إذا لم يتم تسليم البرنامج خلال 7 أيام عمل من اكتمال بياناتك دون إخطار مسبق.</p>

<h2>3. الحالات غير القابلة للاسترداد</h2>
<p>لا يتم إصدار استرداد بمجرد البدء في تصميم الخطة أو تسليمها للعميل، حيث تم استثمار الوقت والجهد الفني في التخصيص.</p>

<h2>4. طلبات الاسترداد</h2>
<p>يتم تقديم الطلبات عبر التواصل المباشر وتُراجع خلال 3-5 أيام عمل.</p>
      `,
      contentEn: `
<h1>Refund Policy</h1>
<h2>1. Overview</h2>
<p>At Captain Shiko, customer satisfaction is our priority. However, as our programs are custom-designed digital goods, strict refund terms apply.</p>

<h2>2. Eligibility</h2>
<p>You are entitled to a full refund if a technical error resulted in double billing, or if the program was not delivered within 7 business days of data completion without prior notice.</p>

<h2>3. Non-Refundable Situations</h2>
<p>No refunds are issued once plan design commences or after delivery to the client, as significant technical effort and time have been invested in customization.</p>

<h2>4. Refund Process</h2>
<p>Requests must be sent via direct communication and are reviewed within 3-5 business days.</p>
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
