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
      <Heading>About</Heading>
      {/* <Media tabIndex={0}>
        <div className="media-iframe-wrapper">
          <iframe
            title="about-video"
            src="https://player.vimeo.com/video/796281157?h=2f46cc8f63&autoplay=1&loop=1&background=1"
            width="500"
            height="500"
            frameBorder="0"
            allow="autoplay; loop"
            allowFullScreen
          />
          <div className="image-overlay" aria-hidden="true" />
        </div>
        <VisuallyHiddenText>
          A recording of an interactive component plays on a retro computer. The
          component shows a rod. It is clicked once and the temperature rises.
          It is clicked again and it expands. A microscopic view of its contents
          appears.{' '}
        </VisuallyHiddenText>
      </Media> */}
      <Content>
        <Body>
          My approach to developing is heavily influenced by my background in
          film and theater. Whether on set or at my computer, collaborating with
          others to make something exciting and beautiful is a passion of mine.
          I am currently a developer with the amazing team at{' '}
          <a href="https://www.bluecadet.com/" target="_blank" rel="noreferrer">
            Bluecadet
          </a>
          .
        </Body>
      </Content>
    </AboutWrapper>
  );
}

const AboutWrapper = styled.section`
  display: grid;
  align-items: start;
  justify-content: center;
  grid-gap: 5%;
  @media (min-width: 750px) {
    grid-template-columns: 1fr 5fr 1fr;
    padding-left: 50px;
    padding-right: 50px;
  }
  @media (min-width: 1024px) {
    grid-gap: 10%;
  }
`;

const Heading = styled.h2`
  grid-column: 2 / 3;
  font-size: clamp(52px, 8vw, 76px);
  font-family: 'Bowlby One SC';
  color: ${green};
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
`;

const Content = styled.div`
  @media (min-width: 750px) {
    grid-column: 2 / 3;
    order: 1;
  }
`;

const Body = styled.p`
  color: #fff;
  color: black;
  line-height: 180%;
  a {
    color: black;
  }
  a:hover {
    color: ${blue};
  }
`;

const Media = styled.div`
  grid-column: 1 / -1;
  display: grid;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  position: relative;
  width: 90vw;
  height: 90vw;
  @media (min-width: 750px) {
    grid-column: 2 / -1;
    width: 400px;
    height: 400px;
    order: 2;
  }
  @media (min-width: 1024px) {
    justify-content: right;
  }
  .media-iframe-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    pointer-events: auto;
  }
  .media-iframe-wrapper iframe {
    border: 10px solid ${hotPink};
    width: 90vw;
    height: 90vw;
    @media (min-width: 750px) {
      width: 400px;
      height: 400px;
    }
  }
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/assets/meet-your-computer.png');
    border: 10px solid ${hotPink};
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    z-index: 2;
  }
  &:hover .image-overlay,
  &:focus .image-overlay {
    opacity: 1;
  }
`;
