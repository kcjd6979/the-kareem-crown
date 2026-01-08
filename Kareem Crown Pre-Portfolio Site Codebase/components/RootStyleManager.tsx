'use client';

import { useEffect } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';

export function RootStyleManager() {
  const { isCustomCursorEnabled } = useAccessibility();

  useEffect(() => {
    const body = document.body;
    if (isCustomCursorEnabled) {
      body.classList.remove('custom-cursor-disabled');
    } else {
      body.classList.add('custom-cursor-disabled');
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      body.classList.remove('custom-cursor-disabled');
    };
  }, [isCustomCursorEnabled]);

  return null; // This component does not render anything
}
