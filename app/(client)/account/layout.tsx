'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';
import { useAuth } from '@/components/auth/AuthContext';
import { useTypedTranslation } from '@/lib/i18n';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const { t } = useTypedTranslation();

  const menuItems = [
    { href: ROUTES.ACCOUNT, label: t('client.account_menu.dashboard') },
    { href: ROUTES.ACCOUNT_SETTINGS, label: t('client.account_menu.settings') },
    { href: ROUTES.ACCOUNT_BILLING, label: t('client.account_menu.billing') },
    { href: ROUTES.ACCOUNT_CARS, label: t('client.account_menu.my_cars') },
    { href: ROUTES.ACCOUNT_CARS_FOR_SALE, label: t('client.account_menu.cars_for_sale') },
    { href: ROUTES.ACCOUNT_CARS_NEW, label: t('client.account_menu.add_new_car') },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 md:flex-row md:gap-8">
      <aside className="w-full rounded-lg border border-muted bg-white p-4 shadow md:w-64">
        <div className="mb-6">
          <p className="text-xs uppercase text-muted-foreground">{t('client.account_menu.label')}</p>
          <p className="text-base font-semibold">
            {isLoading ? t('client.account_menu.loading') : user?.name ?? user?.username ?? t('client.account_menu.guest')}
          </p>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-muted hover:text-text-primary'
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
  );
}
