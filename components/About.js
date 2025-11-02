import React from 'react';
import styled from 'styled-components';
import { green, blue } from '../styles/colors';

export default function About() {
  return (
    <AboutWrapper id="about" className="full-section">
      <Heading>About</Heading>
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
  display: block;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 750px) {
    max-width: 70%;
  }
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
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
