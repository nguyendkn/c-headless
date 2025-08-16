import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: { app_id: string } }
) {
  const { app_id } = params;
  return NextResponse.json(
    { message: `Hello from "app" ${app_id} API` },
    { status: 200 }
  );
}
