import styled from 'styled-components';
import { green, blue } from '../styles/colors';
import { SectionHeading } from '../styles/typography';
import { breakpoints } from '../styles/breakpoints';

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
  @media (min-width: ${breakpoints.tablet}) {
    max-width: 70%;
  }
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  ${SectionHeading}
`;

const Content = styled.div`
  text-align: center;
  @media (min-width: ${breakpoints.tablet}) {
    text-align: left;
    grid-column: 2 / 3;
    order: 1;
  }
`;

const Body = styled.p`
  color: black;
  line-height: 180%;
  a {
    color: black;
  }
  @media (pointer: fine) {
    a:hover {
      color: ${blue};
    }
    a:focus-visible {
      color: ${blue};
    }
  }
`;
