import type { Market, RegistrationCountry } from '@/types/car';

export const MARKET_PREFIXES: Record<Market, `/${Market}`> = {
  ua: '/ua',
  pl: '/pl',
  sk: '/sk',
};

export function getMarketFromPath(pathname: string): Market {
  const normalized = pathname.toLowerCase();
  if (normalized.startsWith('/pl')) return 'pl';
  if (normalized.startsWith('/sk')) return 'sk';
  return 'ua';
}

export function getMarketFromHost(hostname?: string | null): Market | null {
  if (!hostname) return null;
  const host = hostname.toLowerCase();
  if (host.startsWith('pl.')) return 'pl';
  if (host.startsWith('sk.')) return 'sk';
  if (host.startsWith('ua.')) return 'ua';
  return null;
}

export function resolveMarket(pathname: string, hostname?: string | null): Market {
  return getMarketFromHost(hostname) ?? getMarketFromPath(pathname);
}

export function marketToCountry(market: Market): RegistrationCountry {
  switch (market) {
    case 'pl':
      return 'PL';
    case 'sk':
      return 'SK';
    default:
      return 'UA';
  }
}
