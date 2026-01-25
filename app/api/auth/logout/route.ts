import { NextResponse } from 'next/server';
import { AUTH_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '@/lib/auth/constants';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_TOKEN_COOKIE, '', { path: '/', maxAge: 0 });
  res.cookies.set(REFRESH_TOKEN_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
