'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useTypedTranslation } from '@/lib/i18n';
import { AnimatedBackground } from '@/components/layouts/AnimatedBackground';
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
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const { t } = useTypedTranslation('client');
  
  // Check if any cars submenu item is active
  const isCarsMenuActive = pathname?.startsWith('/account/cars');
  const isSettingsMenuActive = pathname?.startsWith('/account/settings');
  
  const [carsMenuOpen, setCarsMenuOpen] = useState(isCarsMenuActive);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(isSettingsMenuActive);

  const menuItems: MenuItem[] = [
    { 
      href: ROUTES.ACCOUNT, 
      label: t('account_menu.dashboard') || 'Dashboard',
      icon: Home,
    },
    { 
      label: t('account_menu.cars') || 'My Vehicles',
      icon: Car,
      children: [
        { 
          href: ROUTES.ACCOUNT_CARS, 
          label: t('account_menu.my_cars') || 'Overview',
          icon: Car,
        },
        { 
          href: '/account/cars/add-to-garage', 
          label: t('account_menu.add_to_garage') || 'Add to Garage',
          icon: Plus,
        },
        { 
          href: ROUTES.ACCOUNT_CARS_NEW, 
          label: t('account_menu.list_for_sale') || 'List for Sale',
          icon: Tag,
        },
      ],
    },
    { 
      label: t('account_menu.settings') || 'Settings',
      icon: Settings,
      children: [
        { 
          href: ROUTES.ACCOUNT_SETTINGS, 
          label: t('account_menu.profile') || 'Profile',
          icon: User,
        },
        { 
          href: '/account/settings/notifications', 
          label: t('account_menu.notifications') || 'Notifications',
          icon: Bell,
        },
        { 
          href: '/account/settings/privacy', 
          label: t('account_menu.privacy') || 'Privacy & Security',
          icon: Shield,
        },
        { 
          href: '/account/settings/billing', 
          label: t('account_menu.billing') || 'Billing',
          icon: CreditCard,
        },
        { 
          href: '/account/settings/preferences', 
          label: t('account_menu.preferences') || 'Preferences',
          icon: Palette,
        },
      ],
    },
  ];

  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = pathname === item.href;
    const Icon = item.icon;

    if (hasChildren) {
      // Determine which menu this is and its state
      const isCarsMenu = item.label.includes('Vehicles') || item.label.includes('cars');
      const isSettingsMenu = item.label.includes('Settings') || item.label.includes('settings');
      
      const isOpen = isCarsMenu ? carsMenuOpen : isSettingsMenu ? settingsMenuOpen : false;
      const isMenuActive = isCarsMenu ? isCarsMenuActive : isSettingsMenu ? isSettingsMenuActive : false;
      
      const toggleMenu = () => {
        if (isCarsMenu) {
          setCarsMenuOpen(!isOpen);
        } else if (isSettingsMenu) {
          setSettingsMenuOpen(!isOpen);
        }
      };
      
      return (
        <div key={item.label}>
          <button
            onClick={toggleMenu}
            className={cn(
              'flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all',
              isMenuActive
                ? 'bg-primary/10 text-primary shadow-sm'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            )}
          >
            <span className="flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4" />}
              {item.label}
            </span>
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform',
                isOpen && 'rotate-180'
              )}
            />
          </button>
          
          {isOpen && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-200 pl-2 dark:border-slate-800">
              {item.children!.map((child) => renderMenuItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href!}
        className={cn(
          'flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
          depth > 0 && 'pl-3',
          isActive
            ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20'
            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {item.label}
      </Link>
    );
  };

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
          <nav className="space-y-1">
            {menuItems.map((item) => renderMenuItem(item))}
          </nav>
        </aside>

        <section className="flex-1">{children}</section>
      </div>
    </div>
  );
}