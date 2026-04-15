"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "../../../lang-context";
import { Navbar } from "../../../navbar";
import { Footer } from "../../../footer";
import { FadeUp, MagneticButton } from "../../../animations";
import { CheckCircle2, MessageSquare } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const { t, locale } = useLang();
  const searchParams = useSearchParams();
  const [purchaseId, setPurchaseId] = useState<string | null>(null);

  useEffect(() => {
    const fromUrl = searchParams.get("purchaseId");
    if (fromUrl) {
      setPurchaseId(fromUrl);
    } else {
      setPurchaseId(localStorage.getItem("lastPurchaseId"));
    }
  }, [searchParams]);

  const handleWhatsApp = () => {
    const phone = "201553038830"; // Captain Roshdy's Number
    const text = encodeURIComponent(
      locale === "en"
        ? `Hello Captain Roshdy! I just completed my payment for the coaching plan. \n\nPurchase ID: ${purchaseId}\nI'm ready to start the transformation!`
        : `أهلاً كابتن رشدي! لقد أتممت عملية الدفع لاشتراك التدريب. \n\nرقم العملية: ${purchaseId}\nأنا جاهز لبداية التحول!`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  return (
    <main className="flex-grow pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <FadeUp>
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
          </div>
          
          <h1 className="text-4xl font-black mb-6">
            {locale === "en" ? "PAYMENT SUCCESSFUL!" : "تمت عملية الدفع بنجاح!"}
          </h1>
          
          <p className="text-muted text-lg mb-12 leading-relaxed">
            {locale === "en" 
              ? "Your payment has been processed successfully. Welcome to the team! The last step is to send your order details to Captain Roshdy to start your program."
              : "تم تأكيد اشتراكك بنجاح. أهلاً بك في الفريق! الخطوة الأخيرة هي إرسال بيانات طلبك لكابتن رشدي عشان نبدأ البرنامج فوراً."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton>
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold transition-all duration-300 w-full sm:w-auto shadow-lg shadow-green-900/20"
              >
                <MessageSquare className="w-5 h-5" />
                {locale === "en" ? "Send to WhatsApp" : "إرسال عبر واتساب"}
              </button>
            </MagneticButton>

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
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Suspense fallback={<div className="flex-grow pt-40 text-center">Loading...</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}
