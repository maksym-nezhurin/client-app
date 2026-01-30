import { NextResponse } from 'next/server';
import {
  AUTH_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  DEFAULT_AUTH_BASE_URL,
  DEFAULT_AUTH_SIGNUP_PATH,
} from '@/constants/auth';

type SignupResponse = {
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
  message?: string;
};

function extractToken(data: SignupResponse): string | undefined {
  return (
    data.access_token ??
    data.accessToken ??
    data.token ??
    data.jwt ??
    (data.data as SignupResponse | undefined)?.access_token ??
    (data.data as SignupResponse | undefined)?.accessToken ??
    (data.data as SignupResponse | undefined)?.token
  );
}

function extractRefreshToken(data: SignupResponse): string | undefined {
  return (
    data.refresh_token ??
    data.refreshToken ??
    (data.data as SignupResponse | undefined)?.refresh_token ??
    (data.data as SignupResponse | undefined)?.refreshToken
  );
}

function extractUser(data: SignupResponse): Record<string, unknown> | null {
  return data.user ?? data.profile ?? data.data ?? null;
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const authBaseUrl = process.env.AUTH_API_BASE_URL ?? DEFAULT_AUTH_BASE_URL;
  const signupPath = process.env.AUTH_SIGNUP_PATH ?? DEFAULT_AUTH_SIGNUP_PATH;

  try {
    const response = await fetch(`${authBaseUrl}${signupPath}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => ({}))) as SignupResponse;

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            (data?.data as { message?: string })?.message ??
            data?.message ??
            'Registration failed.',
        },
        { status: response.status }
      );
    }

    // Check if the response includes a token (auto-login after signup)
    const accessToken = extractToken(data);
    
    if (accessToken) {
      // Auto-login: set cookies and return user
      const res = NextResponse.json({ 
        user: extractUser(data) ?? null,
        message: 'Registration successful'
      });
      
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

    // No auto-login: just return success message
    return NextResponse.json({
      message: 'Registration successful. Please log in.',
      user: extractUser(data),
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred during registration.' },
      { status: 500 }
    );
  }
}
