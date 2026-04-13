import prisma from "@/lib/prisma";
import { PurchasesList } from "./PurchasesList";
import { CreditCard, Users, CheckCircle, Clock } from "lucide-react";

export default async function AdminDashboard() {
  const purchases = await prisma.purchase.findMany({
    include: { plan: true },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = purchases
    .filter(p => p.status === "COMPLETED")
    .reduce((acc, p) => acc + p.amount, 0);

  const pendingOrders = purchases.filter(p => p.status === "PENDING").length;
  const completedOrders = purchases.filter(p => p.status === "COMPLETED").length;

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight uppercase">Command Center</h1>
          <p className="text-muted text-sm font-medium">Manage your elite coaching registrations and payments.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-5 py-3 rounded-2xl bg-accent text-white font-black shadow-lg shadow-accent/20 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Total Revenue: {totalRevenue.toLocaleString()} EGP
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[50px] -mr-16 -mt-16 group-hover:bg-accent/20 transition-all duration-500" />
          <h3 className="text-muted text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" /> Total Customers
          </h3>
          <p className="text-4xl font-black">{purchases.length}</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[50px] -mr-16 -mt-16 group-hover:bg-amber-500/20 transition-all duration-500" />
          <h3 className="text-muted text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" /> Pending Approval
          </h3>
          <p className="text-4xl font-black text-amber-500">{pendingOrders}</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[50px] -mr-16 -mt-16 group-hover:bg-green-500/20 transition-all duration-500" />
          <h3 className="text-muted text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" /> Completed Orders
          </h3>
          <p className="text-4xl font-black text-green-500">{completedOrders}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div>
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-xl font-bold uppercase tracking-wider">Recent Orders</h2>
        </div>
        <PurchasesList initialPurchases={JSON.parse(JSON.stringify(purchases))} />
      </div>
    </div>
  );
}
