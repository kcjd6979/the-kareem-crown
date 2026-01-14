// components/CursorToggle.tsx
'use client';

import { useState, useEffect } from 'react';

export default function CursorToggle() {
  const [useRocketCursor, setUseRocketCursor] = useState(true);

  useEffect(() => {
    // Store preference in localStorage
    const stored = localStorage.getItem('rocketCursor');
    if (stored !== null) {
      setUseRocketCursor(stored === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rocketCursor', String(useRocketCursor));

    // Toggle cursor visibility
    const cursorElement = document.querySelector('.rocket-cursor-container') as HTMLElement;
    if (cursorElement) {
      cursorElement.style.display = useRocketCursor ? 'block' : 'none';
    }

    // Toggle native cursor
    if (useRocketCursor) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'auto';
    }
  }, [useRocketCursor]);

  return (
    <div className="cursor-toggle">
      <style jsx>{`
        .cursor-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 999998;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 24px;
          border: 1px solid rgba(255, 215, 0, 0.3);
          transition: all 0.3s ease;
        }

        .cursor-toggle:hover {
          border-color: rgba(255, 215, 0, 0.6);
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
        }

        .toggle-label {
          font-size: 12px;
          color: rgba(255, 215, 0, 0.9);
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .toggle-switch {
          position: relative;
          width: 44px;
          height: 24px;
          background: ${useRocketCursor ? 'rgba(255, 215, 0, 0.3)' : 'rgba(128, 128, 128, 0.3)'};
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.3s ease;
          border: 1px solid ${useRocketCursor ? 'rgba(255, 215, 0, 0.5)' : 'rgba(128, 128, 128, 0.5)'};
        }

        .toggle-switch:hover {
          background: ${useRocketCursor ? 'rgba(255, 215, 0, 0.4)' : 'rgba(128, 128, 128, 0.4)'};
        }

        .toggle-slider {
          position: absolute;
          top: 2px;
          left: ${useRocketCursor ? '22px' : '2px'};
          width: 18px;
          height: 18px;
          background: ${useRocketCursor ? 'linear-gradient(135deg, #FFD700, #FFA500)' : '#808080'};
          border-radius: 50%;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .rocket-icon {
          font-size: 14px;
        }
      `}</style>

      <span className="toggle-label">
        {useRocketCursor ? '🚀' : '🖱️'} Cursor
      </span>
      <div
        className="toggle-switch"
        onClick={() => setUseRocketCursor(!useRocketCursor)}
        role="button"
        aria-label="Toggle cursor style"
      >
        <div className="toggle-slider" />
      </div>
    </div>
  );
}