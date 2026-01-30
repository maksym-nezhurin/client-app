'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Zap,
  Users,
  Globe,
  Star,
  ChevronRight,
  Filter,
  BarChart3,
  Heart,
  Shield,
  Fuel,
  Gauge,
  Calendar,
  DollarSign,
  ThumbsUp,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
  Target,
  TrendingDown,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/utils';

interface Brand {
  name: string;
  logo: string;
  country: string;
  founded: number;
  models: number;
  avgRating: number;
  description: string;
  popular: boolean;
}

interface MarketTrend {
  category: string;
  change: number;
  trend: 'up' | 'down';
  description: string;
}

interface Review {
  id: string;
  brand: string;
  model: string;
  rating: number;
  reviewer: string;
  reviewerRole: string;
  excerpt: string;
  date: string;
  likes: number;
}

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'luxury' | 'sport' | 'electric' | 'suv'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in production, this would come from your API
  const brands: Brand[] = [
    {
      name: 'Mercedes-Benz',
      logo: '/logos/mercedes.svg',
      country: 'Germany',
      founded: 1926,
      models: 45,
      avgRating: 4.8,
      description: 'Luxury, performance, and innovation combined',
      popular: true,
    },
    {
      name: 'BMW',
      logo: '/logos/bmw.svg',
      country: 'Germany',
      founded: 1916,
      models: 38,
      avgRating: 4.7,
      description: 'The ultimate driving machine',
      popular: true,
    },
    {
      name: 'Audi',
      logo: '/logos/audi.svg',
      country: 'Germany',
      founded: 1909,
      models: 42,
      avgRating: 4.6,
      description: 'Vorsprung durch Technik',
      popular: true,
    },
    {
      name: 'Tesla',
      logo: '/logos/tesla.svg',
      country: 'USA',
      founded: 2003,
      models: 5,
      avgRating: 4.9,
      description: 'Accelerating the world\'s transition to sustainable energy',
      popular: true,
    },
    {
      name: 'Toyota',
      logo: '/logos/toyota.svg',
      country: 'Japan',
      founded: 1937,
      models: 52,
      avgRating: 4.5,
      description: 'Quality, durability, and reliability',
      popular: true,
    },
    {
      name: 'Honda',
      logo: '/logos/honda.svg',
      country: 'Japan',
      founded: 1948,
      models: 35,
      avgRating: 4.4,
      description: 'The power of dreams',
      popular: false,
    },
  ];

  const marketTrends: MarketTrend[] = [
    {
      category: 'Electric Vehicles',
      change: 45.2,
      trend: 'up',
      description: 'EV sales continue to surge globally',
    },
    {
      category: 'SUVs',
      change: 18.5,
      trend: 'up',
      description: 'SUV demand remains strong across markets',
    },
    {
      category: 'Hybrid Models',
      change: 32.1,
      trend: 'up',
      description: 'Hybrid technology gaining traction',
    },
    {
      category: 'Sedans',
      change: -12.3,
      trend: 'down',
      description: 'Traditional sedan market declining',
    },
  ];

  const expertReviews: Review[] = [
    {
      id: '1',
      brand: 'Tesla',
      model: 'Model 3',
      rating: 4.8,
      reviewer: 'Alex Thompson',
      reviewerRole: 'Senior Auto Journalist',
      excerpt: 'The Model 3 continues to set the standard for electric vehicles with its impressive range, cutting-edge technology, and exhilarating performance. A game-changer in the automotive industry.',
      date: '2025-01-15',
      likes: 1243,
    },
    {
      id: '2',
      brand: 'Mercedes-Benz',
      model: 'S-Class',
      rating: 4.9,
      reviewer: 'Sarah Mitchell',
      reviewerRole: 'Luxury Car Expert',
      excerpt: 'The S-Class represents the pinnacle of automotive luxury. From its whisper-quiet cabin to its innovative technology, every detail screams excellence. A masterpiece on wheels.',
      date: '2025-01-20',
      likes: 987,
    },
    {
      id: '3',
      brand: 'BMW',
      model: 'M3',
      rating: 4.7,
      reviewer: 'Marcus Chen',
      reviewerRole: 'Performance Specialist',
      excerpt: 'The M3 delivers an intoxicating blend of raw power and precision handling. It\'s a driver\'s car through and through, offering an experience that few can match.',
      date: '2025-01-25',
      likes: 856,
    },
  ];

  const educationalTopics = [
    {
      icon: Shield,
      title: 'Buying Guide',
      description: 'Learn what to look for when purchasing your next vehicle',
      articles: 12,
    },
    {
      icon: Fuel,
      title: 'Fuel Types Explained',
      description: 'Understand the differences between gasoline, diesel, hybrid, and electric',
      articles: 8,
    },
    {
      icon: Gauge,
      title: 'Performance Metrics',
      description: 'Decode horsepower, torque, and other performance specifications',
      articles: 10,
    },
    {
      icon: DollarSign,
      title: 'Value & Depreciation',
      description: 'Make informed decisions about long-term vehicle value',
      articles: 15,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-24 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/20">
        {/* Animated Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-20 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -right-32 top-40 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 blur-3xl" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 animate-pulse rounded-full bg-pink-500/10 blur-3xl" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-2 text-sm font-medium text-blue-700 backdrop-blur-sm dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
              <Sparkles className="h-4 w-4" />
              Car Discovery & Market Intelligence
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl">
              Explore the World
              <br />
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                of Automotive Excellence
              </span>
            </h1>

            <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-600 dark:text-slate-300 md:text-xl">
              Dive deep into brands, discover models, analyze market trends, and learn from expert reviews. Your comprehensive guide to making informed automotive decisions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="gap-2 shadow-xl">
                <Search className="h-5 w-5" />
                Start Exploring
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="secondary" className="gap-2">
                <BookOpen className="h-5 w-5" />
                Learning Center
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Award, label: 'Brands', value: '50+', color: 'blue' },
              { icon: Target, label: 'Models', value: '500+', color: 'purple' },
              { icon: Users, label: 'Expert Reviews', value: '1,200+', color: 'pink' },
              { icon: Globe, label: 'Markets', value: '15+', color: 'indigo' },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/60 p-6 text-center backdrop-blur-xl transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-900/60"
              >
                <div className={cn(
                  "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl",
                  stat.color === 'blue' && "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                  stat.color === 'purple' && "bg-purple-500/10 text-purple-600 dark:text-purple-400",
                  stat.color === 'pink' && "bg-pink-500/10 text-pink-600 dark:text-pink-400",
                  stat.color === 'indigo' && "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                )}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Showcase Section */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {/* Section Header */}
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                Discover Brands
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Explore the world's leading automotive manufacturers
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Brands' },
                { id: 'luxury', label: 'Luxury' },
                { id: 'sport', label: 'Sport' },
                { id: 'electric', label: 'Electric' },
                { id: 'suv', label: 'SUV' },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as any)}
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white/60 text-slate-700 hover:bg-white dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brands Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 p-6 backdrop-blur-xl transition-all hover:scale-[1.02] hover:shadow-2xl dark:bg-slate-900/80"
              >
                {brand.popular && (
                  <div className="absolute right-4 top-4">
                    <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                      <Star className="h-3 w-3 fill-current" />
                      Popular
                    </div>
                  </div>
                )}

                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
                    <img src={brand.logo} alt={brand.name} className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-bold text-slate-900 dark:text-white">
                      {brand.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Globe className="h-4 w-4" />
                      {brand.country} • Est. {brand.founded}
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                  {brand.description}
                </p>

                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-semibold text-slate-900 dark:text-white">{brand.models}</span>
                    <span className="text-slate-600 dark:text-slate-400"> models</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-slate-900 dark:text-white">{brand.avgRating}</span>
                  </div>
                </div>

                <Button variant="secondary" className="w-full gap-2" size="sm">
                  View Models
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" className="gap-2">
              View All Brands
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Market Insights Section */}
      <section className="border-b border-white/10 bg-slate-50/50 py-20 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400">
              <TrendingUp className="h-4 w-4" />
              Real-Time Market Data
            </div>
            <h2 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
              Market Trends & Insights
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Stay informed with the latest automotive market trends and data-driven insights
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {marketTrends.map((trend, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 p-6 backdrop-blur-xl transition-all hover:shadow-2xl dark:bg-slate-900/80"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-xl font-bold text-slate-900 dark:text-white">
                      {trend.category}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {trend.description}
                    </p>
                  </div>
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    trend.trend === 'up' ? "bg-green-500/10" : "bg-red-500/10"
                  )}>
                    {trend.trend === 'up' ? (
                      <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className={cn(
                    "text-3xl font-bold",
                    trend.trend === 'up' ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {trend.trend === 'up' ? '+' : ''}{trend.change}%
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    vs last quarter
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      trend.trend === 'up' ? "bg-green-500" : "bg-red-500"
                    )}
                    style={{ width: `${Math.abs(trend.change)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-white/20 bg-linear-to-br from-blue-500 to-purple-600 p-8 text-white md:p-12">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h3 className="mb-2 text-2xl font-bold md:text-3xl">
                  Get Full Market Analysis
                </h3>
                <p className="text-blue-100">
                  Access detailed reports, price predictions, and exclusive insights
                </p>
              </div>
              <Button size="lg" variant="secondary" className="gap-2 whitespace-nowrap">
                <BarChart3 className="h-5 w-5" />
                View Full Report
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Reviews Section */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-400">
                <Award className="h-4 w-4" />
                Verified Experts
              </div>
              <h2 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                Expert Reviews & Ratings
              </h2>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                In-depth analysis from automotive journalists and industry experts
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              View All Reviews
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {expertReviews.map((review) => (
              <div
                key={review.id}
                className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 p-6 backdrop-blur-xl transition-all hover:scale-[1.02] hover:shadow-2xl dark:bg-slate-900/80"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 font-bold text-slate-900 dark:text-white">
                      {review.brand} {review.model}
                    </h3>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(review.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300 dark:text-slate-700"
                          )}
                        />
                      ))}
                      <span className="ml-1 text-sm font-semibold text-slate-900 dark:text-white">
                        {review.rating}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-500/10 p-2">
                    <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                {/* Excerpt */}
                <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  "{review.excerpt}"
                </p>

                {/* Reviewer */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                    {review.reviewer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {review.reviewer}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      {review.reviewerRole}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <ThumbsUp className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-400">{review.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Resources Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-400">
              <BookOpen className="h-4 w-4" />
              Knowledge Hub
            </div>
            <h2 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
              Learn About Cars
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Educational resources to help you make informed decisions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {educationalTopics.map((topic, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 p-6 backdrop-blur-xl transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-900/80"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-purple-600">
                  <topic.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  {topic.title}
                </h3>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                  {topic.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    {topic.articles} articles
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" className="gap-2">
              <BookOpen className="h-5 w-5" />
              Browse All Resources
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 bg-slate-50/50 py-20 dark:bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-2 text-sm font-medium text-blue-700 backdrop-blur-sm dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
            <Zap className="h-4 w-4" />
            Ready to find your perfect car?
          </div>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            Start Your Journey Today
          </h2>
          <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
            Browse thousands of vehicles, compare models, and connect with trusted sellers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href={ROUTES.BROWSE}>
                <Search className="h-5 w-5" />
                Browse Vehicles
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href={ROUTES.SELL}>
                List Your Car
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
