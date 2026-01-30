'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Search, Sparkles, Shield, Bot, Database, UserRound } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export function HeroSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-sm font-medium text-blue-700 backdrop-blur-xl dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
              <Sparkles size={16} />
              <span>AI-Powered Car Search Assistant</span>
            </div>
            
            <h1 className="bg-linear-to-br from-slate-900 to-slate-700 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent dark:from-white dark:to-slate-300 md:text-6xl lg:text-7xl">
              Smart Car Search with AI Assistance
            </h1>
            
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 md:text-xl">
              Get personalized help finding your perfect car with our AI assistant. We gather comprehensive vehicle data from trusted sources like CarVertical, analyze market trends, and provide expert recommendations.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="gap-2 text-base">
                <Link href={ROUTES.BROWSE} className="inline-flex items-center gap-2">
                  <Bot size={18} />
                  Start AI Search
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="gap-2 text-base">
                <Link href={ROUTES.EXPLORE}>
                  <Database size={18} />
                  Explore Market Data
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Bot size={16} className="text-primary" />
                <span>AI Assistant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Database size={16} className="text-primary" />
                <span>CarVertical Data</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <UserRound size={16} className="text-primary" />
                <span>Personal Helper</span>
              </div>
            </div>
          </div>

          {/* Image - Enhanced with glassmorphic card */}
          <div className="relative hidden lg:block">
            <div className="rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/car-logo.png"
                  alt="Premium Car Marketplace"
                  width={600}
                  height={500}
                  className="w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Stats Overlay */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">AI</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Powered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50k+</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Verified Cars</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">AI Support</div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -left-4 top-20 h-24 w-24 animate-pulse rounded-full bg-primary/20 blur-2xl" />
            <div className="absolute -right-4 bottom-20 h-32 w-32 animate-pulse rounded-full bg-purple-500/20 blur-2xl [animation-delay:1s]" />
          </div>
        </div>
      </div>
    </section>
  );
}
