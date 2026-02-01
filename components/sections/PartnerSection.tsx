'use client';
import { motion } from 'framer-motion';
import { useTypedTranslation } from '@/lib/i18n';
import { useMarket } from '@/contexts/market/MarketContext';
import { MARKETS } from '@/types/market';
import { Building2, Car, Wrench, Globe, Shield } from 'lucide-react';

// Partners for each market with icons instead of images
const MARKET_PARTNERS = {
  [MARKETS.PL.code]: [
    { id: 1, name: 'AutoPoland', icon: Building2, color: 'text-red-600' },
    { id: 2, name: 'PolskiAuto', icon: Car, color: 'text-blue-600' },
    { id: 3, name: 'CarWarsaw', icon: Wrench, color: 'text-green-600' },
    { id: 4, name: 'KrakowMotors', icon: Globe, color: 'text-purple-600' },
    { id: 5, name: 'GdanskCars', icon: Shield, color: 'text-orange-600' },
  ],
  [MARKETS.SK.code]: [
    { id: 1, name: 'AutoSlovakia', icon: Building2, color: 'text-blue-600' },
    { id: 2, name: 'BratislavaAuto', icon: Car, color: 'text-red-600' },
    { id: 3, name: 'KosiceMotors', icon: Wrench, color: 'text-green-600' },
    { id: 4, name: 'SlovakCars', icon: Globe, color: 'text-purple-600' },
    { id: 5, name: 'NitraAuto', icon: Shield, color: 'text-orange-600' },
  ],
  [MARKETS.UA.code]: [
    { id: 1, name: 'АвтоУкраїна', icon: Building2, color: 'text-blue-600' },
    { id: 2, name: 'КиївАвто', icon: Car, color: 'text-yellow-600' },
    { id: 3, name: 'ЛьвівМоторс', icon: Wrench, color: 'text-green-600' },
    { id: 4, name: 'ХарківАвто', icon: Globe, color: 'text-red-600' },
    { id: 5, name: 'ОдесаCars', icon: Shield, color: 'text-cyan-600' },
  ],
};

export function PartnersSection() {
  const { t } = useTypedTranslation('client');
  const { market } = useMarket();
  
  // Get partners for current market, fallback to Poland if no market
  const partners = MARKET_PARTNERS[market?.code] || MARKET_PARTNERS[MARKETS.PL.code];

  return (
    <section className="py-20 px-6 bg-slate-100 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-4">
            {t('partners.eyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t('partners.title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('partners.subtitle')}
          </p>
          
          {/* Market indicator */}
          {market && (
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span>{market.flag}</span>
              <span>Партнери в {market.name}</span>
            </div>
          )}
        </motion.div>
        
        <motion.div
          className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { 
                staggerChildren: 0.1,
                duration: 0.5,
                ease: "easeOut"
              } 
            },
          }}
        >
          {partners.map(({ id, name, icon: Icon, color }) => (
            <motion.div
              key={`${market?.code}-${id}`}
              className="group relative"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
                <div className="aspect-square flex flex-col items-center justify-center">
                  <div className={`w-16 h-16 rounded-xl ${color.replace('text', 'bg').replace('600', '100')} dark:${color.replace('text', 'bg').replace('600', '900')} flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110`}>
                    <Icon className={`w-8 h-8 ${color}`} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center">
                    {name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
