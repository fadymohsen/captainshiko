"use client";

import { useState } from "react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden mb-6 flex justify-between items-center border-b border-white/5 pb-4 relative z-50">
        <h2 className="text-xl font-black">Admin<span className="text-accent">Panel</span></h2>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
        >
          <span className={`w-6 h-0.5 bg-foreground block transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-foreground block transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-6 h-0.5 bg-foreground block transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[70px] z-40 bg-background/95 backdrop-blur-xl border-t border-white/5 px-6 pt-8 overflow-y-auto pb-20">
          <nav className="flex flex-col gap-4">
            <Link onClick={() => setIsOpen(false)} href="/admin/dashboard" className="py-4 px-6 rounded-xl bg-white/5 text-lg font-bold tracking-wider hover:bg-white/10 transition-colors">Dashboard</Link>
            <Link onClick={() => setIsOpen(false)} href="/admin/dashboard/plans" className="py-4 px-6 rounded-xl border border-white/5 text-lg font-bold tracking-wider hover:bg-white/10 transition-colors">Services & Plans</Link>
            <Link onClick={() => setIsOpen(false)} href="/admin/dashboard/transformations" className="py-4 px-6 rounded-xl border border-white/5 text-lg font-bold tracking-wider hover:bg-white/10 transition-colors">Transformations</Link>
            <Link onClick={() => setIsOpen(false)} href="/admin/dashboard/faqs" className="py-4 px-6 rounded-xl border border-white/5 text-lg font-bold tracking-wider hover:bg-white/10 transition-colors">FAQs</Link>
            <Link onClick={() => setIsOpen(false)} href="/admin/dashboard/coupons" className="py-4 px-6 rounded-xl border border-white/5 text-lg font-bold tracking-wider hover:bg-white/10 transition-colors">Coupons</Link>
            <Link onClick={() => setIsOpen(false)} href="/admin/dashboard/policies" className="py-4 px-6 rounded-xl border border-white/5 text-lg font-bold tracking-wider hover:bg-white/10 transition-colors">Policies</Link>
            <Link onClick={() => setIsOpen(false)} href="/admin/dashboard/purchases" className="py-4 px-6 rounded-xl border border-white/5 text-lg font-bold tracking-wider hover:bg-white/10 transition-colors">Purchases</Link>
            <Link onClick={() => setIsOpen(false)} href="/admin/dashboard/reviews" className="py-4 px-6 rounded-xl border border-white/5 text-lg font-bold tracking-wider hover:bg-white/10 transition-colors">Reviews</Link>
            
            <div className="mt-8">
              <SignOutButton className="w-full py-4 px-6 rounded-xl border border-red-500/20 text-red-400 text-lg font-bold tracking-wider hover:bg-red-500/10 transition-colors" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
