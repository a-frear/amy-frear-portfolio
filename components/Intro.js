import React from 'react';
import styled from 'styled-components';
import { orange, lightYellow } from '../styles/colors';
import VisuallyHiddenText from './VisuallyHiddenText';

export default function Intro() {
  return (
    <IntroSection>
      <Content>
        <Heading>I'm Amy.</Heading>
        <Body>
          I live in Philly. I love using code to solve problems and to create
          websites that are accessible and fun.
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
  background-color: ${orange};
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  grid-gap: 10%;
  padding-bottom: 200px;
`;

const Content = styled.div`
  grid-column: 1 / 2;
`;

const Heading = styled.h1`
  font-size: clamp(24px, 8vw, 76px);
  font-family: 'Bowlby One SC';
  color: ${lightYellow};
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
`;

const Body = styled.p`
  margin-top: 2rem;
  font-size: clamp(16px, 2vw, 32px);
  line-height: 113%;
`;

const Headshot = styled.div`
  grid-column: 2 / -1;
  width: 400px;
  height: 400px;
  background-image: url('assets/amy-hs.jpeg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  &:hover {
    background-image: url('assets/gritty.jpg');
  }
`;
