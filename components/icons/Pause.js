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
      {/* Dark backing, so the cut-out bars are always dark (not see-
          through), whatever the video behind it is showing */}
      <circle cx="256" cy="256" r="200" fill={black} />
      <path
        d="M256,0C114.617,0,0,114.615,0,256s114.617,256,256,256s256-114.615,256-256S397.383,0,256,0z M224,320
	c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z M352,320
	c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z"
        filter={`url(#${shadowId})`}
      />
    </svg>
  );
}

Pause.propTypes = {
  color: PropTypes.string,
};
