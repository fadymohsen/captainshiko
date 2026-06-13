"use client";

import { useState, useEffect } from "react";

type Session = {
  id: string;
  clientName: string;
  email: string | null;
  whatsapp: string;
  bookedDate: string;
  bookedTime: string;
  status: string;
  amount: number;
  currency: string;
  planName: string;
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const h12 = h % 12 || 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

function isSessionPast(bookedDate: string, bookedTime: string) {
  const [h, m] = bookedTime.split(":").map(Number);
  const dt = new Date(bookedDate + "T00:00:00");
  dt.setHours(h, m, 0, 0);
  return dt < new Date();
}

function getDisplayStatus(session: Session): { label: string; classes: string } {
  if (session.status === "CANCELLED") {
    return { label: "CANCELLED", classes: "bg-red-500/20 text-red-400" };
  }
  if (session.status === "COMPLETED" || session.status === "ACTIVE") {
    if (isSessionPast(session.bookedDate, session.bookedTime)) {
      return { label: "COMPLETED", classes: "bg-white/10 text-muted" };
    }
    return { label: "PAID", classes: "bg-green-500/20 text-green-400" };
  }
  if (session.status === "PENDING") {
    return { label: "PENDING", classes: "bg-amber-500/20 text-amber-400" };
  }
  return { label: session.status, classes: "bg-white/10 text-muted" };
}

/* ─── Alert Modal ─── */
function AlertModal({
  open,
  title,
  message,
  confirmLabel,
  confirmColor,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  confirmColor: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#111] border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
        <h3 className="text-lg font-black tracking-tight">{title}</h3>
        <p className="text-sm text-muted leading-relaxed">{message}</p>
        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-sm font-bold hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${confirmColor}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function SessionsCalendar({ sessions: initialSessions }: { sessions: Session[] }) {
  const [sessions, setSessions] = useState(initialSessions);
  const now = new Date();
  const [viewYear, setViewYear]     = useState(now.getFullYear());
  const [viewMonth, setViewMonth]   = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Alert state
  const [alert, setAlert] = useState<{
    open: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    confirmColor: string;
    action: (() => Promise<void>) | null;
  }>({ open: false, title: "", message: "", confirmLabel: "", confirmColor: "", action: null });
  const [loading, setLoading] = useState<string | null>(null);

  const byDate: Record<string, Session[]> = {};
  for (const s of sessions) {
    if (!byDate[s.bookedDate]) byDate[s.bookedDate] = [];
    byDate[s.bookedDate].push(s);
  }

  const daysInMonth   = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

  const todayStr = toDateStr(now.getFullYear(), now.getMonth(), now.getDate());
  const selectedSessions = (selectedDate ? byDate[selectedDate] ?? [] : []).sort((a, b) => a.bookedTime.localeCompare(b.bookedTime));

  const totalThisMonth = Object.keys(byDate)
    .filter(d => d.startsWith(`${viewYear}-${(viewMonth + 1).toString().padStart(2, "0")}`))
    .reduce((acc, d) => acc + byDate[d].length, 0);

  /* ─── Actions ─── */
  async function cancelSession(session: Session) {
    setLoading(session.id);
    try {
      const res = await fetch(`/api/admin/purchases/${session.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });
      if (res.ok) {
        setSessions(prev => prev.map(s => s.id === session.id ? { ...s, status: "CANCELLED" } : s));
      }
    } finally {
      setLoading(null);
    }
  }

  async function deleteSession(session: Session) {
    setLoading(session.id);
    try {
      const res = await fetch(`/api/admin/purchases/${session.id}`, { method: "DELETE" });
      if (res.ok) {
        setSessions(prev => prev.filter(s => s.id !== session.id));
      }
    } finally {
      setLoading(null);
    }
  }

  function handleCancel(session: Session) {
    const display = getDisplayStatus(session);
    if (display.label === "PAID") {
      setAlert({
        open: true,
        title: "This Session is Paid",
        message: `This call was paid by ${session.clientName}. You need to contact the client to arrange a refund before cancelling this session.`,
        confirmLabel: "Cancel Anyway",
        confirmColor: "bg-red-500 hover:bg-red-600 text-white",
        action: () => cancelSession(session),
      });
    } else {
      setAlert({
        open: true,
        title: "Cancel Pending Session",
        message: `Are you sure you want to cancel the upcoming session with ${session.clientName} on ${new Date(session.bookedDate + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric" })} at ${formatTime(session.bookedTime)}? This action cannot be undone.`,
        confirmLabel: "Yes, Cancel Session",
        confirmColor: "bg-red-500 hover:bg-red-600 text-white",
        action: () => cancelSession(session),
      });
    }
  }

  function handleDelete(session: Session) {
    setAlert({
      open: true,
      title: "Delete Session",
      message: `Are you sure you want to permanently delete this session record for ${session.clientName}? This will remove it from the calendar and all records.`,
      confirmLabel: "Yes, Delete",
      confirmColor: "bg-red-500 hover:bg-red-600 text-white",
      action: () => deleteSession(session),
    });
  }

  function closeAlert() {
    setAlert(prev => ({ ...prev, open: false, action: null }));
  }

  async function confirmAlert() {
    if (alert.action) await alert.action();
    closeAlert();
  }

  /* ─── Session Card ─── */
  function SessionCard({ s }: { s: Session }) {
    const display = getDisplayStatus(s);
    const isCancelled = s.status === "CANCELLED";
    const isCompleted = display.label === "COMPLETED";
    const canCancel = !isCancelled && !isCompleted;

    return (
      <div className={`bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 ${isCancelled ? "opacity-50" : ""}`}>
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-accent-light">{formatTime(s.bookedTime)}</span>
          <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-md ${display.classes}`}>
            {display.label}
          </span>
        </div>
        <div>
          <p className="font-black">{s.clientName}</p>
          {s.email && <p className="text-xs text-muted mt-0.5">{s.email}</p>}
          <p className="text-xs text-muted">{s.whatsapp}</p>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <span className="text-xs font-bold text-accent">{s.planName}</span>
          <span className="text-sm font-black">{s.amount.toFixed(0)} {s.currency}</span>
        </div>
        {/* Action buttons */}
        <div className="flex gap-2 pt-1">
          {canCancel && (
            <button
              disabled={loading === s.id}
              onClick={() => handleCancel(s)}
              className="flex-1 text-[11px] font-bold uppercase tracking-widest px-3 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
            >
              {loading === s.id ? "..." : "Cancel"}
            </button>
          )}
          <button
            disabled={loading === s.id}
            onClick={() => handleDelete(s)}
            className="text-[11px] font-bold uppercase tracking-widest px-3 py-2 rounded-xl border border-white/10 text-muted hover:bg-white/5 hover:text-red-400 transition-colors disabled:opacity-50"
          >
            {loading === s.id ? "..." : "Delete"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alert Modal */}
      <AlertModal
        open={alert.open}
        title={alert.title}
        message={alert.message}
        confirmLabel={alert.confirmLabel}
        confirmColor={alert.confirmColor}
        onConfirm={confirmAlert}
        onCancel={closeAlert}
      />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-1">Total Sessions</p>
          <p className="text-3xl font-black">{sessions.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-1">This Month</p>
          <p className="text-3xl font-black text-accent-light">{totalThisMonth}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-1">Upcoming</p>
          <p className="text-3xl font-black text-green-400">
            {sessions.filter(s => s.bookedDate >= todayStr && s.status !== "CANCELLED").length}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        {/* Calendar */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted hover:text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="font-black text-base uppercase tracking-widest">{MONTHS[viewMonth]} {viewYear}</span>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted hover:text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-7 px-4 pt-4">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-black text-muted uppercase tracking-widest py-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 p-4">
            {Array.from({ length: firstDayOfWeek }, (_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day       = i + 1;
              const dateStr   = toDateStr(viewYear, viewMonth, day);
              const daySes    = byDate[dateStr] ?? [];
              const isSelected = dateStr === selectedDate;
              const isToday    = dateStr === todayStr;
              const isPast     = dateStr < todayStr;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                  className={[
                    "aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all text-sm font-bold",
                    isSelected ? "bg-accent text-white shadow-lg shadow-accent/30 scale-105" :
                    isToday    ? "border border-accent/60 text-accent-light hover:bg-accent/10" :
                    isPast     ? "text-muted/40" :
                                 "hover:bg-white/10 text-foreground",
                  ].filter(Boolean).join(" ")}
                >
                  {day}
                  {daySes.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {daySes.slice(0, 3).map((_, j) => (
                        <div key={j} className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-accent-light"}`} />
                      ))}
                      {daySes.length > 3 && <div className={`w-1 h-1 rounded-full ${isSelected ? "bg-white/50" : "bg-white/20"}`} />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Session detail panel */}
        <div className="space-y-3">
          {selectedDate ? (
            <>
              <h3 className="font-black text-sm uppercase tracking-widest text-muted px-1">
                {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </h3>
              {selectedSessions.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-muted text-sm">
                  No sessions on this day.
                </div>
              ) : (
                selectedSessions.map(s => <SessionCard key={s.id} s={s} />)
              )}
            </>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-muted text-sm">
              Select a day on the calendar to view its sessions.
            </div>
          )}
        </div>
      </div>

      {/* All upcoming sessions list */}
      <div>
        <h2 className="text-lg font-black mb-4 uppercase tracking-widest">Upcoming Sessions</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted">Date</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted">Time</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted">Client</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted">Contact</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted">Amount</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted">Status</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sessions
                .filter(s => s.bookedDate >= todayStr && s.status !== "CANCELLED")
                .sort((a, b) => a.bookedDate.localeCompare(b.bookedDate) || a.bookedTime.localeCompare(b.bookedTime))
                .map(s => {
                  const display = getDisplayStatus(s);
                  return (
                    <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-bold text-sm">
                        {new Date(s.bookedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                      </td>
                      <td className="p-4 text-accent-light font-black text-sm">{formatTime(s.bookedTime)}</td>
                      <td className="p-4 font-bold">{s.clientName}</td>
                      <td className="p-4 text-sm text-muted">
                        <p>{s.email}</p>
                        <p>{s.whatsapp}</p>
                      </td>
                      <td className="p-4 font-bold text-sm">{s.amount.toFixed(0)} {s.currency}</td>
                      <td className="p-4">
                        <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-md ${display.classes}`}>
                          {display.label}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {display.label !== "COMPLETED" && (
                            <button
                              disabled={loading === s.id}
                              onClick={() => handleCancel(s)}
                              className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            disabled={loading === s.id}
                            onClick={() => handleDelete(s)}
                            className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border border-white/10 text-muted hover:text-red-400 hover:bg-white/5 transition-colors disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              {sessions.filter(s => s.bookedDate >= todayStr && s.status !== "CANCELLED").length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-muted text-sm">No upcoming sessions.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
