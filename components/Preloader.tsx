'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const FALLBACK_TIMEOUT_MS = 5000;
const FADE_IN_MS = 700;
const FADE_OUT_MS = 650;

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dismissed = useRef(false);

  // Trigger fade-in on mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      onComplete();
    }, FADE_OUT_MS);
  }, [onComplete]);

  // Fallback timeout — never trap the user
  useEffect(() => {
    const timer = setTimeout(dismiss, FALLBACK_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [dismiss]);

  // Dismiss when video ends
  const handleEnded = useCallback(() => {
    dismiss();
  }, [dismiss]);

  // Handle video load failure — dismiss immediately
  const handleError = useCallback(() => {
    dismiss();
  }, [dismiss]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: '#050505',
        opacity: fading ? 0 : mounted ? 1 : 0,
        transition: `opacity ${fading ? FADE_OUT_MS : FADE_IN_MS}ms ease-in-out`,
        pointerEvents: fading ? 'none' : 'auto',
        overflow: 'hidden',
      }}
    >
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
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transform: 'translateZ(0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          imageRendering: 'auto',
          filter: 'contrast(1.05) saturate(1.05)',
        }}
      >
        <source src="/preloader/Preloader.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
