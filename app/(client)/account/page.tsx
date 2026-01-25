'use client';

import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthContext';
import { ROUTES } from '@/lib/routes';
import { Button } from '@/components/ui/Button';

const summaryCards = [
  { label: 'Active listings', value: '4' },
  { label: 'Cars for sale', value: '2' },
  { label: 'Total views', value: '1,284' },
  { label: 'New inquiries', value: '6' },
];

const recentActivity = [
  { title: 'BMW X5 listing updated', detail: '2 hours ago' },
  { title: 'New inquiry for Tesla Model 3', detail: 'Yesterday' },
  { title: 'Audi A4 moved to for sale', detail: '2 days ago' },
];

export default function AccountPage() {
  const { user, isLoading } = useAuth();
  const primaryCar = (user as { primaryCar?: { name?: string; year?: number; status?: string } })?.primaryCar;

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Loading dashboard...</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-lg border border-muted bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold">Account dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Please sign in to see your statistics and listings.
        </p>
        <Button asChild>
          <Link href={ROUTES.AUTH.LOGIN}>Go to login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-muted bg-white p-6 shadow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Overview of your listings and account activity.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href={ROUTES.ACCOUNT_CARS_NEW}>Add new car</Link>
            </Button>
            <Button asChild>
              <Link href={ROUTES.ACCOUNT_CARS}>Manage cars</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-lg border border-muted bg-white p-4 shadow">
            <p className="text-xs uppercase text-muted-foreground">{card.label}</p>
            <p className="text-2xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-muted bg-white p-6 shadow lg:col-span-2">
          <h2 className="text-lg font-semibold">Recent activity</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {recentActivity.map((item) => (
              <li key={item.title} className="flex items-center justify-between">
                <span className="text-text-primary">{item.title}</span>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-muted bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">Profile quick view</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-xs uppercase text-muted-foreground">Name</dt>
              <dd className="font-medium">{user.name ?? user.username ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted-foreground">Email</dt>
              <dd className="font-medium">{user.email ?? '—'}</dd>
            </div>
          </dl>
          <Button asChild variant="ghost" className="mt-4 w-full">
            <Link href={ROUTES.ACCOUNT_SETTINGS}>Edit settings</Link>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-muted bg-white p-6 shadow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Your primary car</h2>
            <p className="text-sm text-muted-foreground">
              Keep your main vehicle visible for faster searches and sharing.
            </p>
          </div>
          {primaryCar ? (
            <Button asChild variant="secondary">
              <Link href={ROUTES.ACCOUNT_CARS}>Manage cars</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={ROUTES.ACCOUNT_CARS_NEW}>Add your car</Link>
            </Button>
          )}
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5">
          {primaryCar ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Selected vehicle</p>
                <p className="text-xl font-semibold">
                  {primaryCar.name ?? 'Your car'}
                </p>
                {primaryCar.year && (
                  <p className="text-sm text-slate-500">{primaryCar.year}</p>
                )}
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                {primaryCar.status ?? 'Active'}
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  No primary car yet
                </p>
                <p className="text-sm text-muted-foreground">
                  Add your first vehicle to personalize your dashboard.
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link href={ROUTES.ACCOUNT_CARS_NEW}>Create listing</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
