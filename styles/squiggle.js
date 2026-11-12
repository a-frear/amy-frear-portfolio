import { css } from 'styled-components';
import { black } from './colors';

/*
 * The same wave as the menu button's wiggly lines (MenuButton.js draws
 * `q2.5-3 5 0t5 0`), as one 10-unit tile that repeats seamlessly.
 */
const tile = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 1 10 6"><path d="M0 4q2.5-3 5 0t5 0" fill="none" stroke="${black}" stroke-width="2.5"/></svg>`
);

/*
 * Wavy underline for links on hover and keyboard focus. Draws in from the
 * left when Animate is on, and shows instantly when it's off. Expects the
 * link to be position: relative, with 16px of side padding.
 */
export const SquiggleUnderline = css`
  &::after {
    content: '';
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 4px;
    height: 6px;
    background: url('data:image/svg+xml,${tile}') repeat-x left center / 10px
      6px;
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
