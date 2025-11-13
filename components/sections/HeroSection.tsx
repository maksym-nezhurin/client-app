import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@reelo/ui';

export function HeroSection() {
  return (
    <section className="bg-surface-base text-text-primary py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Find Your Perfect Ride Today
          </h1>
          <p className="mt-4 text-text-secondary text-lg">
            Browse a wide selection of quality vehicles available for purchase or rental. Start your journey now.
          </p>

         <div className="flex justify-center gap-4 p-6">
          <Link href="/cars">
            <Button size="lg" variant='primary'>Browse Cars</Button>
          </Link>
          <Link href="/cars?rent=true">
            <Button variant="outline" size="lg">Rent a Car</Button>
          </Link>
        </div>
        </div>

        {/* Optional Image */}
        <div className="hidden md:block">
          <Image
            src="/images/car-logo.png"
            alt="Car marketplace"
            width={500}
            height={400}
            className="w-full rounded-2xl shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}
