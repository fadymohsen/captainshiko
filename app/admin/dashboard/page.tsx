import prisma from "@/lib/prisma";
import { PurchasesList } from "./PurchasesList";

export default async function AdminDashboard() {
  const purchases = await prisma.purchase.findMany({
    include: { plan: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-10">
      <PurchasesList initialPurchases={JSON.parse(JSON.stringify(purchases))} />
    </div>
  );
}
