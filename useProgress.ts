"use client";

import { useCallback, useEffect, useState } from "react";
import { visitedStore } from "@/lib/storage";
import { stops } from "@/data/route";

export function useProgress() {
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setVisited(visitedStore.getAll());
    setHydrated(true);
  }, []);

  const toggle = useCallback((id: string) => {
    setVisited(visitedStore.toggle(id));
  }, []);

  const reset = useCallback(() => {
    setVisited(visitedStore.reset());
  }, []);

  const percent = hydrated ? Math.round((visited.size / stops.length) * 100) : 0;

  return { visited, toggle, reset, percent, hydrated };
}
