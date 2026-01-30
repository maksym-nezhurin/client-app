'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';
import { useTypedTranslation } from '@/lib/i18n';

export function ActionCardsSection() {
  const { t } = useTypedTranslation();

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(15,23,42,0.5)] backdrop-blur">
        <h2 className="text-xl font-semibold">{t('client.actions.start_searching.title')}</h2>
        <p className="mt-2 text-sm text-slate-300">
          {t('client.actions.start_searching.description')}
        </p>
        <Button asChild className="mt-6 w-full">
          <Link href={ROUTES.BROWSE}>{t('client.actions.start_searching.cta')}</Link>
        </Button>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(15,23,42,0.5)] backdrop-blur">
        <h2 className="text-xl font-semibold">{t('client.actions.list_car.title')}</h2>
        <p className="mt-2 text-sm text-slate-300">{t('client.actions.list_car.description')}</p>
        <Button asChild variant="secondary" className="mt-6 w-full">
          <Link href={ROUTES.ACCOUNT_CARS_NEW}>{t('client.actions.list_car.cta')}</Link>
        </Button>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(15,23,42,0.5)] backdrop-blur">
        <h2 className="text-xl font-semibold">{t('client.actions.create_account.title')}</h2>
        <p className="mt-2 text-sm text-slate-300">
          {t('client.actions.create_account.description')}
        </p>
        <Button asChild variant="ghost" className="mt-6 w-full">
          <Link href={ROUTES.AUTH.LOGIN}>{t('client.actions.create_account.cta')}</Link>
        </Button>
      </div>
    </section>
  );
}