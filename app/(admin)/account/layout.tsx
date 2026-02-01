'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useTypedTranslation } from '@/lib/i18n';
import { AnimatedBackground } from '@/components/layouts/AnimatedBackground';
import { AccountSideBar } from '@/components/nav/AccountSideBar';

import { 
  ChevronDown, 
  Car, 
  Home,
  Settings, 
  Tag, 
  Plus, 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Palette 
} from 'lucide-react';

interface MenuItem {
  href?: string;
  label: string;
  icon?: React.ElementType;
  children?: MenuItem[];
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const { t } = useTypedTranslation('client');
  
  // Check if any cars submenu item is active
  const isCarsMenuActive = pathname?.startsWith('/account/cars');
  const isSettingsMenuActive = pathname?.startsWith('/account/settings');
  
  const [carsMenuOpen, setCarsMenuOpen] = useState(isCarsMenuActive);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(isSettingsMenuActive);

  // Redirect to login if not authenticated - always run this hook
  useEffect(() => {
    // Only redirect after we've checked authentication status
    if (!isLoading && !user) {
      const returnUrl = `${ROUTES.AUTH.LOGIN}?returnTo=${encodeURIComponent(pathname)}`;

      router.push(returnUrl);
    }
  }, [user, isLoading, router, pathname]);
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="justify-items-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }
  
  // Don't render content if not authenticated (let useEffect handle redirect)
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="justify-items-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 py-8 md:flex-row md:gap-8">
        <aside className="w-full rounded-2xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95 md:w-64">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t('account_menu.label')}
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {isLoading ? t('account_menu.loading') : user?.name ?? user?.username ?? t('account_menu.guest')}
            </p>
          </div>

          <AccountSideBar />
        </aside>

        <section className="flex-1">{children}</section>
      </div>
    </div>
  );
}