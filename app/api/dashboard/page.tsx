import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { message: 'Hello from "dashboard" API' },
    { status: 200 }
  );
}
