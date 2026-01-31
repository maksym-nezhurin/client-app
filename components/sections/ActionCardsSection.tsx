'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';
import { useTypedTranslation } from '@/lib/i18n';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useMarket } from '@/contexts/market/MarketContext';
import { FeatureKey, isFeatureEnabledForMarket } from '@/types/features';

export function ActionCardsSection() {
  const { t } = useTypedTranslation();
  const { user } = useAuth();
  const { market } = useMarket();
  
  // Check if selling cars is available in current market
  const canSellInMarket = isFeatureEnabledForMarket(FeatureKey.SELL_CARS, market);
  
  // Determine if we should show list car as active or placeholder
  const showListCarActive = user || canSellInMarket;
  
  // Handle scroll to list page form section
  const handleListCarClick = (e: React.MouseEvent) => {
    if (user && canSellInMarket) {
      e.preventDefault();
      window.location.href = ROUTES.SELL + '#list-form';
    }
  };

  return (
    <section className={`grid gap-6 ${user ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
      {/* Card 1: Start Searching - Always visible */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(15,23,42,0.5)] backdrop-blur">
        <h2 className="text-xl font-semibold">{t('client.actions.start_searching.title')}</h2>
        <p className="mt-2 text-sm text-slate-300">
          {t('client.actions.start_searching.description')}
        </p>
        <Button asChild className="mt-6 w-full">
          <Link href={ROUTES.BROWSE}>{t('client.actions.start_searching.cta')}</Link>
        </Button>
      </div>

      {/* Card 2: List Your Car - Conditional rendering */}
      {showListCarActive ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(15,23,42,0.5)] backdrop-blur">
          <h2 className="text-xl font-semibold">{t('client.actions.list_car.title')}</h2>
          <p className="mt-2 text-sm text-slate-300">{t('client.actions.list_car.description')}</p>
          <Button 
            asChild 
            variant="secondary" 
            className="mt-6 w-full"
          >
            {user ? (
              <a href={ROUTES.SELL + '#list-form'} onClick={handleListCarClick}>
                {t('client.actions.list_car.cta')}
              </a>
            ) : (
              <Link href={ROUTES.SELL}>{t('client.actions.list_car.cta')}</Link>
            )}
          </Button>
        </div>
      ) : (
        <div className="rounded-3xl border border-yellow-500/30 bg-yellow-500/5 p-8 shadow-[0_0_40px_rgba(234,179,8,0.2)] backdrop-blur">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-600 dark:text-yellow-400">
            <span>🚧</span>
            <span>Coming Soon</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {t('client.actions.list_car.title')}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Car selling will be available in your market soon. Stay tuned!
          </p>
          <Button 
            variant="outline" 
            className="mt-6 w-full cursor-not-allowed opacity-50"
            disabled
          >
            Not Available Yet
          </Button>
        </div>
      )}

      {/* Card 3: Create Account - Only visible when NOT logged in */}
      {!user && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(15,23,42,0.5)] backdrop-blur">
          <h2 className="text-xl font-semibold">{t('client.actions.create_account.title')}</h2>
          <p className="mt-2 text-sm text-slate-300">
            {t('client.actions.create_account.description')}
          </p>
          <Button asChild variant="ghost" className="mt-6 w-full">
            <Link href={ROUTES.AUTH.SIGNUP}>{t('client.actions.create_account.cta')}</Link>
          </Button>
        </div>
      )}
    </section>
  );
}