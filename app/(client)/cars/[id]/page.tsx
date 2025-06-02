import Image from 'next/image';
import CarItem from '@/components/car/CarItem';
import { ICar } from '@/types/car';
import { notFound } from 'next/navigation';

interface CarPageProps {
  params: { id: string };
}

async function getCar(id: string): Promise<{ data: ICar } | null> {
  const res = await fetch(`${process.env.API_URL}/cars/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function CarPage({ params }: CarPageProps) {
  const carResponse = await getCar(params.id);
  if (!carResponse?.data) return notFound();

  const { data } = carResponse;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          {data.brand} {data.model} ({data.year})
        </h1>
        <p className="text-gray-600">{data.complectation} • {data.type} • {data.engine}L</p>
      </div>

      {data.images?.[0] && (
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-md">
          <Image
            src={data.images[0]}
            alt={`${data.brand} ${data.model}`}
            fill
            className="object-cover"
            priority={false}
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}

      <CarItem car={data} />
    </main>
  );
}
