import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { green, black } from '../../styles/colors';

export default function Pause({ color = green }) {
  // Unique per icon, so ids never clash with other SVGs on the page
  const shadowId = `${useId()}-shadow`;
  return (
    <svg
      aria-hidden="true"
      fill={color}
      height="800px"
      width="800px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <defs>
        <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
          <feOffset dx="0" dy="3" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Green disc with a black border and two black outlined bars,
          matching the play button (and the menu and Animate buttons) */}
      <g filter={`url(#${shadowId})`}>
        <circle cx="256" cy="256" r="224" stroke={black} strokeWidth="32" />
        <g fill="none" stroke={black} strokeWidth="32">
          <rect x="160" y="176" width="56" height="160" rx="22" />
          <rect x="296" y="176" width="56" height="160" rx="22" />
        </g>
      </g>
    </svg>
  );
}

Pause.propTypes = {
  color: PropTypes.string,
};
