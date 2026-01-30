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
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: 'AI-Powered Search',
    description: 'Our intelligent assistant learns your preferences and finds the perfect match for you.',
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Complete Vehicle History',
    description: 'Access comprehensive data from CarVertical and other trusted sources for every vehicle.',
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Personal Helper',
    description: 'Get dedicated assistance throughout your car buying journey, from search to purchase.',
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