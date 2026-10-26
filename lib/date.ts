"use client";

import { useSyncExternalStore } from "react";

const fallbackDate = new Date(2026, 9, 23, 8, 0, 0);
const listeners = new Set<() => void>();
let todaySnapshot = fallbackDate;
let snapshotKey = "";
let interval: ReturnType<typeof setInterval> | null = null;

function timeKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
}

function refreshToday(notify: boolean) {
  const next = new Date();
  const nextKey = timeKey(next);
  if (nextKey === snapshotKey) return;
  todaySnapshot = next;
  snapshotKey = nextKey;
  if (notify) listeners.forEach((listener) => listener());
}

function subscribeToday(listener: () => void) {
  listeners.add(listener);
  refreshToday(false);

  if (listeners.size === 1) {
    interval = setInterval(() => refreshToday(true), 30_000);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && interval) {
      clearInterval(interval);
      interval = null;
    }
  };
}

function getTodaySnapshot() {
  return todaySnapshot;
}

function getTodayServerSnapshot() {
  return fallbackDate;
}

export function useToday() {
  return useSyncExternalStore(subscribeToday, getTodaySnapshot, getTodayServerSnapshot);
}

export function formatLongDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatJournalDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getGreeting(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function getDayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / 86400000);
}
