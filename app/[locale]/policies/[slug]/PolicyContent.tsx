"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface PolicyContentProps {
  title: string;
  content: string;
  locale: string;
  updatedAt: Date;
}

export default function PolicyContent({ title, content, locale, updatedAt }: PolicyContentProps) {
  return (
    <main className="flex-grow pt-32 pb-20 relative">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-[10px] text-accent-light font-black tracking-[0.2em] uppercase mb-6">
              {locale === "en" ? "Legal Protocol" : "البروتوكول القانوني"}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              {title}
            </h1>
            <div className="flex items-center justify-center gap-2 text-xs text-muted font-bold uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-white/10" />
              {locale === "en" ? "Last updated: " : "آخر تحديث: "}
              {new Date(updatedAt).toLocaleDateString(locale === "en" ? 'en-US' : 'ar-EG')}
              <span className="w-8 h-[1px] bg-white/10" />
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          {/* Glass Container */}
          <div className="absolute -inset-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] opacity-50 pointer-events-none" />
          <div className="relative bg-surface-light/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 md:p-16 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
            <div 
              className="prose prose-invert prose-xl max-w-none 
              prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight
              prose-h1:hidden
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-white/5
              prose-p:text-white/60 prose-p:leading-relaxed
              prose-li:text-white/60 prose-strong:text-accent-light prose-strong:font-black
              prose-ul:list-disc prose-ul:marker:text-accent
              "
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          {/* Bottom Decoration */}
          <div className="mt-12 flex justify-center">
            <Link 
              href={`/${locale}`}
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-[.2em] hover:bg-white/10 transition-all active:scale-95"
            >
              {locale === "en" ? "Back to HQ" : "العودة للرئيسية"}
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
