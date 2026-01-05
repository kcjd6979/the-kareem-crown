"use client";

/**
 * Fixed Bookmarking Lighting Effect
 * Creates a symmetrical white light bookmark effect at top and bottom of viewport
 * Visible across entire site, not tied to any specific section
 */

export function FixedLighting() {
  return (
    <>
      {/* === TOP WHITE LAMP LIGHT === */}
      {/* Fixed white ambient light that shines from above continuously */}
      <div 
        className="fixed pointer-events-none z-0"
        style={{
          left: '50%',
          top: '0%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '300px',
          background: 'radial-gradient(ellipse at center bottom, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
      
      {/* === BOTTOM WHITE LAMP LIGHT (Mirrored) === */}
      {/* Mirrored white ambient light at bottom to create bookmarking effect */}
      <div 
        className="fixed pointer-events-none z-0"
        style={{
          left: '50%',
          bottom: '0%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '300px',
          background: 'radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
    </>
  );
}
