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
import type { SupportedLanguage } from '@/lib/i18n';

interface INavBarProps {
  items: {
    href: string;
    label: string;
  }[];
}

const languageOptions: { value: SupportedLanguage; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'uk', label: 'UA' },
  { value: 'pl', label: 'PL' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isLoading, logout } = useAuth();
  const { i18n, t } = useTypedTranslation();
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language ?? 'en') as SupportedLanguage;

  const navLabelMap: Record<string, string> = {
    [ROUTES.BROWSE]: t('client.nav.browse'),
    [ROUTES.EXPLORE]: t('client.nav.explore') || 'Explore',
    [ROUTES.SELL]: t('client.nav.sell'),
    [ROUTES.ABOUT]: t('client.nav.about'),
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
  };

  const handleLanguageChange = async (value: SupportedLanguage) => {
    if (value !== currentLanguage) {
      await i18n.changeLanguage(value);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-lg shadow-black/20">
            <Image src="/logo.webp" alt="Logo" width={28} height={28} />
          </div>
          <span className="text-lg font-semibold tracking-wide">CarRentPro</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center space-x-6 text-sm text-slate-200 md:flex">
          {Object.keys(navLabelMap).map((href, key) => (
            <Link
              key={key}
              href={href}
              className={cn(
                'transition-colors hover:text-white',
                pathname === key && 'text-white'
              )}
              aria-current={pathname === key ? 'page' : undefined}
            >
              {navLabelMap[href]}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center space-x-4 md:flex">
          {/* Language Selector */}
          <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleLanguageChange(option.value)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition',
                  currentLanguage === option.value
                    ? 'bg-white text-slate-900 shadow'
                    : 'text-slate-300 hover:text-white'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          <Link
            href="/list"
            className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-white/20"
          >
            {t('client.nav.list')}
          </Link>
          
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
                      {t('client.nav.dashboard')}
                    </Link>
                    <Link
                      href={ROUTES.ACCOUNT_SETTINGS}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-slate-200 hover:bg-white/10"
                    >
                      {t('client.nav.settings')}
                    </Link>
                    <Link
                      href={ROUTES.ACCOUNT_BILLING}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-slate-200 hover:bg-white/10"
                    >
                      {t('client.nav.billing')}
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full px-4 py-3 text-left text-sm text-slate-200 hover:bg-white/10"
                    >
                      {t('client.nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={ROUTES.AUTH.LOGIN}
                className="text-sm font-medium text-slate-200 hover:text-white"
              >
                {t('client.nav.login')}
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
          <Link href={ROUTES.BROWSE} className="block text-text-primary">
            {t('client.nav.browse')}
          </Link>
          <Link href={ROUTES.EXPLORE} className="block text-text-primary">
            {t('client.nav.explore') || 'Explore'}
          </Link>
          <Link href={ROUTES.SELL} className="block text-text-primary">
            {t('client.nav.sell')}
          </Link>
          <Link href={ROUTES.ABOUT} className="block text-text-primary">
            {t('client.nav.about')}
          </Link>
          {!user && (
            <Link href={ROUTES.AUTH.LOGIN} className="block text-text-secondary">
              {t('client.nav.login')}
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
