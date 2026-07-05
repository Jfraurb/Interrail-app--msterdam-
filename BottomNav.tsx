"use client";

import type { Tab } from "@/components/AppShell";

const items: { id: Tab; label: string; icon: JSX.Element }[] = [
  {
    id: "ruta",
    label: "Ruta",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="M6 8.5 V13a3 3 0 0 0 3 3h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "mapa",
    label: "Mapa",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
        <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" strokeLinejoin="round" />
        <path d="M9 4v14M15 6v14" />
      </svg>
    ),
  },
  {
    id: "consejos",
    label: "Consejos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5" strokeLinecap="round" />
        <circle cx="12" cy="16" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "progreso",
    label: "Progreso",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
        <path d="M4 20V10M12 20V4M20 20v-7" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-stone-200 shadow-nav"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-4">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => onChange(item.id)}
                className="w-full flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] active:scale-95 transition-transform"
                aria-current={isActive ? "page" : undefined}
              >
                <span className={isActive ? "text-fiets" : "text-ink/40"}>{item.icon}</span>
                <span
                  className={`text-[11px] font-display font-medium tracking-wide ${
                    isActive ? "text-fiets" : "text-ink/50"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
