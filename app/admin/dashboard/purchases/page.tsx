import prisma from "@/lib/prisma";

export default async function PurchasesPage() {
  const purchases = await prisma.purchase.findMany({
    include: { plan: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">Purchases</h1>
          <p className="text-muted text-sm font-medium">Track your clients' purchases and sign-ups.</p>
        </div>
        <button className="bg-accent text-white font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-accent-light transition-all shadow-lg text-sm">
          Manual Entry
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="p-5 text-xs font-bold uppercase tracking-widest text-muted">Date</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest text-muted">Client Name</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest text-muted">Plan</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest text-muted">Amount</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest text-muted">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {purchases.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-muted font-medium">No purchases recorded yet.</td>
              </tr>
            ) : (
              purchases.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 text-sm">{new Date(purchase.createdAt).toLocaleDateString()}</td>
                  <td className="p-5 font-bold">{purchase.clientName}</td>
                  <td className="p-5 text-sm text-accent font-medium">{purchase.plan.nameEn}</td>
                  <td className="p-5 font-bold">{purchase.amount} {purchase.currency}</td>
                  <td className="p-5">
                    <span className="text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-md bg-green-500/20 text-green-400">
                      {purchase.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
