import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FeaturesEditor } from "../[id]/FeaturesEditor";

const prisma = new PrismaClient();

export async function createPlanAction(formData: FormData) {
  'use server';
  
  try {
    const nameEn = formData.get('nameEn') as string;
    const slug = nameEn.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    await prisma.plan.create({
      data: {
        slug,
        nameEn,
        nameAr: formData.get('nameAr') as string,
        briefEn: formData.get('briefEn') as string,
        briefAr: formData.get('briefAr') as string,
        videoUrl: formData.get('videoUrl') as string || null,
        featuresEn: formData.get('featuresEn') as string || "[]",
        featuresAr: formData.get('featuresAr') as string || "[]",
        priceMonthlyEgp: formData.get('priceMonthlyEgp') as string || null,
        priceQuarterlyEgp: formData.get('priceQuarterlyEgp') as string || null,
        priceMonthlyUsd: formData.get('priceMonthlyUsd') as string || null,
        priceQuarterlyUsd: formData.get('priceQuarterlyUsd') as string || null,
        salePriceMonthlyEgp: formData.get('salePriceMonthlyEgp') as string || null,
        salePriceQuarterlyEgp: formData.get('salePriceQuarterlyEgp') as string || null,
        salePriceMonthlyUsd: formData.get('salePriceMonthlyUsd') as string || null,
        salePriceQuarterlyUsd: formData.get('salePriceQuarterlyUsd') as string || null,
        isActive: true,
      }
    });

    revalidatePath('/', 'layout');
    revalidatePath('/admin/dashboard/plans');
  } catch (error) {
    console.error("Failed to create plan:", error);
    throw error;
  }
  
  redirect('/admin/dashboard/plans');
}

export default async function NewPlanPage() {
  return (
    <div className="max-w-4xl pb-20">
      <h1 className="text-3xl font-black mb-8 tracking-tight">Create New Service</h1>
      
      <form action={createPlanAction} className="flex flex-col gap-8 bg-white/5 border border-white/10 p-8 rounded-3xl">

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-8 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-6">
            <h3 className="uppercase tracking-widest text-accent text-xs font-bold">English Content</h3>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Name</span>
              <input type="text" name="nameEn" className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" required />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Brief Description</span>
              <textarea name="briefEn" className="bg-background/50 border border-white/10 p-3 rounded-xl min-h-[100px] focus:border-accent outline-none" required />
            </label>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold text-muted">Benefits (Features)</span>
              <FeaturesEditor initialFeatures={[]} name="featuresEn" />
            </div>
          </div>
          
          <div className="flex flex-col gap-6 dir-rtl text-right">
            <h3 className="uppercase tracking-widest text-accent text-xs font-bold">المحتوى العربي</h3>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">الاسم</span>
              <input type="text" name="nameAr" className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" required />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">وصف مختصر</span>
              <textarea name="briefAr" className="bg-background/50 border border-white/10 p-3 rounded-xl min-h-[100px] focus:border-accent outline-none" required />
            </label>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold text-muted">المميزات (الفوائد)</span>
              <FeaturesEditor initialFeatures={[]} name="featuresAr" />
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
              placeholder="https://www.instagram.com/reel/XYZ/ or https://www.youtube.com/shorts/ABC"
              className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" 
            />
          </label>
        </div>

        {/* Pricing Section */}
        <div className="grid md:grid-cols-2 gap-8 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-4">
            <h3 className="uppercase tracking-widest text-accent text-xs font-bold">Pricing for Egypt (EGP)</h3>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Monthly Price</span>
              <input type="text" name="priceMonthlyEgp" className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Quarterly Price</span>
              <input type="text" name="priceQuarterlyEgp" className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-accent uppercase">Monthly Sale</span>
                <input type="text" name="salePriceMonthlyEgp" placeholder="Special Price" className="bg-accent/5 border border-accent/20 p-3 rounded-xl focus:border-accent outline-none" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-accent uppercase">Quarterly Sale</span>
                <input type="text" name="salePriceQuarterlyEgp" placeholder="Special Price" className="bg-accent/5 border border-accent/20 p-3 rounded-xl focus:border-accent outline-none" />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="uppercase tracking-widest text-accent text-xs font-bold">Global Pricing (USD)</h3>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Monthly Price</span>
              <input type="text" name="priceMonthlyUsd" className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Quarterly Price</span>
              <input type="text" name="priceQuarterlyUsd" className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-accent uppercase">Monthly Sale</span>
                <input type="text" name="salePriceMonthlyUsd" placeholder="Special Price" className="bg-accent/5 border border-accent/20 p-3 rounded-xl focus:border-accent outline-none" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-accent uppercase">Quarterly Sale</span>
                <input type="text" name="salePriceQuarterlyUsd" placeholder="Special Price" className="bg-accent/5 border border-accent/20 p-3 rounded-xl focus:border-accent outline-none" />
              </label>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <button type="submit" className="bg-accent hover:bg-accent-light text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-lg flex-1 md:flex-none">
            Create Plan
          </button>
          <a href="/admin/dashboard/plans" className="border border-white/10 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white/5 transition-all text-center flex-1 md:flex-none">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
