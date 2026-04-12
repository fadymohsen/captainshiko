"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "../../lang-context";
import { Navbar } from "../../navbar";
import { Footer } from "../../footer";
import { ImageWithSkeleton } from "../../image-with-skeleton";

export function TransformationsClient({ dbTransformations }: { dbTransformations: any[] }) {
  const { t, locale, dir } = useLang();
  
  const trans = t.transformationsPage;
  if (!trans) return null;

  const items = dbTransformations && dbTransformations.length > 0 ? dbTransformations : t.transformationsData;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main className={`flex-grow pt-32 pb-20 ${dir === "rtl" ? "rtl" : "ltr"}`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <section className="mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent font-black tracking-[0.3em] uppercase text-sm mb-4 block">
                {trans.title}
              </span>
              <h1 className="text-6xl md:text-8xl font-black uppercase mb-6 tracking-tighter">
                {trans.subtitle.split(" ").map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? "text-accent" : ""}>{word} </span>
                ))}
              </h1>
            </motion.div>
          </section>

          {/* Unified Gallery Section */}
          <section className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-black uppercase whitespace-nowrap">{trans.galleryTitle}</h2>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
                  className="group relative"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/5 bg-white/5 shadow-2xl">
                    <ImageWithSkeleton
                      src={item.imagePath || item.img}
                      alt={locale === 'ar' ? (item.nameAr || item.name) : (item.nameEn || item.name)}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      aspectRatio="aspect-[3/4]"
                    />
                    
                    {/* Persistent Name & Age Info */}
                    <div className="absolute top-4 left-4 right-4 z-20">
                       <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full inline-flex items-center gap-2">
                           <span className="text-xs font-black uppercase tracking-widest text-white">
                                {locale === 'ar' ? (item.nameAr || item.name) : (item.nameEn || item.name)}
                           </span>
                           {(item.age) && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-accent" />
                              <span className="text-xs font-bold text-white/70">{item.age} {t.hero.statsYears || "Years"}</span>
                            </>
                           )}
                       </div>
                    </div>

                    {/* Result Overlay on Hover */}
                    <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                      <div className="bg-accent/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl">
                        <p className="text-sm font-bold text-white leading-relaxed italic">
                          "{locale === 'ar' ? (item.resultAr || item.result) : (item.resultEn || item.result)}"
                        </p>
                      </div>
                    </div>

                    {/* Permanent Gradient for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section>
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] -mr-48 -mt-48" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase max-w-2xl mx-auto leading-tight">
                  {trans.ctaTitle}
                </h2>
                <Link
                  href="https://wa.me/+201275333118"
                  target="_blank"
                  className="inline-flex items-center gap-3 bg-accent text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-accent-light transition-all shadow-[0_20px_50px_rgba(165,34,34,0.3)] hover:-translate-y-1 active:scale-95"
                >
                  {trans.ctaButton}
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
