import React from 'react';
import PropTypes from 'prop-types';

export default function Hamburger({ color = 'black' }) {
  return (
    <svg
      width="30"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="40" y1="0.5" y2="0.5" stroke={color} strokeWidth="4px" />
      <line x1="40" y1="14.5" y2="14.5" stroke={color} strokeWidth="4px" />
      <line x1="40" y1="29.5" y2="29.5" stroke={color} strokeWidth="4px" />
    </svg>
  );
}

Hamburger.propTypes = {
  color: PropTypes.string,
};
