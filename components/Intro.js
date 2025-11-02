import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { green } from '../styles/colors';
import VisuallyHiddenText from './VisuallyHiddenText';
import { useParallax } from '../hooks/useParallax';
import { SectionHeading } from '../styles/typography';
import { breakpoints } from '../styles/breakpoints';

export default function Intro() {
  const headshotRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const headshotY = useParallax(isMobile ? 0.08 : 0.18, headshotRef);
  const [showGritty, setShowGritty] = useState(false);

  useEffect(() => {
    // Check if mobile and set up resize listener
    const checkMobile = () => {
      const mobile = window.innerWidth < parseInt(breakpoints.tablet);
      setIsMobile(mobile);
      return mobile;
    };

    // Initial check
    checkMobile();

    // Add resize listener
    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize);

    // Only run animation on mobile
    if (checkMobile()) {
      const interval = setInterval(() => {
        setShowGritty((prev) => !prev);
      }, 5000);

      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
      };
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <IntroSection className="full-section">
      <Content>
        <Heading>I'm Amy.</Heading>
        <Body>
          I live in Philly. I love solving problems and creating websites that
          are fun to explore.
        </Body>
      </Content>
      <ParallaxHeadshot
        ref={headshotRef}
        tabIndex={0}
        style={{ y: headshotY }}
        showGritty={showGritty}
      >
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
  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr 2fr auto 1fr;
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
  background-image: ${(props) =>
    props.showGritty
      ? "url('assets/gritty.jpg')"
      : "url('assets/amy-hs.jpeg')"};
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  order: 1;
  transition: background-image 0.3s ease;
  &:hover,
  &:focus-visible {
    background-image: url('assets/gritty.jpg');
  }
  @media (min-width: ${breakpoints.tablet}) {
    background-image: url('assets/amy-hs.jpeg');
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
