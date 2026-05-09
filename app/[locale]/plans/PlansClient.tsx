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
import { X, Loader2 } from "lucide-react";

const COUNTRY_CODES = [
  { code: "20",  flag: "🇪🇬", name: "Egypt" },
  { code: "966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "971", flag: "🇦🇪", name: "UAE" },
  { code: "965", flag: "🇰🇼", name: "Kuwait" },
  { code: "974", flag: "🇶🇦", name: "Qatar" },
  { code: "973", flag: "🇧🇭", name: "Bahrain" },
  { code: "968", flag: "🇴🇲", name: "Oman" },
  { code: "962", flag: "🇯🇴", name: "Jordan" },
  { code: "970", flag: "🇵🇸", name: "Palestine" },
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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "" });
  const [countryCode, setCountryCode] = useState("20");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan.id,
          planType,
          paymentMethodId: 4,
          clientName: formData.name,
          email: formData.email,
          whatsapp: countryCode + formData.whatsapp.replace(/^0+/, ""),
          region,
          locale,
          couponCode: appliedCoupon ? couponCode : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.details || "Payment failed");

      if (data.invoiceId) localStorage.setItem("lastInvoiceId", data.invoiceId.toString());
      if (data.purchaseId) localStorage.setItem("lastPurchaseId", data.purchaseId);

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No payment URL returned");
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
          whatsapp: formData.whatsapp,
        }),
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
    return appliedCoupon.type === "PERCENTAGE"
      ? base * (1 - appliedCoupon.value / 100)
      : Math.max(0, base - appliedCoupon.value);
  };

  const closeCheckout = () => {
    setSelectedPlan(null);
    setLoading(false);
    setCouponCode("");
    setAppliedCoupon(null);
    setCouponError("");
    setConsentChecked(false);
  };

  const ct = (t as any).checkout;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 relative">
        <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-accent/10 glow-pulse pointer-events-none" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-accent/5 glow-pulse pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <div className="text-center mb-10">
              <span className="text-sm text-accent-light font-bold tracking-wider uppercase">
                {locale === "en" ? "Choose Your Path" : "اختر طريقك"}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-3 mb-4 leading-tight">
                {locale === "en" ? "TRANSFORMATION " : "باقات "}
                <span className="gradient-text">{locale === "en" ? "PLANS" : "التحول"}</span>
              </h1>
              <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
                {locale === "en"
                  ? "Choose the plan that fits your goals and lifestyle. Science-backed programs tailored for results."
                  : "اختر الباقة اللي تناسب أهدافك ونمط حياتك. برامج مبنية على أسس علمية ومصممة خصيصاً عشان توصل لأفضل نتايج."}
              </p>
            </div>
          </FadeUp>

          <div className="flex flex-wrap justify-center gap-6">
            {plans.filter((p) => p.isActive).map((plan) => (
              <StaggerItem key={plan.id} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm lg:max-w-none">
                <div className={`group h-full flex flex-col rounded-2xl overflow-hidden bg-surface-light border transition-all duration-500 ${
                  plan.isOnHold
                    ? 'border-amber-500/20'
                    : 'border-border hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10'
                }`}>
                  {/* Top accent stripe */}
                  <div className={`h-[3px] w-full flex-shrink-0 ${
                    plan.isOnHold
                      ? 'bg-gradient-to-r from-amber-600/50 via-amber-400/70 to-amber-600/50'
                      : 'bg-gradient-to-r from-accent via-accent-light to-accent/60'
                  }`} />

                  <div className="p-6 sm:p-8 flex flex-col h-full">

                    {/* Inline badge */}
                    {plan.isOnHold && (
                      <div className="self-start flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        {locale === "ar" ? "الأماكن ممتلئة" : "Fully Booked"}
                      </div>
                    )}

                    {/* Plan name */}
                    <h3 className="text-2xl font-black mb-2 leading-tight group-hover:text-accent-light transition-colors duration-300">
                      {locale === "en" ? plan.nameEn : plan.nameAr}
                    </h3>

                    {/* Brief */}
                    <p className="text-muted text-sm leading-relaxed mb-5 flex-grow">
                      {locale === "en" ? plan.briefEn : plan.briefAr}
                    </p>

                    {/* Trust pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {(locale === "en"
                        ? ["Personal Plan", "Direct Support", "Nutrition Guide"]
                        : ["خطة شخصية", "متابعة مباشرة", "خطة تغذية"]
                      ).map((tag) => (
                        <span key={tag} className="text-[10px] text-muted/80 font-bold uppercase tracking-wider bg-white/5 border border-white/[0.06] px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Price box */}
                    <div className={`mb-5 rounded-xl border p-5 ${
                      plan.isOnHold
                        ? 'bg-amber-500/5 border-amber-500/10'
                        : 'bg-background/60 border-white/5 group-hover:border-accent/10 transition-colors'
                    }`}>
                      <div className="text-[10px] text-muted uppercase tracking-[0.18em] font-bold mb-2">
                        {region === "egypt"
                          ? (locale === "en" ? "Egypt" : "داخل مصر")
                          : (locale === "en" ? "International" : "دولي")}
                      </div>
                      <div className="flex items-end gap-2">
                        {region === "egypt" ? (
                          plan.salePriceMonthlyEgp ? (
                            <>
                              <span className="text-4xl font-black text-accent-light leading-none">{plan.salePriceMonthlyEgp}</span>
                              <span className="text-base font-bold text-muted line-through mb-0.5">{plan.priceMonthlyEgp}</span>
                            </>
                          ) : (
                            <span className="text-4xl font-black leading-none">{plan.priceMonthlyEgp}</span>
                          )
                        ) : (
                          plan.salePriceMonthlyUsd ? (
                            <>
                              <span className="text-4xl font-black text-accent-light leading-none">{plan.salePriceMonthlyUsd}</span>
                              <span className="text-base font-bold text-muted line-through mb-0.5">{plan.priceMonthlyUsd}</span>
                            </>
                          ) : (
                            <span className="text-4xl font-black leading-none">{plan.priceMonthlyUsd}</span>
                          )
                        )}
                        <div className="flex flex-col mb-0.5">
                          <span className="text-xs text-muted font-black uppercase leading-none">
                            {region === "egypt" ? "EGP" : "USD"}
                          </span>
                          <span className="text-[10px] text-muted/60 font-medium leading-none mt-0.5">
                            {locale === "en" ? "/month" : "شهرياً"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col gap-2.5 mt-auto">
                      {plan.isOnHold ? (
                        <div className="w-full py-4 rounded-xl text-xs font-black bg-amber-500/10 border border-amber-500/20 text-amber-400/80 text-center cursor-not-allowed select-none uppercase tracking-widest">
                          {locale === "ar" ? "الأماكن ممتلئة · قريباً" : "Fully Booked · Coming Soon"}
                        </div>
                      ) : (
                        <MagneticButton>
                          <button
                            onClick={() => setSelectedPlan(plan)}
                            className="w-full py-4 rounded-xl text-sm font-black bg-accent text-white hover:bg-accent-light active:scale-[0.98] transition-all duration-300 shadow-lg shadow-accent/25 uppercase tracking-wider"
                          >
                            {locale === "en" ? "Subscribe Now" : "اشترك الآن"}
                          </button>
                        </MagneticButton>
                      )}
                      <Link
                        href={`/${locale}/plans/${plan.slug}`}
                        className="block w-full text-center py-3 text-sm font-bold text-muted hover:text-accent-light transition-colors duration-200"
                      >
                        {(t as any).common.knowMore} {dir === "rtl" ? "←" : "→"}
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
              className="relative w-full max-w-md bg-surface-light border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-y-auto max-h-[85vh]"
              dir={dir}
            >
              <button
                onClick={closeCheckout}
                className={`absolute top-6 ${dir === "rtl" ? "left-6" : "right-6"} p-2 rounded-full hover:bg-white/5 text-muted transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold">{ct.title}</h2>
                <p className="text-sm text-muted mt-1">
                  {locale === "en" ? selectedPlan.nameEn : selectedPlan.nameAr}
                </p>
              </div>

              <form onSubmit={handleCheckout} className="space-y-4 sm:space-y-5">
                {/* Plan Duration */}
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

                {/* Personal Info */}
                <div className="space-y-4">
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="flex-1 bg-transparent px-4 py-4 focus:outline-none text-sm"
                      placeholder={ct.whatsapp}
                    />
                  </div>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-background border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/50 transition-colors text-sm"
                    placeholder={ct.email}
                  />
                </div>

                {/* Promo Code */}
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

                {/* Total + Submit */}
                <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center mb-6 px-1">
                    <span className="text-muted">{ct.total}</span>
                    <div className="flex flex-col items-end">
                      <span className={`text-2xl font-black ${appliedCoupon ? "text-accent scale-110" : ""} transition-all`}>
                        {getDiscountedPrice(
                          region === "egypt"
                            ? planType === "monthly"
                              ? selectedPlan.salePriceMonthlyEgp || selectedPlan.priceMonthlyEgp
                              : selectedPlan.salePriceQuarterlyEgp || selectedPlan.priceQuarterlyEgp
                            : planType === "monthly"
                            ? selectedPlan.salePriceMonthlyUsd || selectedPlan.priceMonthlyUsd
                            : selectedPlan.salePriceQuarterlyUsd || selectedPlan.priceQuarterlyUsd
                        ).toFixed(0)}{" "}
                        {region === "egypt" ? "EGP" : "USD"}
                      </span>
                      {appliedCoupon && (
                        <span className="text-[10px] text-muted line-through">
                          {parseFloat(
                            region === "egypt"
                              ? planType === "monthly"
                                ? selectedPlan.salePriceMonthlyEgp || selectedPlan.priceMonthlyEgp
                                : selectedPlan.salePriceQuarterlyEgp || selectedPlan.priceQuarterlyEgp
                              : planType === "monthly"
                              ? selectedPlan.salePriceMonthlyUsd || selectedPlan.priceMonthlyUsd
                              : selectedPlan.salePriceQuarterlyUsd || selectedPlan.priceQuarterlyUsd || "0"
                          ).toFixed(0)}{" "}
                          {region === "egypt" ? "EGP" : "USD"}
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
