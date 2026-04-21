"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePlanButton({ planId }: { planId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this plan? This action cannot be undone.")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/plans/${planId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete plan");
        return;
      }
      router.refresh();
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-500/20 hover:bg-red-500/40 text-red-400 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-colors disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
