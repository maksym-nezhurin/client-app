'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { id: 1, name: 'AutoBrand', logo: '/partners/1.png' },
  { id: 2, name: 'DrivePro', logo: '/partners/2.png' },
  { id: 3, name: 'RentWheels', logo: '/partners/3.png' },
  { id: 4, name: 'CarConnect', logo: '/partners/4.png' },
  { id: 5, name: 'MotorMax', logo: '/partners/5.png' },
]

export function PartnersSection() {
  return (
    <section className="py-16 bg-surface-base">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-2">Our partners</h2>
        <p className="text-text-secondary mb-10">
            We are working with best companies in the automobile industry
        </p>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center"
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
              className="flex items-center justify-center bg-surface-card rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300"
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
