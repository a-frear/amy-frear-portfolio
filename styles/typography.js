import { css } from 'styled-components';
import { green } from './colors';
import { breakpoints } from './breakpoints';

export const HeadingBase = css`
  font-size: clamp(52px, 8vw, 76px);
  font-family: 'Bowlby One SC';
`;

// Body copy for the Intro, About, and Contact sections.
// 20px on phones (Fjalla One is narrow, so it reads small below that),
// growing to 27px on wide screens. The site-wide paragraph size is
// 20px–32px.
export const BodyTextSize = css`
  font-size: clamp(20px, 1.7vw, 27px);
`;

// Smaller supporting text, like the Services item descriptions.
// Scales with the screen like BodyTextSize, at about 82% of its size,
// so it's always the smaller of the two (18px–22px vs 20px–27px).
export const SmallBodyTextSize = css`
  font-size: clamp(18px, 1.4vw, 22px);
`;

export const SectionHeading = css`
  ${HeadingBase}
  color: ${green};
`;

// Body paragraphs on phones: fully justified in a centered column, capped
// at a comfortable reading width. No hyphenation, so words are never
// broken (lines can have wider gaps between words instead).
export const MobileJustified = css`
  @media (max-width: ${parseInt(breakpoints.tablet, 10) - 0.02}px) {
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;
    text-align: justify;
  }
`;
