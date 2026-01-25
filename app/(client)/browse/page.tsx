'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CarList } from '@/components/car/CarList';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { SidebarFilters, type Filters } from '@/components/sidebar/SidebarFilters';

const queryClient = new QueryClient();

export default function CarsPage() {
  const [filters, setFilters] = useState<Filters>({});
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [condition, setCondition] = useState('all');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-6">
        <div className="sticky top-20 z-20 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[220px]">
              <Input
                id="search"
                placeholder="Search by brand, model, or keyword"
                aria-label="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={sort}
                onChange={setSort}
                options={[
                  { value: 'newest', label: 'Newest first' },
                  { value: 'price_low', label: 'Price: low to high' },
                  { value: 'price_high', label: 'Price: high to low' },
                ]}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={condition}
                onChange={setCondition}
                options={[
                  { value: 'all', label: 'All types' },
                  { value: 'used', label: 'Used' },
                  { value: 'new', label: 'New' },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <SidebarFilters
            variant="inline"
            className="sticky top-32 h-fit"
            onFilterChange={setFilters}
          />

          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold">Browse cars</h1>
                <p className="text-sm text-slate-500">
                  Browse our collection of cars available for sale.
                </p>
              </div>
              <div className="text-sm text-slate-500">Updated listings</div>
            </div>

            <CarList cars={[]} limit={12} page={1} pages={1} filters={filters} search={search} sort={sort} condition={condition} />
          </section>
        </div>
      </div>
    </QueryClientProvider>
  );
}
