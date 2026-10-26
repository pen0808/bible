"use client";

export type ToastPayload = {
  message: string;
  tone?: "default" | "gold";
};

export const TOAST_EVENT = "penbible:toast";

export function showToast(message: string, tone: "default" | "gold" = "default") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ToastPayload>(TOAST_EVENT, {
      detail: { message, tone },
    }),
  );
}
