"use client";

import { useLang } from "../../lang-context";
import { Navbar } from "../../navbar";
import { Footer } from "../../footer";
import { ImageWithSkeleton } from "../../image-with-skeleton";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
} from "../../animations";
import { CertificateCarousel } from "../../certificates-carousel";

export function AboutClient({ dbTransformations }: { dbTransformations: any[] }) {
  const { t, locale, dir } = useLang();
  const content = (t as any).aboutPage;

  const transformations = dbTransformations && dbTransformations.length > 0 ? dbTransformations : (t as any).transformationsData.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Hero Section */}
          <section className="mb-32">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-12 xl:col-span-7">
                <FadeUp>
                  <span className="text-sm text-accent-light font-black tracking-[0.3em] uppercase mb-4 block">
                    {locale === "en" ? "Profile & Accreditation" : "الخبرة والاعتماد"}
                  </span>
                  <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-tight mb-8">
                    <span className="gradient-text">{content.hero.title}</span>
                  </h1>
                  <div className="relative p-8 rounded-[2.5rem] bg-surface-light border border-white/5 shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-accent" />
                    <p className="text-muted text-lg lg:text-xl leading-relaxed font-semibold">
                      {content.hero.text}
                    </p>
                  </div>
                </FadeUp>
              </div>
              <div className="lg:col-span-12 xl:col-span-5">
                <ScaleIn delay={0.2}>
                  <div className="relative aspect-square rounded-[3rem] overflow-hidden group glow-border border border-white/5 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                    <ImageWithSkeleton
                      src="/coach-main.jpeg"
                      alt="Captain Mohamed Roshdy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 600px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  </div>
                </ScaleIn>
              </div>
            </div>
          </section>

          {/* Philosophy & Pillars Section */}
          <section className="mb-40">
            <FadeUp>
              <div className="max-w-3xl mb-16">
                <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-8">
                  {content.philosophy.title}
                </h2>
                <p className="text-muted text-xl leading-relaxed font-medium">
                   {content.philosophy.text}
                </p>
              </div>
            </FadeUp>
            
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {[content.philosophy.item1, content.philosophy.item2, content.philosophy.item3].map((item, i) => (
                <StaggerItem key={i}>
                  <div className="h-full p-10 rounded-[2.5rem] bg-surface border border-white/5 hover:border-accent/30 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <span className="text-2xl font-black">{i + 1}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-2 text-foreground group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-black text-accent-light uppercase tracking-widest mb-6">
                      {item.subtitle}
                    </p>
                    <p className="text-muted leading-relaxed font-semibold text-lg">
                      {item.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          {/* Operating Method Section */}
          <section className="mb-40 relative">
            <div className="absolute -left-20 top-0 w-64 h-64 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeUp className="order-2 lg:order-2">
                <div className="relative p-1 rounded-[3rem] bg-gradient-to-br from-accent/20 to-transparent border border-white/5 overflow-hidden">
                    <div className="bg-surface rounded-[2.8rem] p-10">
                        <div className="grid gap-10">
                            {[content.method.item1, content.method.item2, content.method.item3, content.method.item4].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-black">
                                        ✓
                                    </div>
                                    <p className="text-lg font-semibold text-muted-foreground pt-1">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 pt-8 border-t border-white/5">
                            <p className="text-xl font-black italic text-accent">
                                {content.method.summary}
                            </p>
                        </div>
                    </div>
                </div>
              </FadeUp>
              <div className="order-1 lg:order-1">
                <FadeUp>
                    <span className="text-sm text-accent-light font-black tracking-[0.3em] uppercase mb-4 block">
                        {content.method.label}
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-8">
                        {content.method.title}
                    </h2>
                    <p className="text-muted text-xl leading-relaxed font-medium mb-8">
                        {content.method.subtitle}
                    </p>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* Specializations & Approach Section */}
          <section className="mb-40">
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <FadeUp>
                    <div className="h-full p-12 rounded-[3rem] bg-surface-light border border-white/5 relative overflow-hidden group">
                        <h3 className="text-sm font-black text-accent tracking-[0.2em] uppercase mb-6">
                            {content.specializations.subtitle1}
                        </h3>
                        <h2 className="text-3xl font-black mb-6">
                            {content.specializations.title}
                        </h2>
                        <p className="text-muted text-lg font-semibold leading-relaxed">
                            {content.specializations.text1}
                        </p>
                    </div>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <div className="h-full p-12 rounded-[3rem] bg-accent/5 border border-accent/20 relative overflow-hidden group">
                        <h3 className="text-sm font-black text-accent tracking-[0.2em] uppercase mb-6">
                            {content.specializations.subtitle2}
                        </h3>
                        <h2 className="text-3xl font-black mb-6">
                            {content.specializations.coachingTitle}
                        </h2>
                        <p className="text-muted text-lg font-semibold leading-relaxed">
                            {content.specializations.text2}
                        </p>
                    </div>
                </FadeUp>
            </div>
            <FadeUp delay={0.2}>
                <div className="p-12 rounded-[3.5rem] bg-surface border border-white/5 relative overflow-hidden">
                    <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                    <div className="max-w-4xl">
                        <h3 className="text-sm font-black text-accent-light tracking-[0.3em] uppercase mb-4">
                            {content.specializations.authorityTitle}
                        </h3>
                        <p className="text-2xl sm:text-3xl font-black mb-0 leading-tight">
                            {content.specializations.authorityText}
                        </p>
                    </div>
                </div>
            </FadeUp>
          </section>

          {/* The Approach (Al-Manhaj) Section */}
          <section className="mb-40">
            <FadeUp>
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
                         {content.approach.title}
                    </h2>
                    <p className="text-muted max-w-2xl mx-auto font-semibold">
                        {content.approach.subtitle}
                    </p>
                </div>
            </FadeUp>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[content.approach.item1, content.approach.item2, content.approach.item3, content.approach.item4].map((item, i) => (
                    <FadeUp key={i} delay={i * 0.1}>
                        <div className="p-8 rounded-[2rem] bg-surface-light border border-white/5 hover:border-accent/40 transition-colors h-full flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center mb-6 font-black text-xl shadow-lg shadow-accent/20">
                                0{i + 1}
                            </div>
                            <h3 className="text-xl font-black mb-4">{item.title}</h3>
                            <p className="text-muted font-medium">{item.text}</p>
                        </div>
                    </FadeUp>
                ))}
            </div>
          </section>

          {/* Success Stories Section (Transformations) */}
          <section className="mb-40 sm:mb-60">
            <FadeUp>
              <div className="text-center mb-24 sm:mb-32">
                <span className="text-sm text-accent-light font-black tracking-[0.3em] uppercase mb-4 block">
                  {locale === "en" ? "Real Results" : "نتايج حقيقية"}
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter">
                  {(t as any).transformations.title}
                </h2>
                <div className="w-32 h-2 bg-accent mx-auto mt-8 rounded-full" />
                <p className="text-muted mt-8 max-w-xl mx-auto font-semibold text-xl">
                  {(t as any).transformations.desc}
                </p>
              </div>
            </FadeUp>

            <div className="flex flex-col gap-32 sm:gap-52">
              {transformations.map((client: any, i: number) => {
                const isEven = i % 2 === 0;
                
                return (
                  <div 
                    key={client.id || client.name}
                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 sm:gap-24 items-center`}
                  >
                    {/* Image Column */}
                    <div className="w-full lg:w-3/5">
                      <FadeUp delay={0.1}>
                        <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden group glow-border border border-white/10 shadow-3xl">
                          <ImageWithSkeleton
                            src={client.imagePath || client.img}
                            alt={locale === 'ar' ? (client.nameAr || client.name) : (client.nameEn || client.name)}
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            sizes="(max-width: 1024px) 100vw, 800px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                             <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                <span className="text-white font-black uppercase tracking-widest text-xs">Transformation</span>
                             </div>
                          </div>
                        </div>
                      </FadeUp>
                    </div>

                    {/* Text Column */}
                    <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-start">
                      <FadeUp delay={0.2}>
                        <div className="flex items-center gap-6 mb-8 group justify-center lg:justify-start">
                          <span className="text-7xl font-black text-accent opacity-20 group-hover:opacity-100 transition-opacity duration-500">0{i + 1}</span>
                          <div className="h-2 w-24 bg-accent rounded-full group-hover:w-32 transition-all duration-500" />
                        </div>
                        <h3 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">
                            {locale === 'ar' ? (client.nameAr || client.name) : (client.nameEn || client.name)}
                        </h3>
                        <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
                          <span className="px-8 py-3 rounded-full bg-accent text-white text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-accent/30 ring-4 ring-accent/10">
                            {locale === 'ar' ? (client.durationAr || client.duration) : (client.durationEn || client.duration)}
                          </span>
                        </div>
                        <div className="relative">
                            <svg className="absolute -top-6 -left-6 w-12 h-12 text-accent/10 -scale-x-100" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V4L14.017 3H16.017H18.017H21.017C22.1216 3 23.017 3.89543 23.017 5V15C23.017 17.2091 21.2261 19 19.017 19H17.017C16.4647 19 16.017 19.4477 16.017 20V21H14.017ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C8.55228 16 9 15.5523 9 15V9C9 8.44772 8.55228 8 8 8H5C3.89543 8 3 7.10457 3 6V4L3 3H5H7H10C11.1046 3 12 3.89543 12 5V15C12 17.2091 10.2091 19 8 19H6C5.44772 19 5 19.4477 5 20V21H3Z"/>
                            </svg>
                            <p className="text-muted text-xl sm:text-2xl leading-[1.6] font-semibold bg-surface-light p-10 sm:p-12 rounded-[3.5rem] border border-white/5 italic relative overflow-hidden shadow-inner group-hover:border-accent/20 transition-all duration-500">
                                {locale === 'ar' ? (client.resultAr || client.result) : (client.resultEn || client.result)}
                            </p>
                        </div>
                      </FadeUp>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Certificates Section */}
          <section className="mb-40">
            <FadeUp>
              <div className="text-center mb-20">
                <span className="text-xs text-accent-light font-black tracking-[0.4em] uppercase mb-4 block">
                    Verified Excellence
                </span>
                <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
                  {content.certificates.title}
                </h2>
                <div className="w-20 h-2 bg-accent mx-auto mt-8 rounded-full" />
              </div>
              
              <div className="p-4 sm:p-12 rounded-[4rem] bg-surface-light border border-white/5 shadow-3xl">
                <CertificateCarousel />
              </div>
            </FadeUp>
          </section>

          {/* Outro Section */}
          <section className="mb-20">
            <FadeUp>
              <div className="relative p-8 sm:p-14 rounded-[3rem] bg-accent text-white overflow-hidden group shadow-3xl">
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] group-hover:bg-white/20 transition-all duration-700" />
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-black/10 rounded-full blur-[60px]" />
                
                <div className="relative z-10 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-5xl font-black mb-6 leading-tight">
                        {content.outro.title}
                    </h2>
                    <p className="text-lg sm:text-2xl font-medium leading-relaxed opacity-90 italic">
                        {content.outro.text}
                    </p>
                    <div className="mt-10 flex justify-center">
                         <div className="w-16 h-1 bg-white/40 rounded-full" />
                    </div>
                </div>
              </div>
            </FadeUp>
          </section>

        </div>
      </main>

      <Footer />
    </div>

  );
}
