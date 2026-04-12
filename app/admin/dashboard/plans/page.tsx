import prisma from "@/lib/prisma";

export default async function PlansPage() {
  const plans = await prisma.plan.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-black mb-2 tracking-tight">Services & Plans</h1>
        <p className="text-muted text-sm font-medium">Manage pricing, details, and features of your coaching packages.</p>
      </div>

      <div className="grid gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold">{plan.nameEn}</h2>
                <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-md ${plan.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {plan.isActive ? 'Active' : 'Hidden'}
                </span>
              </div>
              <p className="text-sm text-muted line-clamp-2 mb-4">{plan.briefEn}</p>
              
              <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-muted/80">
                <div className="bg-background/50 px-3 py-1.5 rounded-lg border border-white/5">
                  <span className="text-foreground">EGP:</span> {plan.priceMonthlyEgp || 'N/A'}/mo | {plan.priceQuarterlyEgp || 'N/A'}/3mo
                </div>
                <div className="bg-background/50 px-3 py-1.5 rounded-lg border border-white/5">
                  <span className="text-foreground">USD:</span> {plan.priceMonthlyUsd || 'N/A'}/mo | {plan.priceQuarterlyUsd || 'N/A'}/3mo
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <a href={`/admin/dashboard/plans/${plan.id}`} className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-colors">
              Edit Plan
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
