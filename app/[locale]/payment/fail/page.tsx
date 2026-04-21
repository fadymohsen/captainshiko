"use client";

import { useLang } from "../../../lang-context";
import { Navbar } from "../../../navbar";
import { Footer } from "../../../footer";
import { FadeUp } from "../../../animations";
import { AlertCircle, RefreshCw, ChevronDown, ChevronUp, Info } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function FailContent() {
  const { locale } = useLang();
  const searchParams = useSearchParams();
  const [showDetails, setShowDetails] = useState(false);

  // Fawaterak standard keys
  const invoiceId = searchParams.get("invoice_id") || searchParams.get("invoiceId");
  const status = searchParams.get("status");
  const message = searchParams.get("message");
  
  const hasTechnicalInfo = !!(invoiceId || status || message);

  return (
    <main className="flex-grow pt-40 pb-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <FadeUp>
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
          </div>
          
          <h1 className="text-4xl font-black mb-6">
            {locale === "en" ? "PAYMENT FAILED" : "فشلت عملية الدفع"}
          </h1>
          
          <p className="text-muted text-lg mb-8 leading-relaxed">
            {locale === "en" 
              ? "Unfortunately, we couldn't process your payment. This could be due to insufficient funds, or an issue with the payment provider. Please try again or use a different payment method."
              : "للأسف، لم نتمكن من إتمام عملية الدفع. قد يكون ذلك بسبب عدم كفاية الرصيد أو مشكلة تقنية. يرجى المحاولة مرة أخرى أو استخدام وسيلة دفع أخرى."}
          </p>

          {hasTechnicalInfo && (
            <div className="mb-12">
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 mx-auto text-xs font-bold text-accent-light uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                <Info className="w-3 h-3" />
                {locale === "en" ? "Technical Details" : "تفاصيل تقنية"}
                {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              
              {showDetails && (
                <div className="mt-4 p-6 rounded-2xl bg-surface-light border border-white/5 text-left font-mono text-[10px] sm:text-xs">
                  <div className="grid grid-cols-3 gap-2 opacity-70">
                    <div className="font-bold text-accent-light">{locale === "en" ? "INVOICE ID" : "رقم الفاتورة"}</div>
                    <div className="col-span-2 text-white">{invoiceId || "N/A"}</div>
                    
                    <div className="font-bold text-accent-light">{locale === "en" ? "STATUS" : "الحالة"}</div>
                    <div className="col-span-2 text-white">{status || "FAILED"}</div>
                    
                    {message && (
                      <>
                        <div className="font-bold text-accent-light">{locale === "en" ? "GATEWAY MSG" : "رسالة البوابة"}</div>
                        <div className="col-span-2 text-white">{message}</div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/plans`}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent hover:bg-accent-light text-white font-bold transition-all duration-300 shadow-lg shadow-accent/20"
            >
              <RefreshCw className="w-5 h-5" />
              {locale === "en" ? "Try Again" : "حاول مرة أخرى"}
            </Link>

            <Link
              href={`/${locale}`}
              className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 font-bold"
            >
              {locale === "en" ? "Back to Home" : "العودة للرئيسية"}
            </Link>
          </div>

          <div className="mt-12 opacity-30 text-[9px] font-bold uppercase tracking-widest">
            Security ID: {new Date().getTime().toString(16).toUpperCase()} • v1.1.3-PRODUCTION
          </div>
        </FadeUp>
      </div>
    </main>
  );
}

export default function PaymentFailPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Suspense fallback={<div className="flex-grow pt-40 text-center">Loading...</div>}>
        <FailContent />
      </Suspense>
      <Footer />
    </div>
  );
}
