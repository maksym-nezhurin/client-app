'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { 
  X, 
  SlidersHorizontal, 
  Car, 
  Calendar, 
  DollarSign, 
  Fuel,
  Settings,
  RotateCcw,
  Check
} from 'lucide-react';

interface FilterState {
  brand: string;
  model: string;
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
  types: string[];
  fuelTypes: string[];
  transmissions: string[];
}

interface BrowseFiltersProps {
  onFilterChange: (filters: Partial<FilterState>) => void;
  isOpen: boolean;
  onClose: () => void;
  currentFilters?: Partial<FilterState>;
}

const carTypes = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Van', 'Wagon'];
const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid'];
const transmissions = ['Automatic', 'Manual', 'CVT'];

export function BrowseFilters({ onFilterChange, isOpen, onClose, currentFilters }: BrowseFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    brand: '',
    model: '',
    minYear: '',
    maxYear: '',
    minPrice: '',
    maxPrice: '',
    types: [],
    fuelTypes: [],
    transmissions: [],
  });

  // Sync internal state with external filters when they change
  useEffect(() => {
    if (currentFilters) {
      setFilters(prev => ({
        brand: currentFilters.brand ?? prev.brand,
        model: currentFilters.model ?? prev.model,
        minYear: currentFilters.minYear ?? prev.minYear,
        maxYear: currentFilters.maxYear ?? prev.maxYear,
        minPrice: currentFilters.minPrice ?? prev.minPrice,
        maxPrice: currentFilters.maxPrice ?? prev.maxPrice,
        types: currentFilters.types ?? prev.types,
        fuelTypes: currentFilters.fuelTypes ?? prev.fuelTypes,
        transmissions: currentFilters.transmissions ?? prev.transmissions,
      }));
    }
  }, [currentFilters]);

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const res = await fetch('/api/brands');
      if (!res.ok) throw new Error('Failed to fetch brands');
      return res.json();
    },
  });

  const { data: models = [] } = useQuery({
    queryKey: ['models', filters.brand],
    queryFn: async () => {
      if (!filters.brand) return [];
      const res = await fetch(`/api/models/${filters.brand}`);
      if (!res.ok) throw new Error('Failed to fetch models');
      return res.json();
    },
    enabled: !!filters.brand,
  });

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      // Reset model when brand changes
      if (key === 'brand') {
        newFilters.model = '';
      }
      return newFilters;
    });
  };

  const toggleArrayFilter = (key: 'types' | 'fuelTypes' | 'transmissions', value: string) => {
    setFilters(prev => {
      const currentArray = prev[key];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [key]: newArray };
    });
  };

  const applyFilters = () => {
    onFilterChange(filters);
    onClose();
  };

  const resetFilters = () => {
    const emptyFilters: FilterState = {
      brand: '',
      model: '',
      minYear: '',
      maxYear: '',
      minPrice: '',
      maxPrice: '',
      types: [],
      fuelTypes: [],
      transmissions: [],
    };
    setFilters(emptyFilters);
    onFilterChange({});
  };

  const activeFilterCount = 
    Object.entries(filters).filter(([key, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== '';
    }).length;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Filter Panel */}
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full overflow-y-auto bg-background transition-transform duration-300 sm:w-[480px]',
          'border-l border-white/10 shadow-2xl',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-full flex-col pt-16">
          {/* Header - Sticky */}
          <div className="sticky top-0 z-10 shrink-0 border-b border-white/10 bg-white/95 p-6 backdrop-blur-xl dark:bg-slate-900/95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <SlidersHorizontal className="text-primary" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Filters</h2>
                  {activeFilterCount > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {activeFilterCount} active filter{activeFilterCount > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-lg"
              >
                <X size={20} />
              </Button>
            </div>
          </div>

          {/* Filter Content - Scrollable */}
          <div className="flex-1 space-y-6 overflow-y-auto p-6">
            {/* Brand & Model */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Car className="text-primary" size={18} />
                <h3 className="font-semibold">Vehicle</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="mb-2 block text-sm font-medium">Brand</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => updateFilter('brand', e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand: string) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Model</label>
                  <select
                    value={filters.model}
                    onChange={(e) => updateFilter('model', e.target.value)}
                    disabled={!filters.brand}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">All Models</option>
                    {models.map((model: string) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Year Range */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary" size={18} />
                <h3 className="font-semibold">Year</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-medium">From</label>
                  <input
                    type="number"
                    placeholder="2010"
                    value={filters.minYear}
                    onChange={(e) => updateFilter('minYear', e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">To</label>
                  <input
                    type="number"
                    placeholder="2024"
                    value={filters.maxYear}
                    onChange={(e) => updateFilter('maxYear', e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Price Range */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="text-primary" size={18} />
                <h3 className="font-semibold">Price</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-medium">Min Price</label>
                  <input
                    type="number"
                    placeholder="10,000"
                    value={filters.minPrice}
                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Max Price</label>
                  <input
                    type="number"
                    placeholder="100,000"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Body Type */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="text-primary" size={18} />
                  <h3 className="font-semibold">Body Type</h3>
                </div>
                {filters.types.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {filters.types.length} selected
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {carTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleArrayFilter('types', type)}
                    className={cn(
                      'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
                      filters.types.includes(type)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-input bg-background hover:border-primary/50'
                    )}
                  >
                    {filters.types.includes(type) && <Check size={14} className="mr-1 inline" />}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Fuel Type */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Fuel className="text-primary" size={18} />
                  <h3 className="font-semibold">Fuel Type</h3>
                </div>
                {filters.fuelTypes.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {filters.fuelTypes.length} selected
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                {fuelTypes.map((fuel) => (
                  <button
                    key={fuel}
                    onClick={() => toggleArrayFilter('fuelTypes', fuel)}
                    className={cn(
                      'w-full rounded-lg border px-4 py-2 text-left text-sm font-medium transition-all',
                      filters.fuelTypes.includes(fuel)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-input bg-background hover:border-primary/50'
                    )}
                  >
                    {filters.fuelTypes.includes(fuel) && <Check size={14} className="mr-2 inline" />}
                    {fuel}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Transmission */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="text-primary" size={18} />
                  <h3 className="font-semibold">Transmission</h3>
                </div>
                {filters.transmissions.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {filters.transmissions.length} selected
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {transmissions.map((trans) => (
                  <button
                    key={trans}
                    onClick={() => toggleArrayFilter('transmissions', trans)}
                    className={cn(
                      'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
                      filters.transmissions.includes(trans)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-input bg-background hover:border-primary/50'
                    )}
                  >
                    {filters.transmissions.includes(trans) && <Check size={14} className="mr-1 inline" />}
                    {trans}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions - Sticky */}
          <div className="sticky bottom-0 z-10 shrink-0 border-t border-white/10 bg-white/95 p-6 backdrop-blur-xl dark:bg-slate-900/95">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={resetFilters}
                disabled={activeFilterCount === 0}
              >
                <RotateCcw size={16} className="mr-2" />
                Reset
              </Button>
              <Button
                className="flex-1"
                onClick={applyFilters}
              >
                <Check size={16} className="mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
