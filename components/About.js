import React from 'react';
import styled from 'styled-components';
import {
  orange,
  lightYellow,
  green,
  pink,
  hotPink,
  red,
  blue,
  chartreuse,
  darkPurple,
} from '../styles/colors';

export default function About() {
  return (
    <AboutWrapper id="about">
      <Content class="half-section">
        <Heading>About</Heading>
        <Body>
          My approach to developing is heavily influenced by my background in
          film and theater. Whether on set or at my computer, collaborating with
          others to make something exciting and beautiful is a passion of mine.
          I believe in a balance of being practical and playful. Currently a
          developer at{' '}
          <a href="https://www.bluecadet.com/" target="_blank" rel="noreferrer">
            Bluecadet
          </a>
          , where I get to work on{' '}
          <a href="https://muttermuseum.org/" target="_blank" rel="noreferrer">
            amazing projects
          </a>
          .
        </Body>
      </Content>
    </AboutWrapper>
  );
}

const AboutWrapper = styled.section`
  display: grid;
  grid-gap: 10%;
  background-color: ${lightYellow};
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
  color: ${red};
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
`;

const Body = styled.p`
  margin-top: 2rem;
  a {
    color: ${red};
    text-decoration: none;

    font-size: 38px;
  }
  a:hover {
    color: ${blue};
    text-shadow: -0.8px 0.8px 0 #000, 0.8px 0.8px 0 #000, 0.8px -0.8px 0 #000,
      -0.8px -0.8px 0 #000;
  }
`;
