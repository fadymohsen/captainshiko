import prisma from "@/lib/prisma";
import { SessionsCalendar } from "./SessionsCalendar";

export default async function SessionsPage() {
  const purchases = await prisma.purchase.findMany({
    where: {
      bookedDate: { not: null },
      bookedTime: { not: null },
    },
    include: { plan: true },
    orderBy: [{ bookedDate: "asc" }, { bookedTime: "asc" }],
  });

  const sessions = purchases.map((p) => ({
    id: p.id,
    clientName: p.clientName,
    email: p.email,
    whatsapp: p.whatsapp ?? "",
    bookedDate: p.bookedDate!,
    bookedTime: p.bookedTime!,
    status: p.status,
    amount: p.amount,
    currency: p.currency,
    planName: p.plan.nameEn,
  }));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-black mb-2 tracking-tight">Sessions Calendar</h1>
        <p className="text-muted text-sm font-medium">View and track all booked consultation sessions.</p>
      </div>
      <SessionsCalendar sessions={sessions} />
    </div>
  );
}
