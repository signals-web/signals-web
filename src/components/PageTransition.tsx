'use client';

import React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
} 