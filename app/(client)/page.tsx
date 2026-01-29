// import Link from 'next/link';
// import { Button } from '@/components/ui/Button';
// import CarItem from '@/components/car/CarItem';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { PartnersSection } from '@/components/sections/PartnerSection';
import { LatestAnnouncementsSection } from '@/components/sections/LatestAnnouncementsSection';
import TrustBenefits from '@/components/sections/TrustBenefitsSection';

export default function HomePage() {
  return (
    <div className="full-bleed relative overflow-hidden bg-slate-950 text-white">
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

        <LatestAnnouncementsSection />

        <FeaturesSection />

        <PartnersSection />

        <TrustBenefits />

      </div>
    </div>
  );
}
