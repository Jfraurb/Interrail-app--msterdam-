"use client";

import { useState } from "react";
import Home from "@/components/Home";
import BottomNav from "@/components/BottomNav";
import RouteScreen from "@/components/RouteScreen";
import MapScreen from "@/components/MapScreen";
import ConsejosScreen from "@/components/ConsejosScreen";
import ProgresoScreen from "@/components/ProgresoScreen";
import { useProgress } from "@/lib/useProgress";

export type Tab = "ruta" | "mapa" | "consejos" | "progreso";

export default function AppShell() {
  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState<Tab>("ruta");
  const { visited, toggle, reset, percent } = useProgress();

  if (!started) {
    return <Home onStart={() => setStarted(true)} />;
  }

  return (
    <div>
      {tab === "ruta" && <RouteScreen visited={visited} onToggle={toggle} />}
      {tab === "mapa" && <MapScreen visited={visited} />}
      {tab === "consejos" && <ConsejosScreen />}
      {tab === "progreso" && <ProgresoScreen visited={visited} percent={percent} onReset={reset} />}
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
