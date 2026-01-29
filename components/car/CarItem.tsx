'use client';

import { motion } from 'framer-motion';
import { CarEmblemMap } from './CarEmblemMap';
import { ICar } from './types';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

interface Props {
  car?: ICar;
  isLoading?: boolean;
}

export default function CarItem({ car, isLoading = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) return;
    const el = containerRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 10;
      const y = ((e.clientY - top) / height - 0.5) * 10;
      el.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.05)`;
    };

    const onMouseLeave = () => {
      if (!el) return;
      el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isLoading]);

  if (isLoading || !car) {
    return (
      <div className="relative rounded-2xl p-6 shadow-[0_0_25px_#00ffff30] bg-black text-white overflow-hidden animate-pulse border border-cyan-800">
        <div className="w-16 h-16 mb-4 bg-cyan-900 rounded-full" />
        <div className="h-6 bg-cyan-800 rounded w-3/4 mb-2" />
        <div className="h-4 bg-cyan-800 rounded w-full mb-2" />
        <div className="h-4 bg-cyan-800 rounded w-1/2 mb-2" />
        <div className="h-4 bg-cyan-800 rounded w-1/3" />
      </div>
    );
  }

  const emblem = CarEmblemMap[car.brand.toLowerCase()] || '/logos/default.svg';

  return (
    <motion.div
      ref={containerRef}
      className="relative rounded-2xl p-6 shadow-[0_0_25px_#00ffff70] bg-black text-white overflow-hidden cursor-pointer
        border border-cyan-500
        before:absolute before:-inset-0.5 before:rounded-2xl before:bg-gradient-to-r before:from-cyan-400 before:via-blue-400 before:to-purple-600
        before:bg-[length:200%_200%] before:animate-neonGlow
        after:absolute after:inset-0 after:rounded-2xl after:border after:border-cyan-600 after:opacity-20
        hover:shadow-[0_0_40px_#00ffffaa]
        transition-transform duration-300"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <svg
        className="none hover:block absolute inset-0 w-full h-full pointer-events-none"

        preserveAspectRatio="none"
        viewBox="0 0 200 200"
      >
        <path
          d="M10 30 L50 90 L90 20 L130 80 L170 10"
          stroke="#0ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="animate-lightning"
        />
      </svg>

      <Image src={emblem} alt={car.brand} className="w-16 h-16 mb-4 drop-shadow-[0_0_10px_cyan]" width={80} height={80} />
      <h2 className="text-xl font-bold drop-shadow-[0_0_8px_cyan]">{car.brand} {car.model}</h2>
      <p className="text-md relative">{car.description}</p>
      <p className="mt-2 text-red-400 font-semibold relative">${car.price.toLocaleString()}</p>
      <p className="text-m relative">{car.year} year</p>
    </motion.div>
  );
}
