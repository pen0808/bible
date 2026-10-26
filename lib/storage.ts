"use client";

import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";

export type SavedVerse = {
  id: string;
  reference: string;
  text: string;
  bookName: string;
  bookSlug: string;
  chapter: number;
  verse: number;
  savedAt: string;
};

export type JournalEntry = {
  id: string;
  title: string;
  body: string;
  reference?: string;
  createdAt: string;
};

export type PlanProgress = Record<string, number[]>;

const KEYS = {
  saved: "penbible:saved-verses",
  journal: "penbible:journal",
  plans: "penbible:plan-progress",
  visits: "penbible:visits",
  theme: "penbible:theme",
  lastRead: "penbible:last-read",
  meditation: "penbible:meditation-sessions",
  font: "penbible:reader-font",
  bibleVersion: "penbible:bible-version",
};

const LEGACY_KEYS: Record<keyof typeof KEYS, string> = {
  saved: "selah:saved-verses",
  journal: "selah:journal",
  plans: "selah:plan-progress",
  visits: "selah:visits",
  theme: "selah:theme",
  lastRead: "selah:last-read",
  meditation: "selah:meditation-sessions",
  font: "selah:reader-font",
  bibleVersion: "selah:bible-version",
};

const STORAGE_EVENT = "penbible:storage";

function migrateLegacyStorage() {
  if (typeof window === "undefined") return;

  try {
    (Object.keys(KEYS) as (keyof typeof KEYS)[]).forEach((name) => {
      const legacy = window.localStorage.getItem(LEGACY_KEYS[name]);
      if (legacy === null || window.localStorage.getItem(KEYS[name]) !== null) return;
      window.localStorage.setItem(KEYS[name], name === "theme" ? JSON.stringify(legacy) : legacy);
    });
  } catch {
    // Migration is best-effort; the app remains fully usable without it.
  }
}

migrateLegacyStorage();

function emitChange(key?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key } }));
}

function readValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeValue<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    emitChange(key);
  } catch {
    // Storage can be unavailable in private browsing; fail quietly.
  }
}

function subscribeStorage(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(STORAGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(STORAGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function useStoredValue<T>(key: string, fallback: T) {
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }, [key]);
  const getServerSnapshot = useCallback(() => null, []);
  const raw = useSyncExternalStore(subscribeStorage, getSnapshot, getServerSnapshot);

  const value = useMemo(() => {
    if (raw == null) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }, [raw, fallback]);

  return [value, true] as const;
}

const emptySaved: SavedVerse[] = [];
const emptyJournal: JournalEntry[] = [];
const emptyPlan: number[] = [];
const emptyProgress: PlanProgress = {};

export function useSavedVerses() {
  return useStoredValue<SavedVerse[]>(KEYS.saved, emptySaved);
}

export function useJournalEntries() {
  return useStoredValue<JournalEntry[]>(KEYS.journal, emptyJournal);
}

export function usePlanProgress(planId: string) {
  const [progress] = useStoredValue<PlanProgress>(KEYS.plans, emptyProgress);
  return progress[planId] ?? emptyPlan;
}

export function useAllPlanProgress() {
  return useStoredValue<PlanProgress>(KEYS.plans, emptyProgress);
}

export function saveVerse(verse: Omit<SavedVerse, "savedAt">) {
  const current = readValue<SavedVerse[]>(KEYS.saved, emptySaved);
  if (current.some((item) => item.id === verse.id)) return false;
  writeValue(KEYS.saved, [{ ...verse, savedAt: new Date().toISOString() }, ...current]);
  return true;
}

export function isVerseSaved(id: string) {
  return readValue<SavedVerse[]>(KEYS.saved, emptySaved).some((item) => item.id === id);
}

export function removeSavedVerse(id: string) {
  const current = readValue<SavedVerse[]>(KEYS.saved, emptySaved);
  writeValue(
    KEYS.saved,
    current.filter((item) => item.id !== id),
  );
}

export function toggleSavedVerse(verse: Omit<SavedVerse, "savedAt">) {
  const current = readValue<SavedVerse[]>(KEYS.saved, emptySaved);
  const exists = current.some((item) => item.id === verse.id);
  if (exists) {
    writeValue(
      KEYS.saved,
      current.filter((item) => item.id !== verse.id),
    );
    return false;
  }
  writeValue(KEYS.saved, [{ ...verse, savedAt: new Date().toISOString() }, ...current]);
  return true;
}

export function addJournalEntry(entry: Omit<JournalEntry, "id" | "createdAt">) {
  const current = readValue<JournalEntry[]>(KEYS.journal, emptyJournal);
  const newEntry: JournalEntry = {
    ...entry,
    id: `reflection-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  writeValue(KEYS.journal, [newEntry, ...current]);
  return newEntry;
}

export function deleteJournalEntry(id: string) {
  const current = readValue<JournalEntry[]>(KEYS.journal, emptyJournal);
  writeValue(
    KEYS.journal,
    current.filter((entry) => entry.id !== id),
  );
}

export function togglePlanDay(planId: string, day: number) {
  const progress = readValue<PlanProgress>(KEYS.plans, {});
  const completed = new Set(progress[planId] ?? []);
  if (completed.has(day)) {
    completed.delete(day);
  } else {
    completed.add(day);
  }
  writeValue(KEYS.plans, { ...progress, [planId]: Array.from(completed).sort((a, b) => a - b) });
}

export function getCompletedPlanDays(planId: string) {
  const progress = readValue<PlanProgress>(KEYS.plans, {});
  return progress[planId] ?? [];
}

type VisitSnapshot = { streak: number; visitedToday: boolean };

const emptyVisit: VisitSnapshot = { streak: 0, visitedToday: false };
const visitListeners = new Set<() => void>();
let visitSnapshot = emptyVisit;
let visitsInitialized = false;

function ensureVisits() {
  if (visitsInitialized || typeof window === "undefined") return;
  visitsInitialized = true;

  const today = new Date();
  const todayKey = toDateKey(today);
  const existing = new Set(readValue<string[]>(KEYS.visits, []));
  existing.add(todayKey);
  writeValue(KEYS.visits, Array.from(existing).sort().slice(-90));

  let cursor = today;
  let count = 0;
  while (existing.has(toDateKey(cursor))) {
    count += 1;
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() - 1);
  }

  visitSnapshot = { streak: Math.max(count, 1), visitedToday: true };
}

function subscribeVisits(callback: () => void) {
  visitListeners.add(callback);
  const previous = visitSnapshot;
  ensureVisits();
  if (visitSnapshot !== previous) window.queueMicrotask(callback);
  return () => {
    visitListeners.delete(callback);
  };
}

function getVisitSnapshot() {
  return visitSnapshot;
}

function getVisitServerSnapshot() {
  return emptyVisit;
}

export function useStreak() {
  return useSyncExternalStore(subscribeVisits, getVisitSnapshot, getVisitServerSnapshot);
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function saveLastRead(slug: string, chapter: number) {
  writeValue(KEYS.lastRead, { slug, chapter, at: new Date().toISOString() });
}

export function getLastRead(): { slug: string; chapter: number; at: string } | null {
  return readValue<{ slug: string; chapter: number; at: string } | null>(KEYS.lastRead, null);
}

export function useLastRead() {
  return useStoredValue<{ slug: string; chapter: number; at: string } | null>(KEYS.lastRead, null);
}

export function saveReaderFont(size: number) {
  writeValue(KEYS.font, size);
}

export function getReaderFont() {
  return readValue<number>(KEYS.font, 1);
}

export function useReaderFont() {
  return useStoredValue<number>(KEYS.font, 1);
}

export function getBibleVersion() {
  return readValue<string>(KEYS.bibleVersion, "kjv");
}

export function saveBibleVersion(version: string) {
  writeValue(KEYS.bibleVersion, version);
}

export function useBibleVersion() {
  return useStoredValue<string>(KEYS.bibleVersion, "kjv");
}

export function saveMeditationSession(minutes: number) {
  const sessions = readValue<{ minutes: number; at: string }[]>(KEYS.meditation, []);
  writeValue(KEYS.meditation, [{ minutes, at: new Date().toISOString() }, ...sessions].slice(0, 100));
}

export function useMeditationSessions() {
  return useStoredValue<{ minutes: number; at: string }[]>(KEYS.meditation, []);
}

export function setTheme(theme: "day" | "night") {
  writeValue(KEYS.theme, theme);
  if (typeof window !== "undefined") {
    document.documentElement.dataset.theme = theme;
  }
}

export function getTheme(): "day" | "night" {
  return readValue<"day" | "night">(KEYS.theme, "day") === "night" ? "night" : "day";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribeStorage, getTheme, () => "day" as const);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "day" ? "night" : "day");
  };

  return { theme, toggleTheme, ready: true };
}
