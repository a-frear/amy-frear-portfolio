import { useContext } from 'react';
import { ReducedMotionContext } from '../context/context';

/*
 * Click handler for in-page links (like "#services"): glides down to the
 * section when Animate is on, and jumps straight there when it's off.
 *
 * It also updates the URL (so the link can be shared or bookmarked) and
 * moves keyboard focus to the section, so Tab carries on from there.
 */
// Gap left between the top of the screen and the section's heading
const SPACE_ABOVE = 40;

export function useScrollToSection() {
  const { animation } = useContext(ReducedMotionContext);

  return (event) => {
    const hash = event.currentTarget.getAttribute('href');
    const target = hash ? document.querySelector(hash) : null;
    if (!target) return; // Let the browser handle it as usual

    event.preventDefault();
    // Wait a tick: when picked from the site menu, the menu closes first,
    // which unlocks scrolling and lets the page take focus again
    window.setTimeout(() => {
      // Measure with offsetTop, which ignores transforms: sections waiting
      // to fade in sit 40px lower until they appear, and we want where
      // they'll end up. Leave a little room above the heading.
      let top = 0;
      for (let el = target; el; el = el.offsetParent) top += el.offsetTop;
      window.scrollTo({
        top: Math.max(0, top - SPACE_ABOVE),
        behavior: animation ? 'smooth' : 'auto',
      });
      window.history.pushState(null, '', hash);

      // Move focus without jumping (sections aren't normally focusable)
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });
    }, 0);
  };
}
