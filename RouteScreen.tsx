"use client";

import { useRef } from "react";
import { stops } from "@/data/route";
import { DayPart } from "@/types";
import StopCard from "@/components/StopCard";

const dayParts: DayPart[] = ["mañana", "mediodía", "tarde", "atardecer"];

export default function RouteScreen({
  visited,
  onToggle,
}: {
  visited: Set<string>;
  onToggle: (id: string) => void;
}) {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollTo = (part: DayPart) => {
    const first = stops.find((s) => s.dayPart === part);
    if (first) refs.current[first.id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-safe">
      <header className="sticky top-0 z-10 bg-stone-50/95 backdrop-blur px-5 pt-5 pb-3 border-b border-stone-200">
        <h2 className="font-display font-bold text-2xl text-ink">La ruta</h2>
        <p className="text-ink/50 text-[13px] mt-0.5">12 paradas ordenadas, de Centraal a los canales al atardecer</p>

        <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
          {dayParts.map((part) => (
            <button
              key={part}
              onClick={() => scrollTo(part)}
              className="shrink-0 font-display text-xs font-medium capitalize bg-white border border-stone-200 rounded-full px-3.5 py-1.5 text-ink/70 active:scale-95 transition-transform"
            >
              {part}
            </button>
          ))}
        </div>
      </header>

      <div className="px-5 pt-5 pb-safe">
        {stops.map((stop, i) => (
          <div key={stop.id} ref={(el) => (refs.current[stop.id] = el)}>
            <StopCard
              stop={stop}
              isLast={i === stops.length - 1}
              visited={visited.has(stop.id)}
              onToggle={() => onToggle(stop.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
