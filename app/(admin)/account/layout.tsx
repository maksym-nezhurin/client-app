'use client';

import { useState } from 'react';
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
  const { user, isLoading } = useAuth();
  const { t } = useTypedTranslation('client');
  
  // Check if any cars submenu item is active

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