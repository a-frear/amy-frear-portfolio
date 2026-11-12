import { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { ReducedMotionContext } from '../context/context.js';
import { black, lightYellow } from '../styles/colors';

/*
 * Round menu button, styled like the Animate button: a yellow circle with
 * a black outline and three wiggly lines. When the menu opens, the top and
 * bottom wiggles straighten out and swing into an X, and the middle one
 * shrinks away, so the same button closes the menu. Closing reverses it,
 * back to wiggles. Instant (no motion) when Animate is off.
 */

// A short wiggle centered on x = 24, at height y. The straight version has
// the same shape commands with the bumps flattened, so one can smoothly
// morph into the other.
const wiggle = (y) => `M14 ${y}q2.5-3 5 0t5 0t5 0t5 0`;
const straight = (y) => `M14 ${y}q2.5 0 5 0t5 0t5 0t5 0`;
const line = (y, open) => (open ? straight(y) : wiggle(y));

export default function MenuButton({ open, onClick, controls }) {
  const { animation } = useContext(ReducedMotionContext);
  const morph = animation
    ? { duration: 0.35, ease: 'easeInOut' }
    : { duration: 0 };

  return (
    <Button
      type="button"
      className={['menu-button', animation ? 'animate' : '']
        .filter(Boolean)
        .join(' ')}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? 'Close menu' : 'Open menu'}
      onClick={onClick}
      data-open={open}
    >
      <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r="21"
          fill={lightYellow}
          stroke={black}
          strokeWidth="3"
        />
        <g
          fill="none"
          stroke={black}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Wiggles straighten out as they swing into the X */}
          <motion.path
            className="line top"
            initial={false}
            animate={{ d: line(17, open) }}
            transition={morph}
          />
          <motion.path
            className="line middle"
            initial={false}
            animate={{ d: line(24, open) }}
            transition={morph}
          />
          <motion.path
            className="line bottom"
            initial={false}
            animate={{ d: line(31, open) }}
            transition={morph}
          />
        </g>
      </svg>
    </Button>
  );
}

MenuButton.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  controls: PropTypes.string,
};

const Button = styled.button`
  display: block;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  svg {
    display: block;
    width: 44px;
    height: 44px;
    overflow: visible;
    /* Same soft shadow as the Animate button and video icons */
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3));
  }

  .line {
    transform-box: view-box;
    transform-origin: 24px 24px;
  }

  &.animate .line {
    transition: transform 0.35s cubic-bezier(0.5, -0.4, 0.3, 1.5),
      opacity 0.2s ease;
  }
  &.animate svg {
    transition: transform 0.35s ease;
  }

  /* Open: lines swing into an X (the wiggles straighten via motion) */
  &[data-open='true'] {
    .top {
      transform: rotate(45deg) translateY(7px);
    }
    .middle {
      transform: scaleX(0);
      opacity: 0;
    }
    .bottom {
      transform: rotate(-45deg) translateY(-7px);
    }
  }

  /* A little wobble on hover */
  @media (pointer: fine) {
    &.animate:hover svg {
      transform: rotate(-8deg) scale(1.05);
    }
  }
  &:active svg {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${black};
    outline-offset: 3px;
    border-radius: 50%;
  }

  @media (prefers-reduced-motion: reduce) {
    &.animate .line,
    &.animate svg {
      transition: none;
    }
  }
`;
