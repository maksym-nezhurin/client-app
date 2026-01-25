'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';

const cars = [
  { id: '1', title: 'Tesla Model 3', status: 'Active', views: 412 },
  { id: '2', title: 'BMW X5', status: 'Draft', views: 91 },
  { id: '3', title: 'Audi A4', status: 'For sale', views: 240 },
];

export default function AccountCarsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-muted bg-white p-6 shadow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">My cars</h1>
            <p className="text-sm text-muted-foreground">Manage your car listings.</p>
          </div>
          <Button asChild>
            <Link href={ROUTES.ACCOUNT_CARS_NEW}>Add new car</Link>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-muted bg-white p-6 shadow">
        <div className="grid gap-4">
          {cars.map((car) => (
            <div key={car.id} className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-muted p-4">
              <div>
                <p className="text-sm font-semibold">{car.title}</p>
                <p className="text-xs text-muted-foreground">Status: {car.status}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{car.views} views</span>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
