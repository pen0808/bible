"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { TOAST_EVENT, type ToastPayload } from "@/lib/toast";

type Toast = ToastPayload & { id: number };

export function ToastViewport() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    let counter = 0;
    const onToast = (event: Event) => {
      const payload = (event as CustomEvent<ToastPayload>).detail;
      if (!payload?.message) return;
      const id = ++counter;
      setToasts((current) => [...current, { ...payload, id }]);
      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 3200);
    };

    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[80] flex flex-col items-center gap-2 px-4 lg:bottom-8"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-full border border-white/10 bg-pine px-4 py-2.5 text-sm font-medium text-[#f7f1e4] shadow-[0_18px_50px_-18px_rgba(0,0,0,0.6)]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">
            <Icon name={toast.tone === "gold" ? "heart" : "check"} size={13} strokeWidth={2} />
          </span>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
