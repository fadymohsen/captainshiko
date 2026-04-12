"use client";

import { useLang } from "../../lang-context";
import { Navbar } from "../../navbar";
import { Footer } from "../../footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "../../animations";

export function FaqClient({ faqs }: { faqs: any[] }) {
  const { locale, dir } = useLang();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 relative">
        <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-accent/10 glow-pulse pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-sm text-accent-light font-bold tracking-wider uppercase">
                {locale === "en" ? "Support Center" : "مركز المساعدة"}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black mt-4 mb-6 leading-tight">
                <span className="gradient-text">FAQ</span>
              </h1>
              <p className="text-muted text-lg leading-relaxed">
                {locale === "en" 
                  ? "Everything you need to know about our coaching programs and how we work."
                  : "كل اللي محتاج تعرفه عن برامج التدريب وطريقة شغلنا."}
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              const question = locale === "en" ? faq.questionEn : faq.questionAr;
              const answer = locale === "en" ? faq.answerEn : faq.answerAr;

              return (
                <StaggerItem key={faq.id}>
                  <div className="rounded-2xl border border-white/5 bg-surface-light overflow-hidden transition-colors hover:border-accent/30">
                    <button
                      onClick={() => toggle(faq.id)}
                      className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4"
                    >
                      <h3 className="text-lg sm:text-xl font-bold leading-tight">{question}</h3>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-accent/20 text-accent-light' : ''}`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 border-t border-white/5">
                            <p className="text-muted leading-relaxed mt-6">
                              {answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
