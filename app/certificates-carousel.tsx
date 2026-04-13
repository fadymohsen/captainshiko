"use client";

import { useState } from "react";
import { ImageWithSkeleton } from "./image-with-skeleton";
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
      {/* Container */}
      <div className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <ImageWithSkeleton
              src={certificates[currentIndex]}
              alt={`Certificate ${currentIndex + 1}`}
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 800px"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Overlays */}
        <button 
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent transition-all opacity-0 group-hover:opacity-100 hidden sm:flex z-10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent transition-all opacity-0 group-hover:opacity-100 hidden sm:flex z-10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button onClick={prev} className="sm:hidden p-2 text-white/40 hover:text-accent">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        
        <div className="flex gap-2">
          {certificates.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentIndex === i ? "w-6 bg-accent" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

        <button onClick={next} className="sm:hidden p-2 text-white/40 hover:text-accent">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
      </div>
    </div>
  );
}
