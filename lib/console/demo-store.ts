import { useSyncExternalStore } from 'react';
import {
  freshState,
  sampleState,
  transact,
  type Action,
  type ConsoleState,
} from './domain';
const STORAGE = 'aurinova.console.demo.v1';
let state: ConsoleState | null = null;
let storageAvailable = true;
const listeners = new Set<() => void>();
const empty = freshState();
function read() {
  if (state) return state;
  try {
    const raw = localStorage.getItem(STORAGE);
    const parsed = raw ? JSON.parse(raw) : null;
    if (
      parsed?.version === 1 &&
      Array.isArray(parsed.keys) &&
      Array.isArray(parsed.usage) &&
      Array.isArray(parsed.orders) &&
      Array.isArray(parsed.ledger) &&
      Array.isArray(parsed.events) &&
      parsed.profile &&
      Number.isFinite(parsed.cash)
    )
      state = parsed;
  } catch {
    storageAvailable = false;
  }
  if (!state) {
    state = sampleState();
    try {
      localStorage.setItem(STORAGE, JSON.stringify(state));
    } catch {
      storageAvailable = false;
    }
  }
  const aliases: Record<string, string> = {
    'demo-code': 'glm-5.3-flash',
    'demo-reason': 'glm-5.3',
  };
  state.keys.forEach((key) => {
    key.models = key.models.map((id) => aliases[id] ?? id);
  });
  state.usage.forEach((row) => {
    row.model = aliases[row.model] ?? row.model;
  });
  if (
    state.profile.name === 'Demo workspace' ||
    state.profile.name === 'FormSy workspace'
  ) {
    state.profile.name = '林舟';
  }
  return state;
}
function save(next: ConsoleState) {
  state = next;
  try {
    localStorage.setItem(STORAGE, JSON.stringify(state));
  } catch {
    storageAvailable = false;
  }
  listeners.forEach((fn) => fn());
}
export function demoAction(action: Action) {
  const next = transact(read(), action);
  save(next);
  return next;
}
export function resetDemo(blank = false) {
  save(blank ? freshState() : sampleState());
}
export function useDemoState() {
  const value = useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
    read,
    () => empty,
  );
  return { state: value, storageAvailable };
}
