import { ICar } from '@/types/car';
import { env } from 'process';
import { CarList } from '@/components/car/CarList';

const limit = 5;
const page = 1;

async function getCars(): Promise<ICar[]> {
  try {
    const url = `${env.API_URL}/cars`;
    const res = await fetch(url + `?page=${page}&limit=${limit}&isRentable=true`, { cache: 'no-store' });

    if (!res.ok) throw new Error('Failed to fetch cars');
    return res.json();
  } catch (error) {
    console.error('Error fetching cars:', error);
    return { data: [], pagination: { page: 1, limit: 5, total: 0, pages: 0 }};
  }
}

export default async function CarsRentPage() {
  const { data, pagination } = await getCars();

  return (
    <div>
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Find Your Next Car</h1>
        <p className="text-muted-foreground text-lg my-2">
          Do you want to rent a car?
        </p>
      </div>

      <CarList
        rent={true}
        cars={data}
        limit={limit}
        page={page}
        pages={pagination.pages}
 />
    </div>
  );
}
