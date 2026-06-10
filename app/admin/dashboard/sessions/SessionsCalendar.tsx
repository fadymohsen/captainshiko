"use client";

import { useState } from "react";

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

export function SessionsCalendar({ sessions }: { sessions: Session[] }) {
  const now = new Date();
  const [viewYear, setViewYear]     = useState(now.getFullYear());
  const [viewMonth, setViewMonth]   = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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

  return (
    <div className="space-y-6">
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
                selectedSessions.map(s => (
                  <div key={s.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-accent-light">{formatTime(s.bookedTime)}</span>
                      <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-md ${
                        s.status === "ACTIVE"    ? "bg-green-500/20 text-green-400" :
                        s.status === "PENDING"   ? "bg-amber-500/20 text-amber-400" :
                                                    "bg-red-500/20 text-red-400"
                      }`}>{s.status}</span>
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
                  </div>
                ))
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
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sessions
                .filter(s => s.bookedDate >= todayStr && s.status !== "CANCELLED")
                .sort((a, b) => a.bookedDate.localeCompare(b.bookedDate) || a.bookedTime.localeCompare(b.bookedTime))
                .map(s => (
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
                      <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-md ${
                        s.status === "ACTIVE" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
                      }`}>{s.status}</span>
                    </td>
                  </tr>
                ))}
              {sessions.filter(s => s.bookedDate >= todayStr && s.status !== "CANCELLED").length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-muted text-sm">No upcoming sessions.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
