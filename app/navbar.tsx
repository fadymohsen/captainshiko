"use client";

import Link from "next/link";
import { useLang } from "./lang-context";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { locale, t, dir } = useLang();
  const pathname = usePathname();
  
  // Construct path for the other locale
  const getOtherLocalePath = () => {
    if (!pathname) return `/${otherLocale}`;
    const segments = pathname.split('/');
    segments[1] = otherLocale; // replace current locale segment
    return segments.join('/');
  };

  const otherLocale = locale === "en" ? "ar" : "en";
  const [isOpen, setIsOpen] = useState(false);
  const [isMobilePoliciesOpen, setIsMobilePoliciesOpen] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: t.nav.home, href: `/${locale}`, isLink: true },
    { name: t.nav.aboutMe, href: `/${locale}/about`, isLink: true },
    { name: t.nav.plans, href: `/${locale}/plans`, isLink: true },
    { name: t.transformationsPage.title, href: `/${locale}/transformations`, isLink: true },
    { name: locale === 'en' ? 'FAQ' : 'الأسئلة الشائعة', href: `/${locale}/faq`, isLink: true },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href={`/${locale}/#top`} 
            className="text-xl font-extrabold tracking-tight relative z-[110]" 
            onClick={() => {
              setIsOpen(false);
              if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Captain Shiko<span className="text-accent">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm font-bold text-white uppercase tracking-widest">
            {navLinks.map((link) => (
              link.isLink ? (
                <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">{link.name}</Link>
              ) : (
                <a key={link.href} href={link.href} className="hover:text-foreground transition-colors">{link.name}</a>
              )
            ))}

            {/* Policies Dropdown - Desktop */}
            <div className="relative group p-4 -m-4">
              <button className="flex items-center gap-1 hover:text-foreground transition-colors uppercase">
                {locale === 'en' ? 'Policies' : 'السياسات'}
                <svg className="w-3 h-3 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full right-0 mt-0 w-48 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
                <Link href={`/${locale}/policies/terms`} className="block px-5 py-3 hover:bg-white/5 hover:text-accent-light transition-colors">{locale === 'en' ? 'Terms' : 'شروط الخدمة'}</Link>
                <Link href={`/${locale}/policies/privacy`} className="block px-5 py-3 hover:bg-white/5 hover:text-accent-light transition-colors">{locale === 'en' ? 'Privacy' : 'الخصوصية'}</Link>
                <Link href={`/${locale}/policies/refund`} className="block px-5 py-3 hover:bg-white/5 hover:text-accent-light transition-colors">{locale === 'en' ? 'Refund Policy' : 'سياسة الاسترجاع'}</Link>
              </div>
            </div>
          </div>

          {/* Actions & Hamburger */}
          <div className="flex items-center gap-3 relative z-[110]">
            <div className="hidden md:flex items-center gap-3">
              <Link
                href={getOtherLocalePath()}
                className="group flex items-center gap-2 text-[10px] font-black border border-white/20 px-4 py-1.5 rounded-full text-white hover:border-accent/50 hover:bg-accent/10 transition-all uppercase tracking-widest bg-white/[0.03] shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="relative z-10">{locale === "en" ? "عربي" : "EN"}</span>
              </Link>
              <Link
                href={`/${locale}/plans`}
                className="bg-accent text-white text-[10px] font-black px-6 py-2 rounded-full hover:bg-accent-light transition-all duration-300 tracking-widest uppercase shadow-lg shadow-accent/20"
              >
                {t.nav.signUp}
              </Link>
            </div>

            {/* Hamburger Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 md:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-foreground block origin-center transition-all"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="w-6 h-0.5 bg-foreground block transition-all"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-foreground block origin-center transition-all"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? "-100%" : "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir === 'rtl' ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className={`fixed inset-0 z-[90] bg-background/98 backdrop-blur-3xl flex flex-col px-10 pt-32 pb-12 ${dir === 'rtl' ? 'rtl' : 'ltr'}`}
          >
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-accent/10 via-transparent to-transparent pointer-events-none" />

            <div className="flex flex-col h-full relative z-10">
              {/* Staggered Navigation */}
              <div className="flex flex-col gap-4 overflow-y-auto pr-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                  >
                    {link.isLink ? (
                      <Link 
                        href={link.href} 
                        onClick={() => setIsOpen(false)}
                        className="text-[7.5vw] sm:text-[6vw] md:text-5xl font-black uppercase tracking-tighter hover:text-accent transition-colors block leading-none"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a 
                        href={link.href} 
                        onClick={() => setIsOpen(false)}
                        className="text-[7.5vw] sm:text-[6vw] md:text-5xl font-black uppercase tracking-tighter hover:text-accent transition-colors block leading-none"
                      >
                        {link.name}
                      </a>
                    )}
                  </motion.div>
                ))}

                {/* Mobile Policies Dropdown/List */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 + 0.2, duration: 0.5 }}
                >
                  <button 
                    onClick={() => setIsMobilePoliciesOpen(!isMobilePoliciesOpen)}
                    className="w-full text-left flex items-center justify-between text-[7.5vw] sm:text-[6vw] md:text-5xl font-black uppercase tracking-tighter hover:text-accent transition-colors block leading-none"
                  >
                    <span>{locale === 'en' ? 'Policies' : 'السياسات'}</span>
                    <svg className={`w-8 h-8 transition-transform duration-300 ${isMobilePoliciesOpen ? 'rotate-180 text-accent' : 'text-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  
                  <AnimatePresence>
                    {isMobilePoliciesOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-6"
                      >
                        <div className="flex flex-col gap-5 pl-4 border-l-2 border-white/10">
                          <Link href={`/${locale}/policies/terms`} onClick={() => setIsOpen(false)} className="text-2xl font-black uppercase tracking-tighter hover:text-accent-light transition-colors">{locale === 'en' ? 'Terms Of Service' : 'شروط الخدمة'}</Link>
                          <Link href={`/${locale}/policies/privacy`} onClick={() => setIsOpen(false)} className="text-2xl font-black uppercase tracking-tighter hover:text-accent-light transition-colors">{locale === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</Link>
                          <Link href={`/${locale}/policies/refund`} onClick={() => setIsOpen(false)} className="text-2xl font-black uppercase tracking-tighter hover:text-accent-light transition-colors">{locale === 'en' ? 'Refund Policy' : 'سياسة الاسترجاع'}</Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Bottom Actions Cluster */}
              <div className="mt-auto flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-px bg-white/10 w-full origin-left"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href={`/${locale}/plans`}
                    onClick={() => setIsOpen(false)}
                    className="w-full block text-center bg-accent text-white py-5 rounded-2xl text-lg font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(165,34,34,0.4)] active:scale-95 transition-all"
                  >
                    {t.nav.signUp}
                  </Link>
                </motion.div>

                {/* Lang Selector */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link
                    href={getOtherLocalePath()}
                    onClick={() => setIsOpen(false)}
                    className="group relative overflow-hidden w-full flex items-center justify-center gap-4 py-4 rounded-2xl border border-white/20 text-white hover:border-accent/50 hover:bg-accent/10 transition-all text-sm font-black uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    <svg className="w-5 h-5 text-accent relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span className="relative z-10">{locale === "en" ? "عربي" : "English"}</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
