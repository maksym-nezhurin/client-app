'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';
import { useAuth } from '@/components/auth/AuthContext';

const menuItems = [
  { href: ROUTES.ACCOUNT, label: 'Dashboard' },
  { href: ROUTES.ACCOUNT_SETTINGS, label: 'Settings' },
  { href: ROUTES.ACCOUNT_BILLING, label: 'Billing' },
  { href: ROUTES.ACCOUNT_CARS, label: 'My cars' },
  { href: ROUTES.ACCOUNT_CARS_FOR_SALE, label: 'Cars for sale' },
  { href: ROUTES.ACCOUNT_CARS_NEW, label: 'Add new car' },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 md:flex-row md:gap-8">
      <aside className="w-full rounded-lg border border-muted bg-white p-4 shadow md:w-64">
        <div className="mb-6">
          <p className="text-xs uppercase text-muted-foreground">Account</p>
          <p className="text-base font-semibold">
            {isLoading ? 'Loading...' : user?.name ?? user?.username ?? 'Guest'}
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
