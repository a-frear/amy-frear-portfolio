import { useContext, useEffect, useState } from 'react';
import { ReducedMotionContext } from '../context/context';
import { HERO_INTRO_END_MS } from '../styles/animations';

// Returns the class that plays the hero intro fade, or undefined.
// The intro only plays once per page load: after it finishes (or if
// animation is off), the class is dropped for good, so flipping the
// Animate toggle later doesn't hide and replay the header.
export function useHeroIntro() {
  const { animation, mounted } = useContext(ReducedMotionContext);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!mounted || done) return undefined;
    if (!animation) {
      setDone(true);
      return undefined;
    }
    const timer = setTimeout(() => setDone(true), HERO_INTRO_END_MS);
    return () => clearTimeout(timer);
  }, [mounted, animation, done]);

  return animation && !done ? 'animate-in' : undefined;
}
