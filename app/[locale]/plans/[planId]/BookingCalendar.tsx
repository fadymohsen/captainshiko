"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Loader2 } from "lucide-react";

interface BookingCalendarProps {
  planId: string;
  startHour: number;
  endHour: number;
  slotMins: number;
  locale: string;
  dir: string;
  selectedDate: string | null;
  selectedTime: string | null;
  onSelect: (date: string, time: string) => void;
}

function generateSlots(startHour: number, endHour: number, slotMins: number): string[] {
  const slots: string[] = [];
  let cur = startHour * 60;
  const end = endHour * 60;
  while (cur + slotMins <= end) {
    const h = Math.floor(cur / 60);
    const m = cur % 60;
    slots.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
    cur += slotMins;
  }
  return slots;
}

function formatTime(time: string, locale: string): string {
  const [h, m] = time.split(":").map(Number);
  const isAm = h < 12;
  const h12 = h % 12 || 12;
  const mStr = m.toString().padStart(2, "0");
  if (locale === "ar") return `${h12}:${mStr} ${isAm ? "ص" : "م"}`;
  return `${h12}:${mStr} ${isAm ? "AM" : "PM"}`;
}

const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_AR = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
const DAYS_EN = ["Mo","Tu","We","Th","Fr","Sa","Su"];
const DAYS_AR = ["إث","ثل","أر","خم","جم","سب","أح"];

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

export function BookingCalendar({
  planId, startHour, endHour, slotMins, locale, dir,
  selectedDate, selectedTime, onSelect,
}: BookingCalendarProps) {
  const now = new Date();
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth();
  const todayDay = now.getDate();

  const [viewYear, setViewYear] = useState(todayYear);
  const [viewMonth, setViewMonth] = useState(todayMonth);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const allSlots = generateSlots(startHour, endHour, slotMins);

  // For today, filter out slots that are less than 2 hours from now
  const isToday = (date: string) => date === todayStr;
  const availableSlots = selectedDate && isToday(selectedDate)
    ? allSlots.filter((slot) => {
        const [h, m] = slot.split(":").map(Number);
        const slotMinutes = h * 60 + m;
        const nowMinutes = now.getHours() * 60 + now.getMinutes() + 120; // +2 hours
        return slotMinutes >= nowMinutes;
      })
    : allSlots;

  useEffect(() => {
    if (!selectedDate) { setBookedTimes([]); return; }
    setLoadingSlots(true);
    fetch(`/api/booked-slots?planId=${planId}&date=${selectedDate}`)
      .then((r) => r.json())
      .then((data) => setBookedTimes(data.bookedTimes || []))
      .catch(() => setBookedTimes([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, planId]);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Monday=0

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const isPast = (day: number) =>
    new Date(viewYear, viewMonth, day) < new Date(todayYear, todayMonth, todayDay);

  const handleDayClick = (day: number) => {
    if (isPast(day)) return;
    onSelect(toDateStr(viewYear, viewMonth, day), "");
  };

  const handleTimeClick = (slot: string) => {
    if (!selectedDate || bookedTimes.includes(slot)) return;
    onSelect(selectedDate, slot);
  };

  const todayStr = toDateStr(todayYear, todayMonth, todayDay);
  const months = locale === "ar" ? MONTHS_AR : MONTHS_EN;
  const dayLabels = locale === "ar" ? DAYS_AR : DAYS_EN;

  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    const [y, mo, d] = selectedDate.split("-").map(Number);
    return new Date(y, mo - 1, d).toLocaleDateString(
      locale === "ar" ? "ar-EG" : "en-US",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    );
  };

  const allSlotsFull = availableSlots.length === 0 || availableSlots.every((s) => bookedTimes.includes(s));

  return (
    <div className="space-y-5">
      {/* Calendar grid */}
      <div className="bg-surface-light/40 border border-white/5 rounded-2xl p-5">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={dir === "rtl" ? nextMonth : prevMonth}
            className="p-2 rounded-xl hover:bg-white/10 text-muted hover:text-white transition-all"
            aria-label="previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-black text-sm uppercase tracking-widest">
            {months[viewMonth]} {viewYear}
          </span>
          <button
            onClick={dir === "rtl" ? prevMonth : nextMonth}
            className="p-2 rounded-xl hover:bg-white/10 text-muted hover:text-white transition-all"
            aria-label="next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 mb-2">
          {dayLabels.map((d) => (
            <div key={d} className="text-center text-[10px] font-black text-muted uppercase tracking-widest py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek }, (_, i) => (
            <div key={`e${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateStr = toDateStr(viewYear, viewMonth, day);
            const past = isPast(day);
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDate;

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                disabled={past}
                className={[
                  "aspect-square rounded-xl text-sm font-bold transition-all",
                  past ? "opacity-20 cursor-not-allowed text-muted" : "cursor-pointer",
                  isSelected
                    ? "bg-accent text-white shadow-lg shadow-accent/30 scale-105"
                    : isToday
                    ? "border border-accent/60 text-accent-light hover:bg-accent/10"
                    : !past
                    ? "hover:bg-white/10 text-foreground"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-light shrink-0" />
            <span className="text-xs font-black uppercase tracking-widest text-accent-light leading-tight">
              {formatSelectedDate()}
            </span>
          </div>

          {loadingSlots ? (
            <div className="flex justify-center py-5">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
            </div>
          ) : allSlotsFull ? (
            <p className="text-xs text-amber-400 font-bold text-center py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              {locale === "ar"
                ? "جميع المواعيد محجوزة لهذا اليوم — اختار يوم تاني."
                : "All slots are booked for this day — please choose another date."}
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {availableSlots.map((slot) => {
                const booked = bookedTimes.includes(slot);
                const selected = slot === selectedTime;
                return (
                  <button
                    key={slot}
                    onClick={() => handleTimeClick(slot)}
                    disabled={booked}
                    className={[
                      "py-3 rounded-xl text-xs font-black tracking-wide transition-all",
                      booked
                        ? "opacity-30 cursor-not-allowed bg-white/5 text-muted line-through"
                        : "cursor-pointer hover:scale-105",
                      selected
                        ? "bg-accent text-white shadow-lg shadow-accent/30"
                        : !booked
                        ? "bg-white/5 border border-white/5 hover:border-accent/30 hover:bg-accent/10"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {formatTime(slot, locale)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
