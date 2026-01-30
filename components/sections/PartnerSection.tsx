'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { useTypedTranslation } from '@/lib/i18n';

const partners = [
  { id: 1, name: 'AutoBrand', logo: '/partners/1.png' },
  { id: 2, name: 'DrivePro', logo: '/partners/2.png' },
  { id: 3, name: 'RentWheels', logo: '/partners/3.png' },
  { id: 4, name: 'CarConnect', logo: '/partners/4.png' },
  { id: 5, name: 'MotorMax', logo: '/partners/5.png' },
]

export function PartnersSection() {
  const { t } = useTypedTranslation();

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-[0_0_40px_rgba(15,23,42,0.5)] backdrop-blur md:p-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t('client.partners.eyebrow')}</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">{t('client.partners.title')}</h2>
        <p className="mt-3 text-sm text-slate-300">
          {t('client.partners.subtitle')}
        </p>
        <motion.div
          className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
          }}
          >
          {partners.map(({ id, name, logo }) => (
            <motion.div
              key={id}
              className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-105"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              aria-label={name}
              role="img"
            >
              <Image src={logo} alt={name} width={250} height={200} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
