"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const certificates = [
  "/certficates/cert-1.jpeg",
  "/certficates/cert-2.jpeg",
  "/certficates/cert-3.jpeg",
  "/certficates/cert-4.jpeg",
  "/certficates/cert-5.jpeg",
  "/certficates/cert-6.jpeg",
];

export function CertificateCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % certificates.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto group">
      {/* Main Slide Container */}
      <div className="relative aspect-[4/3] sm:aspect-[16/9] rounded-[2.5rem] overflow-hidden bg-surface-light border border-white/5 shadow-2xl overflow-hidden shadow-accent/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-12"
          >
            {/* Certificate Frame */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden glassmorphism shadow-2xl flex items-center justify-center bg-black/40">
              <Image
                src={certificates[currentIndex]}
                alt={`Certificate ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 800px"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Overlays (Desktop Hover) */}
        <button 
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-foreground hover:bg-accent hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden sm:flex z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-foreground hover:bg-accent hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden sm:flex z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicators & Mobile Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button onClick={prev} className="sm:hidden w-10 h-10 rounded-full bg-surface-light border border-white/10 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        
        <div className="flex gap-2.5">
          {certificates.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? "w-8 bg-accent" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button onClick={next} className="sm:hidden w-10 h-10 rounded-full bg-surface-light border border-white/10 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
      </div>
    </div>
  );
}
