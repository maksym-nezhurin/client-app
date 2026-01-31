'use client';

import { useMarket } from '@/contexts/market/MarketContext';
import { useAuth } from '@/contexts/auth/AuthContext';
import {
  Feature,
  FEATURE_REGISTRY,
  isFeatureEnabledForMarket,
  FeatureConfig,
} from '@/types/features';

/**
 * Hook to check if a feature is available for current market and user
 * 
 * @example
 * const { isEnabled, config, reason } = useFeature('SELL_CARS');
 * 
 * if (isEnabled) {
 *   return <SellButton />;
 * }
 * 
 * if (reason === 'auth_required') {
 *   return <LoginPrompt />;
 * }
 */
export function useFeature(featureKey: Feature) {
  const { market } = useMarket();
  const { user } = useAuth();
  
  const config = FEATURE_REGISTRY[featureKey];
  
  if (!config) {
    return {
      isEnabled: false,
      config: null,
      reason: 'feature_not_found' as const,
    };
  }
  
  // Check market availability
  const enabledForMarket = isFeatureEnabledForMarket(featureKey, market);
  if (!enabledForMarket) {
    return {
      isEnabled: false,
      config,
      reason: 'market_not_supported' as const,
    };
  }
  
  // Check authentication requirement
  if (config.requiresAuth && !user) {
    return {
      isEnabled: false,
      config,
      reason: 'auth_required' as const,
    };
  }
  
  // Check verification requirement
  if (config.requiresVerification && !user?.verified) {
    return {
      isEnabled: false,
      config,
      reason: 'verification_required' as const,
    };
  }
  
  // Feature is available!
  return {
    isEnabled: true,
    config,
    reason: null,
  };
}

/**
 * Hook to check multiple features at once
 * 
 * @example
 * const { SELL_CARS, RENT_CARS } = useFeatures(['SELL_CARS', 'RENT_CARS']);
 */
export function useFeatures(featureKeys: Feature[]) {
  const results: Record<Feature, ReturnType<typeof useFeature>> = {} as any;
  
  featureKeys.forEach(key => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    results[key] = useFeature(key);
  });
  
  return results;
}

/**
 * Hook to get all features enabled for current market
 * 
 * @example
 * const enabledFeatures = useMarketFeatures();
 */
export function useMarketFeatures(): FeatureConfig[] {
  const { market } = useMarket();
  
  return Object.values(FEATURE_REGISTRY).filter(feature =>
    isFeatureEnabledForMarket(feature.key, market)
  );
}
