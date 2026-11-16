import { useState, useEffect, useRef } from 'react';

export const useSimuladoTimer = ({
  initialSeconds = 0,
  isActive = false,
  onTimeUp = () => {}
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setRemainingSeconds(initialSeconds);
    setElapsedSeconds(0);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);

      if (initialSeconds > 0) {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, initialSeconds, onTimeUp]);

  return {
    remainingSeconds,
    elapsedSeconds,
    isWarning: initialSeconds > 0 && remainingSeconds <= 300 // Last 5 minutes warning
  };
};
