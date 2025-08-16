import { NextRequest, NextResponse } from 'next/server';

type Params = { app_id: string };

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { app_id } = await params;
  return NextResponse.json(
    { message: `Hello from workflows with app ${app_id} API` },
    { status: 200 }
  );
}
