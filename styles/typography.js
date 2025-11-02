import { css } from 'styled-components';
import { green } from './colors';

export const HeadingBase = css`
  font-size: clamp(52px, 8vw, 76px);
  font-family: 'Bowlby One SC';
  text-shadow: -2px 2px 0 #000, 2px 2px 0 #000, 2px -2px 0 #000,
    -2px -2px 0 #000;
`;

export const SectionHeading = css`
  ${HeadingBase}
  color: ${green};
`;
