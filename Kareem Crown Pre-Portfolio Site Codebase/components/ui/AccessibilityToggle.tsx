'use client';

import React from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { MousePointer, MousePointerOff } from 'lucide-react';

export function AccessibilityToggle() {
  const { isCustomCursorEnabled, toggleCustomCursor } = useAccessibility();

  return (
    <button
      onClick={toggleCustomCursor}
      className="fixed bottom-4 right-4 z-50 p-3 bg-gray-800/60 text-white rounded-full border border-white/20 backdrop-blur-sm transition-all hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
      aria-label={isCustomCursorEnabled ? 'Disable custom cursor' : 'Enable custom cursor'}
      title={isCustomCursorEnabled ? 'Disable Custom Cursor' : 'Enable Custom Cursor'}
    >
      {isCustomCursorEnabled ? (
        <MousePointerOff className="h-6 w-6" />
      ) : (
        <MousePointer className="h-6 w-6" />
      )}
    </button>
  );
}
