"use client";

import { RouteStop } from "@/types";

export default function StopCard({
  stop,
  isLast,
  visited,
  onToggle,
}: {
  stop: RouteStop;
  isLast: boolean;
  visited: boolean;
  onToggle: () => void;
}) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`;

  return (
    <div className="flex gap-3">
      {/* Node + connecting line — the knooppunt signature, carried from the hero */}
      <div className="flex flex-col items-center pt-1">
        <div
          className={`w-9 h-9 shrink-0 rounded-node flex items-center justify-center font-mono text-sm font-semibold border-2 transition-colors ${
            visited ? "bg-fiets border-fiets text-white" : "bg-white border-canal text-canal"
          }`}
        >
          {visited ? (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            String(stop.order).padStart(2, "0")
          )}
        </div>
        {!isLast && <div className="w-px flex-1 bg-canal/20 my-1" />}
      </div>

      {/* Card body */}
      <div className={`flex-1 pb-7 ${isLast ? "" : ""}`}>
        <div className="bg-white rounded-2xl shadow-card p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-semibold text-[17px] text-ink leading-snug">
              {stop.name}
              {stop.optional && (
                <span className="ml-2 align-middle text-[10px] font-mono uppercase tracking-wide text-ink/40 border border-ink/20 rounded-full px-1.5 py-0.5">
                  opcional
                </span>
              )}
            </h3>
          </div>

          <p className="text-[13.5px] text-ink/70 mt-1 leading-relaxed">{stop.summary}</p>

          <div className="mt-3 space-y-2">
            <Field label="Qué ver" text={stop.whatToSee} />
            <Field label="Consejo" text={stop.tip} accent />
          </div>

          <div className="flex items-center gap-4 mt-3 font-mono text-xs text-ink/60">
            <span>⏱ {stop.minutesHere} min aquí</span>
            {stop.distanceToNextKm != null && (
              <span>
                → {stop.distanceToNextKm} km · {stop.bikeMinutesToNext} min
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={onToggle}
              className={`flex-1 rounded-xl py-2.5 font-display font-medium text-sm transition-colors active:scale-[0.98] ${
                visited ? "bg-stone-100 text-ink/50" : "bg-canal text-white"
              }`}
            >
              {visited ? "Visitado ✓" : "Marcar como visitado"}
            </button>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl py-2.5 px-3 border border-canal/20 text-canal active:scale-[0.98] transition-transform"
              aria-label={`Abrir ${stop.name} en Google Maps`}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </a>
          </div>

          {stop.legNote && !isLast && (
            <p className="text-[11.5px] text-fiets-dark/80 mt-3 pt-3 border-t border-stone-100 leading-relaxed">
              🚴 {stop.legNote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, text, accent }: { label: string; text: string; accent?: boolean }) {
  return (
    <div>
      <span
        className={`text-[10px] font-mono uppercase tracking-wide ${accent ? "text-fiets-dark" : "text-ink/40"}`}
      >
        {label}
      </span>
      <p className="text-[13.5px] text-ink/80 leading-relaxed">{text}</p>
    </div>
  );
}
