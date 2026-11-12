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

export const SectionHeading = css`
  ${HeadingBase}
  color: ${green};
`;
