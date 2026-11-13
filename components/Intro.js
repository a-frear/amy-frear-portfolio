import { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { green, hotPinkText } from '../styles/colors';
import { useParallax } from '../hooks/useParallax';
import { useMobile } from '../hooks/useMobile';
import {
  SectionHeading,
  BodyTextSize,
  MobileJustified,
} from '../styles/typography';
import { breakpoints } from '../styles/breakpoints';
import OutlinedText from './OutlinedText';

export default function Intro() {
  const headshotRef = useRef(null);
  const isMobile = useMobile();
  const headshotY = useParallax(isMobile ? 0.05 : 0.2, headshotRef);

  return (
    <IntroSection className="full-section">
      <Content>
        <Heading>
          <OutlinedText>I'm Amy.</OutlinedText>
        </Heading>
        <Body>
          I'm a freelance web developer in Philly. Through Frear Projects, I
          partner with agencies, creative teams, and independent clients to
          build websites that are accessible, engaging, and fun to explore.
        </Body>
      </Content>
      {/* An image (the photo is a CSS background), named for screen
          readers. Not a tab stop: there's nothing to do with it. */}
      <ParallaxHeadshot
        ref={headshotRef}
        role="img"
        aria-label="Amy Frear, a woman with red hair in a bun. On desktop, hovering over the photo swaps in Gritty, the loyal but mischievous mascot of the Philadelphia Flyers."
        style={{ y: headshotY }}
      />
    </IntroSection>
  );
}

const IntroSection = styled.section`
  display: grid;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  @media (min-width: ${breakpoints.tablet}) {
    margin-top: 100px;
    grid-template-columns: 1fr 2fr auto 1fr;
    grid-gap: 5%;
  }
`;

const Content = styled.div`
  order: 2;
  text-align: center;
  @media (min-width: ${breakpoints.tablet}) {
    text-align: left;
    order: 1;
    grid-column: 2 / 3;
  }
`;

const Heading = styled.h2`
  ${SectionHeading}
`;

const Body = styled.p`
  ${BodyTextSize}
  ${MobileJustified}
  line-height: 140%;
  margin-top: 2rem;
  color: black;
  a {
    color: black;
    text-decoration: none;
  }
`;

const ParallaxHeadshot = styled(motion.div)`
  width: 300px;
  height: 300px;
  margin: 0 auto 3rem auto;
  border: 10px solid ${green};
  border-radius: 50%;
  background-image: url('assets/amy-hs.jpeg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  order: 1;
  @media (min-width: ${breakpoints.tablet}) {
    order: 2;
    grid-column: 3 / 4;
    margin-bottom: 0;
    width: 400px;
    height: 400px;

    /* Gritty sits on top, invisible (and already loaded), and fades in on
       hover. Fading in waits a beat, so a mouse that just
       passes over while scrolling doesn't set it off. */
    position: relative;
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background-image: url('assets/gritty.jpg');
      background-size: cover;
      opacity: 0;
      transition: opacity 0.6s ease;
      pointer-events: none;
    }
    &:hover::after {
      opacity: 1;
      transition: opacity 0.6s ease 0.25s;
    }
  }
`;
