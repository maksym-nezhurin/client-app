'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ActiveFiltersProps {
  filters: Record<string, any>;
  onRemoveFilter: (key: string, value?: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) {
  const filterBadges: { key: string; label: string; value: string }[] = [];

  // Process filters into displayable badges
  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;

    if (Array.isArray(value) && value.length > 0) {
      // Handle array filters (types, fuelTypes, transmissions)
      const labelPrefix = 
        key === 'types' ? '' :
        key === 'fuelTypes' ? '' :
        key === 'transmissions' ? '' : '';
      
      value.forEach(item => {
        filterBadges.push({
          key,
          label: `${labelPrefix}${item}`,
          value: item,
        });
      });
    } else if (typeof value === 'string' && value !== '') {
      // Handle single value filters
      const label = 
        key === 'brand' ? `Brand: ${value}` :
        key === 'model' ? `Model: ${value}` :
        key === 'minYear' ? `From ${value}` :
        key === 'maxYear' ? `To ${value}` :
        key === 'minPrice' ? `Min $${Number(value).toLocaleString()}` :
        key === 'maxPrice' ? `Max $${Number(value).toLocaleString()}` :
        value;
      
      filterBadges.push({
        key,
        label,
        value,
      });
    }
  });

  if (filterBadges.length === 0) return null;

  return (
    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex flex-wrap items-center gap-2">
        {/* Active filters label */}
        <span className="text-sm font-medium text-muted-foreground">
          Active filters:
        </span>

        {/* Filter badges */}
        <div className="flex flex-wrap gap-2">
          {filterBadges.map((badge, index) => (
            <div
              key={`${badge.key}-${badge.value}-${index}`}
              className={cn(
                'group inline-flex items-center gap-1.5 rounded-full',
                'border border-primary/20 bg-primary/10 px-3 py-1.5',
                'text-sm font-medium text-primary',
                'transition-all duration-200',
                'hover:border-primary/40 hover:bg-primary/20'
              )}
            >
              <span>{badge.label}</span>
              <button
                onClick={() => onRemoveFilter(badge.key, badge.value)}
                className={cn(
                  'flex h-4 w-4 items-center justify-center rounded-full',
                  'bg-primary/20 text-primary',
                  'transition-all duration-200',
                  'hover:bg-primary hover:text-primary-foreground',
                  'group-hover:scale-110'
                )}
                aria-label={`Remove ${badge.label}`}
              >
                <X size={12} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>

        {/* Clear all button */}
        {filterBadges.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-8 text-xs text-muted-foreground hover:text-destructive"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Results count */}
      <p className="mt-2 text-xs text-muted-foreground">
        Showing results for {filterBadges.length} filter{filterBadges.length > 1 ? 's' : ''}
      </p>
    </div>
  );
}
