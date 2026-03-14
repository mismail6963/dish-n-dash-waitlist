'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Preloader from '@/components/Preloader';
import BubbleHero from '@/components/BubbleHero';
import WhatIsSection from '@/components/WhatIsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';

const REVEAL_EASE = [0.25, 0.1, 0.25, 1.0] as const;

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={preloaderDone ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, ease: REVEAL_EASE }}
        style={{ pointerEvents: preloaderDone ? 'auto' : 'none' }}
      >
        <main>
          <BubbleHero />
          <WhatIsSection />
          <HowItWorksSection />
          <WaitlistSection />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
