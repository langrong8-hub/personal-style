import type { Metadata, Viewport } from 'next';
import { Shell } from '@/components/shell';
import './globals.css';
export const metadata:Metadata={title:{default:'衣序 — 个人穿搭学习笔记',template:'%s · 衣序'},description:'从观察开始，理解穿搭背后的逻辑，慢慢形成自己的审美。',applicationName:'衣序',appleWebApp:{capable:true,statusBarStyle:'default',title:'衣序'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#f7f6f2'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body><Shell>{children}</Shell></body></html>}
