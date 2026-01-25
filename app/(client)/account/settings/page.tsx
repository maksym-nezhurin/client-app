'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';
import { authService } from '@/services/auth';

export default function AccountSettingsPage() {
  const { user, isLoading, refresh } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName ? String(user.firstName) : '');
  const [lastName, setLastName] = useState(user?.lastName ? String(user.lastName) : '');
  const [countryCode, setCountryCode] = useState(user?.countryCode ? String(user.countryCode) : '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Loading settings...</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-lg border border-muted bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold">Account settings</h1>
        <p className="text-sm text-muted-foreground">
          Please sign in to manage your settings.
        </p>
        <Button asChild>
          <Link href={ROUTES.AUTH.LOGIN}>Go to login</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      await authService.updateProfile({
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
        countryCode: countryCode.trim() || undefined,
      });
      await refresh();
      setSuccess('Settings updated.');
    } catch (err) {
      console.error('Failed to update settings:', err);
      setError('Unable to update settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="rounded-lg border border-muted bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold">Account settings</h1>
        <p className="text-sm text-muted-foreground">Update your profile information.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-muted bg-white p-6 shadow">
        <Input
          id="firstName"
          type="text"
          label="First name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <Input
          id="lastName"
          type="text"
          label="Last name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <Input
          id="countryCode"
          type="text"
          label="Country code"
          value={countryCode}
          onChange={(event) => setCountryCode(event.target.value)}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <div className="flex items-center justify-between">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save changes'}
          </Button>
          <Button asChild variant="ghost">
            <Link href={ROUTES.ACCOUNT}>Back to profile</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
