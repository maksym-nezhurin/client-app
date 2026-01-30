import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { UniqueServicesSection } from '@/components/sections/UniqueServicesSection';
import { PersonalAssistantSection } from '@/components/sections/PersonalAssistantSection';
import { PartnersSection } from '@/components/sections/PartnerSection';
import { LatestAnnouncementsSection } from '@/components/sections/LatestAnnouncementsSection';
import { ActionCardsSection } from '@/components/sections/ActionCardsSection';
import { AnimatedBackground } from '@/components/layouts/AnimatedBackground';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 space-y-20 py-12">
        <HeroSection />
        
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          <ActionCardsSection />
          
          <UniqueServicesSection />
          
          <PersonalAssistantSection />
          
          <LatestAnnouncementsSection />
          
          <FeaturesSection />
          
          <PartnersSection />
        
        </div>
      </div>
    </div>
  );
}
