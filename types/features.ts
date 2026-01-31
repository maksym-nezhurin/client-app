// ============================================================================
// FEATURE FLAGS SYSTEM - SINGLE SOURCE OF TRUTH
// ============================================================================
//
// HOW TO ADD A NEW FEATURE:
// 1. Add feature key to FeatureKey enum
// 2. Add feature config to FEATURE_REGISTRY
// 3. Done! Use useFeature() hook to check availability
//
// HOW TO ENABLE/DISABLE A FEATURE FOR A MARKET:
// Update the 'enabledMarkets' array in FEATURE_REGISTRY
//
// ============================================================================

import { Market, MarketCode } from './market';

/**
 * Feature Keys Enum
 * Add all application features here
 */
export const FeatureKey = {
  // Car listing features
  SELL_CARS: 'SELL_CARS',
  RENT_CARS: 'RENT_CARS',
  LEASE_CARS: 'LEASE_CARS',
  
  // Payment features
  ONLINE_PAYMENT: 'ONLINE_PAYMENT',
  INSTALLMENT_PLANS: 'INSTALLMENT_PLANS',
  CRYPTO_PAYMENT: 'CRYPTO_PAYMENT',
  
  // Advertising features
  PREMIUM_LISTINGS: 'PREMIUM_LISTINGS',
  FEATURED_ADS: 'FEATURED_ADS',
  HOMEPAGE_BANNER: 'HOMEPAGE_BANNER',
  
  // User features
  DEALER_ACCOUNTS: 'DEALER_ACCOUNTS',
  VERIFIED_SELLERS: 'VERIFIED_SELLERS',
  CAR_HISTORY_REPORTS: 'CAR_HISTORY_REPORTS',
  
  // Navigation/UI features
  EXPLORE_PAGE: 'EXPLORE_PAGE',
  COMPARISON_TOOL: 'COMPARISON_TOOL',
  PRICE_ALERTS: 'PRICE_ALERTS',
  
  // Social features
  REVIEWS: 'REVIEWS',
  FAVORITES: 'FAVORITES',
  SHARE_LISTINGS: 'SHARE_LISTINGS',
} as const;

export type Feature = typeof FeatureKey[keyof typeof FeatureKey];

/**
 * Feature Configuration
 */
export interface FeatureConfig {
  key: Feature;
  name: string;
  description: string;
  enabledMarkets: Market[];
  requiresAuth?: boolean;
  requiresVerification?: boolean;
  beta?: boolean;
  comingSoon?: boolean;
  enabledFrom?: Date; // Schedule feature launch
  enabledUntil?: Date; // Schedule feature sunset
}

/**
 * FEATURE REGISTRY
 * Configure all features and their market availability here
 */
export const FEATURE_REGISTRY: Record<Feature, FeatureConfig> = {
  // ========== CAR LISTING FEATURES ==========
  [FeatureKey.SELL_CARS]: {
    key: FeatureKey.SELL_CARS,
    name: 'Sell Cars',
    description: 'Ability to list cars for sale',
    enabledMarkets: [MarketCode.PL], // Only Poland for now
    requiresAuth: true,
    requiresVerification: false,
  },
  
  [FeatureKey.RENT_CARS]: {
    key: FeatureKey.RENT_CARS,
    name: 'Rent Cars',
    description: 'Ability to list and rent cars',
    enabledMarkets: [MarketCode.PL, MarketCode.SK, MarketCode.UA],
    requiresAuth: true,
  },
  
  [FeatureKey.LEASE_CARS]: {
    key: FeatureKey.LEASE_CARS,
    name: 'Lease Cars',
    description: 'Car leasing options',
    enabledMarkets: [MarketCode.PL, MarketCode.SK],
    requiresAuth: true,
    beta: true,
  },
  
  // ========== PAYMENT FEATURES ==========
  [FeatureKey.ONLINE_PAYMENT]: {
    key: FeatureKey.ONLINE_PAYMENT,
    name: 'Online Payment',
    description: 'Process payments online',
    enabledMarkets: [MarketCode.PL, MarketCode.SK],
    requiresAuth: true,
  },
  
  [FeatureKey.INSTALLMENT_PLANS]: {
    key: FeatureKey.INSTALLMENT_PLANS,
    name: 'Installment Plans',
    description: 'Pay in installments',
    enabledMarkets: [MarketCode.PL],
    requiresAuth: true,
    requiresVerification: true,
  },
  
  [FeatureKey.CRYPTO_PAYMENT]: {
    key: FeatureKey.CRYPTO_PAYMENT,
    name: 'Crypto Payment',
    description: 'Pay with cryptocurrency',
    enabledMarkets: [],
    beta: true,
    comingSoon: true,
  },
  
  // ========== ADVERTISING FEATURES ==========
  [FeatureKey.PREMIUM_LISTINGS]: {
    key: FeatureKey.PREMIUM_LISTINGS,
    name: 'Premium Listings',
    description: 'Featured placement for listings',
    enabledMarkets: [MarketCode.PL, MarketCode.SK],
    requiresAuth: true,
  },
  
  [FeatureKey.FEATURED_ADS]: {
    key: FeatureKey.FEATURED_ADS,
    name: 'Featured Ads',
    description: 'Promote listings to top of search',
    enabledMarkets: [MarketCode.PL],
    requiresAuth: true,
  },
  
  [FeatureKey.HOMEPAGE_BANNER]: {
    key: FeatureKey.HOMEPAGE_BANNER,
    name: 'Homepage Banner',
    description: 'Banner advertising on homepage',
    enabledMarkets: [MarketCode.PL],
    requiresAuth: true,
    requiresVerification: true,
  },
  
  // ========== USER FEATURES ==========
  [FeatureKey.DEALER_ACCOUNTS]: {
    key: FeatureKey.DEALER_ACCOUNTS,
    name: 'Dealer Accounts',
    description: 'Professional dealer accounts',
    enabledMarkets: [MarketCode.PL, MarketCode.SK],
    requiresAuth: true,
    requiresVerification: true,
  },
  
  [FeatureKey.VERIFIED_SELLERS]: {
    key: FeatureKey.VERIFIED_SELLERS,
    name: 'Verified Sellers',
    description: 'Verified seller badge',
    enabledMarkets: [MarketCode.PL, MarketCode.SK, MarketCode.UA],
    requiresAuth: true,
  },
  
  [FeatureKey.CAR_HISTORY_REPORTS]: {
    key: FeatureKey.CAR_HISTORY_REPORTS,
    name: 'Car History Reports',
    description: 'Detailed vehicle history',
    enabledMarkets: [MarketCode.PL],
    requiresAuth: false,
  },
  
  // ========== NAVIGATION/UI FEATURES ==========
  [FeatureKey.EXPLORE_PAGE]: {
    key: FeatureKey.EXPLORE_PAGE,
    name: 'Explore Page',
    description: 'Browse cars by category',
    enabledMarkets: [MarketCode.PL, MarketCode.SK, MarketCode.UA],
  },
  
  [FeatureKey.COMPARISON_TOOL]: {
    key: FeatureKey.COMPARISON_TOOL,
    name: 'Comparison Tool',
    description: 'Compare multiple cars',
    enabledMarkets: [MarketCode.PL, MarketCode.SK],
    beta: true,
  },
  
  [FeatureKey.PRICE_ALERTS]: {
    key: FeatureKey.PRICE_ALERTS,
    name: 'Price Alerts',
    description: 'Get notified of price drops',
    enabledMarkets: [MarketCode.PL],
    requiresAuth: true,
  },
  
  // ========== SOCIAL FEATURES ==========
  [FeatureKey.REVIEWS]: {
    key: FeatureKey.REVIEWS,
    name: 'Reviews',
    description: 'Leave and read reviews',
    enabledMarkets: [MarketCode.PL, MarketCode.SK, MarketCode.UA],
    requiresAuth: true,
  },
  
  [FeatureKey.FAVORITES]: {
    key: FeatureKey.FAVORITES,
    name: 'Favorites',
    description: 'Save favorite listings',
    enabledMarkets: [MarketCode.PL, MarketCode.SK, MarketCode.UA],
    requiresAuth: true,
  },
  
  [FeatureKey.SHARE_LISTINGS]: {
    key: FeatureKey.SHARE_LISTINGS,
    name: 'Share Listings',
    description: 'Share cars on social media',
    enabledMarkets: [MarketCode.PL, MarketCode.SK, MarketCode.UA],
  },
};

// ============================================================================
// DERIVED DATA - Auto-generated from registry
// ============================================================================

/**
 * Get features enabled for a specific market
 */
export function getMarketFeatures(market: Market): FeatureConfig[] {
  return Object.values(FEATURE_REGISTRY).filter(feature =>
    feature.enabledMarkets.includes(market)
  );
}

/**
 * Check if a feature is enabled for a market
 */
export function isFeatureEnabledForMarket(
  feature: Feature,
  market: Market
): boolean {
  const config = FEATURE_REGISTRY[feature];
  if (!config) return false;
  
  // Check if feature is enabled for this market
  if (!config.enabledMarkets.includes(market)) return false;
  
  // Check time-based availability
  const now = new Date();
  if (config.enabledFrom && now < config.enabledFrom) return false;
  if (config.enabledUntil && now > config.enabledUntil) return false;
  
  return true;
}

/**
 * Get all features that require authentication
 */
export const AUTH_REQUIRED_FEATURES = Object.values(FEATURE_REGISTRY)
  .filter(f => f.requiresAuth)
  .map(f => f.key);

/**
 * Get all beta features
 */
export const BETA_FEATURES = Object.values(FEATURE_REGISTRY)
  .filter(f => f.beta)
  .map(f => f.key);

/**
 * Get all coming soon features
 */
export const COMING_SOON_FEATURES = Object.values(FEATURE_REGISTRY)
  .filter(f => f.comingSoon)
  .map(f => f.key);
