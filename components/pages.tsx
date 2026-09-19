'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, Check, ChevronDown, Clock3, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/components/store';
import { cases, categories, comparisons, lessons, reasons, type CaseStudy, type Lesson } from '@/lib/data';

function PageHead({ index, eyebrow, title, intro }: { index: string; eyebrow: string; title: string; intro: string }) {
  return <header className="page-head"><span className="folio">{index}</span><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></div></header>;
}

function SectionTitle({ kicker, title, link, linkLabel }: { kicker: string; title: string; link?: string; linkLabel?: string }) {
  return <div className="section-title"><div><span>{kicker}</span><h2>{title}</h2></div>{link && <Link className="text-link" href={link}>{linkLabel ?? '查看全部'} <ArrowRight size={15} /></Link>}</div>;
}

function CaseImage({ item, sizes = '(max-width: 700px) 100vw, 50vw', priority = false }: { item: CaseStudy; sizes?: string; priority?: boolean }) {
  return <div className="case-image"><Image src={item.image} alt={`${item.subtitle}穿搭案例`} fill priority={priority} sizes={sizes} style={{ objectPosition: item.position }} /></div>;
}

function CaseCard({ item, large = false }: { item: CaseStudy; large?: boolean }) {
  return <article className={large ? 'case-card large' : 'case-card'}><Link href={`/explore/${item.id}`}><CaseImage item={item} sizes={large ? '(max-width: 900px) 100vw, 58vw' : '(max-width: 700px) 100vw, 33vw'} /><div className="case-copy"><div className="tag-row">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><h3>{item.title}</h3><p>{item.subtitle}</p><span className="read-more">阅读案例 <ArrowRight size={14} /></span></div></Link></article>;
}

function LessonRow({ item, number }: { item: Lesson; number: number }) {
  const { state } = useStore(); const done = Boolean(state.learned[item.id]);
  return <Link href={`/learn/${item.id}`} className="lesson-row"><span className="row-number">{String(number + 1).padStart(2, '0')}</span><div><span className="eyebrow">{item.category} · {item.minutes} MIN</span><h3>{item.title}</h3><p>{item.subtitle}</p></div><span className={done ? 'row-status done' : 'row-status'}>{done ? <><Check size={14}/> 已学</> : <ArrowRight size={18}/>}</span></Link>;
}

export function HomePage() {
  const { state, ready } = useStore();
  const current = lessons.find(x => x.id === state.lastLesson) ?? lessons[0];
  const learned = lessons.filter(x => state.learned[x.id]).slice(-3).reverse();
  const feature = cases[0];
  return <div className="home-page">
    <section className="hero page"><div className="hero-copy"><span className="eyebrow">VOL. 01 / 从观察开始</span><h1>穿得好看之前，<br/>先学会看。</h1><p>理解一套穿搭为什么成立，记录真实的喜欢，慢慢形成属于自己的审美。</p><Link href="/learn" className="primary-link">开始今天的学习 <ArrowRight size={17}/></Link></div><div className="hero-art"><CaseImage item={feature} sizes="(max-width: 800px) 100vw, 52vw" priority/><span className="vertical-caption">OBSERVE · UNDERSTAND · BECOME</span></div></section>
    <section className="page home-section"><SectionTitle kicker="01 / CONTINUE" title="今日继续"/><div className="continue-block"><div className="continue-index">{ready && state.learned[current.id] ? '✓' : '01'}</div><div><span className="eyebrow">{current.category} · 基础原理</span><h2>{current.title}</h2><p>{current.subtitle}</p><div className="progress-line"><i style={{width: state.learned[current.id] ? '100%' : '36%'}}/><span>{state.learned[current.id] ? '已完成' : `${current.minutes} 分钟`}</span></div></div><Button asChild><Link href={`/learn/${current.id}`}>{state.learned[current.id] ? '再看一遍' : '继续学习'} <ArrowRight size={15}/></Link></Button></div></section>
    <section className="feature-case"><div className="feature-photo"><CaseImage item={feature} sizes="(max-width: 800px) 100vw, 56vw"/></div><div className="feature-copy"><span className="eyebrow">02 / 一个穿搭案例</span><h2>{feature.title}</h2><p className="feature-subtitle">{feature.subtitle}</p><blockquote>“{feature.impression}”</blockquote><div className="tag-row">{feature.tags.map(t => <span key={t}>{t}</span>)}</div><Link className="text-link" href={`/explore/${feature.id}`}>读懂这套穿搭 <ArrowRight size={15}/></Link></div></section>
    <section className="page home-section"><SectionTitle kicker="03 / RECENTLY LEARNED" title="最近学到" link="/me" linkLabel="查看学习记录"/><div className="recent-grid">{learned.length ? learned.map((item, i) => <LessonRow key={item.id} item={item} number={i}/>) : lessons.slice(0,3).map((item,i)=><LessonRow key={item.id} item={item} number={i}/>)}</div></section>
  </div>;
}

export function LearnPage() {
  const principles = lessons.filter(x => x.kind === 'principle'); const items = lessons.filter(x => x.kind === 'item');
  const [filter,setFilter] = useState('全部');
  const shown = filter === '全部' ? principles : principles.filter(x => x.category === filter);
  return <div className="page"><PageHead index="01" eyebrow="LEARN / 学" title="先理解，再选择。" intro="从比例、轮廓与颜色开始，把模糊的感觉变成可以观察、比较和反复练习的线索。"/>
    <div className="filter-bar" aria-label="知识分类">{['全部',...categories].map(c=><button className={filter===c?'active':''} onClick={()=>setFilter(c)} key={c}>{c}</button>)}</div>
    <section className="content-section"><SectionTitle kicker="FOUNDATIONS" title="基础原理"/><div className="lesson-list">{shown.map((l,i)=><LessonRow key={l.id} item={l} number={i}/>)}</div></section>
    <section className="content-section"><SectionTitle kicker="ITEM NOTES" title="单品知识"/><div className="item-lessons">{items.map((item,i)=><Link href={`/learn/${item.id}`} key={item.id}><span className="item-number">0{i+1}</span><span className="eyebrow">{item.category}</span><h3>{item.title}</h3><p>{item.subtitle}</p><ArrowRight size={18}/></Link>)}</div></section>
  </div>;
}

function CompareIllustration({ variable, choice }: { variable: Lesson['variable']; choice: 'a'|'b' }) {
  const tucked = variable === 'waist' && choice === 'b'; const wide = variable === 'shape' && choice === 'b'; const dark = variable === 'color' && choice === 'b';
  return <svg className="outfit-figure" viewBox="0 0 240 330" role="img" aria-label="穿搭差异示意图"><circle cx="120" cy="37" r="22" fill="#cdb7a2"/><path d="M99 63 Q120 54 141 63 L165 162 Q144 174 120 174 Q96 174 75 162Z" fill="#ded8cc"/><path d="M100 61 L77 71 L51 145 L68 151 L94 95" fill="#ded8cc"/><path d="M140 61 L163 71 L189 145 L172 151 L146 95" fill="#ded8cc"/>{tucked ? <path d="M83 153 L157 153 L153 184 L87 184Z" fill="#ded8cc"/> : <path d="M76 145 Q120 158 164 145 L160 195 Q120 208 80 195Z" fill="#ded8cc"/>}<path d={wide ? 'M84 176 L117 176 L110 305 L64 305Z' : 'M88 176 L116 176 L108 305 L81 305Z'} fill={dark?'#4c463e':'#bcae98'}/><path d={wide ? 'M123 176 L156 176 L176 305 L130 305Z' : 'M124 176 L152 176 L159 305 L132 305Z'} fill={dark?'#4c463e':'#bcae98'}/><path d="M72 305 H109 V314 H67Z M131 305 H168 L173 314 H132Z" fill="#34332f"/>{tucked && <path d="M84 171 H156" stroke="#827665" strokeWidth="3"/>}</svg>;
}

export function LessonDetail({ id }: { id: string }) {
  const lesson = lessons.find(x => x.id === id); const { state, update } = useStore();
  const [pick,setPick] = useState<'a'|'b'|null>(null); const [revealed,setRevealed] = useState(false);
  if (!lesson) return <Missing/>;
  const related = cases.find(x => x.id === lesson.caseId) ?? cases[0]; const done = Boolean(state.learned[id]);
  function finish(){update(s=>({...s,learned:{...s.learned,[id]:new Date().toISOString()},lastLesson:id}));}
  return <article className="page article-page"><Link className="back-link" href="/learn"><ArrowLeft size={15}/> 返回知识列表</Link><header className="article-head"><div><span className="eyebrow">{lesson.category} / {lesson.kind==='principle'?'基础原理':'单品知识'} · {lesson.minutes} MIN</span><h1>{lesson.title}</h1><p>{lesson.subtitle}</p></div><span className="article-number">{String(lessons.indexOf(lesson)+1).padStart(2,'0')}</span></header>
    <section className="core-statement"><span>一句话核心解释</span><p>{lesson.core}</p></section>
    <section className="article-section"><SectionTitle kicker="COMPARE" title="先看对比，再做判断"/><p className="prompt">暂时不看解释。哪一个更接近你此刻想表达的感觉？</p><div className="comparison-pair">{(['a','b'] as const).map(key=><button key={key} className={pick===key?'selected':''} onClick={()=>{setPick(key);setRevealed(false)}}><span>{key.toUpperCase()}</span><CompareIllustration variable={lesson.variable} choice={key}/><strong>{key==='a'?lesson.a:lesson.b}</strong>{pick===key&&<i><Check size={14}/> 你的选择</i>}</button>)}</div><Button disabled={!pick} onClick={()=>setRevealed(true)}>{revealed?'解释已展开':'确认判断，查看原因'} <ArrowRight size={15}/></Button>{revealed&&<div className="reveal-panel"><span className="eyebrow">WHY / 原因解释</span><p>{lesson.explanation}</p></div>}</section>
    <section className="two-column-note"><div><span className="eyebrow">COMMON MISCONCEPTION</span><h2>常见误区</h2></div><p>{lesson.mistake}</p></section>
    <section className="article-section"><SectionTitle kicker="IN REAL LIFE" title="真实应用案例"/><div className="application-case"><CaseImage item={related}/><div><span className="eyebrow">案例观察</span><h3>{related.title}</h3><p>{related.factors[0]}</p><Link className="text-link" href={`/explore/${related.id}`}>阅读完整案例 <ArrowRight size={15}/></Link></div></div></section>
    <div className="finish-bar"><div>{done?<><Check size={18}/><span>已加入学习记录</span></>:<><Clock3 size={18}/><span>读完后，记录这次学习</span></>}</div><Button variant={done?'outline':'default'} onClick={finish}>{done?'再记一次':'标记为已学'}</Button></div>
  </article>;
}

export function ExplorePage() {
  const { state } = useStore(); const saved = cases.filter(x => state.saved[x.id]);
  return <div className="page"><PageHead index="02" eyebrow="EXPLORE / 看" title="多看一眼，看到原因。" intro="先感受整体，再拆开观察。一套穿搭不需要被打分，只需要帮你更清楚地知道自己在看什么。"/>
    <section className="content-section"><SectionTitle kicker="CASE STREAM" title="案例流"/><div className="case-grid">{cases.map((item,i)=><CaseCard key={item.id} item={item} large={i===0}/>)}</div></section>
    <section className="comparison-banner"><div><span className="eyebrow">A / B COMPARISON</span><h2>一次，只改变一个变量。</h2><p>先判断差异，再理解两个方案各自产生的视觉效果。</p><Button asChild><Link href="/explore/compare">开始 A/B 对比 <ArrowRight size={15}/></Link></Button></div><div className="mini-pair"><CompareIllustration variable="waist" choice="a"/><CompareIllustration variable="waist" choice="b"/></div></section>
    <section className="content-section"><SectionTitle kicker="MY SAVES" title="我的收藏" link="/me" linkLabel="查看收藏笔记"/>{saved.length?<div className="saved-strip">{saved.map(x=><CaseCard key={x.id} item={x}/>)}</div>:<div className="empty-inline"><Bookmark size={22}/><p>还没有收藏。遇见喜欢的案例时，也记下“为什么喜欢”。</p></div>}</section>
  </div>;
}

export function ComparePage() {
  const { state, update }=useStore(); const [index,setIndex]=useState(0); const item=comparisons[index]; const choice=state.choices[item.id] as 'a'|'b'|undefined;
  function choose(value:'a'|'b'){update(s=>({...s,choices:{...s.choices,[item.id]:value}}));}
  return <div className="page compare-page"><Link className="back-link" href="/explore"><ArrowLeft size={15}/> 返回案例流</Link><PageHead index={`${index+1}/${comparisons.length}`} eyebrow="A / B COMPARISON" title={item.title} intro={item.variable}/><div className="compare-stage">{(['a','b'] as const).map(key=><button key={key} onClick={()=>choose(key)} className={choice===key?'selected':''}><span className="choice-letter">{key.toUpperCase()}</span><CompareIllustration variable={item.id as Lesson['variable']} choice={key}/><h2>{key==='a'?item.a:item.b}</h2>{choice===key&&<span className="picked"><Check size={14}/> 我更想看这一种</span>}</button>)}</div>{choice?<div className="effect-panel"><span className="eyebrow">DIFFERENCE / 差异</span><div><p><strong>A</strong>{item.effectA}</p><p><strong>B</strong>{item.effectB}</p></div><p className="effect-note">你的选择没有对错。它只是记录此刻更吸引你的视觉效果。</p></div>:<p className="choose-hint">先选择更吸引你的一边，之后再看差异。</p>}<div className="compare-nav"><Button variant="outline" disabled={index===0} onClick={()=>setIndex(x=>x-1)}><ArrowLeft size={15}/> 上一组</Button><span>{String(index+1).padStart(2,'0')} / {String(comparisons.length).padStart(2,'0')}</span><Button disabled={index===comparisons.length-1} onClick={()=>setIndex(x=>x+1)}>下一组 <ArrowRight size={15}/></Button></div></div>;
}

function SavePanel({ item, close }: { item: CaseStudy; close:()=>void }) {
  const { state,update }=useStore(); const prior=state.saved[item.id]; const [selected,setSelected]=useState<string[]>(prior?.reasons??[]); const [note,setNote]=useState(prior?.note??'');
  function save(){update(s=>({...s,saved:{...s.saved,[item.id]:{reasons:selected,note,date:new Date().toISOString()}}}));close();}
  function remove(){update(s=>{const saved={...s.saved};delete saved[item.id];return {...s,saved}});close();}
  return <div className="save-layer" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)close()}}><div className="save-panel" role="dialog" aria-modal="true" aria-labelledby="save-title"><span className="eyebrow">SAVE A THOUGHT</span><h2 id="save-title">为什么收藏？</h2><p>不必说得很专业，记录当下真实吸引你的地方。</p><div className="reason-grid">{reasons.map(r=><button key={r} className={selected.includes(r)?'selected':''} onClick={()=>setSelected(x=>x.includes(r)?x.filter(y=>y!==r):[...x,r])}>{selected.includes(r)&&<Check size={13}/>} {r}</button>)}</div><label>再写一句（可选）<textarea maxLength={120} value={note} onChange={e=>setNote(e.target.value)} placeholder="比如：喜欢松弛但不拖沓的感觉……"/><span>{note.length}/120</span></label><div className="panel-actions">{prior&&<Button variant="ghost" onClick={remove}>取消收藏</Button>}<Button variant="outline" onClick={close}>暂不保存</Button><Button onClick={save} disabled={!selected.length}>保存收藏</Button></div></div></div>;
}

export function CaseDetail({ id }: { id: string }) {
  const item=cases.find(x=>x.id===id); const {state}=useStore(); const [saving,setSaving]=useState(false);
  if(!item)return <Missing/>; const saved=Boolean(state.saved[id]);
  return <article className="case-detail"><div className="page"><Link className="back-link" href="/explore"><ArrowLeft size={15}/> 返回案例流</Link></div><header className="case-hero"><CaseImage item={item} sizes="(max-width: 800px) 100vw, 54vw" priority/><div><span className="eyebrow">CASE STUDY / 穿搭案例</span><h1>{item.title}</h1><p>{item.subtitle}</p><div className="tag-row">{item.tags.map(x=><span key={x}>{x}</span>)}</div><Button variant={saved?'default':'outline'} onClick={()=>setSaving(true)}>{saved?<BookmarkCheck size={16}/>:<Bookmark size={16}/>} {saved?'已收藏 · 编辑原因':'收藏并记录原因'}</Button></div></header><div className="page article-body"><section className="impression"><span className="eyebrow">OVERALL IMPRESSION</span><h2>整体印象</h2><p>{item.impression}</p></section><section className="factor-section"><SectionTitle kicker="WHAT MATTERS MOST" title="最重要的 1～3 个因素"/><ol>{item.factors.map((x,i)=><li key={x}><span>0{i+1}</span><p>{x}</p></li>)}</ol></section><section className="analysis-section"><SectionTitle kicker="LOOK CLOSER" title="展开看细节"/><p>以下是观察线索，不是评分标准。</p><div>{Object.entries(item.analysis).map(([k,v])=><details key={k}><summary><span>{k}</span><ChevronDown size={18}/></summary><p>{v}</p></details>)}</div></section></div>{saving&&<SavePanel item={item} close={()=>setSaving(false)}/>}</article>;
}

export function MePage(){
 const {state,ready,update}=useStore(); const learned=lessons.filter(x=>state.learned[x.id]).sort((a,b)=>(state.learned[b.id]??'').localeCompare(state.learned[a.id]??'')); const saved=cases.filter(x=>state.saved[x.id]);
 const date=(raw:string)=>new Intl.DateTimeFormat('zh-CN',{month:'short',day:'numeric'}).format(new Date(raw));
 return <div className="page"><PageHead index="03" eyebrow="MY NOTES / 我的" title="审美，是留下来的观察。" intro="回看学过的内容和收藏的理由，你会慢慢发现自己反复在意的线条、颜色和氛围。"/>
   <section className="stats"><div><strong>{ready?learned.length:'—'}</strong><span>已学知识</span></div><div><strong>{ready?saved.length:'—'}</strong><span>收藏案例</span></div><div><strong>{ready?Object.keys(state.choices).length:'—'}</strong><span>完成判断</span></div></section>
   <section className="content-section"><SectionTitle kicker="LEARNING LOG" title="学习记录"/>{learned.length?<div className="record-list">{learned.map(x=><Link href={`/learn/${x.id}`} key={x.id}><span>{date(state.learned[x.id])}</span><div><small>{x.category}</small><h3>{x.title}</h3></div><ArrowRight size={17}/></Link>)}</div>:<div className="empty-inline"><BookIcon/><p>还没有学习记录。先从一个你感兴趣的主题开始。</p><Link className="text-link" href="/learn">去学习 <ArrowRight size={15}/></Link></div>}</section>
   <section className="content-section"><SectionTitle kicker="SAVED CASES" title="收藏笔记"/>{saved.length?<div className="saved-notes">{saved.map(x=><Link href={`/explore/${x.id}`} key={x.id}><CaseImage item={x}/><div><h3>{x.title}</h3><div className="tag-row">{state.saved[x.id].reasons.map(r=><span key={r}>{r}</span>)}</div>{state.saved[x.id].note&&<p>“{state.saved[x.id].note}”</p>}</div></Link>)}</div>:<div className="empty-inline"><Bookmark size={22}/><p>还没有收藏笔记。</p><Link className="text-link" href="/explore">去看案例 <ArrowRight size={15}/></Link></div>}</section>
   <section className="content-section settings"><SectionTitle kicker="SETTINGS" title="设置"/><label className="setting-row"><div><strong>减少动态效果</strong><p>关闭页面中过渡和动效，阅读时更安静。</p></div><input type="checkbox" checked={state.reduceMotion} onChange={e=>update(s=>({...s,reduceMotion:e.target.checked}))}/></label><button className="reset-button" onClick={()=>{if(window.confirm('确定清空本浏览器中的学习、收藏和判断记录吗？'))update(s=>({...s,learned:{},saved:{},choices:{},lastLesson:'proportion'}))}}><RotateCcw size={15}/> 清空本地记录</button><p className="local-note">所有记录只保存在这台设备的当前浏览器中。</p></section>
 </div>;
}

function BookIcon(){return <span className="book-icon">衣</span>}
function Missing(){return <div className="page narrow empty"><span className="eyebrow">NOT FOUND</span><h1>没有找到这篇内容。</h1><Link className="text-link" href="/">回到首页 <ArrowRight size={15}/></Link></div>}
