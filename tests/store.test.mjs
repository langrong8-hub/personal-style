import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import ts from 'typescript';

// Compile the real TSX module with the existing TypeScript dependency; no DOM is needed
// to exercise the persisted-data boundary.
const require = createRequire(import.meta.url);
const source = readFileSync(new URL('../components/store.tsx', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
});
const store = {};
new Function('exports', 'require', outputText)(store, require);
const { restoreState, getLearningStatus } = store;
const date = '2026-09-20T05:00:00.000Z';

const savedState = {
  learned: { proportion: date },
  understood: { proportion: date },
  saved: { 'quiet-morning': { reasons: ['配色', '材质'], note: '柔和的颜色', date } },
  choices: { waist: 'b', color: 'a' },
  lastLesson: 'proportion',
  reduceMotion: true,
};

test('restores existing progress, notes and choices without changing their identifiers', () => {
  assert.deepEqual(restoreState(JSON.stringify(savedState)), savedState);
});

test('discards invalid dates and choices while preserving usable records', () => {
  const state = restoreState(JSON.stringify({
    ...savedState,
    learned: { proportion: date, silhouette: 'not a date', color: '' },
    understood: { silhouette: 'invalid' },
    choices: { waist: 'b', color: 'other', shape: 1 },
    saved: {
      ...savedState.saved,
      broken: { reasons: ['配色'], note: 'invalid', date: 'yesterday' },
    },
  }));
  assert.deepEqual(state.learned, { proportion: date });
  assert.deepEqual(state.understood, {});
  assert.deepEqual(state.choices, { waist: 'b' });
  assert.deepEqual(state.saved, savedState.saved);
  assert.doesNotThrow(() => Object.values(state.learned).forEach(value => new Intl.DateTimeFormat('zh-CN').format(new Date(value))));
});

test('rejects malformed JSON and non-object roots so the provider can report recovery', () => {
  for (const raw of ['{broken', 'null', '[]', 'true', '42', '"text"']) {
    assert.throws(() => restoreState(raw));
  }
});

test('does not treat arrays or malformed saved notes as state records', () => {
  const state = restoreState(JSON.stringify({
    learned: [date], understood: null, choices: ['a'], reduceMotion: 'true', lastLesson: false,
    saved: { broken: { reasons: ['配色', 12], note: 'note', date } },
  }));
  assert.deepEqual(state, { learned: {}, understood: {}, saved: {}, choices: {}, lastLesson: 'proportion', reduceMotion: false });
});

test('understood entries remain learned and valid timestamps sort consistently', () => {
  const state = restoreState(JSON.stringify({ understood: { color: '2026-09-20T13:00:00+08:00' } }));
  assert.deepEqual(state.understood, { color: date });
  assert.deepEqual(state.learned, { color: date });
  assert.equal(getLearningStatus(state, 'color'), 'understood');
  assert.equal(getLearningStatus(state, 'silhouette'), 'unseen');
});
