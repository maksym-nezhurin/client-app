'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';
import { authService } from '@/services/auth';
import { useTypedTranslation } from '@/lib/i18n';

export default function AccountSettingsPage() {
  const { user, isLoading, refresh } = useAuth();
  const { t } = useTypedTranslation();
  const [firstName, setFirstName] = useState(user?.firstName ? String(user.firstName) : '');
  const [lastName, setLastName] = useState(user?.lastName ? String(user.lastName) : '');
  const [countryCode, setCountryCode] = useState(user?.countryCode ? String(user.countryCode) : '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">{t('client.account_settings.loading')}</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-2xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95">
        <h1 className="text-2xl font-semibold">{t('client.account_settings.title')}</h1>
        <p className="text-sm text-muted-foreground">
          {t('client.account_settings.guest_subtitle')}
        </p>
        <Button asChild>
          <Link href={ROUTES.AUTH.LOGIN}>{t('client.account.go_to_login')}</Link>
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
      setSuccess(t('client.account_settings.updated'));
    } catch (err) {
      console.error('Failed to update settings:', err);
      setError(t('client.account_settings.update_error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95">
        <h1 className="text-2xl font-semibold">{t('client.account_settings.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('client.account_settings.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95">
        <Input
          id="firstName"
          type="text"
          label={t('client.account_settings.first_name')}
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <Input
          id="lastName"
          type="text"
          label={t('client.account_settings.last_name')}
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <Input
          id="countryCode"
          type="text"
          label={t('client.account_settings.country_code')}
          value={countryCode}
          onChange={(event) => setCountryCode(event.target.value)}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <div className="flex items-center justify-between">
          <Button type="submit" disabled={saving}>
            {saving ? t('client.account_settings.saving') : t('client.account_settings.save_changes')}
          </Button>
          <Button asChild variant="ghost">
            <Link href={ROUTES.ACCOUNT}>{t('client.account_settings.back_to_profile')}</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}