import { css } from 'styled-components';
import { black } from './colors';

/*
 * The same wave as the menu button's wiggly lines (MenuButton.js draws
 * `q2.5-3 5 0t5 0`), drawn as one long unbroken line (40 waves, 400px)
 * rather than a small repeating tile. Repeating tiles left little notches
 * where they met, because the thick line was cut off right where the wave
 * is steepest.
 */
const WAVES = 40;
const wavePath = `M0 4q2.5-3 5 0${'t5 0'.repeat(WAVES * 2 - 1)}`;
const wave = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 1 ${
    WAVES * 10
  } 6"><path d="${wavePath}" fill="none" stroke="${black}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
);

/*
 * Wavy underline for links on hover and keyboard focus. Draws in from the
 * left when Animate is on, and shows instantly when it's off. Expects the
 * link to be position: relative, with 16px of side padding. The underline
 * is cut to the link's width, so it works for any link up to 400px wide.
 */
export const SquiggleUnderline = css`
  &::after {
    content: '';
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 4px;
    height: 6px;
    background: url('data:image/svg+xml,${wave}') no-repeat left center /
      ${WAVES * 10}px 6px;
    clip-path: inset(0 100% 0 0);
    transition: ${(props) =>
      props.animation ? 'clip-path 0.3s ease-out' : 'none'};
    pointer-events: none;
  }
  &:hover::after,
  &:focus-visible::after {
    clip-path: inset(0 0 0 0);
  }
  @media (prefers-reduced-motion: reduce) {
    &::after {
      transition: none;
    }
  }
`;
