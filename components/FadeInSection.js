import { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, useInView } from 'motion/react';
import { ReducedMotionContext } from '../context/context';

const HIDDEN = { opacity: 0, y: 40 };
const SHOWN = { opacity: 1, y: 0 };

/*
 * Fades a section up the first time it scrolls into view.
 *
 * - Only when the Animate toggle is on. Turning it off shows everything.
 * - Content is visible in the server HTML, so nothing is hidden if
 *   JavaScript is slow or off. Sections below the fold are hidden right
 *   after the page loads (off screen, so you never see it happen); anything
 *   already on screen at that point is left alone, so there's no flash.
 * - Each section only fades in once per visit.
 */
export default function FadeInSection({ children }) {
  const ref = useRef(null);
  const { animation, mounted } = useContext(ReducedMotionContext);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  // 'idle' = untouched, 'hidden' = waiting below the fold, 'shown' = faded in
  const [phase, setPhase] = useState('idle');

  // Once we know the Animate setting, hide sections that are below the fold
  useEffect(() => {
    if (!mounted || phase === 'shown') return;
    if (!animation) {
      setPhase('idle');
      return;
    }
    const { top } = ref.current.getBoundingClientRect();
    setPhase(top < window.innerHeight ? 'shown' : 'hidden');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, animation]);

  // Fade up when it scrolls into view
  useEffect(() => {
    if (inView && phase === 'hidden') setPhase('shown');
  }, [inView, phase]);

  const hidden = animation && phase === 'hidden';

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={hidden ? HIDDEN : SHOWN}
      transition={
        hidden || !animation
          ? { duration: 0 }
          : { duration: 0.8, ease: 'easeOut' }
      }
    >
      {children}
    </motion.div>
  );
}

FadeInSection.propTypes = {
  children: PropTypes.node.isRequired,
};
