"use client";

import { useLang } from "../../../lang-context";
import { Navbar } from "../../../navbar";
import { Footer } from "../../../footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  FadeUp,
  ScaleIn,
  StaggerItem,
  MagneticButton,
} from "../../../animations";
import { ImageWithSkeleton } from "../../../image-with-skeleton";
import { X, CreditCard, Loader2, Smartphone, Receipt, CheckCircle2 } from "lucide-react";

export function PlanDetailClient({ plan }: { plan: any }) {
  const { t, locale, dir, region } = useLang();
  
  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [planType, setPlanType] = useState<"monthly" | "quarterly">("monthly");
  const [paymentMethodId, setPaymentMethodId] = useState<number>(2); // Default to Card
  const [loading, setLoading] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: ""
  });

  const currentPricing = region === "egypt" ? {
    monthly: plan.priceMonthlyEgp,
    quarterly: plan.priceQuarterlyEgp,
    currency: "EGP",
  } : {
    monthly: plan.priceMonthlyUsd,
    quarterly: plan.priceQuarterlyUsd,
    currency: "USD",
  };

  const name = locale === 'en' ? plan.nameEn : plan.nameAr;
  const brief = locale === 'en' ? plan.briefEn : plan.briefAr;
  const features = JSON.parse(locale === 'en' ? plan.featuresEn : plan.featuresAr);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          planType,
          paymentMethodId,
          clientName: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          region
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Payment failed");
      }
      
      if (data.url && paymentMethodId === 2) {
        window.location.href = data.url;
        if (data.invoiceId) {
          localStorage.setItem("lastPurchaseId", data.invoiceId.toString());
        }
        setPaymentResponse(data);
        setLoading(false);
      } else {
        // For non-redirect methods (Fawry/Wallet success screen)
        setPaymentResponse(data);
        setLoading(false);
      }
    } catch (err: any) {
      alert("Error Details: " + (err.message || "Unknown Error"));
      setLoading(false);
    }
  };

  const ct = (t as any).checkout;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 relative">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          
          <FadeUp>
            <Link 
              href={`/${locale}/plans`} 
              className="inline-flex items-center gap-2 text-muted hover:text-accent-light transition-colors mb-12 group"
            >
              <svg className={`w-4 h-4 transition-transform group-hover:${dir === 'rtl' ? 'translate-x-1' : '-translate-x-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dir === 'rtl' ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
              </svg>
              <span className="text-sm font-bold uppercase tracking-widest">
                {locale === "en" ? "Back to Plans" : "العودة للباقات"}
              </span>
            </Link>
          </FadeUp>

          <section className="mb-20">
            <div className="max-w-4xl">
              <FadeUp>
                <span className="inline-block text-accent-light font-black text-xs tracking-[0.3em] uppercase mb-4">
                  {locale === "en" ? "Elite Performance" : "أداء احترافي"}
                </span>
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8">
                  <span className="gradient-text">{name}</span>
                </h1>
                <p className="text-muted text-xl lg:text-2xl leading-relaxed max-w-2xl font-medium border-l-2 border-accent/30 pl-6 py-2">
                  {brief}
                </p>
              </FadeUp>
            </div>
          </section>

          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-7 space-y-20">
              <section>
                <FadeUp>
                  <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-2xl font-black uppercase tracking-tight">
                      {locale === "en" ? "The Program" : "محتويات البرنامج"}
                    </h2>
                    <div className="h-px flex-grow bg-white/10" />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    {features.map((feature: string, idx: number) => (
                      <StaggerItem key={idx}>
                        <div className="h-full p-6 rounded-2xl bg-surface-light/30 border border-white/5 hover:border-accent/20 transition-all group">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-muted leading-relaxed font-semibold text-sm sm:text-base">
                            {feature}
                          </p>
                        </div>
                      </StaggerItem>
                    ))}
                  </div>
                </FadeUp>
              </section>

              <section className="relative">
                <FadeUp>
                  <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-2xl font-black uppercase tracking-tight">
                      {locale === "en" ? "Visual Guide" : "دليل مرئي"}
                    </h2>
                    <div className="h-px flex-grow bg-white/10" />
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-x-0 -inset-y-4 bg-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative aspect-[9/16] max-w-[400px] mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden bg-surface-light border-4 border-white/5 shadow-2xl">
                      <ImageWithSkeleton
                        src="/hero-coach.jpg"
                        alt="Visual Guide"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        aspectRatio="aspect-[9/16]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80 flex flex-col items-center justify-center p-10 text-center z-20">
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }} 
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-20 h-20 rounded-full bg-accent text-white flex items-center justify-center mb-6 cursor-pointer hover:bg-accent-light"
                        >
                          <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </motion.div>
                        <h4 className="text-lg font-black uppercase tracking-[0.2em] mb-2">Reel Concept</h4>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              </section>
            </div>

            <div className="lg:col-span-5 relative lg:h-full">
              <div className="lg:sticky lg:top-32">
                <ScaleIn>
                  <div className="rounded-[2.5rem] p-10 bg-surface-light border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-[60px] -ml-16 -mb-16" />

                    <div className="relative z-10 text-center lg:text-left">
                      <h3 className="text-2xl font-black mb-8">
                        {locale === "en" ? "Secure Your Spot" : "احجز مكانك الآن"}
                      </h3>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={region}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.4 }}
                          className="space-y-6"
                        >
                          <div className="group relative">
                            <div className="p-8 rounded-3xl bg-background/40 border border-white/5 flex flex-col items-center lg:items-start group-hover:border-accent/20 transition-all">
                              <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-2">
                                {locale === "en" ? "Monthly" : "شهرياً"}
                              </span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black group-hover:text-foreground transition-colors">{currentPricing.monthly || 'N/A'}</span>
                                <span className="text-xl font-bold text-muted">{currentPricing.currency}</span>
                              </div>
                            </div>
                          </div>

                          <div className="group relative">
                            <div className="absolute -top-3 -right-3 sm:-right-4 bg-accent text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter z-20 shadow-xl rotate-3">
                              {locale === "en" ? "Best Value" : "الأكثر توفيراً"}
                            </div>
                            <div className="p-8 rounded-3xl bg-accent/[0.03] border border-accent/20 flex flex-col items-center lg:items-start group-hover:bg-accent/5 transition-all">
                              <span className="text-[10px] font-black text-accent-light uppercase tracking-[0.2em] mb-2">
                                {locale === "en" ? "3 Months Bundle" : "باقة ٣ شهور"}
                              </span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-accent-light">{currentPricing.quarterly || 'N/A'}</span>
                                <span className="text-xl font-bold text-muted">{currentPricing.currency}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      <div className="mt-12 space-y-4 relative z-10">
                        <MagneticButton>
                          <button
                            onClick={() => setIsCheckoutOpen(true)}
                            className="w-full block text-center bg-white text-background font-black py-5 rounded-2xl text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all shadow-xl active:scale-95"
                          >
                            {locale === "en" ? "Start Transformation" : "ابدأ التحول الآن"}
                          </button>
                        </MagneticButton>
                        <p className="text-[10px] text-muted text-center tracking-tight">
                          * Fast & secure checkout. Instant access after payment.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScaleIn>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Checkout Modal Replicated from PlansClient */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-surface-light border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
              dir={dir}
            >
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!paymentResponse ? (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{ct.title}</h2>
                      <p className="text-sm text-muted">
                        {name} • <span className="text-xs text-accent uppercase font-black">{region}</span>
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleCheckout} className="space-y-6">
                    <div className="grid grid-cols-2 gap-3 p-1 bg-background/50 rounded-2xl border border-white/5">
                      <button
                        type="button"
                        onClick={() => setPlanType("monthly")}
                        className={`py-3 rounded-xl text-sm font-bold transition-all ${planType === "monthly" ? "bg-accent text-white shadow-lg shadow-accent/20" : "text-muted hover:bg-white/5"}`}
                      >
                        {ct.monthly}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPlanType("quarterly")}
                        className={`py-3 rounded-xl text-sm font-bold transition-all ${planType === "quarterly" ? "bg-accent text-white shadow-lg shadow-accent/20" : "text-muted hover:bg-white/5"}`}
                      >
                        {ct.quarterly}
                      </button>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted uppercase tracking-widest block mb-3 px-1">{ct.paymentMethod}</label>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethodId(2)}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${paymentMethodId === 2 ? "bg-accent/10 border-accent text-accent" : "bg-background border-white/5 text-muted hover:border-white/10"}`}
                        >
                          <CreditCard className="w-6 h-6 mb-2" />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">{ct.card}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethodId(3)}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${paymentMethodId === 3 ? "bg-accent/10 border-accent text-accent" : "bg-background border-white/5 text-muted hover:border-white/10"}`}
                        >
                          <Receipt className="w-6 h-6 mb-2" />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">{ct.fawry}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethodId(4)}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${paymentMethodId === 4 ? "bg-accent/10 border-accent text-accent" : "bg-background border-white/5 text-muted hover:border-white/10"}`}
                        >
                          <Smartphone className="w-6 h-6 mb-2" />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">{ct.wallet}</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-background border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/50 transition-colors text-sm"
                        placeholder={ct.fullName}
                      />
                      <input
                        required
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        className="w-full bg-background border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/50 transition-colors text-sm"
                        placeholder={ct.whatsapp}
                      />
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-background border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/50 transition-colors text-sm"
                        placeholder={ct.email}
                      />
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <div className="flex justify-between items-center mb-6 px-1">
                        <span className="text-muted">{ct.total}</span>
                        <span className="text-2xl font-black">
                          {region === "egypt" 
                            ? (planType === "monthly" ? plan.priceMonthlyEgp : plan.priceQuarterlyEgp)
                            : (planType === "monthly" ? plan.priceMonthlyUsd : plan.priceQuarterlyUsd)
                          } {currentPricing.currency}
                        </span>
                      </div>

                      <MagneticButton>
                        <button
                          disabled={loading}
                          className="w-full py-5 rounded-full bg-white text-black font-black flex items-center justify-center gap-2 hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : ct.continue}
                        </button>
                      </MagneticButton>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mx-auto mb-6 border border-green-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-black mb-4">{ct.orderCreated}</h2>
                  <p className="text-muted mb-8 leading-relaxed">
                    {paymentMethodId === 3 ? ct.fawryNote : ct.walletNote}
                  </p>
                  
                  <div className="bg-background rounded-3xl p-8 mb-8 border border-white/5">
                    <div className="text-sm text-muted uppercase tracking-widest mb-2">{ct.referenceCode}</div>
                    <div className="text-5xl font-black text-accent tracking-tighter">
                      {paymentResponse.paymentData?.fawryCode || paymentResponse.paymentData?.meezaReference || "REF-" + paymentResponse.invoiceId}
                    </div>
                  </div>

                  <Link
                    href={`/${locale}/payment/success?purchaseId=${paymentResponse.invoiceId}`}
                    className="block w-full py-5 rounded-full bg-accent text-white font-black hover:bg-accent-light transition-all shadow-lg shadow-accent/20"
                  >
                    {ct.paidButton}
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
