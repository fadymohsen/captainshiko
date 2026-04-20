import prisma from "@/lib/prisma";

export default async function CouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">Coupons</h1>
          <p className="text-muted text-sm font-medium">Manage discounts and promotional codes.</p>
        </div>
        <a href="/admin/dashboard/coupons/new" className="bg-accent text-white font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-accent-light transition-all shadow-lg text-sm">
          Create New Coupon
        </a>
      </div>

      <div className="grid gap-6">
        {coupons.length === 0 ? (
          <div className="bg-white/5 border border-white/10 p-12 rounded-3xl text-center text-muted">
            No coupons created yet.
          </div>
        ) : (
          coupons.map((coupon) => (
            <div key={coupon.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-accent/20 text-accent px-3 py-1 rounded-lg text-lg font-black tracking-widest">{coupon.code}</span>
                  <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-md ${coupon.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {coupon.isActive ? 'Active' : 'Expired/Paused'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                   <div className="text-xs font-bold uppercase tracking-widest text-muted/80 bg-background/50 px-3 py-1.5 rounded-lg border border-white/5">
                      Type: <span className="text-foreground">{coupon.type}</span>
                   </div>
                   <div className="text-xs font-bold uppercase tracking-widest text-muted/80 bg-background/50 px-3 py-1.5 rounded-lg border border-white/5">
                      Value: <span className="text-foreground">{coupon.value}{coupon.type === 'PERCENTAGE' ? '%' : ' EGP'}</span>
                   </div>
                   <div className="text-xs font-bold uppercase tracking-widest text-muted/80 bg-background/50 px-3 py-1.5 rounded-lg border border-white/5">
                      Usage: <span className={coupon.totalLimit && coupon.usageCount >= coupon.totalLimit ? 'text-red-400' : 'text-foreground'}>
                        {coupon.usageCount} / {coupon.totalLimit || '∞'}
                      </span>
                   </div>
                   <div className="text-xs font-bold uppercase tracking-widest text-muted/80 bg-background/50 px-3 py-1.5 rounded-lg border border-white/5">
                      Scope: <span className="text-foreground">{coupon.appliesToAll ? 'All Plans' : `${coupon.planIds.length} Plans`}</span>
                   </div>
                </div>
              </div>

              {/* Edit Button */}
              <a href={`/admin/dashboard/coupons/${coupon.id}`} className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-colors">
                View Analytics & Edit
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
