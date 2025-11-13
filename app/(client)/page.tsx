import Link from 'next/link';
// import { Button } from '@/components/ui/Button';
import { Button } from '@reelo/ui';
import CarItem from '@/components/car/CarItem';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { PartnersSection } from '@/components/sections/PartnerSection';
import TrustBenefits from '@/components/sections/TrustBenefitsSection';
import { ICar } from '@/types/car';
import { ROUTES } from "@/lib/routes";

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
      <HeroSection />

      <FeaturesSection />

      {/* Latest Cars */}
      <section className="bg-surface-base py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Latest Listings</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestCars.map((car) => (
            <CarItem key={car.id} car={car} isLoading={false} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href={ROUTES.BROWSE}>
            <Button>View All Cars</Button>
          </Link>
        </div>
      </section>

      <PartnersSection />

      <TrustBenefits />
    </main>
  );
}
