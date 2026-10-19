import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import ts from 'typescript';
const require = createRequire(import.meta.url);
function readModule(path, imports = {}) {
  const source = readFileSync(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  const result = {};
  new Function('exports', 'require', outputText)(result, name => imports[name] ?? require(name));
  return result;
}
const creatorContent = readModule('../lib/creator-content.ts');
const { photoAssets } = readModule('../lib/photos.ts', { './creator-content': creatorContent });
const { lessons, cases, itemGroups, comparisons } = readModule('../lib/data.ts', { './photos': { photoAssets }, './creator-content': creatorContent });
test('content identifiers stay unique and all internal references resolve', () => {
  for (const list of [lessons,cases,itemGroups,comparisons]) assert.equal(new Set(list.map(x=>x.id)).size,list.length);
  for (const lesson of lessons) assert.ok(cases.some(x=>x.id===lesson.caseId),lesson.id+' case');
  for (const group of itemGroups) for (const id of group.lessonIds) assert.ok(lessons.some(x=>x.id===id && x.kind==='item'),id+' group link');
  for (const item of comparisons) assert.ok(lessons.some(x=>x.id===item.lessonId),item.id+' lesson link');
  for (const item of [...lessons,...cases]) for (const id of item.relatedLessonIds??[]) assert.ok(lessons.some(x=>x.id===id),item.id+' related lesson');
  for (const lesson of lessons) for (const id of lesson.relatedCaseIds??[]) assert.ok(cases.some(x=>x.id===id),lesson.id+' related case');
});

test('creator frames retain author, original work, frame time and non-stock rights', () => {
  const frames=cases.filter(item=>item.photo.video);
  assert.equal(frames.length,2);
  assert.deepEqual(new Set(frames.map(item=>item.photo.author)),new Set(['痴五安chammy','AYUANPL阿源匹林']));
  for (const {photo} of frames) {
    assert.match(photo.sourceUrl,/^https:\/\/www\.douyin\.com\/video\/\d+$/);
    assert.match(photo.video.authorUrl,/^https:\/\/www\.douyin\.com\/user\//);
    assert.ok(Number.isInteger(photo.video.frameSeconds)&&photo.video.frameSeconds>0);
    assert.equal(photo.license,'原作者保留权利');
    assert.ok(photo.video.context.length>0);
    assert.ok(Number.isFinite(Date.parse(photo.video.publishedAt)));
    assert.ok(Number.isFinite(Date.parse(photo.video.capturedAt)));
  }
});

test('guided lessons connect a real case, practical steps and follow-up concepts', () => {
  for (const id of ['read-creator-outfits','layering-openings','trouser-shoe-break']) {
    const lesson=lessons.find(x=>x.id===id);
    assert.ok(cases.find(x=>x.id===lesson.caseId)?.photo.video,id+' creator case');
    assert.equal(lesson.practice.steps.length,3);
    assert.ok(lesson.practice.checkpoint.length>0);
    assert.ok(lesson.relatedLessonIds.length>0);
  }
});
test('the six core principles and six item articles have complete learning sections', () => {
  const required = ['proportion','silhouette','weight','color','texture','style','white-shirt','tee','straight-trousers','wide-trousers','loafers','retro-sneakers'];
  for (const id of required) {
    const lesson=lessons.find(x=>x.id===id);
    assert.ok(lesson,id);
    for (const field of ['core','observation','a','b','explanation','mistake','takeaway']) assert.ok(lesson[field]?.trim().length>0,id+' '+field);
  }
  for (const id of ['quiet-morning','city-lines','soft-structure','earth-tones','weekend-walk']) assert.ok(cases.some(x=>x.id===id),'legacy saved case '+id);
});
test('case images exist and analyses cover all seven dimensions', () => {
  for (const item of cases) {
    assert.equal(item.image,item.photo.src,item.id+' photo');
    assert.ok(item.factors.length>=1 && item.factors.length<=3,item.id+' factor count');
    assert.deepEqual(Object.keys(item.analysis).sort(),['比例','轮廓','量感','色彩','材质','风格','细节'].sort(),item.id+' dimensions');
    assert.ok(existsSync(new URL('../public'+item.image,import.meta.url)),item.id+' local image');
    assert.ok(item.photo.alt.length>10,item.id+' alt');
  }
});
test('four comparisons have real images, source metadata, and explicit observational limits', () => {
  assert.equal(comparisons.length,4);
  for (const item of comparisons) {
    assert.notEqual(item.imageA,item.imageB);
    assert.ok(item.limitation.length>30,item.id+' limitation');
    for (const photo of [item.photoA,item.photoB]) {
      assert.ok(existsSync(new URL('../public'+photo.src,import.meta.url)),photo.src);
      for (const field of ['sourceUrl','originalUrl','licenseUrl']) assert.equal(new URL(photo[field]).protocol,'https:',field);
      assert.ok(photo.license.length>0);
      assert.ok(photo.author===null || typeof photo.author==='string');
    }
  }
});
