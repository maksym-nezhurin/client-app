'use client';

import { motion } from 'framer-motion';
import { CarEmblemMap } from './CarEmblemMap';
import { ICar } from './types';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Gauge, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props {
  car?: ICar;
  isLoading?: boolean;
}

export default function CarItem({ car, isLoading = false }: Props) {
  if (isLoading || !car) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/60 p-6 backdrop-blur-xl dark:bg-slate-900/60">
        <div className="animate-pulse">
          {/* Image Skeleton */}
          <div className="mb-4 h-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
          
          {/* Content Skeleton */}
          <div className="mb-2 h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mb-4 h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
          
          {/* Stats Skeleton */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="h-16 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-16 rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>
          
          {/* Footer Skeleton */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
            <div className="h-8 w-24 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-10 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  const emblem = CarEmblemMap[car.brand.toLowerCase()] || '/logos/default.svg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link
        href={`/browse/${car.id}`}
        className="group relative block overflow-hidden rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl transition-all hover:scale-[1.02] hover:shadow-2xl dark:bg-slate-900/80"
      >
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
                <div className="text-xs text-slate-500">Year</div>
                <div className="font-semibold text-slate-900 dark:text-white">{car.year}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
                <Gauge className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Mileage</div>
                <div className="font-semibold text-slate-900 dark:text-white">
                  {car.mileage.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
            <div>
              <div className="text-xs text-slate-500">Price</div>
              <div className="text-2xl font-bold text-primary">
                ${car.price.toLocaleString()}
              </div>
            </div>
            <Button size="sm" className="gap-2">
              View
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-linear-to-br from-blue-500 to-purple-600 opacity-0 blur-2xl transition-opacity group-hover:opacity-20" />
      </Link>
    </motion.div>
  );
}
