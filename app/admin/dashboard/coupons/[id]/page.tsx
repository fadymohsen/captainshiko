import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PlanSelector } from "../PlanSelector";
import { Trash2, Users, TrendingUp, HandCoins } from "lucide-react";

export async function manageCouponAction(id: string | null, formData: FormData) {
  'use server';
  
  const code = (formData.get('code') as string).toUpperCase().replace(/\s+/g, '');
  const data = {
    code,
    type: formData.get('type') as string,
    value: parseFloat(formData.get('value') as string),
    totalLimit: formData.get('totalLimit') ? parseInt(formData.get('totalLimit') as string) : null,
    perUserLimit: formData.get('perUserLimit') ? parseInt(formData.get('perUserLimit') as string) : 1,
    isActive: formData.get('isActive') === 'true',
    appliesToAll: formData.get('appliesToAll') === 'true',
    planIds: JSON.parse(formData.get('planIds') as string || '[]'),
  };

  if (id && id !== 'new') {
    await prisma.coupon.update({
      where: { id },
      data
    });
  } else {
    await prisma.coupon.create({
      data
    });
  }

  revalidatePath('/admin/dashboard/coupons');
  redirect('/admin/dashboard/coupons');
}

export async function deleteCouponAction(id: string) {
  'use server';
  await prisma.coupon.delete({ where: { id } });
  revalidatePath('/admin/dashboard/coupons');
  redirect('/admin/dashboard/coupons');
}

export default async function CouponDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === 'new';
  
  const coupon = isNew ? null : await prisma.coupon.findUnique({
    where: { id },
    include: { purchases: { orderBy: { createdAt: 'desc' } } }
  });

  const plans = await prisma.plan.findMany({
    select: { id: true, nameEn: true },
    where: { isActive: true }
  });

  if (!isNew && !coupon) return <div>Coupon not found</div>;

  const totalDiscount = coupon?.purchases.reduce((acc, curr) => acc + (curr.discountAmount || 0), 0) || 0;

  return (
    <div className="max-w-6xl pb-20">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-black tracking-tight">
           {isNew ? 'Create New Coupon' : `Edit Coupon: ${coupon?.code}`}
         </h1>
         {!isNew && (
            <form action={deleteCouponAction.bind(null, id)}>
               <button className="flex items-center gap-2 text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-xl transition-colors font-bold uppercase tracking-widest text-xs">
                 <Trash2 className="w-4 h-4" />
                 Delete Coupon
               </button>
            </form>
         )}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className="lg:col-span-7">
          <form action={manageCouponAction.bind(null, id)} className="flex flex-col gap-8 bg-white/5 border border-white/10 p-8 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-muted">Coupon Code</span>
                <input type="text" name="code" defaultValue={coupon?.code || ''} placeholder="SUMMER20" className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none font-black uppercase tracking-widest" required />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-muted">Status</span>
                <select name="isActive" defaultValue={String(coupon?.isActive ?? true)} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none appearance-none">
                  <option value="true">Active</option>
                  <option value="false">Paused / Expired</option>
                </select>
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-muted">Discount Type</span>
                <select name="type" defaultValue={coupon?.type || 'PERCENTAGE'} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none appearance-none">
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="FIXED">Fixed Amount (EGP)</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-muted">Discount Value</span>
                <input type="number" step="0.01" name="value" defaultValue={coupon?.value || ''} placeholder="10" className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" required />
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-muted">Total Usage Limit</span>
                <input type="number" name="totalLimit" defaultValue={coupon?.totalLimit || ''} placeholder="Unlimited if empty" className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-muted">Per-User Limit</span>
                <input type="number" name="perUserLimit" defaultValue={coupon?.perUserLimit || 1} className="bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none" required />
              </label>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h3 className="text-sm font-bold text-muted mb-4">Service Targeting</h3>
              <PlanSelector 
                plans={plans} 
                initialSelected={coupon?.planIds || []} 
                initialAppliesToAll={coupon?.appliesToAll ?? true} 
              />
            </div>

            <div className="pt-6 flex gap-4">
              <button type="submit" className="bg-accent hover:bg-accent-light text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-lg flex-1">
                {isNew ? 'Create Coupon' : 'Save Changes'}
              </button>
              <a href="/admin/dashboard/coupons" className="border border-white/10 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white/5 transition-all text-center flex-1">
                Cancel
              </a>
            </div>
          </form>
        </div>

        {/* Analytics Section */}
        {!isNew && (
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-6">Quick Stats</h3>
              <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
                 <div className="p-4 rounded-2xl bg-background/50 border border-white/5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted font-bold uppercase tracking-tighter">Total Uses</div>
                      <div className="text-xl font-black">{coupon?.usageCount}</div>
                    </div>
                 </div>
                 <div className="p-4 rounded-2xl bg-background/50 border border-white/5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                      <HandCoins className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted font-bold uppercase tracking-tighter">Total Discounted</div>
                      <div className="text-xl font-black">{totalDiscount.toFixed(2)} EGP</div>
                    </div>
                 </div>
                 <div className="p-4 rounded-2xl bg-background/50 border border-white/5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted font-bold uppercase tracking-tighter">Avg. Per Use</div>
                      <div className="text-xl font-black">{coupon?.usageCount ? (totalDiscount / coupon.usageCount).toFixed(2) : 0} EGP</div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-6">Recent Usages</h3>
              <div className="space-y-4">
                {coupon?.purchases.length === 0 ? (
                  <p className="text-sm text-muted italic">No uses yet.</p>
                ) : (
                  coupon?.purchases.slice(0, 5).map(purchase => (
                    <div key={purchase.id} className="p-4 rounded-xl border border-white/5 bg-background/30 flex justify-between items-center text-sm">
                       <div>
                         <div className="font-bold">{purchase.clientName}</div>
                         <div className="text-[10px] text-muted">{new Date(purchase.createdAt).toLocaleDateString()}</div>
                       </div>
                       <div className="text-accent font-black">-{purchase.discountAmount} EGP</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
