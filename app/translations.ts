export type Locale = "en" | "ar";

export const translations = {
  en: {
    nav: {
      home: "Home",
      aboutMe: "About Me",
      programs: "Programs",
      plans: "Plans",
      contact: "Contact",
      signUp: "LET'S GO",
      seeAllPlans: "See All Plans",
    },
    common: {
      knowMore: "Know More",
    },
    aboutPage: {
      hero: {
        title: "Who is Captain Shiko?",
        text: "Hi, I'm Captain Shiko, a personal trainer and nutrition specialist. My goal is to help you change your life and body for the better through studied and proven scientific methods. I believe that fitness is not just about lifting weights in the gym, but an integrated lifestyle that combines proper nutrition, smart training, and the right mindset.",
      },
      philosophy: {
        title: "My Training Philosophy",
        item1: "Train smart, not just hard - designing programs that fit each person's level and ensure continuous development while avoiding injuries.",
        item2: "Nutrition without deprivation - I don't believe in harsh systems, but in flexibility that allows you to enjoy your favorite meals within your needs.",
        item3: "Building sustainable habits - I focus on educating subscribers to be able to maintain their results for life.",
      },
      global: {
        title: "Our Services Cross Borders",
        text: "The goal is to provide an integrated experience that suits every subscriber wherever they are. International plans include coverage for global payment gateway costs, in addition to providing a custom nutrition guide with products and brands available in global markets (Europe, America, and the Gulf), with a follow-up system that takes into account time differences to ensure continuous technical and sports support with professional standards.",
      },
      certificates: {
        title: "Certificates & Accreditations",
      },
      social: {
        title: "Follow me on social media",
      }
    },
    hero: {
      badge: "Elite Online Coaching",
      title1: "Push Your",
      title2: "Limits.",
      title3: "No Excuses.",
      desc: "Custom training programs, nutrition plans, and 1-on-1 coaching — built for those who go hard and never quit.",
      cta: "LET'S GO",
      programs: "View Programs",
      statsYears: "Years",
      statsClients: "Clients",
      statsPrograms: "Programs",
    },
    banner: [
      "PUSH HARDER",
      "NO DAYS OFF",
      "TRAIN INSANE",
      "STAY DISCIPLINED",
      "LEVEL UP",
      "BEAST MODE",
      "GRIND DAILY",
      "OWN IT",
    ],
    about: {
      label: "About",
      title1: "Science. Not Hype.",
      title2: "Results. Not Promises.",
      desc: "Mohamed Roshdy breaks down nutrition and training into simple, practical steps that actually work. From fat-burning foods to smart workout programming — every plan is built on science, tailored to your body, and designed for your real daily routine.",
      cta: "Learn More",
      card1: "Strength Training",
      card2: "Conditioning",
    },
    transformations: {
      label: "Real Results",
      title: "TRANSFORMATIONS",
      desc: "Our clients don't just change — they evolve. Real people, real progress, zero filters.",
      before: "Before",
      after: "After",
    },
    transformationsData: [
      { name: "Ahmed S.", age: 28, result: "The Standard - setting the bar for excellence.", img: "/transformations/focus-1.png", duration: "12 Weeks" },
      { name: "Moustafa K.", age: 34, result: "Core Recomposition - abdominal sculpting.", img: "/transformations/focus-2.jpeg", duration: "16 Weeks" },
      { name: "Captain Shiko", age: 0, result: "Founder Transformation - lead by example.", img: "/transformations/focus-3.jpeg", duration: "Founder" },
      { name: "Omar J.", age: 25, result: "Posture Correction - peak performance focus.", img: "/transformations/focus-6.jpeg", duration: "14 Weeks" },
      { name: "Hany R.", age: 39, result: "Complete lifestyle overhaul and fat loss.", img: "/transformations/tran-2.jpeg", duration: "12 Weeks" },
      { name: "Ziad F.", age: 23, result: "Massive fat loss and muscle toning.", img: "/transformations/tran-1.jpeg", duration: "10 Weeks" },
      { name: "Ibrahim H.", age: 52, result: "Lifelong Vitality - age is just a number.", img: "/transformations/focus-4.jpeg", duration: "20 Weeks" },
      { name: "Yasser G.", age: 48, result: "Health First - reversing age through fitness.", img: "/transformations/focus-5.jpeg", duration: "18 Weeks" },
      { name: "Khaled A.", age: 27, result: "Muscle gain and definition mastery.", img: "/transformations/tran-3.jpeg", duration: "12 Weeks" },
      { name: "Samer L.", age: 30, result: "Athletic body recomposition and strength.", img: "/transformations/tran-4.jpeg", duration: "16 Weeks" },
      { name: "Tarek E.", age: 33, result: "Strength and endurance peak performance.", img: "/transformations/tran-5.jpeg", duration: "12 Weeks" },
      { name: "Amr N.", age: 29, result: "A journey from zero to peak fitness.", img: "/transformations/tran-6.jpeg", duration: "24 Weeks" }
    ],
    services: {
      label: "What We Do",
      title: "PROGRAMS",
      items: [
        { title: "Workout", desc: "Customized training splits built for your level, goals, and schedule. Progressive overload guaranteed." },
        { title: "Nutrition", desc: "Macro-calculated meal plans that fuel your workouts and shred fat without starving." },
        { title: "Coaching", desc: "Direct 1-on-1 access. Weekly check-ins, form reviews, and full accountability." },
        { title: "Lifestyle", desc: "Sleep optimization, stress management, and habit building for peak performance." },
      ],
    },
    coach: {
      label: "The Squad",
      title: "COACHES",
      members: [
        { name: "Captain Shiko", role: "Head Coach & Founder" },
        { name: "Strength Coach", role: "Resistance Training Specialist" },
        { name: "Nutrition Coach", role: "Diet & Supplementation" },
      ],
    },
    pricing: {
      label: "Invest In Yourself",
      title: "PLANS",
      popular: "BEST VALUE",
      cta: "Get Started",
      regionToggle: { egypt: "Egypt (EGP)", abroad: "Abroad (USD)" },
      durationToggle: { monthly: "Monthly", quarterly: "3 Months" },
      save: "Save",
      perMonth: "/mo",
      perQuarter: "/3 mo",
      includes: "Includes customized nutrition plan + training program tailored to your body, goals & daily routine",
      egypt: {
        basic: {
          tier: "Basic Plan",
          monthly: "1,500",
          quarterly: "3,000",
          currency: "EGP",
          features: [
            "Custom nutrition plan for your body & goals",
            "Macro-calculated meals",
            "Adapted to your daily routine",
            "Messaging support",
          ],
        },
        gold: {
          tier: "Gold",
          monthly: "2,500",
          quarterly: "5,000",
          currency: "EGP",
          features: [
            "Customized training program",
            "Personalized nutrition plan",
            "Adapted to your body, goals & routine",
            "Monthly plan updates",
            "Messaging support",
          ],
        },
        vip: {
          tier: "VIP",
          monthly: "4,000",
          quarterly: "7,000",
          currency: "EGP",
          features: [
            "Everything in Gold",
            "Monthly phone call with the coach",
            "Priority support & faster responses",
            "Advanced progress tracking",
            "Customized adjustments anytime",
          ],
        },
      },
      abroad: {
        gold: {
          tier: "Gold",
          monthly: "150",
          quarterly: "300",
          currency: "$",
          features: [
            "Customized training program",
            "Personalized nutrition plan",
            "Adapted to your body, goals & routine",
            "Monthly plan updates",
            "Messaging support",
          ],
        },
        vip: {
          tier: "VIP",
          monthly: "200",
          quarterly: "350",
          currency: "$",
          features: [
            "Everything in Gold",
            "Monthly phone call with the coach",
            "Priority support & faster responses",
            "Advanced progress tracking",
            "Customized adjustments anytime",
          ],
        },
      },
    },
    cta: {
      label: "Ready?",
      title1: "Stop Scrolling.",
      title2: "Start Training.",
      desc: "Your next chapter starts with one decision. Follow Captain Shiko and let's build something legendary — together.",
      button: "Get In Touch",
    },
    footer: {
      rights: "All rights reserved.",
    },

    detailedPlans: {
      "elite-transformation": {
        name: "Elite Transformation",
        brief: "The integrated choice for those seeking real and radical results",
        monthly: "150",
        quarterly: "400",
        currency: "$",
        features: [
          "Personalized training plan: Designed for your goal (bulk, cut, or performance) and suitable for your training location (gym or home).",
          "Flexible nutrition system: Calculated calories and macros (protein, carbs, fats) with varied meals to suit your routine.",
          "Periodic updates: Plans updated weekly based on your body progress and commitment level.",
          "Real-time monitoring: Direct communication via WhatsApp to answer any queries and correct exercise technique via video.",
          "Supplements and vitamins file: Scientific recommendations for the supplements your body actually needs.",
          "Occasions flexibility system: How to deal with outings or travel without ruining the diet."
        ],
        localPricing: { monthly: "3000", quarterly: "6000", currency: "EGP" },
        globalPricing: { monthly: "150", quarterly: "400", currency: "USD", note: "Includes one month free" }
      },
      "self-starter": {
        name: "The Self-Starter",
        brief: "If you have experience and need the right way to reach your goal",
        monthly: "75",
        quarterly: "200",
        currency: "$",
        features: [
          "Customized training program for the subscriber's goal (cut/bulk).",
          "Calculated calorie and macro nutrition plan.",
          "Food alternatives list.",
          "No weekly follow-up (follow-up once a month through WhatsApp)."
        ],
        localPricing: { monthly: "1500", quarterly: "3000", currency: "EGP" },
        globalPricing: { monthly: "75", quarterly: "200", currency: "USD" }
      },
      "elite-coaching": {
        name: "Elite Coaching",
        brief: "If you need very special care, constant communication and very fast results",
        monthly: "400",
        quarterly: "900",
        currency: "$",
        features: [
          "Direct communication (weekly Zoom or phone call).",
          "Daily or real-time adjustment of the nutrition plan according to your circumstances (travel, invitations).",
          "Priority in response.",
          "Limited number of slots."
        ],
        localPricing: { monthly: "5000", quarterly: "12000", currency: "EGP" },
        globalPricing: { monthly: "400", quarterly: "900", currency: "USD" }
      },
      "fuel-and-focus": {
        name: "Fuel & Focus",
        brief: "Repair your relationship with food and make your body a burning machine",
        monthly: "100",
        quarterly: "220",
        currency: "$",
        features: [
          "Scientific nutrition system: Far from deprivation, it depends on the foods you love but in the correct quantities.",
          "Food alternatives tables: A flexible list that allows you to change your meals yourself without disrupting the system.",
          "Calculation of precise needs: Knowing your calories according to your daily activity to ensure reaching the goal.",
          "Nutritional education: You learn how to read nutrition labels and choose the best for you.",
          "Weight and measurement tracking: Weekly review of body results and weekly follow-up on WhatsApp."
        ],
        localPricing: { monthly: "2000", quarterly: "4500", currency: "EGP" },
        globalPricing: { monthly: "100", quarterly: "220", currency: "USD" }
      },
      "power-and-performance": {
        name: "Power & Performance",
        brief: "Train smart, not just hard",
        monthly: "100",
        quarterly: "220",
        currency: "$",
        features: [
          "Advanced training program: Dividing training sessions (Splits) ensuring the best muscle recovery.",
          "Variety in exercises according to the goal.",
          "Technique explanation videos: Detailed explanation for each exercise to ensure complete safety and avoid injuries.",
          "Power development (Progressive Overload): A system to track the development of your weights and physical strength month after month.",
          "Cardio and stretching system: A plan to raise cardiovascular fitness and improve body flexibility.",
          "Performance evaluation: Reviewing your exercise videos to adjust your body posture and weekly follow-up on WhatsApp."
        ],
        localPricing: { monthly: "2000", quarterly: "4500", currency: "EGP" },
        globalPricing: { monthly: "100", quarterly: "220", currency: "USD" }
      }
    },
    transformationsPage: {
      title: "Transformations",
      subtitle: "Results that speak for themselves",
      galleryTitle: "Our Hall of Fame",
      ctaTitle: "Ready to be our next success?",
      ctaButton: "Start Your Transformation",
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "عن المدرب",
      aboutMe: "مين أنا",
      programs: "البرامج",
      plans: "أنظمة الاشتراك",
      contact: "تواصل معايا",
      signUp: "يلا نبدأ",
      seeAllPlans: "كل الباقات",
    },
    common: {
      knowMore: "اعرف أكتر",
    },
    aboutPage: {
      hero: {
        title: "مين هو كابتن شيكو؟",
        text: "أهلاً بيك، أنا كابتن شيكو، مدرب شخصي وأخصائي تغذية. هدفي إني أساعدك تغير حياتك وجسمك للأحسن بأساليب علمية مدروسة ومجربة. أنا مؤمن إن الفيتنس مش مجرد حديد بنرفعه في الجيم، ده أسلوب حياة متكامل بيجمع بين التغذية الصح، التمرين الذكي، والعقلية المظبوطة.",
      },
      philosophy: {
        title: "فلسفتي في التمرين",
        item1: "اتمرن بذكاء مش بس بمجهود - بصمم برامج تناسب مستوى كل شخص وتضمن إنه يتطور على طول ويتجنب أي إصابات.",
        item2: "تغذية من غير حرمان - مش بآمن بأنظمة الدايت القاسية، المرونة هي الأساس عشان تستمتع بأكلك اللي بتحبه جوه احتياجاتك اليومية.",
        item3: "بناء عادات بتكمل معاك - بركز إني أوعّي المشتركين إزاي يحافظوا على نتايجهم طول العمر مش بس فترة الدايت.",
      },
      global: {
        title: "خدماتنا بتعدي الحدود",
        text: "هدفنا إننا نوفرلك تجربة متكاملة تناسبك في أي مكان في العالم. الباقات الدولية بتشمل كل تكاليف بوابات الدفع، ده غير دليل تغذية مخصص بمنتجات وبراندات موجودة في السوق العالمي (سواء في أوروبا، أمريكا، أو الخليج)، مع نظام متابعة بيراعي فروق التوقيت عشان نضمنلك إن الدعم الفني والرياضي هيفضل مكمل معاك باحترافية كاملة.",
      },
      certificates: {
        title: "الشهادات والاعتمادات",
      },
      social: {
        title: "تابعني على السوشيال ميديا",
      }
    },
    hero: {
      badge: "تدريب أونلاين مستوى وحش",
      title1: "اكسر",
      title2: "حدودك.",
      title3: "مفيش أعذار.",
      desc: "برامج تمرين متفصلة عليك، خطط تغذية، ومتابعة شخصية — متصممة للي مابيعرفش يستسلم ومكمل للآخر.",
      cta: "يلا نبدأ",
      programs: "شوف البرامج",
      statsYears: "سنين خبرة",
      statsClients: "بطل",
      statsPrograms: "برنامج",
    },
    banner: [
      "هات آخرك",
      "مفيش أجازات",
      "اتمرن زي الوحش",
      "خليك ملتزم",
      "ارفع مستواك",
      "شغّل وضع الوحش",
      "افرم نفسك كل يوم",
      "العبها صح",
    ],
    about: {
      label: "مين الكوتش",
      title1: "أساسيات علمية.",
      title2: "نتايج، مش حوارات.",
      desc: "محمد رشدي بيبسّط التغذية والتمرين لخطوات عملية بتجيب من الآخر. من أسرار الأكل اللي بيحرق دهون لبرامج تمرين ذكية — كل خطة مبنية على علم، متفصلة لجسمك، ومصممة تناسب روتين يومك العادي.",
      cta: "اعرف أكتر",
      card1: "تمارين حديد",
      card2: "كارديو ولياقة",
    },
    transformations: {
      label: "نتايج بجد",
      title: "أبطالنا",
      desc: "عملائنا مش بس بيتغيروا — دول بيتطوروا بجد. ناس طبيعية، تقدم حقيقي، ومن غير أي فلاتر ولا حوارات.",
      before: "قبل",
      after: "بعد",
    },
    transformationsData: [
      { name: "أحمد س.", age: 28, result: "المعيار - ده كان أول وأهم نموذج للالتزام والنتايج.", img: "/transformations/focus-1.png", duration: "١٢ أسبوع" },
      { name: "مصطفى ك.", age: 34, result: "نحت القوام - تغيير كامل لمنطقة البطن.", img: "/transformations/focus-2.jpeg", duration: "١٦ أسبوع" },
      { name: "كابتن شيكو", age: 0, result: "تحول المدرب - أنا ببني نفسي قُدامك.", img: "/transformations/focus-3.jpeg", duration: "المدرب" },
      { name: "عمر ج.", age: 25, result: "تحسين القوام - ظبطنا وضعية الجسم والأداء البدني.", img: "/transformations/focus-6.jpeg", duration: "١٤ أسبوع" },
      { name: "هاني ر.", age: 39, result: "تغيير كامل في نظام الحياة وخسارة دهون من الآخر.", img: "/transformations/tran-2.jpeg", duration: "١٢ أسبوع" },
      { name: "زياد ف.", age: 23, result: "خسارة وزن كبيرة مع بناء عضلات صافية.", img: "/transformations/tran-1.jpeg", duration: "١٠ أسابيع" },
      { name: "إبراهيم هـ.", age: 52, result: "الحيوية الدائمة - إثبات إن السن مجرد رقم والقوة ملهاش عمر.", img: "/transformations/focus-4.jpeg", duration: "٢٠ أسبوع" },
      { name: "ياسر ج.", age: 48, result: "الصحة أولاً - رجّعنا الشباب من خلال اللياقة البدنية.", img: "/transformations/focus-5.jpeg", duration: "١٨ أسبوع" },
      { name: "خالد أ.", age: 27, result: "بناء عضلات وبروز عضلي مثالي.", img: "/transformations/tran-3.jpeg", duration: "١٢ أسبوع" },
      { name: "سامر ل.", age: 30, result: "إعادة هيكلة الجسم وزيادة القوة والتحمل.", img: "/transformations/tran-4.jpeg", duration: "١٦ أسبوع" },
      { name: "طارق ع.", age: 33, result: "أقصى مستويات القوة والتحمل البدني.", img: "/transformations/tran-5.jpeg", duration: "١٢ أسبوع" },
      { name: "عمرو ن.", age: 29, result: "رحلة من الصفر لحد اللياقة البدنية الكاملة.", img: "/transformations/tran-6.jpeg", duration: "٢٤ أسبوع" }
    ],
    services: {
      label: "بنعمل إيه هنا",
      title: "برامجنا",
      items: [
        { title: "التمرين", desc: "جداول تمرين متفصلة مخصوص لمستواك وأهدافك ويومك. أوزانك هتزيد وتتطور يعني هتتطور." },
        { title: "التغذية", desc: "خطط أكل محسوبة بالماكرو بتديك طاقة للتمرين وتحرق الدهون من غير ما تجوع." },
        { title: "المتابعة", desc: "تواصل مباشر معايا ١ لـ ١. متابعة أسبوعية، براجع أدائك، وأخليك دايماً على الطريق الصح." },
        { title: "اللايف ستايل", desc: "بنظبط نومك، وبنتعامل مع الضغط اليومي، وبنبني عادات عشان توصل لأعلى أداء." },
      ],
    },
    coach: {
      label: "فريقنا",
      title: "المدربين",
      members: [
        { name: "كابتن شيكو", role: "الهيد كوتش والمؤسس" },
        { name: "مدرب أحمال", role: "متخصص تمارين المقاومة" },
        { name: "مدرب تغذية", role: "تغذية ومكملات" },
      ],
    },
    pricing: {
      label: "استثمر في صحتك وفورمتك",
      title: "عروضنا",
      popular: "أعلى ترشيح",
      cta: "اشترك دلوقتي",
      regionToggle: { egypt: "من جوه مصر (ج.م)", abroad: "من بره مصر ($)" },
      durationToggle: { monthly: "شهر", quarterly: "٣ شهور" },
      save: "وفر",
      perMonth: "/شهر",
      perQuarter: "/٣ شهور",
      includes: "شامل نظام أكل صحي متفصل لجسمك وهدفك وطبيعة يومك مع جدول تمرين يخليك توصل للنتيجة بأسرع وقت",
      egypt: {
        basic: {
          tier: "الباقة الأساسية",
          monthly: "١٬٥٠٠",
          quarterly: "٣٬٠٠٠",
          currency: "ج.م",
          features: [
            "نظام أكل متفصل على جسمك وهدفك",
            "وجبات محسوبة بالماكروز بالظبط",
            "مناسب لروتين يومك الحقيقي",
            "دعم ومتابعة بالشات",
          ],
        },
        gold: {
          tier: "ذهبي",
          monthly: "٢٬٥٠٠",
          quarterly: "٥٬٠٠٠",
          currency: "ج.م",
          features: [
            "جدول تمرين متفصل ليك",
            "نظام تغذية متفصل ليك",
            "مناسب لجسمك وهدفك وروتينك",
            "تحديثات للخطة كل شهر",
            "دعم ومتابعة مابتقفلش",
          ],
        },
        vip: {
          tier: "VIP",
          monthly: "٤٬٠٠٠",
          quarterly: "٧٬٠٠٠",
          currency: "ج.م",
          features: [
            "كل مميزات الباقة الدهبي",
            "مكالمة تليفون كل شهر مع المدرب",
            "دعم أولوية ورد في أسرع وقت",
            "متابعة تطور متقدمة جداً",
            "تعديلات على الخطة في أي وقت",
          ],
        },
      },
      abroad: {
        gold: {
          tier: "ذهبي",
          monthly: "١٥٠",
          quarterly: "٣٠٠",
          currency: "$",
          features: [
            "برنامج تدريبي مخصص",
            "نظام غذائي مخصص",
            "مناسب لجسمك وهدفك وروتينك",
            "تحديثات شهرية للخطة",
            "دعم رسائل",
          ],
        },
        vip: {
          tier: "VIP",
          monthly: "٢٠٠",
          quarterly: "٣٥٠",
          currency: "$",
          features: [
            "كل مميزات الذهبي",
            "مكالمة تليفون شهرية مع المدرب",
            "دعم أولوية ورد أسرع",
            "متابعة تقدم متقدمة",
            "تعديلات مخصصة في أي وقت",
          ],
        },
      },
    },
    cta: {
      label: "جاهز؟",
      title1: "كفاية تقليب.",
      title2: "ابدأ اتمرن.",
      desc: "فصلك الجديد بيبدأ بقرار واحد. تابع كابتن شيكو ونبني حاجة أسطورية — مع بعض.",
      button: "تواصل معانا",
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
    },

    detailedPlans: {
      "elite-transformation": {
        name: "باقة التحول الشامل",
        brief: "الحل المتكامل لو بتدور على نتايج حقيقية وتغيير من الآخر",
        monthly: "150",
        quarterly: "400",
        currency: "$",
        features: [
          "جدول تمرين متفصل ليك: حسب هدفك (تضخيم، تنشيف، أو تحسين أداء) وسواء بتتمرن في الجيم أو البيت.",
          "دايت مرن: محسوب السعرات والماكروز (بروتين، كارب، دهون) مع وجبات متنوعة تناسب يومك.",
          "تعديلات كل فترة: بنحدث الخطط أسبوعياً حسب تطور جسمك ومدى التزامك.",
          "متابعة لحظة بلحظة: تواصل مباشر على الواتساب عشان أرد على أي أسئلة ونظبط تكنيك التمارين بالفيديو.",
          "ملف المكملات والفيتامينات: ترشيحات علمية لأهم المكملات اللي جسمك محتاجها فعلاً.",
          "إزاي تتعامل في الخروجات: نظام مرن بيعلمك تتصرف إزاي في العزومات أو السفر من غير ما تخرب الدايت."
        ],
        localPricing: { monthly: "3000", quarterly: "6000", currency: "جنيه" },
        globalPricing: { monthly: "150", quarterly: "400", currency: "$", note: "تشمل شهر هدية" }
      },
      "self-starter": {
        name: "الباقة الأساسية",
        brief: "لو عندك خبرة ومحتاج تمشي صح عشان توصل لهدفك",
        monthly: "75",
        quarterly: "200",
        currency: "$",
        features: [
          "جدول تمرين متفصل لهدفك (تنشيف أو تضخيم).",
          "نظام غذائي محسوب السعرات والماكروز.",
          "قائمة بدائل للأكل عشان تزهقش.",
          "من غير متابعة أسبوعية (المتابعة بتبقى مرة واحدة في الشهر على الواتساب)."
        ],
        localPricing: { monthly: "1500", quarterly: "3000", currency: "جنيه" },
        globalPricing: { monthly: "75", quarterly: "200", currency: "$" }
      },
      "elite-coaching": {
        name: "باقة الـ VIP",
        brief: "لو محتاج رعاية خاصة جداً وتواصل مبيفصلش ونتايج سريعة من الآخر",
        monthly: "400",
        quarterly: "900",
        currency: "$",
        features: [
          "تواصل مباشر (مكالمة زووم أو تليفون كل أسبوع).",
          "تعديل يومي للنظام الغذائي حسب ظروفك (سفر، عزومات، أو أي طوارئ).",
          "أولوية في الرد على أي سؤال.",
          "العدد محدود جداً."
        ],
        localPricing: { monthly: "5000", quarterly: "12000", currency: "جنيه" },
        globalPricing: { monthly: "400", quarterly: "900", currency: "$" }
      },
      "fuel-and-focus": {
        name: "باقة التغذية الذكية",
        brief: "ظبط علاقتك بالأكل وخلي جسمك ماكينة حرق دهون",
        monthly: "100",
        quarterly: "220",
        currency: "$",
        features: [
          "نظام غذائي علمي: بعيد عن الحرمان، بيعتمد على الأكل اللي بتحبه بس بالكميات الصح.",
          "قوائم بدائل الأكل: نظام مرن بيخليك تغير وجباتك بنفسك من غير ما تبوظ الدايت.",
          "حساب احتياجاتك بالظبط: بنعرف سعراتك حسب مجهودك اليومي عشان تضمن إنك توصل.",
          "توعية غذائية: هعلمك إزاي تقرأ الـ labels وتعرف تختار الأنسب ليك.",
          "متابعة الوزن والمقاسات: مراجعة أسبوعية لنتايج جسمك ومتابعة على الواتساب."
        ],
        localPricing: { monthly: "2000", quarterly: "4500", currency: "جنيه" },
        globalPricing: { monthly: "100", quarterly: "220", currency: "$" }
      },
      "power-and-performance": {
        name: "باقة الأداء البدني",
        brief: "اتمرن بذكاء.. مش بس عرق ومجهود على الفاضي",
        monthly: "100",
        quarterly: "220",
        currency: "$",
        features: [
          "جدول تمرين جامد: تقسيم أيام التمرين (Splits) عشان تضمن أحسن استشفاء وعضلاتك تكبر.",
          "تمارين متنوعة حسب اللي إنت عايزه.",
          "فيديوهات شرح التكنيك: شرح مفصل لكل تمرين عشان تتمرن صح وتبعد عن الإصابات.",
          "زيادة القوة البدنية: سيستم لمتابعة تطور أوزانك وقوتك شهر ورا شهر.",
          "نظام الكارديو والاسترتشات: خطة لرفع لياقتك وتحسين مرونة جسمك.",
          "تقييم أدائك: براجع فيديوهاتك وأنت بتتمرن عشان أصلحلك وضعية جسمك، مع متابعة أسبوعية على الواتساب."
        ],
        localPricing: { monthly: "2000", quarterly: "4500", currency: "جنيه" },
        globalPricing: { monthly: "100", quarterly: "220", currency: "$" }
      }
    },
    transformationsPage: {
      title: "التحولات",
      subtitle: "نتايج بتتكلم عن نفسها",
      galleryTitle: "صور الأبطال",
      ctaTitle: "جاهز تكون بطل قصة نجاحنا الجاية؟",
      ctaButton: "ابدأ رحلة التغيير دلوقتي",
    }
  }
};
