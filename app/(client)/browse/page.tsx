'use client';

import { Suspense, useState } from 'react';
import { Search, Filter, TrendingUp, Loader2, Sparkles } from 'lucide-react';
import { ICar } from '@/types/car';
import { CarList } from '@/components/car/CarList';
import { AnimatedBackground } from '@/components/layouts/AnimatedBackground';
import { BrowseFilters } from '@/components/filters/BrowseFilters';
import { ActiveFilters } from '@/components/filters/ActiveFilters';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Latest cars data - same as home page (Replace with real API later)
const latestCars: ICar[] = [
  {
    id: '1',
    ownerId: 'owner1',
    brand: 'Tesla',
    model: 'Model 3',
    vin: '5YJ3E1EA7JF000001',
    year: 2022,
    price: 42000,
    mileage: 12000,
    description: 'Fast, electric, and stylish sedan with autopilot.',
    complectation: 'Performance',
    engine: 0,
    type: 'Sedan',
    color: 'White',
    isRentable: false,
  },
  {
    id: '2',
    ownerId: 'owner2',
    brand: 'BMW',
    model: 'X5',
    vin: 'WBAVA33597N123456',
    year: 2020,
    price: 37000,
    mileage: 30000,
    description: 'Spacious SUV with luxury interior.',
    complectation: 'Luxury Line',
    engine: 3,
    type: 'SUV',
    color: 'Black',
    isRentable: false,
  },
  {
    id: '3',
    ownerId: 'owner3',
    brand: 'Mercedes',
    model: 'C-Class',
    vin: 'WDDGF8AB5CA123456',
    year: 2021,
    price: 38500,
    mileage: 18000,
    description: 'Elegant sedan with premium features.',
    complectation: 'AMG Line',
    engine: 2,
    type: 'Sedan',
    color: 'Silver',
    isRentable: false,
  },
  {
    id: '4',
    ownerId: 'owner4',
    brand: 'Audi',
    model: 'A4',
    vin: 'WAUENAF41JN123456',
    year: 2021,
    price: 35000,
    mileage: 22000,
    description: 'Sporty sedan with advanced technology.',
    complectation: 'S-Line',
    engine: 2,
    type: 'Sedan',
    color: 'Blue',
    isRentable: false,
  },
  {
    id: '5',
    ownerId: 'owner5',
    brand: 'Toyota',
    model: 'RAV4',
    vin: '2T3F1RFV8LW123456',
    year: 2023,
    price: 32000,
    mileage: 5000,
    description: 'Reliable SUV with hybrid technology.',
    complectation: 'Hybrid XLE',
    engine: 2.5,
    type: 'SUV',
    color: 'Red',
    isRentable: false,
  },
  {
    id: '6',
    ownerId: 'owner6',
    brand: 'Honda',
    model: 'Civic',
    vin: '2HGFC2F59MH123456',
    year: 2022,
    price: 24500,
    mileage: 15000,
    description: 'Efficient and stylish compact sedan.',
    complectation: 'Sport',
    engine: 1.5,
    type: 'Sedan',
    color: 'White',
    isRentable: false,
  },
];

const queryClient = new QueryClient();

export default function BrowsePage() {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<any>({});
  
  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
    console.log('Filters applied:', filters);
    // Here you would fetch cars with these filters
  };

  const handleRemoveFilter = (key: string, value?: string) => {
    setActiveFilters((prev: any) => {
      const newFilters = { ...prev };
      
      if (Array.isArray(newFilters[key]) && value) {
        // Remove specific value from array
        newFilters[key] = newFilters[key].filter((item: string) => item !== value);
      } else {
        // Remove entire filter
        if (Array.isArray(newFilters[key])) {
          newFilters[key] = [];
        } else {
          newFilters[key] = '';
        }
      }
      
      return newFilters;
    });
  };

  const handleClearAll = () => {
    setActiveFilters({});
  };
  
  const activeFilterCount = Object.entries(activeFilters).filter(([key, value]) => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== '';
  }).length;

  // Show latest cars when no filters are selected
  const hasActiveFilters = activeFilterCount > 0;
  const carsToDisplay = hasActiveFilters ? [] : latestCars; // In production, filtered results would be fetched from API

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen">
        <AnimatedBackground />
        
        <BrowseFilters 
          isOpen={isFilterOpen} 
          onClose={() => setFilterOpen(false)}
          onFilterChange={handleFilterChange}
          currentFilters={activeFilters}
        />
        
        <div className="relative">
        {/* Hero Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Main Header */}
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/80 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-xl dark:bg-slate-900/80">
                <TrendingUp size={16} />
                <span>Browse Premium Vehicles</span>
              </div>
              <h1 className="bg-linear-to-br from-slate-900 to-slate-700 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-white dark:to-slate-300 sm:text-5xl lg:text-6xl">
                Find Your Perfect Car
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Browse our curated collection of premium vehicles. 
                Filter by brand, model, year, and price to find exactly what you're looking for.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/95 p-6 text-center shadow-xl backdrop-blur-xl dark:bg-slate-900/95">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="mt-1 text-sm text-muted-foreground">Cars Available</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/95 p-6 text-center shadow-xl backdrop-blur-xl dark:bg-slate-900/95">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="mt-1 text-sm text-muted-foreground">Brands</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/95 p-6 text-center shadow-xl backdrop-blur-xl dark:bg-slate-900/95">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="mt-1 text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>

            {/* Search Section */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95">
                <div className="flex items-center gap-3 mb-6">
                  <Search className="text-primary" size={24} />
                  <h2 className="text-xl font-semibold">Search & Filter</h2>
                </div>
                
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="text"
                      placeholder="Search by make, model, or keyword..."
                      className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <button 
                    onClick={() => setFilterOpen(true)}
                    className="relative flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Filter size={18} />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-bold text-white">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Active Filters Display */}
              {activeFilterCount > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:bg-slate-900/95">
                  <ActiveFilters
                    filters={activeFilters}
                    onRemoveFilter={handleRemoveFilter}
                    onClearAll={handleClearAll}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Cars List Section */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Section Header */}
            {!hasActiveFilters && (
              <div className="mb-8">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400">
                  <Sparkles className="h-3 w-3" />
                  Latest Listed
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Recently Added Vehicles
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Browse our newest listings or use filters above to refine your search
                </p>
              </div>
            )}

            {hasActiveFilters && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Filtered Results
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} applied
                </p>
              </div>
            )}

            {/* Content */}
            {carsToDisplay.length > 0 ? (
              <Suspense
                fallback={
                  <div className="flex min-h-[400px] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                }
              >
                <CarList
                  cars={carsToDisplay}
                  limit={12}
                  page={1}
                  pages={1}
                  rent={false}
                />
              </Suspense>
            ) : hasActiveFilters ? (
              /* Empty state for filtered results */
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/80 p-12 text-center backdrop-blur-xl dark:bg-slate-900/80">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                  <Search className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                  No vehicles found
                </h3>
                <p className="mb-6 max-w-md text-slate-600 dark:text-slate-400">
                  We couldn't find any vehicles matching your filters. Try adjusting your search criteria or clearing some filters.
                </p>
                <button
                  onClick={handleClearAll}
                  className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Clear All Filters
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
    </QueryClientProvider>
  );
}
