'use client';

import { useState, useCallback } from 'react';
import Preloader from '@/components/Preloader';
import BubbleHero from '@/components/BubbleHero';
import WhatIsSection from '@/components/WhatIsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />

      <div
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: preloaderDone ? 'auto' : 'none',
        }}
      >
        <main>
          <BubbleHero />
          <WhatIsSection />
          <HowItWorksSection />
          <WaitlistSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
