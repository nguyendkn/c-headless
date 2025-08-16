'use client';

import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams<{ id: string }>();
  return <div>app {params.id}</div>;
}
