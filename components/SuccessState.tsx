'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SuccessState() {
  const [copied, setCopied] = useState(false);

  const referralLink = 'https://dishndash.app/ref/founder-842';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Join me on Dish N Dash — the future of dining in Saudi Arabia. ${referralLink}`)}`;
  const instagramCopy = referralLink;

  return (
    <section id="waitlist" className="relative py-28 md:py-40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none">
        <div className="w-full h-full bg-emerald-primary/[0.06] rounded-full blur-[100px]" />
      </div>

      <motion.div
        className="relative mx-auto max-w-lg px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Check icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-primary/15 border border-emerald-primary/20 mx-auto mb-6 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M7 14l5 5 9-9" stroke="#17C58A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
          You&apos;re on the list.
        </h2>
        <p className="mt-3 text-text-secondary text-base">
          Move up by inviting friends.
        </p>

        {/* Position */}
        <div className="mt-8 inline-block rounded-2xl bg-bg-elevated border border-white/[0.06] px-8 py-5">
          <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Your position</p>
          <p className="text-3xl font-bold text-emerald-bright tracking-tight">#842</p>
        </div>

        {/* Share buttons */}
        <div className="mt-10 space-y-3">
          <button
            onClick={handleCopy}
            className="w-full py-3.5 text-sm font-semibold rounded-full bg-bg-elevated border border-white/[0.08] text-text-primary hover:border-emerald-primary/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M3 11V3a2 2 0 012-2h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {copied ? 'Copied!' : 'Copy Link'}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 text-sm font-semibold rounded-full bg-bg-elevated border border-white/[0.08] text-text-primary hover:border-emerald-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1a7 7 0 00-6.1 10.4L1 15l3.7-.9A7 7 0 108 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              <path d="M5.5 5.2c.2-.4.5-.5.7-.5s.3 0 .4.1l.6 1.4c.1.1 0 .3-.1.5l-.3.4s-.1.2.1.5c.3.5.7.9 1.2 1.2.2.1.4 0 .5-.1l.3-.3c.2-.2.3-.2.5-.1l1.4.6c.1.1.2.3.1.5-.1.5-.6 1-1.1 1-1.5 0-3.3-1.7-4-3.3-.2-.5.1-.9.2-1.1l.5-.8z" fill="currentColor"/>
            </svg>
            Share on WhatsApp
          </a>

          <button
            onClick={handleCopy}
            className="w-full py-3.5 text-sm font-semibold rounded-full bg-bg-elevated border border-white/[0.08] text-text-primary hover:border-emerald-primary/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="12" cy="4" r="1" fill="currentColor"/>
            </svg>
            Share on Instagram
          </button>
        </div>

        <p className="mt-8 text-xs text-text-muted">
          Each friend who joins moves you closer to the front.
        </p>
      </motion.div>
    </section>
  );
}
