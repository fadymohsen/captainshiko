import prisma from "@/lib/prisma";

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const h12 = h % 12 || 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

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
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="p-5 text-xs font-bold uppercase tracking-widest text-muted">Date</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest text-muted">Client</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest text-muted">Plan</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest text-muted">Appointment</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest text-muted">Amount</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest text-muted">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {purchases.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-10 text-center text-muted font-medium">No purchases recorded yet.</td>
              </tr>
            ) : (
              purchases.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 text-sm text-muted">{new Date(purchase.createdAt).toLocaleDateString()}</td>
                  <td className="p-5">
                    <p className="font-bold">{purchase.clientName}</p>
                    {purchase.email && <p className="text-xs text-muted mt-0.5">{purchase.email}</p>}
                    <p className="text-xs text-muted">{purchase.whatsapp}</p>
                  </td>
                  <td className="p-5">
                    <p className="text-sm text-accent font-bold">{purchase.plan.nameEn}</p>
                    {purchase.plan.isBooking && (
                      <span className="text-[9px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded bg-accent/15 text-accent-light mt-1 inline-block">
                        Booking
                      </span>
                    )}
                  </td>
                  <td className="p-5">
                    {purchase.bookedDate && purchase.bookedTime ? (
                      <div>
                        <p className="text-sm font-bold text-accent-light">
                          {new Date(purchase.bookedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                        </p>
                        <p className="text-xs text-muted mt-0.5">{formatTime(purchase.bookedTime)}</p>
                      </div>
                    ) : (
                      <span className="text-muted text-xs">—</span>
                    )}
                  </td>
                  <td className="p-5 font-bold">{purchase.amount.toFixed(0)} {purchase.currency}</td>
                  <td className="p-5">
                    <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-md ${
                      purchase.status === "ACTIVE"    ? "bg-green-500/20 text-green-400" :
                      purchase.status === "PENDING"   ? "bg-amber-500/20 text-amber-400" :
                      purchase.status === "CANCELLED" ? "bg-red-500/20 text-red-400"     :
                                                        "bg-white/10 text-muted"
                    }`}>
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
