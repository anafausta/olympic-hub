import { useEffect, useRef, useState, useCallback } from 'react';

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes per RF135

export const useInactivityTimer = (onTimeout) => {
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowWarning(false);

    timeoutRef.current = setTimeout(() => {
      setShowWarning(true);
      if (onTimeout) onTimeout();
    }, INACTIVITY_TIMEOUT_MS);
  }, [onTimeout]);

  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    resetTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [resetTimer]);

  return { showWarning, resetTimer };
};
