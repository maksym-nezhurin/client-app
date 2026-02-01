'use client';

import { Button } from '@/components/ui/Button';
import { UserRound, MessageCircle, Target, FileSearch, CheckCircle, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import Image from 'next/image';
import { useTypedTranslation } from '@/lib/i18n';

export function PersonalAssistantSection() {
  const { t } = useTypedTranslation('client');
  
  const steps = [
    {
      icon: MessageCircle,
      title: t('personal_assistant.steps.step_1_title'),
      description: t('personal_assistant.steps.step_1_desc'),
    },
    {
      icon: Target,
      title: t('personal_assistant.steps.step_2_title'),
      description: t('personal_assistant.steps.step_2_desc'),
    },
    {
      icon: FileSearch,
      title: t('personal_assistant.steps.step_3_title'),
      description: t('personal_assistant.steps.step_3_desc'),
    },
    {
      icon: CheckCircle,
      title: t('personal_assistant.steps.step_4_title'),
      description: t('personal_assistant.steps.step_4_desc'),
    },
  ];

  const benefits = [
    t('personal_assistant.benefits.benefit_1'),
    t('personal_assistant.benefits.benefit_2'),
    t('personal_assistant.benefits.benefit_3'),
    t('personal_assistant.benefits.benefit_4'),
    t('personal_assistant.benefits.benefit_5'),
    t('personal_assistant.benefits.benefit_6'),
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-400">
              <UserRound className="h-4 w-4" />
              {t('personal_assistant.badge')}
            </div>

            {/* Heading */}
            <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl lg:text-5xl">
              {t('personal_assistant.title')}
              <br />
              <span className="bg-linear-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                {t('personal_assistant.title_highlight')}
              </span>
            </h2>

            {/* Description */}
            <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
              {t('personal_assistant.subtitle')}
            </p>

            {/* Benefits List */}
            <div className="mb-8 space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2">
                <Calendar className="h-5 w-5" />
                {t('personal_assistant.cta_consultation')}
              </Button>
              <Button size="lg" variant="secondary" className="gap-2">
                <MessageCircle className="h-5 w-5" />
                {t('personal_assistant.cta_chat')}
              </Button>
            </div>

            {/* Trust Indicator */}
            <div className="mt-8 flex items-center gap-6 border-t border-slate-200 pt-6 dark:border-slate-800">
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{t('personal_assistant.stats.clients')}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{t('personal_assistant.stats.clients_label')}</div>
              </div>
              <div className="h-12 w-px bg-slate-200 dark:bg-slate-800" />
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{t('personal_assistant.stats.rating')}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{t('personal_assistant.stats.rating_label')}</div>
              </div>
              <div className="h-12 w-px bg-slate-200 dark:bg-slate-800" />
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{t('personal_assistant.stats.cost')}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{t('personal_assistant.stats.cost_label')}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual/Steps */}
          <div className="space-y-6">
            {/* Hero Card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-linear-to-br from-orange-50 via-pink-50 to-purple-50 p-8 dark:from-orange-950/30 dark:via-pink-950/30 dark:to-purple-950/30">
              {/* Decorative Elements */}
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl" />

              {/* Content */}
              <div className="relative">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-pink-600 shadow-xl">
                  <UserRound className="h-8 w-8 text-white" />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
                  {t('personal_assistant.expert_card.title')}
                </h3>
                <p className="mb-6 text-slate-600 dark:text-slate-400">
                  {t('personal_assistant.expert_card.quote')}
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-orange-500 to-pink-600 text-lg font-bold text-white">
                    CA
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">{t('personal_assistant.expert_card.name')}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{t('personal_assistant.expert_card.role')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t('personal_assistant.steps.title')}:</h3>
              
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 p-5 backdrop-blur-xl transition-all hover:scale-[1.02] hover:shadow-lg dark:bg-slate-900/80"
                >
                  <div className="flex gap-4">
                    {/* Step Number */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-pink-600 text-sm font-bold text-white">
                      {index + 1}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <step.icon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        <h4 className="font-semibold text-slate-900 dark:text-white">{step.title}</h4>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-linear-to-br from-orange-500 to-pink-600 opacity-0 blur-xl transition-opacity group-hover:opacity-20" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 rounded-3xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80 md:p-12">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-pink-600">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                {t('personal_assistant.banner.title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {t('personal_assistant.banner.subtitle')}
              </p>
            </div>
            <Button asChild size="lg" className="gap-2 whitespace-nowrap">
              <Link href={ROUTES.BROWSE}>
                {t('personal_assistant.banner.cta')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
