import React from 'react';
import styled from 'styled-components';
import { green, gold, lightYellow, hotPink } from '../styles/colors';
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
      <Headshot tabIndex={0}>
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
  display: grid;
  align-items: center;
  justify-content: center;
  grid-gap: 5%;
  padding-bottom: 200px;
  @media (min-width: 750px) {
    grid-template-columns: 1fr 2fr auto 1fr;
  }
`;

const Content = styled.div`
  grid-column: 2 / 3;
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

const Headshot = styled.div`
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border: 10px solid ${green};
  border-radius: 50%;
  background-image: url('assets/amy-hs.jpeg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  &:hover,
  &:focus-visible {
    background-image: url('assets/gritty.jpg');
  }
  @media (min-width: 750px) {
    grid-column: 3 / 4;
    width: 400px;
    height: 400px;
  }
`;
