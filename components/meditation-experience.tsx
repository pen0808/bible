"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { ListenButton } from "@/components/listen-button";
import { dailyEntries, getDailyEntry, type DailyEntry } from "@/data/daily";
import { useToday } from "@/lib/date";
import { saveMeditationSession, useMeditationSessions } from "@/lib/storage";
import { showToast } from "@/lib/toast";

const durations = [3, 5, 10];

const steps = [
  {
    threshold: 0,
    label: "Settle",
    copy: "Let your shoulders soften. Feel the weight of your body being held by the earth.",
  },
  {
    threshold: 0.16,
    label: "Breathe",
    copy: "Slow your breathing. With every inhale, receive peace. With every exhale, release hurry.",
  },
  {
    threshold: 0.38,
    label: "Listen",
    copy: "Let the words of Scripture move from your mind to your heart. There is nothing to achieve here.",
  },
  {
    threshold: 0.64,
    label: "Abide",
    copy: "Rest in the presence of God. You do not need words. You are simply here, and you are loved.",
  },
  {
    threshold: 0.85,
    label: "Return",
    copy: "Gently notice the room around you. Carry this stillness with you as you go.",
  },
];

const libraryIds = ["be-still", "held", "rooted", "go-in-peace"];

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}:${`${remaining}`.padStart(2, "0")}`;
}

export function MeditationExperience() {
  const today = useToday();
  const todayEntry = getDailyEntry(today);
  const [selectedEntry, setSelectedEntry] = useState<DailyEntry | null>(null);
  const activeEntry = selectedEntry ?? todayEntry;
  const [duration, setDuration] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [sessions] = useMeditationSessions();
  const remainingRef = useRef(300);

  const totalSeconds = duration * 60;
  const elapsed = totalSeconds - secondsLeft;
  const progress = Math.min(1, elapsed / totalSeconds);
  const step = [...steps].reverse().find((item) => progress >= item.threshold) ?? steps[0];
  const phase = Math.floor(elapsed / 5) % 2 === 0;
  const breathLabel = running ? (phase ? "Breathe in" : "Breathe out") : elapsed > 0 ? "Be still" : "Ready";
  const breathWord = phase ? activeEntry.breatheIn : activeEntry.breatheOut;
  const circumference = 2 * Math.PI * 91;
  const totalMinutes = sessions.reduce((total, session) => total + session.minutes, 0);
  const library = libraryIds
    .map((id) => dailyEntries.find((entry) => entry.id === id))
    .filter((entry): entry is DailyEntry => Boolean(entry));

  useEffect(() => {
    if (!running) return;

    const interval = window.setInterval(() => {
      const next = Math.max(0, remainingRef.current - 1);
      remainingRef.current = next;
      setSecondsLeft(next);

      if (next === 0) {
        window.clearInterval(interval);
        setRunning(false);
        setCompleted(true);
        saveMeditationSession(duration);
        showToast("Your quiet moment is complete. Peace be with you.", "gold");
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [running, duration]);

  const setRemaining = (value: number) => {
    remainingRef.current = value;
    setSecondsLeft(value);
  };

  const chooseDuration = (minutes: number) => {
    setDuration(minutes);
    setRemaining(minutes * 60);
    setRunning(false);
    setCompleted(false);
  };

  const reset = () => {
    setRemaining(totalSeconds);
    setRunning(false);
    setCompleted(false);
  };

  const toggleTimer = () => {
    if (completed) {
      setCompleted(false);
      setRemaining(totalSeconds);
      setRunning(true);
      return;
    }
    setRunning((value) => !value);
  };

  const chooseEntry = (entry: DailyEntry) => {
    setSelectedEntry(entry);
    setRemaining(duration * 60);
    setRunning(false);
    setCompleted(false);
  };

  return (
    <div className="page-enter">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-gold">Meditation</p>
          <h1 className="mt-3 font-display text-[2.8rem] font-medium leading-[0.95] text-ink sm:text-[3.75rem]">
            Be still.
            <br />
            <span className="italic text-pine">Breathe. Belong.</span>
          </h1>
          <p className="mt-4 max-w-xl text-[0.87rem] leading-6 text-ink-soft">
            A guided pause to quiet the noise and make room for the nearness of God. No performance. Just presence.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <span className="chip">
            <Icon name="wind" size={12} className="text-gold" />
            {sessions.length} session{sessions.length === 1 ? "" : "s"}
          </span>
          <Link href="/journal" className="btn-ghost">
            <Icon name="journal" size={13} />
            Reflect
          </Link>
        </div>
      </header>

      <section className="mt-7 grid gap-4 lg:grid-cols-12 lg:gap-5">
        <div className="space-y-4 lg:col-span-8">
          <article className="hero-card relative overflow-hidden rounded-[2rem] p-5 sm:p-8">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[0.56rem] font-bold uppercase tracking-[0.18em] text-gold">
                  Todayâ€™s meditation Â· {activeEntry.word}
                </p>
                <p className="mt-1 text-[0.67rem] font-medium text-[#a9bbae]">{activeEntry.scripture}</p>
              </div>
              <div className="flex rounded-full border border-white/10 bg-white/[0.05] p-1">
                {durations.map((minutes) => (
                  <button
                    key={minutes}
                    type="button"
                    onClick={() => chooseDuration(minutes)}
                    className={`rounded-full px-3 py-1.5 text-[0.59rem] font-bold transition ${
                      duration === minutes ? "bg-gold text-pine-deep" : "text-[#b8cbbd] hover:text-white"
                    }`}
                  >
                    {minutes} min
                  </button>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center py-8 sm:py-10">
              <div className="relative flex h-[248px] w-[248px] items-center justify-center sm:h-[286px] sm:w-[286px]">
                <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90">
                  <circle cx="100" cy="100" r="91" fill="none" stroke="rgba(247,241,228,0.11)" strokeWidth="1.5" />
                  <circle
                    cx="100"
                    cy="100"
                    r="91"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - progress)}
                    className="transition-[stroke-dashoffset] duration-1000 ease-linear"
                  />
                </svg>
                <div
                  className={`breath-orb absolute inset-[34px] rounded-full bg-[radial-gradient(circle_at_36%_30%,rgba(239,226,200,0.92),rgba(141,165,148,0.4)_55%,rgba(141,165,148,0.08)_75%)] shadow-[0_0_80px_rgba(193,160,95,0.18)] sm:inset-[42px] ${
                    running ? "" : "paused"
                  }`}
                />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="text-[0.54rem] font-bold uppercase tracking-[0.2em] text-[#d8e2d9]/80">
                    {breathLabel}
                  </span>
                  <span className="mt-2 max-w-[7.5rem] font-display text-[1.55rem] font-semibold leading-tight text-[#f7f1e4]">
                    {completed ? "Peace be with you" : breathWord}
                  </span>
                  <span className="mt-3 font-display text-[1.6rem] font-medium tabular-nums text-[#f7f1e4]">
                    {formatTime(secondsLeft)}
                  </span>
                </div>
              </div>

              <div className="mt-7 min-h-[92px] max-w-md text-center">
                <p className="text-[0.57rem] font-bold uppercase tracking-[0.18em] text-gold">
                  {completed ? "Complete" : step.label}
                </p>
                <p className="mt-2 font-reading text-[0.9rem] italic leading-7 text-[#c5d4c7]">
                  {completed
                    ? "You gave yourself to stillness. Carry this peace into the rest of your day."
                    : step.copy}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-2.5">
                <button type="button" onClick={toggleTimer} className="btn-gold min-w-[124px]">
                  <Icon name={running ? "pause" : "play"} size={14} />
                  {completed ? "Begin again" : running ? "Pause" : elapsed > 0 ? "Continue" : "Begin"}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[#c5d4c7] transition hover:bg-white/[0.12] hover:text-white"
                  aria-label="Reset meditation"
                >
                  <Icon name="refresh" size={15} />
                </button>
                <ListenButton
                  text={`${activeEntry.meditation} ${activeEntry.verse} ${activeEntry.scripture}.`}
                  variant="icon"
                  className="!border-white/15 !bg-white/[0.06] !text-[#c5d4c7] hover:!text-white"
                />
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <p className="text-[0.6rem] font-medium text-[#8fa698]">
                Breathe in: {activeEntry.breatheIn} Â· Breathe out: {activeEntry.breatheOut}
              </p>
              <p className="font-reading text-[0.76rem] italic text-[#c5d4c7]">â€œ{activeEntry.meditation}â€</p>
            </div>
          </article>

          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-gold">Meditation library</p>
                <h2 className="mt-2 font-display text-[1.9rem] font-medium text-ink">Choose a word to rest in</h2>
              </div>
              <Link href="/devotions" className="text-[0.66rem] font-semibold text-ink-faint transition hover:text-pine">
                All devotions
              </Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {library.map((entry) => {
                const active = activeEntry.id === entry.id;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => chooseEntry(entry)}
                    className={`card group flex items-center gap-3 p-4 text-left transition hover:border-line-strong ${
                      active ? "!border-gold/40 !bg-gold-soft/25" : ""
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                        active ? "bg-gold text-pine-deep" : "bg-surface-muted text-pine"
                      }`}
                    >
                      <Icon name={active ? "wind" : "meditate"} size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.54rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                        {entry.scripture}
                      </span>
                      <span className="mt-1 block font-display text-[1.25rem] font-semibold text-ink">
                        {entry.word}
                      </span>
                      <span className="block truncate text-[0.66rem] text-ink-soft">{entry.meditation}</span>
                    </span>
                    <Icon
                      name={active ? "check" : "play"}
                      size={15}
                      className={active ? "text-gold" : "text-ink-faint"}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <p className="eyebrow text-gold">Your stillness</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-surface-muted/70 p-3.5">
                <p className="font-display text-[2rem] font-semibold leading-none text-pine">{sessions.length}</p>
                <p className="mt-1.5 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-ink-faint">Sessions</p>
              </div>
              <div className="rounded-2xl bg-surface-muted/70 p-3.5">
                <p className="font-display text-[2rem] font-semibold leading-none text-pine">{totalMinutes}</p>
                <p className="mt-1.5 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-ink-faint">Minutes</p>
              </div>
            </div>
            <p className="mt-3 text-[0.66rem] leading-5 text-ink-soft">
              Every quiet minute is a small homecoming. There is no streak to keep hereâ€”only grace.
            </p>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2">
              <Icon name="compass" size={16} className="text-gold" />
              <p className="eyebrow text-gold">A simple rhythm</p>
            </div>
            <div className="mt-4 space-y-4">
              {[
                ["Still", "Put down what you are holding. Let the room be quiet."],
                ["Breathe", "Follow the slow rhythm. Let your body remember peace."],
                ["Listen", "Stay with one line of Scripture. Do not rush past it."],
                ["Abide", "Rest in Godâ€™s presence without asking for anything."],
              ].map(([title, copy], index) => (
                <div key={title} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/30 text-[0.54rem] font-bold text-gold">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-[0.72rem] font-bold text-ink">{title}</p>
                    <p className="mt-0.5 text-[0.66rem] leading-5 text-ink-soft">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.65rem] border border-gold/20 bg-gold-soft/40 p-5">
            <Icon name="quote" size={18} className="text-gold/60" />
            <p className="mt-3 font-reading text-[0.86rem] italic leading-6 text-ink">
              â€œ{activeEntry.meditation}â€
            </p>
            <p className="mt-3 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
              {activeEntry.scripture}
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

