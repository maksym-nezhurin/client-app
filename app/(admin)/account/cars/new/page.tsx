'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';
import { useFeature } from '@/hooks/useFeature';
import { FeatureKey } from '@/types/features';
import { useMarket } from '@/contexts/market/MarketContext';
import { CarFormWizard } from '@/components/sections/shared/forms/car';

export default function AddCarPage() {
  const router = useRouter();
  const { isEnabled, reason } = useFeature(FeatureKey.SELL_CARS);
  const { marketConfig } = useMarket();
  
  // Redirect if auth is required (must be in useEffect to avoid render-time navigation)
  useEffect(() => {
    if (!isEnabled && reason === 'auth_required') {
      router.push(`${ROUTES.AUTH.LOGIN}?returnTo=${ROUTES.ACCOUNT_CARS_NEW}`);
    }
  }, [isEnabled, reason, router]);
  
  // Show not available message if feature is disabled
  if (!isEnabled) {
    if (reason === 'auth_required') {
      // Render nothing while redirecting
      return null;
    }
    
    // Show not available message for other reasons
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-yellow-500/10 p-4">
            <AlertCircle className="h-12 w-12 text-yellow-600" />
          </div>
          <h1 className="mb-4 text-2xl font-bold">
            Feature Not Available
          </h1>
          <p className="mb-6 text-muted-foreground">
            {reason === 'market_not_supported' ? (
              <>
                Car selling is not yet available in{' '}
                <span className="font-semibold">{marketConfig.flag} {marketConfig.name}</span>.
                <br />
                We're working to bring this feature to your market soon!
              </>
            ) : (
              <>This feature is currently unavailable in your account.</>
            )}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href={ROUTES.BROWSE}>Browse Cars</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={ROUTES.ACCOUNT}>Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Use shared form wizard
  return (
    <CarFormWizard
      mode="listing"
      redirectTo={ROUTES.ACCOUNT_CARS}
      title="Add New Vehicle for Sale"
      subtitle="List your vehicle and reach thousands of potential buyers"
    />
  );
}
