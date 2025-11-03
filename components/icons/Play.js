import React from 'react';
import PropTypes from 'prop-types';
import { green } from '../../styles/colors';

export default function Play({ color = green }) {
  return (
    <svg
      aria-hidden="true"
      fill={color}
      height="800px"
      width="800px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <defs>
        <filter id="slimeShadow" x="-50%" y="-50%" width="200%" height="200%">
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
      <g filter="url(#slimeShadow)">
        <g>
          <path
            d="M256,0C114.511,0,0,114.497,0,256c0,141.49,114.495,256,256,256c141.49,0,256-114.497,256-256C512,114.51,397.503,0,256,0
			z M348.238,284.418l-120.294,69.507c-10.148,5.864-22.661,5.874-32.826,0.009c-10.158-5.862-16.415-16.699-16.415-28.426V186.493
			c0-11.728,6.258-22.564,16.415-28.426c5.076-2.93,10.741-4.395,16.406-4.395c5.67,0,11.341,1.468,16.42,4.402l120.295,69.507
			c10.149,5.864,16.4,16.696,16.4,28.418C364.639,267.722,358.387,278.553,348.238,284.418z"
          />
        </g>
      </g>
    </svg>
  );
}

Play.propTypes = {
  color: PropTypes.string,
};
