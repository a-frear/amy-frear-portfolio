import React from 'react';
import styled from 'styled-components';
import { hotPink, lightYellow } from '../styles/colors';
import VisuallyHiddenText from './VisuallyHiddenText';

export default function Intro() {
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
      <Headshot>
        <VisuallyHiddenText>
          An image of Amy Frear, a woman with red hair in a bun, alternates
          between an image of Gritty, the loyal but mischievous mascot for the
          Philadelphia Flyers.{' '}
        </VisuallyHiddenText>
      </Headshot>
    </IntroSection>
  );
}

const IntroSection = styled.section`
  background-color: ${hotPink};
  display: grid;
  align-items: center;
  justify-content: center;
  grid-gap: 10%;
  padding-bottom: 200px;
  @media (min-width: 750px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Content = styled.div`
  grid-column: 1 / 2;
`;

const Heading = styled.h2`
  font-size: clamp(52px, 8vw, 76px);
  font-family: 'Bowlby One SC';
  color: ${lightYellow};
  text-shadow: -2px 2px 0 #000, 2px 2px 0 #000, 2px -2px 0 #000,
    -2px -2px 0 #000;
`;

const Body = styled.p`
  margin-top: 2rem;
  color: white;
  a {
    color: white;
    text-decoration: none;
  }
`;

const Headshot = styled.div`
  width: 300px;
  height: 300px;
  background-image: url('assets/amy-hs.jpeg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  &:hover {
    background-image: url('assets/gritty.jpg');
  }
  @media (min-width: 750px) {
    grid-column: 2 / -1;
    width: 400px;
    height: 400px;
  }
`;
