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
  const [status, setStatus] = useState<"pending" | "confirmed" | "error">("pending");
  const [attempts, setAttempts] = useState(0);
  const [purchaseId, setPurchaseId] = useState<string | null>(null);

  useEffect(() => {
    const pid = searchParams.get("purchaseId") || searchParams.get("pid") || localStorage.getItem("lastPurchaseId");
    const invoiceId = searchParams.get("invoice_id") || searchParams.get("invoiceId") || localStorage.getItem("lastInvoiceId");

    if (pid) setPurchaseId(pid);

    if (!pid && !invoiceId) return;

    let cancelled = false;
    let attemptCount = 0;
    // Poll every 5 seconds for up to ~2 minutes
    const delays = [3000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 10000, 10000, 10000, 10000, 10000];

    const check = async () => {
      if (cancelled) return;
      try {
        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ purchaseId: pid || undefined, invoiceId: invoiceId || undefined }),
        });
        const data = await res.json();
        attemptCount++;
        setAttempts(attemptCount);

        if (data.verified || data.alreadyCompleted) {
          setStatus("confirmed");
          setTimeout(() => {
            if (!cancelled) router.replace(`/${locale}/payment/success?purchaseId=${pid || ""}`);
          }, 1500);
          return;
        }
      } catch {}

      if (!cancelled && attemptCount < delays.length) {
        setTimeout(check, delays[attemptCount] ?? 10000);
      }
    };

    const firstTimer = setTimeout(check, delays[0]);
    return () => {
      cancelled = true;
      clearTimeout(firstTimer);
    };
  }, [searchParams, locale, router]);

  const handleManualCheck = () => {
    const pid = searchParams.get("purchaseId") || localStorage.getItem("lastPurchaseId");
    const invoiceId = searchParams.get("invoice_id") || localStorage.getItem("lastInvoiceId");
    fetch("/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ purchaseId: pid || undefined, invoiceId: invoiceId || undefined }),
    }).then((r) => r.json()).then((data) => {
      if (data.verified || data.alreadyCompleted) {
        setStatus("confirmed");
        setTimeout(() => router.replace(`/${locale}/payment/success?purchaseId=${pid || ""}`), 1000);
      }
    }).catch(() => {});
  };

  return (
    <main className="flex-grow pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <FadeUp>
          {status === "confirmed" ? (
            <>
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <h1 className="text-4xl font-black mb-4">
                {locale === "ar" ? "تم تأكيد الدفع!" : "Payment Confirmed!"}
              </h1>
              <p className="text-muted text-lg">
                {locale === "ar" ? "جارٍ تحويلك..." : "Redirecting you now..."}
              </p>
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

              <p className="text-muted text-lg mb-4 leading-relaxed">
                {locale === "ar"
                  ? "تم إرسال طلب الدفع إلى محفظتك. يرجى فتح تطبيق ميزة أو محفظتك المحمولة والموافقة على عملية الدفع."
                  : "A payment request has been sent to your wallet. Please open your Meeza or mobile wallet app and approve the payment."}
              </p>

              <p className="text-muted text-sm mb-10 leading-relaxed">
                {locale === "ar"
                  ? "أو افتح تطبيق البنك وادفع باستخدام رمز QR المرسل. ستنتقل تلقائياً بعد التأكيد."
                  : "Or open your banking app and pay using the QR code sent to you. You'll be redirected automatically once confirmed."}
              </p>

              {purchaseId && (
                <p className="text-xs text-muted/50 mb-8">
                  {locale === "ar" ? "رقم العملية:" : "Purchase ID:"} {purchaseId}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {locale === "ar"
                    ? `جارٍ التحقق تلقائياً... (${attempts})`
                    : `Auto-checking status... (${attempts})`}
                </div>
                <button
                  onClick={handleManualCheck}
                  className="px-6 py-3 rounded-full bg-accent hover:bg-accent/90 text-white font-bold transition-all duration-300 text-sm"
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
