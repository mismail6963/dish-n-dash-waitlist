'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';

/* ─── Item Data ──────────────────────────────────────────────────────── */

const HERO_ITEMS = [
  {
    id: 'what',
    label: 'What is Dish N Dash',
    href: '#what',
    ariaLabel: 'Learn what Dish N Dash is',
    size: 1,
    orbitOffset: 0,
    hoverStyles: {
      bgColor: '#D4AF37',
      textColor: '#FFFFFF',
      glowColor: 'rgba(212,175,55,0.35)',
    },
  },
  {
    id: 'how',
    label: 'How It Works',
    href: '#how',
    ariaLabel: 'See how Dish N Dash works',
    size: 1,
    orbitOffset: (2 * Math.PI) / 3,
    hoverStyles: {
      bgColor: '#2ECCB0',
      textColor: '#FFFFFF',
      glowColor: 'rgba(46,204,176,0.35)',
    },
  },
  {
    id: 'waitlist',
    label: 'Join the Waitlist',
    href: '#waitlist',
    ariaLabel: 'Join the Dish N Dash Founders Club waitlist',
    size: 1.35,
    orbitOffset: (4 * Math.PI) / 3,
    hoverStyles: {
      bgColor: '#1ED760',
      textColor: '#FFFFFF',
      glowColor: 'rgba(30,215,96,0.4)',
    },
  },
];

const WAITLIST_INDEX = 2;

/* ─── Helpers ────────────────────────────────────────────────────────── */

function getOrbitRadius() {
  if (typeof window === 'undefined') return { rx: 180, ry: 120 };
  const w = window.innerWidth;
  if (w < 500) return { rx: 80, ry: 55 };
  if (w < 900) return { rx: 120, ry: 80 };
  return { rx: 180, ry: 120 };
}

function getBubbleSize() {
  if (typeof window === 'undefined') return 180;
  const w = window.innerWidth;
  if (w < 500) return 110;
  if (w < 900) return 140;
  return 180;
}

/* ─── Component ──────────────────────────────────────────────────────── */

interface BubbleHeroProps {
  onBubbleClick?: (id: string) => void;
  className?: string;
}

export default function BubbleHero({ onBubbleClick, className }: BubbleHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [baseSize, setBaseSize] = useState(180);
  const [mounted, setMounted] = useState(false);

  // Mutable animation state held in a ref so it persists across renders
  const animState = useRef({
    angle: 0,
    paused: false,
    hoveredIndex: -1,
    expanding: false,
  });

  // Hydration-safe: compute bubble size only on client
  useEffect(() => {
    setBaseSize(getBubbleSize());
    setMounted(true);
  }, []);

  /* ── Orbit tick ─────────────────────────────────────────────────── */

  const tick = useCallback(() => {
    if (animState.current.paused || animState.current.expanding) return;

    animState.current.angle += 0.003; // slow, refined orbit
    const { rx, ry } = getOrbitRadius();
    const bubbles = bubblesRef.current;

    HERO_ITEMS.forEach((item, i) => {
      const bubble = bubbles[i];
      if (!bubble) return;
      const theta = animState.current.angle + item.orbitOffset;
      const x = Math.cos(theta) * rx;
      const y = Math.sin(theta) * ry * 0.6; // flatter ellipse
      gsap.set(bubble, { x, y });
    });
  }, []);

  /* ── Mount: entrance + orbit ───────────────────────────────────── */

  useEffect(() => {
    const bubbles = bubblesRef.current.filter(Boolean) as HTMLButtonElement[];
    const labels = labelRefs.current.filter(Boolean) as HTMLSpanElement[];

    // Initial state
    gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
    gsap.set(labels, { y: 16, autoAlpha: 0 });

    // Staggered entrance
    bubbles.forEach((bubble, i) => {
      const delay = i * 0.15;
      const tl = gsap.timeline({ delay });

      tl.to(bubble, {
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.2)',
      });

      if (labels[i]) {
        tl.to(
          labels[i],
          { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.45',
        );
      }
    });

    // Start orbit
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
    };
  }, [tick]);

  /* ── Resize handler ────────────────────────────────────────────── */

  useEffect(() => {
    const onResize = () => {
      setBaseSize(getBubbleSize());
      tick();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [tick]);

  /* ── Hover handlers ────────────────────────────────────────────── */

  const handleMouseEnter = useCallback((index: number) => {
    if (animState.current.expanding) return;
    animState.current.hoveredIndex = index;

    const item = HERO_ITEMS[index];
    const bubble = bubblesRef.current[index];
    const waitlistBubble = bubblesRef.current[WAITLIST_INDEX];

    if (bubble) {
      gsap.to(bubble, {
        scale: 1.08,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(bubble, {
        backgroundColor: item.hoverStyles.bgColor,
        color: item.hoverStyles.textColor,
        boxShadow: `0 0 40px ${item.hoverStyles.glowColor}, 0 0 80px ${item.hoverStyles.glowColor}`,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    // Magnetic pull: "Join the Waitlist" grows when ANY bubble is hovered
    if (index !== WAITLIST_INDEX && waitlistBubble) {
      gsap.to(waitlistBubble, {
        scale: 1.06,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    if (animState.current.expanding) return;
    animState.current.hoveredIndex = -1;

    const bubble = bubblesRef.current[index];
    const waitlistBubble = bubblesRef.current[WAITLIST_INDEX];

    if (bubble) {
      gsap.to(bubble, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(bubble, {
        backgroundColor: '#FFFFFF',
        color: '#0B2A20',
        boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    if (index !== WAITLIST_INDEX && waitlistBubble) {
      gsap.to(waitlistBubble, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  }, []);

  /* ── Click-to-expand ───────────────────────────────────────────── */

  const handleClick = useCallback(
    (index: number) => {
      if (animState.current.expanding) return;
      animState.current.expanding = true;
      animState.current.paused = true;

      const item = HERO_ITEMS[index];
      const bubble = bubblesRef.current[index];
      const otherBubbles = bubblesRef.current.filter((_, i) => i !== index && _ !== null);

      if (!bubble) return;

      // Calculate scale needed to cover viewport
      const rect = bubble.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxDim = Math.max(vw, vh);
      const bubbleDim = Math.max(rect.width, rect.height);
      const targetScale = (maxDim / bubbleDim) * 2.5;

      // Move bubble to center of viewport
      const centerX = vw / 2 - rect.left - rect.width / 2;
      const centerY = vh / 2 - rect.top - rect.height / 2;

      const tl = gsap.timeline();

      // Fade out other bubbles
      tl.to(otherBubbles, {
        scale: 0,
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in',
        stagger: 0.05,
      });

      // Expand clicked bubble
      tl.to(
        bubble,
        {
          x: centerX,
          y: centerY,
          scale: targetScale,
          borderRadius: 0,
          backgroundColor: item.hoverStyles.bgColor,
          color: item.hoverStyles.textColor,
          boxShadow: `0 0 60px ${item.hoverStyles.glowColor}`,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            onBubbleClick?.(item.id);
          },
        },
        '-=0.15',
      );

      // Fade out label during expansion
      const label = labelRefs.current[index];
      if (label) {
        tl.to(
          label,
          { autoAlpha: 0, duration: 0.2, ease: 'power2.in' },
          '-=0.7',
        );
      }
    },
    [onBubbleClick],
  );

  /* ── Render ────────────────────────────────────────────────────── */

  return (
    <section
      ref={containerRef}
      className={`relative flex items-center justify-center min-h-screen w-full overflow-hidden ${className ?? ''}`}
      style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.3s ease' }}
      aria-label="Dish N Dash hero"
    >
      {/* Subtle radial gradient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,215,96,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Bubble cluster */}
      <div className="relative" style={{ width: baseSize * 3, height: baseSize * 3 }}>
        {HERO_ITEMS.map((item, idx) => {
          const diameter = baseSize * item.size;
          return (
            <button
              key={item.id}
              ref={(el) => {
                bubblesRef.current[idx] = el;
              }}
              type="button"
              aria-label={item.ariaLabel}
              className="absolute rounded-full flex items-center justify-center cursor-pointer border-0 p-0 will-change-transform transition-none"
              style={{
                width: diameter,
                height: diameter,
                top: '50%',
                left: '50%',
                marginTop: -(diameter / 2),
                marginLeft: -(diameter / 2),
                backgroundColor: '#FFFFFF',
                color: '#0B2A20',
                boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
                fontSize: `clamp(0.75rem, ${item.size * 1.1}vw, 1.15rem)`,
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                zIndex: item.id === 'waitlist' ? 10 : 5,
                ['--hover-bg' as string]: item.hoverStyles.bgColor,
                ['--hover-color' as string]: item.hoverStyles.textColor,
              }}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              onClick={() => handleClick(idx)}
            >
              <span
                ref={(el) => {
                  labelRefs.current[idx] = el;
                }}
                className="inline-block text-center px-4 select-none"
                style={{ willChange: 'transform, opacity' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
