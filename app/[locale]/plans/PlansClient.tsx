"use client";

import { useState } from "react";
import { useLang } from "../../lang-context";
import { Navbar } from "../../navbar";
import { Footer } from "../../footer";
import Link from "next/link";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  MagneticButton,
} from "../../animations";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Loader2, Receipt, CheckCircle2, Smartphone, Upload, ImageIcon } from "lucide-react";

const COUNTRY_CODES = [
  { code: "20",  flag: "🇪🇬", name: "Egypt" },
  { code: "966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "971", flag: "🇦🇪", name: "UAE" },
  { code: "965", flag: "🇰🇼", name: "Kuwait" },
  { code: "974", flag: "🇶🇦", name: "Qatar" },
  { code: "973", flag: "🇧🇭", name: "Bahrain" },
  { code: "968", flag: "🇴🇲", name: "Oman" },
  { code: "962", flag: "🇯🇴", name: "Jordan" },
  { code: "961", flag: "🇱🇧", name: "Lebanon" },
  { code: "218", flag: "🇱🇾", name: "Libya" },
  { code: "213", flag: "🇩🇿", name: "Algeria" },
  { code: "212", flag: "🇲🇦", name: "Morocco" },
  { code: "216", flag: "🇹🇳", name: "Tunisia" },
  { code: "249", flag: "🇸🇩", name: "Sudan" },
  { code: "964", flag: "🇮🇶", name: "Iraq" },
  { code: "1",   flag: "🇺🇸", name: "USA / Canada" },
  { code: "44",  flag: "🇬🇧", name: "UK" },
  { code: "49",  flag: "🇩🇪", name: "Germany" },
  { code: "33",  flag: "🇫🇷", name: "France" },
  { code: "39",  flag: "🇮🇹", name: "Italy" },
  { code: "34",  flag: "🇪🇸", name: "Spain" },
  { code: "61",  flag: "🇦🇺", name: "Australia" },
];

export function PlansClient({ plans }: { plans: any[] }) {
  const { t, locale, dir, region } = useLang();
  
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [planType, setPlanType] = useState<"monthly" | "quarterly">("monthly");
  const [paymentMethodId, setPaymentMethodId] = useState<number | "instapay">(2); // Default to Card
  const [loading, setLoading] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: ""
  });
  const [countryCode, setCountryCode] = useState("20");
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
          planId: selectedPlan.id,
          planType,
          clientName: formData.name,
          email: formData.email,
          whatsapp: countryCode + formData.whatsapp.replace(/^0+/, ""),
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
      alert(locale === "ar" ? "حدث خطأ، يرجى المحاولة مرة أخرى." : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          planId: selectedPlan.id,
          planType,
          paymentMethodId,
          clientName: formData.name,
          email: formData.email,
          whatsapp: countryCode + formData.whatsapp.replace(/^0+/, ""),
          region,
          locale,
          couponCode: appliedCoupon ? couponCode : undefined
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Payment failed");
      }

      if (data.invoiceId) {
        localStorage.setItem("lastInvoiceId", data.invoiceId.toString());
      }
      if (data.purchaseId) {
        localStorage.setItem("lastPurchaseId", data.purchaseId);
      }

      if (paymentMethodId === 2 && data.url) {
        // Card: redirect to Fawaterak payment page
        window.location.href = data.url;
      } else {
        // Fawry: show reference code modal
        setPaymentResponse(data);
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Checkout Error:", err);
      alert(locale === "ar" ? "حدث خطأ، يرجى المحاولة مرة أخرى." : "Something went wrong. Please try again.");
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
          planId: selectedPlan.id,
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

  const closeCheckout = () => {
    setSelectedPlan(null);
    setPaymentResponse(null);
    setLoading(false);
    setCouponCode("");
    setAppliedCoupon(null);
    setCouponError("");
    setConsentChecked(false);
    setInstapayStep("idle");
    setInstapayPurchaseId(null);
  };

  const ct = (t as any).checkout;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 relative">
        <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-accent/10 glow-pulse pointer-events-none" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-accent/5 glow-pulse pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-sm text-accent-light font-bold tracking-wider uppercase">
                {locale === "en" ? "Choose Your Path" : "اختر طريقك"}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-4 mb-6 leading-tight">
                {locale === "en" ? "TRANSFORMATION " : "باقات " }
                <span className="gradient-text">{locale === "en" ? "PLANS" : "التحول"}</span>
              </h1>
              <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
                {locale === "en" 
                  ? "Choose the plan that fits your goals and lifestyle. Science-backed programs tailored for results."
                  : "اختر الباقة اللي تناسب أهدافك ونمط حياتك. برامج مبنية على أسس علمية ومصممة خصيصاً عشان توصل لأفضل نتايج."}
              </p>
            </div>
          </FadeUp>

          <div className="flex flex-wrap justify-center gap-8">
            {plans.filter(p => p.isActive).map((plan) => (
              <StaggerItem key={plan.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] max-w-sm lg:max-w-none">
                <div className="group h-full flex flex-col rounded-2xl p-8 bg-surface-light border border-border hover:border-accent/30 transition-all duration-500 relative glow-border overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent/10 transition-colors duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-light transition-colors">
                      {locale === 'en' ? plan.nameEn : plan.nameAr}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-6 flex-grow italic">
                      "{locale === 'en' ? plan.briefEn : plan.briefAr}"
                    </p>
                    
                    <div className="mb-6 p-4 rounded-xl bg-background/40 border border-white/5">
                      <div className="text-xs text-muted uppercase tracking-widest mb-1">
                        {region === "egypt" 
                          ? (locale === "en" ? "Local Subscription" : "الاشتراك من داخل مصر")
                          : (locale === "en" ? "Global Subscription" : "الاشتراك الدولي")}
                      </div>
                      <div className="flex items-baseline gap-2">
                        {region === "egypt" ? (
                          plan.salePriceMonthlyEgp ? (
                            <>
                              <span className="text-3xl font-black text-accent-light">{plan.salePriceMonthlyEgp}</span>
                              <span className="text-sm font-bold text-muted line-through opacity-50">{plan.priceMonthlyEgp}</span>
                            </>
                          ) : (
                            <span className="text-3xl font-black">{plan.priceMonthlyEgp}</span>
                          )
                        ) : (
                          plan.salePriceMonthlyUsd ? (
                            <>
                              <span className="text-3xl font-black text-accent-light">{plan.salePriceMonthlyUsd}</span>
                              <span className="text-sm font-bold text-muted line-through opacity-50">{plan.priceMonthlyUsd}</span>
                            </>
                          ) : (
                            <span className="text-3xl font-black">{plan.priceMonthlyUsd}</span>
                          )
                        )}
                        <span className="text-sm text-muted font-bold uppercase tracking-tight">
                          {region === "egypt" ? "EGP" : "USD"} {locale === "en" ? "/Mo" : "شهرياً"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-auto">
                      <MagneticButton>
                        <button
                          onClick={() => setSelectedPlan(plan)}
                          className="w-full py-4 rounded-full text-sm font-bold bg-accent text-white hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/20"
                        >
                          {locale === "en" ? "Subscribe Now" : "اشترك الآن"}
                        </button>
                      </MagneticButton>
                      
                      <Link
                        href={`/${locale}/plans/${plan.slug}`}
                        className="block w-full text-center py-4 rounded-full text-sm font-bold border border-white/10 bg-white/5 text-muted hover:bg-accent/10 hover:border-accent/30 hover:text-accent-light transition-all duration-300"
                      >
                        {(t as any).common.knowMore}
                      </Link>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCheckout}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-surface-light border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-y-auto max-h-[75vh] sm:max-h-[85vh]"
              dir={dir}
            >
              <button 
                onClick={closeCheckout}
                className={`absolute top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} p-2 rounded-full hover:bg-white/5 text-muted transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>

              {instapayStep === "instructions" ? (
                <div className="py-4">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{ct.instapayTitle}</h2>
                      <p className="text-xs text-muted">
                        {locale === "en" ? selectedPlan.nameEn : selectedPlan.nameAr}
                      </p>
                    </div>
                  </div>

                  <div className="bg-background/50 rounded-xl p-4 border border-white/5 mb-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{locale === 'en' ? 'Instructions' : 'التعليمات'}</h3>
                    <p className="text-muted text-sm leading-relaxed whitespace-pre-line">{ct.instapayInstructions}</p>
                  </div>

                  <button
                    onClick={handleInstapayConfirm}
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-white text-black font-black flex items-center justify-center gap-2 hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : ct.instapayConfirm}
                  </button>
                </div>
              ) : instapayStep === "done" ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mx-auto mb-4 border border-green-500/20">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-black mb-2">{ct.instapayDoneTitle}</h2>
                  <p className="text-muted text-sm mb-5 leading-relaxed">{ct.instapayDoneNote}</p>

                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/201553038830?text=${encodeURIComponent(
                        locale === "en" 
                          ? `Hi Coach Mohamed! I've just paid via InstaPay for the ${selectedPlan.nameEn} plan. Here is my receipt. (Purchase ID: ${instapaypurchaseId || 'N/A'})`
                          : `أهلاً كوتش محمد! لسه دافع عن طريق إنستاباي لباقة ${selectedPlan.nameAr}. ده إيصال الدفع. (رقم العملية: ${instapaypurchaseId || 'N/A'})`
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
                      onClick={closeCheckout}
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
                        {locale === "en" ? selectedPlan.nameEn : selectedPlan.nameAr} • <span className="text-[10px] text-accent">v1.0.7-TRUTH</span>
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
                      <div className="flex bg-background border border-white/5 rounded-2xl overflow-hidden focus-within:border-accent/50 transition-colors">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="bg-white/5 text-sm px-3 py-4 border-r border-white/5 focus:outline-none text-foreground shrink-0"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} +{c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          required
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                          className="flex-1 bg-transparent px-4 py-4 focus:outline-none text-sm"
                          placeholder={ct.whatsapp}
                        />
                      </div>
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
                        {ct.promoCode}
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
                               region === "egypt"
                                ? (planType === "monthly" ? (selectedPlan.salePriceMonthlyEgp || selectedPlan.priceMonthlyEgp) : (selectedPlan.salePriceQuarterlyEgp || selectedPlan.priceQuarterlyEgp))
                                : (planType === "monthly" ? (selectedPlan.salePriceMonthlyUsd || selectedPlan.priceMonthlyUsd) : (selectedPlan.salePriceQuarterlyUsd || selectedPlan.priceQuarterlyUsd))
                             ).toFixed(0)} {region === "egypt" ? "EGP" : "USD"}
                           </span>
                           {appliedCoupon && (
                             <span className="text-[10px] text-muted line-through">
                               {parseFloat(
                                 region === "egypt"
                                  ? (planType === "monthly" ? (selectedPlan.salePriceMonthlyEgp || selectedPlan.priceMonthlyEgp) : (selectedPlan.salePriceQuarterlyEgp || selectedPlan.priceQuarterlyEgp))
                                  : (planType === "monthly" ? (selectedPlan.salePriceMonthlyUsd || selectedPlan.priceMonthlyUsd) : (selectedPlan.salePriceQuarterlyUsd || selectedPlan.priceQuarterlyUsd))
                                || "0").toFixed(0)} {region === "egypt" ? "EGP" : "USD"}
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
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mx-auto mb-4 border border-green-500/20">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-black mb-2">{ct.orderCreated}</h2>
                  <p className="text-muted text-sm mb-5 leading-relaxed">
                    {ct.fawryNote}
                  </p>

                  <div className="bg-background rounded-2xl p-5 mb-5 border border-white/5">
                    <div className="text-xs text-muted uppercase tracking-widest mb-1">{ct.referenceCode}</div>
                    <div className="text-3xl font-black text-accent tracking-tighter">
                      {paymentResponse.paymentData?.fawryCode || paymentResponse.paymentData?.meezaReference || "REF-" + paymentResponse.invoiceId}
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/201553038830?text=${encodeURIComponent(
                      locale === "en"
                        ? `Hi Coach Mohamed! I've just paid via ${paymentMethodId === 3 ? "Fawry" : "Wallet"} for the ${selectedPlan.nameEn} plan. Here is my receipt. (Invoice: ${paymentResponse.invoiceId || 'N/A'}, Ref: ${paymentResponse.paymentData?.fawryCode || paymentResponse.paymentData?.meezaReference || 'N/A'})`
                        : `أهلاً كوتش محمد! لسه دافع عن طريق ${paymentMethodId === 3 ? "فوري" : "المحفظة"} لباقة ${selectedPlan.nameAr}. ده إيصال الدفع. (رقم الفاتورة: ${paymentResponse.invoiceId || 'N/A'}, كود المرجع: ${paymentResponse.paymentData?.fawryCode || paymentResponse.paymentData?.meezaReference || 'N/A'})`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-5 rounded-full bg-[#25D366] text-white font-black hover:bg-[#20ba5a] transition-all shadow-lg shadow-green-500/20"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {ct.paidButton}
                  </a>
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
