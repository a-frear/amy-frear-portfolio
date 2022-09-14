import React, { useContext } from 'react';
import styled from 'styled-components';
import { ReducedMotionContext } from '../context/context.js';

export default function ReducedMotionToggle() {
  const { setAnimation, animation } = useContext(ReducedMotionContext);

  return (
    <ReducedMotionToggleWrapper animation={animation}>
      <label className="switch">
        <input
          type="checkbox"
          checked={animation}
          onChange={(e) => setAnimation(e.target.checked)}
          id="animation"
          name="animation"
        />
        <span className="slider round" />
        <span className="label-text">
          Animate
          <span aria-hidden>
            : {animation ? 'on' : 'off'}{' '}
            <WhatsThisLink
              href="https://medium.com/@afrear/reduced-motion-toggle-using-react-context-4683a9047593"
              target="blank"
            >
              What's this?
            </WhatsThisLink>
          </span>
        </span>
      </label>
    </ReducedMotionToggleWrapper>
  );
}

const ReducedMotionToggleWrapper = styled.div`
  height: 300px;
  &:hover {
    a {
      display: block;
    }
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 100%;
    pointer-events: auto;
  }

  .label-text {
    position: absolute;
    left: 52px;

    font-family: 'Fjalla One', sans-serif;
    text-transform: uppercase;
    font-size: 22px;
    line-height: 99.5%;
    color: black;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border: 1px solid black;
    background-color: ${(props) => (props.animation ? `#F72C25;` : `#FCF6B1`)};
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 2px;
    background-color: ${(props) => (props.animation ? `#FCF6B1;` : '#F72C25')};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border: 1px solid black;
  }
  input:focus + .slider {
    box-shadow: 0 0 1px ${(props) => props.color};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(18px);
    -ms-transform: translateX(18px);
    transform: translateX(18px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
    width: 40px;
    height: 20px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
  input:focus + span {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
  }
`;

const WhatsThisLink = styled.a`
  display: none;
  margin-top: 3px;
  color: black;
  text-decoration: none;
  font-size: 14px;
  font-style: italic;
  &:hover {
    text-decoration: underline;
  }
`;
