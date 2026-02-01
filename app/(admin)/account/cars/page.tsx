'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useTypedTranslation } from '@/lib/i18n';
import { 
  Car, 
  Plus, 
  Tag, 
  Heart,
  Settings,
  Trash2,
  Edit,
  Eye,
  TrendingUp,
  Users,
  Bell,
  Sparkles,
  MessageCircle,
  Calendar,
  Gauge,
  DollarSign
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import Image from 'next/image';
import { CarEmblemMap } from '@/components/car/CarEmblemMap';

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  color: string;
  isForSale: boolean;
  price?: number;
  views?: number;
  savedBy?: number;
}

export default function MyCarsPage() {
  const { t } = useTypedTranslation('client');
  // Mock data - Replace with actual API call
  const [cars] = useState<Car[]>([
    {
      id: '1',
      brand: 'Tesla',
      model: 'Model 3',
      year: 2022,
      mileage: 12000,
      color: 'White',
      isForSale: true,
      price: 42000,
      views: 245,
      savedBy: 12,
    },
    {
      id: '2',
      brand: 'BMW',
      model: 'X5',
      year: 2020,
      mileage: 45000,
      color: 'Black',
      isForSale: false,
    },
  ]);

  const forSaleCars = cars.filter(car => car.isForSale);
  const garageCars = cars.filter(car => !car.isForSale);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {t('cars.title')}
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {t('cars.subtitle')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button asChild className="gap-2">
            <Link href={ROUTES.ACCOUNT_CARS_SALE}>
              <Tag className="h-4 w-4" />
              {t('cars.list_for_sale')}
            </Link>
          </Button>
          <Button asChild variant="secondary" className="gap-2">
            <Link href={ROUTES.ACCOUNT_CARS_NEW}>
              <Plus className="h-4 w-4" />
              {t('cars.add_to_garage')}
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 backdrop-blur-xl dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Vehicles</p>
              <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{cars.length}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
              <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 backdrop-blur-xl dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">For Sale</p>
              <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{forSaleCars.length}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
              <Tag className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 backdrop-blur-xl dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Views</p>
              <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                {forSaleCars.reduce((sum, car) => sum + (car.views || 0), 0)}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
              <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 backdrop-blur-xl dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Interested</p>
              <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                {forSaleCars.reduce((sum, car) => sum + (car.savedBy || 0), 0)}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10">
              <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles For Sale */}
      {forSaleCars.length > 0 && (
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 backdrop-blur-xl dark:bg-slate-900/80">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <Tag className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Listed for Sale
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {forSaleCars.length} active listing{forSaleCars.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href={ROUTES.ACCOUNT_CARS_SALE}>View All</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {forSaleCars.map((car) => {
              const emblem = CarEmblemMap[car.brand.toLowerCase()] || '/logos/default.svg';
              return (
                <div
                  key={car.id}
                  className="group flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50 md:flex-row md:items-center"
                >
                  {/* Car Image/Logo */}
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={emblem}
                      alt={car.brand}
                      width={60}
                      height={60}
                      className="h-16 w-16 object-contain opacity-80"
                    />
                  </div>

                  {/* Car Info */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {car.brand} {car.model}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {car.year} • {car.color} • {car.mileage.toLocaleString()} km
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          ${car.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <Eye className="h-4 w-4" />
                        {car.views} views
                      </div>
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <Heart className="h-4 w-4" />
                        {car.savedBy} interested
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 md:flex-col">
                    <Button size="sm" variant="outline" className="flex-1 gap-2 md:flex-none">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-2 md:flex-none">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Personal Garage */}
      {garageCars.length > 0 && (
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 backdrop-blur-xl dark:bg-slate-900/80">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Car className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  My Garage
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Personal vehicles with community & insights
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {garageCars.map((car) => {
              const emblem = CarEmblemMap[car.brand.toLowerCase()] || '/logos/default.svg';
              
              // Mock market prices - Replace with actual API data
              const marketPrices = {
                ukraine: Math.floor(Math.random() * 5000) + 35000,
                poland: Math.floor(Math.random() * 5000) + 38000,
                slovakia: Math.floor(Math.random() * 5000) + 37000,
              };
              const avgPrice = Math.floor((marketPrices.ukraine + marketPrices.poland + marketPrices.slovakia) / 3);
              
              return (
                <div
                  key={car.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50"
                >
                  {/* Main Car Info */}
                  <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
                    {/* Car Image/Logo */}
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={emblem}
                        alt={car.brand}
                        width={60}
                        height={60}
                        className="h-16 w-16 object-contain opacity-80"
                      />
                    </div>

                    {/* Car Info */}
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
                        {car.brand} {car.model}
                      </h3>
                      <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                        {car.year} • {car.color} • {car.mileage.toLocaleString()} km
                      </p>

                      {/* Benefits */}
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
                          <Users className="h-3 w-3" />
                          Community
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-950/30 dark:text-purple-400">
                          <TrendingUp className="h-3 w-3" />
                          Market Value
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-950/30 dark:text-green-400">
                          <Bell className="h-3 w-3" />
                          Maintenance Tips
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 md:flex-col">
                      <Button size="sm" variant="outline" className="flex-1 gap-2 md:flex-none">
                        <Settings className="h-4 w-4" />
                        Manage
                      </Button>
                      <Button size="sm" variant="secondary" className="flex-1 gap-2 md:flex-none">
                        <MessageCircle className="h-4 w-4" />
                        Community
                      </Button>
                    </div>
                  </div>

                  {/* Market Price Comparison */}
                  <div className="border-t border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
                    <div className="mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Market Price Analysis
                      </h4>
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                        Live Data
                      </span>
                    </div>

                    {/* Average Price */}
                    <div className="mb-3 rounded-lg bg-white p-3 dark:bg-slate-900/50">
                      <p className="mb-1 text-xs text-slate-600 dark:text-slate-400">
                        Average Market Price
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        ${avgPrice.toLocaleString()}
                      </p>
                    </div>

                    {/* Market Breakdown */}
                    <div className="grid gap-3 sm:grid-cols-3">
                      {/* Ukraine */}
                      <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900/50">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-xl">🇺🇦</span>
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                            Ukraine
                          </span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                          ${marketPrices.ukraine.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          {marketPrices.ukraine > avgPrice ? '+' : ''}
                          {(((marketPrices.ukraine - avgPrice) / avgPrice) * 100).toFixed(1)}%
                        </p>
                      </div>

                      {/* Poland */}
                      <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900/50">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-xl">🇵🇱</span>
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                            Poland
                          </span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                          ${marketPrices.poland.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          {marketPrices.poland > avgPrice ? '+' : ''}
                          {(((marketPrices.poland - avgPrice) / avgPrice) * 100).toFixed(1)}%
                        </p>
                      </div>

                      {/* Slovakia */}
                      <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900/50">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-xl">🇸🇰</span>
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                            Slovakia
                          </span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                          ${marketPrices.slovakia.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          {marketPrices.slovakia > avgPrice ? '+' : ''}
                          {(((marketPrices.slovakia - avgPrice) / avgPrice) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    {/* Data Source Info */}
                    <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
                      Based on {Math.floor(Math.random() * 50) + 20} similar listings • Updated 2 hours ago
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty States */}
      {cars.length === 0 && (
        <div className="rounded-2xl border border-white/20 bg-white/80 p-12 text-center backdrop-blur-xl dark:bg-slate-900/80">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <Car className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
            No vehicles yet
          </h3>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            Start by listing a vehicle for sale or adding one to your personal garage
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="gap-2">
              <Link href={ROUTES.ACCOUNT_CARS_NEW}>
                <Tag className="h-4 w-4" />
                List for Sale
              </Link>
            </Button>
            <Button asChild variant="secondary" className="gap-2">
              <Link href={ROUTES.ACCOUNT_CARS_NEW}>
                <Plus className="h-4 w-4" />
                Add to Garage
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Info Banner */}
      <div className="rounded-2xl border border-white/20 bg-linear-to-br from-blue-50 to-purple-50 p-6 dark:from-blue-950/30 dark:to-purple-950/30">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">
              Why Add Cars to Your Garage?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Get personalized market insights, connect with other owners, receive maintenance reminders, and access exclusive community features.
            </p>
          </div>
          <Button asChild variant="secondary" size="sm" className="gap-2 whitespace-nowrap">
            <Link href={ROUTES.ACCOUNT_CARS_NEW}>
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
