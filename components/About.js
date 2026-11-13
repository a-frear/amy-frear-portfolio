import styled from 'styled-components';
import { green, blueText } from '../styles/colors';
import {
  SectionHeading,
  BodyTextSize,
  MobileJustified,
} from '../styles/typography';
import { breakpoints } from '../styles/breakpoints';
import OutlinedText from './OutlinedText';
import VisuallyHiddenText from './VisuallyHiddenText';

export default function About() {
  return (
    <AboutWrapper id="about" className="full-section">
      <Heading>
        <OutlinedText>About</OutlinedText>
      </Heading>
      <Content>
        <Body>
          I began my web development career at{' '}
          <a href="https://www.bluecadet.com/" target="_blank" rel="noreferrer">
            Bluecadet
            <VisuallyHiddenText> (opens in a new tab)</VisuallyHiddenText>
          </a>
          , where I spent 5+ years working alongside an incredibly
          talented team to create thoughtful, engaging digital experiences,
          mostly for museums, universities, and cultural institutions. I'm now
          bringing that experience to freelance work, partnering with agencies
          and creative teams, and working directly with clients on projects of
          their own.
        </Body>
        <Body>
          My approach to developing is heavily influenced by my background in
          film and theater. Whether on set or at my computer, collaborating with
          others to make something exciting and beautiful is a passion of mine.
          I believe in a balance of being practical and playful. My work is
          accessible, engaging, and fun to explore.
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
  ${BodyTextSize}
  ${MobileJustified}
  color: black;
  line-height: 165%;
  & + & {
    margin-top: 1.5rem;
  }
  a {
    color: black;
  }
  @media (pointer: fine) {
    a:hover {
      color: ${blueText};
    }
    a:focus-visible {
      color: ${blueText};
    }
  }
`;
