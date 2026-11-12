import { css } from 'styled-components';
import { green } from './colors';

export const HeadingBase = css`
  font-size: clamp(52px, 8vw, 76px);
  font-family: 'Bowlby One SC';
`;

// Body copy for the Intro, About, and Contact sections.
// A touch smaller than the site-wide paragraph size (20px–32px).
export const BodyTextSize = css`
  font-size: clamp(18px, 1.7vw, 27px);
`;

// Smaller supporting text, like the Services item descriptions.
// Scales with the screen like BodyTextSize, at about 82% of its size,
// so it's always the smaller of the two (16px–22px vs 18px–27px).
export const SmallBodyTextSize = css`
  font-size: clamp(16px, 1.4vw, 22px);
`;

export const SectionHeading = css`
  ${HeadingBase}
  color: ${green};
`;
