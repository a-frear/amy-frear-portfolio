import { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/*
 * Smooth outlined display text.
 *
 * CSS text outlines (-webkit-text-stroke) always use sharp "miter" corners,
 * which turn into little spikes on Bowlby One's slightly rough letter shapes.
 * SVG text can round those corners (stroke-linejoin: round), so each word is
 * drawn as SVG on top of the real text:
 *
 *  - The real HTML text stays in the page (transparent) so the layout,
 *    wrapping, text selection, and screen readers all work as normal.
 *  - Each word gets its own SVG copy, so long headings can still wrap.
 *  - The SVG uses the heading's own font, size, and color (currentColor).
 */

// Where the baseline sits in a 1em-tall line box for Bowlby One SC
// (font ascent 1.10em, descent 0.43em, centered in the box).
const BASELINE = '0.835em';

export default function OutlinedText({
  children,
  outline = 2.5,
  outlineColor = '#000',
}) {
  const words = String(children).split(' ');

  return (
    <>
      {words.map((word, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={`${word}-${i}`}>
          <Word>
            <Sizer>{word}</Sizer>
            <Svg aria-hidden="true" focusable="false">
              <text
                x="0"
                y={BASELINE}
                fill="currentColor"
                stroke={outlineColor}
                strokeWidth={outline * 2}
                strokeLinejoin="round"
                strokeLinecap="round"
                paintOrder="stroke fill"
              >
                {word}
              </text>
            </Svg>
          </Word>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}

OutlinedText.propTypes = {
  children: PropTypes.string.isRequired,
  outline: PropTypes.number,
  outlineColor: PropTypes.string,
};

const Word = styled.span`
  position: relative;
  display: inline-block;
  font: inherit;
  line-height: 1;
`;

const Sizer = styled.span`
  font: inherit;
  color: transparent;
  -webkit-text-stroke: 0;
`;

const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
  font: inherit;
`;
