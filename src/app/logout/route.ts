import { signOut } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  await signOut();
  return NextResponse.redirect(new URL('/', req.url));
}
export async function POST(req: NextRequest) {
  await signOut();
  return NextResponse.redirect(new URL('/', req.url));
}
