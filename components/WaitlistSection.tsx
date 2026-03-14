'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal';
import SuccessState from './SuccessState';

const PERKS = [
  'Early access to the Dish N Dash app',
  'Exclusive restaurant drops',
  'Priority reservations at partner restaurants',
  'Founding member badge inside the app',
];

export default function WaitlistSection() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    setLoading(true);
    // Placeholder — connect real API here
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return <SuccessState />;
  }

  return (
    <section id="waitlist" className="relative py-28 md:py-40">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="w-full h-full bg-emerald-primary/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionReveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            Join the Dish N Dash
            <br />
            <span className="text-emerald-bright">Founders Club</span>
          </h2>
          <p className="mt-5 text-text-secondary text-base md:text-lg leading-relaxed">
            A limited group of early diners shaping the future of dining in Riyadh.
          </p>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Perks */}
          <SectionReveal delay={0.1}>
            <div className="space-y-4">
              {PERKS.map((perk, i) => (
                <motion.div
                  key={perk}
                  className="flex items-start gap-3.5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-primary/15 border border-emerald-primary/20 flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#17C58A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{perk}</p>
                </motion.div>
              ))}
            </div>
          </SectionReveal>

          {/* Form */}
          <SectionReveal delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-bg-elevated border border-white/[0.06] p-6 md:p-8 space-y-5"
            >
              <div>
                <label htmlFor="firstName" className="block text-xs font-semibold text-text-muted mb-2 tracking-wide uppercase">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full rounded-xl bg-bg-soft border border-white/[0.06] px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-emerald-primary/50 focus:shadow-[0_0_0_3px_rgba(14,122,95,0.15)] transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-text-muted mb-2 tracking-wide uppercase">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl bg-bg-soft border border-white/[0.06] px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-emerald-primary/50 focus:shadow-[0_0_0_3px_rgba(14,122,95,0.15)] transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-xs font-semibold text-text-muted mb-2 tracking-wide uppercase">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Riyadh"
                  className="w-full rounded-xl bg-bg-soft border border-white/[0.06] px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-emerald-primary/50 focus:shadow-[0_0_0_3px_rgba(14,122,95,0.15)] transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-sm font-semibold rounded-full bg-emerald-primary text-white hover:bg-emerald-bright disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_0_20px_rgba(14,122,95,0.3)] cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Joining...
                  </span>
                ) : (
                  'Join the Waitlist'
                )}
              </button>

              <p className="text-center text-[11px] text-text-muted">
                No spam. Early access only.
              </p>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
