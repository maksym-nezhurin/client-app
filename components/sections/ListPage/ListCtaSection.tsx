import { useAuth } from '@/contexts/auth/AuthContext';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { ROUTES } from '@/lib/routes';
import { Plus } from 'lucide-react';
import { CarFormWizard } from '@/components/sections/shared/forms/car';

export function ListCtaSection() {
  const { user } = useAuth();

  return user ? (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">List Your Car Now</h2>
          <p className="mt-3 text-muted-foreground">
            You're signed in! Fill out the form below to create your listing
          </p>
        </div>
        
        {/* Embedded Form for Logged-in Users */}
        <CarFormWizard
          mode="listing"
          redirectTo={ROUTES.ACCOUNT_CARS}
          embedded={true}
        />
      </div>
    </section>
  ) : (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-white/10 bg-linear-to-br from-primary/10 via-purple-500/5 to-transparent p-8 text-center shadow-2xl backdrop-blur-xl md:p-12">
                <h2 className="text-3xl font-bold">Ready to List Your Car?</h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Join our marketplace today and connect with thousands of potential buyers.
                No listing fees, no hidden charges.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                    <Link href={ROUTES.ACCOUNT_CARS_NEW} className="inline-flex items-center gap-2">
                    <Plus size={18} />
                    List Your Car Now
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href={ROUTES.BROWSE}>Browse Listings</Link>
                </Button>
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                The listing form will check authentication when you proceed.
                </p>
            </div>
        </div>
    </section>
  );
};

export default ListCtaSection;