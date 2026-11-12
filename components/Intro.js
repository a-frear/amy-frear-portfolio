import { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { green, hotPink } from '../styles/colors';
import VisuallyHiddenText from './VisuallyHiddenText';
import { useParallax } from '../hooks/useParallax';
import { useMobile } from '../hooks/useMobile';
import { SectionHeading, BodyTextSize } from '../styles/typography';
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
          I'm an independent web developer in Philly. Through Frear Projects, I
          partner with agencies and creative teams to build websites that are
          accessible, engaging, and fun to explore.
        </Body>
        {/* <Actions>
          <li>
            <a href="#contact">Work with me</a>
          </li>
          <li>
            <a href="#work">Selected work</a>
          </li>
        </Actions> */}
      </Content>
      <ParallaxHeadshot ref={headshotRef} tabIndex={0} style={{ y: headshotY }}>
        <VisuallyHiddenText>
          An image of Amy Frear, a woman with red hair in a bun. When hovered or
          focused on desktop, it reveals Gritty, the loyal but mischievous
          mascot for the Philadelphia Flyers.
        </VisuallyHiddenText>
      </ParallaxHeadshot>
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

const Actions = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 28px;
  margin-top: 2rem;
  @media (min-width: ${breakpoints.tablet}) {
    justify-content: flex-start;
  }
  padding: 0;
  list-style: none;
  a {
    ${BodyTextSize}
    color: black;
    text-underline-offset: 4px;
    transition: color 0.3s ease;
    @media (pointer: fine) {
      &:hover {
        color: ${hotPink};
      }
    }
    &:focus-visible {
      color: ${hotPink};
    }
  }
`;

const Body = styled.p`
  ${BodyTextSize}
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
    &:hover,
    &:focus-visible {
      background-image: url('assets/gritty.jpg');
    }
  }
`;
