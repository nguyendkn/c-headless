import { NextRequest, NextResponse } from 'next/server';

type Params = { app_id: string; workflow_id: string };

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { app_id, workflow_id } = await params;

  return NextResponse.json(
    { message: `Hello from "workflow" ${app_id} with app ${workflow_id} API` },
    { status: 200 }
  );
}
