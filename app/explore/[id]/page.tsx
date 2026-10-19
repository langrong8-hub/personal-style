import { CaseDetail } from '@/components/pages';
import { cases } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!cases.some(item => item.id === id)) notFound();
  return <CaseDetail key={id} id={id} />;
}
