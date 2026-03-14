'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HowItWorksSection() {
  const [showModal, setShowModal] = useState(false);

  const handleUpgrade = () => setShowModal(true);

  const handleProceed = () => {
    setShowModal(false);
    setTimeout(() => {
      document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      <section
        id="how"
        className="relative py-28 md:py-40 overflow-hidden"
      >
        {/* Subtle background noise */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight text-text-primary leading-none">
              404
            </p>
            <p className="mt-3 text-xl sm:text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
              Page Locked
            </p>
          </motion.div>

          <motion.p
            className="mt-6 text-text-secondary text-base md:text-lg max-w-md mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Some dining experiences shouldn&apos;t be available to everyone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <button
              onClick={handleUpgrade}
              className="mt-10 px-8 py-3.5 text-sm font-semibold rounded-full bg-bg-elevated border border-white/[0.1] text-text-primary hover:border-emerald-primary/40 hover:shadow-[0_0_30px_rgba(14,122,95,0.15)] transition-all duration-400 cursor-pointer"
            >
              Upgrade
            </button>
          </motion.div>
        </div>
      </section>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-md rounded-2xl bg-bg-elevated border border-white/[0.08] p-8 md:p-10 shadow-[0_0_60px_rgba(14,122,95,0.12)]"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glow edge */}
              <div className="absolute inset-0 rounded-2xl border border-emerald-primary/10 pointer-events-none" />

              <h3 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight leading-tight">
                You are one step away from unlocking Dish N Dash early access.
              </h3>
              <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                Access to Dish N Dash is currently limited. Join the waitlist to unlock early access and be among the first to experience the platform.
              </p>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={handleProceed}
                  className="flex-1 py-3 text-sm font-semibold rounded-full bg-emerald-primary text-white hover:bg-emerald-bright transition-all duration-300 cursor-pointer"
                >
                  Proceed
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 text-sm font-semibold rounded-full bg-bg-soft border border-white/[0.08] text-text-secondary hover:text-text-primary hover:border-white/[0.15] transition-all duration-300 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
