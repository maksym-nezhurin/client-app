import { NextResponse } from 'next/server';
import {
  AUTH_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  DEFAULT_AUTH_BASE_URL,
  DEFAULT_AUTH_LOGIN_PATH,
} from '@/constants/auth';

type LoginResponse = {
  access_token?: string;
  accessToken?: string;
  token?: string;
  jwt?: string;
  refresh_token?: string;
  refreshToken?: string;
  expiresIn?: number;
  expires_in?: number;
  user?: Record<string, unknown>;
  profile?: Record<string, unknown>;
  data?: Record<string, unknown>;
};

function extractToken(data: LoginResponse): string | undefined {
  return (
    data.access_token ??
    data.accessToken ??
    data.token ??
    data.jwt ??
    (data.data as LoginResponse | undefined)?.access_token ??
    (data.data as LoginResponse | undefined)?.accessToken ??
    (data.data as LoginResponse | undefined)?.token
  );
}

function extractRefreshToken(data: LoginResponse): string | undefined {
  return (
    data.refresh_token ??
    data.refreshToken ??
    (data.data as LoginResponse | undefined)?.refresh_token ??
    (data.data as LoginResponse | undefined)?.refreshToken
  );
}

function extractUser(data: LoginResponse): Record<string, unknown> | null {
  return data.user ?? data.profile ?? data.data ?? null;
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const authBaseUrl = process.env.AUTH_API_BASE_URL ?? DEFAULT_AUTH_BASE_URL;
  const loginPath = process.env.AUTH_LOGIN_PATH ?? DEFAULT_AUTH_LOGIN_PATH;

  const response = await fetch(`${authBaseUrl}${loginPath}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as LoginResponse;

  if (!response.ok) {
    return NextResponse.json(
      { message: data?.data?.message ?? data?.message ?? 'Login failed.' },
      { status: response.status }
    );
  }

  const accessToken = extractToken(data);
  if (!accessToken) {
    return NextResponse.json({ message: 'Login succeeded but token missing.' }, { status: 502 });
  }

  const res = NextResponse.json({ user: extractUser(data) ?? null });
  const maxAge =
    typeof data.expiresIn === 'number'
      ? data.expiresIn
      : typeof data.expires_in === 'number'
      ? data.expires_in
      : undefined;
  const isProd = process.env.NODE_ENV === 'production';

  res.cookies.set(AUTH_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    path: '/',
    ...(maxAge ? { maxAge } : {}),
  });

  const refreshToken = extractRefreshToken(data);
  if (refreshToken) {
    res.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProd,
      path: '/',
    });
  }

  return res;
}