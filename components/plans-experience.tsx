"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon, type IconName } from "@/components/icons";
import { readingPlans, type ReadingPlan } from "@/data/plans";
import { togglePlanDay, useAllPlanProgress } from "@/lib/storage";
import { showToast } from "@/lib/toast";

const planIcons: Record<string, IconName> = {
  "peace-for-anxious-hearts": "wind",
  "rooted-in-grace": "heart",
  "psalms-of-stillness": "meditate",
  "the-way-of-jesus": "sunrise",
};

const toneClasses: Record<ReadingPlan["tone"], string> = {
  pine: "hero-card",
  gold: "border-gold/25 bg-[linear-gradient(145deg,var(--gold-soft),color-mix(in_srgb,var(--surface)_55%,var(--gold-soft)))]",
  sage: "border-sage/25 bg-[linear-gradient(145deg,var(--sage-soft),color-mix(in_srgb,var(--surface)_58%,var(--sage-soft)))]",
  clay: "border-clay/25 bg-[linear-gradient(145deg,color-mix(in_srgb,var(--clay)_13%,var(--surface)),var(--surface))]",
};

export function PlansExperience() {
  const [progress] = useAllPlanProgress();
  const [selectedId, setSelectedId] = useState(readingPlans[0].id);
  const selectedPlan = readingPlans.find((plan) => plan.id === selectedId) ?? readingPlans[0];
  const completedDays = new Set(progress[selectedPlan.id] ?? []);
  const completedCount = completedDays.size;
  const progressPercent = Math.round((completedCount / selectedPlan.days.length) * 100);
  const totalCompleted = readingPlans.reduce((total, plan) => total + (progress[plan.id]?.length ?? 0), 0);
  const totalDays = readingPlans.reduce((total, plan) => total + plan.days.length, 0);
  const nextDay = selectedPlan.days.find((day) => !completedDays.has(day.day)) ?? selectedPlan.days[0];

  const selectPlan = (planId: string) => {
    setSelectedId(planId);
    window.setTimeout(() => {
      document.getElementById("plan-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const toggleDay = (day: number) => {
    const wasComplete = completedDays.has(day);
    togglePlanDay(selectedPlan.id, day);
    showToast(wasComplete ? "Day marked as unread." : "Day completed. Keep going gently.", wasComplete ? "default" : "gold");
  };

  return (
    <div className="page-enter">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-gold">Guided reading</p>
          <h1 className="mt-3 font-display text-[2.8rem] font-medium leading-[0.95] text-ink sm:text-[3.75rem]">
            Grow a little
            <br />
            <span className="italic text-pine">every day.</span>
          </h1>
          <p className="mt-4 max-w-xl text-[0.87rem] leading-6 text-ink-soft">
            A reading plan is not a race. It is a gentle path with a place for your foot each day. Begin where you are.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start rounded-2xl border border-line bg-surface/60 px-4 py-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft text-gold">
            <Icon name="plans" size={17} />
          </span>
          <div>
            <p className="font-display text-[1.3rem] font-semibold leading-none text-ink">
              {totalCompleted}
              <span className="text-[0.8rem] font-medium text-ink-faint"> / {totalDays}</span>
            </p>
            <p className="mt-1 text-[0.56rem] font-bold uppercase tracking-[0.13em] text-ink-faint">
              Days completed
            </p>
          </div>
        </div>
      </header>

      <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {readingPlans.map((plan) => {
          const done = progress[plan.id]?.length ?? 0;
          const percent = Math.round((done / plan.days.length) * 100);
          const dark = plan.tone === "pine";
          const active = plan.id === selectedPlan.id;

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => selectPlan(plan.id)}
              className={`relative overflow-hidden rounded-[1.55rem] border p-5 text-left transition duration-300 hover:-translate-y-0.5 ${toneClasses[plan.tone]} ${
                active ? "ring-2 ring-gold/60 ring-offset-2 ring-offset-canvas" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    dark ? "border border-white/15 bg-white/[0.07] text-gold" : "bg-surface/60 text-pine"
                  }`}
                >
                  <Icon name={planIcons[plan.id] ?? "plans"} size={17} />
                </span>
                <span
                  className={`text-[0.54rem] font-bold uppercase tracking-[0.12em] ${
                    dark ? "text-[#b8cbbd]" : "text-ink-faint"
                  }`}
                >
                  {plan.duration}
                </span>
              </div>
              <h2
                className={`mt-5 font-display text-[1.5rem] font-semibold leading-[1.05] ${
                  dark ? "text-[#f7f1e4]" : "text-ink"
                }`}
              >
                {plan.title}
              </h2>
              <p className={`mt-2 text-[0.66rem] leading-5 ${dark ? "text-[#b8cbbd]" : "text-ink-soft"}`}>
                {plan.subtitle}
              </p>
              <div className="mt-5 flex items-center gap-2.5">
                <div className={`h-1 flex-1 overflow-hidden rounded-full ${dark ? "bg-white/15" : "bg-surface-strong"}`}>
                  <div
                    className={`h-full rounded-full ${dark ? "bg-gold" : "bg-pine"}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className={`text-[0.56rem] font-bold ${dark ? "text-[#c5d4c7]" : "text-ink-faint"}`}>
                  {done}/{plan.days.length}
                </span>
              </div>
            </button>
          );
        })}
      </section>

      <section
        id="plan-detail"
        className="mt-6 scroll-mt-24 overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[var(--shadow-card)]"
      >
        <div className="relative overflow-hidden border-b border-line p-6 sm:p-8">
          <div className="soft-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow text-gold">{selectedPlan.category}</span>
                <span className="h-1 w-1 rounded-full bg-line-strong" />
                <span className="text-[0.64rem] text-ink-faint">{selectedPlan.duration}</span>
              </div>
              <h2 className="mt-3 font-display text-[2.2rem] font-medium leading-none text-ink sm:text-[2.8rem]">
                {selectedPlan.title}
              </h2>
              <p className="mt-3 max-w-xl text-[0.8rem] leading-6 text-ink-soft">{selectedPlan.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-surface-muted">
                <svg viewBox="0 0 80 80" className="absolute inset-0 h-full w-full -rotate-90">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="var(--line)" strokeWidth="5" />
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 34}
                    strokeDashoffset={2 * Math.PI * 34 * (1 - progressPercent / 100)}
                  />
                </svg>
                <span className="font-display text-xl font-semibold text-pine">{progressPercent}%</span>
              </div>
              <Link href={`/bible#${nextDay.slug}:${nextDay.chapter}`} className="btn-primary">
                {completedCount === 0 ? "Begin plan" : "Continue"}
                <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="divide-y divide-line">
            {selectedPlan.days.map((day) => {
              const done = completedDays.has(day.day);
              return (
                <div
                  key={day.day}
                  className={`flex gap-4 px-5 py-5 transition sm:px-7 ${
                    done ? "bg-sage-soft/20" : "hover:bg-surface-muted/35"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleDay(day.day)}
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[0.62rem] font-bold transition ${
                      done
                        ? "border-pine bg-pine text-[#f7f1e4]"
                        : "border-line-strong bg-surface text-ink-faint hover:border-gold hover:text-gold"
                    }`}
                    aria-label={done ? `Mark day ${day.day} incomplete` : `Mark day ${day.day} complete`}
                  >
                    {done ? <Icon name="check" size={14} strokeWidth={2.3} /> : day.day}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[0.52rem] font-bold uppercase tracking-[0.15em] text-ink-faint">
                        Day {day.day}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-line-strong" />
                      <span className="text-[0.58rem] font-semibold text-gold">{day.reference}</span>
                    </div>
                    <h3
                      className={`mt-1 font-display text-[1.35rem] font-semibold leading-tight ${
                        done ? "text-ink-faint" : "text-ink"
                      }`}
                    >
                      {day.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-[0.7rem] leading-5 text-ink-soft">{day.prompt}</p>
                    <Link
                      href={`/bible#${day.slug}:${day.chapter}`}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-[0.62rem] font-semibold text-pine transition hover:text-gold"
                    >
                      Read passage
                      <Icon name="arrow-right" size={11} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="border-t border-line p-5 lg:border-l lg:border-t-0">
            <div className="lg:sticky lg:top-6">
              <p className="eyebrow text-gold">Your journey</p>
              <div className="mt-4 rounded-2xl bg-surface-muted/60 p-4">
                <div className="flex items-end justify-between">
                  <span className="font-display text-[2rem] font-semibold leading-none text-pine">{completedCount}</span>
                  <span className="text-[0.62rem] font-semibold text-ink-faint">of {selectedPlan.days.length} days</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-strong">
                  <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-ink-faint">Next reading</p>
                <p className="mt-2 font-display text-[1.25rem] font-semibold leading-tight text-ink">
                  {nextDay.reference}
                </p>
                <p className="mt-1 text-[0.68rem] text-ink-soft">{nextDay.title}</p>
                <Link
                  href={`/bible#${nextDay.slug}:${nextDay.chapter}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.64rem] font-semibold text-pine transition hover:text-gold"
                >
                  Open passage
                  <Icon name="arrow-right" size={11} />
                </Link>
              </div>

              <div className="my-5 h-px bg-line" />

              <div className="rounded-2xl border border-gold/20 bg-gold-soft/30 p-4">
                <Icon name="sparkle" size={15} className="text-gold" />
                <p className="mt-2.5 font-reading text-[0.78rem] italic leading-6 text-ink">
                  “A little every day becomes a life rooted in the Word.”
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
