'use client';

import { Editor } from '@/components/workflow/editor';
import { useParams } from 'next/navigation';

export default function Page() {
  const { workflow_id } = useParams();

  return (
    <div>
      <Editor />
    </div>
  );
}
