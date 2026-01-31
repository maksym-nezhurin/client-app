import { 
  Market, 
  DEFAULT_MARKET, 
  ENABLED_MARKET_CODES,
  LANGUAGE_TO_MARKET,
  TIMEZONE_TO_MARKET,
  ENABLED_MARKETS
} from '@/types/market';

/**
 * Detects user's market based on their location
 * Uses multiple strategies in order of preference:
 * 1. Browser's navigator.language
 * 2. Timezone-based detection
 * 3. Default market
 */
export function detectMarket(): Market {
  if (typeof window === 'undefined') {
    return DEFAULT_MARKET;
  }

  // Strategy 1: Check browser language
  const browserLang = navigator.language.toLowerCase().split('-')[0];
  
  if (LANGUAGE_TO_MARKET[browserLang]) {
    return LANGUAGE_TO_MARKET[browserLang];
  }

  // Strategy 2: Timezone-based detection
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Exact match
    if (TIMEZONE_TO_MARKET[timezone]) {
      return TIMEZONE_TO_MARKET[timezone];
    }

    // Fuzzy match - check if timezone contains market timezone
    for (const market of ENABLED_MARKETS) {
      if (market.timezone && timezone.includes(market.timezone.split('/')[1])) {
        return market.code;
      }
    }
  } catch (error) {
    console.warn('Failed to detect timezone:', error);
  }

  // Strategy 3: Default market
  return DEFAULT_MARKET;
}

/**
 * Validates if a string is a valid enabled market code
 */
export function isValidMarket(value: string): value is Market {
  return ENABLED_MARKET_CODES.includes(value as Market);
}
