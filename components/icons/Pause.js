import React from 'react';
import PropTypes from 'prop-types';
import { green } from '../../styles/colors';

export default function Pause({ color = green }) {
  return (
    <svg
      aria-hidden="true"
      fill={color}
      height="800px"
      width="800px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        d="M256,0C114.617,0,0,114.615,0,256s114.617,256,256,256s256-114.615,256-256S397.383,0,256,0z M224,320
	c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z M352,320
	c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z"
      />
    </svg>
  );
}

Pause.propTypes = {
  color: PropTypes.string,
};
