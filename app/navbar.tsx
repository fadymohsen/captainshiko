"use client";

import Link from "next/link";
import { useLang } from "./lang-context";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { locale, t, dir } = useLang();
  const otherLocale = locale === "en" ? "ar" : "en";
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-muted uppercase tracking-widest">
            {navLinks.map((link) => (
              link.isLink ? (
                <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">{link.name}</Link>
              ) : (
                <a key={link.href} href={link.href} className="hover:text-foreground transition-colors">{link.name}</a>
              )
            ))}
          </div>

          {/* Actions & Hamburger */}
          <div className="flex items-center gap-3 relative z-[110]">
            <div className="hidden md:flex items-center gap-3">
              <Link
                href={`/${otherLocale}`}
                className="text-[10px] font-black border border-white/15 px-4 py-1.5 rounded-full text-muted hover:text-foreground hover:border-white/30 transition-all uppercase tracking-widest bg-white/5"
              >
                {locale === "en" ? "عربي" : "EN"}
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
              <div className="flex flex-col gap-4">
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
                        className="text-[10vw] sm:text-[8vw] md:text-6xl font-black uppercase tracking-tighter hover:text-accent transition-colors block leading-none"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a 
                        href={link.href} 
                        onClick={() => setIsOpen(false)}
                        className="text-[10vw] sm:text-[8vw] md:text-6xl font-black uppercase tracking-tighter hover:text-accent transition-colors block leading-none"
                      >
                        {link.name}
                      </a>
                    )}
                  </motion.div>
                ))}
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
                    href={`/${otherLocale}`}
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-4 py-4 rounded-2xl border border-white/10 text-muted hover:text-foreground hover:bg-white/5 transition-all text-sm font-black uppercase tracking-[0.2em]"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    {locale === "en" ? "عربي" : "English"}
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
