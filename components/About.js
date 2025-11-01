import React from 'react';
import styled from 'styled-components';
import {
  orange,
  lightYellow,
  lightGreen,
  green,
  pink,
  hotPink,
  red,
  blue,
  chartreuse,
  darkPurple,
} from '../styles/colors';
import VisuallyHiddenText from './VisuallyHiddenText';

export default function About() {
  return (
    <AboutWrapper id="about" className="full-section">
      <Media>
        <iframe
          title="about-video"
          src="https://player.vimeo.com/video/796281157?h=2f46cc8f63&autoplay=1&loop=1&background=1"
          width="500"
          height="500"
          frameBorder="0"
          allow="autoplay; loop"
          allowFullScreen
        />
        <VisuallyHiddenText>
          A recording of an interactive component plays on a retro computer. The
          component shows a rod. It is clicked once and the temperature rises.
          It is clicked again and it expands. A microscopic view of its contents
          appears.{' '}
        </VisuallyHiddenText>
      </Media>
      <Content>
        <Heading>About</Heading>
        <Body>
          My approach to developing is heavily influenced by my background in
          film and theater. Whether on set or at my computer, collaborating with
          others to make something exciting and beautiful is a passion of mine.
          I am currently a developer at{' '}
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
  display: grid;
  align-items: center;
  justify-content: center;
  grid-gap: 5%;
  background-color: #ccd131;
  @media (min-width: 750px) {
    grid-template-columns: 1fr 1fr;
    padding-left: 50px;
    padding-right: 50px;
  }
  @media (min-width: 1024px) {
    grid-gap: 10%;
  }
`;

const Content = styled.div`
  grid-column: 2 / -1;
  display: grid;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: clamp(52px, 8vw, 76px);
  font-family: 'Bowlby One SC';
  color: ${lightYellow};
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
`;

const Body = styled.p`
  color: #fff;
  margin-top: 2rem;
  color: black;
  line-height: 180%;
  a {
    color: black;

    font-size: 28px;
    @media (min-width: 750px) {
      font-size: 38px;
      /* text-decoration: none; */
    }
  }
  a:hover {
    color: ${blue};
    text-shadow: -0.8px 0.8px 0 #000, 0.8px 0.8px 0 #000, 0.8px -0.8px 0 #000,
      -0.8px -0.8px 0 #000;
    text-decoration: none;
  }
`;

const Media = styled.div`
  grid-column: 1 / -1;
  display: grid;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  iframe {
    border: 10px solid ${hotPink};
    width: 90vw;
    height: 90vw;
    margin: 0 auto;
    @media (min-width: 750px) {
      width: 350px;
      height: 350px;
    }
    @media (min-width: 1024px) {
      width: 500px;
      height: 500px;
    }
  }
  @media (min-width: 750px) {
    grid-column: 1 / 2;
  }
  @media (min-width: 1024px) {
    justify-content: right;
  }
`;
