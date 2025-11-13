'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Select } from '@/components/ui/Select';
import { Menu, X } from 'lucide-react';
import { YearRangePicker } from '@/components/ui/YearRangePicker';
import { ROUTES } from "@/lib/routes";
import type { ICarModel } from '@/types/car';

export type Filters = Record<string, string | number | string[] | number[]>;

// simple generic debounce hook
function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export function SidebarFilters({ onFilterChange }: { onFilterChange: (filters: Filters) => void }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [variant, setVariant] = useState<string[]>([]);
  const [years, setYears] = useState<[number, number]>([1990, 2022]);
  const [fromYear, setFromYear] = useState(2008);
  const [toYear, setToYear] = useState(2022);
  const [maxPrice, setMaxPrice] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  console.log('variant', variant);
  const debouncedFromYear = useDebounce<number>(fromYear, 400);
  const debouncedToYear = useDebounce<number>(toYear, 400);

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const res = await fetch(ROUTES.API.CHARACTERISTICS.BRANDS);
      if (!res.ok) throw new Error('Failed to fetch brands');
      return res.json();
    },
  });

  const { data: models = [] } = useQuery({
    queryKey: ['models', brand],
    queryFn: async () => {
      if (!brand) return {};
      const res = await fetch(ROUTES.API.CHARACTERISTICS.MODELS(brand));
      if (!res.ok) throw new Error('Failed to fetch models');
      return res.json();
    },
    enabled: !!brand,
  });

  const { data: variants = [] } = useQuery({
    queryKey: ['variants', brand, model, debouncedFromYear, debouncedToYear],
    queryFn: async () => {
      if (!brand || !model) return [];
      // append year range as query params (your backend can read them)
      const url = `${ROUTES.API.CHARACTERISTICS.VARIANTS(model)}?from=${encodeURIComponent(
          String(debouncedFromYear)
      )}&to=${encodeURIComponent(String(debouncedToYear))}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch models');
      return res.json();
    },
    enabled: !!brand && debouncedFromYear <= debouncedToYear,
  });

  const applyFilters = () => {
    onFilterChange({ brand, model, variants: variant, type, fromYear, toYear, maxPrice });
  };

  const resetFilters = () => {
    setBrand('');
    setModel('');
    setVariant([]);
    setType('');
    setFromYear(1980);
    setToYear(2022);
    setYears([1980, 2022]);
    setMaxPrice('');
    onFilterChange({});
  };

  return (
    <>
      <Button
        onClick={() => setSidebarOpen(true)}
        className="-top-15 left-0 z-2 absolute"
        variant="secondary"
      >
        <Menu className="w-5 h-5 mr-2" />
        Filters
      </Button>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed p-4 pt-20 top-0 left-0 z-40 h-full w-64 bg-white shadow-md transition-transform transform',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Close button */}
        <div className="absolute top-4 right-4">
          <Button size="icon" variant="ghost" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        <div className="space-y-4">
          {/* Brand Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <Select
              label="Brand"
              value={brand}
              onChange={(val) => {
                setBrand(val);
                setModel('');
              }}
              options={brands}
              placeholder="Select brand"
            />
          </div>

          {/* Model Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <Select
              label="Model"
              value={model}
              onChange={(val) => setModel(val)}
              options={models}
              placeholder="Select model"
            />
          </div>

          <YearRangePicker
              value={years}
              onChange={(v) => {
                setYears(v);
                setFromYear(v[0]);
                setToYear(v[1]);
              }}
              min={1980}
              max={new Date().getFullYear()}
          />

          <div>
            <label className="block text-sm font-medium mb-1">Variants</label>
            <div className="flex gap-2 items-center mb-2">
              <button
                  type="button"
                  onClick={() => setVariant([])}
                  className="text-sm text-slate-600 hover:underline"
              >
                Clear
              </button>
              <span className="text-xs text-slate-400">(hold Cmd/Ctrl to multi-select)</span>
            </div>
            <select
                multiple
                value={variant}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setVariant(Array.from(e.target.selectedOptions, (o) => o.value))
                }
                className="w-full border rounded p-2 h-28"
            >
              {variants.map((opt: ICarModel) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name} {opt.trim && `- ${opt.trim}`}
                  </option>
              ))}
            </select>
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Max Price</label>
            <Input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} type="number" />
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-2 pt-4">
            <Button variant="outline" className="w-full" onClick={resetFilters}>
              Reset
            </Button>
            <Button className="w-full" onClick={applyFilters}>
              Apply
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
