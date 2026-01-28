 'use client';

import Link from 'next/link';
import CarItem from '@/components/car/CarItem';
import { HeroSection } from '@/components/sections/HeroSection';
import { ActionCardsSection } from '@/components/sections/ActionCardsSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { PartnersSection } from '@/components/sections/PartnerSection';
import { Button } from '@/components/ui/Button';
import { ICar } from '@/types/car';
import { ROUTES } from '@/lib/routes';
import { useTypedTranslation } from '@/lib/i18n';

type HomePageClientProps = {
  latestCars: ICar[];
};

export function HomePageClient({ latestCars }: HomePageClientProps) {
  const { t } = useTypedTranslation();

  return (
    <main className="full-bleed relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="car-hero-bg fixed inset-0" />
        <div className="glass-grid absolute inset-0 opacity-40" />
        <div className="glass-noise absolute inset-0 opacity-40" />
        <div className="absolute -top-32 left-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute top-20 right-16 h-96 w-96 rounded-full bg-violet-500/20 blur-[140px]" />
        <div className="absolute bottom-24 left-1/3 h-80 w-80 rounded-full bg-blue-500/20 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        <HeroSection />

        <ActionCardsSection />

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_45px_rgba(15,23,42,0.6)] backdrop-blur md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">{t('client.home.latest_title')}</h2>
              <p className="text-sm text-slate-300">{t('client.home.latest_subtitle')}</p>
            </div>
            <Button asChild variant="secondary">
              <Link href={ROUTES.BROWSE}>{t('client.home.latest_cta')}</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestCars.map((car) => (
              <CarItem key={car.id} car={car} isLoading={false} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={ROUTES.AUTH.LOGIN}>{t('client.home.latest_create')}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={ROUTES.ACCOUNT_CARS_NEW}>{t('client.home.latest_add_car')}</Link>
            </Button>
          </div>
        </section>

        <FeaturesSection />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(15,23,42,0.5)] backdrop-blur">
            <h2 className="text-2xl font-semibold">{t('client.home.next_steps_title')}</h2>
            <p className="mt-2 text-sm text-slate-300">
              {t('client.home.next_steps_subtitle')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={ROUTES.BROWSE}>{t('client.home.next_steps_find')}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={ROUTES.ACCOUNT}>{t('client.home.next_steps_dashboard')}</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href={ROUTES.ACCOUNT_CARS_NEW}>{t('client.home.next_steps_post')}</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(15,23,42,0.5)] backdrop-blur">
            <h3 className="text-lg font-semibold">{t('client.home.trust_title')}</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span>{t('client.home.trust_verified')}</span>
                <span className="text-white">4k+</span>
              </li>
              <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span>{t('client.home.trust_response')}</span>
                <span className="text-white">12 min</span>
              </li>
              <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span>{t('client.home.trust_secure')}</span>
                <span className="text-white">99.9%</span>
              </li>
            </ul>
          </div>
        </section>

        <PartnersSection />
      </div>
    </main>
  );
}
