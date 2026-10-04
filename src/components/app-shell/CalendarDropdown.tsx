import { useCallback, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { icons } from "@/assets/icons";
import { useFiscalYears } from "@/hooks/queries";
import { useDismiss } from "@/hooks/use-dismiss";
import { useSelectedDate } from "@/lib/selected-date";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** ISO-8601 week number (weeks start on Monday) */
const isoWeek = (d: Date) => {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((t.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
};

/** 6 weeks × 7 days starting on the Monday on/before the 1st of the month */
const monthGrid = (year: number, month: number) => {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - ((first.getDay() + 6) % 7));
  return Array.from({ length: 6 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + d)),
  );
};

/** Year pill in the navbar; opens a month calendar. The picked date's year drives the year-based data. */
export const CalendarDropdown = () => {
  const { date, setDate } = useSelectedDate();
  const { data: fiscalYears } = useFiscalYears();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState({ year: date.getFullYear(), month: date.getMonth() });
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  const minYear = fiscalYears ? Math.min(...fiscalYears) : -Infinity;
  const maxYear = fiscalYears ? Math.max(...fiscalYears) : Infinity;
  const canPrev = view.year > minYear || view.month > 0;
  const canNext = view.year < maxYear || view.month < 11;

  const shift = (delta: number) =>
    setView(({ year, month }) => {
      const d = new Date(year, month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  const toggle = () => {
    if (!open) setView({ year: date.getFullYear(), month: date.getMonth() });
    setOpen((o) => !o);
  };

  const monthName = new Date(view.year, view.month, 1).toLocaleDateString("en-US", { month: "long" });

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggle}
        className="flex items-center gap-2 rounded-full bg-[#5e2522] px-4 py-2.5 text-[15px] text-cream"
      >
        <img src={icons.calendar} alt="" className="h-4 w-auto" />
        {date.getFullYear()}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose a date"
          className="absolute right-0 top-full z-30 mt-2 w-[290px] rounded-2xl border border-white/20 bg-[#5e2522]/85 p-3 text-cream shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md"
        >
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              disabled={!canPrev}
              onClick={() => shift(-1)}
              className="grid size-7 place-items-center rounded-md hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="rounded-md bg-cream px-3 py-0.5 text-xs font-semibold text-cocoa" aria-live="polite">
              {monthName} {view.year}
            </span>
            <button
              type="button"
              aria-label="Next month"
              disabled={!canNext}
              onClick={() => shift(1)}
              className="grid size-7 place-items-center rounded-md hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <table className="w-full border-separate border-spacing-1 text-center text-[11px]">
            <thead>
              <tr className="text-cream/60">
                <th scope="col" className="font-medium" title="Calendar week">
                  CW
                </th>
                {WEEKDAYS.map((d) => (
                  <th key={d} scope="col" className="font-medium">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthGrid(view.year, view.month).map((week) => (
                <tr key={week[0].toISOString()}>
                  <td className="rounded bg-white/5 py-1 text-cream/50">{isoWeek(week[0])}</td>
                  {week.map((day) => {
                    const inMonth = day.getMonth() === view.month;
                    const selected = sameDay(day, date);
                    return (
                      <td key={day.toISOString()} className="p-0">
                        <button
                          type="button"
                          aria-pressed={selected}
                          aria-label={day.toLocaleDateString("en-US", { dateStyle: "long" })}
                          onClick={() => {
                            setDate(day);
                            setOpen(false);
                          }}
                          className={cn(
                            "w-full rounded py-1 transition-colors",
                            selected ? "bg-cherry font-semibold text-white" : "bg-black/15 hover:bg-white/15",
                            !inMonth && !selected && "text-cream/40",
                          )}
                        >
                          {day.getDate()}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
