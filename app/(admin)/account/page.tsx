'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth/AuthContext';
import { ROUTES } from '@/lib/routes';
import { Button } from '@/components/ui/Button';
import { useTypedTranslation } from '@/lib/i18n';
import { RecentActivitySection } from '@/components/dashboard/RecentActivitySection';

const summaryCards = [
  { labelKey: 'client.account.summary.active_listings', value: '4' },
  { labelKey: 'client.account.summary.cars_for_sale', value: '2' },
  { labelKey: 'client.account.summary.total_views', value: '1,284' },
  { labelKey: 'client.account.summary.new_inquiries', value: '6' },
];

export default function AccountPage() {
  const { user, isLoading } = useAuth();
  const { t } = useTypedTranslation('client');
  const primaryCar = (user as { primaryCar?: { name?: string; year?: number; status?: string } })?.primaryCar;

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">{t('account.loading_dashboard')}</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-2xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95">
        <h1 className="text-2xl font-semibold">{t('account.account_dashboard_title')}</h1>
        <p className="text-sm text-muted-foreground">
          {t('account.account_dashboard_guest')}
        </p>
        <Button asChild>
          <Link href={ROUTES.AUTH.LOGIN}>{t('account.go_to_login')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{t('account.dashboard_title')}</h1>
            <p className="text-sm text-muted-foreground">
              {t('account.dashboard_subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href={ROUTES.ACCOUNT_CARS_NEW}>{t('account.add_new_car')}</Link>
            </Button>
            <Button asChild>
              <Link href={ROUTES.ACCOUNT_CARS}>{t('account.manage_cars')}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.labelKey} className="rounded-2xl border border-white/10 bg-white/95 p-5 shadow-xl backdrop-blur-xl dark:bg-slate-900/95">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t(card.labelKey)}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <RecentActivitySection 
          limit={5} 
          showFilters={true}
          className="lg:col-span-2"
        />

        <div className="rounded-2xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95">
          <h2 className="text-lg font-semibold">{t('account.profile_quick_view')}</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-xs uppercase text-muted-foreground">{t('account.name')}</dt>
              <dd className="font-medium">{user.name ?? user.username ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted-foreground">{t('account.email')}</dt>
              <dd className="font-medium">{user.email ?? '—'}</dd>
            </div>
          </dl>
          <Button asChild variant="ghost" className="mt-4 w-full">
            <Link href={ROUTES.ACCOUNT_SETTINGS}>{t('account.edit_settings')}</Link>
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">{t('account.primary_car.title')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('account.primary_car.subtitle')}
            </p>
          </div>
          {primaryCar ? (
            <Button asChild variant="secondary">
              <Link href={ROUTES.ACCOUNT_CARS}>{t('account.primary_car.manage')}</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={ROUTES.ACCOUNT_CARS_NEW}>{t('account.primary_car.add')}</Link>
            </Button>
          )}
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-white/20 bg-muted/30 p-5 backdrop-blur-sm">
          {primaryCar ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{t('account.primary_car.selected_label')}</p>
                <p className="text-xl font-semibold">
                  {primaryCar.name ?? 'Your car'}
                </p>
                {primaryCar.year && (
                  <p className="text-sm text-slate-500">{primaryCar.year}</p>
                )}
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                {primaryCar.status ?? 'Active'}
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  {t('account.primary_car.empty_title')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('account.primary_car.empty_subtitle')}
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link href={ROUTES.ACCOUNT_CARS_NEW}>{t('account.primary_car.add')}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}