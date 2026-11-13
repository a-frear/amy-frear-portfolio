import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { green, black } from '../../styles/colors';

export default function Play({ color = green }) {
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
      <g filter={`url(#${shadowId})`}>
        {/* Green disc with a black border and a black outlined triangle,
            in the same proportions as the menu and Animate buttons (a 3px
            line on a 48px button) */}
        <circle cx="256" cy="256" r="224" stroke={black} strokeWidth="32" />
        <path
          d="M348.238,284.418l-120.294,69.507c-10.148,5.864-22.661,5.874-32.826,0.009c-10.158-5.862-16.415-16.699-16.415-28.426V186.493c0-11.728,6.258-22.564,16.415-28.426c5.076-2.93,10.741-4.395,16.406-4.395c5.67,0,11.341,1.468,16.42,4.402l120.295,69.507c10.149,5.864,16.4,16.696,16.4,28.418C364.639,267.722,358.387,278.553,348.238,284.418z"
          fill="none"
          stroke={black}
          strokeWidth="32"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

Play.propTypes = {
  color: PropTypes.string,
};
