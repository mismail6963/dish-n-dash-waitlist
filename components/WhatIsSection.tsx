'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionReveal from './SectionReveal';

const ROTATING_WORDS = ['Discover', 'Reserve', 'Arrive', 'Enjoy', 'Repeat'];

/* ─── Discovery Cards ─────────────────────────────────────────────── */

const RESTAURANTS = [
  { name: 'Nusr-Et Steakhouse', cuisine: 'Premium Steakhouse', rating: 4.9 },
  { name: 'Takya', cuisine: 'Contemporary Arabic', rating: 4.8 },
  { name: 'LPM Restaurant', cuisine: 'French Mediterranean', rating: 4.7 },
];

const TIME_SLOTS = ['6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM'];

/* ─── Component ───────────────────────────────────────────────────── */

export default function WhatIsSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="what" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section intro */}
        <SectionReveal className="text-center max-w-2xl mx-auto mb-24 md:mb-32">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15]">
            Your dining experience,{' '}
            <span className="inline-block relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING_WORDS[wordIndex]}
                  className="inline-block text-emerald-bright"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ROTATING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
          <p className="mt-5 text-text-secondary text-base md:text-lg leading-relaxed">
            Dish N Dash is rethinking how people discover and experience restaurants.
          </p>
        </SectionReveal>

        {/* Phone mockup placeholder */}
        <SectionReveal className="flex justify-center mb-28 md:mb-36" delay={0.15}>
          <div className="relative w-[260px] sm:w-[280px] md:w-[300px]">
            <motion.div
              className="rounded-[36px] border border-white/[0.08] bg-bg-elevated overflow-hidden shadow-[0_0_60px_rgba(14,122,95,0.12)]"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Phone notch */}
              <div className="h-8 flex items-center justify-center">
                <div className="w-20 h-5 bg-bg-primary rounded-b-2xl" />
              </div>
              {/* Screen content */}
              <div className="px-5 pb-8 pt-4 space-y-3">
                <div className="text-xs text-text-muted mb-4">Featured for you</div>
                {RESTAURANTS.map((r) => (
                  <div
                    key={r.name}
                    className="rounded-xl bg-bg-soft p-3 border border-white/[0.04]"
                  >
                    {/* Image placeholder */}
                    <div className="h-20 rounded-lg bg-gradient-to-br from-bg-secondary to-bg-elevated mb-2.5 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-primary/20 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-emerald-bright/50" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-text-primary">{r.name}</p>
                        <p className="text-[10px] text-text-muted mt-0.5">{r.cuisine}</p>
                      </div>
                      <div className="text-[10px] font-semibold text-emerald-bright">{r.rating}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </SectionReveal>

        {/* Stage 1: Discovery */}
        <SectionReveal className="mb-28 md:mb-36">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-emerald-bright mb-4">Discovery</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                Find the right place without the search.
              </h3>
              <p className="mt-4 text-text-secondary leading-relaxed">
                The best dining experiences start before you arrive. Dish N Dash learns what you love and surfaces restaurants you&apos;ll want to try — effortlessly.
              </p>
            </div>
            <div className="space-y-3">
              {RESTAURANTS.map((r, i) => (
                <motion.div
                  key={r.name}
                  className="rounded-2xl bg-bg-elevated border border-white/[0.06] p-5 flex items-center gap-4"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="w-14 h-14 rounded-xl bg-bg-soft flex items-center justify-center shrink-0">
                    <div className="w-5 h-5 rounded-full bg-emerald-primary/30" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">{r.name}</p>
                    <p className="text-xs text-text-muted mt-0.5">{r.cuisine}</p>
                  </div>
                  <div className="text-xs font-semibold text-emerald-bright">{r.rating}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Stage 2: Reservations */}
        <SectionReveal className="mb-28 md:mb-36">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="rounded-2xl bg-bg-elevated border border-white/[0.06] p-6">
                <p className="text-xs text-text-muted mb-4">Available tonight</p>
                <div className="grid grid-cols-2 gap-3">
                  {TIME_SLOTS.map((slot, i) => (
                    <motion.div
                      key={slot}
                      className={`rounded-xl py-3 px-4 text-center text-sm font-semibold cursor-pointer transition-all duration-300 ${
                        i === 1
                          ? 'bg-emerald-primary text-white shadow-[0_0_20px_rgba(14,122,95,0.3)]'
                          : 'bg-bg-soft text-text-secondary border border-white/[0.06] hover:border-emerald-primary/30'
                      }`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {slot}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center justify-between">
                  <p className="text-xs text-text-muted">Party size</p>
                  <p className="text-sm font-semibold text-text-primary">2 guests</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-xs font-semibold tracking-widest uppercase text-emerald-bright mb-4">Reservations</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                Tables, when you want them.
              </h3>
              <p className="mt-4 text-text-secondary leading-relaxed">
                No waiting, no calling. Select your time, confirm in one tap, and your table is locked in — simple as it should be.
              </p>
            </div>
          </div>
        </SectionReveal>

        {/* Stage 3: Seamless Dining */}
        <SectionReveal className="mb-28 md:mb-36">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-emerald-bright mb-4">Experience</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                Walk in like everything was planned.
              </h3>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Your table is ready. Your preferences are known. Everything is handled before you walk through the door.
              </p>
            </div>
            <motion.div
              className="rounded-2xl bg-bg-elevated border border-white/[0.06] p-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-12 h-12 rounded-full bg-emerald-primary/20 mx-auto mb-4 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 10l3 3 7-7" stroke="#17C58A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-lg font-bold text-text-primary mb-1">Your table is ready.</p>
              <p className="text-sm text-text-muted">Nusr-Et Steakhouse &middot; 7:00 PM &middot; 2 guests</p>
              <div className="mt-5 inline-block rounded-full bg-emerald-primary/10 border border-emerald-primary/20 px-4 py-1.5 text-xs font-semibold text-emerald-bright">
                Confirmed
              </div>
            </motion.div>
          </div>
        </SectionReveal>

        {/* Closing block */}
        <SectionReveal className="text-center max-w-xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            Dining should feel effortless.
          </h3>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Dish N Dash is bringing a new way to experience restaurants.
          </p>
          <a
            href="#waitlist"
            className="inline-block mt-8 px-8 py-3.5 text-sm font-semibold rounded-full bg-emerald-primary text-white hover:bg-emerald-bright transition-all duration-300 shadow-[0_0_20px_rgba(14,122,95,0.3)]"
          >
            Join the Waitlist
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
