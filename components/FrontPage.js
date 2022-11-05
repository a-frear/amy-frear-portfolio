import React, { useContext } from 'react';
import styled from 'styled-components';
import VideoBG from './VideoBG';
import { ReducedMotionContext } from '../context/context';
import { red } from '../styles/colors';

export default function FrontPage() {
  const { animation } = useContext(ReducedMotionContext);
  return (
    <IntroSection isAnimation={animation}>
      {animation && <VideoBG isAnimation={animation} />}
    </IntroSection>
  );
}

const IntroSection = styled.section`
  background: ${(props) =>
    props.isAnimation ? red : `url(assets/eyesite-demo-still.jpeg)`};
  height: 100vh;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position-x: 70%;
  z-index: -1;
  margin-top: 0;
  @media (min-width: 750px) {
    background-position-x: unset;
  }
`;
