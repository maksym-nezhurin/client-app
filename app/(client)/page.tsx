import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import CarItem from '@/components/car/CarItem';
import { ICar } from '@/types/car';

// Mock latest cars - Replace with real API later
const latestCars: ICar[] = [
  {
    id: '1',
    ownerId: 'owner1',
    brand: 'Tesla',
    model: 'Model 3',
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
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Find Your Next Car – Buy or Rent
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Browse a wide selection of quality vehicles available for purchase or rental. Start your journey now.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/cars">
            <Button size="lg">Browse Cars</Button>
          </Link>
          <Link href="/cars?rent=true">
            <Button variant="outline" size="lg">Rent a Car</Button>
          </Link>
        </div>
      </section>

      {/* Key Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
        <div className="p-6 border rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Sell Your Car</h3>
          <p className="text-gray-600">Easily list your vehicle and reach thousands of potential buyers.</p>
        </div>
        <div className="p-6 border rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Rent a Car</h3>
          <p className="text-gray-600">Flexible rental options for business or leisure trips.</p>
        </div>
        <div className="p-6 border rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Trusted by Users</h3>
          <p className="text-gray-600">Verified listings, secure payments, and customer-first support.</p>
        </div>
      </section>

      {/* Latest Cars */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Latest Listings</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestCars.map((car) => (
            <CarItem key={car.id} car={car} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/cars">
            <Button>View All Cars</Button>
          </Link>
        </div>
      </section>

    </main>
  );
}
