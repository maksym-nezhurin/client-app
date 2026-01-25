 'use client';

import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const features = [
  {
    icon: (
      <svg
        className="h-12 w-12 text-cyan-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: 'Verified sellers',
    description: 'Every listing is checked to keep your journey transparent and safe.',
  },
  {
    icon: (
      <svg
        className="h-12 w-12 text-violet-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
      </svg>
    ),
    title: 'Fast & clear search',
    description: 'Find the right match instantly with smart filters and clean UI.',
  },
  {
    icon: (
      <svg
        className="h-12 w-12 text-emerald-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
      </svg>
    ),
    title: 'Competitive pricing',
    description: 'Market insights help you choose the best offer without stress.',
  },
];

export const FeaturesSection = ({ title = 'Why choose us' }: { title?: string }) => {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(15,23,42,0.5)] backdrop-blur md:p-12">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Trust & clarity</p>
        <h2 className="mt-3 text-3xl font-semibold">{title}</h2>
        <p className="mt-3 text-sm text-slate-300">
          A refined experience that keeps you informed at every step.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {features.map(({ icon, title, description }, index) => (
          <motion.div
            key={title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-lg shadow-black/20"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-300">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};