"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLang } from "../../../lang-context";
import { Navbar } from "../../../navbar";
import { Footer } from "../../../footer";
import { FadeUp } from "../../../animations";
import { Clock, CheckCircle2, RefreshCw } from "lucide-react";

function PendingContent() {
  const { locale } = useLang();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);
  const [checks, setChecks] = useState(0);

  useEffect(() => {
    const pid = searchParams.get("purchaseId") || searchParams.get("pid") || localStorage.getItem("lastPurchaseId");
    const invoiceId = searchParams.get("invoice_id") || searchParams.get("invoiceId") || localStorage.getItem("lastInvoiceId");
    if (!pid && !invoiceId) return;

    let cancelled = false;
    let count = 0;
    const delays = [3000, 5000, 5000, 5000, 5000, 5000, 10000, 10000, 10000, 10000, 10000, 15000, 15000];

    const verify = async () => {
      if (cancelled) return;
      try {
        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ purchaseId: pid || undefined, invoiceId: invoiceId || undefined }),
        });
        const data = await res.json();
        count++;
        setChecks(count);
        if (data.verified || data.alreadyCompleted) {
          setConfirmed(true);
          setTimeout(() => {
            if (!cancelled) router.replace(`/${locale}/payment/success?purchaseId=${pid || ""}`);
          }, 1200);
          return;
        }
      } catch {}
      if (!cancelled && count < delays.length) {
        setTimeout(verify, delays[count] ?? 15000);
      }
    };

    const t = setTimeout(verify, delays[0]);
    return () => { cancelled = true; clearTimeout(t); };
  }, [searchParams, locale, router]);

  const checkNow = async () => {
    const pid = searchParams.get("purchaseId") || localStorage.getItem("lastPurchaseId");
    const invoiceId = searchParams.get("invoice_id") || localStorage.getItem("lastInvoiceId");
    try {
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchaseId: pid || undefined, invoiceId: invoiceId || undefined }),
      });
      const data = await res.json();
      if (data.verified || data.alreadyCompleted) {
        setConfirmed(true);
        setTimeout(() => router.replace(`/${locale}/payment/success?purchaseId=${pid || ""}`), 1000);
      }
    } catch {}
  };

  return (
    <main className="flex-grow pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <FadeUp>
          {confirmed ? (
            <>
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <h1 className="text-4xl font-black mb-4">
                {locale === "ar" ? "تم تأكيد الدفع!" : "Payment Confirmed!"}
              </h1>
              <p className="text-muted">{locale === "ar" ? "جارٍ تحويلك..." : "Redirecting you now..."}</p>
            </>
          ) : (
            <>
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center border border-accent/30 animate-pulse">
                  <Clock className="w-12 h-12 text-accent" />
                </div>
              </div>
              <h1 className="text-4xl font-black mb-6">
                {locale === "ar" ? "في انتظار تأكيد الدفع" : "Awaiting Payment Confirmation"}
              </h1>
              <p className="text-muted text-lg mb-3 leading-relaxed">
                {locale === "ar"
                  ? "تم إرسال طلب الدفع إلى محفظتك. افتح تطبيق ميزة أو تطبيق البنك وأكد عملية الدفع."
                  : "A payment request has been sent to your wallet. Open your Meeza or banking app and approve the payment."}
              </p>
              <p className="text-muted/60 text-sm mb-10">
                {locale === "ar"
                  ? "ستنتقل تلقائياً بعد التأكيد."
                  : "You'll be redirected automatically once payment is confirmed."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <span className="flex items-center gap-2 text-sm text-muted/60">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {locale === "ar" ? `جارٍ التحقق... (${checks})` : `Checking status... (${checks})`}
                </span>
                <button
                  onClick={checkNow}
                  className="px-6 py-3 rounded-full bg-accent hover:bg-accent/90 text-white font-bold transition-all text-sm"
                >
                  {locale === "ar" ? "تحقق الآن" : "Check Now"}
                </button>
              </div>
            </>
          )}
        </FadeUp>
      </div>
    </main>
  );
}

export default function PaymentPendingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Suspense fallback={<div className="flex-grow pt-40 text-center">Loading...</div>}>
        <PendingContent />
      </Suspense>
      <Footer />
    </div>
  );
}
