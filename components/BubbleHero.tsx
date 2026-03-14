'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

/* ─── Bubble Data ─────────────────────────────────────────────────── */

const BUBBLES = [
  {
    id: 'what',
    label: 'What is\nDish N Dash',
    ariaLabel: 'Learn what Dish N Dash is',
    size: 1,
    orbitOffset: 0,
    glowColor: 'rgba(23, 197, 138, 0.25)',
    hoverGlow: 'rgba(23, 197, 138, 0.5)',
  },
  {
    id: 'how',
    label: 'How It\nWorks',
    ariaLabel: 'See how Dish N Dash works',
    size: 1,
    orbitOffset: (2 * Math.PI) / 3,
    glowColor: 'rgba(46, 230, 166, 0.2)',
    hoverGlow: 'rgba(46, 230, 166, 0.45)',
  },
  {
    id: 'waitlist',
    label: 'Join the\nWaitlist',
    ariaLabel: 'Join the Dish N Dash Founders Club waitlist',
    size: 1.4,
    orbitOffset: (4 * Math.PI) / 3,
    glowColor: 'rgba(23, 197, 138, 0.3)',
    hoverGlow: 'rgba(23, 197, 138, 0.6)',
  },
];

/* ─── Helpers ─────────────────────────────────────────────────────── */

function getOrbitRadius() {
  if (typeof window === 'undefined') return { rx: 160, ry: 100 };
  const w = window.innerWidth;
  if (w < 500) return { rx: 70, ry: 45 };
  if (w < 900) return { rx: 110, ry: 70 };
  return { rx: 160, ry: 100 };
}

function getBaseSize() {
  if (typeof window === 'undefined') return 150;
  const w = window.innerWidth;
  if (w < 500) return 100;
  if (w < 900) return 125;
  return 150;
}

/* ─── Component ───────────────────────────────────────────────────── */

interface BubbleHeroProps {
  onBubbleClick?: (id: string) => void;
}

export default function BubbleHero({ onBubbleClick }: BubbleHeroProps) {
  const [mounted, setMounted] = useState(false);
  const [baseSize, setBaseSize] = useState(150);
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const angleRef = useRef(0);
  const positionsRef = useRef(BUBBLES.map(() => ({ x: 0, y: 0 })));
  const [positions, setPositions] = useState(positionsRef.current);

  useEffect(() => {
    setBaseSize(getBaseSize());
    setMounted(true);
    const onResize = () => setBaseSize(getBaseSize());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useAnimationFrame(() => {
    if (!mounted) return;
    angleRef.current += 0.002;
    const { rx, ry } = getOrbitRadius();
    const next = BUBBLES.map((b) => {
      const theta = angleRef.current + b.orbitOffset;
      return { x: Math.cos(theta) * rx, y: Math.sin(theta) * ry * 0.55 };
    });
    positionsRef.current = next;
    setPositions([...next]);
  });

  const handleClick = useCallback(
    (id: string) => {
      if (id === 'waitlist') {
        document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'what') {
        document.getElementById('what')?.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'how') {
        document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' });
      }
      onBubbleClick?.(id);
    },
    [onBubbleClick],
  );

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden px-6">
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse at center, rgba(14,122,95,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Hero copy above bubbles */}
      <motion.div
        className="relative text-center mb-12 md:mb-16 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
          Dining, intelligently
          <br />
          <span className="text-emerald-bright">organized.</span>
        </h1>
        <p className="mt-5 max-w-lg mx-auto text-sm sm:text-base text-text-secondary leading-relaxed">
          Dish N Dash is rethinking how people discover, reserve, and experience restaurants.
        </p>
      </motion.div>

      {/* Bubble cluster */}
      <div
        className="relative z-10"
        style={{
          width: baseSize * 3.5,
          height: baseSize * 3.5,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {BUBBLES.map((bubble, idx) => {
          const diameter = baseSize * bubble.size;
          const isHovered = hoveredIdx === idx;
          const isWaitlist = bubble.id === 'waitlist';
          const anyHovered = hoveredIdx !== -1;
          const waitlistPull = isWaitlist && anyHovered && !isHovered;
          const scale = isHovered ? 1.08 : waitlistPull ? 1.05 : 1;

          return (
            <button
              key={bubble.id}
              type="button"
              aria-label={bubble.ariaLabel}
              className="absolute rounded-full flex items-center justify-center cursor-pointer border p-0 outline-none focus-visible:ring-2 focus-visible:ring-emerald-bright"
              style={{
                width: diameter,
                height: diameter,
                top: '50%',
                left: '50%',
                marginTop: -(diameter / 2),
                marginLeft: -(diameter / 2),
                transform: `translate(${positions[idx].x}px, ${positions[idx].y}px) scale(${scale})`,
                transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease, background-color 0.4s ease, border-color 0.4s ease',
                backgroundColor: isHovered ? '#111111' : '#0A0A0A',
                borderColor: isHovered ? 'rgba(23,197,138,0.5)' : 'rgba(255,255,255,0.08)',
                boxShadow: isHovered
                  ? `0 0 40px ${bubble.hoverGlow}, inset 0 0 30px rgba(14,122,95,0.1)`
                  : `0 0 20px ${bubble.glowColor}, inset 0 0 20px rgba(14,122,95,0.05)`,
                zIndex: isWaitlist ? 10 : 5,
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(-1)}
              onClick={() => handleClick(bubble.id)}
            >
              <span
                className="text-center select-none whitespace-pre-line leading-tight px-4"
                style={{
                  fontSize: `clamp(0.7rem, ${bubble.size * 1}vw, 1rem)`,
                  fontWeight: 600,
                  color: isHovered ? '#2EE6A6' : '#F5F5F2',
                  transition: 'color 0.3s ease',
                  letterSpacing: '-0.01em',
                }}
              >
                {bubble.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* CTA buttons below cluster */}
      <motion.div
        className="relative z-10 flex gap-4 mt-12 md:mt-16"
        initial={{ opacity: 0, y: 16 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="#what"
          className="px-6 py-3 text-sm font-semibold rounded-full border border-white/[0.1] text-text-secondary hover:text-text-primary hover:border-white/[0.2] transition-all duration-300"
        >
          Explore
        </a>
        <a
          href="#waitlist"
          className="px-6 py-3 text-sm font-semibold rounded-full bg-emerald-primary text-white hover:bg-emerald-bright transition-all duration-300 shadow-[0_0_20px_rgba(14,122,95,0.3)]"
        >
          Join the Waitlist
        </a>
      </motion.div>
    </section>
  );
}
