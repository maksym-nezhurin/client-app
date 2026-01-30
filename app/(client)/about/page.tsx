'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Target, Users, Award, TrendingUp, Shield, Heart, Zap, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AnimatedBackground } from '@/components/layouts/AnimatedBackground';
import { ROUTES } from '@/lib/routes';

const stats = [
  { label: 'Cars Listed', value: '10,000+', icon: TrendingUp },
  { label: 'Happy Customers', value: '50,000+', icon: Users },
  { label: 'Years Experience', value: '15+', icon: Award },
  { label: 'Team Members', value: '100+', icon: Heart },
];

const values = [
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'Every transaction is protected with our comprehensive verification and secure payment system.',
  },
  {
    icon: Zap,
    title: 'Speed & Efficiency',
    description: 'List or find your perfect car in minutes with our streamlined platform.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We\'re here to help every step of the way.',
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'All listings are verified and we work with trusted dealers and sellers.',
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative">
        {/* Hero Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/80 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-xl dark:bg-slate-900/80">
                <Heart size={16} />
                <span>Our Story</span>
              </div>
              <h1 className="bg-linear-to-br from-slate-900 to-slate-700 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-white dark:to-slate-300 sm:text-5xl lg:text-6xl">
                Connecting People
                <br />
                with Their Perfect Ride
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                We're passionate about making car buying and renting simple, transparent, and enjoyable.
                Our mission is to revolutionize the automotive marketplace with modern technology and exceptional service.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/95 p-6 text-center shadow-2xl backdrop-blur-xl dark:bg-slate-900/95"
                >
                  <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3">
                    <stat.icon className="text-primary" size={28} />
                  </div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Image
                src="/about.png"
                alt="Our Team and Vision"
                width={1200}
                height={600}
                className="h-auto w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold">Building the Future of Auto Commerce</h3>
                <p className="mt-2 text-white/90">
                  Our team is dedicated to creating the best car marketplace experience
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Our Core Values</h2>
              <p className="mt-3 text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-white/10 bg-white/95 p-6 shadow-xl backdrop-blur-xl transition-all hover:shadow-2xl dark:bg-slate-900/95"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                    <value.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-white/10 bg-white/95 p-8 text-center shadow-2xl backdrop-blur-xl dark:bg-slate-900/95 md:p-12">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <Users className="text-primary" size={32} />
              </div>
              <h2 className="text-3xl font-bold">Meet Our Team</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Our diverse team combines decades of experience in automotive sales,
                technology innovation, and customer service to ensure you have the best
                experience possible. We're here to help you every step of the way.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href={ROUTES.BROWSE}>
                    Browse Cars
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/contact" className="inline-flex items-center gap-2">
                    <MessageCircle size={18} />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <Target className="text-primary" size={28} />
                </div>
                <h3 className="mb-4 text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground">
                  To revolutionize the automotive marketplace by creating a transparent,
                  efficient, and user-friendly platform that connects buyers and sellers
                  seamlessly. We believe everyone deserves access to their perfect vehicle
                  without the hassle of traditional car shopping.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <TrendingUp className="text-primary" size={28} />
                </div>
                <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become the world's most trusted automotive marketplace, where technology
                  and human expertise combine to create exceptional experiences. We envision
                  a future where buying, selling, or renting a car is as simple as a few clicks,
                  backed by unparalleled service and support.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
