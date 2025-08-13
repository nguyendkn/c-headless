import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { message: 'Hello from "sign-in" API' },
    { status: 200 }
  );
}
