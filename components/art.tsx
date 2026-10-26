export function SanctuaryArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="372" cy="122" r="66" stroke="currentColor" strokeOpacity="0.28" />
      <circle cx="372" cy="122" r="52" stroke="currentColor" strokeOpacity="0.12" />
      <path
        d="M64 384c54-67 92-105 138-105 59 0 79 47 126 47 45 0 77-35 132-85"
        stroke="currentColor"
        strokeOpacity="0.38"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M42 420c70-57 110-83 162-83 52 0 77 31 124 31 47 0 84-24 133-65"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M82 454c69-41 119-62 169-62 51 0 84 18 128 18 27 0 55-7 87-23"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M289 242c-1-52 21-85 65-99-11 44-33 76-65 99Z"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1"
      />
      <path
        d="M291 241c17-35 44-53 81-56"
        stroke="currentColor"
        strokeOpacity="0.16"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M153 262c-20-30-16-59 12-80 9 29 5 56-12 80Z"
        stroke="currentColor"
        strokeOpacity="0.16"
        strokeWidth="1"
      />
      <g stroke="currentColor" strokeOpacity="0.34" strokeLinecap="round">
        <path d="M405 262c-22-9-41-6-57 10 18 9 36 6 57-10Z" />
        <path d="M405 262c-5-24 3-42 24-54 6 21-2 39-24 54Z" />
        <path d="M405 262c20-10 39-9 56 4-17 12-35 10-56-4Z" />
        <path d="M405 262c8 23 2 42-17 56-8-21-2-39 17-56Z" />
        <path d="M405 262c-9 22-26 34-50 35 5-21 21-33 50-35Z" />
        <path d="M405 262c24-2 43 8 55 31-23 4-41-7-55-31Z" />
      </g>
      <path
        d="M402 262c-22 38-47 67-75 89"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SoftRings({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 420" fill="none" aria-hidden="true" className={className}>
      <circle cx="210" cy="210" r="198" stroke="currentColor" strokeOpacity="0.12" />
      <circle cx="210" cy="210" r="158" stroke="currentColor" strokeOpacity="0.1" />
      <circle cx="210" cy="210" r="115" stroke="currentColor" strokeOpacity="0.08" />
      <circle cx="210" cy="210" r="68" stroke="currentColor" strokeOpacity="0.06" />
    </svg>
  );
}

export function HillsDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 180" preserveAspectRatio="none" fill="none" aria-hidden="true" className={className}>
      <path
        d="M0 148c132-42 228-63 338-56 143 9 214 64 352 57 147-7 226-82 390-69 124 10 232 51 360 48v52H0v-32Z"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M0 167c158-35 287-35 424-9 155 29 265 32 423-2 171-37 307-15 433 9 55 11 109 13 160 9v26H0v-33Z"
        fill="currentColor"
        fillOpacity="0.08"
      />
    </svg>
  );
}

export function TinyCross({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M12 3v18M7 8h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
