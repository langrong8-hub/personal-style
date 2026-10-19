'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

export type SavedCase = { reasons: string[]; note: string; date: string };
export type LearningStatus = 'unseen' | 'learned' | 'understood';
export type AppState = {
  learned: Record<string, string>;
  understood: Record<string, string>;
  saved: Record<string, SavedCase>;
  choices: Record<string, string>;
  lastLesson: string;
  reduceMotion: boolean;
};

const initial: AppState = {
  learned: {},
  understood: {},
  saved: {},
  choices: {},
  lastLesson: 'proportion',
  reduceMotion: false,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function timestamp(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return;
  const date = new Date(value);
  if (Number.isFinite(date.getTime())) return date.toISOString();
}

function dateRecord(value: unknown): Record<string, string> {
  if (!isRecord(value)) return {};
  return Object.fromEntries(Object.entries(value).flatMap(([key, item]) => {
    const date = timestamp(item);
    return date ? [[key, date]] : [];
  }));
}

function choiceRecord(value: unknown): Record<string, string> {
  if (!isRecord(value)) return {};
  return Object.fromEntries(Object.entries(value).filter((entry): entry is [string, 'a' | 'b'] => entry[1] === 'a' || entry[1] === 'b'));
}

function savedRecord(value: unknown): Record<string, SavedCase> {
  if (!isRecord(value)) return {};
  return Object.fromEntries(Object.entries(value).flatMap(([key, item]) => {
    if (!isRecord(item) || !Array.isArray(item.reasons) || typeof item.note !== 'string') return [];
    const date = timestamp(item.date);
    if (!date || !item.reasons.every(reason => typeof reason === 'string')) return [];
    return [[key, { reasons: [...new Set(item.reasons)], note: item.note, date } as SavedCase]];
  }));
}

export function restoreState(raw: string): AppState {
  const saved: unknown = JSON.parse(raw);
  if (!isRecord(saved)) throw new TypeError('Invalid saved state');
  const understood = dateRecord(saved.understood);
  return {
    learned: { ...understood, ...dateRecord(saved.learned) },
    understood,
    saved: savedRecord(saved.saved),
    choices: choiceRecord(saved.choices),
    lastLesson: typeof saved.lastLesson === 'string' && saved.lastLesson ? saved.lastLesson : initial.lastLesson,
    reduceMotion: saved.reduceMotion === true,
  };
}

const StoreContext = createContext<{
  state: AppState;
  ready: boolean;
  error: string;
  update: (fn: (state: AppState) => AppState) => void;
}>({ state: initial, ready: false, error: '', update: () => {} });

export function getLearningStatus(state: AppState, lessonId: string): LearningStatus {
  if (state.understood[lessonId]) return 'understood';
  if (state.learned[lessonId]) return 'learned';
  return 'unseen';
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initial);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const hydrated = useRef(false);
  const pendingUpdates = useRef<Array<(state: AppState) => AppState>>([]);
  const needsSave = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let restored = initial;
    let restoreError = '';
    try {
      const raw = localStorage.getItem('style-notes-v01a');
      if (raw) restored = restoreState(raw);
    } catch {
      restoreError = '本地记录暂时无法读取，你仍可以浏览和学习。';
    }
    queueMicrotask(() => {
      if (cancelled) return;
      const next = pendingUpdates.current.reduce((value, apply) => apply(value), restored);
      pendingUpdates.current = [];
      hydrated.current = true;
      setState(next);
      setError(restoreError);
      setReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  const update = useCallback((fn: (state: AppState) => AppState) => {
    needsSave.current = true;
    if (!hydrated.current) {
      pendingUpdates.current.push(fn);
      return;
    }
    setState(fn);
  }, []);

  useEffect(() => {
    if (!ready || !needsSave.current) return;
    needsSave.current = false;
    let saveError = '';
    try {
      localStorage.setItem('style-notes-v01a', JSON.stringify(state));
    } catch {
      saveError = '浏览器未能保存记录，本次操作仅在当前页面会话有效。';
    }
    queueMicrotask(() => setError(saveError));
  }, [state, ready]);

  useEffect(() => {
    document.documentElement.dataset.reduceMotion = String(state.reduceMotion);
  }, [state.reduceMotion]);

  return <StoreContext.Provider value={{ state, ready, error, update }}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
