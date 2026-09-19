'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
type Saved = {reasons:string[];note:string;date:string};
type State = { learned:Record<string,string>; saved:Record<string,Saved>; choices:Record<string,string>; lastLesson:string; reduceMotion:boolean };
const initial:State = {learned:{},saved:{},choices:{},lastLesson:'proportion',reduceMotion:false};
const Context = createContext<{state:State;ready:boolean;error:string;update:(fn:(s:State)=>State)=>void}>({state:initial,ready:false,error:'',update:()=>{}});
export function StoreProvider({children}:{children:ReactNode}) {
 const [state,setState]=useState<State>(initial); const [ready,setReady]=useState(false); const [error,setError]=useState('');
 useEffect(()=>{try {const raw=localStorage.getItem('style-notes-v01a'); if(raw){const s=JSON.parse(raw) as Partial<State>; if(s && typeof s==='object') { const learned:Record<string,string>={}; const choices:Record<string,string>={}; const saved:Record<string,Saved>={}; Object.entries(s.learned||{}).forEach(([k,v])=>{if(typeof v==='string')learned[k]=v}); Object.entries(s.choices||{}).forEach(([k,v])=>{if(typeof v==='string')choices[k]=v}); Object.entries(s.saved||{}).forEach(([k,v])=>{if(v && typeof v==='object' && Array.isArray(v.reasons) && v.reasons.every(x=>typeof x==='string') && typeof v.note==='string' && typeof v.date==='string')saved[k]=v}); setState({...initial,learned,choices,saved,lastLesson:typeof s.lastLesson==='string'?s.lastLesson:initial.lastLesson,reduceMotion:s.reduceMotion===true});}}}catch{setError('本地记录暂时无法读取，你仍可以浏览和学习。');}setReady(true);},[]);
 function update(fn:(s:State)=>State){setState(prev=>{const next=fn(prev);try{localStorage.setItem('style-notes-v01a',JSON.stringify(next));setError('');}catch{setError('浏览器未能保存记录，本次操作仅在当前页面会话有效。');}return next;});}
 useEffect(()=>{document.documentElement.dataset.reduceMotion=String(state.reduceMotion);},[state.reduceMotion]);
 return <Context.Provider value={{state,ready,error,update}}>{children}</Context.Provider>;
}
export const useStore=()=>useContext(Context);
