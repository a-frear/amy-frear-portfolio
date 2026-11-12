import { css, keyframes } from 'styled-components';

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Hero intro: the title, subtitle, and Animate toggle fade up one after
// another once the slime has dropped in (~1s). Each element sets its own
// start time with --intro-delay.
// Pure CSS so it still shows if JavaScript is slow or off.
// Skipped for "reduce motion" users and when the Animate toggle is off
// (useHeroIntro drops the .animate-in class).
export const HeroIntro = css`
  &.animate-in {
    animation: ${fadeUp} 0.6s ease-out var(--intro-delay, 1s) both;
  }
  @media (prefers-reduced-motion: reduce) {
    &.animate-in {
      animation: none;
    }
  }
`;

// When the last piece (the toggle, at 1.4s) has finished fading in
export const HERO_INTRO_END_MS = 2100;
