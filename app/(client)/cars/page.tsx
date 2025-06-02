import { ICar } from '@/types/car';
import { env } from 'process';
import { CarList } from '@/components/car/CarList';

async function getCars(): Promise<ICar[]> {
  const url = `${env.API_URL}/cars` || 'http://gateway:3000/cars';
  const res = await fetch(url, { cache: 'no-store' });
  console.log('env.NEXT_PUBLIC_API_URL', env.NEXT_PUBLIC_API_URL);
  if (!res.ok) throw new Error('Failed to fetch cars');
  return res.json();
}

export default async function CarsPage() {
  const { data } = await getCars();

  return (
    <div>
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Find Your Next Car</h1>
        <p className="text-muted-foreground text-lg my-2">
          Browse our collection of cars available for sale or rent.
        </p>
      </div>

      <CarList cars={data} />
    </div>
  );
}
