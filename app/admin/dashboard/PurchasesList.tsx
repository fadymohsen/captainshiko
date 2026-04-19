"use client";

import { useState } from "react";
import { 
  RefreshCw,
  MessageCircle, 
  CheckCircle2, 
  Trash2, 
  ExternalLink, 
  Smartphone, 
  Mail, 
  Clock, 
  AlertCircle 
} from "lucide-react";

export function PurchasesList({ initialPurchases }: { initialPurchases: any[] }) {
  const [purchases, setPurchases] = useState(initialPurchases);

  const handleSync = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/purchases/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync" }),
      });
      
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error(`Server returned non-JSON response (Status: ${res.status})`);
      }

      if (data.success) {
        setPurchases(prev => 
          prev.map(p => p.id === id ? { ...p, status: data.status } : p)
        );
        alert(`Status synced! Current Fawaterak status: ${data.fawaterakStatus}`);
      } else {
        alert("Sync failed: " + (data.error || "Unknown server error"));
      }
    } catch (err: any) {
      alert("Sync error: " + err.message);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/purchases/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setPurchases(prev => 
          prev.map(p => p.id === id ? { ...p, status: newStatus } : p)
        );
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`/api/admin/purchases/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPurchases(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      alert("Failed to delete order");
    }
  };

  const openWhatsApp = (phone: string, name: string, plan: string) => {
    // Note: We use the customer's phone here, so no need to hardcode Roshdy's number
    const cleanPhone = phone.replace(/\D/g, "");
    const text = encodeURIComponent(
      `Hello ${name}! I'm Coach Mohamed Roshdy. I received your subscription for the ${plan} plan. Let's start your transformation!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  return (
    <div className="bg-surface-light border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted">Date</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted">Customer</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted">Plan & Amount</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {purchases.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-muted italic">
                  No orders found.
                </td>
              </tr>
            ) : (
              purchases.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">
                      {new Date(purchase.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                    </div>
                    <div className="text-[10px] text-muted flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {new Date(purchase.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-foreground">{purchase.clientName}</div>
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="text-xs text-muted flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {purchase.email || "No email"}
                      </div>
                      <div className="text-xs text-accent-light font-medium flex items-center gap-1">
                        <Smartphone className="w-3 h-3" /> {purchase.whatsapp || "No phone"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-accent-light">
                      {purchase.plan?.nameEn || "Custom Plan"}
                    </div>
                    <div className="text-xs font-black mt-1">
                      {purchase.amount} {purchase.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-tighter uppercase ${
                      purchase.status === "COMPLETED" 
                        ? "bg-green-500/20 text-green-500 border border-green-500/30" 
                        : purchase.status === "FAILED"
                        ? "bg-red-500/20 text-red-500 border border-red-500/30"
                        : "bg-amber-500/20 text-amber-500 border border-amber-500/30"
                    }`}>
                      {purchase.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Sync with Fawaterak */}
                      {purchase.status !== "COMPLETED" && (
                        <button
                          onClick={() => handleSync(purchase.id)}
                          className="p-2 rounded-xl bg-amber-600/10 text-amber-500 hover:bg-amber-600 hover:text-white transition-all shadow-sm"
                          title="Sync with Fawaterak"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}

                      {/* WhatsApp Chat */}
                      {purchase.whatsapp && (
                        <button
                          onClick={() => openWhatsApp(purchase.whatsapp, purchase.clientName, purchase.plan?.nameEn)}
                          className="p-2 rounded-xl bg-green-600/10 text-green-500 hover:bg-green-600 hover:text-white transition-all shadow-sm"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      )}
                      
                      {/* Mark as Paid */}
                      {purchase.status !== "COMPLETED" && (
                        <button
                          onClick={() => handleUpdateStatus(purchase.id, "COMPLETED")}
                          className="p-2 rounded-xl bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          title="Mark as Paid"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(purchase.id)}
                        className="p-2 rounded-xl bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
