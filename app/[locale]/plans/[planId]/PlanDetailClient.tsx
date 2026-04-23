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
import { X, CreditCard, Loader2, Receipt, CheckCircle2, Smartphone, Upload, ImageIcon } from "lucide-react";

export function PlanDetailClient({ plan }: { plan: any }) {
  const { t, locale, dir, region } = useLang();

  const getVideoEmbedUrl = (url: string | null) => {
    if (!url) return null;
    
    // YouTube Shorts
    if (url.includes('youtube.com/shorts/') || url.includes('youtu.be/')) {
      const id = url.split('shorts/')[1]?.split('?')[0] || url.split('/').pop()?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0&modestbranding=1`;
    }
    
    // Instagram Reels
    if (url.includes('instagram.com/reel/') || url.includes('instagram.com/reels/')) {
      const id = url.split('/reel/')[1]?.split('/')[0] || url.split('/reels/')[1]?.split('/')[0];
      return `https://www.instagram.com/reel/${id}/embed`;
    }

    return null;
  };

  const videoEmbedUrl = getVideoEmbedUrl(plan.videoUrl);
  
  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [planType, setPlanType] = useState<"monthly" | "quarterly">("monthly");
  const [paymentMethodId, setPaymentMethodId] = useState<number | "instapay">(2); // Default to Card
  const [loading, setLoading] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: ""
  });
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  // InstaPay Flow state
  const [instapayStep, setInstapayStep] = useState<"idle" | "instructions" | "done">("idle");
  const [instapaypurchaseId, setInstapayPurchaseId] = useState<string | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);

  const handleInstapayConfirm = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-instapay-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          planType,
          clientName: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          region,
          couponCode: appliedCoupon ? couponCode : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order");
      
      setInstapayPurchaseId(data.purchaseId);
      if (data.purchaseId) {
        localStorage.setItem("lastPurchaseId", data.purchaseId);
      }
      
      window.open("https://ipn.eg/S/mohamed.hussein4920/instapay/3f1Dxi", "_blank");
      setInstapayStep("done");
    } catch (err: any) {
      alert("Error: " + (err.message || "Unknown Error"));
    } finally {
      setLoading(false);
    }
  };

  const currentPricing = region === "egypt" ? {
    monthly: plan.priceMonthlyEgp,
    monthlySale: plan.salePriceMonthlyEgp,
    quarterly: plan.priceQuarterlyEgp,
    quarterlySale: plan.salePriceQuarterlyEgp,
    currency: "EGP",
  } : {
    monthly: plan.priceMonthlyUsd,
    monthlySale: plan.salePriceMonthlyUsd,
    quarterly: plan.priceQuarterlyUsd,
    quarterlySale: plan.salePriceQuarterlyUsd,
    currency: "USD",
  };

  const name = locale === 'en' ? plan.nameEn : plan.nameAr;
  const brief = locale === 'en' ? plan.briefEn : plan.briefAr;
  const features = JSON.parse(locale === 'en' ? plan.featuresEn : plan.featuresAr);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    // InstaPay: show instructions popup
    if (paymentMethodId === "instapay") {
      setInstapayStep("instructions");
      return;
    }

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
          region,
          locale,
          couponCode: appliedCoupon ? couponCode : undefined
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Payment failed");
      }

      // Save IDs before navigating away
      if (data.invoiceId) {
        localStorage.setItem("lastInvoiceId", data.invoiceId.toString());
      }
      if (data.purchaseId) {
        localStorage.setItem("lastPurchaseId", data.purchaseId);
      }

      if (data.url && paymentMethodId === 2) {
        // Card / Apple Pay: redirect to Fawaterak payment page
        window.location.href = data.url;
        setPaymentResponse(data);
        setLoading(false);
      } else {
        // Fawry: show reference code modal
        setPaymentResponse(data);
        setLoading(false);
      }
    } catch (err: any) {
      alert("Error Details: " + (err.message || "Unknown Error"));
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsValidatingCoupon(true);
    setCouponError("");
    setAppliedCoupon(null);

    try {
      const res = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          code: couponCode, 
          planId: plan.id,
          email: formData.email,
          whatsapp: formData.whatsapp
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setAppliedCoupon(data);
    } catch (err: any) {
      setCouponError(err.message);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const getDiscountedPrice = (price: string | null) => {
    if (!price) return 0;
    const base = parseFloat(price);
    if (!appliedCoupon) return base;

    if (appliedCoupon.type === 'PERCENTAGE') {
      return base * (1 - appliedCoupon.value / 100);
    }
    return Math.max(0, base - appliedCoupon.value);
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

          {/* Centered Reel Section */}
          <section className="relative mb-24">
            <FadeUp>
              <div className="relative group max-w-[400px] mx-auto">
                <div className="absolute inset-x-0 -inset-y-4 bg-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-surface-light border-4 border-white/5 shadow-2xl">
                  {videoEmbedUrl ? (
                    <iframe
                      src={videoEmbedUrl}
                      className="w-full h-full"
                      allow="accelerometer; border-none; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Plan Video Guide"
                    />
                  ) : (
                    <>
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
                        <h4 className="text-lg font-black uppercase tracking-[0.2em] mb-2">
                          {locale === 'en' ? 'Video Guide Coming Soon' : 'دليل مرئي قريباً'}
                        </h4>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </FadeUp>
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
                                {currentPricing.monthlySale ? (
                                  <>
                                    <span className="text-5xl font-black text-accent-light">{currentPricing.monthlySale}</span>
                                    <span className="text-xl font-bold text-muted line-through opacity-50">{currentPricing.monthly}</span>
                                  </>
                                ) : (
                                  <span className="text-5xl font-black group-hover:text-foreground transition-colors">{currentPricing.monthly || 'N/A'}</span>
                                )}
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
                                {currentPricing.quarterlySale ? (
                                  <>
                                    <span className="text-5xl font-black text-accent-light">{currentPricing.quarterlySale}</span>
                                    <span className="text-xl font-bold text-muted line-through opacity-50">{currentPricing.quarterly}</span>
                                  </>
                                ) : (
                                  <span className="text-5xl font-black text-accent-light">{currentPricing.quarterly || 'N/A'}</span>
                                )}
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
              className="relative w-full max-w-lg bg-surface-light border border-white/10 rounded-3xl p-4 sm:p-8 shadow-2xl overflow-y-auto max-h-[75vh] sm:max-h-[90vh]"
              dir={dir}
            >
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className={`absolute top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} p-2 rounded-full hover:bg-white/5 text-muted transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>

              {instapayStep === "instructions" ? (
                <div className="py-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{ct.instapayTitle}</h2>
                      <p className="text-sm text-muted">{name}</p>
                    </div>
                  </div>

                  <div className="bg-background/50 rounded-2xl p-6 border border-white/5 mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">{locale === 'en' ? 'Instructions' : 'التعليمات'}</h3>
                    <p className="text-muted text-sm leading-relaxed whitespace-pre-line">{ct.instapayInstructions}</p>
                  </div>

                  <button
                    onClick={handleInstapayConfirm}
                    disabled={loading}
                    className="w-full py-5 rounded-full bg-white text-black font-black flex items-center justify-center gap-2 hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : ct.instapayConfirm}
                  </button>
                </div>
              ) : instapayStep === "done" ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mx-auto mb-6 border border-green-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-black mb-4">{ct.instapayDoneTitle}</h2>
                  <p className="text-muted mb-8 leading-relaxed">{ct.instapayDoneNote}</p>
                  
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/201553038830?text=${encodeURIComponent(
                        locale === "en" 
                          ? `Hi Coach Mohamed! I've just paid via InstaPay for the ${name} plan. Here is my receipt. (Purchase ID: ${instapaypurchaseId || 'N/A'})`
                          : `أهلاً كوتش محمد! لسه دافع عن طريق إنستاباي لباقة ${name}. ده إيصال الدفع. (رقم العملية: ${instapaypurchaseId || 'N/A'})`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-5 rounded-full bg-[#25D366] text-white font-black hover:bg-[#20ba5a] transition-all shadow-lg shadow-green-500/20"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      {ct.sendToWhatsapp}
                    </a>
                    <button
                      onClick={() => { setIsCheckoutOpen(false); setInstapayStep("idle"); }}
                      className="block w-full py-4 text-sm font-bold text-muted hover:text-white transition-all"
                    >
                      {ct.backToPlans}
                    </button>
                  </div>
                </div>
              ) : !paymentResponse ? (
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

                  <form onSubmit={handleCheckout} className="space-y-4 sm:space-y-6">
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
                          onClick={() => setPaymentMethodId("instapay")}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${paymentMethodId === "instapay" ? "bg-accent/10 border-accent text-accent" : "bg-background border-white/5 text-muted hover:border-white/10"}`}
                        >
                          <Smartphone className="w-6 h-6 mb-2" />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">{ct.instapay}</span>
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

                    <div className="space-y-3">
                      <label className="text-xs font-bold text-muted uppercase tracking-widest block px-1">
                        {locale === 'en' ? 'Promo Code' : 'كود الخصم'}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="flex-1 bg-background border border-white/5 rounded-2xl px-5 py-3 focus:outline-none focus:border-accent/50 transition-colors text-sm uppercase tracking-widest font-black"
                          placeholder="CODE"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={isValidatingCoupon || !couponCode}
                          className="bg-white/10 hover:bg-white/20 text-white px-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50"
                        >
                          {isValidatingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : ct.apply}
                        </button>
                      </div>
                      {couponError && <p className="text-[10px] text-red-500 px-2 font-bold uppercase">{couponError}</p>}
                      {appliedCoupon && <p className="text-[10px] text-green-500 px-2 font-bold uppercase">✓ {ct.discountApplied}</p>}
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <div className="flex justify-between items-center mb-6 px-1">
                        <span className="text-muted">{ct.total}</span>
                        <div className="flex flex-col items-end">
                           <span className={`text-2xl font-black ${appliedCoupon ? 'text-accent scale-110' : ''} transition-all`}>
                             {getDiscountedPrice(
                               planType === "monthly"
                                ? (currentPricing.monthlySale || currentPricing.monthly)
                                : (currentPricing.quarterlySale || currentPricing.quarterly)
                             ).toFixed(0)} {currentPricing.currency}
                           </span>
                           {appliedCoupon && (
                             <span className="text-[10px] text-muted line-through">
                               {parseFloat(
                                 planType === "monthly"
                                  ? (currentPricing.monthlySale || currentPricing.monthly)
                                  : (currentPricing.quarterlySale || currentPricing.quarterly)
                                || "0").toFixed(0)} {currentPricing.currency}
                             </span>
                           )}
                        </div>
                      </div>

                      <label className="flex items-start gap-3 mb-4 cursor-pointer group px-1">
                        <input
                          type="checkbox"
                          checked={consentChecked}
                          onChange={(e) => setConsentChecked(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-white/20 bg-background accent-accent shrink-0"
                        />
                        <span className="text-xs text-muted leading-relaxed group-hover:text-foreground transition-colors">
                          {ct.consentCheckbox}
                        </span>
                      </label>

                      <p className="text-xs text-muted/70 mb-5 px-1 leading-relaxed">
                        {ct.redirectNotice}
                      </p>

                      <MagneticButton>
                        <button
                          disabled={loading || !consentChecked}
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
                    {ct.fawryNote}
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
