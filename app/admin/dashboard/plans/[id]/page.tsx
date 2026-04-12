import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
        priceMonthlyEgp: formData.get('priceMonthlyEgp') as string || null,
        priceQuarterlyEgp: formData.get('priceQuarterlyEgp') as string || null,
        priceMonthlyUsd: formData.get('priceMonthlyUsd') as string || null,
        priceQuarterlyUsd: formData.get('priceQuarterlyUsd') as string || null,
      }
    });

    revalidatePath('/', 'layout'); // Purge entire cache including dashboard, locale routes, plans
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

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-black mb-8 tracking-tight">Edit Service: {plan.nameEn}</h1>
      
      <form action={updatePlanWithId} className="flex flex-col gap-8 bg-white/5 border border-white/10 p-8 rounded-3xl">

        
        <div className="grid md:grid-cols-2 gap-8 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-4">
            <h3 className="uppercase tracking-widest text-accent text-xs font-bold">English Content</h3>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Name</span>
              <input type="text" name="nameEn" defaultValue={plan.nameEn} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" required />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">Brief Description</span>
              <textarea name="briefEn" defaultValue={plan.briefEn} className="bg-background/50 border border-white/10 p-3 rounded-xl min-h-[100px] focus:border-accent outline-none" required />
            </label>
          </div>
          
          <div className="flex flex-col gap-4 dir-rtl text-right">
            <h3 className="uppercase tracking-widest text-accent text-xs font-bold">المحتوى العربي</h3>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">الاسم</span>
              <input type="text" name="nameAr" defaultValue={plan.nameAr} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" required />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-muted">وصف مختصر</span>
              <textarea name="briefAr" defaultValue={plan.briefAr} className="bg-background/50 border border-white/10 p-3 rounded-xl min-h-[100px] focus:border-accent outline-none" required />
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
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
          </div>
        </div>

        <div className="pt-6 flex gap-4">
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
