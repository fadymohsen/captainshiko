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
      clients: [
        { name: "Ahmed M.", duration: "12 Weeks", result: "Lost 18kg & gained visible muscle definition" },
        { name: "Karim A.", duration: "16 Weeks", result: "Complete body recomposition & lifestyle change" },
        { name: "Omar H.", duration: "8 Weeks", result: "Gained 6kg lean mass with structured bulk" },
        { name: "Youssef R.", duration: "20 Weeks", result: "From skinny to muscular — total transformation" },
      ],
    },
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
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "عن المدرب",
      aboutMe: "من أنا",
      programs: "البرامج",
      plans: "الباقات",
      contact: "تواصل",
      signUp: "يلا نبدأ",
      seeAllPlans: "مشاهدة جميع الباقات",
    },
    common: {
      knowMore: "اعرف أكتر",
    },
    aboutPage: {
      hero: {
        title: "من هو كابتن شيكو؟",
        text: "مرحباً، أنا كابتن شيكو، مدرب شخصي وأخصائي تغذية. هدفي هو مساعدتك على تغيير حياتك وجسمك نحو الأفضل من خلال أساليب علمية مدروسة ومجربة. أؤمن بأن اللياقة البدنية ليست مجرد أوزان نرفعها في الجيم، بل هي أسلوب حياة متكامل يجمع بين التغذية السليمة، التدريب الذكي، والعقلية الصحيحة.",
      },
      philosophy: {
        title: "فلسفتي في التدريب",
        item1: "التدريب بذكاء وليس بجهد فقط - تصميم برامج تناسب مستوى كل شخص وتضمن التطور المستمر وتجنب الإصابات.",
        item2: "تغذية بدون حرمان - لا أؤمن بالأنظمة القاسية، بل بالمرونة التي تسمح لك بالاستمتاع بوجباتك المفضلة ضمن احتياجاتك.",
        item3: "بناء عادات مستدامة - أركز على تثقيف المشتركين ليكونوا قادرين على الحفاظ على نتائجهم مدى الحياة.",
      },
      global: {
        title: "خدماتنا تتخطى الحدود",
        text: "الهدف هو توفير تجربة متكاملة تناسب كل مشترك أينما كان. الباقات الدولية تشمل تغطية لتكاليف بوابات الدفع العالمية، بالإضافة إلى توفير دليل تغذية مخصص بالمنتجات والبراندات المتاحة في الأسواق العالمية (أوروبا، أمريكا، والخليج)، مع نظام متابعة يراعي فروق التوقيت لضمان استمرارية الدعم الفني والرياضي بمعايير احترافية.",
      },
      certificates: {
        title: "الشهادات والاعتمادات",
      },
      social: {
        title: "تابعني على منصات التواصل",
      }
    },
    hero: {
      badge: "تدريب أونلاين متقدم",
      title1: "تخطَّ",
      title2: "حدودك.",
      title3: "بدون أعذار.",
      desc: "برامج تدريب مخصصة، خطط تغذية، ومتابعة شخصية — مصممة لمن يرفض الاستسلام.",
      cta: "يلا نبدأ",
      programs: "شوف البرامج",
      statsYears: "سنوات",
      statsClients: "عميل",
      statsPrograms: "برنامج",
    },
    banner: [
      "ادفع أكتر",
      "مفيش أجازات",
      "تمرن بجنون",
      "خليك ملتزم",
      "طوّر نفسك",
      "وضع الوحش",
      "اطحن كل يوم",
      "امتلكها",
    ],
    about: {
      label: "عن المدرب",
      title1: "علم. مش كلام.",
      title2: "نتايج. مش وعود.",
      desc: "محمد رشدي بيبسّط التغذية والتمارين لخطوات عملية بتشتغل فعلاً. من أكلات حرق الدهون لبرامج تمارين ذكية — كل خطة مبنية على علم، مخصصة لجسمك، ومصممة لروتينك اليومي الحقيقي.",
      cta: "اعرف أكتر",
      card1: "تمارين القوة",
      card2: "تمارين اللياقة",
    },
    transformations: {
      label: "نتايج حقيقية",
      title: "التحولات",
      desc: "عملاؤنا مش بس بيتغيروا — بيتطوروا. ناس حقيقية، تقدم حقيقي، بدون فلاتر.",
      before: "قبل",
      after: "بعد",
      clients: [
        { name: "أحمد م.", duration: "١٢ أسبوع", result: "خسر ١٨ كجم وبنى عضلات واضحة" },
        { name: "كريم أ.", duration: "١٦ أسبوع", result: "تحول كامل في الجسم ونمط الحياة" },
        { name: "عمر ح.", duration: "٨ أسابيع", result: "زاد ٦ كجم عضلات صافية بتضخيم منظم" },
        { name: "يوسف ر.", duration: "٢٠ أسبوع", result: "من نحيف لعضلي — تحول كامل" },
      ],
    },
    services: {
      label: "خدماتنا",
      title: "البرامج",
      items: [
        { title: "التمرين", desc: "جداول تمارين مخصصة مبنية على مستواك وأهدافك وجدولك. زيادة تدريجية مضمونة." },
        { title: "التغذية", desc: "خطط أكل محسوبة بالماكرو تغذي تمارينك وتحرق الدهون بدون جوع." },
        { title: "المتابعة", desc: "تواصل مباشر ١ على ١. متابعة أسبوعية، مراجعة فورم، ومسؤولية كاملة." },
        { title: "نمط الحياة", desc: "تحسين النوم، إدارة الضغط، وبناء عادات لأداء خارق." },
      ],
    },
    coach: {
      label: "الفريق",
      title: "المدربين",
      members: [
        { name: "كابتن شيكو", role: "المدرب الرئيسي والمؤسس" },
        { name: "مدرب القوة", role: "متخصص تمارين المقاومة" },
        { name: "مدرب التغذية", role: "تغذية ومكملات" },
      ],
    },
    pricing: {
      label: "استثمر في نفسك",
      title: "الباقات",
      popular: "الأفضل قيمة",
      cta: "ابدأ الآن",
      regionToggle: { egypt: "مصر (ج.م)", abroad: "خارج مصر ($)" },
      durationToggle: { monthly: "شهري", quarterly: "٣ شهور" },
      save: "وفّر",
      perMonth: "/شهر",
      perQuarter: "/٣ شهور",
      includes: "شامل نظام غذائي صحي مناسب لجسمك وهدفك وطبيعة يومك مع نظام تدريبي يساعدك توصل لهدفك أسرع",
      egypt: {
        basic: {
          tier: "الباقة الأساسية",
          monthly: "١٬٥٠٠",
          quarterly: "٣٬٠٠٠",
          currency: "ج.م",
          features: [
            "نظام غذائي مخصص لجسمك وهدفك",
            "وجبات محسوبة بالماكرو",
            "مناسب لطبيعة يومك",
            "دعم رسائل",
          ],
        },
        gold: {
          tier: "ذهبي",
          monthly: "٢٬٥٠٠",
          quarterly: "٥٬٠٠٠",
          currency: "ج.م",
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
          monthly: "٤٬٠٠٠",
          quarterly: "٧٬٠٠٠",
          currency: "ج.م",
          features: [
            "كل مميزات الذهبي",
            "مكالمة تليفون شهرية مع المدرب",
            "دعم أولوية ورد أسرع",
            "متابعة تقدم متقدمة",
            "تعديلات مخصصة في أي وقت",
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
      title1: "بطّل تتصفح.",
      title2: "ابدأ تمرّن.",
      desc: "فصلك الجديد بيبدأ بقرار واحد. تابع كابتن شيكو ونبني حاجة أسطورية — مع بعض.",
      button: "تواصل معانا",
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
    },

    detailedPlans: {
      "elite-transformation": {
        name: "باقة التحول الشامل",
        brief: "الخيار المتكامل لمن يبحث عن نتائج حقيقية وجذرية",
        monthly: "150",
        quarterly: "400",
        currency: "$",
        features: [
          "خطة تدريبية مخصصة: مصممة لهدفك (تضخيم، تنشيف، أو تحسين أداء) ومناسبة لمكان تمرينك (جيم أو بيت).",
          "نظام غذائي مرن: محسوب السعرات والماكروز (بروتين، كارب، دهون) مع وجبات متنوعة تناسب روتينك.",
          "تعديلات دورية: تحديث الخطط أسبوعياً بناءً على تطور جسمك ومدى التزامك.",
          "متابعة لحظية: تواصل مباشر عبر الواتساب للإجابة على أي استفسارات وتصحيح تكنيك التمارين بالفيديو.",
          "ملف المكملات والفيتامينات: توصيات علمية بأفضل المكملات التي يحتاجها جسمك فعلياً.",
          "نظام مرونة المناسبات: كيف تتعامل مع الخروجات أو السفر بدون ما تخرب الدايت."
        ],
        localPricing: { monthly: "3000", quarterly: "6000", currency: "جنيه" },
        globalPricing: { monthly: "150", quarterly: "400", currency: "$", note: "تشمل شهر هدية" }
      },
      "self-starter": {
        name: "الباقة الأساسية",
        brief: "لو عندك خبرة ومحتاج الطريقة الصحيحة عشان تقدر توصل لهدفك",
        monthly: "75",
        quarterly: "200",
        currency: "$",
        features: [
          "برنامج تدريبي مخصصة لهدف المشترك (تنشيف/تضخيم).",
          "خطة نظام غذائي محسوبة السعرات والماكروز.",
          "قائمة بدائل للأطعمة.",
          "بدون متابعة أسبوعية (المتابعة مرة واحدة في الشهر من خلال الواتس أب)."
        ],
        localPricing: { monthly: "1500", quarterly: "3000", currency: "جنيه" },
        globalPricing: { monthly: "75", quarterly: "200", currency: "$" }
      },
      "elite-coaching": {
        name: "باقة الـ VIP",
        brief: "لو محتاج رعاية خاصة جداً وتواصل دائم ونتائج سريعة جدا",
        monthly: "400",
        quarterly: "900",
        currency: "$",
        features: [
          "تواصل مباشر (مكالمة زووم أو تليفون أسبوعية).",
          "تعديل يومي أو لحظي للنظام الغذائي حسب ظروفك (سفر، عزومات).",
          "أولوية في الرد.",
          "عددها محدود."
        ],
        localPricing: { monthly: "5000", quarterly: "12000", currency: "جنيه" },
        globalPricing: { monthly: "400", quarterly: "900", currency: "$" }
      },
      "fuel-and-focus": {
        name: "باقة التغذية الذكية",
        brief: "أصلح علاقتك بالأكل واجعل جسمك ماكينة حرق",
        monthly: "100",
        quarterly: "220",
        currency: "$",
        features: [
          "نظام غذائي علمي: بعيداً عن الحرمان، يعتمد على الأكلات التي تحبها ولكن بالكميات الصحيحة.",
          "جداول بدائل الأطعمة: قائمة مرنة تسمح لك بتغيير وجباتك بنفسك دون الإخلال بالنظام.",
          "حساب الاحتياجات الدقيقة: معرفة سعراتك حسب نشاطك اليومي لضمان الوصول للهدف.",
          "تثقيف غذائي: تتعلم كيف تقرأ الملصقات الغذائية وتختار الأفضل لك.",
          "متابعة الوزن والقياسات: مراجعة أسبوعية لنتائج الجسم ومتابعة أسبوعية على الواتس آب."
        ],
        localPricing: { monthly: "2000", quarterly: "4500", currency: "جنيه" },
        globalPricing: { monthly: "100", quarterly: "220", currency: "$" }
      },
      "power-and-performance": {
        name: "باقة الأداء البدني",
        brief: "اتمرن بذكاء، وليس بجهد فقط",
        monthly: "100",
        quarterly: "220",
        currency: "$",
        features: [
          "برنامج تدريبي متطور: تقسيم حصص التدريب (Splits) بما يضمن أفضل استشفاء عضلي.",
          "تنوع فى التمارين حسب الهدف.",
          "فيديوهات شرح التكنيك: شرح مفصل لكل تمرين لضمان الأمان التام وتجنب الإصابات.",
          "تطوير القوة (Progressive Overload): سيستم لمتابعة تطور أوزانك وقوتك البدنية شهر بعد شهر.",
          "نظام الكارديو والإطالات: خطة لرفع اللياقة القلبية وتحسين مرونة الجسم.",
          "تقييم الأداء: مراجعة فيديوهاتك وأنت تتمرن لتعديل وضعية جسمك ومتابعة أسبوعية على الواتس آب."
        ],
        localPricing: { monthly: "2000", quarterly: "4500", currency: "جنيه" },
        globalPricing: { monthly: "100", quarterly: "220", currency: "$" }
      }
    },
  },
} as const;
