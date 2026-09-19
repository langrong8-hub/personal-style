import Link from 'next/link';
export default function NotFound(){return <div className="page narrow empty"><span className="eyebrow">404 / PAGE NOT FOUND</span><h1>这一页，还没有写下。</h1><p>可以先回到首页，继续你的穿搭观察。</p><Link href="/" className="text-link">回到首页 →</Link></div>}
