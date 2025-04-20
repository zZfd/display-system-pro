import { useRef, useState } from 'react';

interface UseMultipleTapOptions {
  tapsRequired?: number;
  timeThreshold?: number;
  onTriggered?: () => void;
}

export const useMultipleTap = ({
  tapsRequired = 3,
  timeThreshold = 1000,
  onTriggered,
}: UseMultipleTapOptions = {}) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const tapRef = useRef({ lastTapTime: 0, tapCount: 0 });

  const handleTap = () => {
    const currentTime = Date.now();
    if (
      tapRef.current.lastTapTime &&
      currentTime - tapRef.current.lastTapTime > timeThreshold
    ) {
      tapRef.current.tapCount = 0;
      tapRef.current.lastTapTime = 0;
    } else {
      tapRef.current.tapCount++;
      tapRef.current.lastTapTime = currentTime;
      if (tapRef.current.tapCount >= tapsRequired) {
        setIsTriggered(prev => !prev);
        onTriggered?.();
        tapRef.current.tapCount = 0;
        tapRef.current.lastTapTime = 0;
      }
    }
  };

  return {
    isTriggered,
    setIsTriggered,
    handleTap,
  };
};