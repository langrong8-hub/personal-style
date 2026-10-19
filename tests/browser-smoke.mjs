
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'msedge', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await mkdir('.qa', { recursive: true });
async function visit(path) {
  const response = await page.goto(baseURL + path);
  assert.equal(response.status(), 200, path);
  await page.locator('main h1').waitFor();
}
async function fit() {
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, 'page overflows viewport');
}
async function contrast(locator) {
  const colors = await locator.evaluate(node => {
    const style = getComputedStyle(node);
    return { fg: style.color, bg: style.backgroundColor, text: node.textContent };
  });
  const luminance = value => {
    const values = value.match(/[\d.]+/g).slice(0,3).map(Number).map(x => { x /= 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; });
    return values[0]*.2126 + values[1]*.7152 + values[2]*.0722;
  };
  const light = luminance(colors.fg), dark = luminance(colors.bg);
  assert.ok((Math.max(light,dark)+.05)/(Math.min(light,dark)+.05) >= 4.5, 'low button contrast: ' + JSON.stringify(colors));
}
try {
  await visit('/explore');
  for (const [author,casePath,sourceId] of [
    ['痴五安chammy','/explore/chammy-navy-white','7536136434638441737'],
    ['AYUANPL阿源匹林','/explore/ayuan-dark-layers','7324693195558849842'],
  ]) {
    await page.locator('.creator-filters').getByRole('button',{name:author,exact:true}).click();
    assert.equal(await page.locator('.case-card').count(),1);
    assert.equal(await page.locator('.case-card>a').getAttribute('href'),casePath);
    await page.locator('.case-card>a').click();
    await page.locator('.creator-credit').waitFor();
    assert.equal(await page.locator('.creator-credit>a').getAttribute('href'),'https://www.douyin.com/video/'+sourceId);
    assert.match(await page.locator('.creator-credit').innerText(),/原作者保留权利/);
    const frame=page.locator('.case-hero img');
    await frame.evaluate(node=>node.decode());
    assert.equal(await frame.evaluate(node=>getComputedStyle(node).objectFit),'contain');
    assert.equal(await frame.evaluate(node=>getComputedStyle(node).filter),'none');
    assert.equal(await page.locator('.analysis-section details[open]').count(),7);
    await visit('/explore');
  }
  await visit('/learn/read-creator-outfits');
  const practice=page.locator('.practice-block');
  for (const checkbox of await practice.getByRole('checkbox').all()) await checkbox.check();
  assert.equal(await practice.locator('.practice-progress').innerText(),'已练习 3/3 步');
  assert.ok(await page.locator('.related-lessons a').count()>0);
  await page.screenshot({path:'.qa/creator-tutorial-desktop.png',fullPage:true});
  await visit('/learn');
  const principles = page.getByRole('tab', { name: /基础原理/ });
  await principles.focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.getByRole('tab', { name: /单品知识/ }).getAttribute('aria-selected'), 'true');
  assert.equal(await page.locator('.item-group').count(), 6);
  await page.screenshot({ path: '.qa/learn-desktop.png', fullPage: true });
  await visit('/learn/proportion');
  const confirm = page.getByRole('button', {name:'确认判断，查看原因', exact:true});
  assert.equal(await confirm.isDisabled(), true);
  await page.locator('.comparison-pair>button').first().click();
  await contrast(confirm);
  await confirm.click();
  await contrast(page.getByRole('button', {name:'解释已展开', exact:true}));
  await page.getByRole('button', {name:'我理解了', exact:true}).click();
  await page.waitForFunction(() => JSON.parse(localStorage.getItem('style-notes-v01a'))?.understood.proportion);
  await page.reload();
  await page.locator('.finish-status .learning-badge.understood').waitFor();
  await page.screenshot({ path: '.qa/lesson-desktop.png', fullPage: true });
  await visit('/explore');
  const caseHref = await page.locator('.case-card a').first().getAttribute('href');
  await visit(caseHref);
  assert.equal(await page.locator('.analysis-section details[open]').count(), 7);
  await page.locator('.analysis-section summary').first().click();
  assert.equal(await page.locator('.analysis-section details[open]').count(), 6);
  const saveOpener = page.getByRole('button', {name:'收藏并记录原因', exact:true});
  await saveOpener.click();
  const dialog = page.getByRole('dialog');
  assert.equal(await dialog.getByRole('button', {name:'保存收藏', exact:true}).isDisabled(), true);
  await page.keyboard.press('Shift+Tab');
  assert.equal(await page.evaluate(() => document.activeElement.textContent), '暂不保存');
  await dialog.getByRole('button', {name:'配色', exact:true}).click();
  await dialog.locator('textarea').fill('喜欢清楚的分界与颜色呼应');
  await dialog.getByRole('button', {name:'保存收藏', exact:true}).click();
  await page.getByRole('button', {name:'已收藏 · 编辑原因', exact:true}).waitFor();
  await page.reload();
  await page.getByRole('button', {name:'已收藏 · 编辑原因', exact:true}).click();
  assert.equal(await page.getByRole('dialog').locator('textarea').inputValue(), '喜欢清楚的分界与颜色呼应');
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog').count(), 0);
  assert.match(await page.evaluate(() => document.activeElement.textContent), /已收藏/);
  await visit('/explore/compare');
  for (let i=0;i<4;i++) {
    await page.locator('.compare-stage>button').first().click();
    await page.getByRole('button', {name:'确认判断，查看差异', exact:true}).click();
    assert.equal(await page.locator('.effect-panel').isVisible(), true);
    assert.ok((await page.locator('.comparison-limitation').innerText()).length>20);
    if (i<3) await page.getByRole('button', {name:'下一组', exact:true}).click();
  }
  assert.equal(await page.getByRole('button', {name:'下一组', exact:true}).isDisabled(), true);
  await page.screenshot({ path: '.qa/compare-desktop.png', fullPage: true });
  await visit('/me');
  await page.getByRole('checkbox').check();
  assert.equal(await page.locator('html').getAttribute('data-reduce-motion'), 'true');
  await page.reload();
  await page.waitForFunction(() => document.querySelector('input[type=checkbox]')?.checked);
  await page.evaluate(() => localStorage.setItem('style-notes-v01a', JSON.stringify({ learned:{proportion:'invalid'}, understood:{}, saved:{}, choices:{waist:'wrong'} })));
  await page.reload();
  await page.locator('.record-list').waitFor();
  assert.equal(await page.locator('.record-list .learning-badge.learned').count(), 0);
  for (const path of ['/learn/missing-case', '/explore/missing-case']) {
    const response=await page.goto(baseURL+path);
    assert.equal(response.status(),404,path);
  }
  await page.setViewportSize({width:390,height:844});
  for (const path of ['/','/learn','/learn/white-shirt','/explore','/explore/compare',caseHref,'/explore/ayuan-dark-layers','/learn/read-creator-outfits','/learn/layering-openings','/learn/trouser-shoe-break','/me']) {
    await visit(path);
    await fit();
    await page.screenshot({path:'.qa/mobile-'+(path.replaceAll('/','-')||'home')+'.png',fullPage:true});
  }
  await visit('/explore/compare');
  const images=page.locator('.compare-stage img');
  for (const img of await images.all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(node => node.decode());
    assert.ok(await img.evaluate(node => node.naturalWidth > 0));
  }
  assert.deepEqual(errors,[]);
  console.log('Browser checks passed: desktop/mobile layout, button contrast, learning and notes persistence, A/B flow, keyboard focus, 404 and corrupt records.');
} finally {
  await browser.close();
}
