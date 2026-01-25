import Link from 'next/link';
import CarItem from '@/components/car/CarItem';
import { HeroSection } from '@/components/sections/HeroSection';
import { ActionCardsSection } from '@/components/sections/ActionCardsSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { PartnersSection } from '@/components/sections/PartnerSection';
import { Button } from '@/components/ui/Button';
import { ICar } from '@/types/car';
import { ROUTES } from '@/lib/routes';

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
    description: 'Fast, electric, and stylish.',
    complectation: 'Performance',
    engine: 0,
    type: 'Sedan',
    color: 'White',
    isRentable: true,
    rentPricePerDay: 150,
  },
  {
    id: '2',
    ownerId: 'owner2',
    brand: 'BMW',
    model: 'X5',
    vin: 'WBAKS4C54J0V00002',
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
];

export default function HomePage() {
  return (
    <main className="full-bleed relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="car-hero-bg fixed inset-0" />
        <div className="glass-grid absolute inset-0 opacity-40" />
        <div className="glass-noise absolute inset-0 opacity-40" />
        <div className="absolute -top-32 left-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute top-20 right-16 h-96 w-96 rounded-full bg-violet-500/20 blur-[140px]" />
        <div className="absolute bottom-24 left-1/3 h-80 w-80 rounded-full bg-blue-500/20 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        <HeroSection />

        <ActionCardsSection />

        {/* Latest Cars */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_45px_rgba(15,23,42,0.6)] backdrop-blur md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Latest Listings</h2>
              <p className="text-sm text-slate-300">
                Fresh offers curated for your next ride.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href={ROUTES.BROWSE}>Start searching</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestCars.map((car) => (
              <CarItem key={car.id} car={car} isLoading={false} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={ROUTES.AUTH.LOGIN}>Create account</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={ROUTES.ACCOUNT_CARS_NEW}>Add your car</Link>
            </Button>
          </div>
        </section>

        <FeaturesSection />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(15,23,42,0.5)] backdrop-blur">
            <h2 className="text-2xl font-semibold">Next steps made simple</h2>
            <p className="mt-2 text-sm text-slate-300">
              Keep moving forward with clear actions: search, connect, and share your car.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={ROUTES.BROWSE}>Find cars</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={ROUTES.ACCOUNT}>My dashboard</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href={ROUTES.ACCOUNT_CARS_NEW}>Post listing</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(15,23,42,0.5)] backdrop-blur">
            <h3 className="text-lg font-semibold">Trust signals</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Verified sellers & buyers</span>
                <span className="text-white">4k+</span>
              </li>
              <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Average response time</span>
                <span className="text-white">12 min</span>
              </li>
              <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Secure payments</span>
                <span className="text-white">99.9%</span>
              </li>
            </ul>
          </div>
        </section>

        <PartnersSection />
      </div>
    </main>
  );
}
