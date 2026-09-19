'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

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

function stringRecord(value: unknown) {
  const result: Record<string, string> = {};
  if (!value || typeof value !== 'object') return result;
  Object.entries(value).forEach(([key, item]) => {
    if (typeof item === 'string') result[key] = item;
  });
  return result;
}

function savedRecord(value: unknown) {
  const result: Record<string, SavedCase> = {};
  if (!value || typeof value !== 'object') return result;
  Object.entries(value).forEach(([key, item]) => {
    if (
      item && typeof item === 'object' &&
      'reasons' in item && Array.isArray(item.reasons) && item.reasons.every((reason: unknown) => typeof reason === 'string') &&
      'note' in item && typeof item.note === 'string' &&
      'date' in item && typeof item.date === 'string'
    ) result[key] = item as SavedCase;
  });
  return result;
}

function restoreState(raw: string): AppState {
  const saved = JSON.parse(raw) as Partial<AppState>;
  return {
    learned: stringRecord(saved.learned),
    understood: stringRecord(saved.understood),
    saved: savedRecord(saved.saved),
    choices: stringRecord(saved.choices),
    lastLesson: typeof saved.lastLesson === 'string' ? saved.lastLesson : initial.lastLesson,
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
      setState(restored);
      setError(restoreError);
      setReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  function update(fn: (state: AppState) => AppState) {
    setState(previous => {
      const next = fn(previous);
      try {
        localStorage.setItem('style-notes-v01a', JSON.stringify(next));
        setError('');
      } catch {
        setError('浏览器未能保存记录，本次操作仅在当前页面会话有效。');
      }
      return next;
    });
  }

  useEffect(() => {
    document.documentElement.dataset.reduceMotion = String(state.reduceMotion);
  }, [state.reduceMotion]);

  return <StoreContext.Provider value={{ state, ready, error, update }}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
