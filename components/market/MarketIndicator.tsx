'use client';

import { useMarket } from '@/contexts/market/MarketContext';
import { cn } from '@/lib/utils';

interface MarketIndicatorProps {
  className?: string;
  showCurrency?: boolean;
  showName?: boolean;
}

export function MarketIndicator({ 
  className, 
  showCurrency = false,
  showName = false 
}: MarketIndicatorProps) {
  const { marketConfig, isDetecting } = useMarket();

  if (isDetecting) {
    return (
      <div className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}>
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span>Detecting market...</span>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2 text-sm', className)}>
      <span className="text-lg">{marketConfig.flag}</span>
      <div className="flex flex-col">
        {showName && (
          <span className="font-semibold">{marketConfig.name}</span>
        )}
        {showCurrency && (
          <span className="text-xs text-muted-foreground">
            Currency: {marketConfig.currency}
          </span>
        )}
        {!showName && !showCurrency && (
          <span className="font-medium">{marketConfig.code}</span>
        )}
      </div>
    </div>
  );
}
