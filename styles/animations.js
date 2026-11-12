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

// Hero subtitle: fades up once the slime has dropped in (~1s).
// Pure CSS so it still shows if JavaScript is slow or off.
// Skipped for "reduce motion" users and when the Animate toggle is off
// (the component drops the .animate-in class).
export const SubtitleIntro = css`
  &.animate-in {
    animation: ${fadeUp} 0.6s ease-out 1s both;
  }
  @media (prefers-reduced-motion: reduce) {
    &.animate-in {
      animation: none;
    }
  }
`;
