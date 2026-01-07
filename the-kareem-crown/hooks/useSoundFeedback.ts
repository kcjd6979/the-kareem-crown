"use client";

import { useCallback } from 'react';
import { playInteractionSound, triggerSignatureMoment } from './SoundManager';

/**
 * Hook for adding audio feedback to interactive elements
 */
export function useSoundFeedback() {
  const playHover = useCallback(() => {
    playInteractionSound('hover');
  }, []);

  const playClick = useCallback(() => {
    playInteractionSound('click');
  }, []);

  const playSignature = useCallback(() => {
    triggerSignatureMoment();
  }, []);

  return { playHover, playClick, playSignature };
}

// Default export with helper functions
export default useSoundFeedback;
