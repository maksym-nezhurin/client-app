import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_TOKEN_COOKIE, DEFAULT_AUTH_BASE_URL } from '@/lib/auth/constants';

type CheckoutResponse = {
  url?: string;
  checkoutUrl?: string;
  data?: {
    url?: string;
    checkoutUrl?: string;
  };
  message?: string;
};

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json().catch(() => ({}));
  const baseUrl = process.env.BILLING_API_BASE_URL ?? process.env.AUTH_API_BASE_URL ?? DEFAULT_AUTH_BASE_URL;
  const checkoutPath = process.env.BILLING_CHECKOUT_PATH ?? '/v1/billing/checkout';

  const response = await fetch(`${baseUrl}${checkoutPath}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as CheckoutResponse;

  if (!response.ok) {
    return NextResponse.json(
      { message: data.message ?? 'Unable to create checkout session.' },
      { status: response.status }
    );
  }

  const url = data.url ?? data.checkoutUrl ?? data.data?.url ?? data.data?.checkoutUrl;
  if (!url) {
    return NextResponse.json({ message: 'Checkout URL missing.' }, { status: 502 });
  }

  return NextResponse.json({ url });
}
