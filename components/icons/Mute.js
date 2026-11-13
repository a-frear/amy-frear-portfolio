import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { green, black } from '../../styles/colors';

export default function Mute({ isMuted = true, color = green }) {
  // Unique per icon, so ids never clash with other SVGs on the page
  const shadowId = `${useId()}-shadow`;
  return (
    <svg
      aria-hidden="true"
      height="800px"
      width="800px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 55 55"
    >
      <defs>
        <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
          <feOffset dx="0" dy="0.6" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Green disc with a black border, and the speaker and sound waves
          drawn as black lines, matching the play and pause buttons (and
          the menu and Animate buttons) */}
      <g filter={`url(#${shadowId})`}>
        <circle
          cx="27.27"
          cy="27.27"
          r="21.5"
          fill={color}
          stroke={black}
          strokeWidth="3.4"
        />
        <g
          fill="none"
          stroke={black}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Speaker */}
          <path d="M16.5 23h3.5l5.5-4.5v17.5l-5.5-4.5h-3.5z" />
          {/* Sound waves */}
          <path d="M30 23.5a5.5 5.5 0 0 1 0 7.5" />
          <path d="M33.5 19.5a11 11 0 0 1 0 15.5" />
          {isMuted && (
            <>
              {/* Slash, with a green gap so it reads over the speaker */}
              <line
                x1="16"
                y1="16"
                x2="38.5"
                y2="38.5"
                stroke={color}
                strokeWidth="7"
              />
              <line x1="16" y1="16" x2="38.5" y2="38.5" />
            </>
          )}
        </g>
      </g>
    </svg>
  );
}

Mute.propTypes = {
  isMuted: PropTypes.bool,
  color: PropTypes.string,
};
