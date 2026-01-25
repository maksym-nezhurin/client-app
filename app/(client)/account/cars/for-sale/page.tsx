'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';

const forSaleCars = [
  { id: '1', title: 'Audi A4', price: '$18,900', views: 240 },
  { id: '2', title: 'Mazda CX-5', price: '$21,500', views: 198 },
];

export default function CarsForSalePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-muted bg-white p-6 shadow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Cars for sale</h1>
            <p className="text-sm text-muted-foreground">Listings currently available for sale.</p>
          </div>
          <Button asChild variant="secondary">
            <Link href={ROUTES.ACCOUNT_CARS_NEW}>Add new car</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {forSaleCars.map((car) => (
          <div key={car.id} className="rounded-lg border border-muted bg-white p-5 shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">{car.title}</h2>
              <span className="text-sm font-medium text-primary">{car.price}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{car.views} views</p>
            <Button variant="ghost" size="sm" className="mt-4">
              View details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
