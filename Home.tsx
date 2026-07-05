"use client";

import { routeMeta, stops } from "@/data/route";

export default function Home({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-canal text-stone-50 pt-safe">
      <div className="flex-1 px-6 pt-14 pb-6 flex flex-col">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-fiets-light/90">
          Fietsroute · 1 dag
        </span>

        <h1 className="font-display font-bold text-[2.6rem] leading-[1.05] mt-3 tracking-tight">
          Ámsterdam
          <br />
          en bici.
        </h1>
        <p className="mt-4 text-stone-200/90 text-[15px] leading-relaxed max-w-xs">
          {routeMeta.tagline}
        </p>

        {/* Signature: a vertical "knooppunt" node line, same device used
            throughout the app for the route itself. */}
        <div className="mt-10 flex items-center gap-4">
          <NodeLine count={stops.length} />
          <dl className="grid grid-cols-3 gap-x-5 gap-y-3 flex-1">
            <Stat label="Distancia" value={`${routeMeta.totalKm} km`} />
            <Stat label="Duración" value="8–9 h" />
            <Stat label="Nivel" value={routeMeta.difficulty} />
          </dl>
        </div>
      </div>

      <div className="px-6 pb-10">
        <button
          onClick={onStart}
          className="w-full bg-fiets hover:bg-fiets-dark active:scale-[0.98] transition-all text-white font-display font-bold text-lg rounded-2xl py-4 shadow-card"
        >
          Empezar ruta →
        </button>
        <p className="text-center text-stone-300/70 text-xs mt-3 font-mono">
          Funciona sin conexión una vez cargada
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-lg font-semibold text-white">{value}</div>
      <div className="text-[11px] text-stone-300/70 uppercase tracking-wide">{label}</div>
    </div>
  );
}

/** The knooppunte (cycle-node) line: Amsterdam's real numbered-node signage,
 *  reused here as the app's structural signature instead of a generic progress bar. */
function NodeLine({ count }: { count: number }) {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-7 h-7 rounded-node border-2 border-fiets-light flex items-center justify-center font-mono text-[11px] text-fiets-light">
            {String(i * 4 + 1).padStart(2, "0")}
          </div>
          {i < 3 && <div className="w-px h-5 bg-fiets-light/40" />}
        </div>
      ))}
    </div>
  );
}
