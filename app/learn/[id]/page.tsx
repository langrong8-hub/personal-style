import { LessonDetail } from '@/components/pages';
import { lessons } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!lessons.some(lesson => lesson.id === id)) notFound();
  return <LessonDetail key={id} id={id} />;
}
