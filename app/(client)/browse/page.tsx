'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CarList } from '@/components/car/CarList';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { SidebarFilters, type Filters } from '@/components/sidebar/SidebarFilters';
import { useTypedTranslation } from '@/lib/i18n';

const queryClient = new QueryClient();

export default function CarsPage() {
  const { t } = useTypedTranslation();
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
                placeholder={t('client.browse.search_placeholder')}
                aria-label={t('common.search')}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={sort}
                onChange={setSort}
                options={[
                  { value: 'newest', label: t('client.browse.filters.sort_newest') },
                  { value: 'price_low', label: t('client.browse.filters.sort_price_low') },
                  { value: 'price_high', label: t('client.browse.filters.sort_price_high') },
                ]}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={condition}
                onChange={setCondition}
                options={[
                  { value: 'all', label: t('client.browse.filters.condition_all') },
                  { value: 'used', label: t('client.browse.filters.condition_used') },
                  { value: 'new', label: t('client.browse.filters.condition_new') },
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
                <h1 className="text-2xl font-semibold">{t('client.browse.title')}</h1>
                <p className="text-sm text-slate-500">
                  {t('client.browse.subtitle')}
                </p>
              </div>
              <div className="text-sm text-slate-500">{t('client.browse.updated')}</div>
            </div>

            <CarList cars={[]} limit={12} page={1} pages={1} filters={filters} search={search} sort={sort} condition={condition} />
          </section>
        </div>
      </div>
    </QueryClientProvider>
  );
}
