import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { message: 'Hello from "forms" API' },
    { status: 200 }
  );
}
