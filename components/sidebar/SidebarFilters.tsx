'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Select } from '@/components/ui/Select';
import { Menu, X } from 'lucide-react';

export function SidebarFilters({ onFilterChange }: { onFilterChange: (filters) => void }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [variant, setVariant] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const res = await fetch('/api/brands');
      if (!res.ok) throw new Error('Failed to fetch brands');
      return res.json();
    },
  });

  const { data: models = [] } = useQuery({
    queryKey: ['models', brand],
    queryFn: async () => {
      if (!brand) return {};
      const res = await fetch(`/api/models/${brand}`);
      if (!res.ok) throw new Error('Failed to fetch models');
      return res.json();
    },
    enabled: !!brand,
  });

  const applyFilters = () => {
    onFilterChange({ brand, model, variant, type, minYear, maxPrice });
  };

  const resetFilters = () => {
    setBrand('');
    setModel('');
    setVariant('');
    setType('');
    setMinYear('');
    setMaxPrice('');
    onFilterChange({});
  };

  return (
    <>
      {/* Toggle button (always visible) */}
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
          'fixed top-0 left-0 z-40 h-full w-64 bg-white p-4 shadow-md transition-transform transform',
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

          {/* Min Year */}
          <div>
            <label className="block text-sm font-medium mb-1">Min Year</label>
            <Input value={minYear} onChange={(e) => setMinYear(e.target.value)} type="number" />
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
