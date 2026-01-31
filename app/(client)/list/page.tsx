'use client';

import Link from 'next/link';
import { Plus, DollarSign, Clock, Shield, CheckCircle, TrendingUp, Camera, FileText, Zap, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AnimatedBackground } from '@/components/layouts/AnimatedBackground';
import { ROUTES } from '@/lib/routes';
import { FeatureKey, isFeatureEnabledForMarket } from '@/types/features';
import { useMarket } from '@/contexts/market/MarketContext';
import { useAuth } from '@/contexts/auth/AuthContext';
import { ListCtaSection } from '@/components/sections/ListPage/ListCtaSection';

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    description: 'Set your own price or let our AI suggest the optimal market value for your vehicle.',
  },
  {
    icon: TrendingUp,
    title: 'Wide Reach',
    description: 'Get exposure to thousands of potential buyers actively searching for cars.',
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Protected payments and verified buyers ensure safe and secure transactions.',
  },
  {
    icon: Clock,
    title: 'Quick Listing',
    description: 'List your car in under 5 minutes with our streamlined process.',
  },
];

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Create Account',
    description: 'Sign up for free and get access to our seller dashboard.',
  },
  {
    number: '02',
    icon: Camera,
    title: 'Add Details & Photos',
    description: 'Upload photos and provide details about your car.',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Review & Publish',
    description: 'Review your listing and publish it to reach buyers.',
  },
  {
    number: '04',
    icon: Zap,
    title: 'Get Offers',
    description: 'Receive inquiries and offers from interested buyers.',
  },
];

const stats = [
  { label: 'Avg. Time to Sell', value: '14 Days' },
  { label: 'Success Rate', value: '94%' },
  { label: 'Verified Buyers', value: '50,000+' },
];

export default function ListPage() {
  const { marketConfig, market } = useMarket();
  const { user } = useAuth();
  
  // Check if selling is available in current market (but page is still accessible to everyone)
  const canSellInMarket = isFeatureEnabledForMarket(FeatureKey.SELL_CARS, market);
  
  // Page is always accessible - content adapts based on market availability
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative">
        {/* Hero Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              {canSellInMarket ? (
                <>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/80 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-xl dark:bg-slate-900/80">
                    <Plus size={16} />
                    <span>Start Selling Today</span>
                  </div>
                  <h1 className="bg-linear-to-br from-slate-900 to-slate-700 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-white dark:to-slate-300 sm:text-5xl lg:text-6xl">
                    Sell Your Car
                    <br />
                    Fast & Easy
                  </h1>
                  <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                    Reach thousands of buyers, get competitive offers, and sell your car quickly
                    with our trusted marketplace. No hidden fees, no hassle.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    {user ? (
                      <Button asChild size="lg">
                        <Link href='#car-adding-form' className="inline-flex items-center gap-2">
                          <Plus size={18} />
                          List Your Car Now
                        </Link>
                      </Button>
                    ) : (
                      <Button asChild size="lg">
                        <Link href={ROUTES.AUTH.LOGIN} className="inline-flex items-center gap-2">
                            <LogIn size={18} />
                          Sign in to List
                        </Link>
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-8 inline-flex items-center justify-center rounded-full bg-yellow-500/10 p-4">
                    <span className="text-6xl">🚧</span>
                  </div>
                  <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                    Car Selling Coming Soon!
                  </h1>
                  <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                    We're working hard to bring car selling to{' '}
                    <span className="font-semibold">{marketConfig.flag} {marketConfig.name}</span>.
                    <br />
                    Stay tuned for updates!
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg">
                      <Link href={ROUTES.BROWSE}>Browse Cars</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href={ROUTES.HOME}>Return Home</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {canSellInMarket && (
          <>
            {/* Stats Section */}
            <section className="px-4 pb-16 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="grid gap-6 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-white/95 p-6 text-center shadow-xl backdrop-blur-xl dark:bg-slate-900/95"
                    >
                      <div className="text-3xl font-bold text-primary">{stat.value}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="px-4 pb-16 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl font-bold">Why List With Us?</h2>
                  <p className="mt-3 text-muted-foreground">
                    Join thousands of satisfied sellers
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {benefits.map((benefit) => (
                    <div
                      key={benefit.title}
                      className="rounded-2xl border border-white/10 bg-white/95 p-6 shadow-xl backdrop-blur-xl transition-all hover:shadow-2xl dark:bg-slate-900/95"
                    >
                      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                        <benefit.icon className="text-primary" size={24} />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="px-4 pb-16 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl font-bold">How It Works</h2>
                  <p className="mt-3 text-muted-foreground">
                    List your car in 4 simple steps
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {steps.map((step, index) => (
                    <div
                      key={step.title}
                      className="relative rounded-2xl border border-white/10 bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:bg-slate-900/95"
                    >
                      <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
                        {step.number}
                      </div>
                      <div className="mb-4 mt-2 inline-flex rounded-lg bg-primary/10 p-3">
                        <step.icon className="text-primary" size={24} />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <ListCtaSection />
          </>
        )}

        {!canSellInMarket && (
          <section className="px-4 pb-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border border-white/10 bg-white/95 p-6 backdrop-blur-xl dark:bg-slate-900/95">
                <h3 className="mb-4 text-lg font-semibold">
                  Meanwhile, you can:
                </h3>
                <ul className="space-y-3 text-left text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 shrink-0 text-primary" size={18} />
                    <span>Browse thousands of cars available in your market</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 shrink-0 text-primary" size={18} />
                    <span>Save your favorite listings for later</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 shrink-0 text-primary" size={18} />
                    <span>Get notified when selling launches in your area</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
