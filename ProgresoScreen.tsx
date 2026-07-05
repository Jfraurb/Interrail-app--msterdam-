"use client";

import { useEffect, useState } from "react";
import { stops } from "@/data/route";
import { checklistStore } from "@/lib/storage";

const checklistItems = [
  { id: "bici", label: "Bicicleta alquilada" },
  { id: "candado", label: "Candado" },
  { id: "bateria", label: "Batería externa para el móvil" },
  { id: "agua", label: "Agua" },
  { id: "chubasquero", label: "Chubasquero ligero" },
  { id: "luces", label: "Luces, por si se hace tarde" },
  { id: "offline", label: "Google Maps descargado sin conexión" },
];

export default function ProgresoScreen({
  visited,
  percent,
  onReset,
}: {
  visited: Set<string>;
  percent: number;
  onReset: () => void;
}) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    setChecked(checklistStore.getAll());
  }, []);

  const toggleCheck = (id: string) => setChecked(checklistStore.toggle(id));

  return (
    <div className="min-h-screen bg-stone-50 pt-safe">
      <header className="px-5 pt-5 pb-3">
        <h2 className="font-display font-bold text-2xl text-ink">Tu progreso</h2>
        <p className="text-ink/50 text-[13px] mt-0.5">Se guarda en este dispositivo, sin conexión</p>
      </header>

      <div className="px-5">
        <div className="bg-canal text-white rounded-2xl p-5 shadow-card">
          <div className="flex items-end justify-between">
            <div>
              <div className="font-mono text-4xl font-semibold">{percent}%</div>
              <div className="text-stone-300/70 text-xs mt-1">
                {visited.size} de {stops.length} paradas visitadas
              </div>
            </div>
            <button
              onClick={onReset}
              className="text-xs font-mono text-fiets-light border border-fiets-light/40 rounded-full px-3 py-1.5 active:scale-95 transition-transform"
            >
              Reiniciar ruta
            </button>
          </div>
          <div className="h-2 bg-white/15 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-fiets rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 pb-safe">
        <h3 className="font-display font-semibold text-base text-ink mb-2">Checklist antes de salir</h3>
        <div className="bg-white rounded-2xl shadow-card divide-y divide-stone-100">
          {checklistItems.map((item) => {
            const isChecked = checked.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              >
                <span
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isChecked ? "bg-fiets border-fiets" : "border-ink/25"
                  }`}
                >
                  {isChecked && (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className={`text-[14px] ${isChecked ? "text-ink/40 line-through" : "text-ink/85"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
