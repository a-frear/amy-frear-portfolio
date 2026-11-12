import { useContext, useEffect, useState } from 'react';
import { ReducedMotionContext } from '../context/context';

// When the hero intro fade (1s delay + 0.6s fade) has finished
const INTRO_END_MS = 1700;

/*
 * Returns the class that plays the hero intro fade (see SubtitleIntro in
 * styles/animations.js), or undefined.
 *
 * The intro only plays once per page load. After it finishes, or if
 * Animate is off, the class is dropped for good, so flipping the Animate
 * toggle later doesn't hide the header pieces and fade them in again.
 */
export function useHeroIntro() {
  const { animation, mounted } = useContext(ReducedMotionContext);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!mounted || done) return undefined;
    if (!animation) {
      setDone(true);
      return undefined;
    }
    const timer = setTimeout(() => setDone(true), INTRO_END_MS);
    return () => clearTimeout(timer);
  }, [mounted, animation, done]);

  return animation && !done ? 'animate-in' : undefined;
}
