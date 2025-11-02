import { useContext } from 'react';
import styled from 'styled-components';
import VideoBG from './VideoBG';
import { ReducedMotionContext } from '../context/context';
import { breakpoints } from '../styles/breakpoints';

export default function FrontPage() {
  const { animation } = useContext(ReducedMotionContext);
  return (
    <IntroSection isAnimation={animation}>
      <VideoBG isAnimation={animation} />
    </IntroSection>
  );
}

const IntroSection = styled.section`
  height: 100vh;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position-x: 70%;
  @media (min-width: ${breakpoints.tablet}) {
    background-position-x: unset;
  }
`;
