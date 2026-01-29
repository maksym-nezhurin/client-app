'use client';

// import { Button } from '@/components/ui/Button';
// import { useTypedTranslation } from '@/lib/i18n';
import CarItem from '@/components/car/CarItem';
// import Link from 'next/link';
// import { ROUTES } from '@/lib/routes';
import type { ICar } from '@/types/car';

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
];

export function LatestAnnouncementsSection () {
//   const { t } = useTypedTranslation();

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_45px_rgba(15,23,42,0.6)] backdrop-blur md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* <div>
          <h2 className="text-2xl font-semibold">{t('client.home.latest_title')}</h2>
          <p className="text-sm text-slate-300">{t('client.home.latest_subtitle')}</p>
        </div> */}
        {/* <Button asChild variant="secondary">
          <Link href={ROUTES.BROWSE}>{t('client.home.latest_cta')}</Link>
        </Button> */}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestCars.map((car) => (
          <CarItem key={car.id} car={car} isLoading={false} />
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {/* <Button asChild>
          <Link href={ROUTES.AUTH.LOGIN}>{t('client.home.latest_create')}</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href={ROUTES.ACCOUNT_CARS_NEW}>{t('client.home.latest_add_car')}</Link>
        </Button> */}
      </div>
    </section>
  );
}