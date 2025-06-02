'use client';

import { motion } from 'framer-motion';

export default function AnimatedCarBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.svg
        className="absolute bottom-0 left-0 w-[300px] h-auto"
        viewBox="0 0 100 50"
        initial={{ x: '-100%' }}
        animate={{ x: '120%' }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simple car shape */}
        <g fill="none" stroke="white" strokeWidth="1.5">
          <rect x="20" y="20" width="60" height="20" rx="3" fill="#ffffff22" />
          <circle cx="30" cy="43" r="4" fill="#fff" />
          <circle cx="70" cy="43" r="4" fill="#fff" />
        </g>
      </motion.svg>
    </div>
  );
}
