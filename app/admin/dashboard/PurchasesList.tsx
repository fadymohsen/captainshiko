"use client";

import { useState, useEffect, useCallback } from "react";
import {
  RefreshCw,
  MessageCircle,
  CheckCircle2,
  Trash2,
  Smartphone,
  Mail,
  Clock,
  AlertCircle,
  CreditCard,
  Users,
  X
} from "lucide-react";

// --- Branded Toast ---
type ToastType = "success" | "error" | "info";

function Toast({ message, type, onClose }: { message: string; type: ToastType; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: "border-green-500/30 bg-green-500/10 text-green-400",
    error: "border-red-500/30 bg-red-500/10 text-red-400",
    info: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 shrink-0" />,
    info: <RefreshCw className="w-5 h-5 shrink-0" />,
  };

  return (
    <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${styles[type]} animate-slide-in`}>
      {icons[type]}
      <span className="text-sm font-bold flex-1">{message}</span>
      <button onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// --- Branded Confirm Modal ---
function ConfirmModal({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-red-500/10">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-lg font-black uppercase tracking-wider">Confirm</h3>
        </div>
        <p className="text-sm text-muted mb-8 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-5 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold uppercase tracking-widest hover:bg-red-500/40 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function PurchasesList({ initialPurchases }: { initialPurchases: any[] }) {
  const [purchases, setPurchases] = useState(initialPurchases);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const showToast = (message: string, type: ToastType) => setToast({ message, type });

  const fetchPurchases = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/purchases", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setPurchases(data);
      }
    } catch {}
  }, []);

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(fetchPurchases, 10000);
    return () => clearInterval(interval);
  }, [fetchPurchases]);

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
      } catch {
        throw new Error(`Server returned non-JSON response (Status: ${res.status})`);
      }

      if (data.success) {
        setPurchases(prev =>
          prev.map(p => p.id === id ? { ...p, status: data.status } : p)
        );
        showToast(`Synced! Fawaterak status: ${data.fawaterakStatus}`, "success");
      } else {
        showToast("Sync failed: " + (data.error || "Unknown error"), "error");
      }
    } catch (err: any) {
      showToast("Sync error: " + err.message, "error");
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
        showToast("Status updated successfully", "success");
      } else {
        showToast("Failed to update status", "error");
      }
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/purchases/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPurchases(prev => prev.filter(p => p.id !== id));
        showToast("Order deleted successfully", "success");
      } else {
        showToast("Failed to delete order", "error");
      }
    } catch {
      showToast("Failed to delete order", "error");
    }
    setConfirmDelete(null);
  };

  const openWhatsApp = (phone: string, name: string, plan: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const text = encodeURIComponent(
      `Hello ${name}! I'm Coach Mohamed Roshdy. I received your subscription for the ${plan} plan. Let's start your transformation!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  const formatPhone = (phone: string | null) => {
    if (!phone) return "No phone";
    const digits = phone.replace(/\D/g, "");
    return digits ? `+${digits}` : phone;
  };

  const USD_TO_EGP = 50;
  const totalRevenue = purchases
    .filter(p => p.status === "COMPLETED")
    .reduce((acc, p) => acc + (p.currency === "USD" ? p.amount * USD_TO_EGP : p.amount), 0);
  const pendingOrders = purchases.filter(p => p.status === "PENDING").length;
  const completedOrders = purchases.filter(p => p.status === "COMPLETED").length;

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[300] min-w-[320px]">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}

      {/* Confirm Modal */}
      {confirmDelete && (
        <ConfirmModal
          message="Are you sure you want to delete this order? This action cannot be undone."
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

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
            <CheckCircle2 className="w-4 h-4 text-green-500" /> Completed Orders
          </h3>
          <p className="text-4xl font-black text-green-500">{completedOrders}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div>
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-xl font-bold uppercase tracking-wider">Recent Orders</h2>
        </div>
        <div className="bg-surface-light border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted">Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted">Plan & Amount</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted">Payment</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {purchases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-muted italic">
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
                            <Smartphone className="w-3 h-3" /> {formatPhone(purchase.whatsapp)}
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
                        {purchase.receiptUrl && (
                          <a
                            href={purchase.receiptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-accent-light font-bold mt-1 hover:underline"
                          >
                            📎 Receipt
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-tighter uppercase ${
                          purchase.paymentMethod === "Card" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : purchase.paymentMethod === "Fawry" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                          : purchase.paymentMethod === "Wallet" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : purchase.paymentMethod === "InstaPay" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                          : "bg-white/5 text-muted border border-white/10"
                        }`}>
                          {purchase.paymentMethod || "N/A"}
                        </span>
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
                          {purchase.status !== "COMPLETED" && (
                            <button
                              onClick={() => handleSync(purchase.id)}
                              className="p-2 rounded-xl bg-amber-600/10 text-amber-500 hover:bg-amber-600 hover:text-white transition-all shadow-sm"
                              title="Sync with Fawaterak"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          )}
                          {purchase.whatsapp && (
                            <button
                              onClick={() => openWhatsApp(purchase.whatsapp, purchase.clientName, purchase.plan?.nameEn)}
                              className="p-2 rounded-xl bg-green-600/10 text-green-500 hover:bg-green-600 hover:text-white transition-all shadow-sm"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>
                          )}
                          {purchase.status !== "COMPLETED" && (
                            <button
                              onClick={() => handleUpdateStatus(purchase.id, "COMPLETED")}
                              className="p-2 rounded-xl bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                              title="Mark as Paid"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => setConfirmDelete(purchase.id)}
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
      </div>
    </>
  );
}
