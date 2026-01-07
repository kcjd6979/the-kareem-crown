/**
 * Scroll-driven animations hook
 * Provides scroll position tracking for parallax and reveal effects
 */
import { useRef, useEffect, useCallback } from 'react';
import { useMotionValue, useTransform, MotionValue } from 'framer-motion';

interface ScrollData {
  scrollY: MotionValue<number>;
  scrollProgress: MotionValue<number>;
  isScrolling: MotionValue<boolean>;
}

export function useScrollTracking(containerRef: React.RefObject<HTMLElement>): ScrollData {
  const scrollY = useMotionValue(0);
  const scrollProgress = useMotionValue(0);
  const isScrolling = useMotionValue(false);
  const lastScrollTime = useRef<number>(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleScroll = () => {
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;

      // Detect scrolling state (with debounce)
      if (timeSinceLastScroll > 100) {
        isScrolling.set(true);
        lastScrollTime.current = now;

        // Reset scrolling state after scroll stops
        clearTimeout((window as unknown as { scrollTimeout: NodeJS.Timeout }).scrollTimeout);
        (window as unknown as { scrollTimeout: NodeJS.Timeout }).scrollTimeout = setTimeout(() => {
          isScrolling.set(false);
        }, 150);
      }

      // Update scroll Y
      const currentScroll = element.scrollTop || window.scrollY;
      scrollY.set(currentScroll);

      // Calculate scroll progress (0 to 1)
      const maxScroll = element.scrollHeight - element.clientHeight;
      const progress = maxScroll > 0 ? currentScroll / maxScroll : 0;
      scrollProgress.set(progress);
    };

    const currentElement = element === document.documentElement ? window : element;
    currentElement.addEventListener('scroll', handleScroll, { passive: true });

    // Initial calculation
    handleScroll();

    return () => {
      currentElement.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY, scrollProgress, isScrolling, containerRef]);

  return { scrollY, scrollProgress, isScrolling };
}

/**
 * Parallax effect hook
 * Creates smooth parallax movement based on scroll
 */
export function useParallax(
  scrollData: ScrollData,
  speed: number = 0.5,
  reverse: boolean = false
): MotionValue<number> {
  const { scrollY } = scrollData;
  const multiplier = reverse ? -speed : speed;

  return useTransform(scrollY, [0, 1000], [0, 1000 * multiplier]);
}

/**
 * Reveal on scroll hook
 * Triggers animations when elements enter viewport
 */
export function useReveal(
  threshold: number = 0.1
): [React.RefObject<HTMLElement>, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, isVisible];
}

export default useScrollTracking;
