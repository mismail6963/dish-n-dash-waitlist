'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const FALLBACK_TIMEOUT_MS = 8000;
const FADE_DURATION_MS = 600;

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dismissed = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      onComplete();
    }, FADE_DURATION_MS);
  }, [onComplete]);

  // Fallback timeout so the preloader never traps the user
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
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#050505',
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        onError={handleError}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
        }}
      >
        <source src="/preloader/Preloader.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
