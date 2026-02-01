import { useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { ROUTES } from "@/lib/routes";
import { useTypedTranslation } from "@/lib/i18n";

import { 
    ChevronDown,
  Home,
  Car, 
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
  menuType?: 'cars' | 'settings';
}

export const AccountSideBar = () => {
    const pathname = usePathname();
    const { t } = useTypedTranslation('client');
    
    // Simple state management for menu expansion
    const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
    
    // Track current section to avoid unnecessary re-renders
    const currentSection = useMemo(() => {
        if (pathname?.startsWith('/account/cars')) return 'cars';
        if (pathname?.startsWith('/account/settings')) return 'settings';
        return null;
    }, [pathname]);
    
    // Auto-expand menus based on current path, but don't close others
    useEffect(() => {
        if (currentSection && !expandedMenus.has(currentSection)) {
            setExpandedMenus(prev => new Set(prev).add(currentSection));
        }
    }, [currentSection]);

    const menuItems: MenuItem[] = useMemo(() => [
        { 
            href: ROUTES.ACCOUNT, 
            label: t('account_menu.dashboard') || 'Dashboard',
            icon: Home,
        },
        { 
            label: t('account_menu.my_cars') || 'My Vehicles',
            icon: Car,
            menuType: 'cars',
            children: [
                { 
                    href: ROUTES.ACCOUNT_CARS, 
                    label: t('account_menu.overview') || 'Overview',
                    icon: Car,
                },
                { 
                    href: ROUTES.ACCOUNT_CARS_NEW, 
                    label: t('account_menu.add_new_car') || 'Add to Garage',
                    icon: Plus,
                },
                { 
                    href: ROUTES.ACCOUNT_CARS_SALE, 
                    label: t('account_menu.cars_for_sale') || 'List for Sale',
                    icon: Tag,
                },
            ],
        },
        { 
            label: t('account_menu.settings') || 'Settings',
            icon: Settings,
            menuType: 'settings',
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
    ], [t]);

    const renderMenuItem = (item: MenuItem, depth: number = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isActive = pathname === item.href;
        const Icon = item.icon;

        if (hasChildren && item.menuType) {
            const isOpen = expandedMenus.has(item.menuType);
            
            const toggleMenu = () => {
                setExpandedMenus(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(item.menuType!)) {
                        newSet.delete(item.menuType!);
                    } else {
                        newSet.add(item.menuType!);
                    }
                    return newSet;
                });
            };
            
            return (
                <div key={item.label}>
                    <button
                        onClick={toggleMenu}
                        className={cn(
                            'flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all',
                            isOpen
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
        <nav className="space-y-1">
            {menuItems.map((item) => renderMenuItem(item))}
        </nav>
    );
};