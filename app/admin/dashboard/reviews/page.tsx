"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash2, Star, MessageSquare } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [showPublicReviews, setShowPublicReviews] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      if (res.ok) setReviews(data);
    } catch (err) {
      console.error("Fetch admin reviews error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings?key=showReviewsPage");
      const data = await res.json();
      if (res.ok) setShowPublicReviews(data.value === "true");
    } catch (err) {
      console.error("Fetch settings error:", err);
    }
  };

  const togglePublicReviews = async (checked: boolean) => {
    setShowPublicReviews(checked);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "showReviewsPage", value: checked }),
      });
    } catch (err) {
      console.error("Error updating setting:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchSettings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReviews(reviews.filter((r) => r.id !== id));
      } else {
        alert("Failed to delete review");
      }
    } catch (err) {
      alert("Error deleting review");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
        <p className="text-muted font-bold animate-pulse uppercase tracking-widest text-xs">Loading Reviews...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2">Client <span className="text-accent">Reviews</span></h1>
          <p className="text-muted font-medium">Manage and moderate all plan reviews</p>
        </div>
        <div className="flex items-center gap-3 bg-surface-light border border-white/5 px-6 py-4 rounded-2xl">
          <span className="text-sm font-bold text-muted">Public Reviews Page:</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={showPublicReviews}
              onChange={(e) => togglePublicReviews(e.target.checked)}
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
          </label>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            {showPublicReviews ? "Visible" : "Hidden"}
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        {reviews.length === 0 ? (
          <div className="bg-surface-light border border-white/5 rounded-3xl p-20 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-10 h-10 text-muted" />
            </div>
            <h3 className="text-xl font-bold mb-2">No reviews found</h3>
            <p className="text-muted">When clients leave reviews, they will appear here.</p>
          </div>
        ) : (
          <div className="bg-surface-light border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted">Client</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted">Plan</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted">Rating</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted">Comment</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted">Date</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {reviews.map((review) => (
                    <tr key={review.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-6">
                        <span className="font-bold block">{review.clientName}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-black uppercase tracking-tight text-accent-light">
                          {review.plan.nameEn}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-white/10'}`} />
                          ))}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm text-muted max-w-xs line-clamp-2 italic">"{review.comment}"</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[10px] font-bold text-muted uppercase whitespace-nowrap">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button
                          onClick={() => handleDelete(review.id)}
                          disabled={deletingId === review.id}
                          className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                          title="Delete Review"
                        >
                          {deletingId === review.id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
