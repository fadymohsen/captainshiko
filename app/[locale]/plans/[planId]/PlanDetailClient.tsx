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
import { X, Loader2, CheckCircle2, Star } from "lucide-react";

const COUNTRY_CODES = [
  // Arab & MENA
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
  { code: "963", flag: "🇸🇾", name: "Syria" },
  { code: "964", flag: "🇮🇶", name: "Iraq" },
  { code: "967", flag: "🇾🇪", name: "Yemen" },
  { code: "218", flag: "🇱🇾", name: "Libya" },
  { code: "213", flag: "🇩🇿", name: "Algeria" },
  { code: "212", flag: "🇲🇦", name: "Morocco" },
  { code: "216", flag: "🇹🇳", name: "Tunisia" },
  { code: "249", flag: "🇸🇩", name: "Sudan" },
  { code: "252", flag: "🇸🇴", name: "Somalia" },
  { code: "253", flag: "🇩🇯", name: "Djibouti" },
  { code: "222", flag: "🇲🇷", name: "Mauritania" },
  { code: "269", flag: "🇰🇲", name: "Comoros" },
  // Europe
  { code: "44",  flag: "🇬🇧", name: "UK" },
  { code: "49",  flag: "🇩🇪", name: "Germany" },
  { code: "33",  flag: "🇫🇷", name: "France" },
  { code: "39",  flag: "🇮🇹", name: "Italy" },
  { code: "34",  flag: "🇪🇸", name: "Spain" },
  { code: "351", flag: "🇵🇹", name: "Portugal" },
  { code: "31",  flag: "🇳🇱", name: "Netherlands" },
  { code: "32",  flag: "🇧🇪", name: "Belgium" },
  { code: "41",  flag: "🇨🇭", name: "Switzerland" },
  { code: "43",  flag: "🇦🇹", name: "Austria" },
  { code: "46",  flag: "🇸🇪", name: "Sweden" },
  { code: "47",  flag: "🇳🇴", name: "Norway" },
  { code: "45",  flag: "🇩🇰", name: "Denmark" },
  { code: "358", flag: "🇫🇮", name: "Finland" },
  { code: "353", flag: "🇮🇪", name: "Ireland" },
  { code: "48",  flag: "🇵🇱", name: "Poland" },
  { code: "420", flag: "🇨🇿", name: "Czech Republic" },
  { code: "421", flag: "🇸🇰", name: "Slovakia" },
  { code: "36",  flag: "🇭🇺", name: "Hungary" },
  { code: "40",  flag: "🇷🇴", name: "Romania" },
  { code: "359", flag: "🇧🇬", name: "Bulgaria" },
  { code: "385", flag: "🇭🇷", name: "Croatia" },
  { code: "386", flag: "🇸🇮", name: "Slovenia" },
  { code: "381", flag: "🇷🇸", name: "Serbia" },
  { code: "387", flag: "🇧🇦", name: "Bosnia" },
  { code: "382", flag: "🇲🇪", name: "Montenegro" },
  { code: "389", flag: "🇲🇰", name: "North Macedonia" },
  { code: "355", flag: "🇦🇱", name: "Albania" },
  { code: "383", flag: "🇽🇰", name: "Kosovo" },
  { code: "30",  flag: "🇬🇷", name: "Greece" },
  { code: "357", flag: "🇨🇾", name: "Cyprus" },
  { code: "356", flag: "🇲🇹", name: "Malta" },
  { code: "354", flag: "🇮🇸", name: "Iceland" },
  { code: "352", flag: "🇱🇺", name: "Luxembourg" },
  { code: "370", flag: "🇱🇹", name: "Lithuania" },
  { code: "371", flag: "🇱🇻", name: "Latvia" },
  { code: "372", flag: "🇪🇪", name: "Estonia" },
  { code: "380", flag: "🇺🇦", name: "Ukraine" },
  { code: "373", flag: "🇲🇩", name: "Moldova" },
  { code: "375", flag: "🇧🇾", name: "Belarus" },
  // North America
  { code: "1",   flag: "🇺🇸", name: "USA / Canada" },
  { code: "52",  flag: "🇲🇽", name: "Mexico" },
  // Caribbean
  { code: "53",  flag: "🇨🇺", name: "Cuba" },
  { code: "509", flag: "🇭🇹", name: "Haiti" },
  { code: "876", flag: "🇯🇲", name: "Jamaica" },
  { code: "868", flag: "🇹🇹", name: "Trinidad & Tobago" },
  { code: "809", flag: "🇩🇴", name: "Dominican Republic" },
  // Central America
  { code: "502", flag: "🇬🇹", name: "Guatemala" },
  { code: "503", flag: "🇸🇻", name: "El Salvador" },
  { code: "504", flag: "🇭🇳", name: "Honduras" },
  { code: "505", flag: "🇳🇮", name: "Nicaragua" },
  { code: "506", flag: "🇨🇷", name: "Costa Rica" },
  { code: "507", flag: "🇵🇦", name: "Panama" },
  // South America
  { code: "55",  flag: "🇧🇷", name: "Brazil" },
  { code: "54",  flag: "🇦🇷", name: "Argentina" },
  { code: "56",  flag: "🇨🇱", name: "Chile" },
  { code: "57",  flag: "🇨🇴", name: "Colombia" },
  { code: "58",  flag: "🇻🇪", name: "Venezuela" },
  { code: "51",  flag: "🇵🇪", name: "Peru" },
  { code: "593", flag: "🇪🇨", name: "Ecuador" },
  { code: "591", flag: "🇧🇴", name: "Bolivia" },
  { code: "595", flag: "🇵🇾", name: "Paraguay" },
  { code: "598", flag: "🇺🇾", name: "Uruguay" },
  { code: "592", flag: "🇬🇾", name: "Guyana" },
  { code: "597", flag: "🇸🇷", name: "Suriname" },
  // Asia
  { code: "90",  flag: "🇹🇷", name: "Turkey" },
  { code: "98",  flag: "🇮🇷", name: "Iran" },
  { code: "93",  flag: "🇦🇫", name: "Afghanistan" },
  { code: "92",  flag: "🇵🇰", name: "Pakistan" },
  { code: "91",  flag: "🇮🇳", name: "India" },
  { code: "880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "94",  flag: "🇱🇰", name: "Sri Lanka" },
  { code: "977", flag: "🇳🇵", name: "Nepal" },
  { code: "95",  flag: "🇲🇲", name: "Myanmar" },
  { code: "66",  flag: "🇹🇭", name: "Thailand" },
  { code: "84",  flag: "🇻🇳", name: "Vietnam" },
  { code: "60",  flag: "🇲🇾", name: "Malaysia" },
  { code: "65",  flag: "🇸🇬", name: "Singapore" },
  { code: "62",  flag: "🇮🇩", name: "Indonesia" },
  { code: "63",  flag: "🇵🇭", name: "Philippines" },
  { code: "855", flag: "🇰🇭", name: "Cambodia" },
  { code: "856", flag: "🇱🇦", name: "Laos" },
  { code: "86",  flag: "🇨🇳", name: "China" },
  { code: "81",  flag: "🇯🇵", name: "Japan" },
  { code: "82",  flag: "🇰🇷", name: "South Korea" },
  { code: "852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "886", flag: "🇹🇼", name: "Taiwan" },
  { code: "976", flag: "🇲🇳", name: "Mongolia" },
  { code: "7",   flag: "🇷🇺", name: "Russia" },
  { code: "995", flag: "🇬🇪", name: "Georgia" },
  { code: "994", flag: "🇦🇿", name: "Azerbaijan" },
  { code: "374", flag: "🇦🇲", name: "Armenia" },
  { code: "996", flag: "🇰🇬", name: "Kyrgyzstan" },
  { code: "998", flag: "🇺🇿", name: "Uzbekistan" },
  { code: "992", flag: "🇹🇯", name: "Tajikistan" },
  { code: "993", flag: "🇹🇲", name: "Turkmenistan" },
  // Oceania
  { code: "61",  flag: "🇦🇺", name: "Australia" },
  { code: "64",  flag: "🇳🇿", name: "New Zealand" },
  { code: "679", flag: "🇫🇯", name: "Fiji" },
  { code: "675", flag: "🇵🇬", name: "Papua New Guinea" },
  // Africa
  { code: "234", flag: "🇳🇬", name: "Nigeria" },
  { code: "233", flag: "🇬🇭", name: "Ghana" },
  { code: "254", flag: "🇰🇪", name: "Kenya" },
  { code: "255", flag: "🇹🇿", name: "Tanzania" },
  { code: "256", flag: "🇺🇬", name: "Uganda" },
  { code: "251", flag: "🇪🇹", name: "Ethiopia" },
  { code: "291", flag: "🇪🇷", name: "Eritrea" },
  { code: "27",  flag: "🇿🇦", name: "South Africa" },
  { code: "237", flag: "🇨🇲", name: "Cameroon" },
  { code: "225", flag: "🇨🇮", name: "Côte d'Ivoire" },
  { code: "221", flag: "🇸🇳", name: "Senegal" },
  { code: "223", flag: "🇲🇱", name: "Mali" },
  { code: "226", flag: "🇧🇫", name: "Burkina Faso" },
  { code: "227", flag: "🇳🇪", name: "Niger" },
  { code: "228", flag: "🇹🇬", name: "Togo" },
  { code: "229", flag: "🇧🇯", name: "Benin" },
  { code: "224", flag: "🇬🇳", name: "Guinea" },
  { code: "232", flag: "🇸🇱", name: "Sierra Leone" },
  { code: "231", flag: "🇱🇷", name: "Liberia" },
  { code: "220", flag: "🇬🇲", name: "Gambia" },
  { code: "245", flag: "🇬🇼", name: "Guinea-Bissau" },
  { code: "238", flag: "🇨🇻", name: "Cape Verde" },
  { code: "235", flag: "🇹🇩", name: "Chad" },
  { code: "236", flag: "🇨🇫", name: "Central African Republic" },
  { code: "241", flag: "🇬🇦", name: "Gabon" },
  { code: "240", flag: "🇬🇶", name: "Equatorial Guinea" },
  { code: "242", flag: "🇨🇬", name: "Congo" },
  { code: "243", flag: "🇨🇩", name: "DR Congo" },
  { code: "250", flag: "🇷🇼", name: "Rwanda" },
  { code: "257", flag: "🇧🇮", name: "Burundi" },
  { code: "258", flag: "🇲🇿", name: "Mozambique" },
  { code: "260", flag: "🇿🇲", name: "Zambia" },
  { code: "263", flag: "🇿🇼", name: "Zimbabwe" },
  { code: "265", flag: "🇲🇼", name: "Malawi" },
  { code: "244", flag: "🇦🇴", name: "Angola" },
  { code: "264", flag: "🇳🇦", name: "Namibia" },
  { code: "267", flag: "🇧🇼", name: "Botswana" },
  { code: "261", flag: "🇲🇬", name: "Madagascar" },
  { code: "230", flag: "🇲🇺", name: "Mauritius" },
  { code: "248", flag: "🇸🇨", name: "Seychelles" },
  { code: "266", flag: "🇱🇸", name: "Lesotho" },
  { code: "268", flag: "🇸🇿", name: "Eswatini" },
  { code: "246", flag: "🇩🇬", name: "Diego Garcia" },
  { code: "211", flag: "🇸🇸", name: "South Sudan" },
];

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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "" });
  const [countryCode, setCountryCode] = useState("20");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewFormData, setReviewFormData] = useState({ clientName: "", rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?planId=${plan.id}`);
      const data = await res.json();
      if (res.ok) setReviews(data);
    } catch (err) {
      console.error("Fetch reviews error:", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  useState(() => {
    fetchReviews();
  });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...reviewFormData, planId: plan.id }),
      });
      if (res.ok) {
        setReviewFormData({ clientName: "", rating: 5, comment: "" });
        fetchReviews();
        alert((t as any).reviews.success);
      } else {
        alert((t as any).reviews.error);
      }
    } catch (err) {
      alert((t as any).reviews.error);
    } finally {
      setSubmittingReview(false);
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
    setLoading(true);
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
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
          planId: plan.id,
          email: formData.email,
          whatsapp: countryCode + formData.whatsapp.replace(/^0+/, "")
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
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-accent-light font-black text-xs tracking-[0.3em] uppercase">
                    {locale === "en" ? "Elite Performance" : "أداء احترافي"}
                  </span>
                  {plan.isOnHold && (
                    <span className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/10">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      {locale === "ar" ? "الأماكن ممتلئة — فتح التسجيل قريباً" : "Fully Booked — Registration Opens Soon"}
                    </span>
                  )}
                </div>
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
                        {plan.isOnHold ? (
                          <>
                            <div className="w-full text-center bg-amber-500/10 border border-amber-500/20 text-amber-400 font-black py-5 rounded-2xl text-xs uppercase tracking-[0.2em] cursor-not-allowed select-none">
                              {locale === "ar" ? "الأماكن ممتلئة · فتح التسجيل قريباً" : "Fully Booked · Coming Soon"}
                            </div>
                            <p className="text-[10px] text-amber-400/60 text-center tracking-tight">
                              {locale === "ar"
                                ? "* هذه الباقة ممتلئة حالياً. تابعنا لمعرفة موعد فتح التسجيل."
                                : "* This plan is currently full. Follow us to know when registration opens."}
                            </p>
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </ScaleIn>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <section className="pt-20 mt-20 border-t border-white/5 w-full">
            <FadeUp>
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-black uppercase tracking-tight">
                  {(t as any).howItWorks.title}
                </h2>
                <div className="h-px flex-grow bg-white/10" />
              </div>

              <div className="relative max-w-2xl mx-auto">
                {(t as any).howItWorks.steps.map((step: { title: string; desc: string }, idx: number) => (
                  <StaggerItem key={idx}>
                    <div className="flex gap-6 mb-10 last:mb-0">
                      {/* Number badge + connector line */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg shadow-accent/30">
                          {idx + 1}
                        </div>
                        {idx < (t as any).howItWorks.steps.length - 1 && (
                          <div className="w-px flex-grow bg-accent/20 mt-3" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="pb-6">
                        <h3 className="text-lg font-black mb-1">{step.title}</h3>
                        <p className="text-muted leading-relaxed text-sm">
                          {step.desc}
                          {idx === 1 && (
                            <>
                              {" "}
                              <a
                                href="https://cmohamedroshdy.beprime.site/login"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent-light underline underline-offset-2 hover:text-accent transition-colors font-bold"
                              >
                                {locale === "en" ? "Download here" : "حمّل من هنا"}
                              </a>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </FadeUp>
          </section>

          {/* Reviews Section */}
          <section className="pt-20 mt-20 border-t border-white/5 w-full">
            <FadeUp>
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-black uppercase tracking-tight">
                  {(t as any).reviews.title}
                </h2>
                <div className="h-px flex-grow bg-white/10" />
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-stretch">
                
                {/* Review Form */}
                <div className="bg-surface-light/30 border border-white/5 rounded-[2rem] p-10 shadow-2xl">
                  <h3 className="text-2xl font-black mb-8 text-foreground">{(t as any).reviews.addReview}</h3>
                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    <div>
                      <input
                        required
                        type="text"
                        placeholder={(t as any).reviews.name}
                        value={reviewFormData.clientName}
                        onChange={(e) => setReviewFormData({...reviewFormData, clientName: e.target.value})}
                        className="w-full bg-background/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent/50 transition-all text-base font-medium"
                      />
                    </div>
                    <div className="flex items-center gap-4 bg-background/50 border border-white/10 rounded-2xl px-6 py-4">
                      <span className="text-sm text-muted font-bold uppercase tracking-widest">{(t as any).reviews.rating}:</span>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setReviewFormData({...reviewFormData, rating: s})}
                            className={`transition-all hover:scale-125 ${s <= reviewFormData.rating ? 'text-yellow-500' : 'text-white/10'}`}
                          >
                            <Star className="w-7 h-7 fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      required
                      placeholder={(t as any).reviews.comment}
                      value={reviewFormData.comment}
                      onChange={(e) => setReviewFormData({...reviewFormData, comment: e.target.value})}
                      className="w-full bg-background/50 border border-white/10 rounded-2xl px-6 py-4 h-40 focus:outline-none focus:border-accent/50 transition-all resize-none text-base font-medium"
                    />
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="w-full bg-accent text-white font-black py-5 rounded-2xl hover:bg-accent-light transition-all disabled:opacity-50 text-base uppercase tracking-[0.2em] shadow-lg shadow-accent/20 active:scale-[0.98]"
                    >
                      {submittingReview ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : (t as any).reviews.submit}
                    </button>
                  </form>
                </div>

                {/* Reviews Carousel */}
                <div className="bg-surface-light/20 border border-white/5 rounded-[2rem] p-10 flex flex-col justify-between relative shadow-2xl">
                  {loadingReviews ? (
                    <div className="flex items-center justify-center flex-grow py-20">
                      <Loader2 className="w-10 h-10 animate-spin text-accent" />
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="flex items-center justify-center flex-grow py-20">
                      <p className="text-muted text-lg italic">{(t as any).reviews.noReviews}</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <h4 className="font-black text-2xl text-accent-light">{reviews[activeReviewIdx].clientName}</h4>
                            <div className="flex gap-1 mt-3">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < reviews[activeReviewIdx].rating ? 'text-yellow-500 fill-current' : 'text-white/10'}`} />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-muted uppercase font-black tracking-widest bg-white/5 px-4 py-2 rounded-full">
                            {new Date(reviews[activeReviewIdx].createdAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}
                          </span>
                        </div>
                        <p className="text-muted text-xl md:text-2xl leading-relaxed font-medium italic mt-8">
                          "{reviews[activeReviewIdx].comment}"
                        </p>
                      </div>

                      {/* Carousel Controls */}
                      {reviews.length > 1 && (
                        <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/5">
                          <div className="flex gap-4">
                            <button
                              onClick={() => setActiveReviewIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
                              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-muted hover:text-white hover:scale-105 active:scale-95"
                            >
                              <svg className={`w-6 h-6 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setActiveReviewIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))}
                              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-muted hover:text-white hover:scale-105 active:scale-95"
                            >
                              <svg className={`w-6 h-6 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                          <div className="text-sm text-muted font-black bg-white/5 px-5 py-2 rounded-full tracking-widest">
                            {activeReviewIdx + 1} / {reviews.length}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

              </div>
            </FadeUp>
          </section>

        </div>
      </main>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsCheckoutOpen(false); setConsentChecked(false); setCouponCode(""); setAppliedCoupon(null); setCouponError(""); }}
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
                onClick={() => { setIsCheckoutOpen(false); setConsentChecked(false); setCouponCode(""); setAppliedCoupon(null); setCouponError(""); }}
                className={`absolute top-6 ${dir === "rtl" ? "left-6" : "right-6"} p-2 rounded-full hover:bg-white/5 text-muted transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>

              {false ? (
                <span />
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">{ct.title}</h2>
                    <p className="text-sm text-muted mt-1">{name}</p>
                  </div>

                  <form onSubmit={handleCheckout} className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-2 gap-3 p-1 bg-background/50 rounded-2xl border border-white/5">
                      <button type="button" onClick={() => setPlanType("monthly")} className={`py-3 rounded-xl text-sm font-bold transition-all ${planType === "monthly" ? "bg-accent text-white shadow-lg shadow-accent/20" : "text-muted hover:bg-white/5"}`}>{ct.monthly}</button>
                      <button type="button" onClick={() => setPlanType("quarterly")} className={`py-3 rounded-xl text-sm font-bold transition-all ${planType === "quarterly" ? "bg-accent text-white shadow-lg shadow-accent/20" : "text-muted hover:bg-white/5"}`}>{ct.quarterly}</button>
                    </div>

                    <div className="space-y-4">
                      <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-background border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/50 transition-colors text-sm" placeholder={ct.fullName} />
                      <div className="flex bg-background border border-white/5 rounded-2xl overflow-hidden focus-within:border-accent/50 transition-colors">
                        <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="bg-white/5 text-sm px-3 py-4 border-r border-white/5 focus:outline-none text-foreground shrink-0">
                          {COUNTRY_CODES.map((c) => (<option key={c.code} value={c.code}>{c.flag} +{c.code}</option>))}
                        </select>
                        <input required type="tel" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} className="flex-1 bg-transparent px-4 py-4 focus:outline-none text-sm" placeholder={ct.whatsapp} />
                      </div>
                      <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-background border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/50 transition-colors text-sm" placeholder={ct.email} />
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold text-muted uppercase tracking-widest block px-1">{ct.promoCode}</label>
                      <div className="flex gap-2">
                        <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} className="flex-1 bg-background border border-white/5 rounded-2xl px-5 py-3 focus:outline-none focus:border-accent/50 transition-colors text-sm uppercase tracking-widest font-black" placeholder="CODE" />
                        <button type="button" onClick={handleApplyCoupon} disabled={isValidatingCoupon || !couponCode} className="bg-white/10 hover:bg-white/20 text-white px-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50">
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
                          <span className={`text-2xl font-black ${appliedCoupon ? "text-accent scale-110" : ""} transition-all`}>
                            {getDiscountedPrice(planType === "monthly" ? (currentPricing.monthlySale || currentPricing.monthly) : (currentPricing.quarterlySale || currentPricing.quarterly)).toFixed(0)} {currentPricing.currency}
                          </span>
                          {appliedCoupon && (
                            <span className="text-[10px] text-muted line-through">
                              {parseFloat(planType === "monthly" ? (currentPricing.monthlySale || currentPricing.monthly) : (currentPricing.quarterlySale || currentPricing.quarterly) || "0").toFixed(0)} {currentPricing.currency}
                            </span>
                          )}
                        </div>
                      </div>

                      <label className="flex items-start gap-3 mb-4 cursor-pointer group px-1">
                        <input type="checkbox" checked={consentChecked} onChange={(e) => setConsentChecked(e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/20 bg-background accent-accent shrink-0" />
                        <span className="text-xs text-muted leading-relaxed group-hover:text-foreground transition-colors">{ct.consentCheckbox}</span>
                      </label>

                      <p className="text-xs text-muted/70 mb-5 px-1 leading-relaxed">{ct.redirectNotice}</p>

                      <MagneticButton>
                        <button disabled={loading || !consentChecked} className="w-full py-5 rounded-full bg-white text-black font-black flex items-center justify-center gap-2 hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : ct.continue}
                        </button>
                      </MagneticButton>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
