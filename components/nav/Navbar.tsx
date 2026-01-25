// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';
import { useAuth } from '@/components/auth/AuthContext';
import { useTypedTranslation } from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';

export function Navbar({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();
  const { i18n, t } = useTypedTranslation();
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language ?? 'en') as SupportedLanguage;
  const languageOptions: { value: SupportedLanguage; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'uk', label: 'UA' },
    { value: 'pl', label: 'PL' },
  ];

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
  };

  const navLabelMap: Record<string, string> = {
    [ROUTES.BROWSE]: t('common.nav.browse'),
    '/sell': t('common.nav.sell'),
    '/about': t('common.nav.about'),
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
          {items.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-colors hover:text-white',
                pathname === href && 'text-white'
              )}
              aria-current={pathname === href ? 'page' : undefined}
            >
              {navLabelMap[href] ?? label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center space-x-4 md:flex">
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
            {t('common.nav.list')}
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
                      {t('common.nav.dashboard')}
                    </Link>
                    <Link
                      href={ROUTES.ACCOUNT_SETTINGS}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-slate-200 hover:bg-white/10"
                    >
                      {t('common.nav.settings')}
                    </Link>
                    <Link
                      href={ROUTES.ACCOUNT_BILLING}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-slate-200 hover:bg-white/10"
                    >
                      {t('common.nav.billing')}
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full px-4 py-3 text-left text-sm text-slate-200 hover:bg-white/10"
                    >
                      {t('common.nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={ROUTES.AUTH.LOGIN}
                className="text-sm font-medium text-slate-200 hover:text-white"
              >
                {t('common.nav.login')}
              </Link>
            ))}
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white focus:outline-none"
        >
          ☰
        </Button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="space-y-3 border-t border-white/10 bg-slate-950/90 px-4 pb-4 text-sm text-slate-200 md:hidden">
          <div className="flex items-center gap-2 pt-3">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleLanguageChange(option.value)}
                className={cn(
                  'rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase',
                  currentLanguage === option.value
                    ? 'bg-white text-slate-900'
                    : 'text-slate-300'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <Link href={ROUTES.BROWSE} className="block text-slate-200">
            {t('common.nav.browse')}
          </Link>
          <Link href="/sell" className="block text-slate-200">
            {t('common.nav.sell')}
          </Link>
          <Link href="/list" className="block font-semibold text-white">
            {t('common.nav.list')}
          </Link>
          {!isLoading &&
            (user ? (
              <>
                <Link href={ROUTES.ACCOUNT} className="block text-slate-200">
                  {t('common.nav.dashboard')}
                </Link>
                <Link href={ROUTES.ACCOUNT_SETTINGS} className="block text-slate-200">
                  {t('common.nav.settings')}
                </Link>
                <Link href={ROUTES.ACCOUNT_BILLING} className="block text-slate-200">
                  {t('common.nav.billing')}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block text-left text-slate-200"
                >
                  {t('common.nav.logout')}
                </button>
              </>
            ) : (
              <Link href={ROUTES.AUTH.LOGIN} className="block text-slate-200">
                {t('common.nav.login')}
              </Link>
            ))}
        </div>
      )}
    </header>
  )
}
