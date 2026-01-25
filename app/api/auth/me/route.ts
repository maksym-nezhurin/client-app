import { NextResponse } from 'next/server';
import {
  AUTH_TOKEN_COOKIE,
  DEFAULT_AUTH_BASE_URL,
  DEFAULT_AUTH_ME_PATH,
} from '@/lib/auth/constants';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const authBaseUrl = process.env.AUTH_API_BASE_URL ?? DEFAULT_AUTH_BASE_URL;
  const mePath = process.env.AUTH_ME_PATH ?? DEFAULT_AUTH_ME_PATH;

  const response = await fetch(`${authBaseUrl}${mePath}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json(
      { message: data?.message ?? 'Unauthorized' },
      { status: response.status }
    );
  }

  return NextResponse.json(data?.user ?? data?.profile ?? data?.data ?? data);
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const authBaseUrl = process.env.AUTH_API_BASE_URL ?? DEFAULT_AUTH_BASE_URL;
  const mePath = process.env.AUTH_ME_PATH ?? DEFAULT_AUTH_ME_PATH;
  const payload = await request.json().catch(() => ({}));

  const response = await fetch(`${authBaseUrl}${mePath}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json(
      { message: data?.message ?? 'Unable to update profile' },
      { status: response.status }
    );
  }

  return NextResponse.json(data?.user ?? data?.profile ?? data?.data ?? data);
}
