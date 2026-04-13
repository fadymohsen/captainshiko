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
import { X, CreditCard, Loader2, Smartphone, Receipt, CheckCircle2 } from "lucide-react";

export function PlansClient({ plans }: { plans: any[] }) {
  const { t, locale, dir, region } = useLang();
  
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [planType, setPlanType] = useState<"monthly" | "quarterly">("monthly");
  const [paymentMethodId, setPaymentMethodId] = useState<number>(2); // Default to Card
  const [loading, setLoading] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: ""
  });

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
          paymentMethodId,
          clientName: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          region
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Payment initialization failed");
      }
      
      if (data.url && paymentMethodId === 2) {
        window.location.href = data.url;
      } else if (data.paymentData || data.invoiceId) {
        setPaymentResponse(data);
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Checkout Error:", err);
      const errorMessage = err.message || (typeof err === 'string' ? err : "Checkout failed. Please try again.");
      alert(errorMessage);
      setLoading(false);
    }
  };

  const closeCheckout = () => {
    setSelectedPlan(null);
    setPaymentResponse(null);
    setLoading(false);
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
                        <span className="text-3xl font-black">
                          {region === "egypt" ? plan.priceMonthlyEgp : plan.priceMonthlyUsd}
                        </span>
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
                        className="block w-full text-center py-3 rounded-full text-xs font-medium text-muted hover:text-foreground transition-all duration-300"
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
              className="relative w-full max-w-lg bg-surface-light border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
              dir={dir}
            >
              <button 
                onClick={closeCheckout}
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
                        {locale === "en" ? selectedPlan.nameEn : selectedPlan.nameAr}
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
                            ? (planType === "monthly" ? selectedPlan.priceMonthlyEgp : selectedPlan.priceQuarterlyEgp)
                            : (planType === "monthly" ? selectedPlan.priceMonthlyUsd : selectedPlan.priceQuarterlyUsd)
                          } EGP
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
