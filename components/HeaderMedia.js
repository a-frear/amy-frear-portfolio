import { useContext } from 'react';
import styled from 'styled-components';
import VideoBG from './VideoBG';
import { ReducedMotionContext } from '../context/context';
import { breakpoints } from '../styles/breakpoints';

export default function HeaderMedia() {
  const { animation } = useContext(ReducedMotionContext);
  return (
    <IntroSection isAnimation={animation}>
      <VideoBG isAnimation={animation} />
    </IntroSection>
  );
}

const IntroSection = styled.section`
  /* Full screen height that never changes. Plain vh changes on phones
     when the browser toolbars slide away while scrolling, which resized
     (zoomed) the video and made the page jump. lvh stays fixed. */
  height: 100vh;
  height: 100lvh;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position-x: 70%;
  @media (min-width: ${breakpoints.tablet}) {
    background-position-x: unset;
  }
`;
