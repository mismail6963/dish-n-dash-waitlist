'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_TIMEOUT_MS = 5000;
const FADE_IN_DURATION = 0.95;
const FADE_OUT_DURATION = 0.8;

const CINEMATIC_EASE = [0.25, 0.1, 0.25, 1.0] as const;

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dismissed = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    setShow(false);
  }, []);

  // Fallback timeout — never trap the user
  useEffect(() => {
    const timer = setTimeout(dismiss, FALLBACK_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [dismiss]);

  const handleEnded = useCallback(() => dismiss(), [dismiss]);
  const handleError = useCallback(() => dismiss(), [dismiss]);

  return (
    <AnimatePresence
      onExitComplete={onComplete}
    >
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: FADE_IN_DURATION,
            ease: CINEMATIC_EASE,
          }}
          // Override transition on exit
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#050505',
            overflow: 'hidden',
          }}
        >
          {/* Exit uses its own transition */}
          <motion.div
            key="preloader-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: FADE_OUT_DURATION,
              ease: CINEMATIC_EASE,
            }}
            style={{
              position: 'absolute',
              inset: 0,
            }}
          >
            {/* Video layer */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={handleEnded}
              onError={handleError}
              style={{
                display: 'block',
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'translateZ(0)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                filter: 'contrast(1.04) saturate(1.05)',
              }}
            >
              <source src="/preloader/Preloader.mp4" type="video/mp4" />
            </video>

            {/* Radial emerald glow — centered ambient light */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(14, 122, 95, 0.08) 0%, rgba(14, 122, 95, 0.03) 40%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Vignette — dark edge framing */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 50%, rgba(5, 5, 5, 0.45) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Subtle noise/grain overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.03,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '128px 128px',
                pointerEvents: 'none',
                mixBlendMode: 'overlay',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
