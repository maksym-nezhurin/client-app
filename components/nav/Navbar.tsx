'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/Button'
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/lib/routes';

import { cn } from '@/lib/utils';
import { useTypedTranslation } from '@/lib/i18n';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useMarket } from '@/contexts/market/MarketContext';
import { Market, MARKET_OPTIONS } from '@/types/market';
import { useFeature } from '@/hooks/useFeature';
import { FeatureKey, isFeatureEnabledForMarket } from '@/types/features';

interface INavBarProps {
  items: {
    href: string;
    label: string;
  }[];
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isLoading, logout } = useAuth();
  const { t } = useTypedTranslation('client');
  const { market, setMarket, isDetecting } = useMarket();

  // Check all features at top level (hooks must be called unconditionally)
  const exploreFeature = useFeature(FeatureKey.EXPLORE_PAGE);
  
  // Check if SELL_CARS is available in current market (ignore auth status)
  const canSellInMarket = isFeatureEnabledForMarket(FeatureKey.SELL_CARS, market);

  // All navigation items with feature flags (including action buttons)
  const navItems = [
    {
      href: ROUTES.BROWSE,
      label: t('nav.browse'),
      icon: '🚗',
      isEnabled: true,
      type: 'link' as const,
    },
    {
      href: ROUTES.SELL,
      label: t('nav.list'),
      icon: '✨',
      isEnabled: canSellInMarket,
      type: 'action' as const,
      fallbackLabel: 'Coming Soon',
      fallbackIcon: '🚧',
    },
    {
      href: ROUTES.EXPLORE,
      label: t('nav.explore') || 'Explore',
      icon: '🔍',
      isEnabled: exploreFeature.isEnabled,
      type: 'link' as const,
    },
    {
      href: ROUTES.ABOUT,
      label: t('nav.about'),
      icon: 'ℹ️',
      isEnabled: true,
      type: 'link' as const,
    },
  ];

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
  };

  const handleMarketChange = (value: Market) => {
    if (value !== market) {
      setMarket(value);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-lg shadow-black/20">
            <Image src="/logo.webp" alt="Logo" width={50} height={50} />
          </div>
          <span className="text-lg font-semibold tracking-wide">CarRentPro</span>
        </Link>

        {/* Desktop Nav - All Navigation Items */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            // Item is enabled - show as clickable link
            if (item.isEnabled) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-white/20 hover:border-white/30',
                    pathname === item.href && 'bg-white/20 border-white/40'
                  )}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            }
            
            // Item is disabled - show "Coming Soon" badge
            if (item.type === 'action') {
              return (
                <div
                  key={item.href}
                  className="flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-600 shadow-sm"
                >
                  <span>{item.fallbackIcon}</span>
                  <span>{item.fallbackLabel}</span>
                </div>
              );
            }
            
            return null;
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden items-center space-x-4 md:flex">
          {/* Market Selector */}
          <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
            {MARKET_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleMarketChange(option.value)}
                disabled={isDetecting}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition flex items-center gap-1.5',
                  market === option.value
                    ? 'bg-white text-slate-900 shadow'
                    : 'text-slate-300 hover:text-white',
                  isDetecting && 'opacity-50 cursor-not-allowed'
                )}
                title={option.label}
              >
                <span className="text-sm">{option.flag}</span>
                <span className="uppercase">{option.shortLabel}</span>
              </button>
            ))}
          </div>
          
          {!isLoading &&
            (user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold text-white shadow shadow-black/30 transition hover:bg-white/20"
                  aria-label="Open user menu"
                >
                  {user?.name?.[0]?.toUpperCase() ?? user?.username?.[0]?.toUpperCase() ?? 'U'}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 overflow-hidden rounded-xl border border-white/10 bg-slate-950/95 shadow-xl">
                    <Link
                      href={ROUTES.ACCOUNT}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-slate-200 hover:bg-white/10"
                    >
                      {t('nav.dashboard')}
                    </Link>
                    <Link
                      href={ROUTES.ACCOUNT_SETTINGS}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-slate-200 hover:bg-white/10"
                    >
                      {t('nav.settings')}
                    </Link>
                    <Link
                      href={ROUTES.ACCOUNT_BILLING}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-slate-200 hover:bg-white/10"
                    >
                      {t('nav.billing')}
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full px-4 py-3 text-left text-sm text-slate-200 hover:bg-white/10"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={ROUTES.AUTH.LOGIN}
                className="text-sm font-medium text-slate-200 hover:text-white"
              >
                {t('nav.login')}
              </Link>
            ))}
          
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          onClick={() => setOpen(!open)}
          className="md:hidden text-text-primary focus:outline-none"
        >
          ☰
        </Button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-slate-900 border-t border-white/10">
          {/* All Navigation Items */}
          <div className="space-y-2 py-3">
            {navItems.map((item) => {
              // Item is enabled - show as clickable link
              if (item.isEnabled) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 hover:border-white/30',
                      pathname === item.href && 'bg-white/20 border-white/40'
                    )}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              }
              
              // Item is disabled - show "Coming Soon" badge
              if (item.type === 'action') {
                return (
                  <div
                    key={item.href}
                    className="flex items-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm font-medium text-yellow-600"
                  >
                    <span>{item.fallbackIcon}</span>
                    <span>{item.fallbackLabel}</span>
                  </div>
                );
              }
              
              return null;
            })}
          </div>
          
          {!user && (
            <div className="pt-2 border-t border-white/10">
              <Link 
                href={ROUTES.AUTH.LOGIN} 
                onClick={() => setOpen(false)}
                className="block text-slate-400 py-2 hover:text-white transition-colors"
              >
                {t('nav.login')}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
