"use client";

import { useLang } from "../../../lang-context";
import { Navbar } from "../../../navbar";
import { Footer } from "../../../footer";
import { FadeUp } from "../../../animations";
import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function PaymentFailPage() {
  const { locale } = useLang();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
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
            
            <p className="text-muted text-lg mb-12 leading-relaxed">
              {locale === "en" 
                ? "Unfortunately, we couldn't process your payment. This could be due to insufficient funds, or an issue with the payment provider. Please try again or use a different payment method."
                : "للأسف، لم نتمكن من إتمام عملية الدفع. قد يكون ذلك بسبب عدم كفاية الرصيد أو مشكلة تقنية. يرجى المحاولة مرة أخرى أو استخدام وسيلة دفع أخرى."}
            </p>

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
          </FadeUp>
        </div>
      </main>

      <Footer />
    </div>
  );
}
