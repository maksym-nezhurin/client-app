'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { motion } from 'framer-motion';
import { useTypedTranslation } from '@/lib/i18n';
import { Brain, Shield, Globe } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
};

export const FeaturesSection = (props) => {
  const { title } = props;
  const { t } = useTypedTranslation('client');
  
  const features = [
    {
      icon: Brain,
      title: t('features_new.ai_search_title'),
      description: t('features_new.ai_search_desc'),
      color: 'text-blue-600 dark:text-blue-400',
      bgIcon: 'bg-blue-50 dark:bg-blue-950/30',
      borderIcon: 'border-blue-200 dark:border-blue-800'
    },
    {
      icon: Shield,
      title: t('features_new.vehicle_history_title'),
      description: t('features_new.vehicle_history_desc'),
      color: 'text-emerald-600 dark:text-emerald-400',
      bgIcon: 'bg-emerald-50 dark:bg-emerald-950/30',
      borderIcon: 'border-emerald-200 dark:border-emerald-800'
    },
    {
      icon: Globe,
      title: t('features_new.personal_helper_title'),
      description: t('features_new.personal_helper_desc'),
      color: 'text-purple-600 dark:text-purple-400',
      bgIcon: 'bg-purple-50 dark:bg-purple-950/30',
      borderIcon: 'border-purple-200 dark:border-purple-800'
    },
  ];

  return (
    <>
    <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {title || t('features_new.title')}
          </h2>
          <div className="w-16 h-1 bg-slate-300 dark:bg-slate-700 mx-auto rounded-full" />
        </motion.div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                padding="lg"
              >
                <CardHeader className="text-center">
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-6 rounded-xl ${feature.bgIcon} ${feature.borderIcon} border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105`}
                    whileHover={{ y: -2 }}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </motion.div>
                  <CardTitle className="text-xl text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}