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
      {/* A solid green disc with a dark speaker, like the play button, so
          the icon is always visible over the video (a thin green outline
          disappeared over light parts of the video) */}
      <circle
        cx="27.27"
        cy="27.27"
        r="23.27"
        fill={color}
        filter={`url(#${shadowId})`}
      />
      {isMuted ? (
        // Muted speaker with an X through it
        <g fill={black}>
          <path d="M25.01,17.68c-1.16-.63-2.57-.57-3.67.14l-2.50,1.62h-1.62c-1.98,0-3.59,1.61-3.59,3.59v8.49c0,1.98,1.61,3.59,3.59,3.59h1.62l2.50,1.62c.59,.38,1.27,.58,1.95,.58,.59,0,1.18-.15,1.71-.44,1.16-.63,1.88-1.84,1.88-3.16v-12.88c0-1.32-.72-2.53-1.88-3.16Zm-1.53,16.03l-.29,.15-2.92-1.89c-.28-.18-.60-.27-.93-.27h-2.13c-.10,0-.19-.08-.19-.19v-8.49c0-.10,.08-.19,.19-.19h2.13c.33,0,.65-.09,.93-.27l2.92-1.89,.29,.15v12.88Z" />
          <path d="M30.73,19.89c-.84-.44-1.86-.12-2.30.71c-.44,.83-.12,1.86,.71,2.30,1.62,.85,2.62,2.52,2.62,4.36s-1.01,3.52-2.64,4.37c-.83,.44-1.15,1.47-.72,2.30,.30,.58,.90,.91,1.51,.91,.27,0,.54-.06,.79-.20,2.75-1.44,4.46-4.27,4.46-7.39s-1.70-5.93-4.43-7.37Z" />
          <path d="M35.84,17.55c-.77-.54-1.83-.36-2.38.41c-.54,.77-.36,1.83,.41,2.37,2.25,1.59,3.59,4.18,3.59,6.94,0,2.77-1.36,5.38-3.64,6.97c-.77,.54-.96,1.60-.42,2.37,.33,.47,.86,.73,1.40,.73,.34,0,.68-.10,.97-.31,3.19-2.23,5.09-5.88,5.09-9.76,0-3.86-1.88-7.50-5.03-9.74Z" />
          <line
            x1="12.5"
            y1="12.5"
            x2="42"
            y2="42"
            stroke={black}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      ) : (
        // Speaker with sound waves
        <g fill={black}>
          <path d="M25.01,17.68c-1.16-.63-2.57-.57-3.67.14l-2.50,1.62h-1.62c-1.98,0-3.59,1.61-3.59,3.59v8.49c0,1.98,1.61,3.59,3.59,3.59h1.62l2.50,1.62c.59,.38,1.27,.58,1.95,.58,.59,0,1.18-.15,1.71-.44,1.16-.63,1.88-1.84,1.88-3.16v-12.88c0-1.32-.72-2.53-1.88-3.16Zm-1.53,16.03l-.29,.15-2.92-1.89c-.28-.18-.60-.27-.93-.27h-2.13c-.10,0-.19-.08-.19-.19v-8.49c0-.10,.08-.19,.19-.19h2.13c.33,0,.65-.09,.93-.27l2.92-1.89,.29,.15v12.88Z" />
          <path d="M30.73,19.89c-.84-.44-1.86-.12-2.30.71c-.44,.83-.12,1.86,.71,2.30,1.62,.85,2.62,2.52,2.62,4.36s-1.01,3.52-2.64,4.37c-.83,.44-1.15,1.47-.72,2.30,.30,.58,.90,.91,1.51,.91,.27,0,.54-.06,.79-.20,2.75-1.44,4.46-4.27,4.46-7.39s-1.70-5.93-4.43-7.37Z" />
          <path d="M35.84,17.55c-.77-.54-1.83-.36-2.38.41c-.54,.77-.36,1.83,.41,2.37,2.25,1.59,3.59,4.18,3.59,6.94,0,2.77-1.36,5.38-3.64,6.97c-.77,.54-.96,1.60-.42,2.37,.33,.47,.86,.73,1.40,.73,.34,0,.68-.10,.97-.31,3.19-2.23,5.09-5.88,5.09-9.76,0-3.86-1.88-7.50-5.03-9.74Z" />
        </g>
      )}
    </svg>
  );
}

Mute.propTypes = {
  isMuted: PropTypes.bool,
  color: PropTypes.string,
};
