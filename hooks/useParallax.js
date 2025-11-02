import { useContext, useRef, useEffect, useState } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { ReducedMotionContext } from '../context/context';

/**
 * Custom hook for parallax scroll effect
 * Creates an "element rising up to meet you" effect
 * Elements rise from below and settle into their final positions
 * Respects the ReducedMotionContext setting
 *
 * @param {number} intensity - The parallax intensity multiplier (default 0.08 for subtle effect)
 * @returns {object} - Motion animation values for y position
 *
 * Usage:
 * const ref = useRef(null);
 * const y = useParallax(0.08, ref);
 * <motion.div ref={ref} style={{ y }}>Content</motion.div>
 */
export function useParallax(intensity = 0.08, elementRef = null) {
  const { animation } = useContext(ReducedMotionContext);
  const { scrollY } = useScroll();
  const [elementTop, setElementTop] = useState(0);

  // Get the element's position in the viewport
  useEffect(() => {
    if (elementRef?.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY;
      setElementTop(rect.top + scrollTop);
    }
  }, [elementRef]);

  // Always create the transform, but use 0 intensity if animations are disabled
  const effectiveIntensity = animation ? intensity : 0;

  // Create parallax effect that:
  // 1. Before element reaches viewport: element rises up
  // 2. At element position: no more upward movement
  // The element starts offset downward and moves up as you scroll to it
  const y = useTransform(scrollY, (latest) => {
    // Calculate how far away the element is from being in view
    const distanceToElement = elementTop - latest;

    // If we haven't reached the element yet, offset it downward
    // As we scroll closer, the offset decreases (element moves up)
    if (distanceToElement > 0) {
      return distanceToElement * effectiveIntensity;
    }
    // Once we've scrolled past the element, no more movement
    return 0;
  });

  return y;
}
