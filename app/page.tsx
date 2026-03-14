import BubbleHero from '@/components/BubbleHero';
import WhatIsSection from '@/components/WhatIsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main>
        <BubbleHero />
        <WhatIsSection />
        <HowItWorksSection />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
