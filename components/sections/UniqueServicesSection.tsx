'use client';

import { Bot, Database, UserRound, Shield, FileCheck, Sparkles, TrendingUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { useTypedTranslation } from '@/lib/i18n';

export function UniqueServicesSection() {
  const { t } = useTypedTranslation('client');
  const services = [
    {
      icon: Bot,
      title: t('unique_services.ai_assistant.title'),
      description: t('unique_services.ai_assistant.description'),
      features: [
        t('unique_services.ai_assistant.feature_1'),
        t('unique_services.ai_assistant.feature_2'),
        t('unique_services.ai_assistant.feature_3'),
        t('unique_services.ai_assistant.feature_4')
      ],
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Database,
      title: t('unique_services.carvertical.title'),
      description: t('unique_services.carvertical.description'),
      features: [
        t('unique_services.carvertical.feature_1'),
        t('unique_services.carvertical.feature_2'),
        t('unique_services.carvertical.feature_3'),
        t('unique_services.carvertical.feature_4')
      ],
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: UserRound,
      title: t('unique_services.personal_helper.title'),
      description: t('unique_services.personal_helper.description'),
      features: [
        t('unique_services.personal_helper.feature_1'),
        t('unique_services.personal_helper.feature_2'),
        t('unique_services.personal_helper.feature_3'),
        t('unique_services.personal_helper.feature_4')
      ],
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: t('unique_services.additional.verified_data_title'),
      description: t('unique_services.additional.verified_data_desc')
    },
    {
      icon: TrendingUp,
      title: t('unique_services.additional.market_analytics_title'),
      description: t('unique_services.additional.market_analytics_desc')
    },
    {
      icon: FileCheck,
      title: t('unique_services.additional.smart_reports_title'),
      description: t('unique_services.additional.smart_reports_desc')
    },
    {
      icon: MessageSquare,
      title: t('unique_services.additional.chat_support_title'),
      description: t('unique_services.additional.chat_support_desc')
    }
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-400">
            <Sparkles className="h-4 w-4" />
            {t('unique_services.badge')}
          </div>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl lg:text-5xl">
            {t('unique_services.title')}
            <br />
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('unique_services.title_highlight')}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            {t('unique_services.subtitle')}
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="mb-16 grid gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl transition-all hover:scale-[1.02] hover:shadow-2xl dark:bg-slate-900/80"
            >
              {/* Icon with Gradient Background */}
              <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${service.gradient}`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>

              {/* Title & Description */}
              <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
                {service.title}
              </h3>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                {service.description}
              </p>

              {/* Feature List */}
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className={`h-1.5 w-1.5 rounded-full bg-linear-to-r ${service.gradient}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover Effect */}
              <div className={`absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-linear-to-br ${service.gradient} opacity-0 blur-2xl transition-opacity group-hover:opacity-20`} />
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {additionalFeatures.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/20 bg-white/60 p-6 backdrop-blur-xl transition-all hover:bg-white/80 hover:shadow-lg dark:bg-slate-900/60 dark:hover:bg-slate-900/80"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-purple-600">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-white/20 bg-white/80 p-12 text-center backdrop-blur-xl dark:bg-slate-900/80">
          <h3 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            {t('unique_services.cta_title')}
          </h3>
          <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
            {t('unique_services.cta_subtitle')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href={ROUTES.BROWSE}>
                <Bot className="h-5 w-5" />
                {t('unique_services.cta_primary')}
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href={ROUTES.EXPLORE}>
                {t('unique_services.cta_secondary')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
