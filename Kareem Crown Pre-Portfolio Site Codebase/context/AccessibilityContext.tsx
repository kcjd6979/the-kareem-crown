'use client';

import React, { createContext, useState, useContext, ReactNode, FC } from 'react';

// Define the shape of the context state
interface AccessibilityContextState {
  isCustomCursorEnabled: boolean;
  toggleCustomCursor: () => void;
}

// Create the context with a default value
const AccessibilityContext = createContext<AccessibilityContextState | undefined>(undefined);

// Create the provider component
export const AccessibilityProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCustomCursorEnabled, setIsCustomCursorEnabled] = useState(true); // Enabled by default

  const toggleCustomCursor = () => {
    setIsCustomCursorEnabled(prevState => !prevState);
  };

  const value = {
    isCustomCursorEnabled,
    toggleCustomCursor,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Create a custom hook to use the accessibility context
export const useAccessibility = (): AccessibilityContextState => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
