'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useTypedTranslation } from '@/lib/i18n';
import { AnimatedBackground } from '@/components/layouts/AnimatedBackground';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const { t } = useTypedTranslation();

  const menuItems = [
    { href: ROUTES.ACCOUNT, label: t('client.account_menu.dashboard') },
    { href: ROUTES.ACCOUNT_SETTINGS, label: t('client.account_menu.settings') },
    // { href: ROUTES.ACCOUNT_BILLING, label: t('client.account_menu.billing') },
    // { href: ROUTES.ACCOUNT_CARS, label: t('client.account_menu.my_cars') },
    // { href: ROUTES.ACCOUNT_CARS_FOR_SALE, label: t('client.account_menu.cars_for_sale') },
    // { href: ROUTES.ACCOUNT_CARS_NEW, label: t('client.account_menu.add_new_car') },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 py-8 md:flex-row md:gap-8">
        <aside className="w-full rounded-2xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95 md:w-64">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t('client.account_menu.label')}
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {isLoading ? t('client.account_menu.loading') : user?.name ?? user?.username ?? t('client.account_menu.guest')}
            </p>
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="flex-1">{children}</section>
      </div>
    </div>
  );
}