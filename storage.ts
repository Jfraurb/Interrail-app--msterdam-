const VISITED_KEY = "asterdam-bici:visited";
const CHECKLIST_KEY = "asterdam-bici:checklist";

function readSet(key: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

function writeSet(key: string, set: Set<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(Array.from(set)));
}

export const visitedStore = {
  getAll(): Set<string> {
    return readSet(VISITED_KEY);
  },
  toggle(id: string): Set<string> {
    const set = readSet(VISITED_KEY);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    writeSet(VISITED_KEY, set);
    return set;
  },
  reset(): Set<string> {
    writeSet(VISITED_KEY, new Set());
    return new Set();
  },
};

export const checklistStore = {
  getAll(): Set<string> {
    return readSet(CHECKLIST_KEY);
  },
  toggle(id: string): Set<string> {
    const set = readSet(CHECKLIST_KEY);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    writeSet(CHECKLIST_KEY, set);
    return set;
  },
  reset(): Set<string> {
    writeSet(CHECKLIST_KEY, new Set());
    return new Set();
  },
};
