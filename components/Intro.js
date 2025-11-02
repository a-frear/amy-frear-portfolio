import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { green, gold, lightYellow, hotPink } from '../styles/colors';
import VisuallyHiddenText from './VisuallyHiddenText';
import { useParallax } from '../hooks/useParallax';

export default function Intro() {
  const headshotRef = useRef(null);
  const headshotY = useParallax(0.2, headshotRef);

  return (
    <IntroSection className="full-section">
      <Content>
        <Heading>I'm Amy.</Heading>
        <Body>
          I live in{' '}
          <a href="#phillyTweet" className="button-vid more" id="tweetLink">
            Philly
          </a>
          . I love solving problems and creating websites that are fun to
          explore.
        </Body>
      </Content>
      <ParallaxHeadshot ref={headshotRef} tabIndex={0} style={{ y: headshotY }}>
        <VisuallyHiddenText>
          An image of Amy Frear, a woman with red hair in a bun, alternates
          between an image of Gritty, the loyal but mischievous mascot for the
          Philadelphia Flyers.{' '}
        </VisuallyHiddenText>
      </ParallaxHeadshot>
    </IntroSection>
  );
}

const IntroSection = styled.section`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-gap: 5%;
  @media (min-width: 750px) {
    grid-template-columns: 1fr 2fr auto 1fr;
  }
`;

const Content = styled.div`
  order: 2;
  text-align: center;
  @media (min-width: 750px) {
    text-align: left;
    order: 1;
    grid-column: 2 / 3;
  }
`;

const Heading = styled.h2`
  font-size: clamp(52px, 8vw, 76px);
  font-family: 'Bowlby One SC';
  color: ${green};
  text-shadow: -2px 2px 0 #000, 2px 2px 0 #000, 2px -2px 0 #000,
    -2px -2px 0 #000;
`;

const Body = styled.p`
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
  margin: 0 auto 2rem auto;
  border: 10px solid ${green};
  border-radius: 50%;
  background-image: url('assets/amy-hs.jpeg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  order: 1;
  &:hover,
  &:focus-visible {
    background-image: url('assets/gritty.jpg');
  }
  @media (min-width: 750px) {
    order: 2;
    grid-column: 3 / 4;
    margin-bottom: 0;
    width: 400px;
    height: 400px;
  }
`;
