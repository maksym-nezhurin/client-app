'use client';

import { ReactNode } from 'react';
import { Feature } from '@/types/features';
import { useFeature } from '@/hooks/useFeature';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

interface FeatureGateProps {
  feature: Feature;
  children: ReactNode;
  fallback?: ReactNode;
  showComingSoon?: boolean;
  showLoginPrompt?: boolean;
}

/**
 * Component to conditionally render content based on feature availability
 * 
 * @example
 * <FeatureGate feature="SELL_CARS">
 *   <SellButton />
 * </FeatureGate>
 * 
 * @example With custom fallback
 * <FeatureGate 
 *   feature="SELL_CARS" 
 *   fallback={<ComingSoonBadge />}
 * >
 *   <SellButton />
 * </FeatureGate>
 */
export function FeatureGate({
  feature,
  children,
  fallback,
  showComingSoon = false,
  showLoginPrompt = false,
}: FeatureGateProps) {
  const { isEnabled, config, reason } = useFeature(feature);
  
  // Feature is enabled - render children
  if (isEnabled) {
    return <>{children}</>;
  }
  
  // Custom fallback provided
  if (fallback) {
    return <>{fallback}</>;
  }
  
  // Show login prompt if auth required
  if (showLoginPrompt && reason === 'auth_required') {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground mb-2">
          {config?.name} requires authentication
        </p>
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="text-sm text-primary hover:underline"
        >
          Sign in to continue
        </Link>
      </div>
    );
  }
  
  // Show coming soon badge if requested
  if (showComingSoon && config?.comingSoon) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-xs font-medium">
        <span>🚧</span>
        <span>{config.name} - Coming Soon</span>
      </div>
    );
  }
  
  // Show beta badge if feature is in beta
  if (config?.beta && showComingSoon) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium">
        <span>🧪</span>
        <span>{config.name} - Beta</span>
      </div>
    );
  }
  
  // Don't render anything if feature is not available
  return null;
}

/**
 * Component to show content only when feature is NOT available
 * Useful for showing "coming soon" or upgrade prompts
 */
export function FeatureGateInverse({
  feature,
  children,
}: {
  feature: Feature;
  children: ReactNode;
}) {
  const { isEnabled } = useFeature(feature);
  
  return isEnabled ? null : <>{children}</>;
}
