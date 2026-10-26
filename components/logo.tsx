export function LogoMark({ size = 42 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="1.5" y="1.5" width="45" height="45" rx="13" fill="var(--pine-deep)" />
      <rect
        x="2.6"
        y="2.6"
        width="42.8"
        height="42.8"
        rx="12.1"
        stroke="var(--gold)"
        strokeOpacity="0.38"
        strokeWidth="0.7"
      />
      <circle cx="24" cy="21" r="15.5" stroke="var(--gold)" strokeOpacity="0.14" />
      <circle cx="24" cy="18" r="10" fill="var(--gold)" fillOpacity="0.08" />

      <path
        d="M24 8.2c4.6 5.8 7.6 11.5 7.6 16.1 0 5.2-3.3 9.1-7.6 11.3-4.3-2.2-7.6-6.1-7.6-11.3 0-4.6 3-10.3 7.6-16.1Z"
        fill="var(--gold)"
      />
      <path
        d="M24 13.1c2.9 3.9 4.6 7.8 4.6 11.2 0 3.4-1.9 6.1-4.6 7.7-2.7-1.6-4.6-4.3-4.6-7.7 0-3.4 1.7-7.3 4.6-11.2Z"
        fill="var(--pine-deep)"
      />
      <path d="M24 22.8v11.1" stroke="var(--gold)" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="24" cy="28.1" r="1.1" fill="var(--gold)" />

      <path
        d="M8.4 31.1c5.4-1.8 10.9-.8 15.6 2.6v8.1c-5.3-3.2-10.6-4.2-15.6-2.6v-8.1Z"
        fill="#f7f1e4"
      />
      <path
        d="M39.6 31.1c-5.4-1.8-10.9-.8-15.6 2.6v8.1c5.3-3.2 10.6-4.2 15.6-2.6v-8.1Z"
        fill="#f7f1e4"
      />
      <path d="M24 33.7v8.1" stroke="var(--gold)" strokeWidth="0.9" strokeOpacity="0.75" />
      <path
        d="M11.8 34.8c3.2-.4 6.4.3 9.4 1.8M36.2 34.8c-3.2-.4-6.4.3-9.4 1.8"
        stroke="var(--pine-deep)"
        strokeOpacity="0.32"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={compact ? 35 : 44} />
      <div className="leading-none">
        <span className="flex items-baseline gap-[0.18em]">
          <span
            className={`font-sans font-extrabold uppercase tracking-[0.16em] text-gold ${
              compact ? "text-[0.56rem]" : "text-[0.64rem]"
            }`}
          >
            PEN
          </span>
          <span
            className={`font-display font-semibold leading-none tracking-[-0.045em] text-ink ${
              compact ? "text-[1.42rem]" : "text-[1.66rem]"
            }`}
          >
            Bible
          </span>
        </span>
        {!compact && (
          <p className="mt-1.5 text-[0.54rem] font-semibold uppercase tracking-[0.19em] text-ink-faint">
            A quiet place in the Word
          </p>
        )}
      </div>
    </div>
  );
}
