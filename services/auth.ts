export type AuthUser = {
  id?: string;
  email?: string;
  name?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  countryCode?: string;
} & Record<string, unknown>;

export type LoginPayload = {
  email?: string;
  username?: string;
  password?: string;
  phone?: string;
};

type LoginResult = {
  ok: boolean;
  user?: AuthUser | null;
  error?: string;
};

async function parseJson<T>(res: Response): Promise<T | null> {
  const data = (await res.json().catch(() => null)) as T | null;
  return data;
}

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResult> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const data = await parseJson<AuthUser | { user?: AuthUser } | { message?: string }>(res);

    if (!res.ok) {
      return {
        ok: false,
        error: (data as { message?: string } | null)?.message ?? 'Unable to login.',
      };
    }

    const user = (data as { user?: AuthUser } | null)?.user ?? (data as AuthUser | null) ?? null;
    return { ok: true, user };
  },

  async getSession(): Promise<AuthUser | null> {
    const res = await fetch('/api/auth/me', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!res.ok) {
      return null;
    }

    const data = await parseJson<AuthUser | { user?: AuthUser }>(res);
    return (data as { user?: AuthUser } | null)?.user ?? (data as AuthUser | null) ?? null;
  },

  async logout(): Promise<void> {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  },

  async updateProfile(payload: {
    firstName?: string;
    lastName?: string;
    countryCode?: string;
    preferredCountries?: string[];
  }): Promise<AuthUser> {
    const res = await fetch('/api/auth/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error('Failed to update profile');
    }

    const data = await parseJson<AuthUser | { user?: AuthUser }>(res);
    return (data as { user?: AuthUser } | null)?.user ?? (data as AuthUser | null) ?? {};
  },
};
