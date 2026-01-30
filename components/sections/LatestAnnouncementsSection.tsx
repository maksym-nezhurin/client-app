'use client';

import { Button } from '@/components/ui/Button';
import { useTypedTranslation } from '@/lib/i18n';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/routes';
import type { ICar } from '@/types/car';
import { Sparkles, MapPin, Gauge, Calendar, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import { CarEmblemMap } from '@/components/car/CarEmblemMap';

// Mock latest cars - Replace with real API later
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
];

export function LatestAnnouncementsSection() {
  const { t } = useTypedTranslation();

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400">
            <TrendingUp className="h-3 w-3" />
            Just Listed
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            {t('client.home.latest_title') || 'Latest Vehicles'}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {t('client.home.latest_subtitle') || 'Discover recently added vehicles with AI-verified data'}
          </p>
        </div>
        <Button asChild variant="outline" className="gap-2">
          <Link href={ROUTES.BROWSE}>
            {t('client.home.latest_cta') || 'View All'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Cars Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestCars.map((car, index) => {
          const emblem = CarEmblemMap[car.brand.toLowerCase()] || '/logos/default.svg';
          
          return (
            <Link
              key={car.id}
              href={`/browse/${car.id}`}
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl transition-all hover:scale-[1.02] hover:shadow-2xl dark:bg-slate-900/80"
            >
              {/* AI Badge */}
              {index === 0 && (
                <div className="absolute left-4 top-4 z-10 flex items-center gap-1 rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white shadow-lg">
                  <Zap className="h-3 w-3" />
                  AI Verified
                </div>
              )}

              {/* Car Image/Logo Section */}
              <div className="relative h-48 overflow-hidden bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                {/* Brand Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-2xl bg-white/90 p-8 shadow-xl backdrop-blur dark:bg-slate-900/90">
                    <Image 
                      src={emblem} 
                      alt={car.brand} 
                      width={80} 
                      height={80}
                      className="h-20 w-20 object-contain opacity-80 transition-all group-hover:scale-110 group-hover:opacity-100"
                    />
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  {car.brand} {car.model}
                </h3>

                {/* Description */}
                <p className="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                  {car.description}
                </p>

                {/* Stats Grid */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                      <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-500">Year</div>
                      <div className="font-semibold text-slate-900 dark:text-white">{car.year}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
                      <Gauge className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-500">Mileage</div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {car.mileage.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-500">Price</div>
                    <div className="text-2xl font-bold text-primary">
                      ${car.price.toLocaleString()}
                    </div>
                  </div>
                  <Button size="sm" className="gap-2">
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-linear-to-br from-blue-500 to-purple-600 opacity-0 blur-2xl transition-opacity group-hover:opacity-20" />
            </Link>
          );
        })}
      </div>

      {/* Bottom CTAs */}
      <div className="mt-12 rounded-2xl border border-white/20 bg-linear-to-br from-slate-50 to-blue-50/30 p-8 backdrop-blur dark:from-slate-900 dark:to-blue-950/30">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
              Ready to List Your Vehicle?
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Join thousands of sellers and reach millions of buyers with AI-powered listings
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href={ROUTES.ACCOUNT_CARS_NEW}>
                <Sparkles className="h-5 w-5" />
                {t('client.home.latest_add_car') || 'List Your Car'}
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={ROUTES.BROWSE}>
                {t('client.home.latest_cta') || 'Browse All Cars'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}