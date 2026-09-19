import type { MetadataRoute } from 'next';
export default function manifest():MetadataRoute.Manifest{return {name:'衣序 · 个人穿搭学习',short_name:'衣序',description:'从观察开始，慢慢形成个人审美。',start_url:'/',display:'standalone',background_color:'#f7f6f2',theme_color:'#f7f6f2',lang:'zh-CN',icons:[{src:'/icon.svg',sizes:'any',type:'image/svg+xml',purpose:'any'}]}}
