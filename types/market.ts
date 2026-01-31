// ============================================================================
// MARKET CONFIGURATION - SINGLE SOURCE OF TRUTH
// ============================================================================
// 
// HOW TO ADD A NEW MARKET:
// 1. Add market code to MarketCode enum
// 2. Add market config to MARKET_CONFIGS array
// 3. Done! Everything else auto-updates.
//
// HOW TO DISABLE A MARKET:
// Set enabled: false in MARKET_CONFIGS
//
// HOW TO REMOVE A MARKET:
// 1. Remove from MarketCode enum
// 2. Remove from MARKET_CONFIGS array
// 3. Done!
// ============================================================================

export const MarketCode = {
  PL: 'PL',
  SK: 'SK',
  UA: 'UA',
} as const;

export type Market = typeof MarketCode[keyof typeof MarketCode];

export interface MarketConfig {
  code: Market;
  name: string;
  currency: string;
  locale: string;
  flag: string;
  language: string;
  enabled: boolean;
  timezone?: string; // Optional: for better detection
  domains?: string[]; // Optional: for domain-based routing
}

/**
 * MASTER MARKET CONFIGURATION
 * Add new markets here. Set enabled: false to disable a market.
 */
const MARKET_CONFIGS: MarketConfig[] = [
  {
    code: MarketCode.PL,
    name: 'Poland',
    currency: 'PLN',
    locale: 'pl-PL',
    flag: '🇵🇱',
    language: 'pl',
    enabled: true,
    timezone: 'Europe/Warsaw',
    domains: ['pl.yoursite.com'],
  },
  {
    code: MarketCode.SK,
    name: 'Slovakia',
    currency: 'EUR',
    locale: 'sk-SK',
    flag: '🇸🇰',
    language: 'sk',
    enabled: true,
    timezone: 'Europe/Bratislava',
    domains: ['sk.yoursite.com'],
  },
  {
    code: MarketCode.UA,
    name: 'Ukraine',
    currency: 'UAH',
    locale: 'uk-UA',
    flag: '🇺🇦',
    language: 'uk',
    enabled: true,
    timezone: 'Europe/Kiev',
    domains: ['ua.yoursite.com'],
  },
];

// ============================================================================
// DERIVED DATA - Auto-generated from config above
// DO NOT EDIT BELOW - Everything is computed automatically
// ============================================================================

/** All markets (Record format for easy lookup) */
export const MARKETS = MARKET_CONFIGS.reduce((acc, config) => {
  acc[config.code] = config;
  return acc;
}, {} as Record<Market, MarketConfig>);

/** Only enabled markets */
export const ENABLED_MARKETS = MARKET_CONFIGS.filter(m => m.enabled);

/** Array of enabled market codes */
export const ENABLED_MARKET_CODES = ENABLED_MARKETS.map(m => m.code);

/** Market options for UI selectors */
export const MARKET_OPTIONS = ENABLED_MARKETS.map(m => ({
  value: m.code,
  label: m.name,
  flag: m.flag,
  shortLabel: m.code,
}));

/** Default market (first enabled market) */
export const DEFAULT_MARKET: Market = ENABLED_MARKETS[0]?.code || MarketCode.PL;

/** Language to market mapping */
export const LANGUAGE_TO_MARKET = ENABLED_MARKETS.reduce((acc, m) => {
  acc[m.language] = m.code;
  return acc;
}, {} as Record<string, Market>);

/** Timezone to market mapping */
export const TIMEZONE_TO_MARKET = ENABLED_MARKETS.reduce((acc, m) => {
  if (m.timezone) {
    acc[m.timezone] = m.code;
  }
  return acc;
}, {} as Record<string, Market>);
