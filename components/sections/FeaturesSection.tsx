 'use client';

import { Card } from '../ui/Card';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const features = [
  {
    icon: (
      <svg
        className="w-12 h-12 text-brand-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: 'Verified Sellers',
    description: 'We verify every seller to ensure you get a trustworthy deal.',
  },
  {
    icon: (
      <svg
        className="w-12 h-12 text-brand-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
      </svg>
    ),
    title: 'Fast & Easy',
    description: 'Quick search and seamless transactions on any device.',
  },
  {
    icon: (
      <svg
        className="w-12 h-12 text-brand-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
      </svg>
    ),
    title: 'Best Prices',
    description: 'Competitive pricing on all listings guaranteed.',
  },
];

export const FeaturesSection = (props) => {
    const { title = 'Why Choose Us' } = props;

    return (
      <>
      <section className="bg-surface-base py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
          {title}
        </h2>
        <div className="grid gap-12 md:grid-cols-3">
          {features.map(({ icon, title, description }, index) => (
            <motion.div
              key={title}
              className="flex flex-col items-center text-center px-4"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                key={title}
                icon={icon}
                title={title}
                text={description}
              />
            </motion.div>
          ))}
        </div>
      </section>
      </>
    );
}