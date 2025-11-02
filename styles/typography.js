import { css } from 'styled-components';
import { green } from './colors';

// Base heading styles - font, size, and text shadow
export const HeadingBase = css`
  font-size: clamp(52px, 8vw, 76px);
  font-family: 'Bowlby One SC';
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
`;

// Section heading with green color (used in Intro and About)
export const SectionHeading = css`
  ${HeadingBase}
  color: ${green};
`;
