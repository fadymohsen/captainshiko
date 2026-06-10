import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FeaturesEditor } from "./FeaturesEditor";

const prisma = new PrismaClient();

export async function updatePlanAction(id: string, formData: FormData) {
  'use server';
  
  try {
    await prisma.plan.update({
      where: { id },
      data: {
        nameEn: formData.get('nameEn') as string,
        nameAr: formData.get('nameAr') as string,
        briefEn: formData.get('briefEn') as string,
        briefAr: formData.get('briefAr') as string,
        videoUrl: formData.get('videoUrl') as string || null,
        featuresEn: formData.get('featuresEn') as string,
        featuresAr: formData.get('featuresAr') as string,
        priceMonthlyEgp: formData.get('priceMonthlyEgp') as string || null,
        priceQuarterlyEgp: formData.get('priceQuarterlyEgp') as string || null,
        priceMonthlyUsd: formData.get('priceMonthlyUsd') as string || null,
        priceQuarterlyUsd: formData.get('priceQuarterlyUsd') as string || null,
        salePriceMonthlyEgp: formData.get('salePriceMonthlyEgp') as string || null,
        salePriceQuarterlyEgp: formData.get('salePriceQuarterlyEgp') as string || null,
        salePriceMonthlyUsd: formData.get('salePriceMonthlyUsd') as string || null,
        salePriceQuarterlyUsd: formData.get('salePriceQuarterlyUsd') as string || null,
        isOnHold: formData.get('isOnHold') === 'on',
        followUpFrequency: (formData.get('followUpFrequency') as string) || null,
        isBooking: formData.get('isBooking') === 'on',
        bookingStartHour: formData.get('bookingStartHour') ? parseInt(formData.get('bookingStartHour') as string) : null,
        bookingEndHour: formData.get('bookingEndHour') ? parseInt(formData.get('bookingEndHour') as string) : null,
        bookingSlotMins: formData.get('bookingSlotMins') ? parseInt(formData.get('bookingSlotMins') as string) : null,
      }
    });

    revalidatePath('/', 'layout');
  } catch (error) {
    console.error("Failed to update plan:", error);
    throw error;
  }
  
  redirect('/admin/dashboard/plans');
}

export default async function EditPlanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = await prisma.plan.findUnique({
    where: { id }
  });

  if (!plan) return <div>Plan not found</div>;

  const updatePlanWithId = updatePlanAction.bind(null, id);

  // Safely parse features
  const featuresEn = JSON.parse(plan.featuresEn || "[]");
  const featuresAr = JSON.parse(plan.featuresAr || "[]");

  return (
    <div className="max-w-4xl pb-20">
      <h1 className="text-3xl font-black mb-8 tracking-tight">Edit Service: {plan.nameEn}</h1>
      
      <form action={updatePlanWithId} className="flex flex-col gap-8 bg-white/5 border border-white/10 p-8 rounded-3xl">

        {/* Availability Section */}
        <div className="border-b border-white/10 pb-8">
          <h3 className="uppercase tracking-widest text-accent text-xs font-bold mb-6">Availability Control</h3>
          <label className="flex items-start gap-4 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                name="isOnHold"
                defaultChecked={plan.isOnHold}
                className="sr-only peer"
              />
              <div className="w-12 h-6 rounded-full bg-white/10 peer-checked:bg-amber-500/80 transition-all duration-300 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:transition-all after:duration-300 peer-checked:after:translate-x-6" />
            </div>
            <div>
              <span className="text-sm font-bold text-foreground group-hover:text-accent-light transition-colors">Put on Hold (Fully Booked)</span>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Plan stays visible with a "Fully Booked" badge but clients cannot subscribe. Use this to create scarcity and anticipation while pausing intake.
              </p>
            </div>
          </label>

          <div className="mt-6">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-foreground">Follow-up Frequency Tag</span>
              <p className="text-xs text-muted leading-relaxed">Displayed as a badge on the plan card to highlight how often clients receive follow-ups.</p>
              <select
                name="followUpFrequency"
                defaultValue={plan.followUpFrequency || ''}
                className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none mt-1"
              >
                <option value="">— No tag —</option>
                <option value="daily">Daily Follow-up</option>
                <option value="weekly">Weekly Follow-up</option>
                <option value="monthly">Monthly Follow-up</option>
              </select>
            </label>
          </div>
        </div>

        {/* Booking Settings Section */}
        <div className="border-b border-white/10 pb-8">
          <h3 className="uppercase tracking-widest text-accent text-xs font-bold mb-6">Booking / Consultation Settings</h3>

          <label className="flex items-start gap-4 cursor-pointer group mb-6">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                name="isBooking"
                defaultChecked={plan.isBooking}
                className="sr-only peer"
              />
              <div className="w-12 h-6 rounded-full bg-white/10 peer-checked:bg-accent/80 transition-all duration-300 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:transition-all after:duration-300 peer-checked:after:translate-x-6" />
            </div>
            <div>
              <span className="text-sm font-bold text-foreground group-hover:text-accent-light transition-colors">This is a Booking / Consultation Plan</span>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Enables the calendar picker on the plan page so clients can select a date and time slot before checkout.
              </p>
            </div>
          </label>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-5">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted">Duration Organizer (Cairo time · UTC+2)</h4>
            <div className="grid grid-cols-3 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-muted uppercase">Start Hour</span>
                <select
                  name="bookingStartHour"
                  defaultValue={(plan as any).bookingStartHour ?? 9}
                  className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none text-sm"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i === 0 ? '12:00 AM' : i < 12 ? `${i}:00 AM` : i === 12 ? '12:00 PM' : `${i - 12}:00 PM`}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-muted italic">First available slot</p>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-muted uppercase">End Hour</span>
                <select
                  name="bookingEndHour"
                  defaultValue={(plan as any).bookingEndHour ?? 16}
                  className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none text-sm"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i === 0 ? '12:00 AM' : i < 12 ? `${i}:00 AM` : i === 12 ? '12:00 PM' : `${i - 12}:00 PM`}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-muted italic">No slots start at or after this hour</p>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-muted uppercase">Slot Duration</span>
                <select
                  name="bookingSlotMins"
                  defaultValue={(plan as any).bookingSlotMins ?? 60}
                  className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none text-sm"
                >
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes (1 hour)</option>
                  <option value={90}>90 minutes</option>
                  <option value={120}>120 minutes (2 hours)</option>
                </select>
                <p className="text-[10px] text-muted italic">Duration per appointment</p>
              </label>
            </div>
            <p className="text-[10px] text-accent/70 font-bold leading-relaxed">
              Example: Start 9, End 16, Slot 60 min → slots at 9:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00 (last slot ends at 16:00).
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-8 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-6">
            <h3 className="uppercase tracking-widest text-accent text-xs font-bold">English Content</h3>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Name</span>
              <input type="text" name="nameEn" defaultValue={plan.nameEn} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" required />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Brief Description</span>
              <textarea name="briefEn" defaultValue={plan.briefEn} className="bg-background/50 border border-white/10 p-3 rounded-xl min-h-[100px] focus:border-accent outline-none" required />
            </label>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold text-muted">Benefits (Features)</span>
              <FeaturesEditor initialFeatures={featuresEn} name="featuresEn" />
            </div>
          </div>
          
          <div className="flex flex-col gap-6 dir-rtl text-right">
            <h3 className="uppercase tracking-widest text-accent text-xs font-bold">المحتوى العربي</h3>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">الاسم</span>
              <input type="text" name="nameAr" defaultValue={plan.nameAr} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" required />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">وصف مختصر</span>
              <textarea name="briefAr" defaultValue={plan.briefAr} className="bg-background/50 border border-white/10 p-3 rounded-xl min-h-[100px] focus:border-accent outline-none" required />
            </label>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold text-muted">المميزات (الفوائد)</span>
              <FeaturesEditor initialFeatures={featuresAr} name="featuresAr" />
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="border-b border-white/10 pb-8">
          <h3 className="uppercase tracking-widest text-accent text-xs font-bold mb-6">Visual Guide (Video)</h3>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold text-muted">Instagram Reel or YouTube Short Link</span>
            <input 
              type="url" 
              name="videoUrl" 
              defaultValue={plan.videoUrl || ''} 
              placeholder="https://www.instagram.com/reel/XYZ/ or https://www.youtube.com/shorts/ABC"
              className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" 
            />
            <p className="text-[10px] text-muted font-medium px-1 italic">* 9:16 portrait videos only. Autoplay will be disabled automatically.</p>
          </label>
        </div>

        {/* Pricing Section */}
        <div className="grid md:grid-cols-2 gap-8 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-4">
            <h3 className="uppercase tracking-widest text-accent text-xs font-bold">Pricing for Egypt (EGP)</h3>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Monthly Price</span>
              <input type="text" name="priceMonthlyEgp" defaultValue={plan.priceMonthlyEgp || ''} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Quarterly Price</span>
              <input type="text" name="priceQuarterlyEgp" defaultValue={plan.priceQuarterlyEgp || ''} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-accent uppercase">Monthly Sale</span>
                <input type="text" name="salePriceMonthlyEgp" defaultValue={plan.salePriceMonthlyEgp || ''} placeholder="Special Price" className="bg-accent/5 border border-accent/20 p-3 rounded-xl focus:border-accent outline-none" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-accent uppercase">Quarterly Sale</span>
                <input type="text" name="salePriceQuarterlyEgp" defaultValue={plan.salePriceQuarterlyEgp || ''} placeholder="Special Price" className="bg-accent/5 border border-accent/20 p-3 rounded-xl focus:border-accent outline-none" />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="uppercase tracking-widest text-accent text-xs font-bold">Global Pricing (USD)</h3>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Monthly Price</span>
              <input type="text" name="priceMonthlyUsd" defaultValue={plan.priceMonthlyUsd || ''} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Quarterly Price</span>
              <input type="text" name="priceQuarterlyUsd" defaultValue={plan.priceQuarterlyUsd || ''} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-accent uppercase">Monthly Sale</span>
                <input type="text" name="salePriceMonthlyUsd" defaultValue={plan.salePriceMonthlyUsd || ''} placeholder="Special Price" className="bg-accent/5 border border-accent/20 p-3 rounded-xl focus:border-accent outline-none" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-accent uppercase">Quarterly Sale</span>
                <input type="text" name="salePriceQuarterlyUsd" defaultValue={plan.salePriceQuarterlyUsd || ''} placeholder="Special Price" className="bg-accent/5 border border-accent/20 p-3 rounded-xl focus:border-accent outline-none" />
              </label>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <button type="submit" className="bg-accent hover:bg-accent-light text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-lg flex-1 md:flex-none">
            Save Changes
          </button>
          <a href="/admin/dashboard/plans" className="border border-white/10 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white/5 transition-all text-center flex-1 md:flex-none">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
