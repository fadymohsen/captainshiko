"use client";

import { useLang } from "../../lang-context";
import { Navbar } from "../../navbar";
import { Footer } from "../../footer";
import { FadeUp, StaggerItem } from "../../animations";
import { Star, MessageSquare } from "lucide-react";
import Link from "next/link";

export function ReviewsClient({ reviews }: { reviews: any[] }) {
  const { t, locale, dir } = useLang();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 relative">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                <span className="gradient-text">{(t as any).reviews.title}</span>
              </h1>
              <p className="text-muted text-lg leading-relaxed font-medium max-w-2xl mx-auto">
                {locale === "en" 
                  ? "See what our champions are saying about their fitness journeys and life transformations."
                  : "شوف أبطالنا بيقولوا إيه عن رحلتهم في التغيير والوصول للياقة البدنية الكاملة."}
              </p>
            </div>
          </FadeUp>

          {reviews.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-10 h-10 text-muted" />
              </div>
              <p className="text-muted italic">{(t as any).reviews.noReviews}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <div key={r.id} className="p-8 rounded-3xl bg-surface-light/20 border border-white/5 hover:border-accent/20 hover:bg-surface-light/30 transition-all duration-500 flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="font-black text-xl group-hover:text-accent-light transition-colors">{r.clientName}</h4>
                        <span className="text-[10px] font-black tracking-[0.1em] uppercase text-accent-light/70 mt-1 block">
                          {locale === "en" ? r.plan.nameEn : r.plan.nameAr}
                        </span>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < r.rating ? 'text-yellow-500 fill-current' : 'text-white/10'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted leading-relaxed font-medium italic">"{r.comment}"</p>
                  </div>
                  <div className="pt-6 border-t border-white/5 mt-8 flex justify-between items-center">
                    <span className="text-[10px] text-muted/60 uppercase font-black tracking-widest">
                      {new Date(r.createdAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
