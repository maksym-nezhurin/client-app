import { ICar } from '@/types/car';
import { HomePageClient } from '@/app/(client)/home-page-client';

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
  return <HomePageClient latestCars={latestCars} />;
}
