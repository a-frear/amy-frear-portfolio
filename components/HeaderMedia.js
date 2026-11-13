import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import VideoBG from './VideoBG';
import { ReducedMotionContext } from '../context/context';
import { breakpoints } from '../styles/breakpoints';

/*
 * The hero fills the screen, but its height is measured once and then
 * locked (as --hero-height on <html>), instead of following the screen.
 *
 * Why: on phones the browser toolbars slide away when you start scrolling,
 * which makes the screen taller. Chrome on iPhone even changes the page's
 * own size when that happens, so every CSS screen unit (vh, lvh, dvh)
 * changes too. A hero tied to the screen height then grows mid-scroll,
 * which zooms the video and makes the page jump.
 *
 * On touch screens the height is only re-measured when the width changes
 * (rotating the phone), never when only the height does. On desktop it
 * follows the window as usual.
 */
function useLockedHeroHeight() {
  useEffect(() => {
    const root = document.documentElement;
    // Only touch screens have sliding toolbars; desktop always follows the
    // window
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    let lastWidth = 0;
    const measure = () => {
      if (isTouch && window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      root.style.setProperty('--hero-height', `${window.innerHeight}px`);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
}

export default function HeaderMedia() {
  const { animation } = useContext(ReducedMotionContext);
  useLockedHeroHeight();
  return (
    <IntroSection isAnimation={animation}>
      <VideoBG isAnimation={animation} />
    </IntroSection>
  );
}

const IntroSection = styled.section`
  /* Locked full-screen height (see useLockedHeroHeight). Before the page
     has loaded, it falls back to the screen height. */
  height: 100vh;
  height: var(--hero-height, 100lvh);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position-x: 70%;
  @media (min-width: ${breakpoints.tablet}) {
    background-position-x: unset;
  }
`;
