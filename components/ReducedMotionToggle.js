import { useContext } from 'react';
import styled from 'styled-components';
import { ReducedMotionContext } from '../context/context.js';
import { black, lightYellow } from '../styles/colors';
import { breakpoints } from '../styles/breakpoints';

/*
 * Turns the site's animations on or off.
 *
 * Styled like the video player's round icons (play/pause, mute):
 * - On: a black-outlined circle filled with the site-title yellow.
 * - Off: the same outlined circle with no fill.
 * The words "on" / "off" are shown too, so the state never relies on the
 * icon alone. Screen readers hear "Animate, toggle button, pressed"
 * (or "not pressed").
 */
const SQUIGGLE = 'M13 24q2.75-6 5.5 0t5.5 0t5.5 0t5.5 0';

export default function ReducedMotionToggle() {
  const { setAnimation, animation } = useContext(ReducedMotionContext);

  return (
    <AnimateButton
      type="button"
      aria-pressed={animation}
      onClick={() => setAnimation(!animation)}
    >
      <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48">
        {/* Same black outline and squiggle in both states;
            filled with the site-title yellow when animations are on */}
        <circle
          cx="24"
          cy="24"
          r="20.5"
          fill={animation ? lightYellow : 'none'}
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d={SQUIGGLE}
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="label">
        Animate<span aria-hidden="true">: {animation ? 'on' : 'off'}</span>
      </span>
    </AnimateButton>
  );
}

const AnimateButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${black};
  cursor: pointer;
  pointer-events: auto;

  svg {
    display: block;
    width: 30px;
    height: 30px;
    /* Same soft shadow as the video player icons */
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3));
    transition: transform 0.2s ease;
  }

  .label {
    font-family: 'Fjalla One', sans-serif;
    /* Bigger on phones and tablets, where it sits in the menu below the
       links; smaller in the corner of the desktop header */
    font-size: 16px;
    line-height: 1;
    text-transform: uppercase;
    white-space: nowrap;
    @media (min-width: ${breakpoints.desktop}) {
      font-size: 13px;
    }
  }

  @media (pointer: fine) {
    &:hover svg {
      opacity: 0.8;
    }
  }
  &:active svg {
    transform: scale(0.97);
  }

  /* Invisible tap area, at least 44px tall, so it's easy to hit on a phone */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -7px;
    right: -7px;
    height: 44px;
    transform: translateY(-50%);
  }

  &:focus-visible {
    outline: 2px solid ${black};
    outline-offset: 4px;
  }
`;
